function sidebarFunc() {
    //! sidebar start
    const btnOpenSidebar = document.querySelector("#btn-menu");
    const sidebar = document.querySelector("#sidebar");
    const closeSidebar = document.querySelector("#close-sidebar");
  
    btnOpenSidebar.addEventListener("click", function () {
      sidebar.style.right = "0";
      closeSidebar.style.display = "block";
    });
  
    closeSidebar.addEventListener("click", function () {
      sidebar.style.right = "-100%";
      closeSidebar.style.display = "none";
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
  
    //! sidebar end
  }

  sidebarFunc();