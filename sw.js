/* KokoLab — self-updating service worker.

   No version number to bump. The app opens instantly from the cache, then the
   page sends "check": the app files are re-fetched and, if any differ, the
   whole new set is staged in a second cache and switched on in one step.
   Every open window is then sent "updated" so it can show its "new version"
   toast. Pictures are re-checked once a day.

   Adding an image? Add it to SHELL so it is available offline. */
"use strict";

var CACHE_PREFIX = "kokolab-";      /* unique to THIS app — see activate */
var CACHE = "kokolab-shell";        /* fixed name; never changes between deploys */
var NEXT = "kokolab-next";          /* staging area for a new set of app files */
var READY = "./__ready";            /* written last: marks NEXT complete and live */
var STAMP = "./__assets-checked";   /* when the pictures were last revalidated */
var ASSET_MAX_AGE = 24 * 60 * 60 * 1000;
var INDEX = "./index.html";

var SHELL = [
  INDEX,
  "./styles.css",
  "./app.js",
  "./data.js",
  "./zh.js",
  "./journal.js",
  "./manifest.webmanifest",
  "./fonts/anton.woff2",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./img/agrosense.webp",
  "./img/antidandruff.webp",
  "./img/antiwrinkle.webp",
  "./img/atipm.webp",
  "./img/barconditioner.webp",
  "./img/barshampoo.webp",
  "./img/bioaction.webp",
  "./img/biochar.webp",
  "./img/biocontrol.webp",
  "./img/bioshield.webp",
  "./img/carbon.webp",
  "./img/cleanser.webp",
  "./img/cocoamat.webp",
  "./img/conditioner.webp",
  "./img/croped.webp",
  "./img/diet.webp",
  "./img/energybar.webp",
  "./img/flavint.webp",
  "./img/footcream.webp",
  "./img/footscrub.webp",
  "./img/geococoa.webp",
  "./img/greencoa.webp",
  "./img/gulakelapa.webp",
  "./img/hero.webp",
  "./img/husk.webp",
  "./img/hyfer.webp",
  "./img/icecream.webp",
  "./img/kacipfatimah.webp",
  "./img/keto.webp",
  "./img/keto2.webp",
  "./img/kokocorrect.webp",
  "./img/kokoselect.webp",
  "./img/lipstick.webp",
  "./img/moisturizer.webp",
  "./img/polyphenol.webp",
  "./img/probiotic.webp",
  "./img/scrub.webp",
  "./img/shampoo.webp",
  "./img/singleorigin.webp",
  "./img/skincare.webp",
  "./img/spread.webp",
  "./img/terraprobe.webp",
  "./img/toner.webp",
  "./img/tongkatali.webp",
  "./img/tongkatali2.webp"
];

function sameBytes(a, b){
  if (a.byteLength !== b.byteLength) return false;
  var x = new Uint8Array(a), y = new Uint8Array(b);
  for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
  return true;
}

/* The page, scripts, stylesheet and manifest are "the app": they must always
   be served as one matching set. Images, fonts and icons are independent. */
var CODE = /\.(html|js|css|webmanifest)$/;
var CORE = SHELL.filter(function(u){ return CODE.test(u); });
var ASSETS = SHELL.filter(function(u){ return !CODE.test(u); });
var CORE_URLS = {};
CORE.forEach(function(u){ CORE_URLS[new URL(u, self.location.href).href] = u; });

function fetchFresh(url){
  return fetch(url, { cache: "no-cache" }).then(function(res){
    if (!res || !res.ok) throw new Error(url + " " + (res && res.status));
    return res;
  });
}

/* Which cache holds the live app files: NEXT once its READY marker exists,
   otherwise CACHE. That single marker write is what makes an update atomic. */
function liveCore(){
  return caches.has(NEXT).then(function(has){
    if (!has) return CACHE;
    return caches.open(NEXT).then(function(n){ return n.match(READY); })
      .then(function(ready){ return ready ? NEXT : CACHE; });
  });
}

/* Fold a completed NEXT back into CACHE, then drop NEXT. Until the final
   delete the app is served from NEXT, so a failure part-way (quota, crash)
   leaves a complete set live and this simply runs again later. An unfinished
   NEXT (no marker) is discarded. */
function promote(){
  return caches.has(NEXT).then(function(has){
    if (!has) return;
    return caches.open(NEXT).then(function(n){
      return n.match(READY).then(function(ready){
        if (!ready) return caches.delete(NEXT);
        return caches.open(CACHE).then(function(c){
          return Promise.all(CORE.map(function(url){
            return n.match(url).then(function(res){
              if (!res) throw new Error("staged copy incomplete: " + url);
              return c.put(url, res);
            });
          }));
        }).then(function(){ return caches.delete(NEXT); });
      });
    });
  });
}

/* Fetch every app file past the HTTP cache. If nothing differs, write
   nothing. Otherwise stage the whole new set in NEXT and mark it READY only
   after every write succeeded; any failure deletes the staging cache and
   leaves the current app untouched. Resolves true when an existing app was
   replaced by a different one; rejects if the files could not all be fetched
   or stored. */
function refreshCore(){
  return promote().catch(function(){}).then(function(){
    return Promise.all(CORE.map(fetchFresh));
  }).then(function(fresh){
    return liveCore().then(function(name){ return caches.open(name); }).then(function(live){
      return Promise.all(CORE.map(function(url, i){
        return live.match(url).then(function(old){
          return Promise.all([old ? old.arrayBuffer() : null, fresh[i].clone().arrayBuffer()]);
        }).then(function(b){ return b[0] ? (sameBytes(b[0], b[1]) ? "same" : "changed") : "new"; });
      }));
    }).then(function(state){
      if (state.every(function(x){ return x === "same"; })) return false;
      var replaced = state.indexOf("changed") >= 0;
      return liveCore().then(function(name){
        /* NEXT is still the live copy (it could not be folded in above): never
           touch it. Give up for now; the staged app keeps being served. */
        if (name === NEXT) throw new Error("previous update not yet folded in");
        return caches.delete(NEXT).then(function(){ return caches.open(NEXT); }).then(function(n){
          return Promise.all(CORE.map(function(url, i){ return n.put(url, fresh[i]); }))
            .then(function(){ return n.put(READY, new Response("ok")); });
        }).then(function(){
          return promote().catch(function(){});    /* tidy up now if possible; safe to retry later */
        }, function(err){                          /* staging failed: discard it, keep the current app */
          return caches.delete(NEXT).then(function(){ throw err; });
        });
      }).then(function(){ return replaced; });
    });
  });
}

/* Images, fonts, icons: each is stored on its own (a failure affects only
   that file). "missing" fetches only what is not saved yet; "all" revalidates
   every file, so a replaced picture reaches existing installs. */
function refreshAssets(mode){
  return caches.open(CACHE).then(function(c){
    return Promise.all(ASSETS.map(function(url){
      return (mode === "missing" ? c.match(url) : Promise.resolve(null)).then(function(hit){
        if (hit) return;
        return fetchFresh(url).then(function(res){ return c.put(url, res); });
      }).catch(function(){});
    })).then(function(){
      if (mode === "all") return c.put(STAMP, new Response(String(Date.now()))).catch(function(){});
    });
  });
}

/* A full picture check is due when the app itself just changed, or the last
   one was more than a day ago. */
function assetsDue(){
  return caches.open(CACHE).then(function(c){ return c.match(STAMP); }).then(function(res){
    return res ? res.text().then(function(t){ return Date.now() - (+t || 0) > ASSET_MAX_AGE; }) : true;
  }).catch(function(){ return true; });
}

/* install: save the app (all of it, or the install fails and is retried on
   the next visit), then the pictures; take over at once. Safe because the
   cache names are stable — a new worker never strands an open page. */
self.addEventListener("install", function(e){
  e.waitUntil(refreshCore().then(function(){ return refreshAssets("missing"); }).then(function(){ return self.skipWaiting(); }));
});

/* activate: delete only THIS app's other caches (e.g. old versioned ones).
   Cache Storage is shared by the whole origin — on <user>.github.io that is
   every project page — so never delete caches without our prefix. */
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return (k.indexOf(CACHE_PREFIX) === 0 && k !== CACHE && k !== NEXT) ? caches.delete(k) : null;
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* fetch:
   - navigations and app files → the live saved set, instantly; the network
     only if nothing is saved (and then nothing is stored piecemeal)
   - other same-origin files   → cache first, then network, and keep the copy
   - cross-origin              → left alone
   Freshness is handled by the "check" message, not here. */
self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  var core = req.mode === "navigate" ? INDEX : CORE_URLS[url.origin + url.pathname];
  if (core){
    e.respondWith(
      liveCore().then(function(name){ return caches.open(name); })
        .then(function(c){ return c.match(core); })
        .then(function(hit){ return hit || fetch(req); })
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(function(c){
      return c.match(req).then(function(hit){
        if (hit) return hit;
        return fetch(req).then(function(res){
          if (res && res.status === 200 && res.type === "basic") c.put(req, res.clone()).catch(function(){});
          return res;
        });
      });
    })
  );
});

/* "check" from a page: refresh the app and, if it changed, tell every open
   window so each can offer a reload. */
self.addEventListener("message", function(e){
  if (e.data !== "check") return;
  e.waitUntil(
    refreshCore().catch(function(){ return false; }).then(function(changed){
      return (changed ? Promise.resolve(true) : assetsDue()).then(function(due){
        return refreshAssets(due ? "all" : "missing");
      }).then(function(){
        if (!changed) return;
        return self.clients.matchAll({ type: "window" }).then(function(list){
          list.forEach(function(c){ c.postMessage("updated"); });
        });
      });
    })
  );
});
