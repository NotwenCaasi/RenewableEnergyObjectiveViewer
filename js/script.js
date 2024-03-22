// Define an async function to load and process the CSV data
async function fetchCSVData(url) {
  const response = await fetch(url);
  const csvText = await response.text();
  const lines = csvText.trim().split("\n").slice(1); // Skip the header line

  // Parsing the CSV content into an array of objects
  const data = lines.map((line) => {
    const [label, color, start, end] = line
      .split(",")
      .map((cell) => cell.trim());
    return { label, color, start: parseInt(start, 10), end: parseInt(end, 10) };
  });
  return data;
};

async function loadAndProcessCSV() {
  data = await fetchCSVData("../data/data.csv")
  console.log(data);

  // Now that you have `data`, you can proceed with creating the segments
  // Ensure the container is already in the DOM
  const fill = document.getElementById("fill");

  let cumulativeWidth = 0; // Tracks the total width of all segments added so far

  data.forEach((item) => {
    const segment = document.createElement("div");
    segment.style.backgroundColor = item.color;
    segment.className = "color-segment";
    segment.setAttribute("data-label", item.label); // Useful for identification
    segment.style.width = `${item.start}%`; // Initial width based on `start` value
    segment.style.left = `${cumulativeWidth}%`; // Set the left position
    fill.appendChild(segment); // Add the segment to the container

    cumulativeWidth += parseFloat(item.start); // Increase cumulativeWidth by this segment's width
  });

  // Set up the scroll event listener to adjust segments based on scrolling
  setupScrollListener(data);
}

// Define the function to setup the scroll listener
function setupScrollListener(data) {
  const scrollableRectangle = document.getElementById("scrollable-rectangle");
  console.log("scroll listener");
  scrollableRectangle.addEventListener("scroll", function () {
    const scrollFraction =
      this.scrollTop / (this.scrollHeight - this.clientHeight);
    let cumulativeWidth = 0;

    console.log(scrollFraction);

    document.querySelectorAll(".color-segment").forEach((segment) => {
      const label = segment.getAttribute("data-label");
      console.log(label);
      const itemData = data.find((item) => item.label === label);
      console.log(itemData);
      if (!itemData) return;

      const start = parseInt(itemData.start, 10);
      const end = parseInt(itemData.end, 10);
      const width = (1 - scrollFraction) * start + scrollFraction * end;
      segment.style.width = `${width}%`;
      console.log(width);

      segment.style.left = `${cumulativeWidth}%`;
      cumulativeWidth += width;
    });
  });
}

// Call the async function to load the CSV and setup the page
document.addEventListener("DOMContentLoaded", function () {
  loadAndProcessCSV().catch(console.error); // Handle any errors that might occur during fetching or processing
});
