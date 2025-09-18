let messagesData = [];

fetch('messages.json')
  .then(response => response.json())
  .then(messages => {
    messagesData = messages;
    displayMessageGrid();
  })
  .catch(error => {
    console.error('Error loading messages:', error);
  });

function formatDate(dateString) {
  // Convert from YYYY-MM-DD to MM/DD/YY
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
}

function getWordCount(text) {
  // Remove extra whitespace and count words
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function displayMessageGrid() {
  const grid = document.getElementById('messages-grid');
  grid.innerHTML = ''; // Clear existing content

  messagesData.forEach((msg, index) => {
    const card = document.createElement('div');
    card.classList.add('message-card');

    const link = document.createElement('a');
    link.href = '#';
    link.onclick = (e) => {
      e.preventDefault();
      showMessage(index);
    };

    // Format date and get word count
    const formattedDate = formatDate(msg.date);
    const wordCount = getWordCount(msg.text);

    // Create the content with date and word count
    link.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 5px;">${formattedDate}</div>
      <div style="font-size: 12px; opacity: 0.8;">${wordCount} words</div>
    `;

    card.appendChild(link);
    grid.appendChild(card);
  });
}

function showMessage(index) {
  const msg = messagesData[index];
  const grid = document.getElementById('messages-grid');
  
  // Format date and get word count for the message view
  const formattedDate = formatDate(msg.date);
  const wordCount = getWordCount(msg.text);
  
  // Replace the grid with the message view
  grid.innerHTML = `
    <div style="max-width:800px;margin:0 auto;padding:30px;background:#fde2e4;border-radius:20px;text-align:left;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#d17a8d;margin-bottom:5px;">${formattedDate}</h1>
        <div style="color:#b45d70;font-size:14px;opacity:0.8;">${wordCount} words</div>
      </div>
      <div style="font-size:18px;line-height:1.8;color:#b45d70;white-space:pre-line;">${msg.text}</div>
      <div style="text-align:center;margin-top:30px;">
        <button onclick="displayMessageGrid()" style="padding:12px 24px;background:#d17a8d;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;font-weight:bold;">⬅ Back to All Messages</button>
      </div>
    </div>
  `;
}