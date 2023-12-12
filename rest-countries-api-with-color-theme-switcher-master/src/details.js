import { html } from "https://unpkg.com/lit-html/lit-html.js";

const detailsTemplate = (items) => html`
  <div id="details-container">
    <div id="back-btn-wrapper">
      <i class="bx bx-arrow-back"></i>
      <button id="back-btn">Back</button>
    </div>
    <div id="details-wrapper">
      <div id="country-img">
        <img src="" alt="" />
      </div>
      <div id="country-info">
        <h1 id="country-name">Belgium</h1>
        <ul id="country-details">
          <li class="column">
            <p><strong>Native Name: </strong>Belgie</p>
            <p><strong>Population: </strong>00000000</p>
            <p><strong>Region: </strong>Europe</p>
            <p><strong>Sub Region: </strong>Western Europe</p>
            <p><strong>Capital: </strong>Brussels</p>
          </li>
          <li class="column">
            <p><strong>Top Level Domain: </strong>.be</p>
            <p><strong>Currencies: </strong>Euro</p>
            <p><strong>Languages: </strong>Dutch, French, German</p>
          </li>
        </ul>
        <div id="border-countries">
          <strong>Border Countries</strong>
          <button class="borders">France</button>
          <button class="borders">Germany</button>
        </div>
      </div>
    </div>
  </div>
`;
