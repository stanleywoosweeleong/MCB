/* KokoLab — self-updating service worker.

   No version number to bump. The app opens instantly from the cache, then the
   page sends "check": the app files are re-fetched and saved as one set, and
   if any of them came back different every open window is sent "updated" so
   it can show its "new version" toast.

   Adding an image? Add it to SHELL so it is available offline. */
"use strict";

var CACHE_PREFIX = "kokolab-";      /* unique to THIS app — see activate */
var CACHE = "kokolab-shell";        /* fixed name; never changes between deploys */
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
   be saved as one matching set. Images, fonts and icons are best-effort. */
var CODE = /\.(html|js|css|webmanifest)$/;
var CORE = SHELL.filter(function(u){ return CODE.test(u); });
var ASSETS = SHELL.filter(function(u){ return !CODE.test(u); });

function fetchFresh(url){
  return fetch(url, { cache: "no-cache" }).then(function(res){
    if (!res || !res.ok) throw new Error(url + " " + (res && res.status));
    return res;
  });
}

/* Fetch every app file past the HTTP cache first; store them only if ALL
   arrived, so a failed or half-finished download can never leave a mix of old
   and new files, and a 404/503 can never replace the app. Resolves true when
   a copy was already saved and any file came back different. Rejects (and
   changes nothing) if any file could not be fetched. */
function refreshCore(){
  return Promise.all(CORE.map(fetchFresh)).then(function(fresh){
    return caches.open(CACHE).then(function(c){
      return Promise.all(CORE.map(function(url, i){
        return c.match(url).then(function(old){
          return Promise.all([old ? old.arrayBuffer() : null, fresh[i].clone().arrayBuffer()]);
        }).then(function(b){ return !!b[0] && !sameBytes(b[0], b[1]); });
      })).then(function(changed){
        return Promise.all(CORE.map(function(url, i){ return c.put(url, fresh[i]); }))
          .then(function(){ return changed.some(Boolean); });
      });
    });
  });
}

/* Images, fonts, icons. onlyMissing skips files already saved; a full pass
   runs only when a new version of the app has just been stored. */
function refreshAssets(onlyMissing){
  return caches.open(CACHE).then(function(c){
    return Promise.all(ASSETS.map(function(url){
      return (onlyMissing ? c.match(url) : Promise.resolve(null)).then(function(hit){
        if (hit) return;
        return fetchFresh(url).then(function(res){ return c.put(url, res); });
      }).catch(function(){});
    }));
  });
}

/* install: save the app (all of it, or the install fails and is retried on
   the next visit), then the pictures; take over at once. Safe because the
   cache name is stable — a new worker never strands an open page. */
self.addEventListener("install", function(e){
  e.waitUntil(refreshCore().then(function(){ return refreshAssets(true); }).then(function(){ return self.skipWaiting(); }));
});

/* activate: delete only THIS app's other caches (e.g. old versioned ones).
   Cache Storage is shared by the whole origin — on <user>.github.io that is
   every project page — so never delete caches without our prefix. */
self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return (k.indexOf(CACHE_PREFIX) === 0 && k !== CACHE) ? caches.delete(k) : null;
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* fetch:
   - navigations  → the cached app, instantly; network only if nothing is cached
   - same-origin  → cache first, then network, and cache what comes back
   - cross-origin → left alone (API calls etc. are the page's business)
   Freshness is handled by the "check" message, not here. */
self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate"){
    e.respondWith(
      caches.match(INDEX).then(function(hit){
        if (hit) return hit;
        return fetch(req).then(function(res){
          if (res.ok){
            var copy = res.clone();
            caches.open(CACHE).then(function(c){ c.put(INDEX, copy); });
          }
          return res;
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function(hit){
      if (hit) return hit;
      return fetch(req).then(function(res){
        if (res && res.status === 200 && res.type === "basic"){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
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
      return refreshAssets(!changed).then(function(){
        if (!changed) return;
        return self.clients.matchAll({ type: "window" }).then(function(list){
          list.forEach(function(c){ c.postMessage("updated"); });
        });
      });
    })
  );
});
