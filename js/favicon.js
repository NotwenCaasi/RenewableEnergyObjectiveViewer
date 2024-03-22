async function fetchCSVData(url) {
    const response = await fetch(url);
    const csvText = await response.text();
    return csvText.trim().split("\n").slice(1) // Skip header
                    .map(line => line.split(',')[1]); // Extract color data
}

function drawFavicon(colors) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 64; // Favicon size
    canvas.height = 64;

    // Create a circular gradient
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

    // Assuming `colors` is an array of color strings
    // This example just splits the circle into equal parts of each color
    // Modify as needed for your desired effect
    colors.forEach((color, index) => {
        // AddColorStop takes a value between 0 and 1
        gradient.addColorStop(index / colors.length, color);
        gradient.addColorStop((index + 1) / colors.length, color);
    });

    // Fill the circle
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();

    const faviconURL = canvas.toDataURL('../images/favicon.ico');
    updateFavicon(faviconURL);
}

function updateFavicon(dataUrl) {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = dataUrl;
}

async function createFaviconFromCSV() {
    const url = '../data/data.csv'; // Adjust the path as necessary
    const colors = await fetchCSVData(url);
    drawFavicon(colors);
}

createFaviconFromCSV().catch(console.error); // Handle any errors gracefully
