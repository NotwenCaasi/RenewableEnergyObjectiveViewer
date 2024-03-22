document.addEventListener('DOMContentLoaded', async function() {

  const response = await fetch('../data/data.csv');
  const csvText = await response.text();

  // Dataset values
  const data = {
    fossile: {start: 100, end: 0},
    solar: {start: 0, end: 30},
    wind: {start: 0, end: 70}
  };

  const scrollableRectangle = document.getElementById('scrollable-rectangle');
  const segments = {
    fossile: document.getElementById('fossile'),
    solar: document.getElementById('solar'),
    wind: document.getElementById('wind')
  };

  // Function to update segment widths and positions
  function updateSegments(scrollFraction = 0) {
    let cumulativeWidth = 0;

    Object.entries(segments).forEach(([key, segment]) => {
      const { start, end } = data[key];
      const width = (1 - scrollFraction) * start + scrollFraction * end;
      segment.style.width = `${width}%`;

      // Adjust the left position to stack segments horizontally
      segment.style.left = `${cumulativeWidth}%`;
      cumulativeWidth += width; // Update cumulativeWidth for the next segment
    });
  }

  // Initialize segments with their starting widths and positions
  updateSegments();

  // Set the scrollable rectangle's scroll position to the top
  scrollableRectangle.scrollTop = 0;

  // Update segments on scroll
  scrollableRectangle.addEventListener('scroll', function() {
    const scrollFraction = this.scrollTop / (this.scrollHeight - this.clientHeight);
    updateSegments(scrollFraction);
  });
});
