const shareButton = document.getElementById("share-btn");
const shareTooltip = document.getElementById("tooltip");

shareButton.addEventListener("click", () => {
    shareTooltip.classList.toggle("active");
})