import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("site shell has a main landmark, reservation section, and deferred script", () => {
  assert.equal(existsSync(new URL("../index.html", import.meta.url)), true);
  const html = read("index.html");

  assert.match(html, /<main id="main-content">/);
  assert.match(html, /<section[^>]+id="reservation"/);
  assert.match(html, /<script src="assets\/js\/main\.js" defer><\/script>/);
});

test("site includes the planned visit-decision sections and only local photo assets", () => {
  const html = read("index.html");

  for (const id of ["menu", "space", "occasions", "gallery", "access", "reservation"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.match(html, /assets\/images\/exterior\.jpg/);
  assert.match(html, /assets\/images\/dessert-coffee\.jpg/);
  assert.doesNotMatch(html, /https?:\/\/[^\s"']+\.(jpg|jpeg|png)/i);
});

test("site exposes accessible hooks for navigation, gallery, reveal motion, and reservation", () => {
  const html = read("index.html");
  const js = read("assets/js/main.js");

  for (const hook of ["data-reveal", "menu-toggle", "gallery-dialog", "reservation-form"]) {
    assert.match(html, new RegExp(hook));
  }

  assert.match(js, /IntersectionObserver/);
  assert.match(js, /URLSearchParams/);
  assert.match(js, /showModal/);
});

test("README documents the local verification command and image replacement path", () => {
  assert.equal(existsSync(new URL("../README.md", import.meta.url)), true);
  const readme = read("README.md");
  assert.match(readme, /npm test/);
  assert.match(readme, /assets\/images/);
});

test("site adds Tiffany-specific story, social proof, Instagram routes, and editable operating hours", () => {
  const html = read("index.html");
  const css = read("assets/css/style.css");
  const readme = read("README.md");

  for (const hook of ["owner-message", "testimonials", "instagram-feed", "instagram-icon", "hours-table"]) {
    assert.match(html, new RegExp(hook));
  }
  assert.match(html, /ここにInstagram埋め込みコードを挿入/);
  assert.match(html, /営業時間は店舗確認前の仮表示です/);
  assert.match(html, /[［\[]創業年数[］\]]/);
  assert.match(css, /scroll-snap-type: x mandatory/);
  assert.match(css, /--wood:/);
  assert.match(css, /--brass:/);
  assert.match(readme, /差し替えが必要な写真/);
});
