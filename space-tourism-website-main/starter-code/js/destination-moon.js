fetch("./js/data.json")
  .then(function (response) {
    return response.json();
  })
  .then((data) => {
    const destination = data.destinations;
    const placeholderImage = document.querySelector("#data-image");
    const placeholderInfo = document.querySelector("#data-info");
    let outImage = "";
    let outInfo = "";
    console.log(destination[0].name);
      if (destination[0].name === "Moon") {
        outImage += `<img class="image-dest" src="${destination[0].images.png}" alt="image">`;
        outInfo += `<h2 class="heading-2">${destination[0].name}</h2>
            <p class="destination-desc">${destination[0].description}</p>
            <hr class="line">
            <div class="destination-extra-info">
              <div class="distance">
                <span class="subheading-2">Avg. distance</span>
                <span class="subheading-1">${destination[0].distance}</span>
              </div>
              <div class="travel">
                <span class="subheading-2">Est. travel time</span>
                <span class="subheading-1">${destination[0].travel}</span>
              </div>
        </div>`;
      }
    
    placeholderImage.innerHTML = outImage;
    placeholderInfo.innerHTML = outInfo;
  });