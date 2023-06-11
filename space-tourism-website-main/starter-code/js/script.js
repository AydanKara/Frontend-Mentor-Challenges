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