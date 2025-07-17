const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteButton = document.getElementById('new-quote-button');

async function getRandomTodo() {
    quoteText.textContent = 'Loading...';
    quoteAuthor.textContent = '';
    try {
        // Generate a random number between 1 and 200
        const randomId = Math.floor(Math.random() * 200) + 1;

        // Use the random number in the API URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
        const data = await response.json();

        // Display the new, random data
        quoteText.textContent = `Title: "${data.title}"`;
        quoteAuthor.textContent = `User ID: ${data.userId} (Todo ID: ${data.id})`;

    } catch (error) {
        quoteText.textContent = 'Could not fetch data. Please try again.';
        console.error('Error fetching data:', error);
    }
}

newQuoteButton.addEventListener('click', getRandomTodo);

// Load a random item when the page first loads
getRandomTodo();
