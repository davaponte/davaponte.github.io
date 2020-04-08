function ChangeLogo01() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/logo01.jpg";
}

function ChangeLogo02() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/logo02.jpg";
}

function ChangeLogo03() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/logo03.jpg";
}

function NextSub() {
  document.getElementById("subtitle").src = "./users/0001/subtitles/" + dict["00070.567-00074.533"];
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

function SelectVideoCosmos() {
  document.getElementById("video").src = "./users/0001/videos/Cosmos.mp4";
  document.getElementById("video").type = "video/mp4";
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


function ShowSubtitles(event) {
  var ActualTime = event.currentTime;

  // console.log(subtitles[0]);
  // console.log(ActualTime);
  var Item = subtitles.filter(function(data) {
    return ((ActualTime >= data.start) && (ActualTime <= data.stop));
  });

  if (Item.length > 0) {
    document.getElementById("subtitle").src = "./users/0001/subtitles/" + Item[0].img;
    document.getElementById("subtitle").alt = "";
    // console.log(Item[0].img);
  } else {
    document.getElementById("subtitle").src = "";
    document.getElementById("subtitle").alt = "SoftNI Subtitler Suite";
    // console.log('NOT FOUND');
  }
};

/*
var y = setInterval(function() {
  var vid = document.getElementById("video");

  if (vid.play)

  var ActualTime = vid.currentTime;

  for(var key in dict) {
    var value = dict[key];
    var StartTime = key.substr(0, 9);
    var StopTime = key.substr(10, 9);

    // console.log('ActualTime: ' + ActualTime);
    // console.log('StartTime: ' + StartTime);
    // console.log('StopTime: ' + StopTime);

    if ((ActualTime >= StartTime) && (ActualTime <= StopTime)) {
      TogglePlayVideo();
      document.getElementById("subtitle").src = "./users/0001/subtitles/" + value;
      TogglePlayVideo();
      return;
    }
    document.getElementById("subtitle").src = "";
  }
}, 250); //Esto es lo que lee y pone los subs
*/
//
// function ReadFiles() {
//   var fs = require('fs');
//   var files = fs.readdirSync('/users/0001/subtitles/');
//
//   for(i=0;i<files.length;i++){
//     console.log(files[i]);
//   }
//
// }
