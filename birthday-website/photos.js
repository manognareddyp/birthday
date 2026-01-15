/* 🎵 CONTINUE MUSIC */
const music = document.getElementById("bgMusic");

const playlist = [
  "premante.mp3",
  "omanasa.mp3",
  "malli-raava.mp3"
];

let currentTrack = 0;

// Resume music
const musicStarted = localStorage.getItem("musicStarted");

if (musicStarted === "yes") {
  music.src = playlist[0];   // start cleanly
  music.play();
  localStorage.setItem("musicStarted", "photos"); // mark as handled
}


music.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  music.src = playlist[currentTrack];
  music.play();
});

/* 🎞️ SLIDESHOW (FADE AFTER 4 SECONDS) */
const photos = [
  "photo1.jpeg", "photo2.jpeg", "photo3.jpeg", "photo4.jpeg", "photo5.jpeg",
  "photo6.jpeg", "photo7.jpeg", "photo8.jpeg", "photo9.jpeg", "photo10.jpeg",
  "photo11.jpeg", "photo12.jpeg", "photo13.jpeg", "photo14.jpeg", "photo15.jpeg"
];


let index = 0;
const slideImage = document.getElementById("slideImage");

// Show first image
slideImage.src = photos[index];

setInterval(() => {
  // Start fade out
  slideImage.style.opacity = 0;

  // After fade-out, change image & fade in
  setTimeout(() => {
    index = (index + 1) % photos.length;
    slideImage.src = photos[index];
    slideImage.style.opacity = 1;
  }, 1200); // matches CSS transition time

}, 4000); // 👈 FADE AFTER 4 SECONDS

/* 💖 HEARTS / SPARKLES */
const heartsContainer = document.querySelector(".hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = Math.random() > 0.5 ? "💖" : "✨";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}, 400);

/* ⬅ BACK */
function goBack() {
  window.location.href = "index.html";
}
