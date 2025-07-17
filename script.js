const submitButton = document.getElementById('submit-button');
const responseOutput = document.getElementById('response-output');
const promptInput = document.getElementById('prompt-input');

submitButton.addEventListener('click', async () => {
  responseOutput.innerText = 'Sending test request to backend...';
  submitButton.disabled = true;

  try {
    // We are now fetching our simple test endpoint with a GET request.
    const response = await fetch('/api/hello');

    // If the response is not ok (e.g., 404, 405, 500), throw an error.
    if (!response.ok) {
      throw new Error(`The server responded with status: ${response.status}`);
    }

    // Get the text from the successful response.
    const message = await response.text();
    responseOutput.innerText = message; // Should display "Success! The backend is running."

  } catch (error) {
    responseOutput.innerText = `Error: ${error.message}`;
    console.error('Diagnostic test failed:', error);
  } finally {
    submitButton.disabled = false;
  }
});
