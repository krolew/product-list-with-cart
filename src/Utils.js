import productData from "./data.json";

export function getProductImgThumbnail(productName) {
  const product = productData.filter((product) => {
    return product.name === productName;
  })[0];
  return product.image.thumbnail;
}
