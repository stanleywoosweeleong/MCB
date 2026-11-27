/* KokoLab — self-updating service worker.

   No version number to bump. The app opens instantly from the cache, then the
   page sends "check". The app files are re-fetched and, if any differ, the
   whole new set is saved in a cache of its own and switched on by one write
   (a pointer). Every open window still on the old set is then sent "updated"
   so it can show its "new version" toast. Pictures are re-checked once a day.

   Adding an image? Add it to SHELL so it is available offline. */
"use strict";

var CACHE_PREFIX = "kokolab-";      /* unique to THIS app — see activate */
var CACHE = "kokolab-shell";        /* pictures, fonts, icons, and the two notes below */
var APP_PREFIX = "kokolab-app-";    /* one cache per saved set of app files */
var LIVE = "./__live";              /* note in CACHE: name of the app cache in use */
var STAMP = "./__assets-checked";   /* note in CACHE: when the pictures were last revalidated */
var ASSET_MAX_AGE = 24 * 60 * 60 * 1000;
var ASSET_TIMEOUT = 30000;
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

/* The page, scripts, stylesheet and manifest are "the app": they are always
   stored and served as one matching set. Images, fonts and icons are
   independent of each other. */
var CODE = /\.(html|js|css|webmanifest)$/;
var CORE = SHELL.filter(function(u){ return CODE.test(u); });
var ASSETS = SHELL.filter(function(u){ return !CODE.test(u); });
function abs(u){ return new URL(u, self.location.href).href; }
var CORE_URLS = {}, ASSET_URLS = {};
CORE.forEach(function(u){ CORE_URLS[abs(u)] = u; });
ASSETS.forEach(function(u){ ASSET_URLS[abs(u)] = u; });
var ROOT_URL = abs("./"), INDEX_URL = abs(INDEX);

function fetchFresh(url, timeout){
  var ctl = timeout && self.AbortController ? new AbortController() : null;
  var timer = ctl ? setTimeout(function(){ ctl.abort(); }, timeout) : 0;
  return fetch(url, { cache: "no-cache", signal: ctl ? ctl.signal : undefined }).then(function(res){
    clearTimeout(timer);
    if (!res || !res.ok) throw new Error(url + " " + (res && res.status));
    return res;
  }, function(err){ clearTimeout(timer); throw err; });
}

/* One update at a time: across tabs, and across an old and a new worker. */
var queue = Promise.resolve();
function exclusive(fn){
  if (self.navigator && navigator.locks && navigator.locks.request) return navigator.locks.request("kokolab-update", fn);
  var run = queue.then(fn, fn);
  queue = run.catch(function(){});
  return run;
}

/* Name of the cache holding the app files in use. Installs made before app
   caches existed keep their files in CACHE itself, so that is the fallback. */
function liveCore(){
  return caches.open(CACHE).then(function(c){ return c.match(LIVE); }).then(function(res){
    if (!res) return CACHE;
    return res.text().then(function(name){
      return caches.has(name).then(function(has){ return has ? name : CACHE; });
    });
  }).catch(function(){ return CACHE; });
}

/* Fetch every app file past the HTTP cache. If nothing differs, write nothing.
   Otherwise save the whole new set in a fresh cache and, only after every
   write succeeded, point LIVE at it — one write, so the switch is atomic. The
   previous set is kept (a page still loading from it stays consistent); older
   ones are removed. Any failure deletes the unfinished cache and leaves the
   current app untouched, to be tried again at the next check.
   Resolves { changed, name }: changed is true when an existing app was
   replaced by a different one. Rejects if the files could not all be fetched
   or stored. */
function refreshCore(){
  return Promise.all(CORE.map(function(u){ return fetchFresh(u); })).then(function(fresh){
    return liveCore().then(function(liveName){
      return caches.open(liveName).then(function(live){
        return Promise.all(CORE.map(function(url, i){
          return live.match(url).then(function(old){
            return Promise.all([old ? old.arrayBuffer() : null, fresh[i].clone().arrayBuffer()]);
          }).then(function(b){ return b[0] ? (sameBytes(b[0], b[1]) ? "same" : "changed") : "new"; });
        }));
      }).then(function(state){
        if (liveName !== CACHE && state.every(function(x){ return x === "same"; })) return { changed: false, name: liveName };
        var name = APP_PREFIX + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
        return caches.open(name).then(function(n){
          return Promise.all(CORE.map(function(url, i){ return n.put(url, fresh[i]); }));
        }).then(function(){
          return caches.open(CACHE).then(function(c){ return c.put(LIVE, new Response(name)); });
        }).then(function(){
          return caches.keys().then(function(keys){          /* keep the new set and the one it replaced */
            return Promise.all(keys.map(function(k){
              return (k.indexOf(APP_PREFIX) === 0 && k !== name && k !== liveName) ? caches.delete(k) : null;
            }));
          }).catch(function(){});
        }, function(err){
          return caches.delete(name).then(function(){ throw err; }, function(){ throw err; });
        }).then(function(){ return { changed: state.indexOf("changed") >= 0, name: name }; });
      });
    });
  });
}

/* Images, fonts, icons: each is stored on its own, so a failure affects only
   that file. "missing" fetches what is not saved yet; "all" revalidates every
   file, so a replaced picture reaches existing installs. The "checked" note
   is written only when every file was confirmed. */
function refreshAssets(mode){
  return caches.open(CACHE).then(function(c){
    var failed = 0;
    return Promise.all(ASSETS.map(function(url){
      return (mode === "missing" ? c.match(url) : Promise.resolve(null)).then(function(hit){
        if (hit) return;
        return fetchFresh(url, ASSET_TIMEOUT).then(function(res){ return c.put(url, res); });
      }).catch(function(){ failed++; });
    })).then(function(){
      if (!failed && (mode === "all" || mode === "install")) return c.put(STAMP, new Response(String(Date.now()))).catch(function(){});
    });
  });
}

/* A full picture check is due when the last one was more than a day ago. */
function assetsDue(){
  return caches.open(CACHE).then(function(c){ return c.match(STAMP); }).then(function(res){
    return res ? res.text().then(function(t){ return Date.now() - (+t || 0) > ASSET_MAX_AGE; }) : true;
  }).catch(function(){ return true; });
}

/* install: save the app (all of it, or the install fails and is retried on
   the next visit), then the pictures; take over at once. Safe because cache
   names never depend on the worker's version. */
self.addEventListener("install", function(e){
  e.waitUntil(exclusive(refreshCore).then(function(){ return refreshAssets("install"); }).then(function(){ return self.skipWaiting(); }));
});

/* activate: delete only THIS app's leftovers (old versioned caches, the
   staging cache of an earlier design, app caches no longer in use). Cache
   Storage is shared by the whole origin — on <user>.github.io that is every
   project page — so never delete caches without our prefix. */
self.addEventListener("activate", function(e){
  e.waitUntil(
    liveCore().then(function(liveName){
      return caches.keys().then(function(keys){
        var apps = keys.filter(function(k){ return k.indexOf(APP_PREFIX) === 0; }).sort();
        var keep = apps.slice(-2).concat([CACHE, liveName]);
        return Promise.all(keys.map(function(k){
          return (k.indexOf(CACHE_PREFIX) === 0 && keep.indexOf(k) < 0) ? caches.delete(k) : null;
        }));
      });
    }).catch(function(){}).then(function(){ return self.clients.claim(); })
  );
});

/* Which set each open page was started from, so every file of one page load
   comes from the same set even if an update lands in the middle of it. Kept
   in memory only: if the worker restarts, pages fall back to the live set. */
var pins = new Map();
function pin(id, name){
  if (!id) return;
  pins.set(id, name);
  if (pins.size > 60) pins.delete(pins.keys().next().value);
}

/* fetch:
   - the app's page and its files → the saved set, instantly; the network only
     if nothing is saved (and then nothing is stored piecemeal)
   - listed pictures, fonts, icons → cache first, then network, keep the copy
   - everything else               → left to the browser
   Freshness is handled by the "check" message, not here. */
self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;
  var key = url.origin + url.pathname;

  var nav = req.mode === "navigate";
  var core = nav ? ((key === ROOT_URL || key === INDEX_URL) ? INDEX : null) : CORE_URLS[key];
  if (core){
    e.respondWith(
      (nav || !pins.has(e.clientId) ? liveCore() : caches.has(pins.get(e.clientId)).then(function(has){ return has ? pins.get(e.clientId) : liveCore(); }))
        .then(function(name){
          if (nav) pin(e.resultingClientId, name);
          return caches.open(name).then(function(c){ return c.match(core); });
        })
        .then(function(hit){ return hit || fetch(req); })
    );
    return;
  }

  var asset = ASSET_URLS[key];
  if (!asset) return;
  e.respondWith(
    caches.open(CACHE).then(function(c){
      return c.match(asset).then(function(hit){
        if (hit) return hit;
        return fetch(req).then(function(res){
          if (res && res.status === 200 && res.type === "basic") c.put(asset, res.clone()).catch(function(){});
          return res;
        });
      });
    })
  );
});

/* "check" from a page: refresh the app and, if it changed, tell at once every
   open window that is not already running the new set, so each can offer a
   reload. Pictures are dealt with afterwards and never hold the message up. */
self.addEventListener("message", function(e){
  if (e.data !== "check") return;
  e.waitUntil(
    exclusive(refreshCore).catch(function(){ return { changed: false }; }).then(function(r){
      var told = !r.changed ? Promise.resolve() : self.clients.matchAll({ type: "window" }).then(function(list){
        list.forEach(function(c){ if (pins.get(c.id) !== r.name) c.postMessage("updated"); });
      });
      return told.then(function(){ return r.changed ? true : assetsDue(); }).then(function(due){
        return refreshAssets(due ? "all" : "missing");
      });
    })
  );
});
