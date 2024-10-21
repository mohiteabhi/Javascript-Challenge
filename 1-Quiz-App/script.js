const questions = [
    {
        question: "What is the correct syntax to create a function in JavaScript?",
        answers: [
            { text: "function = myFunction()", correct: false, description: "<b>Explanation: </b>This is incorrect. The '=' symbol is used for assignment, not function declaration." },
            { text: "function myFunction()", correct: true, description: "Correct Answer" },
            { text: "create myFunction()", correct: false, description: "<b>Explanation: </b>'create' is not a keyword In JavaScript to create functon, .create() is a function that is used as Object.create() to create a new object with a specified prototype.." },
            { text: "def myFunction()", correct: false, description: "<b>Explanation: </b>'def' is used in Python, not in JavaScript." },
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false, description: "<b>Explanation: </b>Microsoft did not created JavaScript. They Created C#" },
            { text: "Sun Microsystems", correct: false, description: "<b>Explanation: </b>Sun Microsystems created Java not JavaScript." },
            { text: "Netscape", correct: true, description: "Correct Answer" },
            { text: "Google", correct: false, description: "<b>Explanation: </b>Google was not involved in the creation of JavaScript." },
        ]
    },
    {
        question: "How can you add a Single-line comment in JavaScript?",
        answers: [
            { text: "// This is a comment", correct: true, description: "Correct Answer"},
            { text: "&lt;!-- This is a comment --&gt;", correct: false, description: "<b>Explanation: </b>This is a comment in HTML !!!"},
            { text: "# This is a comment", correct: false, description: "<b>Explanation: </b>This is Comment in Python !!!"},
            { text: "/* This is a comment */", correct: false, description: "<b>Explanation: </b>/* This is a comment */ is used for multi-line comments"}
        ]
    },
    {
        question: "What does NaN stand for in JavaScript?",
        answers: [
            { text: "Not a Number", correct: true, description: "Correct Answer"},
            { text: "Negative a Number", correct: false, description: "<b>Explanation: </b>Negative a Number typically refers to the concept of representing a negative numerical value"},
            { text: "Non-existent Arithmetic Number", correct: false, description: "Wrong Answer"},
            { text: "None of the Above", correct: false, description: "Wrong Answer"}
        ]
    },
    {
        question: "Guess the output: console.log(typeof (1 + '1'));",
        answers: [
            { text: "number", correct: false, description: "<b>Explanation: </b>addition of a number and a string results in string concatenation, not numeric addition"},
            { text: "string", correct: true, description: "Correct Answer"},
            { text: "undefined", correct: false, description: "<b>Explanation: </b>undefined implies that the operation yields no value, whereas it does produce a valid output."},
            { text: "object", correct: false, description: "<b>Explanation: </b>This misrepresents the result, as the output type is not an object but a string due to the concatenation."}
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");
const descriptionElement = document.createElement("p");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questioNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questioNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.dataset.description = answer.description; // Store description
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    descriptionElement.innerHTML = ""; // Clear description
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Show description for both correct and incorrect answers
    descriptionElement.innerHTML = selectedBtn.dataset.description;
    
    // Set the description color based on the correctness of the answer
    descriptionElement.style.color = isCorrect ? "green" : "red";
    
    document.querySelector(".quiz").appendChild(descriptionElement);

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after selecting one
    });

    nextButton.style.display = "block";
}


function showScore(){
    resetState(); 
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();




// const questions = [
//     {
//         question: "What is the correct syntax to create a function in JavaScript?",
//         answers: [
//             { text: "function = myFunction()", correct: false},
//             { text: "function myFunction()", correct: true},
//             { text: "create myFunction()", correct: false},
//             { text: "def myFunction()", correct: false},
//         ]
//     },

//     {
//         question: "Which company developed JavaScript?",
//         answers: [
//             { text: "Microsoft", correct: false},
//             { text: "Sun Microsystems", correct: false},
//             { text: "Netscape", correct: true},
//             { text: "Google", correct: false},
//         ]
//     },

    // {
    //     question: "How can you add a comment in JavaScript?",
    //     answers: [
    //         { text: "// This is a comment", correct: true},
    //         { text: "&lt;!-- This is a comment --&gt;", correct: false},
    //         { text: "# This is a comment", correct: false},
    //         { text: "/* This is a comment */", correct: false},
    //     ]
    // },

    // {
    //     question: "Which of the following is not a JavaScript data type?",
    //     answers: [
    //         { text: "Undefined", correct: false},
    //         { text: "Number", correct: false},
    //         { text: "Float", correct: true},
    //         { text: "String", correct: false},
    //     ]
    // },

//     {
//         question: "Which of the following methods can be used to display data in JavaScript?",
//         answers: [
//             { text: "document.write()", correct: false},
//             { text: "console.log()", correct: false},
//             { text: "alert()", correct: false},
//             { text: "All of the above", correct: true},
//         ]
//     }
// ];

// const questionElement = document.getElementById("question");
// const answerButtons = document.getElementById("answer-btn");
// const nextButton = document.getElementById("next-btn");

// let currentQuestionIndex = 0;
// let score = 0;

// function startQuiz(){
//     currentQuestionIndex = 0;
//     score = 0;
//     nextButton.innerHTML = "Next";
//     showQuestion();
// }

// function showQuestion(){
//     resetState();
//     let currentQuestion = questions[currentQuestionIndex];
//     let questioNo = currentQuestionIndex + 1;
//     questionElement.innerHTML = questioNo + ". " + currentQuestion.question;

//     currentQuestion.answers.forEach(answer => {
//         const button = document.createElement("button");
//         button.innerHTML = answer.text;
//         button.classList.add("btn");
//         answerButtons.appendChild(button);
//         if(answer.correct){
//             button.dataset.correct = answer.correct;
//         }
//         button.addEventListener("click", selectAnswer);
//     });
// }

// function resetState(){
//     nextButton.style.display = "none";
//     while(answerButtons.firstChild){
//         answerButtons.removeChild(answerButtons.firstChild);
//     }
// }

// function selectAnswer(e){
//     const selectedBtn = e.target;
//     const isCorrect = selectedBtn.dataset.correct === "true";
//     if(isCorrect){
//         selectedBtn.classList.add("correct");
//         score++;
//     }else{
//         selectedBtn.classList.add("incorrect");
//     }
//     Array.from(answerButtons.children).forEach(button => {
//         if(button.dataset.correct === "true"){
//             button.classList.add("correct");
//         }
//         button.disabled = true;
//     });
//     nextButton.style.display = "block";
// }

// function showScore(){
//     resetState(); 
//     questionElement.innerHTML = `You scoreed ${score} out of ${questions.length}!`;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display =  "block";
// }

// function handleNextButton(){
//     currentQuestionIndex++;
//     if(currentQuestionIndex < questions.length){
//         showQuestion();
//     }else{
//         showScore();
//     }
// }

// nextButton.addEventListener("click", ()=>{
//     if(currentQuestionIndex < questions.length){
//         handleNextButton();
//     }else{
//         startQuiz();
//     }
// })


// startQuiz()