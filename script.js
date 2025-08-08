
const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "song1.mp3",
    cover: "cover1.jpg"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "song2.mp3",
    cover: "cover2.jpg"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "song3.mp3",
    cover: "cover3.jpg"
  }
];

let currentTrack = 0;
const audio = new Audio(songs[currentTrack].src);

const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const trackListEl = document.getElementById("track-list");

function loadTrack(index) {
  const song = songs[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  updatePlaylistUI();
}

function playPauseTrack() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % songs.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadTrack(currentTrack);
  audio.play();
  playBtn.textContent = "⏸️";
}

function updateProgress() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function seekTrack() {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

function setVolume() {
  audio.volume = volume.value;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function updatePlaylistUI() {
  trackListEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === currentTrack) li.style.color = "#1db954";
    li.addEventListener("click", () => {
      currentTrack = index;
      loadTrack(currentTrack);
      audio.play();
      playBtn.textContent = "⏸️";
    });
    trackListEl.appendChild(li);
  });
}

playBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
progress.addEventListener("input", seekTrack);
volume.addEventListener("input", setVolume);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextTrack);

// Initialize
loadTrack(currentTrack);
updatePlaylistUI();

