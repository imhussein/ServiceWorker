console.log("SERVICE WORKER");

let version = 1;

self.addEventListener("install", function(e) {
  console.log("Service Worker Installed");
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(handleActivate());
});

async function handleActivate() {
  await clients.claim();
  console.log("Service Worker Activated ");
}

async function main() {
  console.log("Service Worker " + version + " Started");
}

main().catch(err => {
  console.log(err);
});
