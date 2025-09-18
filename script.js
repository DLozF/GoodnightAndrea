fetch('messages.json')
  .then(response => response.json())
  .then(messages => {
    const grid = document.getElementById('messages-grid');

    messages.forEach((msg, index) => {
      const card = document.createElement('div');
      card.classList.add('message-card');

      const link = document.createElement('a');
      link.href = `message-${index + 1}.html`;
      link.textContent = msg.date;

      card.appendChild(link);
      grid.appendChild(card);

      // Generate HTML for individual message pages (copy to GitHub manually)
      createMessagePage(index + 1, msg.date, msg.message);
    });
  });

function createMessagePage(id, date, message) {
  const content = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${date} - Message</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div style="max-width:600px;margin:50px auto;padding:30px;background:#fde2e4;border-radius:20px;text-align:center;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
      <h1 style="color:#d17a8d;">${date}</h1>
      <p style="margin-top:20px;font-size:18px;line-height:1.6;color:#b45d70;">${message}</p>
      <a href="index.html" style="display:inline-block;margin-top:30px;text-decoration:none;color:#d17a8d;font-weight:bold;">⬅ Back</a>
    </div>
  </body>
  </html>
  `;

  console.log(`Make file: message-${id}.html`);
  console.log(content);
}
