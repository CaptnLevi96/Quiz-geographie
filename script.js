const questions = [

    {
        question: "Quelle est la capitale de la France?",
        answers: [ 
            { text: "Bruxelles", correct: false},
            { text: "Londres", correct: false},
            { text: "Paris", correct: true},
            { text: "Montréal", correct: false},
        ]
    },
    {
        question: "En quelle année le Canada à été fondé?",
        answers: [ 
            { text: "1867", correct: true},
            { text: "1776", correct: false},
            { text: "1994", correct: false},
            { text: "1948", correct: false},
        ]
    },
    {
        question: "Dans quel continent ce trouve l'Inde",
        answers: [ 
            { text: "Afrique", correct: false},
            { text: "Asie", correct: true},
            { text: "Amérique du Sud", correct: false},
            { text: "Antartique", correct: false},
        ]
    },
    {
        question: "Dans quelle de région de l'Afrique ce trouve le Nigéria",
        answers: [ 
            { text: "Afrique australe", correct: false},
            { text: "Afrique centrale", correct: false},
            { text: "Afrique de l'ouest", correct: true},
            { text: "Afrique du nord", correct: false},
        ]
    },

    {
        question: "Quelle est le plus large pays d'Amerique du Sud?",
        answers: [ 
            { text: "L'Argentine", correct: false},
            { text: "Cuba", correct: false},
            { text: "Le Brésil", correct: true},
            { text: "La Bolivie", correct: false},
        ]
    },

    {
        question: "Quel est le lac le plus large au monde?",
        answers: [ 
            { text: "Mer Caspienne", correct: true},
            { text: "Lac Michigan", correct: false},
            { text: "Lac Victoria", correct: false},
            { text: "Lac Superieur", correct: false},
        ]
    },

    {
        question: "Combien d'états contiennent les États-Unis?",
        answers: [ 
            { text: "30 états", correct: false},
            { text: "60 états", correct: false},
            { text: "40 états", correct: false},
            { text: "50 états ", correct: true},
        ]
    },
    
    {
        question: "Laquelle de ses villes jouent à la fois le rôle de ville et pays?",
        answers: [ 
            { text: "Singapour", correct: true},
            { text: "New York", correct: false},
            { text: "New Delhi", correct: false},
            { text: "Tokyo", correct: false},
        ]
    },
    
    {
        question: "Entre quelles pays ce trouve le Mont-Everest?",
        answers: [ 
            { text: "La Chine et le Népal", correct: true},
            { text: "La Tanzanie et le Kenya", correct: false},
            { text: "L'Inde et le Pakistan", correct: false},
            { text: "Le Canada et les États-Unis", correct: false},
        ]
    },
   
    {
        question: "Combien de pays combien comptent l'Afrique?",
        answers: [ 
            { text: "63", correct: false},
            { text: "54", correct: true},
            { text: "Question piège, l'Afrique est un pays!", correct: false},
            { text: "47 ", correct: false},
        ]
    }    
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Prochaine question";
    showQuestion();
}

function showQuestion(){
resetState();    
let currentQuestion = questions[currentQuestionIndex];
let questionNo = currentQuestionIndex + 1;
questionElement.innerHTML = questionNo + ". " + currentQuestion.
question;

currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Votre score est ${score} sur ${questions.length}!`;
    nextButton.innerHTML = "Rejouer";
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


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
