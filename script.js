const container = document.querySelector(".container");
const loader = document.querySelector(".loader").children[0];

const count = 10;
const client_id = `jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek`;
const apiurl = `https://api.unsplash.com/photos/random?client_id=${client_id}&count=${count}`;
let imagesLoaded = 0;
let arrayPhotos = [];
let totalImages = 0;

let ready = false;
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = arrayPhotos.length;
  console.log(arrayPhotos);
  arrayPhotos.forEach((e) => {
    let url = e.urls.regular;
    console.log(url);
    const img = document.createElement("img");
    const a = document.createElement("a");
    a.href = e.links.html;
    a.target = "blank";

    img.setAttribute("src", url);
    img.style.marginBottom = `10px`;
    img.style.width = `400px`;
    img.addEventListener("load", imageLoaded);
    a.appendChild(img);

    container.appendChild(a);
  });
};

const getPictures = async () => {
  try {
    const response = await fetch(apiurl);
    let data = await response.json();
    arrayPhotos = data;
    console.log(arrayPhotos);
    displayPhotos();
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    console.log("its now");
    getPictures();
  }
});

getPictures();

console.log(arrayPhotos);
