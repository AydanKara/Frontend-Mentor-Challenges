fetch("./js/data.json")
  .then(function (response) {
    return response.json();
  })
  .then((data) => {
    console.log(data.destinations);
    const destination = data.destinations;
    const placeholderImage = document.querySelector("#data-image");
    const placeholderInfo = document.querySelector("#data-info");
    let outImage = "";
    let outInfo = "";
    destination.forEach((info) => {
      if (info.name === "Titan") {
        outImage += `<img class="image-dest" src="${info.images.png}" alt="image">`;
        outInfo += `<h2 class="heading-2">${info.name}</h2>
            <p class="destination-desc">${info.description}</p>
            <hr class="line">
            <div class="destination-extra-info">
              <div class="distance">
                <span class="subheading-2">Avg. distance</span>
                <span class="subheading-1">${info.distance}</span>
              </div>
              <div class="travel">
                <span class="subheading-2">Est. travel time</span>
                <span class="subheading-1">${info.travel}</span>
              </div>
        </div>`;
      }
    });
    placeholderImage.innerHTML = outImage;
    placeholderInfo.innerHTML = outInfo;
  });