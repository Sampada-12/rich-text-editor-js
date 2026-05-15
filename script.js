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



