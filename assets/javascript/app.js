   
var questionArr = [
    {questionNumber: 1,
    question: "What year was the first World Cup held?",
    answers: ["1926", "1930", "1934", "1932"],
    correctAns: 1   
    },
    {questionNumber: 2,
        question: "Where was the first World Cup held?",
        answers: ["England", "United States of America", "Uruguay", "Italy"],
        correctAns: 2   
    },
    {questionNumber: 3,
        question: "Who is the all time leading scorer?",
        answers: ["Pele", "Diego Maradonna", "Miroslav Klose", "Ronaldo"],
        correctAns: 2   
    },
    {questionNumber: 4,
        question: "Which nation holds the record for the most World Cups?",
        answers: ["Brazil", "Italy", "Germany", "France"],
        correctAns: 0   
    },
    {questionNumber: 5,
        question: "Who is the only player to score a hat-trick in a World Cup final?",
        answers: ["Jurgen Klinsmann", "Pele", "Geoff Hurst", "Paolo Rossi"],
        correctAns: 2   
    },
    {questionNumber: 6,
        question: "Which of these teams has NOT won the World Cup on home soil?",
        answers: ["Brazil", "Italy", "England", "Uruguay"],
        correctAns: 0   
    },
    {questionNumber: 7,
        question: "Which nation has played in every world cup?",
        answers: ["England", "Brazil", "Argentina", "Italy"],
        correctAns: 1   
    },
    {questionNumber: 8,
        question: "Which team scored 27 goals in one World Cup?",
        answers: ["Argentina", "Germany", "Brazil", "Hungary"],
        correctAns: 3   
    },
    {questionNumber: 9,
        question: "Who is this pictured to the right?",
        answers: ["", "", "", ""],
        correctAns: 0   
    },
    {questionNumber: 10,
        question: "Which team has scored the fastest world Cup goal?",
        answers: ["England", "Brazil", "Netherlands", "Turkey"],
        correctAns: 3   
    },
    {questionNumber: 11,
        question: "?",
        answers: ["", "", "", ""],
        correctAns: 0   
    },
    {questionNumber: 12,
        question: "?",
        answers: ["", "", "", ""],
        correctAns: 0  
    }
]


// displayQuestion ();
// //A function to create the quiz
// function createQuiz () {


// }

this.startGame = function () {
    console.log("Initiated StartGame function");
    this.correctAns = 0;
    this.wrongAns = 0;
    this.totalAns = 0;
    this.percentCorrect = (correctAns/totalAns)*100;

    console.log("Correct Answers: " + this.correctAns);
    console.log("Wrong Answers: " + this.wrongAns);
    console.log("Questions Answered: " + this.totalAns);
    console.log("Percentage correct: " + this.percentCorrect);


    // This function creates a random number between 19-120 inclusive, to be assigned to the games Target Score

    }
//A function to show the questions
function displayQuestion () {

    // this.randomizeQuestions = function () {
    //     console.log("Initiated randomizeQuestions function ");
    //     this.nextRandomQuestion = [Math.floor(Math.random() * 12) + 1];
    //     console.log("Target Score: " + this.nextRandomQuestion);
    //     $(".targetScore").html(this.targetNumber);
    //     return (this.nextRandomQuestion);

    for (i=0; i < questionArr.length; i++) {
        var questionNum = questionArr.questionNumber;
        console.log("Q"+questionNum);
        var question = questionArr.question[i];
        console.log("Question: "+question);
        var answers = questionArr.answers[i];
        console.log("Answers: "+answers);
        var correctAns = questionArr.correctAns[i];
        console.log("Correct Answer: "+correctAns);
        $(".question").html(question);
        $(".answer").html(answers)
    }

}

$(document).ready(function () {
    var game = new triviaGame();
    game.startGame();
    game.displayQuestion();
})
// function displayAnswer () {

// }

// function displayFinalResults () {

// }
