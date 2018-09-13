
$(document).ready(function() {
    //  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

  time: 0,
  timeLimit :5,
  isTimeOutReached : function(){
      var value = stopwatch.time === stopwatch.timeLimit;
      return value;
  },
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
    console.log("STOP HAS BEEN CLICKED!")
  },
  /*recordLap: function() {

    var converted = stopwatch.timeConverter(stopwatch.time);

    // DONE: Add the current lap and time to the "laps" div.
    $("#laps").append("<p>Lap " + stopwatch.lap + " : " + converted + "</p>");

    // DONE: Increment lap by 1. Remember, we can't use "this" here.
    stopwatch.lap++;
  },*/
  count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time++;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log("Converted = "+converted);

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
    var questions = [];

    //response variables
    var $responseGameScreen = $('#response');

    var responseEvaluation = ['Correct!', 'Incorrect.', 'Times Up!']
    var responseButtonValue = -1;
    /*******************************
     * Helper functions
     * *****************************/
    //Set game state
    function setState(newState){
        state = newState;
    }
    
     //Helper method to update all dynamic output content
     function displayDynamicOutput(outputElement, value){
        var $outputElement = $("#"+outputElement);
        console.log($outputElement);
        $outputElement.text(value);
    }

    //Update display based on state or button click
    function updateDisplays(){
    }
    
    //Helper method to update all dynamic output content
    function displayDynamicOutput(outputElement, value){
        var $outputElement = $("#"+outputElement);
        console.log($outputElement);
        $outputElement.text(value);
    }
    
    function displayStartGameScreen(){
       /* var $startButton = ('<h2>'+"Start"+'<h2>');
        $startButton.attr("id", "startButton")*/
        /*var $startButton = $('<input/>').attr({type:'button', name:'startButton', id:'startButton', value:'Start'});
        $('#start').append($startButton);*/
        /*$('#start').html("<img src='http://random-ize.com/coin-flip/us-quarter/us-quarter-front.jpg' />");*/
        
        $startGameScreen.show();
        console.log("I am displaying the StartGameScreen");
    }
    /*function hideStartGameScreen(){
        $startGameScreen.hide();
        console.log("I am hiding the StartGameScreen");
    }*/
    function displayQuestionGameScreen(){
        var choiceLength = 4;
        var $question = $('#questionMessageOutput');
        $question.text(questionMessage[currentQuestion]);
        
        /*console.log("Question = "+questionMessage[currentQuestion]);*/
        console.log("I am displaying the QuestionGameScreen");

        for (var i = 0; i < choiceLength; i++)
        {
            /*$choice = $('#choices'+i);
            $choice.text(questionChoices[currentQuestion][i]);*/
            displayDynamicOutput('choice'+i, questionChoices[currentQuestion][i]);
            console.log('Choices = '+questionChoices[currentQuestion][i]);
        }

        //show questionGameScreen
        $questionGameScreen.show();
    }
    function displayResponseGameScreen(){
        //Set Evaluation message
        if(responseButtonValue === questionAnswers[currentQuestion]){
            $('#responseEvaluationOutput').text(responseEvaluation[0]);
            stopwatch.stop();
        console.log("DisplayResponseGameScreen: Correct Answer Time stopped");
        }
        else if(responseButtonValue != questionAnswers[currentQuestion] && responseButtonValue > -1 ){
            $('#responseEvaluationOutput').text(responseEvaluation[1]);
            stopwatch.stop();
        console.log("DisplayResponseGameScreen: Incorrect Answer Time stopped");
        }
        else if(stopwatch.isTimeOutReached()){
            $('#responseEvaluationOutput').text(responseEvaluation[2]);
            stopwatch.stop();
        console.log("DisplayResponseGameScreen: Times Up Time stopped");
        }

        //show responseGameScreen
        $responseGameScreen.show();
    }
    /*function hideQuestionGameScreen(){
        $questionGameScreen.hide();
        console.log("I am hiding the QuestionGameScreen");
    }*/
    function hideAllGameScreens(){
        $allGameScreens.hide();
        console.log("I am hiding the allGameScreens");
        console.log($allGameScreens);
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
                displayQuestionGameScreen();

                //Push game state into RESPONSE when timeout reached
                //9/12/2018: setTimeout(setState(states.RESPONSE), 1000 * stopwatch.timeLimit);

                //Check for a change in state
                //8/12/2018: Causes and Infinite loop: updateGameScreen();
                /************
                //Start 
                **************/
                stopwatch.start();
            break;
            case states.RESPONSE:
                //9/12/2018: hideAllGameScreens();

                //9/12/2018: displayResponseGameScreen();
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
        responseButtonValue = this.Value
        console.log("Button Value = "+this.value);

        //If you make a selection, push the state to RESPONSE
        //9/12/2018:setState(states.RESPONSE);

        //Check for any updates in state
        //9/12/2018:updateGameScreen();

        //resetReponseButtonValue
        //9/12/2018:responseButtonValue = -1;

    });
    
    /*START EXECUTION*/
    console.log("At start of program STATE = "+state);
    hideAllGameScreens();
    updateGameScreen();
});