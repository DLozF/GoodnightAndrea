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

function displayMessageGrid() {
  const grid = document.getElementById('messages-grid');
  grid.innerHTML = ''; // Clear existing content

  messagesData.forEach((msg, index) => {
    const card = document.createElement('div');
    card.classList.add('message-card');

    const link = document.createElement('a');
    link.href = '#';
    link.textContent = msg.date;
    link.onclick = (e) => {
      e.preventDefault();
      showMessage(index);
    };

    card.appendChild(link);
    grid.appendChild(card);
  });
}

function showMessage(index) {
  const msg = messagesData[index];
  const grid = document.getElementById('messages-grid');
  
  // Replace the grid with the message view
  grid.innerHTML = `
    <div style="max-width:800px;margin:0 auto;padding:30px;background:#fde2e4;border-radius:20px;text-align:left;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      <div style="text-align:center;margin-bottom:30px;">
        <h1 style="color:#d17a8d;margin-bottom:10px;">${msg.date}</h1>
      </div>
      <div style="font-size:18px;line-height:1.8;color:#b45d70;white-space:pre-line;">${msg.text}</div>
      <div style="text-align:center;margin-top:30px;">
        <button onclick="displayMessageGrid()" style="padding:12px 24px;background:#d17a8d;color:white;border:none;border-radius:8px;cursor:pointer;font-size:16px;font-weight:bold;">⬅ Back to All Messages</button>
      </div>
    </div>
  `;
}