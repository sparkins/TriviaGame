var TriviaGame = function () {

    var self = this;
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
            extraInfo: "Brazil has won the World Cup a record 5 times, while losing in the final twice.  They last won it in 2002."
        },
        {
            questionNumber: 5,
            question: "Who is the only player to score a hat-trick in a World Cup final?",
            answers: ["Jurgen Klinsmann", "Pele", "Geoff Hurst", "Paolo Rossi"],
            correctAns: 2,
            extraInfo: "Geoff Hurst scored a hat-trick in the 1966 final, as England came out on top against Germany 4-2 after extra-time."
        },
        {
            questionNumber: 6,
            question: "Which of these teams has NOT won the World Cup on home soil?",
            answers: ["Brazil", "Italy", "England", "Uruguay"],
            correctAns: 0,
            extraInfo: "Surprisingly, despite winning the World Cup more than any other nation, they are yet to do it in front of their home fans."
        },
        {
            questionNumber: 7,
            question: "Which nation has played in every world cup?",
            answers: ["England", "Brazil", "Argentina", "Italy"],
            correctAns: 1,
            extraInfo: "It's Brazil.  21 out of 21, not bad!!!  Germany are 2nd and have played in 19, although they have made the last 17 straight."
        },
        {
            questionNumber: 8,
            question: "Which team scored 27 goals in one World Cup?",
            answers: ["Argentina", "Germany", "Brazil", "Hungary"],
            correctAns: 3,
            extraInfo: "Hungary netted a staggering 27 goals in Switzerland in 1954, however they came up short in the final losing to West Germany."
        },
        {
            questionNumber: 9,
            question: "Which team once went 559 minutes without conceding a goal in a world cup game?",
            answers: ["Germany", "Switzerland", "Italy", "Argentina"],
            correctAns: 1,
            extraInfo: "Between the 2006 and 2010 world cups, Switzerland went almost 10 hours without conceding a goal. They went out on penalties to the Ukraine in 2006 after a 0-0 draw."
        },
        {
            questionNumber: 10,
            question: "Which team has scored the fastest world Cup goal?",
            answers: ["England", "Brazil", "Netherlands", "Turkey"],
            correctAns: 3,
            extraInfo: "Hakan Sukur of Turkey scored after just 10.8 seconds against South Korea during the 3rd place play-off, in 2002."
        },
        {
            questionNumber: 11,
            question: "Which nation has won the most Women's World Cups?",
            answers: ["Germany", "Japan", "USA", "Brazil"],
            correctAns: 2,
            extraInfo: "So far there have been 7 FIFA Women's World Cups and 4 different winners.  USA lead the way with 3 triumphs, Germany 2 and 1 each for Norway and Japan."
        },
        {
            questionNumber: 12,
            question: "Which woman has scored more World Cup goals than any one else?",
            answers: ["Marta", "Abby Wambach", "Birgit Prinz", "Sun Wen"],
            correctAns: 0,
            extraInfo: "Marta has scored an impressive 15 goals across 4 different world cups for Brazil.  One more than Prinz of Germany, who played in 5 World Cups from 1995 to 2011."
        }
    ]

    // *** Declaration of global variables ***
    var numCorrectAns = 0;
    var numWrongAns = 0;
    var numTimesUp = 0;
    var answerSelected = "";
    var qnum = 0;
    var result = null;

    // *** game Timer variables, objects and functions ***
    var intervalId;
    var clockRunning = false;
    var gameTimer = {
        time: 0,

        reset: function () {
            gameTimer.time = 10;
            $("#timer-display").text("00:10");
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
            if (gameTimer.time < 3 && gameTimer.time > 0) {
                $("#timer-display").css('color', 'Red').text(converted);    
            }
            if (gameTimer.time === 0) {

                //*** Stop the timer if it gets to zero ***
                gameTimer.stop();

                // *** End the game if the time runs out ***
                // self.endGame();
                answerSelected = "Times Up";
                self.displayAnswer(questionArr, answerSelected);
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
        this.percentCorrect = 0;

        // *** Configure which elements should appear on the opening screen ***
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $(".checkAnswerContainer").hide();
        $("#question-answer-card").hide();
        $("#final-stats-card").hide();
        $(".restart-button").hide();
        $(".start-button").show();


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
        gameTimer.reset();
        gameTimer.start();

        // *** load variables with the details for the current question ***
        var questionNum = questionList[qnum].questionNumber;
        var question = questionList[qnum].question;
        var answers = questionList[qnum].answers;

        // *** Display the question to the player ***
        $(".askQuestion").html(question);
        $(".questionNumber").text("Question: "+questionNum);

        // *** Dynamically create and display the answers in the form of buttons *** 
        for (var numAnsw = 0; numAnsw < answers.length; numAnsw++) {
            var ansBtn = $("<button>");
            ansBtn.addClass("btn btn-block btn-md btn-primary answer-button");
            ansBtn.attr("data-answer", answers[numAnsw]);
            ansBtn.text(answers[numAnsw]);
            $("#button-row").append(ansBtn);
        }

        // *** Capture the answer button the user selected ***
        $(".answer-button").on("click", function () {

            answerSelected = $(this).data("answer").toString();

        // *** Invoke the function to display whether the user was correct or not ***
            self.displayAnswer(questionArr, answerSelected);
        })
    }

    // ***Create a function to hide the answer buttons and provide your answer result ***
    this.displayAnswer = function (questionList, answerSelected) {

        var self = this;

        // *** Pause the timer, while we present the answer to the user ***
        gameTimer.stop();

        // *** hide elements to make the answers more readable for the user, while displaying the answer card ***
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $("#question-answer-card").show();

        // *** assign information to the variables for displaying on the screen ***
        var correctAns = parseInt(questionList[qnum].correctAns);
        var theAnswerIs = questionList[qnum].answers[correctAns];
        var extraInfo = questionList[qnum].extraInfo;
        var yourAnswer = answerSelected;

        // *** Present the relevant information depending on whether the user answered correctly or not ***
        // *** Also increment stats for later ***
        if (yourAnswer === theAnswerIs) {
            $("#answerMessage").html("<p>CONGRATULATIONS, that is the correct answer!</p>");
            // $("#answerGif").html("<img src='../TriviaGame/assets/images/Celebrate.gif'>");
            result = true;
            // console.log("Result: " + result);
            numCorrectAns++;
        }
        else if (yourAnswer === "Times Up") {
            $("#answerMessage").text("I'm sorry you didn't answer the question in time!");
            result = false;
            numTimesUp++
        }
        else {
            $("#answerMessage").text("I'm sorry that is NOT the correct answer!");
            result = false;
            // console.log("Result: " + result);
            numWrongAns++
        }

        // console.log("Answer Result inside displayAnswer: " + result);

        // *** Display the Question Result Card with addition Did you Know, text ***
        $(".checkAnswerContainer").show();
        $("#answerInfo").text(extraInfo);

        // *** invoke the 5 second timer, before taking the user to the next question ***
        var resultFiveSecondTimer = setTimeout(function() {
            self.nextQuestion (questionArr);    
        }, 3000); 
    }

    // *** Function to set up the next question, or end game if all questions answered ***
    this.nextQuestion = function (questionList) {

        var self = this;
        // *** Increment the question number
        qnum++
        // console.log("New Question Number: " + qnum);
        // console.log ("Question Array Count: "+questionList.length);

        if (qnum < questionList.length) {
            self.askAQuestion(qnum, questionList);
            // console.log ("Questions Answered: "+qnum+1);
            // console.log ("Total Questions: "+questionList.length);
        }
        else {
            // console.log ("Questions Answered: "+qnum+1);
            // console.log ("Total Questions: "+questionList.length);
            self.endGame()
        }
    }

    this.endGame = function () {

        var self = this;

        $(".start-button").hide();
        $(".answer-button").hide();
        $(".askQuestion").hide();
        $(".questionNumber").hide();
        $("#question-answer-card").hide();
        $("#final-stats-card").show();
        // $(".restart-button").show();

        self.numCorrectAns = numCorrectAns;
        self.numWrongAns = numWrongAns;
        self.numTimesUp = numTimesUp;
        var totalAnswered = self.numCorrectAns + self.numWrongAns
        self.percentCorrect = parseInt((self.numCorrectAns/totalAnswered)*100)

        console.log ("Correct: "+self.numCorrectAns);
        console.log ("Wrong: "+self.numWrongAns);
        console.log ("Total: "+self.totalAnswered);
        console.log ("Percent: "+self.percentCorrect);

        $("#QuestionsAnswers").append(self.numCorrectAns+numWrongAns);
        $("#correctAnswers").append(self.numCorrectAns);
        $("#percentCorrect").append(self.percentCorrect+"%");

        // $(".restart-button").on("click", function () {

            // self.startGame();
            // game.startGame();

        // });
    }
}

$(document).ready(function () {
    var game = new TriviaGame();
    game.startGame();
})

