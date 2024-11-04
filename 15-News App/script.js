const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const newsContainer = document.getElementById("news-container");
const themeToggleButton = document.getElementById("theme-toggle");



const apiKey = "19ab39ede97843979f5b3b9f87fc3334";
const baseUrl = "https://newsapi.org/v2/";


const fetchNews = async (query, category) => {
    newsContainer.innerHTML = "";

    let url = baseUrl + "top-headlines?country=us&apiKey=" + apiKey;

    if (query) {
        url += "&q=" + query;
    }

    if (category !== "all") {
        url += "&category=" + category;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {  
        for (const article of data.articles) {  

            const articleDiv = document.createElement("div");
            articleDiv.className = "news-article";

            const articleImage = document.createElement("img");
            articleImage.src = article.urlToImage;
            articleImage.alt = article.title;

            const articleTitle = document.createElement("h3");
            articleTitle.textContent = article.title;  

            const articleDescription = document.createElement("p");
            articleDescription.textContent = article.description;

            const articleLink = document.createElement("a");
            articleLink.href = article.url;
            articleLink.target = "_blank";
            articleLink.textContent = "Read more";

            articleDiv.appendChild(articleImage);
            articleDiv.appendChild(articleTitle);
            articleDiv.appendChild(articleDescription);
            articleDiv.appendChild(articleLink);

            newsContainer.appendChild(articleDiv);
        }
    } else {
        newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
};

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    const category = categorySelect.value;
    fetchNews(query, category);
});

categorySelect.addEventListener("change", () => {
    const query = searchInput.value;
    const category = categorySelect.value;
    fetchNews(query, category);
});

fetchNews("", "all");

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    
    
    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
    } else {
        themeToggleButton.innerHTML = '<i class="fa-regular fa-moon"></i>';
    }
});