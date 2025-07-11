const routes = {
  "/": "",
  "/data-engineering":
    "<h2>Data Engineering</h2><p>Building pipelines, handling big data, and more.</p>",
  "/data-visualization":
    "<h2>Data Visualization</h2><p>Making complex data digestible and beautiful.</p>",
  "/full-stack-development":
    "<h2>Full Stack Development</h2><p>Frontend and backend unite here.</p>",
  "/video-production":
    "<h2>Video Production</h2><p>Lights, camera, final cut.</p>",
  "/photo-manipulation":
    "<h2>Photo Manipulation</h2><p>Editing magic and pixel precision.</p>",
  "/drone-operation": "<h2>Drone Operation</h2><p>Sky views from above.</p>",
  "/about":
    "<h2>About</h2><p>Learn more about Eye of Kirk and our mission.</p>",
  "/contact":
    "<h2>Contact</h2><p>Get in touch with us for collaborations or inquiries.</p>",
};

function navigate(path) {
  history.pushState({}, "", path);
  renderContent(path);

  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.remove("show");
  hamburger.classList.remove("active");
}

function renderContent(path) {
  const homeSection = document.getElementById("home-section");
  const content = document.getElementById("content");

  if (path === "/index.html") {
    history.replaceState({}, "", "/");
    path = "/";
  }

  if (path === "/") {
    homeSection.style.display = "block";
    content.classList.remove("show");
    content.innerHTML = "";
  } else {
    homeSection.style.display = "none";
    content.innerHTML = routes[path] || "<h2>404</h2><p>Page not found.</p>";
    content.classList.add("show");
  }
}

document.addEventListener("click", (e) => {
  const target = e.target.closest("a");
  if (target && target.href.startsWith(window.location.origin)) {
    e.preventDefault();
    navigate(new URL(target.href).pathname);
  }
});

window.addEventListener("popstate", () => {
  renderContent(window.location.pathname);
});

document.addEventListener("DOMContentLoaded", () => {
  renderContent(window.location.pathname);

  const audio = document.getElementById("backgroundAudio");
  const buttonIcon = document.querySelector("#speakerButton i");

  if (audio && buttonIcon) {
    audio.muted = true; // Start muted
    buttonIcon.className = "fa-solid fa-volume-xmark"; // Mute icon as default
  }
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");
  menu.classList.toggle("show");
  hamburger.classList.toggle("active");
}

function togglePlay() {
  const buttonIcon = document.querySelector("#speakerButton i");
  const audio = document.getElementById("backgroundAudio");

  if (!audio || !buttonIcon) return;

  if (audio.muted || audio.paused) {
    audio.muted = false;
    audio.play().catch(() => {
      console.log("Audio playback blocked until user interacts.");
    });
    buttonIcon.className = "fa-solid fa-volume-high";
  } else {
    audio.muted = true;
    buttonIcon.className = "fa-solid fa-volume-xmark";
  }
}
