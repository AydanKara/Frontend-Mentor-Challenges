import page from "../../node_modules/page/page.mjs";
import { render } from "../../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./layout.js";
import { homePage } from "./home.js";

const root = document.body;
page(decorateContext);
page("index.html", "/");
page("/", homePage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderView;
  next();
}

function renderView(content) {
  render(layoutTemplate(content), root);
}




