let e1 = document.getElementById("earth1");
let s1 = document.getElementById("star");

e1.addEventListener("click", () => {
  //   s1.style.visibility = "hidden";

  //   setTimeout(() => {
  //     s1.style.visibility = "visible";
  //   }, 5800);
  setTimeout(() => {
    console.log("this is the first message");
  }, 5000);
});

// s1.addEventListener("click", () => {
//   //   e1.style.visibility = "hidden";

//   //   setTimeout(() => {
//   //     e1.style.visibility = "visible";
//   //   }, 5000);
//   setTimeout(() => {
//     console.log("this is the first message");
//   }, 5000);
// });
