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
    var answerSelected = "";
    var correctAns = null;
    var theAnswerIs = "";
    var answerResult = null;
    var qnum = 0;
    var result = null;
    var intervalId;
    var clockRunning = false;
    var gameTimer = {
        time: 0,

        reset: function () {
            gameTimer.time = 0;
            $("#timer-display").text("2:00");
        },
        start: function () {
            if (!clockRunning) {
                intervalId = setInterval(gameTimer.countDown, 1000);
                clockRunning = true;
            }
        },
        stop: function () {
            clearInterval(intervalId);
            clockRunning = false;
        },
        countDown: function () {
            gameTimer.time--;
            var converted = gameTimer.timeConverter(gameTimer.time);
            $("#timer-display").text(converted);
        },
        timeConverter: function (t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return minutes + ":" + seconds;
        }
    }


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
        $(".checkAnswerContainer").hide();

        gameTimer.reset();

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
        $(".checkAnswerContainer").hide();
        $("#button-row").empty();

        gameTimer.start();

        // *** the load variables with the details from the current question ***
        this.questionNum = questionList[qnum].questionNumber;
        this.question = questionList[qnum].question;
        this.answers = questionList[qnum].answers;
        // this.correctAns = parseInt(questionList[qnum].correctAns);
        // this.theAnswerIs = questionList[qnum].answers[this.correctAns];

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
            // console.log("clicked the button");
            // console.log(self.answers.length);
            // console.log($(this));

            answerSelected = $(this).data("answer").toString();

            //console.log ("Answer Selected: "+answerSelected+ typeof answerSelected);
            // console.log ("correct Answer: "+self.theAnswerIs+ typeof self.theAnswerIs);

            self.displayAnswer(qnum, questionArr, answerSelected);
        })
    }

    //Create a function to hide buttons and provide your answer result
    this.displayAnswer = function (qnum, questionList) {

        var self = this;

        gameTimer.stop();
        setTimeout(self.nextQuestion(qnum, questionArr), 1000 * 3);


        this.correctAns = parseInt(questionList[qnum].correctAns);
        this.theAnswerIs = questionList[qnum].answers[this.correctAns];
        this.extraInfo = questionList[qnum].extraInfo;
        this.yourAnswer = answerSelected;

        console.log(this.yourAnswer + " " + typeof this.yourAnswer);
        console.log(this.theAnswerIs + " " + typeof this.theAnswerIs);

        if (this.yourAnswer === this.theAnswerIs) {
            $("#answerMessage").html("<p>CONGRATULATIONS, that is the correct answer!</p>");
            $("#answerGif").html("<img src='../TriviaGame/assets/images/Celebrate.gif'>");
            result = true;
            console.log("Result: " + result);
            numCorrectAns++;
        }
        else {
            $("#answerMessage").text("I'm sorry that is NOT the correct answer!");
            result = false;
            console.log("Result: " + result);
            numWrongAns++
        }

        console.log("Answer Result inside displayAnswer: " + result);

        $(".answer-button").hide();
        $(".checkAnswerContainer").show();

        // $("#answerInfo").text(this.extraInfo);
        $("#answerInfo").text("Extra Info PlaceHolder");
    }

    this.nextQuestion = function (qnum, questionList) {

        var self = this;
        qnum++
        console.log("New Question Number: " + qnum);
        self.askAQuestion(qnum, this.questionList)
        // console.log(typeof qnum);
        // console.log(typeof questionList.length);
        // if (qnum <= this.questionList.length) {
        //     self.askAQuestion(qnum, this.questionList);
        //     console.log ("Questions Answered: "+qnum+1);
        //     console.log ("Total Questions: "+this.questionList.length);
        // }
        // else {
        //     console.log ("Questions Answered: "+qnum+1);
        //     console.log ("Total Questions: "+this.questionList.length);
        //     self.endGame()
        // }
    }
    this.endGame = function () {
        $(".start-button").hide();
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $(".checkAnswerContainer").hide();
    }    
}

$(document).ready(function () {
    var game = new TriviaGame();
    game.startGame();
})

