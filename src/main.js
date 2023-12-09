// Initial data
const initialData = [
  {
    uuid: "5affd4e4-418d-4b62-beeb-1c0f7aaff753",
    title: "Marcy",
    colors: ["#c92929", "#2f5a8b", "#327a5f"],
    temperature: "neutral",
  },
  {
    uuid: "32521ef4-d64c-4906-b06d-f3d0d6b16e0f",
    title: "Sleek and Modern",
    colors: ["#3A5199", "#2F2E33", "#D5D6D2"],
    temperature: "cool",
  },
  {
    uuid: "8b144d62-faa7-4226-87e1-096d7c1bedc7",
    title: "Winter Reds",
    colors: ["#A10115", "#C0B2B5", "#600A0A"],
    temperature: "warm",
  },
];

// Function to create a palette element
function createPaletteElement(paletteData) {
  const paletteContainer = document.createElement("div");
  paletteContainer.classList.add("palette");

  const paletteTitleElement = document.createElement("h3");
  paletteTitleElement.textContent = paletteData.title;

  const colorsList = document.createElement("ul");
  colorsList.classList.add("colors-list");

  // Create div elements for each color with hex codes and copy button
  paletteData.colors.forEach((color) => {
    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");
    colorContainer.style.backgroundColor = color;

    const hexCode = document.createElement("div");
    hexCode.textContent = color; // Display the color's hex code
    hexCode.classList.add("hex-code");

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy Hex Code";
    copyButton.classList.add("copy-button");

    copyButton.addEventListener("click", function () {
      // Copy the hex code to the clipboard
      const tempInput = document.createElement("input");
      tempInput.value = color;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    });

    colorContainer.appendChild(hexCode);
    colorContainer.appendChild(copyButton);
    colorsList.appendChild(colorContainer);
  });

  // Create temperature information element with background color based on temperature
  const temperatureInfo = document.createElement("div");
  temperatureInfo.textContent = `Temperature: ${paletteData.temperature}`;
  temperatureInfo.classList.add("temperature-info");

  // Set background color based on temperature
  switch (paletteData.temperature) {
    case "neutral":
      temperatureInfo.style.backgroundColor = "grey";
      break;
    case "warm":
      temperatureInfo.style.backgroundColor = "brown";
      break;
    case "cool":
      temperatureInfo.style.backgroundColor = "darkblue";
      break;
    default:
      break;
  }

  // Create a "Delete Palette" button
  const deletePaletteButton = document.createElement("button");
  deletePaletteButton.textContent = "Delete Palette";
  deletePaletteButton.classList.add("delete-palette-button");

  deletePaletteButton.addEventListener("click", function () {
    // Remove the entire palette from the palettes section
    const palettesSection = document.getElementById("palettes-section");
    palettesSection.removeChild(paletteContainer);
  });

  // Append the elements to the palette container, including the "Delete Palette" button
  paletteContainer.appendChild(paletteTitleElement);
  paletteContainer.appendChild(colorsList);
  paletteContainer.appendChild(temperatureInfo);
  paletteContainer.appendChild(deletePaletteButton);

  return paletteContainer;
}

// Function to add palettes to the palettes section
function addPalettesToSection() {
  const palettesSection = document.getElementById("palettes-section");
  initialData.forEach((paletteData) => {
    const paletteElement = createPaletteElement(paletteData);
    palettesSection.appendChild(paletteElement);
  });
}

// Event listener for the form submission
const colorPickerForm = document.getElementById("color-picker-form");
colorPickerForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the values entered by the user
  const paletteTitle = document.getElementById("paletteTitle").value;
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;
  const color3 = document.getElementById("color3").value;
  const temperature = document.querySelector(
    'input[name="temperature"]:checked'
  ).value;

  // Create a new palette object
  const newPalette = {
    title: paletteTitle,
    colors: [color1, color2, color3],
    temperature: temperature,
  };

  // Create elements to display the new palette
  const newPaletteElement = createPaletteElement(newPalette);

  // Append the new palette element to the palettes section
  const palettesSection = document.getElementById("palettes-section");
  palettesSection.appendChild(newPaletteElement);

  // Clear the form
  colorPickerForm.reset();
});

// Execute the function to add palettes when the DOM is ready
document.addEventListener("DOMContentLoaded", addPalettesToSection);
