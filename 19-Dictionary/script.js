document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".wrapper"),
        searchInput = document.querySelector(".search input"),
        volumeIcon = document.querySelector(".word i"),
        infoText = document.querySelector(".info-text"),
        synonyms = document.querySelector(".synonyms .list"),
        removeIcon = document.querySelector(".search span");

    let audio = null;

    searchInput.addEventListener("keyup", async (event) => {
        let word = searchInput.value.trim();
        if (event.key === "Enter" && word) {
            fetchDictionaryData(word);
        }
    });

    removeIcon.addEventListener("click", () => {
        searchInput.value = "";
        searchInput.focus();
        wrapper.classList.remove("active");
        infoText.style.color = "#9A9A9A";
        infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
    });

    volumeIcon.addEventListener("click", () => {
        if (audio) {
            volumeIcon.style.color = "#4D59FB";
            audio.play().catch((err) => console.error("Audio playback failed:", err));
            setTimeout(() => {
                volumeIcon.style.color = "#999";
            }, 800);
        } else {
            alert("No audio available for this word.");
        }
    });

    async function fetchDictionaryData(word) {
        wrapper.classList.remove("active");
        infoText.style.color = "#000";
        infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>...`;

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();

            if (data.title) {
                throw new Error(data.title);
            }

            displayWordData(data);
        } catch (error) {
            infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try searching for another word.`;
            console.error("Error fetching data:", error);
        }
    }

    function displayWordData(data) {
        const wordElement = document.querySelector(".word p");
        const phoneticElement = document.querySelector(".word span");
        const meaningElement = document.querySelector(".meaning span");
        const exampleElement = document.querySelector(".example span");

        const wordData = data[0];
        wordElement.textContent = wordData.word;
        phoneticElement.textContent = `${wordData.meanings[0].partOfSpeech} /${wordData.phonetics[0]?.text || ""}/`;

        const audioSource = wordData.phonetics.find((phonetic) => phonetic.audio)?.audio;
        if (audioSource) {
            audio = new Audio(audioSource.startsWith("https") ? audioSource : `https:${audioSource}`);
        } else {
            audio = null; 
        }

        const meaningData = wordData.meanings[0].definitions[0];
        meaningElement.textContent = meaningData.definition;
        exampleElement.textContent = meaningData.example || "No example available.";

        if (!meaningData.synonyms || meaningData.synonyms.length === 0) {
            synonyms.parentElement.style.display = "none";
        } else {
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i = 0; i < Math.min(5, meaningData.synonyms.length); i++) {
                let tag = `<span onclick="fetchDictionaryData('${meaningData.synonyms[i]}')">${meaningData.synonyms[i]}</span>`;
                if (i < 4) tag += ", ";
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }

        wrapper.classList.add("active");
    }
});
