const textContainer = document.getElementById("gomsg");
const msglocation_local = "assets/js/gomessage.json";
const owner = "Gospel-Power-Assembly";
const repo = "gomessage";
const filePath = "main/README.md";

const msglocation_online = `https://raw.githubusercontent.com/${owner}/${repo}/${filePath}`;

fetch(msglocation_online)
  .then((response) => response.text())
  .then((text) => {
    textContainer.textContent = text;
  })
  .catch((error) => {
    console.error("Error fetching JSON file:", error);
  });
