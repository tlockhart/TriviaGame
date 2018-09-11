$(document).ready(function() {

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
        ["Finding the one armed man", "Getting schwifty", "Getting the szechuan sauce", "Finding the replicators"],
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

    var questionAnswers = [2, 0, 2, 1, 1, 3, 0, 2, 1, 3];
    var currentQuestion = 0;

    //question variables
    var questions = [];

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
    
    function displayStartGameScreen(){
       /* var $startButton = ('<h2>'+"Start"+'<h2>');
        $startButton.attr("id", "startButton")*/
        var $startButton = $('<input/>').attr({type:'button', name:'startButton', id:'startButton', value:'Start'});
        $('#start').append($startButton);
        /*$('#start').html("<img src='http://random-ize.com/coin-flip/us-quarter/us-quarter-front.jpg' />");*/
    }
    function displayQuestionGameScreen(){
        var $question = $("<h2>"+questionMessage[currentQuestion]+"</h2>");
        $('#questionMessageOutput').append($question);
        console.log("Question = "+questionMessage[currentQuestion]);
    }
    function updateGameScreen(){
        //Switch Statement
        switch(state) {
            case states.START:
                
                displayStartGameScreen();
            break;
            case states.QUESTION:
                displayQuestionGameScreen();
            break;
            default:
        }
    }
    

    $("#startButton").on('click', function(){
        state = states.QUESTION;
        console.log("In StartButton State = "+state);
        updateGameScreen();
    });
    
    /*START EXECUTION*/
    console.log("At start of program STATE = "+state);
    updateGameScreen();
});