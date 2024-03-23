document.addEventListener("DOMContentLoaded", function () {
  const fillA1 = document.getElementById("fillA1");
  const fillA2 = document.getElementById("fillA2");
  const timelinePoint = document.querySelector(".timeline-point");
  let insideRectangleA = false; // Flag to track mouse presence inside Rectangle A

  // Initial fill percentage
  let timeProgression = 0;
  let fillPercentA1 = 0;
  let fillPercentA2 = 0;
  let pointPositionPercent = 0;

  // Function to update fill based on direction
  function updateFill(timeProgression) {
    fillPercentA1 = timeProgression;
    fillPercentA2 = timeProgression;

    fillA1.style.height = `${fillPercentA1}%`;
    fillA1.style.backgroundColor = "blue";
    fillA2.style.height = `${fillPercentA2}%`;
    fillA2.style.backgroundColor = "red";
  }

  // Function to update point position based on direction
  function updatePointPosition(timeProgression) {
    pointPositionPercent = timeProgression;
    timelinePoint.style.left = `${pointPositionPercent}%`;
  }

  // Mouse enter and leave events for Rectangle A
  document
    .getElementById("rectangleA")
    .addEventListener("mouseenter", function () {
      insideRectangleA = true;
    });

  document
    .getElementById("rectangleA")
    .addEventListener("mouseleave", function () {
      insideRectangleA = false;
    });

  // Arrow keys event
  document.addEventListener("keydown", function (event) {
    if (!insideRectangleA) {
      return; // Do nothing if the mouse is not inside Rectangle A
    }
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      timeProgression = Math.min(timeProgression + 5, 100);
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      timeProgression = Math.max(0, timeProgression - 5);
    }
    updateFill(timeProgression);
    updatePointPosition(timeProgression);
  });

  document
  .getElementById("rectangleA")
  .addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      timeProgression = Math.min(timeProgression + 5, 100);
    } else {
      timeProgression = Math.max(0, timeProgression - 5);
    }
    updateFill(timeProgression);
    updatePointPosition(timeProgression);
  });

  // Since touch events can vary significantly and might require more complex handling for
  // a smooth filling effect (like calculating swipe distance), they are not included in
  // this basic example. It's recommended to handle touch events separately or use libraries.
});
