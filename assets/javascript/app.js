var TriviaGame = function () {
    // *** Array of question objects ***
    var questionArr = [
        {
            questionNumber: 1,
            question: "What year was the first World Cup held?",
            answers: ["1926", "1930", "1934", "1932"],
            correctAns: 1,
            extraInfo: "Only 13 countries participated, only 4 from outside the Americas, due to the difficulties of travelling."
        },
        {
            questionNumber: 2,
            question: "Where was the first World Cup held?",
            answers: ["England", "United States of America", "Uruguay", "Italy"],
            correctAns: 2,
            extraInfo: "Uruguay were chosen as the host nation, as they had successfully retained their football title at the 1928 Summer Olympics!"
        },
        {
            questionNumber: 3,
            question: "Who is the all time leading scorer?",
            answers: ["Pele", "Diego Maradonna", "Miroslav Klose", "Ronaldo"],
            correctAns: 2,
            extraInfo: "Klose scored 16 goals in 24 games, while featuring in 4 World Cups, from 2002 to 2014"
        },
        {
            questionNumber: 4,
            question: "Which nation holds the record for the most World Cups?",
            answers: ["Brazil", "Italy", "Germany", "France"],
            correctAns: 0,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 5,
            question: "Who is the only player to score a hat-trick in a World Cup final?",
            answers: ["Jurgen Klinsmann", "Pele", "Geoff Hurst", "Paolo Rossi"],
            correctAns: 2,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 6,
            question: "Which of these teams has NOT won the World Cup on home soil?",
            answers: ["Brazil", "Italy", "England", "Uruguay"],
            correctAns: 0,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 7,
            question: "Which nation has played in every world cup?",
            answers: ["England", "Brazil", "Argentina", "Italy"],
            correctAns: 1,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 8,
            question: "Which team scored 27 goals in one World Cup?",
            answers: ["Argentina", "Germany", "Brazil", "Hungary"],
            correctAns: 3,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 9,
            question: "Who is this pictured to the right?",
            answers: ["", "", "", ""],
            correctAns: 0,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 10,
            question: "Which team has scored the fastest world Cup goal?",
            answers: ["England", "Brazil", "Netherlands", "Turkey"],
            correctAns: 3,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 11,
            question: "?",
            answers: ["", "", "", ""],
            correctAns: 0,
            extraInfo: "Did you know?: "
        },
        {
            questionNumber: 12,
            question: "This is Question 12?",
            answers: ["A", "B", "C", "D"],
            correctAns: 0,
            extraInfo: "Did you know?: "
        }
    ]

    // *** Declaration of global variables ***
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

    // *** game Timer variables, objects and functions ***
    var intervalId;
    var clockRunning = false;
    var gameTimer = {
        time: 0,

        reset: function () {
            gameTimer.time = 120;
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
            var self = this;
            gameTimer.time--;
            var converted = gameTimer.timeConverter(gameTimer.time);
            $("#timer-display").text(converted);
            if (gameTimer.time < 30 && gameTimer.time > 0) {
                $("#timer-display").css('color', 'Red').text(converted);    
            }
            if (gameTimer.time === 0) {

                //  ...run the stop function.
                gameTimer.stop();

                //  Alert the user that time is up.
                alert("Time Up!");
                self.endGame()
            }
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

        // *** reset stats for the new game ***
        this.numCorrectAns = 0;
        this.numWrongAns = 0;
        this.totalAns = 0;
        this.percentCorrect = (this.correctAns / this.totalAns) * 100;

        // *** Configure which elements should appear on the opening screen ***
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $(".checkAnswerContainer").hide();
        $("#question-answer-card").hide();
        $("#final-stats-card").hide();


        // *** Reset the game timer ***
        gameTimer.reset();

        // *** Clicking the start-button runs the function to ask the first question ***
        $(".start-button").on("click", function () {

            self.askAQuestion(qnum, questionArr);

        });
    }

    // *** Function to build and display each question and build answer buttons ***
    this.askAQuestion = function (qnum, questionList) {

        var self = this;

        // *** Determine what elements need to be visible and which should be hidden ***
        $(".start-button").hide();
        $(".answer-button").show();
        $(".askQuestion").show();
        $(".questionNumber").show();
        $("#question-answer-card").hide();
        $("#button-row").empty();

        // *** Start the timer when each question is presented to the user ***
        gameTimer.start();

        // *** load variables with the details for the current question ***
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

        // *** Capture the answer button the user selected ***
        $(".answer-button").on("click", function () {

            answerSelected = $(this).data("answer").toString();

        // *** Invoke the function to display whether the user was correct or not ***
            self.displayAnswer(qnum, questionArr, answerSelected);
        })
    }

    // ***Create a function to hide the answer buttons and provide your answer result ***
    this.displayAnswer = function (qnum, questionList) {

        var self = this;

        // *** Pause the timer, while we present the answer to the user ***
        gameTimer.stop();

        // *** hide elements to make the answers more readable for the user, while displaying the answer card ***
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $("#question-answer-card").show();

        // *** assign information to the variables for displaying on the screen ***
        this.correctAns = parseInt(questionList[qnum].correctAns);
        this.theAnswerIs = questionList[qnum].answers[this.correctAns];
        this.extraInfo = questionList[qnum].extraInfo;
        this.yourAnswer = answerSelected;

        console.log(this.yourAnswer + " " + typeof this.yourAnswer);
        console.log(this.theAnswerIs + " " + typeof this.theAnswerIs);

        // *** Present the relevant information depending on whether the user answered correctly or not ***
        // *** Also increment stats for later ***
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

        // console.log("Answer Result inside displayAnswer: " + result);

        // *** Display the Question Result Card with addition Did you Know, text ***
        $(".checkAnswerContainer").show();
        $("#answerInfo").text(this.extraInfo);

        // *** invoke the 5 second timer, before taking the user to the next question ***
        var resultFiveSecondTimer = setTimeout(function() {
            self.nextQuestion (qnum, questionArr);    
        }, 5000); 
    }

    // *** Function to set up the next question, or end game if all questions answered ***
    this.nextQuestion = function (qnum, questionList) {

        var self = this;

        console.log ("Question Array Count: "+questionList.length);

        // *** Increment the question number
        qnum++
        console.log("New Question Number: " + qnum);

        // *** invoke function askAQuestion, to present the next question
        self.askAQuestion(qnum, questionArr)

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
    }

    this.endGame = function () {
        $(".start-button").hide();
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $("#question-answer-card").hide();
        $("#final-stats-card").show();

        this.numCorrectAns = numCorrectAns;
        this.numWrongAns = numWrongAns;
        var totalAnswered = this.numCorrectAns + this.numWrongAns
        this.percentCorrect = (this.numCorrectAns/totalAnswered)*100

        console.log ("Correct: "+this.numCorrectAns);
        console.log ("Wrong: "+this.numWrongAns);
        console.log ("Total: "+this.totalAnswered);
        console.log ("Percent: "+this.percentCorrect);

        $("#QuestionsAnswers").append(this.numCorrectAns+numWrongAns);
        $("#correctAnswers").append(this.numCorrectAns);
        $("#percentCorrect").append(this.percentCorrect);
    }
}

$(document).ready(function () {
    var game = new TriviaGame();
    game.startGame();
})

