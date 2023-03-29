/* Timelines could have been written in a better way, I am sorry if I wrote them in a hurry. :D */
// (function () {
//   var animation = {
//     newYear: document.querySelector(".new-year"),
//     get period() {
//       return {
//         year: 21369788659822,
//       };
//     },
//     element: function (parent, type, className, html) {
//       var element = document.createElement(type);
//       element.className = className;
//       if (typeof html !== "undefined") element.innerHTML = html;
//       parent.appendChild(element);
//       return element;
//     },
//     year: function (className) {
//       var timeline = new TimelineMax();
//       var year = animation.element(animation.newYear, "div", className);
//       for (var i = 0; i <= String(animation.period.year).length - 1; i++) {
//         var digit = animation.element(
//           year,
//           "div",
//           "digit",
//           String(animation.period.year).substr(i, 1)
//         );
//         digit.style.top = 0 - digit.clientHeight * 2 + "px";
//         timeline.to(digit, 0.5, { top: 0, opacity: 1, ease: Bounce.easeOut });
//       }
//       return year;
//     },
//     animate: function () {
//       var year1 = animation.year("year year1");
//       var year2 = animation.year("year year2");
//     },
//   };
//   animation.animate();
// })();

// function calculate_age(birth_month, birth_day, birth_year) {
//   today_date = new Date();
//   today_year = today_date.getFullYear();
//   today_month = today_date.getMonth();
//   today_day = today_date.getDate();
//   age = today_year - birth_year;

//   if (today_month < birth_month - 1) {
//     age--;
//   }
//   if (birth_month - 1 == today_month && today_day < birth_day) {
//     age--;
//   }
//   return age;
// }

// console.log(calculate_age(9, 18, 2002));

// var age, daysBetweenDates;

function daysBetweenDates(d1, d2) {
  var diffDays, oneDay;
  oneDay = 24 * 60 * 60 * 1000;
  diffDays = (d2 - Date.parse(d1)) / oneDay;
  return diffDays;
}

//63241.077088066 AU = 1 light year

// setInterval(age, 500);
let initialDistance =
  (daysBetweenDates(localStorage["bday"], new Date()) / 365) * 63241.077088066;
// console.log(initialDistance);

let count = initialDistance;
function counter() {
  document.getElementById("counter").innerHTML = count.toFixed(4);
  count = count + 0.0002004;
  setTimeout(counter, 100);
}
counter();

let Moon = {
  phases: [
    "New Moon",
    "Waxing Crescent Moon",
    "Quarter Moon",
    "Waxing Gibbous Moon",
    "Full Moon",
    "Waning Gibbous Moon",
    "Last Quarter Moon",
    "Waning Crescent Moon",
  ],
  phase: function (year, month, day) {
    let c = (e = jd = b = 0);

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
    return { phase: b, name: Moon.phases[b] };
  },
};
let formatted = localStorage["bday"].split("-");
formatted = formatted[2] + "/" + formatted[1] + "/" + formatted[0];
document.getElementById("bday").innerHTML += formatted;
document.getElementById("moon").style["background-image"] =
  "url(" + localStorage["moon"] + ")";
let spl = localStorage["bday"];
spl = spl.split("-").map(Number);
localStorage.setItem("phase", Moon.phase(spl[0], spl[2], spl[1]).name);
document.getElementById("phase").innerHTML += localStorage["phase"];

//one light second in AU is 0.0020040
const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
