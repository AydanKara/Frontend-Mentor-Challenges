import { html } from "../node_modules/lit-html/lit-html.js";

// TODO: Replace with actual view
const homeTemplate = (items) => html`
  <div id="home-wrapper">
    <section id="controls">
      <div id="search-control">
        <i class="fa-solid fa-magnifying-glass fa-lg"></i>
        <input
          type="text"
          id="searchBar"
          name="searchBar"
          placeholder="Search for a country..."
        />
      </div>
      <div id="filter-control">
        <div id="dropdown">
          <p>Filter by Region</p>
          <i class="bx bx-chevron-down"></i>
        </div>
        <ul class="options">
          <li class="regions">Africa</li>
          <li class="regions">America</li>
          <li class="regions">Asia</li>
          <li class="regions">Europa</li>
          <li class="regions">Oceania</li>
        </ul>
      </div>
    </section>
    <section id="countries">
      <ul class="countries-wrapper">
        ${items.map(countriesTemplate)}
      </ul>
    </section>
  </div>
`;

const countriesTemplate = (items) => html`
  <li class="country">
    <div class="country-img">
      <img src="${items.flags.svg}" alt="" />
    </div>
    <div class="country-info">
      <h2>${items.name.common}</h2>
      <p><strong>Population: </strong>${items.population}</p>
      <p><strong>Region: </strong>${items.region}</p>
      <p><strong>Capital: </strong>${items.capital}</p>
    </div>
  </li>
`;

export async function homePage(ctx) {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const items = await data.json();
  console.log(items);

  ctx.render(homeTemplate(items));

  const dropDown = document.getElementById("dropdown");
  const dropOptions = document.querySelector(".options");

  dropDown.addEventListener("click", (e) => {
    dropOptions.classList.toggle("show-options");
  });
}
