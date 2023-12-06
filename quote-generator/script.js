let apiQuotes = [];

// Show new quote
const newQuote = () => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return quote;
}

// Get Quotes From API
const getQuotes = async () => {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        const quote = newQuote();

    } catch (error) {
        
    }
}

// On Load
getQuotes();