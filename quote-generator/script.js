const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
const complete = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show new quote
const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check quote length to determine styling
    quote.text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');

    authorText.textContent = !quote.author ? 'Unknown' : quote.author;

    // Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
const getQuotes = async () => {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {
        
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event listeners on buttons
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();