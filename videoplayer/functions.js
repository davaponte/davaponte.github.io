function ChangeLogo01() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/logo01.jpg";
}

function ChangeLogo02() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/logo02.jpg";
}

function ChangeLogo03() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/logo03.jpg";
}

function SelectVideoMP4() {
  document.getElementById("video").src = "./users/0001/videos/Another One Bites the Dust.mp4";
  document.getElementById("video").type = "video/mp4";
}

function SelectVideoOGV() {
  document.getElementById("video").src = "./users/0001/videos/Help.ogv";
  document.getElementById("video").type = "video/ogg";
}

function SelectVideoWEBM() {
  document.getElementById("video").src = "./users/0001/videos/Yellow Submarine.webm";
  document.getElementById("video").type = "video/webm";
}

//Player functions
function ToggleMute() {
  document.getElementById("video").muted = !document.getElementById("video").muted;
}

function TogglePlayVideo() {
  if (document.getElementById("video").paused) {
    document.getElementById("video").play();
  } else {
    document.getElementById("video").pause();
  }
}

function Skip_x_msec(x) {
  document.getElementById("video").pause();
  var ActualTime = document.getElementById("video").currentTime;
  var NewTime = ActualTime + x;
  if ((NewTime <= document.getElementById("video").duration) && (NewTime >= 0)) {
    document.getElementById("video").currentTime = NewTime;
  }
}

function SetPlaybackSpeed(value) {
  document.getElementById("video").playbackRate = value;
}

function SecondsToHHMMSSMS(value) {
  var hours = Math.floor(value / 3600);
  var lh = ""
  if (hours <10) {
    lh = "0"
  }
  value = value - hours * 3600
  var minutes = Math.floor(value / 60);
  var lm = ""
  if (minutes <10) {
    lm = "0"
  }
  value = value - minutes * 60
  var seconds = Math.floor(value);
  var ls = ""
  if (seconds <10) {
    ls = "0"
  }
  value = value - seconds
  var msec = Math.floor(value * 1000);
  var lmsec = ""
  if (msec < 100) {
    lmsec = "0"
  }
  if (msec < 10) {
    lmsec = "00"
  }
  return lh + hours + ":" + lm + minutes + ":" + ls + seconds + "." + lmsec + msec
}

const frameRate = 33;

var x = setInterval(function() {

  var vid = document.getElementById("video");

  // Revisar este link para propiedades
  //  https://www.w3schools.com/jsref/dom_obj_video.asp

  //Calculo del tiempo transcurrido y su muestra en pantalla junto a la duración
  var timeInfoString = vid.currentSrc + "<br>" +
    "Elapsed time: " + SecondsToHHMMSSMS(vid.currentTime) + "<br>" +
    "Total time: " + SecondsToHHMMSSMS(vid.duration);

  var speedInfoString = "Speed: " + vid.playbackRate;

  document.getElementById("timerinfo").innerHTML = timeInfoString + "<br>" +
    speedInfoString;

  // If the count down is over, write some text
  if (vid.ended) {
    //clearInterval(x);
    document.getElementById("timerinfo").innerHTML = "VIDEO ENDED";
  }
}, frameRate); //Ejecuta esta función cada 33 ms
