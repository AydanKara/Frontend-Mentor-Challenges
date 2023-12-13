import { html } from "https://unpkg.com/lit-html/lit-html.js";

const homeTemplate = (items) => html`
  <div id="home-wrapper">
    <section id="controls">
      <div id="search-control">
        <form id="search-form">
          <i class="bx bx-search"></i>
          <input
            type="text"
            id="search-bar"
            name="search-bar"
            placeholder="Search for a country..."
          />
        </form>
      </div>
      <div id="filter-control">
        <div id="dropdown">
          <p id="filter-region">Filter by Region</p>
          <i class="bx bx-chevron-down"></i>
        </div>
        <ul class="options">
          <li class="regions">Africa</li>
          <li class="regions">America</li>
          <li class="regions">Asia</li>
          <li class="regions">Europe</li>
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
      <a href="/details"><img src="${items.flags.svg}" alt="" /></a>
    </div>
    <div class="country-info">
      <h2 class="country-name">${items.name.common}</h2>
      <p><strong>Population: </strong>${items.population}</p>
      <p class="region-name"><strong>Region: </strong>${items.region}</p>
      <p><strong>Capital: </strong>${items.capital}</p>
    </div>
  </li>
`;

export async function homePage(ctx) {
  const data = await fetch("https://restcountries.com/v3.1/all");
  const items = await data.json();
console.log(items[0]);
  ctx.render(homeTemplate(items));

  const searchBar = document.getElementById("search-bar");
  const countryName = document.getElementsByClassName("country-name");

  searchBar.addEventListener("input", (e) => {
    Array.from(countryName).forEach((country) => {
      if (
        country.innerText.toLowerCase().includes(searchBar.value.toLowerCase())
      ) {
        country.parentElement.parentElement.style.display = "grid";
      } else {
        country.parentElement.parentElement.style.display = "none";
      }
    });
  });

  const dropDown = document.getElementById("dropdown");
  const dropOptions = document.querySelector(".options");

  dropDown.addEventListener("click", (e) => {
    dropOptions.classList.toggle("show-options");
  });

  const regions = document.querySelectorAll(".regions");
  const regionName = document.getElementsByClassName("region-name");
  const filterRegion = document.getElementById("filter-region");
  regions.forEach((region) => {
    region.addEventListener("click", () => {
      dropOptions.classList.toggle("show-options");
      filterRegion.innerText = region.innerText;
      Array.from(regionName).forEach((el) => {
        if (el.innerText.includes(region.innerText)) {
          el.parentElement.parentElement.style.display = "grid";
        } else {
          el.parentElement.parentElement.style.display = "none";
        }
      });
    });
  });
}
