import page from "//unpkg.com/page/page.mjs";
import { render } from "https://unpkg.com/lit-html/lit-html.js";
import { layoutTemplate } from "./layout.js";
import { homePage } from "./home.js";
import { detailsPage } from "./details.js";

const root = document.body;
page(decorateContext);
page("index.html", "/");
page("/", homePage);
page("/details/:code", detailsPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderView;
  next();
}

function renderView(content) {
  render(layoutTemplate(content), root);
}
