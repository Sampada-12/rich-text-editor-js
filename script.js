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


// Select editable content area
let content = document.getElementById("content");

// Detect when mouse enters editor area
content.addEventListener("mouseenter", () => {

  // Select all anchor(link) tags inside editor
  let anchors = content.querySelectorAll("a");

  // Loop through all links
  anchors.forEach((anchor) => {

    // Detect when mouse enters link
    anchor.addEventListener("mouseenter", (e) => {

      // Open link in new tab
      anchor.setAttribute("target", "_blank");

      // Disable editor temporarily
      // So links become clickable
      content.setAttribute("contentEditable", "false");
    });

    // Detect when mouse leaves link
    anchor.addEventListener("mouseleave", (e) => {

      // Enable editor again
      content.setAttribute("contentEditable", "true");
    });
  });
});


// Select file name input
let fileName = document.getElementById("fileName");

// Function to handle file actions
const handleFileExport = (value) => {

	// Create new file
	if (value === "new") {

		// Clear editor content
		content.innerHTML = "";

		// Reset file name
		fileName.value = "File Name";
	}

	// Export content as PDF
	if (value === "pdf") {

		// Convert editor content into PDF
		html2pdf(content).save(fileName.value);
	}

	// Export content as Text File
	if (value === "txt") {

		// Get plain text from editor
		const extractedText = content.innerText;

		// Create text file blob
		const blob = new Blob([extractedText]);

		// Generate temporary file URL
		const url = URL.createObjectURL(blob);

		// Create temporary anchor tag
		const a = document.createElement("a");

		// Set download URL
		a.href = url;

		// Set file name
		a.download = fileName.value + ".txt";

		// Trigger automatic download
		a.click();
	}
};

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
