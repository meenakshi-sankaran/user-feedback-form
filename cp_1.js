// 1. Grab our crucial DOM elements
const feedbackForm = document.getElementById('feedback-form');
const charCounter = document.getElementById('char-counter');
const tooltip = document.getElementById('tooltip');
const errorMessage = document.getElementById('error-message');
const feedbackDisplay = document.getElementById('feedback-display');
const pageWrapper = document.getElementById('page-wrapper');

// ==========================================
// STEP 4: EVENT DELEGATION & REAL-TIME CHAR COUNT
// ==========================================
// We listen to the whole form for inputs.
feedbackForm.addEventListener('input', function(e) {
    
    // Check if the event came specifically from the comments textarea
    if (e.target.id === 'comments') {
        const textLength = e.target.value.length;
        // Update the character count text dynamically
        charCounter.textContent = `${textLength} characters`;
    }
});

// ==========================================
// STEP 3: MOUSE EVENTS (DYNAMIC TOOLTIPS)
// ==========================================
// Listen for mouse movements across the form using delegation
feedbackForm.addEventListener('mouseover', function(e) {
    // Check if the element the mouse is hovering over has a tooltip data attribute
    if (e.target.hasAttribute('data-tooltip')) {
        const tooltipText = e.target.getAttribute('data-tooltip');
        tooltip.textContent = tooltipText;
        tooltip.style.display = 'block'; // Make it visible
    }
});

feedbackForm.addEventListener('mousemove', function(e) {
    // Make the tooltip follow the mouse coordinates smoothly
    // e.pageX and e.pageY grab the exact coordinates of your mouse pointer
    tooltip.style.left = (e.pageX + 20) + 'px';
    tooltip.style.top = (e.pageY + 20) + 'px';
});

feedbackForm.addEventListener('mouseout', function(e) {
    // Hide the tooltip when the mouse leaves the input field
    if (e.target.hasAttribute('data-tooltip')) {
        tooltip.style.display = 'none';
    }
});

// ==========================================
// STEP 3: VALIDATION AND PREVENT DEFAULT
// ==========================================
feedbackForm.addEventListener('submit', function(e) {
    // STOP the form from automatically refreshing the entire web page
    e.preventDefault();

    // Grab the actual values typed into the fields
    const nameValue = document.getElementById('username').value.trim();
    const emailValue = document.getElementById('email').value.trim();
    const commentsValue = document.getElementById('comments').value.trim();

    // Check if any of the fields are empty
    if (nameValue === "" || emailValue === "" || commentsValue === "") {
        errorMessage.textContent = "Error: All fields must be filled out before submitting!";
        return; // Halt execution right here
    }

    // If we passed the check, clear any old error messages
    errorMessage.textContent = "";

    // ==========================================
    // STEP 3: DYNAMICALLY APPEND VALID ENTRY
    // ==========================================
    // Create a brand new visual HTML 'div' element completely via JS
    const feedbackCard = document.createElement('div');
    feedbackCard.classList.add('feedback-card'); // Apply CSS styles to it

    // Set up the internal text content with user inputs
    feedbackCard.innerHTML = `
        <strong>Name:</strong> ${nameValue} <br>
        <strong>Email:</strong> ${emailValue} <br>
        <p><strong>Comment:</strong> ${commentsValue}</p>
    `;

    // Drop this new card directly into our display area container
    feedbackDisplay.appendChild(feedbackCard);

    // Reset the form values back to blank for a clean slate
    feedbackForm.reset();
    charCounter.textContent = "0 characters"; // Reset the character counter element
});

// ==========================================
// STEP 5: PREVENT BACKGROUND CLICKS (stopPropagation)
// ==========================================
// If someone clicks inside the form, stop it from bubbling up to the rest of the page layout
feedbackForm.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log("Click happened inside the form. Event propagation stopped.");
});

// Click listener on the background block container to prove propagation blocking works
pageWrapper.addEventListener('click', function() {
    console.log("You clicked the outer background area!");
});
