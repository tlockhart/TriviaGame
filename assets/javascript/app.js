/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
$(document).ready(() => {
  // *****************************************DATA********************
  //  Variable that will hold our setInterval that runs the stopwatch
  let intervalId;
  let responseIntervalId;
  let nextQuestionIntervalId;

  // Prevents the clock from being sped up unnecessarily
  let clockRunning = false;
  let responseClockRunning = false;
  let nextQuestionClockRunning = false;

  let nextQuestionStopwatch = {
    timeLimit: 10,
    stop() {
      // Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(nextQuestionIntervalId);
      nextQuestionClockRunning = false;
    },
    start() {
      if (!nextQuestionClockRunning) {
        nextQuestionIntervalId = setInterval(updateGameScreen,
          1000 * nextQuestionStopwatch.timeLimit);
        nextQuestionClockRunning = true;
      } // if
    },
  };

  let responseStopwatch = {
    timeLimit: 20,
    stop() {
      // Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(responseIntervalId);
      responseClockRunning = false;
    },
    start() {
      if (!responseClockRunning) {
        responseIntervalId = setInterval(timeOut, 1000 * responseStopwatch.timeLimit);
        responseClockRunning = true;
      }// if
    },
  };
  // Our stopwatch object
  let stopwatch = {
    time: responseStopwatch.timeLimit,
    reset() {
      stopwatch.time = responseStopwatch.timeLimit;

      // Change the "timer" div to "00:00."
      $('#timer').text(`00:${stopwatch.time}`);
    },
    start() {
      // Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
    },
    stop() {
      // Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count() {
      // increment time by 1, remember we cant use "this" here.
      stopwatch.time -= 1;
      /* Get the current time, pass that into the stopwatch.timeConverter function,
      and save the result in a variable. */
      let converted = stopwatch.timeConverter(stopwatch.time);

      // Use the variable we just created to show the converted time in the "timer" div.
      $('#timer').text(converted);
    },
    timeConverter(t) {
      let minutes = Math.floor(t / 60);
      let seconds = t - (minutes * 60);

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (minutes === 0) {
        minutes = '00';
      } else if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return `${minutes}:${seconds}`;
    },
  };
  // ***************************************************************
  // response variables
  let responseMessages = ['Correct!', 'Incorrect!', 'Out of Time!'];

  // question variables
  let questionMessage = ['What does Rick say he is driven to find?', 'What does Rick say is a weapon to scare off villagers during the purge?', 'What game does Morty play at Blips and Chitz?', "What was Jerry's job before being fired?", " What animal does Rick use for Morty's love potion", 'What does Rick say is the most valuable thing the Vindicators posses?', "What is the name of Morty Jr's book", 'What musical did the Sanchez family see in the false parasite memory?', 'Why does Rick call the fly soldiers robots?', 'What does Rick allow Morty to experience in the garage?'];

  let questionChoices = [
    ['Schwifty', 'The one armed man', 'The szechuan sauce', 'The replicators'],
    ['Tic Tacs', 'M&M', 'Gum', 'Crunch Bar'],
    ['Chazz', 'Galactic', 'Roy', 'Tony'],
    ['Marketing', 'Advertising agent', 'Artist', 'Telemarketer'],
    ['Orca', 'Vole', 'Mole', 'Alligator'],
    ['Morty', 'Crocubot', "Alan Rail's whistle", 'Noob Noob'],
    ['My Horrible Father', 'Tales of my Father', 'Alien Life', 'Father Morty'],
    ['Spider-man!', 'Cats', 'Hulk! The Musical', 'The Lion King'],
    ['So Morty will shoot them', "He doesn't respect them", 'They are Federation Scum', 'He thinks they are mindless'],
    ['Zero Gravity', 'Growth Machine', 'Science', 'True Level'],
  ];

  // QUESTION ANSWERS:
  let questionAnswers = [2, 0, 2, 1, 1, 3, 0, 2, 1, 3];

  // Response Variables
  let responseEvaluation = ['Correct!', 'Incorrect.', 'Times Up!'];
  let correctAnswerMsg = 'The correct answer is:';
  let responseImages = ['assets/images/szechuan.jpg', 'assets/images/tictacs.jpg', 'assets/images/roy.jpg', 'assets/images/advertising.jpg', 'assets/images/vole.jpg', 'assets/images/noobnoob.jpg', 'assets/images/horriblefather.jpg', 'assets/images/hulkmusical.jpg', 'assets/images/robots.jpg', 'assets/images/truelevel.jpg'];
  let responseAudio = ['assets/audio/szechuan.mp3', 'assets/audio/tictacs.mp3', 'assets/audio/roy.mp3', 'assets/audio/advertising.mp3', 'assets/audio/vole.mp3', 'assets/audio/noobnoob.mp3', 'assets/audio/horriblefather.mp3', 'assets/audio/hulkmusical.mp3', 'assets/audio/robots.mp3', 'assets/audio/truelevel.mp3'];

  // Summary Variables
  let summaryCorrectMessage = 'Correct Answers: ';
  let summaryIncorrectMessage = 'Incorrect Answers: ';
  let summaryUnansweredMessage = 'Unanswered: ';
  let summaryMessage = 'All done, here are your results!';
  // *****************************************************

  // Game States that effect the game variables
  let states = {
    INIT: 'init',
    START: 'start',
    QUESTION: 'question',
    RESPONSE: 'response', // user ran out of remainingGuesses
    SUMMARY: 'summary',
  };

  // set initial state
  let state = states.START;

  // Reset variables
  let currentQuestion = 0;
  let responseButtonValue = -1;

  // Summary Variables:
  let correctCtr = 0;
  let incorrectCtr = 0;
  let unansweredCtr = 0;

  // GameScreens
  let $startGameScreen = $('#start');
  let $questionGameScreen = $('#question');
  let $allGameScreens = $('.screen');
  let $responseGameScreen = $('#response');
  let $summaryGameScreen = $('#summary');


  // *******************************
  // * Helper functions
  // *******************************
  // Set game state
  function setState(newState) {
    state = newState;
  }
  // Update display based on state or button click
  function updateDisplays() {
  }

  function displayStartGameScreen() {
    $startGameScreen.show();
  }

  function displayQuestionGameScreen() {
    nextQuestionStopwatch.stop();

    let choiceLength = 4;
    displayDynamicOutput('questionMessageOutput', questionMessage[currentQuestion]);

    for (let i = 0; i < choiceLength; i += 1) {
      displayDynamicOutput(`choice${i}`, questionChoices[currentQuestion][i]);
    }

    // show questionGameScreen
    $questionGameScreen.show();
  }

  function displayImage(outputElement, value) {
    let $outputElement = $(`#${outputElement}`);
    $outputElement.attr('src', value);
  }

  function playAudio(value) {
    let audio = new Audio(value);
    audio.play();
  }

  function setResponses() {
    // Display the correct answer
    // ***************************
    displayDynamicOutput('responseMessageOutput', correctAnswerMsg);

    let index = parseInt(questionAnswers[currentQuestion], 10);

    // Display Generic Message
    displayDynamicOutput('responseAnswerOutput', questionChoices[currentQuestion][index]);

    // Display the  image
    displayImage('responseImage', responseImages[currentQuestion]);

    // Play Audio
    playAudio(responseAudio[currentQuestion]);
    // ***************************************
  }

  function removeImage() {
    displayImage('responseImage', '');
  }

  function removeTimer() {
    nextQuestionStopwatch.stop();
    // **************************
    $('#timer').hide();
  }
  function displayResponseGameScreen() {
    // Set Evaluation message
    if (responseButtonValue == questionAnswers[currentQuestion]) {
      displayDynamicOutput('responseEvaluationOutput', responseEvaluation[0]);

      // Stop the Timer
      stopwatch.stop();

      // increment correct question counter
      correctCtr += 1;

      // Stop stopwatch
      responseStopwatch.stop();

      // Set the HTML Response Elements
      setResponses();

      // show responseGameScreen
      $responseGameScreen.show();

      // **************************************
      // Queue Next Question
      queueNextQuestion();
      // **************************************
    } else if (responseButtonValue != questionAnswers[currentQuestion]
      && responseButtonValue > -1) {
      displayDynamicOutput('responseEvaluationOutput', responseEvaluation[1]);

      // Stop the Timer
      stopwatch.stop();

      // increment incorrect question counter
      incorrectCtr += 1;

      // Clear the Time Up Interal Immediately
      responseStopwatch.stop();

      // Set the HTML Response Elements
      setResponses();

      // show responseGameScreen
      $responseGameScreen.show();

      // **************************************
      // Queue Next Question
      queueNextQuestion();
      // **************************************
    }
  }
  function displaySummaryGameScreen() {
    // set summary message
    displayDynamicOutput('summaryMessageOutput', summaryMessage);

    // set summary correct message
    displayDynamicOutput('summaryTitleCorrectOutput', summaryCorrectMessage);

    // set summary incorrect message
    displayDynamicOutput('summaryTitleIncorrectOutput', summaryIncorrectMessage);

    // set summary incorrect message
    displayDynamicOutput('summaryTitleUnansweredOutput', summaryUnansweredMessage);

    // set correctCtr
    displayDynamicOutput('summaryNumCorrectOutput', correctCtr);

    // set incorrectCtr
    displayDynamicOutput('summaryNumIncorrectOutput', incorrectCtr);

    // set unansweredCtr
    displayDynamicOutput('summaryNumUnansweredOutput', unansweredCtr);

    // show summary GameScreen
    $summaryGameScreen.show();
  }
  function isCurrentQuestionLTAnswerLength() {
    returnValue = currentQuestion < questionAnswers.length - 1;
    return returnValue;
  }
  function queueNextQuestion() {
    nextQuestionStopwatch.start();
    if (isCurrentQuestionLTAnswerLength()) {
      // Reset state to Question
      setState(states.QUESTION);

      // Reset responseButtonValue
      responseButtonValue = -1;

      // Increment currentQuestion
      currentQuestion += 1;

      // Pause stopwatch, It will be reset before new question is displayed in updateGameScreen
      stopwatch.stop();
    } else {
      // Reset state to Summary
      setState(states.SUMMARY);

      // Reset responseButtonValue
      responseButtonValue = -1;

      // Reset currentQuestion
      currentQuestion = 0;

      // Pause stopwatch, It will be reset before new question is displayed in updateGameScreen
      stopwatch.stop();
    }
  }
  // Helper method to update all dynamic output content
  function displayDynamicOutput(outputElement, value) {
    let $outputElement = $(`#${outputElement}`);
    $outputElement.text(value);
  }

  function resetResponseBtnValue() {
    // reset ReponseButtonValue
    responseButtonValue = -1;
  }
  function hideAllGameScreens() {
    $allGameScreens.hide();
  }

  function startStopWatch() {
    // Push game state into RESPONSE when timeout reached
    // ****************
    // Start  stopwatch
    // ****************
    stopwatch.start();

    // Start Response stop Watch
    responseStopwatch.start();
  }
  function timeOut() {
    // Check if a button has already been clicked before showing Times Up Message
    if (responseButtonValue == -1) {
      displayDynamicOutput('responseEvaluationOutput', responseEvaluation[2]);

      // increment incorrect question counter
      unansweredCtr += 1;

      // Stop the Timer
      stopwatch.stop();

      // Set the HTML Response Elements
      setResponses();

      // *********************************
      // * HIDE MUST BE CALLED B4 DISPLAY
      // *********************************
      // Hide all the elements on the screen, before calling display
      hideAllGameScreens();

      // Call display after setResponses() called
      $responseGameScreen.show();

      // Stop response Stop Watch
      responseStopwatch.stop();

      // Queue Next Question
      queueNextQuestion();
    }
  }
  function updateGameScreen() {
    // Switch Statement
    switch (state) {
      case states.START:

        // Remove timer before displaying the startGameScreen multiple times
        removeTimer();

        // Hide all game screens before displaying the StartGameScreen multiple times
        hideAllGameScreens();

        // hideQuestionGameScreen();
        displayStartGameScreen();
        break;
      case states.QUESTION:
        hideAllGameScreens();

        // remove the previous Image, before displaying a new question
        removeImage();

        // reset stop clock before new question is displayed
        stopwatch.reset();

        displayQuestionGameScreen();

        // start Counters
        startStopWatch();

        break;
      case states.RESPONSE:
        hideAllGameScreens();
        displayResponseGameScreen();
        break;
      case states.SUMMARY:
        hideAllGameScreens();

        // Remove timer before displaying the startGameScreen multiple times
        removeTimer();
        displaySummaryGameScreen();

        break;
      default:
    }
  }


  $('#startButton').on('click', () => {
    // Show timer
    $('#timer').show();
    // Set state to question when startbutton clicked
    setState(states.QUESTION);

    // Check for any updates in state
    updateGameScreen();
  });

  $('.choices').on('click', function () {
    responseButtonValue = this.value;

    // If you make a selection, push the state to RESPONSE
    setState(states.RESPONSE);

    // Check for any updates in state
    updateGameScreen();
  });

  $('#startOverButton').on('click', () => {
    // Reset Counters
    correctCtr = 0;
    incorrectCtr = 0;
    unansweredCtr = 0;

    // CALL queue Restart Screen
    // Reset state to Start
    setState(states.START);

    // Reset responseButtonValue
    responseButtonValue = -1;

    // Reset currentQuestion
    currentQuestion = 0;

    // Check for any updates in state
    updateGameScreen();
  });

  // START EXECUTION
  hideAllGameScreens();
  updateGameScreen();
});
