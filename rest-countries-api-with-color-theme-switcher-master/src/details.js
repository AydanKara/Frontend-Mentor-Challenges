import { html } from "https://unpkg.com/lit-html/lit-html.js";

const detailsTemplate = (
  item,
  countryCurrencies,
  countryLanguages,
  countryBorders
) => html`
  <div id="details-container">
    <div id="back-btn-wrapper">
      <a href="/"
        ><i class="bx bx-arrow-back"></i> <button id="back-btn">Back</button></a
      >
    </div>
    <div id="details-wrapper">
      <div id="country-img">
        <img src=${item[0].flags.png} alt="" />
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
              ? countryBorders.map((border) => bordersTemplate(border))
              : null}
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const bordersTemplate = (border) => html`
  <button class="borders">${border}</button>
`;

export async function detailsPage(ctx) {
  const countryName = ctx.params.name;
  console.log(countryName);
  const data = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const item = await data.json();
  console.log(item);
  const countryCurrencies = Object.values(item[0].currencies);
  const countryLanguages = Object.values(item[0].languages);
  const countryBorders = item[0].borders;
  console.log(countryLanguages);
  console.log(countryBorders);
  console.log(item[0].borders);
  ctx.render(
    detailsTemplate(item, countryCurrencies, countryLanguages, countryBorders)
  );
}
