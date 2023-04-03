let a1 = document.querySelector("#a1");
let a2 = document.querySelector("#a2");
let a3 = document.querySelector("#a3");
let a4 = document.querySelector("#a4");
let a5 = document.querySelector("#a5");
let a6 = document.querySelector("#a6");
let a7 = document.querySelector("#a7");
let a8 = document.querySelector("#a8");
let a9 = document.querySelector("#a9");

let b2 = document.querySelector("#b2");
let b3 = document.querySelector("#b3");
let b4 = document.querySelector("#b4");
let b5 = document.querySelector("#b5");
let b6 = document.querySelector("#b6");
let b7 = document.querySelector("#b7");
let b8 = document.querySelector("#b8");
let b9 = document.querySelector("#b9");

document.querySelector(".wikiT").href = localStorage["wiki"];

a1.addEventListener("click", () => {
  hideAll(0);
});
a2.addEventListener("click", () => {
  hideAll(0);
  b2.style.animation = "fade 1s linear 5s 1 normal forwards";
});
a3.addEventListener("click", () => {
  hideAll();
  b3.style.animation = "fade 1s linear 5s 1 normal forwards";
});
a4.addEventListener("click", () => {
  hideAll();
  b4.style.animation = "fade 1s linear 5s 1 normal forwards";
});
a5.addEventListener("click", () => {
  hideAll();
  b5.style.animation = "fade 1s linear 5s 1 normal forwards";
});
a6.addEventListener("click", () => {
  hideAll();
  b6.style.animation = "fade 1s linear 5s 1 normal forwards";
  // };
});
a7.addEventListener("click", () => {
  hideAll();
  b7.style.animation = "fade 1s linear 5s 1 normal forwards";
});
a8.addEventListener("click", () => {
  hideAll();
  b8.style.animation = "fade 1s linear 5s 1 normal forwards";
});
a9.addEventListener("click", () => {
  hideAll();
  b9.style.animation = "fade 1s linear 5s 1 normal forwards";
});

function hideAll() {
  b2.style.animation = "";
  b3.style.animation = "";
  b4.style.animation = "";
  b5.style.animation = "";
  b6.style.animation = "";
  b7.style.animation = "";
  b8.style.animation = "";
  b9.style.animation = "";
}
