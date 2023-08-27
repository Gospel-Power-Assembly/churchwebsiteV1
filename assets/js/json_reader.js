// Get a reference to the textContainer div
const textContainer = document.getElementById("gomsg");
const msglocation_local = "assets/js/gomessage.json";
const msglocation_online =
  "https://drive.google.com/uc?export=download&id=1zrkYCRNR2EFzjC2p9vA4j4Du96xK-pQKWgYUV6d82MM";

// Fetch the JSON file
fetch(msglocation_local)
  .then((response) => response.json())
  .then((data) => {
    // Access the "text" property from the JSON data
    const textFromJSON = data.text;

    // Display the text in the div
    textContainer.textContent = textFromJSON;
  })
  .catch((error) => {
    console.error("Error fetching or parsing the JSON file:", error);
  });
