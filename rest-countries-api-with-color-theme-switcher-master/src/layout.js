import { html } from "https://unpkg.com/lit-html/lit-html.js";

export const layoutTemplate = (content) => html`
  <header>
    <div id="header-wrapper">
      <h1 id="header-title">Where in the world?</h1>
      <div id="color-switcher">
        <i class="bx bx-moon" id="icon"></i>
        <span id="mode" @click=${onModeChange}>Dark Mode</span>
      </div>
    </div>
  </header>
  <main>${content}</main>
`;

function onModeChange() {
  const darkMoon = document.querySelector("#icon");
  darkMoon.classList.toggle("bxs-moon");
  if (darkMoon.classList.contains("bxs-moon")) {
    document.querySelector("body").style.backgroundColor =
      "var(--Dark-Mode-Background)";
    document.querySelector("#header-title").style.color = "var(--White)";
    document.querySelector("#color-switcher i").style.color = "var(--White)";
    document.querySelector("#color-switcher #mode").style.color =
      "var(--White)";

    document.querySelector("#search-control i").style.color = "var(--White)";
    document.querySelector("#filter-control p").style.color = "var(--White)";
    document.querySelectorAll("li.regions").forEach((region) => {
      region.style.color = "var(--White)";
    });
    document.querySelector("#dropdown i").style.color = "var(--White)";
    document.querySelector("#search-bar").style.backgroundColor =
      "var(--Dark-Blue)";
    document.querySelector("#filter-control #dropdown").style.backgroundColor =
      "var(--Dark-Blue)";
    document.querySelector("#filter-control .options").style.backgroundColor =
      "var(--Dark-Blue)";
    document.querySelector("header").style.backgroundColor = "var(--Dark-Blue)";
    document.querySelector("#header-wrapper").style.backgroundColor =
      "var(--Dark-Blue)";
    document.querySelectorAll(".country-info").forEach((country) => {
      country.style.backgroundColor = "var(--Dark-Blue)";
    });
    document.querySelectorAll(".country-info h2").forEach((country) => {
      country.style.color = "var(--White)";
    });
    document.querySelectorAll(".country-info p").forEach((country) => {
      country.style.color = "var(--White)";
    });
    document.querySelectorAll(".country-info p strong").forEach((country) => {
      country.style.color = "var(--White)";
    });
  } else {
    document.querySelector("body").style.backgroundColor =
      "var(--Light-Mode-Background)";
  }
}
