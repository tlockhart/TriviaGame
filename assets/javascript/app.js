
$(document).ready(function() {
    //  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var responseIntervalId;
var nextQuestionIntervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var responseClockRunning = false;
var nextQuestionClockRunning = false;

var nextQuestionStopwatch = {
    timeLimit :10,
    stop: function(){
         // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(nextQuestionIntervalId);
            nextQuestionClockRunning = false;
            /*stopwatch.time = 0;*/
            console.log("NEXT QUESTION TIMER HAS BEEN STOPPED!")
    },
    start: function(){
        if (!nextQuestionClockRunning) {
            nextQuestioneIntervalId = setInterval(updateGameScreen,  1000 * 10 /*nextQuestionStopwatch.timeLimit*/);
            nextQuestionClockRunning = true;
            console.log("NEXT QUESTION TIMER HAS BEEN STARTED");
        }//if
    }
}

var responseStopwatch = {
    timeLimit :5,
    stop: function(){
         // DONE: Use clearInterval to stop the count here and set the clock to not be running.
            clearInterval(responseIntervalId);
            responseClockRunning = false;
            /*stopwatch.time = 0;*/
            console.log("RESPONSE TIMER HAS BEEN STOPPED!")
    },
    start: function(){
        if (!responseClockRunning) {
            responseIntervalId = setInterval(timeOut,  1000 * 5 /*responseStopwatch.timeLimit*/);
            responseClockRunning = true;
            console.log("RESPONSE TIMER HAS BEEN STARTED");
        }//if
    }
}
// Our stopwatch object
var stopwatch = {

  time: 0,
 /* isTimeOutReached : function(){
      var value = stopwatch.time === stopwatch.timeLimit;
      return value;
  },*/
  /*lap: 1,*/

  reset: function() {

    stopwatch.time = 0;

    // DONE: Change the "timer" div to "00:00."
    $("#timer").text("00:00");

    // DONE: Empty the "laps" div.
  },
  start: function() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
      console.log("Timer has started");
      /*if(stopwatch.isTimeOutReached()){
        stopwatch.stop();
        console.log("END OF TIME REACHED");
      }*/
    }
  },
  stop: function() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
    /*stopwatch.time = 0;*/
    console.log("CLOCK TIMER HAS BEEN STOPPED!")
  },
  count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time++;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    /*console.log("Converted = "+converted);
    console.log("STOPWATCH TIMER = "+stopwatch.time);*/

    // DONE: Use the variable we just created to show the converted time in the "timer" div.
    $('#timer').text(converted);
  },
  timeConverter: function(t) {

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
};
    //Game States that effect the game variables
    var states = {
    INIT : "init",
    START : "start",
    QUESTION : "question",
    RESPONSE : "response", //user ran out of remainingGuesses
    SUMMARY : "summary"
    };

    //set initial state
    var state = states.START;
    //var $button = $('<button>');
    /*var $image = $('<img>');*/

    //response variables
    var responseMessages = ["Correct!", "Incorrect!", "Out of Time!"];

    //question variables
    var questionMessage = ["What does Rick say will be his series arch?", "What does Rick say is a weapon to scare off villagers during the purge?", "What game does Morty play at Blips and Chitz?", "What was Jerry's job before being fired?", " What animal does Rick use for Morty's love potion", "What does Rick say is the most valuable thing the Vindicators posses?", "What is the name of Morty Jr's book", "What musical did the Sanchez family see in the false parasite memory?", "Why does Rick call the fly soldiers robots?", "What does Rick allow Morty to experience in the garage?"];

    var questionChoices  = [
        ["Getting schwifty", "Finding the one armed man", "Getting the szechuan sauce", "Finding the replicators"],
        ["Tic Tac", "M&M", "Gum", "Crunch Bar"],
        ["Chazz", "Galactic", "Roy", "Tony"],
        ["Marketing", "Advertising agent", "Artist", "Telemarketer"],
        ["Orca", "Vole", "Mole", "Alligator"],
        ["Morty", "Crocubot", "Alan Rail's whistle", "Noob Noob"],
        ["My Horrible Father", "Tales of my Father", "Alien Life", "Father Morty"],
        ["Spider-man!", "Cats", "Hulk! The Musical", "The Lion King"],
        ["So Morty will shoot them", "He doesn't respect them", "They are Federation Scum", "He thinks they are mindless"],
        ["Zero Gravity", "Growth Machine", "Science", "True Level"]
    ];
/**************************************************************************************** */
    var questionAnswers = [2, 0, 2, 1, 1, 3, 0, 2, 1, 3];
    var currentQuestion = 0;

    //GameScreens
    var $startGameScreen = $('#start');
    var $questionGameScreen = $('#question');
    var $allGameScreens = $('.screen');
    /*$allGameScreens.hide();*/
    

    //question variables
   /* var questions = [];*/

    //response variables
    var $responseGameScreen = $('#response');
   
    var responseEvaluation = ['Correct!', 'Incorrect.', 'Times Up!'];
    var responseButtonValue = -1;
    var correctAnswerMsg = 'The correct answer is:';
    var responseImages = ['assets/images/szechuan.jpg', 'assets/images/tictacs.jpg', 'assets/images/roy.jpg','assets/images/advertising.jpg','assets/images/vole.jpg', 'assets/images/noobnoob.jpg', 'assets/images/horriblefather.jpg', 'assets/images/hulkmusical.jpg', 'assets/images/robots.jpg', 'assets/images/truelevel.jpg'];
    /*var nextQuestionTime = 5;*/
    /* nextQuestionIntervalId; */
    /*******************************
     * Helper functions
     * *****************************/
    //Set game state
    function setState(newState){
        state = newState;
    }
    //Update display based on state or button click
    function updateDisplays(){
    }
    
    function displayStartGameScreen(){        
        $startGameScreen.show();
        console.log("I am displaying the StartGameScreen");
    }
    /*function hideStartGameScreen(){
        $startGameScreen.hide();
        console.log("I am hiding the StartGameScreen");
    }*/
    function displayQuestionGameScreen(){
        var choiceLength = 4;
        /*var $question = $('#questionMessageOutput');
        $question.text(questionMessage[currentQuestion]);*/
        displayDynamicOutput('questionMessageOutput', questionMessage[currentQuestion]);
        
        /*console.log("Question = "+questionMessage[currentQuestion]);*/
        console.log("I am displaying the QuestionGameScreen");

        for (var i = 0; i < choiceLength; i++)
        {
            displayDynamicOutput('choice'+i, questionChoices[currentQuestion][i]);
            console.log('Choices = '+questionChoices[currentQuestion][i]);
        }

        //show questionGameScreen
        $questionGameScreen.show();
    }

    function displayImage(outputElement, value){
        var $outputElement = $('#'+outputElement);
        //$outputElement.html('<img src= assets/images/'+value+'/>')
        $outputElement.attr('src', value);
    }

    function setResponses(){
        //Display the correct answer
            /**********************************************************/
            displayDynamicOutput('responseMessageOutput', correctAnswerMsg);
            
            var index = parseInt(questionAnswers[currentQuestion]);

           /* console.log('Current Question = '+currentQuestion+', The index value = '+index+' Image name = '+responseImages[currentQuestion]+', Correct Answer = '+questionChoices[currentQuestion][index]);*/
            
            //Display Generic Message
            displayDynamicOutput('responseAnswerOutput', questionChoices[currentQuestion][index]);

            //Display the  image
            displayImage('responseImage', responseImages[currentQuestion]);
            /**********************************************************/
    }
    function removeImage(){
        displayImage('responseImage', '');

    }
    function displayResponseGameScreen(){
        //Set Evaluation message
        console.log("RESPONSE BUTTON VALUE = "+responseButtonValue+", Correct Answer = "+questionAnswers[currentQuestion]);
        if(responseButtonValue == questionAnswers[currentQuestion]){
            /*$('#responseEvaluationOutput').text(responseEvaluation[0]);*/
            displayDynamicOutput('responseEvaluationOutput', responseEvaluation[0]);

            //Stop the Timer
            stopwatch.stop();
            console.log("DisplayResponseGameScreen: Correct Answer Time stopped");

            //Clear the Time Up Interal Immediately
            //clearInterval(responseIntervalId);
            responseStopwatch.stop();

            //console.log("displayResponseGameScreen: responseIntervalId = "+responseIntervalId);
            
            //Set the HTML Response Elements
            setResponses();
            
            //show responseGameScreen
            $responseGameScreen.show();

            /************************************** */
             //Stop response Stop Watch
             responseStopwatch.stop();

             //Queue Next Question
             queueNextQuestion();
            /**********************************************************/
        }
        else if(responseButtonValue != questionAnswers[currentQuestion] && responseButtonValue > -1 ){
            /*$('#responseEvaluationOutput').text(responseEvaluation[1]);*/
            displayDynamicOutput('responseEvaluationOutput', responseEvaluation[1]);

            //Stop the Timer
            stopwatch.stop();
            console.log("DisplayResponseGameScreen: Incorrect Answer Time stopped");
            
            //Clear the Time Up Interal Immediately
            //clearInterval(responseIntervalId);
            responseStopwatch.stop();

            //Set the HTML Response Elements
            setResponses();

            //show responseGameScreen
            $responseGameScreen.show();

            /************************************** */
             //Stop response Stop Watch
             responseStopwatch.stop();

             //Queue Next Question
             queueNextQuestion();
             /************************************** */
        }

    }

    function queueNextQuestion(){
        if(currentQuestion < questionAnswers.length-1)
        {
            //Reset state to Question
        setState(states.QUESTION);

        //Reset responseButtonValue
        responseButtonValue = -1;

        //Remove currentImage
        //removeImage();

        //console.log("queueNextQuestion: Current Question BEFORE Increment = "+currentQuestion);
        //9/14/2018:
        /********************************************************************** */
        var index = parseInt(questionAnswers[currentQuestion]);

           console.log('Current Question BEFORE INCR= '+currentQuestion+', The index value = '+index+' Image name = '+responseImages[currentQuestion]+', Correct Answer = '+questionChoices[currentQuestion][index]);
           /************************************************************************* */
        //Increment currentQuestion
        currentQuestion = currentQuestion + 1;
        /************************************************************************* */
        index = parseInt(questionAnswers[currentQuestion]);

           console.log('Current Question AFTER INCR = '+currentQuestion+', The index value = '+index+' Image name = '+responseImages[currentQuestion]+', Correct Answer = '+questionChoices[currentQuestion][index]);
           /************************************************************************* */
        //console.log("queueNextQuestion: Current Question AFTER Increment = "+currentQuestion);

        //setInterval until next question revealed, call updateGameScreen
        nextQuestionStopwatch.start();

        //Pause stopwatch, It will be reset before new question is displayed in updateGameScreen
        //9/14/2018:stopwatch.reset();
        stopwatch.stop();
        }
        else
        {
            /*
            //CALL queue Restart Screen
            //Reset state to Start
            setState(states.START);

            //Reset responseButtonValue
            responseButtonValue = -1;

            //Increment currentQuestion
            currentQuestion = 0;

            //setInterval until next question revealed
            nextQuestionIntervalId = setInterval(updateGameScreen, 1000 * nextQuestionTime);*/
        }
        
    }
      //Helper method to update all dynamic output content
      function displayDynamicOutput(outputElement, value){
        var $outputElement = $('#'+outputElement);
        console.log($outputElement);
        $outputElement.text(value);
    }

    /*function hideQuestionGameScreen(){
        $questionGameScreen.hide();
        console.log("I am hiding the QuestionGameScreen");
    }*/
    function resetResponseBtnValue(){
        //reset ReponseButtonValue
        responseButtonValue = -1;
    }
    function hideAllGameScreens(){
        $allGameScreens.hide();
        console.log("I am hiding the allGameScreens");
        console.log($allGameScreens);
    }
    function startStopWatch(){
        //Push game state into RESPONSE when timeout reached
                /************
                //Start  stopwatch
                **************/
               stopwatch.start();

               //Set Timout for 5 seconds
               //NOTE: Save a ref to the responseIntervalId, so we can clear it in timeout (setTimeOut takes the function name only)
               //responseIntervalId = setTimeout(timeOut, 1000 * stopwatch.timeLimit);

               //Start Response stop Watch
               responseStopwatch.start();
    }
    function timeOut(){
       // Check if a button has already been clicked before showing Times Up Message
           if(responseButtonValue == -1)
           {
            /*$('#responseEvaluationOutput').text(responseEvaluation[2]);*/
            displayDynamicOutput('responseEvaluationOutput', responseEvaluation[2]);

            //Stop the Timer
            stopwatch.stop();
            console.log("TIMEOUT: Times Up Time stopped");

            //Set the HTML Response Elements
            setResponses();
            
            //show responseGameScreen
            //$responseGameScreen.show();

            /*********************************
             * HIDE MUST BE CALLED B4 DISPLAY
             *********************************/
            //Hide all the elements on the screen, before calling display
            hideAllGameScreens();
            
            //Call display after responseEvaluation element has been set
            /*displayResponseGameScreen();*/
            $responseGameScreen.show();

            //Stop response Stop Watch
            responseStopwatch.stop();

            //Queue Next Question
            queueNextQuestion();
           }
           //If button has been clicked clear reponseTimeout
           /*else{
               clearInterval(responseIntervalId);
           }*/
           
       // }
    }
    function updateGameScreen(){
        //Switch Statement
        switch(state) {
            case states.START:
               // hideQuestionGameScreen();
                displayStartGameScreen();
            break;
            case states.QUESTION:
                /*hideStartGameScreen();*/
                hideAllGameScreens();

                //remove the previous Image, before displaying a new question
                removeImage();

                //reset stop clock before new question is displayed
                stopwatch.reset();

                displayQuestionGameScreen();

                //start Counters
                startStopWatch();
                

                //Check for a change in state
                //8/12/2018: Causes and Infinite loop: updateGameScreen();

                
            break;
            case states.RESPONSE:
                hideAllGameScreens();

                //Remove sorce image

                displayResponseGameScreen();
                //inifinite loop: updateGameScreen();
            break;
            default:
        }
    }
    

    $("#startButton").on('click', function(){
        //Set state to question when startbutton clicked
        setState(states.QUESTION);
        console.log("In StartButton State = "+state);

        //Check for any updates in state
        updateGameScreen();

        
    });

    $(".choices").on('click', function(){
        /*state = states.QUESTION;*/
        responseButtonValue = this.value;
        console.log("Button Value = "+this.value);

        //If you make a selection, push the state to RESPONSE
        setState(states.RESPONSE);

        //Check for any updates in state
        updateGameScreen();
    });
    
    /*START EXECUTION*/
    console.log("At start of program STATE = "+state);
    hideAllGameScreens();
    updateGameScreen();
});