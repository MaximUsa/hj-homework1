'use strict';


const tracks = [
  'LA Chill Tour',
  'This is it band',
  'LA Fusion Jam'
 ];

const playBtn = document.getElementsByClassName('playstate')[0];
const stopBtn = document.getElementsByClassName('stop')[0];
const backBtn = document.getElementsByClassName('back')[0];
const forvardBtn = document.getElementsByClassName('next')[0];
const audio = document.getElementsByTagName('audio')[0];
const titleTr = document.getElementsByClassName('title')[0];
const mediaPlayer = document.getElementsByClassName('mediaplayer')[0];

let trackNum = 0;
setTrack(trackNum);

function setTrack(n) {
	const prevTrackPaused = audio.paused;
	audio.src = 'mp3/' + tracks[n] + 'mp3';
	titleTr.title = tracks[n];
	if (!prevTrackPaused) {
		play();
	}
}


function trackUp() {
	if (this === backBtn){
		trackNum === 0 ?
			trackNum = tracks.length -1 : trackNum--;
	} else {
		trackNum === tracks.length -1 ?
		trackNum = 0 : trackNum++;
	}
	setTrack(trackNum);
}


function pause() {
	audio.pause();
	mediaPlayer.classList.remove('play');
}


function play() {
	audio.play();
	mediaPlayer.classList.add('play');
}

function stop() {
	pause();
	audio.currentTime = 0;
}

function playState() {
	audio.paused ? play() : pause();
}


backBtn.onclick = forvardBtn.onclick = trackUp;
playBtn.onclick = playState;
stopBtn.onclick = audio.onended = stop;






