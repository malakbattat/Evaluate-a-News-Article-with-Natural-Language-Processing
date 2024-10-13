async function handleSubmit(event) {
  event.preventDefault();

  const formText = document.getElementById('name').value;
  const response = await fetch('/api', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: formText }),
  });

  try {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    document.getElementById('results').innerHTML = `
      <p><strong>Polarity:</strong> ${data.score_tag}</p>
      <p><strong>Subjectivity:</strong> ${data.subjectivity}</p>
      <p><strong>Text:</strong> ${data.sentence_list[0].text}</p>
    `;
    alert(`Polarity: ${data.score_tag}\nSubjectivity: ${data.subjectivity}\nText: ${data.sentence_list[0].text}`);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('results').innerHTML = `Error: ${error.message}`;
  }
}

export { handleSubmit };
