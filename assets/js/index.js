const authorEl = document.getElementById("author");
const quoteEl = document.getElementById("quote");
const loader = document.getElementById("loader");
const qouteContainer = document.getElementById("quote-container");

let apiQuotes = [];
const DEFAULT_AUTHOR = "unknown";

const loading = () => {
	qouteContainer.classList.add("hide");
	loader.classList.remove("hide");
};

const loadingComplete = () => {
	qouteContainer.classList.remove("hide");
	loader.classList.add("hide");
};

const newQuote = () => {
	loading();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	const author = quote.author ? quote.author : DEFAULT_AUTHOR;
	if (quote.text.length > 50) {
		quoteEl.classList.add("long-quote");
	} else {
		quoteEl.classList.remove("long-quote");
	}
	authorEl.innerText = author;
	quoteEl.innerText = quote.text;
	loadingComplete();
};

const getQuotes = async () => {
	loading();
	const apiURL = "https://type.fit/api/quotes";

	try {
		const response = await fetch(apiURL);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		console.log(error);
	}
};

const tweetQoute = () => {
	const tweetURL = `http://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.textContent}`;
	window.open(tweetURL, "_blank");
};

getQuotes();

document.getElementById("twitter").addEventListener("click", tweetQoute);
document.getElementById("newQuote").addEventListener("click", getQuotes);
