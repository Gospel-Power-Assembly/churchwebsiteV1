// Replace 'YOUR_YOUTUBE_API_KEY' with your actual API key
const API_KEY = "AIzaSyA9lxKVAVsVoUjvYg12hJEYRvqD_7gdtlw";
const CHANNEL_ID = "UCEO_A1gEiGZfsZaw6ssucAQ"; // Replace with your YouTube channel ID

const maxResults = 10;
let slides = []; // Declare 'slides' at a broader scope
let slideIndex = 0;
// Function to fetch YouTube video details using the API
async function fetchYouTubeVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

// Function to create a carousel slide with video thumbnail, title, and link to YouTube
function createCarouselSlide(video) {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  const videoId = video.id.videoId;
  const thumbnailUrl = video.snippet.thumbnails.medium.url;
  const title = video.snippet.title;
  const uploadDate = new Date(video.snippet.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  slide.innerHTML = `
    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer">
      <img src="${thumbnailUrl}" alt="${title}">
    </a>
    <div class="slide-content">
      <div class="slide-title">${title}</div>
      <div class="slide-date">Uploaded on ${uploadDate}</div>
    </div>
  `;

  return slide;
}

// Function to show the current slide and hide the rest
function showSlide(index) {
  slides.forEach((slide, idx) => {
    if (idx === index) {
      slide.style.display = "block";
      slide.style.opacity = 1;
    } else {
      slide.style.display = "none";
      slide.style.opacity = 0;
    }
  });
}

// Function to handle the previous slide
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Function to handle the next slide
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

// Call the initialization function once the DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const carouselContainer = document.querySelector(".carousel");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  const videos = await fetchYouTubeVideos();
  slides = videos.map(createCarouselSlide); // Store the slides in the 'slides' array
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? "block" : "none";
    carouselContainer.appendChild(slide);
  });

  let slideIndex = 0;
  showSlide(slideIndex);

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
});
