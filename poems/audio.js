var rafID = null;
var analyser = null;
var c = null;
var cDraw = null;
var ctx = null;
var microphone = null;
var ctxDraw = null;

var loader;
var filename;
var fileChosen = false;
var hasSetupUserMedia = false;

var AudioContext = AudioContext || webkitAudioContext;
var context = new AudioContext();

if (!window.requestAnimationFrame)
  window.requestAnimationFrame = window.webkitRequestAnimationFrame;

$(function () {
  "use strict";
  loader = new BufferLoader();
  initBinCanvas();
});

function handleFiles(files) {
  if (files.length === 0) {
    return;
  }
  fileChosen = true;
  setupAudioNodes();
  var fileReader = new FileReader();
  fileReader.onload = function () {
    var arrayBuffer = this.result;
    console.log(arrayBuffer);
    console.log(arrayBuffer.byteLength);

    filename = files[0].name.toString();
    filename = filename.slice(0, -4);
    console.log(filename);

    var url = files[0].urn || files[0].name;
    ID3.loadTags(
      url,
      function () {
        var tags = ID3.getAllTags(url);
        if (tags.title.length > 14 && tags.title.length <= 17) {
          $("#title").css("font-size", "7.5vh");
        }
        if (tags.title.length > 17 && tags.title.length <= 20) {
          $("#title").css("font-size", "6.5vh");
        }

        if (tags.title.length > 20) {
          $("#title").css("font-size", "5vh");
        }

        $("#title").html(tags.title);

        onWindowResize();

        $("#title").css("visibility", "visible");

        $("#artist").html(tags.artist);
        $("#artist").css("visibility", "visible");
        $("#album").html(tags.album);
        $("#album").css("visibility", "visible");
      },
      {
        tags: ["title", "artist", "album", "picture"],
        dataReader: ID3.FileAPIReader(files[0]),
      }
    );
  };
  fileReader.readAsArrayBuffer(files[0]);
  var url = URL.createObjectURL(files[0]);

  var request = new XMLHttpRequest();

  request.addEventListener("progress", updateProgress);
  request.addEventListener("load", transferComplete);
  request.addEventListener("error", transferFailed);
  request.addEventListener("abort", transferCanceled);

  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    context.decodeAudioData(
      request.response,
      function (buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
        $("#freq, body").addClass("animateHue");
      },
      function (e) {
        console.log(e);
      }
    );
  };
  request.send();
}

function dS() {
  let s = document.getElementById("star1");
  s.style.visibility = "hidden";
  setTimeout(() => {
    s.style.visibility = "visible";
  }, 58000);
}

function playSample() {
  dS();
  fileChosen = true;
  setupAudioNodes();

  var request = new XMLHttpRequest();

  request.addEventListener("progress", updateProgress);
  request.addEventListener("load", transferComplete);
  request.addEventListener("error", transferFailed);
  request.addEventListener("abort", transferCanceled);

  request.open("GET", "./audio/earthFinal.wav", true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    $("#title").html("Earth");
    $("#album").html(`${localStorage["name"]}`);
    $("#artist").html("An Empty Field");
    onWindowResize();
    $("#title, #artist, #album").css("visibility", "visible");

    context.decodeAudioData(
      request.response,
      function (buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
        $("#freq, body").addClass("animateHue");
      },
      function (e) {
        console.log(e);
      }
    );
  };
  request.send();
}

function dE() {
  let e = document.getElementById("earth1");
  e.style.visibility = "hidden";
  setTimeout(() => {
    e.style.visibility = "visible";
  }, 50000);
}

function playStar() {
  dE();
  fileChosen = true;
  setupAudioNodes();

  var request = new XMLHttpRequest();

  request.addEventListener("progress", updateProgress);
  request.addEventListener("load", transferComplete);
  request.addEventListener("error", transferFailed);
  request.addEventListener("abort", transferCanceled);

  request.open("GET", "./audio/starFinal.wav", true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    $("#title").html(`${localStorage["star"].substring(0, 8)}`);
    $("#album").html(`${localStorage["name"]}`);
    $("#artist").html("Birth Star");
    onWindowResize();
    $("#title, #artist, #album").css("visibility", "visible");

    context.decodeAudioData(
      request.response,
      function (buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
        $("#freq, body").addClass("animateHue");
      },
      function (e) {
        console.log(e);
      }
    );
  };
  request.send();
}

function updateProgress(oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
    console.log(
      "Loading music file... " + Math.floor(percentComplete * 100) + "%"
    );
    $("#loading").html("Loading... " + Math.floor(percentComplete * 100) + "%");
  } else {
    console.log("Unable to compute progress info.");
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.");
  $("#loading").html("");
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
  $("#loading").html("Loading failed.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
  $("#loading").html("Loading canceled.");
}

function initBinCanvas() {
  "use strict";
  c = document.getElementById("freq");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx = c.getContext("2d");

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  window.addEventListener("resize", onWindowResize, false);

  var gradient = ctx.createLinearGradient(
    0,
    c.height - 300,
    0,
    window.innerHeight - 25
  );
}

function onWindowResize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  var containerHeight = $("#song_info_wrapper").height();
  var topVal = $(window).height() / 2 - containerHeight / 2;
  $("#song_info_wrapper").css("top", topVal);

  if ($(window).width() <= 500) {
    $("#title").css("font-size", "40px");
  }
}

var audioBuffer;
var sourceNode;
function setupAudioNodes() {
  analyser = context.createAnalyser();
  sourceNode = context.createBufferSource();
  sourceNode.connect(analyser);
  sourceNode.connect(context.destination);
  rafID = window.requestAnimationFrame(updateVisualization);
}

function updateVisualization() {
  if (fileChosen || hasSetupUserMedia) {
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    drawBars(array);
  }

  rafID = window.requestAnimationFrame(updateVisualization);
}

function drawBars(array) {
  var threshold = 0;
  ctx.clearRect(0, 0, c.width, c.height);
  var maxBinCount = array.length;
  var space = 3;

  ctx.save();

  ctx.globalCompositeOperation = "source-over";

  ctx.scale(0.5, 0.5);
  ctx.translate(window.innerWidth, window.innerHeight);
  ctx.fillStyle = "#fff";

  var bass = Math.floor(array[1]);
  var radius =
    0.45 * $(window).width() <= 450
      ? -(bass * 0.25 + 0.45 * $(window).width())
      : -(bass * 0.25 + 450);

  var bar_length_factor = 1;
  if ($(window).width() >= 785) {
    bar_length_factor = 1.0;
  } else if ($(window).width() < 785) {
    bar_length_factor = 1.5;
  } else if ($(window).width() < 500) {
    bar_length_factor = 20.0;
  }
  for (var i = 0; i < maxBinCount; i++) {
    var value = array[i];
    if (value >= threshold) {
      ctx.fillRect(
        0,
        radius,
        $(window).width() <= 450 ? 2 : 3,
        -value / bar_length_factor
      );
      ctx.rotate(((180 / 128) * Math.PI) / 180);
    }
  }

  for (var i = 0; i < maxBinCount; i++) {
    var value = array[i];
    if (value >= threshold) {
      ctx.rotate((-(180 / 128) * Math.PI) / 180);
      ctx.fillRect(
        0,
        radius,
        $(window).width() <= 450 ? 2 : 3,
        -value / bar_length_factor
      );
    }
  }

  for (var i = 0; i < maxBinCount; i++) {
    var value = array[i];
    if (value >= threshold) {
      ctx.rotate(((180 / 128) * Math.PI) / 180);
      ctx.fillRect(
        0,
        radius,
        $(window).width() <= 450 ? 2 : 3,
        -value / bar_length_factor
      );
    }
  }

  ctx.restore();
}
