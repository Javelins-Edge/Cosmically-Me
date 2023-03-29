document.addEventListener("DOMContentLoaded", () => {
  // document.getElementById("head").scrollIntoView();
  if (localStorage["bday"] !== undefined) {
    document.querySelector("#sNav").style.opacity = "1";
    document.querySelector("#overflow").style.overflow = "visible";
    document.querySelector("#p1sID").innerText = localStorage["p1s"];
    document.querySelector("#p2sID").innerText = localStorage["p2s"];
    document.getElementById("cons").src = localStorage["cons"];
    document.querySelector("#data").innerText = localStorage["data"];
    document.querySelector("#sand").innerText = localStorage["finding"];
    document.querySelector("#wiki").href = localStorage["wiki"];
  }
});

// window.onload = function () {
//   document.getElementById("head").scrollIntoView();
//   window.scrollTo(0, 0, "instant");
// };

document.getElementById("refresh").addEventListener("click", (e) => {
  // document.getElementById("head").scrollIntoView();
  e.preventDefault();
  window.scrollTo(0, 0, "instant");
  localStorage.clear();
  location.reload();
});

function setup() {
  noLoop();
}

function daysBetweenDates(d1, d2) {
  let diffDays, oneDay;
  oneDay = 24 * 60 * 60 * 1000;
  diffDays = (d2 - Date.parse(d1)) / oneDay;
  return diffDays;
}

function bdStar(a) {
  for (let year in disHash) {
    if (a <= Number(year)) {
      dyear = year;
      localStorage.setItem("dyear", dyear);
      return disHash[year];
    }
  }
}

//Astronomy API - Moon phase call
function moonCall(date) {
  fetch("https://api.astronomyapi.com/api/v2/studio/moon-phase", {
    method: "POST",
    headers: {
      Authorization:
        "Basic MWNjYTU5MDAtNWJjOC00YWViLWJmYmEtNWVjNjNkMDM3NzE3OmQ0MzRlYjc1MDZiOWU0MWNjNzkwODJlYTYyY2MzNWUyMDk0ZWViZTcwYjhlY2RmYzY1MTQyN2Y4YjRiOGZmNWU3ZWZjMTU5MDNhZmZmZWMyMTMwNWEwZmZjNGZiMjg4ZTdlMTMyZDg5MGJhZDk3MWMwMGYzNGE5MTE0OTIzZWMxYzEyMTRkZWY2ZDE3N2RkYmU1NzEzNzIzNmJiZDAyOTJhMzI4ODcyODcyZGQwNDUyYTQzOGRmNTFmM2IxNjJmZGM2ZThkNDE1YzNjZGYzODA1ZTM2MTI1YjYxNmM0MzYy",
    },
    body: JSON.stringify({
      style: {
        moonStyle: "default",
        backgroundStyle: "stars",
        backgroundColor: "#000000",
        headingColor: "#ffffff",
        textColor: "#ffffff",
      },
      observer: {
        latitude: 33.775867,
        longitude: -84.39733,
        date: `${date}`,
      },
      view: { type: "portrait-simple", parameters: {} },
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("moon", response.data.imageUrl);
    })
    .catch((err) => console.error(err));
}

//Astronomy API - Star chart call
function StarChart(id) {
  fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
    method: "POST",
    headers: {
      Authorization:
        "Basic MWNjYTU5MDAtNWJjOC00YWViLWJmYmEtNWVjNjNkMDM3NzE3OmQ0MzRlYjc1MDZiOWU0MWNjNzkwODJlYTYyY2MzNWUyMDk0ZWViZTcwYjhlY2RmYzY1MTQyN2Y4YjRiOGZmNWU3ZWZjMTU5MDNhZmZmZWMyMTMwNWEwZmZjNGZiMjg4ZTdlMTMyZDg5MGJhZDk3MWMwMGYzNGE5MTE0OTIzZWMxYzEyMTRkZWY2ZDE3N2RkYmU1NzEzNzIzNmJiZDAyOTJhMzI4ODcyODcyZGQwNDUyYTQzOGRmNTFmM2IxNjJmZGM2ZThkNDE1YzNjZGYzODA1ZTM2MTI1YjYxNmM0MzYy",
    },
    body: JSON.stringify({
      style: "default",
      observer: {
        latitude: 33.775867,
        longitude: -84.39733,
        date: "2019-12-20",
      },
      view: { type: "constellation", parameters: { constellation: `${id}` } },
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("cons", response.data.imageUrl);
      document.getElementById("cons").src = response.data.imageUrl;
    })
    .catch((err) => console.error(err));
}

let age;
let bday;
let star;
let starL;
let constellation;
let dyear;
let asc;
let dec;

document.querySelector("#bday-form").addEventListener("submit", (e) => {
  e.preventDefault();
  bday = e.target[2].value;
  let name = e.target[0].value;
  name = name.split(" ")[0];
  let pronouns = e.target[1].value;
  localStorage.setItem("name", name);
  localStorage.setItem("pronouns", pronouns);
  console.log(bday);
  localStorage.setItem("bday", bday);
  let days = bday.split("-");
  days = days[1] + "/" + days[2] + "/" + days[0];
  let p1s = `Wow, you were born on ${days}, congratulations!`;
  localStorage.setItem("p1s", p1s);
  document.querySelector("#p1sID").innerHTML = p1s;
  age = daysBetweenDates(bday, new Date()) / 365;
  localStorage.setItem("age", age);
  star = bdStar(age);
  document.querySelector(
    "#wiki"
  ).href = `https://en.wikipedia.org/wiki/${star}`;
  starL = disHash[dyear];
  localStorage.setItem("starL", starL);
  star = disHash[dyear].split("_").join(" ");
  localStorage.setItem("star", star);
  localStorage.setItem(
    "wiki",
    `https://en.wikipedia.org/wiki/${localStorage["starL"]}`
  );
  dak();
  function dak() {
    let url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${disHash[dyear]}&formatversion=2&exsentences=10&exintro=1&explaintext=1&exsectionformat=plain`;
    loadJSON(
      url,
      (data) => {
        localStorage.setItem("data", data.query.pages[0].extract);
        document.querySelector(
          "#bd"
        ).innerText = `Here is some data from your Star's Wikipedia page.`;
        document.querySelector("#data").innerText = data.query.pages[0].extract;
      },
      "jsonp"
    );
    let other = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=${disHash[dyear]}&rvsection=0`;
    loadJSON(
      other,
      (data) => {
        let page = data.query.pages;
        let pageId = Object.keys(data.query.pages)[0];
        constellation = page[pageId].revisions[0]["*"].toString();
        let p = /(\|[+|\d.]+)|(constellation [\w ]+}})/gim;
        let arr = [];
        let match;
        while ((match = p.exec(constellation)) != null) {
          arr.push(match[0]);
        }
        constellation = arr[0].split(" ").slice(1);
        if (constellation[0] == "of") {
          constellation = constellation.splice(1).join(" ");
        } else {
          constellation = constellation.join(" ");
        }
        constellation = constellation.substring(0, constellation.length - 2);
        asc = arr[1].split("|").join(" ");
        dec = arr[2].split("|").join(" ");
        let p2s = `${name} your closest birth star is ${star}, in the constellation ${constellation}. The light from it was created around the day you were born, and has now arrived after traveling ${age.toFixed(
          3
        )} light years. How Exciting!`;
        document.querySelector("#p2sID").innerText = p2s;
        localStorage.setItem("p2s", p2s);
        let oId = String(idHash[constellation]).toLowerCase();
        StarChart(oId);
        moonCall(bday);
        localStorage.setItem("constellation", constellation);
        localStorage.setItem("asc", asc);
        localStorage.setItem("dec", dec);
        document.querySelector(
          "#sand"
        ).innerText = `Use this 3-D model to try and find ${star} in the constellation ${constellation}!`;
        localStorage.setItem(
          "finding",
          document.querySelector("#sand").innerText
        );
      },
      "jsonp"
    );
    document.querySelector("#overflow").style.overflow = "visible";
    document.querySelector("#sNav").style.animation =
      "fade 1s linear 0s 1 normal forwards";
  }
});

let disHash = {
  0: "Sun",
  1: "Sun",
  2: "Sun",
  2: "Sun",
  4: "Barnard's_Star",
  6: "Barnard's_Star",
  7: "Luhman_16",
  8: "Lalande_21185",
  9: "Sirius",
  10: "Ross_248",
  11: "EZ_Aquarii",
  12: "Groombridge_34",
  13: "Teegarden's_Star",
  14: "Gliese_876",
  15: "Gliese_876",
  16: "G_9-38",
  17: "2MASS_J09393548−2448279",
  18: "2MASS_J11145133−2618235",
  19: "VB_10",
  20: "2MASS_J09373487%2B2931409",
  21: "LP_658-2",
  22: "2MASS_1507−1627",
  24: "2MASS_1507−1627",
  25: "Fomalhaut",
  30: "Beta_Comae_Berenices",
  31: "Gliese_3512",
  32: "Gliese_638",
  35: "Zeta_Herculis",
  36: "Denebola",
  38: "Zeta_Doradus",
  40: "V538_Aurigae",
  41: "V538_Aurigae",
  42: "HD_40307",
  43: "HD_170657",
  44: "Theta_Ursae_Majoris",
  45: "Gamma_Cephei",
  46: "Tau1_Eridani",
  47: "Tau1_Eridani",
  48: "Psi_Capricorni",
  50: "Gliese_317",
  51: "HD_207129",
  52: "Ross_640",
  54: "Alpha_Circini",
  55: "39_Tauri",
  57: "37_Geminorum",
  59: "Rho_Geminorum",
  60: "Delta_Equulei",
  61: "HD_4747",
  63: "HD_43587",
  64: "DENIS-P_J020529.0−115925",
  65: "GD_356",
  66: "c_Ursae_Majoris",
  67: "EQ_Virginis",
  68: "HD_33564",
  69: "RR_Caeli",
  70: "HD_97658",
  71: "Theta_Sculptoris",
  72: "Mu_Cygni",
  73: "94_Ceti",
  74: "84_Ceti",
  75: "HD_90089",
  77: "Mu2_Cancri",
  78: "27_Cygni",
  79: "Iota_Leonis",
  80: "Gamma_Ceti",
  81: "Beta_Aurigae",
  82: "Epsilon_Ursae_Majoris",
  83: "HD_213429",
  84: "Lambda_Andromedae",
  85: "HD_20367",
  86: "9_Aurigae",
  87: "HD_134606",
  88: "11_Aquarii",
  89: "Epsilon2_Arae",
  90: "Xi2_Capricorni",
  91: "51_Aquilae",
  92: "Zeta_Aquarii",
  93: "HD_93083",
  94: "Omega_Andromedae",
  95: "HD_122862",
  96: "Pi_Canis_Majoris",
  97: "Alpha_Andromedae",
  98: "Eta_Arietis",
  99: "Delta_Cassiopeiae",
  100: "Cor_Caroli",
  20.5: "Gliese_581",
  21.6: "WISEPA_J041022.71%2B150248.5",
  22.7: "Gliese_402",
  23.2: "WISEPC_J205628.90%2B145953.3",
  23.6: "Gliese_105",
  24.6: "Gliese_623",
  25.6: "Gliese_623",
  26.2: "Gliese_623",
  26.5: "Gliese_623",
  27.2: "2MASS_J03480772−6022270",
  27.6: "Beta_Canum_Venaticorum",
  28.1: "Gliese_877",
  28.6: "2MASS_J00361617%2B1821104",
  29.1: "Gamma_Leporis",
  29.6: "Gliese_433",
  30.2: "Gamma_Pavonis",
  31.2: "Gamma_Pavonis",
  32.4: "Alpha_Mensae",
  33.2: "Alpha_Mensae",
  33.7: "Pollux_(star)",
  34.2: "WISE_J2030%2B0749",
  34.6: "WISE_J2030%2B0749",
  35.6: "Beta_Virginis",
  36.5: "11_Leonis_Minoris",
  37.2: "Gliese_208",
  38: "Zeta_Doradus",
  38.5: "Iota_Pegasi",
  39.2: "Zeta_Reticuli",
  39.5: "Zeta_Trianguli_Australis",
  40.3: "Beta_Trianguli_Australis",
  41.5: "HD_172051",
  42.5: "HD_172051",
  43.3: "Gliese_69",
  44.3: "HD_154577",
  45.5: "10_Tauri",
  46.8: "Pi1_Ursae_Majoris",
  47.4: "Pi1_Ursae_Majoris",
  48.6: "Alpha_Ophiuchi",
  49.3: "Gliese_163",
  49.5: "31_Aquilae",
  50.5: "Delta_Aquilae",
  51.6: "Chi_Herculis",
  52.7: "Gliese_1062",
  53.2: "Xi_Pegasi",
  53.5: "BPM_37093",
  54.6: "39_Tauri",
  55.5: "HD_7924",
  56.1: "Rho_Coronae_Borealis",
  56.6: "Iota_Horologii",
  57.6: "15_Sagittae",
  58.1: "Alpha_Comae_Berenices",
  58.4: "Eta_Coronae_Borealis",
  59.6: "HD_87883",
  60.6: "Kelu-1",
  61.3: "6_Ceti",
  62.2: "Gliese_710",
  62.6: "110_Herculis",
  63.5: "Rho_Puppis",
  64.5: "HD_189733",
  65.5: "HD_217107",
  66.5: "Sigma2_Ursae_Majoris",
  67.5: "94_Aquarii",
  68.4: "Kappa_Tucanae",
  69.6: "9_Ceti",
  70.5: "Zeta_Leporis",
  71.5: "HD_91324",
  72.5: "Iota_Virginis",
  73.5: "Chi_Ceti",
  74.5: "Psi1_Draconis",
  75.6: "Chi_Ceti",
  76.3: "HIP_12961",
  76.5: "HD_1461",
  77.7: "Kappa_Phoenicis",
  78.4: "HD_134060",
  79.6: "7_Andromedae",
};

let idHash = {
  Andromeda: "And",
  Antlia: "Ant",
  Apus: "Aps",
  Aquila: "Aqr",
  Aquarius: "Aql",
  Ara: "Ara",
  Aries: "Ari",
  Auriga: "Aur",
  Boötes: "Boo",
  Caelum: "Cae",
  Camelopardalis: "Cam",
  Cancer: "Cnc",
  "Canes Venatici": "CVn",
  "Canis Major": "CMa",
  "Canis Minor": "CMi",
  Capricornus: "Cap",
  Carina: "Car",
  Cassiopeia: "Cas",
  Centaurus: "Cen",
  Cepheus: "Cep",
  Cetus: "Cet",
  Chamaeleon: "Cha",
  Circinus: "Cir",
  Columba: "Col",
  "Coma Berenices": "Com",
  "Corona Australis": "CrA",
  "Corona Borealis": "CrB",
  Corvus: "Crv",
  Crater: "Crt",
  Crux: "Cru",
  Cygnus: "Cyg",
  Delphinus: "Del",
  Dorado: "Dor",
  Draco: "Dra",
  Equuleus: "Equ",
  Eridanus: "Eri",
  Fornax: "For",
  Gemini: "Gem",
  Grus: "Gru",
  Hercules: "Her",
  Horologium: "Hor",
  Hydra: "Hya",
  Hydrus: "Hyi",
  Indus: "Ind",
  Lacerta: "Lac",
  Leo: "Leo",
  "Leo Minor": "LMi",
  Lepus: "Lep",
  Libra: "Lib",
  Lupus: "Lup",
  Lynx: "Lyn",
  Lyra: "Lyr",
  Mensa: "Men",
  Microscopium: "Mic",
  Monoceros: "Mon",
  Musca: "Mus",
  Norma: "Nor",
  Octans: "Oct",
  Ophiuchus: "Oph",
  Orion: "Ori",
  Pavo: "Pav",
  Pegasus: "Peg",
  Perseus: "Per",
  Phoenix: "Phe",
  Pictor: "Pic",
  Pisces: "Psc",
  "Piscis Austrinus": "PsA",
  Puppis: "Pup",
  Pyxis: "Pyx",
  Reticulum: "Ret",
  Sagitta: "Sge",
  Sagittarius: "Sgr",
  Scorpius: "Sco",
  Sculptor: "Scl",
  Scutum: "Sct",
  Serpens: "Ser",
  Sextans: "Sex",
  Taurus: "Tau",
  Telescopium: "Tel",
  Triangulum: "Tri",
  "Triangulum Australe": "TrA",
  Tucana: "Tuc",
  "Ursa Major": "UMa",
  "Ursa Minor": "UMi",
  Vela: "Vel",
  Virgo: "Vir",
  Volans: "Vol",
  Vulpecula: "Vul",
};
