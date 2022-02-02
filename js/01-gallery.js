import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryGrid = galleryItems.map(createItemsMarkup).join("");
let instance;

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

galleryRef.addEventListener("click", onImageClick);

function createItemsMarkup({preview, original, description}){
    return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img 
                        class="gallery__image lazyload"
                        loading="lazy"
                        data-src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>`;
}


function onImageClick(evt){
    evt.preventDefault();
    if(!evt.target.classList.contains("gallery__image")){
        return;
    }
    const imageSource = evt.target.dataset.source;
    instance = basicLightbox.create(`<img src="${imageSource}" width=800 height=600>`,
    {
        onShow: onModalShow,
        onClose: onModalClose,
    });
    instance.show();
}
function onModalShow() {
    document.addEventListener("keydown", onEscapeButtonPress);
}
function onEscapeButtonPress(evt) {
if (evt.code !== "Escape") {
    return;
}
instance.close();
}
function onModalClose() {
document.removeEventListener("keydown", onEscapeButtonPress);
}