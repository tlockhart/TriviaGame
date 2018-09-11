
$(document).ready(function() {

    //Create button with ID
    var $startButton = $('<h2>'+"Start"+'<h2>');
        $startButton.attr("id", "startButton");
        $('#start').append($startButton);

    //console output when clicked
    $("#startButton").on('click', function(){
        console.log("In StartButton");
    });
});