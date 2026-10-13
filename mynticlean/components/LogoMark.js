/** Reusable concept 19 mark, sourced from the exact hand-built favicon SVG. */
export function LogoMark({ size = 32 } = {}) {
  const img = document.createElement("img");
  img.src = "./public/favicon.svg";
  img.width = size;
  img.height = size;
  img.alt = "";
  return img;
}
document
  .querySelectorAll("[data-logo-mark]")
  .forEach((el) => el.replaceWith(LogoMark()));
