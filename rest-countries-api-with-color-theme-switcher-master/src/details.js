import { html } from "https://unpkg.com/lit-html/lit-html.js";
import { darkMode } from "./layout.js";

const detailsTemplate = (
  item,
  countryCurrencies,
  countryLanguages,
  countryBorders,
  clickCountry
) => html`
  <div id="details-container">
    <div id="back-btn-wrapper">
      <a href="/" aria-label="Back to the Home page"
        ><i class="bx bx-arrow-back"></i> <button id="back-btn">Back</button></a
      >
    </div>
    <div id="details-wrapper">
      <div id="country-img">
        <img src=${item[0].flags.png} alt="${item[0].flags.alt}" />
      </div>
      <div id="country-info">
        <h1 id="country-name">${item[0].name.common}</h1>
        <ul id="country-details">
          <li class="column">
            <p><strong>Native Name: </strong>${item[0].name.official}</p>
            <p><strong>Population: </strong>${item[0].population}</p>
            <p><strong>Region: </strong>${item[0].region}</p>
            <p><strong>Sub Region: </strong>${item[0].subregion}</p>
            <p><strong>Capital: </strong>${item[0].capital}</p>
          </li>
          <li class="column">
            <p><strong>Top Level Domain: </strong>${item[0].tld}</p>
            <p><strong>Currencies: </strong>${countryCurrencies[0].name}</p>
            <p><strong>Languages: </strong>${countryLanguages.join(", ")}</p>
          </li>
        </ul>
        <div id="border-countries">
          <strong>Border Countries: </strong>
          <div id="country-borders">
            ${countryBorders
              ? countryBorders.map((border) =>
                  bordersTemplate(border, clickCountry)
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const bordersTemplate = (border, clickCountry) => html`
  <button @click=${clickCountry} class="borders">${border}</button>
`;

export async function detailsPage(ctx) {
  const countryCode = ctx.params.code;
  console.log(countryCode);
  const data = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  const item = await data.json();
  const countryCurrencies = Object.values(item[0].currencies);
  const countryLanguages = Object.values(item[0].languages);
  const countryBorders = item[0].borders;

  async function clickCountry(e) {
    const cca3 = e.target.textContent;
    const data = await fetch("https://restcountries.com/v3.1/all");
    const items = await data.json();
    const redirected = items.filter((item) => item.cca3 === cca3);
    console.log(redirected);
    ctx.page.redirect(`/details/${redirected[0].cca3}`);
  }

  ctx.render(
    detailsTemplate(
      item,
      countryCurrencies,
      countryLanguages,
      countryBorders,
      clickCountry
    )
  );

  if (darkMode) {
    const items = document.querySelectorAll(
      "#back-btn-wrapper, #back-btn-wrapper i, #back-btn-wrapper a button, #country-name, #border-countries strong, #country-info li p, #country-info li p strong, #border-countries .borders"
    );
    items.forEach((item) => {
      if (!item.classList.contains("active")) {
        item.classList.toggle("active");
      }
    });
  }
}
