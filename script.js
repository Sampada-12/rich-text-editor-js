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



