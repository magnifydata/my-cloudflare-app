const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteButton = document.getElementById('new-quote-button');

async function getNewQuote() {
    quoteText.textContent = 'Loading...';
    quoteAuthor.textContent = '';
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quoteText.textContent = data.content;
        quoteAuthor.textContent = `- ${data.author}`;
    } catch (error) {
        quoteText.textContent = 'Could not fetch a quote. Please try again.';
        console.error('Error fetching quote:', error);
    }
}

newQuoteButton.addEventListener('click', getNewQuote);

// Load a quote when the page first loads
getNewQuote();
