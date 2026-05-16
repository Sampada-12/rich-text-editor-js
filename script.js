// Reusable function for text formatting in Rich Text Editor
// cmd   -> formatting command (bold, italic, underline, etc.)
// value -> optional value for commands like link, color, font size

const formatDoc = (cmd, value = false) => {

  // Check if command needs a value
  if (value) {

    document.execCommand(cmd, false, value);
  } else {
    
    // Execute normal formatting command
    document.execCommand(cmd);
  }
};

// Function to add hyperlink in selected text
const handleAddLink = () => {
  // Ask user to enter URL
  const url = prompt("Enter the URL");

  // Apply createLink command
  formatDoc("createLink", url);
};

let content = document.getElementById("content");
content.addEventListener("mouseenter", () => {
  let anchors = content.querySelectorAll("a");

  anchors.forEach((anchor) => {
    anchor.addEventListener("mouseenter", (e) => {
      anchor.setAttribute("target", "_blank");
      content.setAttribute("contentEditable", "false");
    });

    anchor.addEventListener("mouseleave", (e) => {
      content.setAttribute("contentEditable", "true");
    });
  });
});


// Track code mode state
let active = false;
// Select "Show Code" button
let showCode = document.getElementById("show-code");

// Detect button click
showCode.addEventListener("click", () => {
  
  // Toggle active state (true/false)
  active = !active;

   // Update data-active attribute
  showCode.dataset.active = active;

   // If code mode is ON
  if (active) {
   // Show HTML code as plain text
    content.textContent = content.innerHTML;

    // Disable editor editing
    content.setAttribute("contenteditable", "false"); } else {

    // Convert plain text back into HTML
    content.innerHTML = content.textContent;

    // Enable editing again
    content.setAttribute("contenteditable", "true");
  }
  
});
