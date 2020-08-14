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

// //Ya no vamos a usar un setInterval para mostrar la info sino el evento ontimeupdate del video
// const frameRate = 33;
//
// var x = setInterval(function() {
//
//   var vid = document.getElementById("video");
//
//   // Revisar este link para propiedades
//   //  https://www.w3schools.com/jsref/dom_obj_video.asp
//
//   //Calculo del tiempo transcurrido y su muestra en pantalla junto a la duración
//   var timeInfoString = vid.currentSrc + "<br>" +
//     "Elapsed time: " + SecondsToHHMMSSMS(vid.currentTime) + "<br>" +
//     "Total time: " + SecondsToHHMMSSMS(vid.duration);
//
//   var speedInfoString = "Speed: " + vid.playbackRate;
//
//   document.getElementById("timerinfo").innerHTML = timeInfoString + "<br>" +
//     speedInfoString;
//
//   // If the count down is over, write some text
//   if (vid.ended) {
//     //clearInterval(x);
//     document.getElementById("timerinfo").innerHTML = "VIDEO ENDED";
//   }
// }, frameRate); //Ejecuta esta función cada 33 ms

function ReportInfo(event) {
  // Revisar este link para propiedades
  //  https://www.w3schools.com/jsref/dom_obj_video.asp

  var filepath = event.currentSrc;

  // Use the regular expression to replace the non-matching content with a blank space
  var filenameWithExtension = filepath.replace(/^.*[\\\/]/, '').bold().big();

  //Calculo del tiempo transcurrido y su muestra en pantalla junto a la duración
  //var timeInfoString = "Now playing: " + decodeURI(filenameWithExtension) + "<br>" +
  // decodeURI() solo funciona con %20, por eso cambié a unescape()
  var timeInfoString = "Now playing: " + unescape(filenameWithExtension) + "<br>" +
    "Elapsed time: " + SecondsToHHMMSSMS(event.currentTime) + "<br>" +
    "Total time: " + SecondsToHHMMSSMS(event.duration);

  var speedInfoString = "Speed: " + event.playbackRate;

  document.getElementById("timerinfo").innerHTML = timeInfoString + "<br>" +
    speedInfoString;

  // If the count down is over, write some text
  if (event.ended) {//No debería pasar nunca pues el video está en loop
    document.getElementById("timerinfo").innerHTML = "VIDEO ENDED";
  }
}

// function FILTERShowSubtitles(event) { //Esta versión es más lenta por lo que no se usará
//   var ActualTime = event.currentTime;
//
//   // console.log(subtitles[0]);
//   // console.log(ActualTime);
//   var Item = subtitles.filter(function(data) {
//     return ((ActualTime >= data.start) && (ActualTime <= data.stop));
//   });
//
//   if (Item.length > 0) {
//     document.getElementById("subtitle").src = "./users/0001/subtitles/" + Item[0].img;
//     document.getElementById("subtitle").alt = "";
//     // console.log(Item[0].img);
//   } else {
//     document.getElementById("subtitle").src = "";
//     document.getElementById("subtitle").alt = "SoftNI Subtitler Suite";
//     // console.log('NOT FOUND');
//   }
// };

function PrintArray(TheArray) {
  var Result = '[ ';
  for(var line in TheArray) {
    Result = Result + TheArray[line] + ', ';
  }
  return Result.slice(0, -2) + ' ]';
}

function ShowSubtitles(event) {
  var ActualTime = event.currentTime;

  for(var key in subtitles) {
    var value = subtitles[key];
    var StartTime = subtitles[key].start;
    var StopTime = subtitles[key].stop;
    var Found = false;

    if ((ActualTime >= StartTime) && (ActualTime <= StopTime)) {
      document.getElementById("subtitle").src = "./users/0001/subtitles/Cosmos/" + value.img;
      document.getElementById("subtitle").alt = "";
      Found = true;
      break;
    }
  }
  ReportInfo(event); //Invoca reporte de avance en tiempo
  if (!Found) {
    //Lo siguiente pone una imagen PNG transparente de 1x1px cuando no hay subs
    //pues Chrome se queja si el elemento src está vacío
    document.getElementById("subtitle").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    document.getElementById("subtitle").alt = "SoftNI Subtitler Suite";
  } else {
    document.getElementById("timerinfo").innerHTML = document.getElementById("timerinfo").innerHTML + '<br>' +
      'Subtitle texts: ' + PrintArray(value.texts).fontcolor("green");
  }
};
