// Select elements
const catContainer = document.getElementById("cat-container");
const newCatButton = document.getElementById("new-cat-button");

// Fetch a single cat image
async function fetchCatImage() {
  try {
    catContainer.innerHTML = '<p class="loading">Loading...</p>';
    const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
    const data = await response.json();
    const catImageUrl = data[0].url;

    // Display the image
    catContainer.innerHTML = `
      <div>
        <img src="${catImageUrl}" alt="A Random Cat">
        <div class="image-actions">
          <button onclick="copyToClipboard('${catImageUrl}')">Copy URL</button>
          <a href="${catImageUrl}" download class="download-button">Download</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching cat image:", error);
    catContainer.innerHTML = "<p>Failed to load cat image. Please try again.</p>";
  }
}

// Copy the image URL to clipboard
function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert("Image URL copied to clipboard!");
  });
}

// Fetch an initial cat image
fetchCatImage();

// Fetch a new image when the button is clicked
newCatButton.addEventListener("click", fetchCatImage);
