var TriviaGame = function () {
    var questionArr = [
        {
            questionNumber: 1,
            question: "What year was the first World Cup held?",
            answers: ["1926", "1930", "1934", "1932"],
            correctAns: 1
        },
        {
            questionNumber: 2,
            question: "Where was the first World Cup held?",
            answers: ["England", "United States of America", "Uruguay", "Italy"],
            correctAns: 2
        },
        {
            questionNumber: 3,
            question: "Who is the all time leading scorer?",
            answers: ["Pele", "Diego Maradonna", "Miroslav Klose", "Ronaldo"],
            correctAns: 2
        },
        {
            questionNumber: 4,
            question: "Which nation holds the record for the most World Cups?",
            answers: ["Brazil", "Italy", "Germany", "France"],
            correctAns: 0
        },
        {
            questionNumber: 5,
            question: "Who is the only player to score a hat-trick in a World Cup final?",
            answers: ["Jurgen Klinsmann", "Pele", "Geoff Hurst", "Paolo Rossi"],
            correctAns: 2
        },
        {
            questionNumber: 6,
            question: "Which of these teams has NOT won the World Cup on home soil?",
            answers: ["Brazil", "Italy", "England", "Uruguay"],
            correctAns: 0
        },
        {
            questionNumber: 7,
            question: "Which nation has played in every world cup?",
            answers: ["England", "Brazil", "Argentina", "Italy"],
            correctAns: 1
        },
        {
            questionNumber: 8,
            question: "Which team scored 27 goals in one World Cup?",
            answers: ["Argentina", "Germany", "Brazil", "Hungary"],
            correctAns: 3
        },
        {
            questionNumber: 9,
            question: "Who is this pictured to the right?",
            answers: ["", "", "", ""],
            correctAns: 0
        },
        {
            questionNumber: 10,
            question: "Which team has scored the fastest world Cup goal?",
            answers: ["England", "Brazil", "Netherlands", "Turkey"],
            correctAns: 3
        },
        {
            questionNumber: 11,
            question: "?",
            answers: ["", "", "", ""],
            correctAns: 0
        },
        {
            questionNumber: 12,
            question: "This is Question 12?",
            answers: ["A", "B", "C", "D"],
            correctAns: 0
        }
    ]
    var numCorrectAns = 0;
    var numWrongAns = 0;
    var questionNum = 0;
    var question = "";
    var answers = [];
    var answerSelected = null;
    var correctAns = null;
    var theAnswerIs = "";
    var qnum = 0;
    var result = null;

    // *** Function to present the start quiz screen and reset results ***
    this.startGame = function () {
        var self = this;
        // console.log("Initiated StartGame function");
        this.numCorrectAns = 0;
        this.numWrongAns = 0;
        this.totalAns = 0;
        this.percentCorrect = (this.correctAns / this.totalAns) * 100;

        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();

        // console.log("Correct Answers: " + this.numCorrectAns);
        // console.log("Wrong Answers: " + this.numWrongAns);
        // console.log("Questions Answered: " + this.totalAns);
        // console.log("Percentage correct: " + this.percentCorrect);

        // *** Clicking the start-button runs the function to ask the first question ***
        $(".start-button").on("click", function () {

            self.askAQuestion(qnum, questionArr);

        });
    }

    // *** Function to build and display each question and build answer buttons ***
    this.askAQuestion = function (qnum, questionList) {

        // console.log("askAQuestion Function initiated");
        var self = this;
        // *** Determine what elements need to be visible and which should be hidden ***
        $(".start-button").hide();
        $(".answer-button").show();
        $(".askQuestion").show();
        $(".questionNumber").show();
        $("#button-row").empty();


        // *** the load variables with the details from the current question ***
        this.questionNum = questionList[qnum].questionNumber;
        this.question = questionList[qnum].question;
        this.answers = questionList[qnum].answers;
        this.correctAns = parseInt(questionList[qnum].correctAns);
        this.theAnswerIs = questionList[qnum].answers[this.correctAns];

        // *** Display the question to the player ***
        $(".askQuestion").html(this.question);

        // *** Dynamically create and display the answers in the form of buttons *** 
        for (var numAnsw = 0; numAnsw < this.answers.length; numAnsw++) {
            var ansBtn = $("<button>");
            ansBtn.addClass("btn btn-block btn-md btn-primary answer-button");
            ansBtn.attr("data-answer", this.answers[numAnsw]);
            ansBtn.text(this.answers[numAnsw]);
            $("#button-row").append(ansBtn);
        }

        $(".answer-button").on("click", function () {
            console.log("clicked the button");
            console.log(self.answers.length);
            console.log($(this));

            answerSelected = $(this).data("answer").toString();
            
            console.log ("Answer Selected: "+answerSelected+ typeof answerSelected);
            console.log ("correct Answer: "+self.theAnswerIs+ typeof self.theAnswerIs);
            

            if (self.answerSelected === self.theAnswerIs) {
                $("#answerMessage").text("CONGRATULATIONS, that is the correct answer!");
                result = true;
                console.log("Result: "+result);
                numCorrectAns++;
            }
            else {
                $("#answerMessage").text("I'm sorry that is NOT the correct answer!");
                result = false;
                console.log("Result: "+result);
                numWrongAns++
            }
        })
        qnum++
        console.log("New Question Number: " + qnum);
        //this.displayAnswer(result);
    }

    this.displayAnswer = function (answerResult) {
        this.answerResult = answerResult;
        console.log("displayAnswer function initiated");
        $('<div class="container showAnswer"></div>');
        if (this.answerResult === true) {
            $(".showAnswer").html("Good Job, the answer is correct!!");
            console.log("Good Job");
        }
        else {
            $(".showAnswer").html("I'm afraid that answer is incorrect!!");
            console.log("Wawaaaahhh");

        }
        }

}

$(document).ready(function () {
    var game = new TriviaGame();
    game.startGame();
})

