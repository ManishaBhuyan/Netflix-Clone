const movies = [
  {
    id: 1,
    title: "Neural Horizon",
    category: "scifi",
    row: "Trending Now",
    year: 2026,
    match: "98% Match",
    rating: "UA 13+",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    desc: "In a near-future metropolis governed by predictive algorithms, a young systems engineer uncovers an anomaly that challenges the boundary between human intuition and machine intelligence."
  },
  {
    id: 2,
    title: "Silicon Shadows",
    category: "scifi",
    row: "Trending Now",
    year: 2025,
    match: "95% Match",
    rating: "UA 16+",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    desc: "A cybersecurity analyst races against a rogue autonomous network infiltrating global satellite infrastructure."
  },
  {
    id: 3,
    title: "Crimson Orbit",
    category: "scifi",
    row: "Trending Now",
    year: 2026,
    match: "94% Match",
    rating: "UA 13+",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    desc: "Aboard an orbital research station, a four-person crew loses contact with Earth during a solar storm."
  },
  {
    id: 4,
    title: "The Last Signal",
    category: "drama",
    row: "Trending Now",
    year: 2024,
    match: "92% Match",
    rating: "U",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    desc: "An aging radio astronomer decodes a repeating deep-space transmission that mirrors a personal memory."
  },
  {
    id: 5,
    title: "Monsoon Harbour",
    category: "drama",
    row: "Critically Acclaimed Dramas",
    year: 2025,
    match: "97% Match",
    rating: "UA 13+",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    desc: "Set along India's eastern coast, two estranged siblings reunite to save their family's historic maritime shipyard."
  },
  {
    id: 6,
    title: "Midnight Express Line",
    category: "drama",
    row: "Critically Acclaimed Dramas",
    year: 2024,
    match: "91% Match",
    rating: "UA 13+",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
    desc: "Strangers on an overnight cross-country train discover their lives are connected by a single unsolved case."
  },
  {
    id: 7,
    title: "Echoes of Kyoto",
    category: "drama",
    row: "Critically Acclaimed Dramas",
    year: 2023,
    match: "93% Match",
    rating: "U",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    desc: "A documentary filmmaker explores disappearing acoustic traditions across rural mountain towns."
  },
  {
    id: 8,
    title: "Quantum Grid",
    category: "scifi",
    row: "Sci-Fi & Tech Thrillers",
    year: 2026,
    match: "96% Match",
    rating: "UA 16+",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    desc: "When a quantum encryption breakthrough threatens global banking, rival researchers must form an uneasy alliance."
  },
  {
    id: 9,
    title: "Zero Latency",
    category: "scifi",
    row: "Sci-Fi & Tech Thrillers",
    year: 2025,
    match: "90% Match",
    rating: "UA 13+",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
    desc: "Inside a high-stakes robotics tournament, an underdog college team builds an adaptive neural controller."
  },
  {
    id: 10,
    title: "Deep Packet",
    category: "scifi",
    row: "Sci-Fi & Tech Thrillers",
    year: 2024,
    match: "89% Match",
    rating: "UA 16+",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    desc: "A data center engineer discovers hidden telemetry packets routing through decommissioned undersea cables."
  }
];

const catalogEl = document.getElementById("catalog");
const searchInput = document.getElementById("searchInput");
const navLinks = document.querySelectorAll(".nav-links a");
const navbar = document.getElementById("navbar");

// Modal elements
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalBanner = document.getElementById("modalBanner");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalMatch = document.getElementById("modalMatch");
const modalYear = document.getElementById("modalYear");
const modalRating = document.getElementById("modalRating");
const modalCategory = document.getElementById("modalCategory");
const modalListBtn = document.getElementById("modalListBtn");

let myList = new Set();

// Navbar scroll background
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// Render movie rows
function renderCatalog(filter = "all", query = "") {
  catalogEl.innerHTML = "";
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = movies.filter((m) => {
    const matchesCategory =
      filter === "all" ||
      (filter === "trending" && m.row === "Trending Now") ||
      m.category === filter;
    const matchesSearch =
      m.title.toLowerCase().includes(normalizedQuery) ||
      m.desc.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    catalogEl.innerHTML = `<p style="color:#aaa; padding: 40px 0;">No titles found matching your filter.</p>`;
    return;
  }

  // Group by row name
  const rows = [...new Set(filtered.map((m) => m.row))];

  rows.forEach((rowName) => {
    const rowMovies = filtered.filter((m) => m.row === rowName);
    const rowSection = document.createElement("section");
    rowSection.className = "row";

    rowSection.innerHTML = `
      <h2 class="row-title">${rowName}</h2>
      <div class="row-posters"></div>
    `;

    const postersContainer = rowSection.querySelector(".row-posters");

    rowMovies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}" loading="lazy" />
        <div class="card-info">
          <div class="card-title">${movie.title}</div>
          <div class="card-meta">${movie.match} &bull; ${movie.year}</div>
        </div>
      `;
      card.addEventListener("click", () => openModal(movie));
      postersContainer.appendChild(card);
    });

    catalogEl.appendChild(rowSection);
  });
}

// Modal logic
function openModal(movie) {
  modalBanner.style.backgroundImage = `url("${movie.image}")`;
  modalTitle.textContent = movie.title;
  modalDesc.textContent = movie.desc;
  modalMatch.textContent = movie.match;
  modalYear.textContent = movie.year;
  modalRating.textContent = movie.rating;
  modalCategory.textContent = movie.category.toUpperCase();

  modalListBtn.textContent = myList.has(movie.id) ? "✓ Added to List" : "+ My List";
  modalListBtn.onclick = () => {
    if (myList.has(movie.id)) {
      myList.delete(movie.id);
      modalListBtn.textContent = "+ My List";
    } else {
      myList.add(movie.id);
      modalListBtn.textContent = "✓ Added to List";
    }
  };

  modalBackdrop.classList.add("open");
}

modalClose.addEventListener("click", () => modalBackdrop.classList.remove("open"));
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
});

// Hero button handlers
document.getElementById("heroPlayBtn").addEventListener("click", () => openModal(movies[0]));
document.getElementById("heroInfoBtn").addEventListener("click", () => openModal(movies[0]));

// Category filter clicks
let activeFilter = "all";
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    activeFilter = link.dataset.filter;
    renderCatalog(activeFilter, searchInput.value);
  });
});

// Live search
searchInput.addEventListener("input", (e) => {
  renderCatalog(activeFilter, e.target.value);
});

// Initial render
renderCatalog();