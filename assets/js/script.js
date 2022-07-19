// The below variables returns element objects representing the elements whose id property matches the specified string.
var quizEl = document.getElementById("quiz");
var resultEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverEl = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var quizStart = document.getElementById("startButton");
var instructionEl = document.getElementById("instruction");
var scoreContainerEl = document.getElementById("scoreContainer");
var scorePageEl = document.getElementById("scorePage");
var initialsEl = document.getElementById("initials");
var scoreInitialsEl = document.getElementById("scoreInitials");
var endGameButtonEl = document.getElementById("endGameButton");
var submitScoreEl = document.getElementById("submitScore");
var highestScoreEl = document.getElementById("highestScore");
var answerA = document.getElementById("choiceA");
var answerB = document.getElementById("choiceB");
var answerC = document.getElementById("choiceC");
var answerD = document.getElementById("choiceD");

// Objects for constructing 'quizQuestions' variables.
var quizQuestions = [
  { question: "Commonly used data types DO NOT Include:",
    choiceA: "Strings",
    choiceB: "Booleans",
    choiceC: "Alerts",
    choiceD: "Numbers",
    correctAnswer: "C"},
  {
    question: "The condition in an if / else statement is enclosed with _______.",
    choiceA: "Quotes",
    choiceB: "Curly Brackets",
    choiceC: "Parenthesis",
    choiceD: "Square Brackets",
    correctAnswer: "C"},
   {
    question: "Arrays in JavaScript can be used to store _______.",
    choiceA: "Numbers and Strings",
    choiceB: "Other Arrays",
    choiceC: "Booleans",
    choiceD: "All of the above",
    correctAnswer: "D"},
    {
    question: "String values must be enclosed within _______ when being assigned to variables",
    choiceA: "Commas",
    choiceB: "Curly Brackets",
    choiceC: "Quotes",
    choiceD: "Parenthesis",
    correctAnswer: "C"},
    {
    question: "A very useful tool used during developement and debugging for printing content to the debugger is:",
    choiceA: "JavaScript",
    choiceB: "Terminal/Bash",
    choiceC: "For Loops",
    choiceD: "Console.log",
    correctAnswer: "D"},  
];

// Global variables that can be defined anywhere in the JavaScript Code; specifically used to create different functions.
var questionIndex = quizQuestions.length;
var presentIndex = 0;
var secondsLeft = 75;
var timerInterval;
var score = 0;
var correct;

// function - "startQuizQuestions" will circle through the object arrays that has the quiz questions which will generate questions and answers to its questions.
function startQuizQuestions() {    
    if (presentIndex === questionIndex) {
        return displayScore();
    } 
    var currentQuestion = quizQuestions[presentIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    answerA.innerHTML = currentQuestion.choiceA;
    answerB.innerHTML = currentQuestion.choiceB;
    answerC.innerHTML = currentQuestion.choiceC;
    answerD.innerHTML = currentQuestion.choiceD;
};

// Function "startQuiz" will start the time, as well as displaying the first quiz question.
function startQuiz(){
    instructionEl.style.display = "none";
    startQuizQuestions();

    // Timer that will count remaining time for the quiz.
    timerInterval = setInterval(function() {
        secondsLeft--;
        quizTimer.textContent = "Time left: " + secondsLeft + "s...";
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          displayScore();
        }
      }, 1000);
    quizEl.style.display = "block";
}

// Function - "displayScore" will appear at the end which will display user's score when user completes the quiz or when time runs out.
function displayScore() {
    quizEl.style.display = "none"
    gameoverEl.style.display = "flex";
    clearInterval(timerInterval);
    initialsEl.value = "";
    finalScoreEl.innerHTML = "Congratulation! You got " + score + " out of " + quizQuestions.length + "questions correct!";
}

/* Using the below "addEventListener" will allow user to submit their score. Also, the "localStorage" will store data of scores attained from the users.
Also if user does not input any of their initial, it will alert the user to enter their initial again. If user enters their initial, it will store their initial and 
score to local storage. */
submitScoreEl.addEventListener("click", function highscore() {
    if (initialsEl.value === "") {
        alert("Please enter your initials...");
        return false;
    } else {
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        var currentUser = initialsEl.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverEl.style.display = "none";
        scoreContainerEl.style.display = "flex";
        scorePageEl.style.display = "block";
        endGameButtonEl.style.display = "flex";
        
        savedScores.push(currentHighscore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        saveScore();

    }
    
});

// Function - "saveScore" will create lists of users' initials and scores so that we can easily see which user got what scores.
function saveScore() {
    scoreInitialsEl.innerHTML = "";
    highestScoreEl.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedScores"));
    for (i = 0; i < highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        scoreInitialsEl.appendChild(newNameSpan);
        highestScoreEl.appendChild(newScoreSpan);
    }
}

// Function - "showScore" will only display the score and initial page, and will hide all previous pages.
function showScore() {
    instructionEl.style.display = "none"
    gameoverEl.style.display = "none";
    scoreContainerEl.style.display = "flex";
    scorePageEl.style.display = "block";
    endGameButtonEl.style.display = "flex";
    saveScore();
}

// Function - "clearScore" will clear all data; users' initials and scores from the local storage.
function clearScore() {
    window.localStorage.clear();
    scoreInitialsEl.textContent = "";
    highestScoreEl.textContent = "";
}

// Function - "restartQuiz" will allow users to replay the quiz. If user presses the "Play Again" button, they will be directed to the start page.
function restartQuiz() {
    scoreContainerEl.style.display = "none";
    gameoverEl.style.display = "none";
    instructionEl.style.display = "flex";
    secondsLeft = 75;
    score = 0;
    presentIndex = 0;
}

// Function "checkAnswers" will check user's responses to questions that they answered. 
function checkAnswers(answer) {
    correct = quizQuestions[presentIndex].correctAnswer;
    if (answer === correct && presentIndex !== questionIndex) {
        score++;
        alert("Excellent! You answered the question correctly!");
        presentIndex++;
        startQuizQuestions();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && presentIndex !== questionIndex) {
        alert("Sorry... That is not a correct answer!")
        presentIndex++;
        startQuizQuestions();
        //display in the results div that the answer is wrong.
    } else {
        displayScore();
    }
}

// This "addEventListener" will allow users to start the quiz if they press "Start Quiz" button.
quizStart.addEventListener("click", startQuiz);