# Cafe Kitchen Tiffany Initial Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, static Cafe Kitchen Tiffany one-page website that turns visual interest into a reservation consultation.

**Architecture:** The site uses one semantic HTML document, one CSS design-system stylesheet, and one JavaScript file for progressive enhancement. Image assets are stored locally so the site works after deployment without access to the creator's computer. The form composes a `mailto:` message and does not claim to confirm bookings.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, local JPG/PNG assets.

## Global Constraints

- Keep the B-direction palette: `#fffaf0`, `#254949`, `#356565`, `#a94036`, `#292725`.
- Use only HTML, CSS and JavaScript; introduce no package manager or framework.
- Maintain keyboard access, visible focus styles, 44px touch targets and reduced-motion support.
- Do not publish unverified operating hours, prices or service claims.
- Keep every content image replaceable through a stable file under `assets/images/`.

---

### Task 1: Create the static site foundation and test harness

**Files:**
- Create: `index.html`
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`
- Create: `tests/site.test.mjs`
- Create: `package.json`

**Interfaces:**
- Consumes: no application code.
- Produces: a browser-loadable document with `#main-content`, `#reservation`, and deferred `assets/js/main.js`.

- [ ] **Step 1: Write the failing structural test**

```js
assert.match(html, /<main id="main-content">/);
assert.match(html, /<section[^>]+id="reservation"/);
assert.match(html, /<script src="assets\/js\/main\.js" defer><\/script>/);
```

- [ ] **Step 2: Run the test and verify it fails because `index.html` is absent.**

Run: `node --test tests/site.test.mjs`

- [ ] **Step 3: Add the semantic document shell, stylesheet and deferred script.**

- [ ] **Step 4: Run the test and verify it passes.**

Run: `node --test tests/site.test.mjs`

### Task 2: Build the content and responsive visual system

**Files:**
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Create: `assets/images/exterior.jpg`
- Create: `assets/images/interior-wide.jpg`
- Create: `assets/images/interior-counter.jpg`
- Create: `assets/images/dessert-coffee.jpg`
- Create: `assets/images/cake-iced-coffee.jpg`

**Interfaces:**
- Consumes: the semantic shell from Task 1.
- Produces: all required content sections and local image references.

- [ ] **Step 1: Extend the test with every required section and local image reference.**

```js
for (const id of ['menu', 'space', 'occasions', 'gallery', 'access', 'reservation']) {
  assert.match(html, new RegExp(`id="${id}"`));
}
assert.doesNotMatch(html, /https?:\/\/.*\.(jpg|jpeg|png)/i);
```

- [ ] **Step 2: Run the test and verify it fails before content sections exist.**

- [ ] **Step 3: Add the hero, quick facts, menu, space, occasions, gallery, access and reservation content with token-driven CSS.**

- [ ] **Step 4: Run the test and verify it passes.**

### Task 3: Add progressive interactions

**Files:**
- Modify: `assets/js/main.js`
- Modify: `index.html`
- Modify: `assets/css/style.css`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `data-reveal` elements, `#site-menu`, `#menu-toggle`, gallery buttons, and `#reservation-form`.
- Produces: mobile navigation, reveal animations, gallery dialog and mailto form handling.

- [ ] **Step 1: Extend the test for interaction hooks.**

```js
for (const hook of ['data-reveal', 'menu-toggle', 'gallery-dialog', 'reservation-form']) {
  assert.match(html, new RegExp(hook));
}
assert.match(js, /IntersectionObserver/);
assert.match(js, /URLSearchParams/);
```

- [ ] **Step 2: Run the test and verify it fails before interaction hooks and JavaScript are added.**

- [ ] **Step 3: Implement each interaction with keyboard handling and `prefers-reduced-motion` fallback.**

- [ ] **Step 4: Run the test and verify it passes.**

### Task 4: Verify the release surface

**Files:**
- Modify: `README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: static source and tests from Tasks 1-3.
- Produces: concise setup and verification instructions.

- [ ] **Step 1: Add a test that verifies the documented test command.**

```js
assert.match(readFileSync('README.md', 'utf8'), /npm test/);
```

- [ ] **Step 2: Run the test and verify it fails before the README is written.**

- [ ] **Step 3: Document the site, image replacement locations, and local preview command.**

- [ ] **Step 4: Run all tests and a static HTTP smoke check.**

Run: `npm test`

Run: `python -m http.server 4173 --directory .`

