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

test("site keeps provisional content out of the public page and links reviews to Google Maps", () => {
  const html = read("index.html");
  const css = read("assets/css/style.css");
  const readme = read("README.md");

  for (const hook of ["google-reviews-link", "instagram-feed", "instagram-icon", "menu-photo-layout"]) {
    assert.match(html, new RegExp(hook));
  }
  assert.doesNotMatch(html, /[［\[][^］\]]+[］\]]/);
  assert.doesNotMatch(html, /POST 0[1-4]/);
  assert.doesNotMatch(html, /id="testimonials"/);
  assert.match(html, /id="instagram-feed" hidden/);
  assert.doesNotMatch(html, /hours-table/);
  assert.doesNotMatch(html, /menu-card/);
  assert.match(css, /scroll-snap-type: x mandatory/);
  assert.match(css, /--wood:/);
  assert.match(css, /--brass:/);
  assert.match(readme, /差し替えが必要な写真/);
});

test("site prioritizes asymmetric photography over occasion cards and secondary CTAs", () => {
  const html = read("index.html");
  const css = read("assets/css/style.css");
  const readme = read("README.md");

  assert.match(html, /occasion-photo-layout/);
  assert.doesNotMatch(html, /occasion-grid/);
  assert.doesNotMatch(html, /<span>0[123]<\/span><h3>ひとりの時間に/);
  assert.match(html, /hero-menu-link/);
  assert.doesNotMatch(html, /hero-menu-link button/);
  assert.match(html, /space-documentary/);
  assert.match(css, /grid-template-areas:\s*"feature feature side"/);
  assert.match(css, /\.menu-photo-layout/);
  assert.match(css, /\.hero \.button-primary/);
  assert.match(css, /\.hero-menu-link/);
  assert.match(css, /padding: clamp\(126px, 16vw, 220px\) 0/);
  assert.match(readme, /装飾の見直し/);
});

test("Voices section presents real, attributed reviews with links back to their source", () => {
  const html = read("index.html");
  const css = read("assets/css/style.css");

  assert.match(html, /<section[^>]+id="voices"/);
  assert.match(html, /class="voice-item"/);
  assert.match(html, /食べログより/);
  assert.match(html, /href="https:\/\/tabelog\.com\/tokyo\/A1318\/A131809\/13048064\/dtlrvwlst\/"/);
  assert.match(html, /class="google-reviews-link"/);
  assert.doesNotMatch(html, /id="testimonials"/);
  assert.match(css, /\.voices-rail/);
  assert.match(css, /\.star-fill/);
});
