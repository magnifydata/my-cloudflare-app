const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteButton = document.getElementById('new-quote-button');

// We are now using a different, very reliable test API
async function getNewData() {
    quoteText.textContent = 'Loading test data...';
    quoteAuthor.textContent = '';
    try {
        // Fetch a "todo" item from the JSONPlaceholder test API
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();

        // Display the data in our existing HTML elements
        quoteText.textContent = `Title: "${data.title}"`; // Display the 'title'
        quoteAuthor.textContent = `User ID: ${data.userId}`;     // Display the 'userId'

    } catch (error) {
        // This is the error message you were seeing
        quoteText.textContent = 'Could not fetch data. Please try again.';
        console.error('Error fetching data:', error);
    }
}

newQuoteButton.addEventListener('click', getNewData);

// Load data when the page first loads
getNewData();
