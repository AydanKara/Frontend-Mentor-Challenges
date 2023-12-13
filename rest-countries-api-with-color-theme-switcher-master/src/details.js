import { html } from "https://unpkg.com/lit-html/lit-html.js";

const detailsTemplate = (item) => html`
  <div id="details-container">
    <div id="back-btn-wrapper">
      <a href="/"
        ><i class="bx bx-arrow-back"></i> <button id="back-btn">Back</button></a
      >
    </div>
    <div id="details-wrapper">
      <div id="country-img">
        <img src="./design/74046944b34810368fbd71247f8201b0.png" alt="" />
      </div>
      <div id="country-info">
        <h1 id="country-name">Belgie</h1>
        <ul id="country-details">
          <li class="column">
            <p><strong>Native Name: </strong>Belgie</p>
            <p><strong>Population: </strong>00000</p>
            <p><strong>Region: </strong>000000</p>
            <p><strong>Sub Region: </strong>000000</p>
            <p><strong>Capital: </strong>00000</p>
          </li>
          <li class="column">
            <p><strong>Top Level Domain: </strong>.be</p>
            <p><strong>Currencies: </strong>Euro</p>
            <p><strong>Languages: </strong>Dutch, French, German</p>
          </li>
        </ul>
        <div id="border-countries">
          <strong>Border Countries: </strong>
          <div id="country-borders">
            <button class="borders">France</button>
            <button class="borders">Germany</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

export async function detailsPage(ctx) {
  /*   const countryName = ctx.params.name;
  console.log(countryName);
  const data = await fetch("https://restcountries.com/v3.1/all");
  const items = await data.json();
  const item = [];
  items.filter((element) => {
    if (element.name.common == countryName) {
      item.push(element);
    }
  });
  console.log(item); */
  ctx.render(detailsTemplate());
}
