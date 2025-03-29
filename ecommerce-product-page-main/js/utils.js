// utils.js
export function formatPrice(price) {
  return price.toFixed(2);
}

export function getNextIndex(current, total, step) {
  const next = current + step;
  if (next < 0) return total - 1;
  if (next >= total) return 0;
  return next;
}

export function updateActiveThumbnail(index, thumbnails) {
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
    const img = thumb.querySelector("img");
    if (img) img.classList.toggle("active-opacity", i === index);
  });
}
