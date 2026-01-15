document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */

  const welcomeModal = document.getElementById("welcomeModal");
  const voiceModal = document.getElementById("voiceModal");
  const listenModal = document.getElementById("listenModal");
  const birthdayCard = document.getElementById("birthdayCard");
  const memories = document.getElementById("memories");

  const countdown = document.getElementById("countdown");
  const surprise = document.getElementById("surprise");

  const slideImage = document.getElementById("slideImage");
  const slideVideo = document.getElementById("slideVideo");

  const music = document.getElementById("bgMusic");
  const voiceNote = document.getElementById("voiceNote");

  /* ================= BIRTHDAY DATE ================= */

  const birthday = new Date(2026, 3, 7, 0, 0, 0);

  /* ================= MUSIC ================= */

  const playlist = ["premante.mp3", "qqqq.mp3", "sada.mp3", "malli-raava.mp3"];
  let currentTrack = 0;

  /* ================= FLOW ================= */

  window.goToListen = () => {
    welcomeModal.classList.add("hidden");
    voiceModal.classList.remove("hidden");
  };

  window.playVoice = () => {
    voiceNote.currentTime = 0;
    voiceNote.play().catch(err => console.error(err));
  };

  voiceNote.addEventListener("ended", () => {
    voiceModal.classList.add("hidden");
    listenModal.classList.remove("hidden");
  });

  window.startExperience = () => {
    music.src = playlist[currentTrack];
    music.play();

    listenModal.classList.add("hidden");
    birthdayCard.classList.remove("hidden");

    startBalloons();
  };

  music.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    music.src = playlist[currentTrack];
    music.play();
  });

  /* ================= COUNTDOWN ================= */

  function updateCountdown() {
    const diff = birthday - new Date();

    if (diff <= 0) {
      countdown.innerText = "🎉 It's your Birthday!";
      launchConfetti();
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.innerText = `⏳ ${d}d ${h}h ${m}m ${s}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ================= BALLOONS ================= */

  let balloonInterval = null;

  function startBalloons() {
    if (balloonInterval) return;

    balloonInterval = setInterval(() => {
      confetti({
        particleCount: 1,
        gravity: -0.3,
        scalar: 2,
        colors: ["#ffd6e0", "#cdb4db", "#b7add3", "#fff1a8", "#afe7af"],
        origin: { x: Math.random(), y: 1.2 }
      });
    }, 350);
  }

  /* ================= CONFETTI ================= */

  window.launchConfetti = () => {
    const end = Date.now() + 22000;
    (function frame() {
      confetti({ particleCount: 16, spread: 360 });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  /* ================= SLIDESHOW (IMAGES + VIDEO) ================= */

  const IMAGE_DURATION = 6000;

  const slides = [
  { type: "image", src: "0.jpeg" },
  { type: "image", src: "14.jpeg" },
  { type: "video", src: "1.mp4" },
  { type: "image", src: "photo2.jpeg" },
  { type: "image", src: "2.jpeg" },
  { type: "image", src: "photo3.jpeg" },
  { type: "image", src: "3.jpeg" },
  { type: "image", src: "photo4.jpeg" },
  { type: "image", src: "4.jpeg" },
  { type: "image", src: "photo5.jpeg" },
  { type: "image", src: "5.jpeg" },
  { type: "image", src: "photo6.jpeg" },
  { type: "image", src: "6.jpeg" },
  { type: "image", src: "7.jpeg" },
  { type: "image", src: "photo7.jpeg" },
  { type: "image", src: "8.jpeg" },
  { type: "image", src: "photo8.jpeg" },
  { type: "image", src: "9.jpeg" },
  { type: "image", src: "photo9.jpeg" },
  { type: "image", src: "10.jpeg" },
  { type: "image", src: "photo10.jpeg" },
  { type: "image", src: "15.jpeg" },
  { type: "image", src: "photo11.jpeg" },
  { type: "image", src: "11.jpeg" },
  { type: "image", src: "photo12.jpeg" },
  { type: "image", src: "12.jpeg" },
  { type: "image", src: "photo13.jpeg" },
  { type: "image", src: "13.jpeg" },
  { type: "image", src: "photo14.jpeg" },
  { type: "image", src: "photo15.jpeg" },
  { type: "image", src: "photo16.jpeg" },
  { type: "image", src: "16.jpeg" },
  { type: "image", src: "17.jpeg" },
  { type: "image", src: "18.jpeg" },
  { type: "image", src: "19.jpeg" },
  { type: "image", src: "20.jpeg" },
  { type: "image", src: "21.jpeg" },
  { type: "image", src: "22.jpeg" },
  { type: "image", src: "23.jpeg" }
];


  let slideIndex = 0;
  let slideshowStarted = false;

  function startSlideshow() {
    if (slideshowStarted) return;
    slideshowStarted = true;

    showSlide();
  }

  function showSlide() {
    const slide = slides[slideIndex];

    // Hide both
    slideImage.classList.add("hidden");
    slideVideo.classList.add("hidden");
    slideVideo.pause();

    if (slide.type === "image") {
      slideImage.src = slide.src;
      slideImage.classList.remove("hidden");
      slideImage.style.opacity = 1;
      slideImage.style.transform = "scale(1.05)";

      setTimeout(nextSlide, IMAGE_DURATION);

    } else if (slide.type === "video") {
      slideVideo.src = slide.src;
      slideVideo.currentTime = 0;
      slideVideo.classList.remove("hidden");
      slideVideo.load();
      slideVideo.play().catch(err => {
      console.error("Video play failed:", err);
});
      slideVideo.onended = nextSlide;
    }
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
  }

  /* ================= HEARTS ================= */

  let heartsInterval = null;

  function startHearts() {
    if (heartsInterval) return;

    const heartsContainer = document.querySelector(".hearts");
    if (!heartsContainer) return;

    heartsInterval = setInterval(() => {
      const heart = document.createElement("span");
      heart.textContent = Math.random() > 0.5 ? "🌸" : "🎈";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = 15 + Math.random() * 20 + "px";

      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, 400);
  }

  /* ================= SURPRISE ================= */

  window.showSurprise = () => {
    surprise.classList.remove("hidden");

    setTimeout(() => {
      birthdayCard.classList.add("hidden");
      memories.classList.remove("hidden");

      startSlideshow();
      startHearts();
    }, 25000);
  };

  /* ================= BACK ================= */

  window.backToCard = () => {
    memories.classList.add("hidden");
    birthdayCard.classList.remove("hidden");
  };

});
