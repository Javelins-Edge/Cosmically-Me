function daysBetweenDates(d1, d2) {
  var diffDays, oneDay;
  oneDay = 24 * 60 * 60 * 1000;
  diffDays = (d2 - Date.parse(d1)) / oneDay;
  return diffDays;
}
// * 63241.077088066
let initialDistance = daysBetweenDates(localStorage["bday"], new Date()) / 365;

//0.0000000317057705
let count = initialDistance;
console.log(count);
function counter() {
  document.getElementById("counter").innerHTML = count.toFixed(10);
  // count = count + 0.0002004; switchin from AU to light years;
  count = count + 0.00000000317057705;
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
formatted = formatted[1] + "/" + formatted[2] + "/" + formatted[0];
document.getElementById("bday").innerHTML += formatted;
document.getElementById("moon").style["background-image"] =
  "url(" + localStorage["moon"] + ")";
let spl = localStorage["bday"];
spl = spl.split("-").map(Number);
localStorage.setItem("phase", Moon.phase(spl[0], spl[2], spl[1]).name);
document.getElementById("phase").innerHTML += localStorage["phase"];

let t1 = document.getElementById("1");
let t2 = document.getElementById("2");
let t3 = document.getElementById("3");
let t4 = document.getElementById("4");
let t5 = document.getElementById("5");
let t6 = document.getElementById("6");
let t7 = document.getElementById("7");
let t8 = document.getElementById("8");
let t9 = document.getElementById("9");
let t10 = document.getElementById("10");
let t11 = document.getElementById("11");
let t12 = document.getElementById("12");
let t13 = document.getElementById("13");
let t14 = document.getElementById("14");
let t15 = document.getElementById("15");
let t16 = document.getElementById("16");
let t17 = document.getElementById("17");
let t18 = document.getElementById("18");
let t19 = document.getElementById("19");
let t20 = document.getElementById("20");

let hash = {
  0.00002: t1,
  0.0001: t2,
  0.003: t3,
  2: t4,
  4.3: t5,
  10: t6,
  20: t7,
  30: t8,
  50: t9,
  100: t10,
  200: t11,
  444: t12,
  1344: t13,
  27700: t14,
  158200: t15,
  3000000: t16,
  53000000: t17,
  147000000: t18,
  1000000000: t19,
  9000000000: t20,
};

function verbTense(age) {
  for (let distance in hash) {
    let text = hash[distance].innerHTML;
    if (Number(age) >= Number(distance)) {
      text = text.replace("${you will have/you}", "you");
    } else {
      text = text.replace("${you will have/you}", "<i>you will have<i>");
    }
    hash[distance].innerHTML = text;
  }
}

verbTense(localStorage["age"]);

let nam = document.getElementById("nam");

nam.innerText = nam.innerText.replace("${Name}", localStorage["name"]);

const track = document.getElementById("image-track");

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  if (track.dataset.percentage < -92) {
    track.dataset.percentage = -91.3194;
  }
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
  if (nextPercentage < -92) {
    nextPercentage = -91.3194;
  }

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

track.onmousedown = (e) => handleOnDown(e);

track.ontouchstart = (e) => handleOnDown(e.touches[0]);

track.onmouseup = (e) => handleOnUp(e);

track.ontouchend = (e) => handleOnUp(e.touches[0]);

track.onmousemove = (e) => handleOnMove(e);

track.ontouchmove = (e) => handleOnMove(e.touches[0]);
