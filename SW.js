"use strict";

let version = 1;

self.addEventListener("install", onInstall);

self.addEventListener("activate", onActivate);

async function onInstall(e) {
  console.log(`Server Worker Version ${version} Is Installing`);
  self.skipWaiting();
}

function onActivate(e) {
  e.waitUntil(handleActivation());
}

async function main() {
  console.log(`Server Worker Version ${version}`);
}

async function handleActivation() {
  await clients.claim();
  console.log(`Server Worker Version ${version} Is Activating`);
}

main().catch(err => {
  console.log(err);
});
