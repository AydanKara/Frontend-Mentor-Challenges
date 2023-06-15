/* Sidebar */

function sidebarFunc() {
  //! header sidebar start
  const btnOpenSidebar = document.querySelector("#btn-menu");
  const sidebar = document.querySelector("#sidebar");
  const closeSidebar = document.querySelector("#btn-close");

  btnOpenSidebar.addEventListener("click", function () {
    sidebar.style.right = "0";
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.style.right = "-100%";
  });

  /* click outside start */
  document.addEventListener("click", function (event) {
    if (
      !event.composedPath().includes(sidebar) &&
      !event.composedPath().includes(btnOpenSidebar)
    ) {
      sidebar.style.right = "-100%";
    }
  });
  /* click outside end */

  //! header sidebar end
}

sidebarFunc();

/* Sidebar */

/* Tabs functions Destination*/

let tabs = document.querySelectorAll(".nav-item-link");
let contents = document.querySelectorAll(".destination");
let contentsImage = document.querySelectorAll(".destination-image");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    contents.forEach((content) => {
      content.classList.remove("active");
    });
    contentsImage.forEach((contentImage) => {
      contentImage.classList.remove("active");
    })
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabs[index].classList.add("active");
    contents[index].classList.add("active");
    contentsImage[index].classList.add("active");



  });
});

/* Tabs functions Crew*/

let tabsCrew = document.querySelectorAll(".slider-dot");
let contentsCrew = document.querySelectorAll(".crew-info");
let imageCrew = document.querySelectorAll(".crew-image-wrapper");

tabsCrew.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    contentsCrew.forEach((content) => {
      content.classList.remove("active");
    });
    imageCrew.forEach((contentImage) => {
      contentImage.classList.remove("active");
    })
    tabsCrew.forEach((tab) => {
      tab.classList.remove("dot-active");
    });

    tabsCrew[index].classList.add("dot-active");
    contentsCrew[index].classList.add("active");
    imageCrew[index].classList.add("active");
  });
});
