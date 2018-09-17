# TriviaGame
This repo is an interactive trivia game.  The goal of the game is to correctly answer as many questions about the Rick and Morty series as possible.  Each time a question is answered the player’s score increases.  However, each answer must be selected prior to the countdown clock reaching 0.  The game displays the following:
1. Countdown Clock
1. Questions
1. Answer Choices
1. Number of Correct Answers
1. Number of Incorrect Answers
1. Number Unanswered
## Setup
In order to run the app, you will need to run the index.html file on a computer with a web browser and internet access.  After cloning the repository, you can edit the files in your IDE of choice.  The main files are:
1. index.html
1. assets/javascript/game.js
1. assets/css/style.css
## Game Play
After the app is started the display will show the start screen.  The player begins game play, by clicking the start button. Once a question is displayed, the player has 20 seconds to answer the question, or the question will be counted as unanswered.  Each question answered correctly will add a point to the player’s correct answers, while questions answered incorrectly will add a point to the player’s incorrect answers.  After the player’s answer has been evaluated, the game will display the correct answer.  Each time the correct answer is displayed, the game will also display an image and play audio from the Rick and Morty series that provides justification for the correct answer.  After answering 10 questions, the summary screen will display the number of correctly, incorrectly, and unanswered questions. The summary screen will also display a start over button, should the player choose to play the game again.

## Use
This repo is available for public non-commercial use only.
## Goal
The goal of this project was to create an interactive trivia game that is dynamically updated by JQuery.