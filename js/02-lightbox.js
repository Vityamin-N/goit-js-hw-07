import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryGrid = galleryItems.map(createItemsMarkup).join("");

galleryRef.innerHTML = galleryGrid;

if("loading" in HTMLImageElement.prototype){
    addLazySizesScript();
} else{
    addSrcAttrToLazyImages();
}

function addLazySizesScript() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
}
function addSrcAttrToLazyImages() {
const script = document.createElement("script");
script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
script.crossOrigin = "anonymous";
script.referrerpolicy = "no-referrer";
document.body.appendChild(script);
}

const lightboxOptions = {
  captions: true,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionDelay: 250,
};
let gallery = new SimpleLightbox(".gallery__item", lightboxOptions);

function createItemsMarkup({ preview, original, description }) {
  return `
<a class="gallery__item" href="${original}">
  <img class="gallery__image lazyload" loading="lazy" data-src="${preview}" alt="${description}" />
</a>
`;
}
