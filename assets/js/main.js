"use strict";

const select = (selector, scope = document) => scope.querySelector(selector);
const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = select("#site-header");
const menuToggle = select("#menu-toggle");
const siteMenu = select("#site-menu");

const setMenuState = (isOpen) => {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

selectAll("#site-menu a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealElements = selectAll("[data-reveal]");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-revealed"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -42px" },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
}

const navLinks = selectAll("#site-menu a[href^='#']");
const navSections = navLinks
  .map((link) => ({ link, section: select(link.getAttribute("href")) }))
  .filter(({ section }) => section);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
        navSections.forEach(({ link, section }) => link.classList.toggle("is-active", section === entry.target));
      });
    },
    { rootMargin: "-24% 0px -66%", threshold: 0 },
  );
  navSections.forEach(({ section }) => navObserver.observe(section));
}

const dialog = select("#gallery-dialog");
const dialogImage = select("#dialog-image");
const dialogCaption = select("#dialog-caption");
const dialogClose = select(".dialog-close", dialog);

selectAll("[data-gallery-src]").forEach((button) => {
  button.addEventListener("click", () => {
    dialogImage.src = button.dataset.gallerySrc;
    dialogImage.alt = button.dataset.galleryAlt;
    dialogCaption.textContent = button.dataset.galleryAlt;
    dialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!inside) dialog.close();
});

const form = select("#reservation-form");
const formStatus = select("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const recipient = form.dataset.recipient.trim();
  if (!recipient) {
    formStatus.textContent = "ただいまフォーム受付の準備中です。お急ぎの場合はお電話でご相談ください。";
    return;
  }

  const data = new FormData(form);
  const label = {
    name: "お名前",
    email: "メールアドレス",
    phone: "電話番号",
    date: "希望日",
    guests: "人数",
    purpose: "ご用件",
    message: "ご相談内容",
  };
  const body = [...data.entries()]
    .filter(([, value]) => String(value).trim())
    .map(([key, value]) => `${label[key]}：${value}`)
    .join("\n");
  const query = new URLSearchParams({ subject: "【予約・お問い合わせ】Cafe Kitchen Tiffany", body });
  window.location.href = `mailto:${recipient}?${query.toString()}`;
  formStatus.textContent = "メール作成画面を開きました。送信後に店舗からの確認をお待ちください。";
});

const year = select("#year");
if (year) year.textContent = new Date().getFullYear();
