function daysBetweenDates(d1, d2) {
  var diffDays, oneDay;
  oneDay = 24 * 60 * 60 * 1000;
  diffDays = (d2 - Date.parse(d1)) / oneDay;
  return diffDays;
}

let initialDistance =
  (daysBetweenDates(localStorage["bday"], new Date()) / 365) * 63241.077088066;

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
formatted = formatted[1] + "/" + formatted[2] + "/" + formatted[0];
document.getElementById("bday").innerHTML += formatted;
document.getElementById("moon").style["background-image"] =
  "url(" + localStorage["moon"] + ")";
let spl = localStorage["bday"];
spl = spl.split("-").map(Number);
localStorage.setItem("phase", Moon.phase(spl[0], spl[2], spl[1]).name);
document.getElementById("phase").innerHTML += localStorage["phase"];

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

track.onmousedown = (e) => handleOnDown(e);

track.ontouchstart = (e) => handleOnDown(e.touches[0]);

track.onmouseup = (e) => handleOnUp(e);

track.ontouchend = (e) => handleOnUp(e.touches[0]);

track.onmousemove = (e) => handleOnMove(e);

track.ontouchmove = (e) => handleOnMove(e.touches[0]);
