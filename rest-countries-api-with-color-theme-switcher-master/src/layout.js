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
    document.querySelector("header").style.backgroundColor = "var(--Dark-Blue)";
    document.querySelector("#header-wrapper").style.backgroundColor =
      "var(--Dark-Blue)";
  } else {
    document.querySelector("body").style.backgroundColor =
      "var(--Light-Mode-Background)";
  }
}
