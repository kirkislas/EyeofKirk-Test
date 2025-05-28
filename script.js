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
};

function navigate(path) {
  history.pushState({}, "", path);
  renderContent(path);
  document.getElementById("menu").style.display = "none";
}

function renderContent(path) {
  const homeSection = document.getElementById("home-section");
  const content = document.getElementById("content");

  // Normalize /index.html to /
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
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function togglePlay() {
  alert("Now playing your track! 🔊");
}
