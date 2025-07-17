const submitButton = document.getElementById('submit-button');
const promptInput = document.getElementById('prompt-input');
const responseOutput = document.getElementById('response-output');

submitButton.addEventListener('click', async () => {
    const prompt = promptInput.value;
    if (!prompt) {
        alert('Please enter a prompt.');
        return;
    }

    // Disable button and clear previous output
    submitButton.disabled = true;
    responseOutput.innerText = 'Generating response...';

    try {
        const response = await fetch('/api/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        // The response from a streaming API is a ReadableStream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        responseOutput.innerText = ''; // Clear "Generating..." message

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            responseOutput.innerText += chunk; // Append new text chunk
        }

    } catch (error) {
        responseOutput.innerText = 'Error: Could not get a response.';
        console.error('Error fetching AI response:', error);
    } finally {
        // Re-enable the button once done
        submitButton.disabled = false;
    }
});
