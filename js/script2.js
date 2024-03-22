document.addEventListener('DOMContentLoaded', function() {
    const fillA1 = document.getElementById('fillA1');
    const fillA2 = document.getElementById('fillA2');

    // Initial fill percentage
    let fillPercentA1 = 0;
    let fillPercentA2 = 0;

    // Function to update fill based on direction
    function updateFill(direction) {
        if (direction > 0) { // Scrolling down or pressing down
            fillPercentA1 = Math.max(0, fillPercentA1 - 10);
            fillPercentA2 = Math.max(0, fillPercentA2 - 10);
        } else if (direction < 0) { // Scrolling up or pressing up
            fillPercentA1 = Math.min(100, fillPercentA1 + 10);
            fillPercentA2 = Math.min(100, fillPercentA2 + 10);
        }

        fillA1.style.height = `${fillPercentA1}%`;
        fillA1.style.backgroundColor = 'blue';
        fillA2.style.height = `${fillPercentA2}%`;
        fillA2.style.backgroundColor = 'red';
    }

    // Mouse wheel event
    document.getElementById('rectangleA').addEventListener('wheel', function(event) {
        updateFill(event.deltaY);
    });

    // Arrow keys event
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp') {
            updateFill(-1);
        } else if (event.key === 'ArrowDown') {
            updateFill(1);
        }
    });

    // Since touch events can vary significantly and might require more complex handling for
    // a smooth filling effect (like calculating swipe distance), they are not included in
    // this basic example. It's recommended to handle touch events separately or use libraries.
});
