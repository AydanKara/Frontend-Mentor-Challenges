import { html } from "https://unpkg.com/lit-html/lit-html.js";

export const layoutTemplate = (content) => html`
  <header>
    <div id="header-wrapper">
      <h1 id="header-title">Where in the world?</h1>
      <div id="color-switcher">
        <i class="fa-regular fa-moon fa-lg"></i>
        <span id="mode">Dark Mode</span>
      </div>
    </div>
  </header>
  <main>${content}</main>
`;
