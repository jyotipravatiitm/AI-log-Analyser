
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const csvFileInput = document.getElementById('csvFile');
    const topPromptInput = document.getElementById('topPrompt');
    const bottomPromptInput = document.getElementById('bottomPrompt');
    const resultDiv = document.getElementById('result');

    
  
    submitBtn.addEventListener('click', async () => {
      const file = csvFileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const csvData = event.target.result;
        const topPrompt = topPromptInput.value;
        const bottomPrompt = bottomPromptInput.value;
  
        const promptData = `${topPrompt}\n\n${csvData}\n\n${bottomPrompt}`;
  
        try {
          const response = await fetch('/api/claude', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: promptData,
              model: 'claude-3-haiku-20240307',
              max_tokens_to_sample: 2000,
            }),
          });
  
          const data = await response.json();
          console.log(data);
  if (response.ok) {
    resultDiv.innerHTML = `
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">The Site Analysis</h2>
        <div class="text-gray-800 whitespace-pre-wrap">${formatResponse(data)}</div>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">${data}</span>
      </div>
    `;
  }
} catch (error) {
  console.error('Error:', error, promptData);
  resultDiv.innerHTML = `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong class="font-bold">Error:</strong>
      <span class="block sm:inline">${error.message}</span>
    </div>
  `;
}
      };
  
      reader.readAsText(file);
    });
  });

  function formatResponse(response) {
    console.log(response)
    if (response) {
      const text = response.content.map(item => item.text).join('\n');
      console.log(text)
      return text.replace(/\n/g, '<br>');
    } else {
      return '';
    }
  }