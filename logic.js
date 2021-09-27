//Huge bug alert: Last question is not being marked as correct when answered correctly
//NOTE: Combine all into large function

// Call in HTML elements
const startButton = document.getElementById("startBtn");
const quizBox = document.getElementById("quizContainer");
const questionElement = document.getElementById("question");
const answersElements = document.getElementById("answersContainer");
const timerText = document.getElementById("timer");
const scoreCount = document.getElementById("score");
const endScreen = document.getElementById("endScreenContainer");
const startScreen = document.getElementById("startScreenContainer");
const totalA = document.getElementById("totalAnswered");

const nameInput = document.getElementById("getName");
const submitNameButton = document.getElementById("submitbutton");

const namesList = document.getElementById("namesList");
const scoresList = document.getElementById("scoresList");
const highScoresBox = document.getElementById("highscoresContainer");
const scoreNotifier = document.getElementById("scoreContainer");

// Declare global variables
let questionIndex = 0;
let score = 0;
let totalAnswered = 0;
let secondsLeft = 121;

let scoresArray = [];

// Array of questions as objects
//do these last
const theQuiz = [
  {
    questionNumber: 1,
    question: "What is a string?",
    answers: [
      "An array containing more than one number.",
      "An HTML tag created within JavaScript using DOM manipulation.",
      "A set of characters/numbers/symbols contained within two quotation marks.",
      'A variable declared using "let" as opposed to "const" or "var".',
    ],
    correctAnswer:
      "A set of characters/numbers/symbols contained within two quotation marks.",
  },
  {
    questionNumber: 2,
    question: "Inside which HTML element do we link our Javascript file?",
    answers: ["<link>", "<script>", "<js>", "<scripts>"],
    correctAnswer: "<script>",
  },
  {
    questionNumber: 3,
    question:
      'In order to change the content of an HTML element with an ID of "description," which syntax could be used?',
    answers: [
      'document.querySelector("description").innerHTML = "New text"',
      'document.getElement("#description").innerHTML = "New text"',
      'document.createElement("description").textContent = "New text"',
      'document.querySelector("#description").innerHTML = "New text"',
    ],
    correctAnswer:
      'document.querySelector("#description").innerHTML = "New text"',
  },
  {
    questionNumber: 4,
    question:
      "Which of these will open a window asking the user for a string input?",
    answers: [
      'prompt("Please enter a string")',
      'confirm("Please enter a string")',
      'alertBox("Please enter a string")',
      'alert("Please enter a string")',
    ],
    correctAnswer: 'prompt("Please enter a string")',
  },
  {
    questionNumber: 5,
    question: "How do we create a function in Javascript?",
    answers: [
      "function = (=>)myFunction",
      "function myFunction()",
      "myFunction = var()",
      "function = myFunction()",
    ],
    correctAnswer: "function myFunction()",
  },
  {
    questionNumber: 6,
    question: 'How would we call a function with a name of "myFunction"?',
    answers: [
      "call myFunction()",
      "myfunction()",
      "function myFunction()",
      "myFunction()",
    ],
    correctAnswer: "myFunction()",
  },
  {
    questionNumber: 7,
    question:
      "Using which event method can we cancel out the default action of an element?",
    answers: [
      "event.preventDefault()",
      "event.stopPropogation()",
      "event.stopDefault()",
      "event.eatMyShorts()",
    ],
    correctAnswer: "event.preventDefault()",
  },
  {
    questionNumber: 8,
    question:
      'How would we write an if statement to run some code if "i" is NOT equal to a variable of "price"',
    answers: [
      "if (i < price)",
      "if (i =/= price)",
      "if (i =! price)",
      "if (i != price)",
    ],
    correctAnswer: "if (i != price)",
  },
  {
    questionNumber: 9,
    question: "How do we start a for loop?",
    answers: [
      "for (i <= 7; i++)",
      "for (i = 0; i <= 7; i++)",
      "for i (i <= 7, i++)",
      "for if (i = 0; i <= 7; i++)",
    ],
    correctAnswer: "for (i = 0; i <= 7; i++)",
  },
  {
    questionNumber: 10,
    question: "How do we add a comment within JavaScript?",
    answers: [
      "<!--This is a comment-->",
      "//This is a comment",
      "/*This is a comment*/",
      "Both #2 and #3",
    ],
    correctAnswer: "Both #2 and #3",
  },
  {
    questionNumber: 11,
    question:
      'What is: var characters = [{name: "John", animal: "Dog}, {name: "Mason", animal: "cat"}] ?',
    answers: [
      "An array.",
      "An array of objects.",
      "An object of arrays.",
      "An array of variables.",
    ],
    correctAnswer: "An array of objects.",
  },
  {
    questionNumber: 12,
    question: "What does Math.floor(Math.random() * 10) do?",
    answers: [
      "Generates a random function with 10 random snippets from other functions within the same .js file.",
      "Generates a random number between 0 and 9.",
      "Generates a random number between 0 and 10.",
      "Generates a <floor> tag within the HTML file and automatically appends it to the DOM body.",
    ],
    correctAnswer: "Generates a random number between 0 and 9.",
  },
  {
    questionNumber: 13,
    question: "How do we correctly write a JavaScript array?",
    answers: [
      "var numbers = [1, 2, 3, 4, 5]",
      "var numbers = {1, 2, 3, 4, 5}",
      "numbers = [1 2 3 4 5]",
      "var numbers = 1, 2, 3, 4, 5",
    ],
    correctAnswer: "var numbers = [1, 2, 3, 4, 5]",
  },
  {
    questionNumber: 14,
    question: "Which event occurs when a user clicks on an HTML element?",
    answers: ["onmouseclick", "mouseclick", "onclick", "onmouseover"],
    correctAnswer: "onclick",
  },
  {
    questionNumber: 15,
    question: "What is the difference between == and ===?",
    answers: [
      "== checks if the two items have equal type, === checks if they have equal value.",
      "== checks if the two items have equal value and type, === checks if they have equal value.",
      "== checks if the two items have equal type, === checks if they are within the same function.",
      "== checks if the two items have equal value, === checks if they have equal value and type.",
    ],
    correctAnswer:
      "== checks if the two items have equal value, === checks if they have equal value and type.",
  },
  {
    questionNumber: 16,
    question:
      "We want to delay a set of instructions from happening for one second. How would we achieve this?",
    answers: [
      'setTimeout(function(){ console.log("This will display after one second") }, 1000,);',
      'setInterval(function(){ console.log("This will display after one second") }, 1000,);',
      'setDelay(function(){ console.log("This will display after one second") }, 1000,);',
      'clearInterval(function(){ console.log("This will display after one second") }, 1000,);',
    ],
    correctAnswer:
      'setTimeout(function(){ console.log("This will display after one second") }, 1000,);',
  },
  {
    questionNumber: 17,
    question: "Which method should be used to split a string into an array?",
    answers: [
      'string.split("")',
      'string.split(" ")',
      'string.splice("")',
      'string.splice(" ")',
    ],
    correctAnswer: 'string.split("")',
  },
  {
    questionNumber: 18,
    question:
      "What should we use to store a variable into the browser, so that the value will remain the same even after the user reloads the page?",
    answers: [
      'localStorage.addItem("key", variable);',
      'localStorage.setItem("key", variable);',
      'localStorage.getItem("key", variable);',
      'localStorage.giveItem("key", variable);',
    ],
    correctAnswer: 'localStorage.setItem("key", variable);',
  },
  {
    questionNumber: 19,
    question: "What does .matches() do?",
    answers: [
      "Checks whether or not the element matches the function/variable within the brackets.",
      "Checks whether or not the class of the element matches the variable within the brackets.",
      "Checks whether or not the element matches the class/ID/tag within the brackets.",
      "Creates a Tinder account for the element and matches it with another element in the local area.",
    ],
    correctAnswer:
      "Checks whether or not the element matches the class/ID/tag within the brackets.",
  },
  {
    questionNumber: 20,
    question:
      "How do we change a variable back from a string into a number/boolean/array/object when pulling it from localStorage?",
    answers: ["JSON.stringify", "JSON.push", "JSON.splice", "JSON.parse"],
    correctAnswer: "JSON.parse",
  },
];

// Set non-quiz items to display:none, load quiz items from object in array
function loadQuizItems() {
  startScreen.style.display = "none";
  quizBox.style.display = "block";
  questionElement.textContent = theQuiz[questionIndex].question;
  for (let i = 0; i <= 3; i++) {
    answersElements.children[i].children[0].textContent =
      theQuiz[questionIndex].answers[i];
  }
  //questionIndex++;
}

// Display end screen, hide non end-screen elements
function toEndScreen() {
  endScreen.style.display = "block";
  quizBox.style.display = "none";
  submitNameButton.addEventListener("click", function () {
    let scoresObject = { userName: nameInput.value.trim(), userScore: score };
    //if it doesn't already exist, push the first score
    if (typeof localStorage.getItem("scores") == "object") {
      scoresArray.push(scoresObject);
      localStorage.setItem("scores", JSON.stringify(scoresArray));
      //if it does exist, pull existing scores, push new score onto it, then throw it back into localstorage
    } else {
      var pulledScores = JSON.parse(localStorage.getItem("scores"));
      pulledScores.push(scoresObject);
      localStorage.setItem("scores", JSON.stringify(pulledScores));
    }
    setTimeout(function () {
      endScreen.style.display = "none";
      loadHighscores();
    });
  });
}

function loadHighscores() {
    scoreNotifier.style.display = "none";
    highScoresBox.style.display = "block";
}

// Click start - go to first question, start timer, go to end screen at end of timer
startButton.addEventListener("click", function () {
  let timerInterval = setInterval(timerFunc, 1000);
  function timerFunc() {
    secondsLeft = secondsLeft - 1;
    timerText.textContent = secondsLeft + "s";
    if (secondsLeft <= 0) {
      toEndScreen();
      clearInterval(timerInterval);
      return;
    } else {
      loadQuizItems();
    }
  }
});

// Click answer - add to score if correct, go to next question
answersElements.addEventListener("click", function (event) {
  if (questionIndex === theQuiz.length) {
    toEndScreen();
    return;
  } else {
    loadQuizItems();
    questionIndex++;
    if (event.target.textContent === theQuiz[questionIndex - 1].correctAnswer) {
      score = score + 1;
      secondsLeft = secondsLeft + 5;
      //display you got it correct
    } else {
      secondsLeft = secondsLeft - 20;
      //display you got it wrong
    }
    scoreCount.textContent = score;
    totalA.textContent = questionIndex + 1;
  }
});

// onclick of view highscores button, load storeHighscores() and renderHighscores() function

// renderHighscores()
// namesList set innerHTML to ""
// scoresList
// var
// create HTML elements
