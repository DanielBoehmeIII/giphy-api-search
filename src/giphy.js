// Code borrowed from "https://www.theodinproject.com/lessons/node-path-javascript-working-with-apis""
import "./style.css";

let searchString;
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || event.code === "Enter" || event.keyCode === 13) {
    searchString = searchBar.value;
    changeSrc();
  }
});
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", () => {
  searchString = searchBar.value;
  changeSrc();
});

const img = document.querySelector("img");

function changeSrc() {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=LHaivBJrID6o2LgcXqx4dlvGdVcZxAhw&s=${searchString}`,
    { mode: "cors" },
  )
    .then((response) => response.json())
    .then((data) => {
      if (
        !data.data ||
        !data.data.images ||
        !data.data.images.original ||
        !data.data.images.original.url
      ) {
        throw new Error("No valid GIF found");
      }
      img.src = data.data.images.original.url;
      searchError.textContent = "";
    })
    .catch((error) => {
      catchGifError();
    });
}

const searchError = document.getElementById("search-error");
function catchGifError() {
  img.src = "https://c.tenor.com/U5hmONvZGo8AAAAd/tenor.gif";
  searchError.textContent = "Unable to find that Gif";
}
