let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let results = document.getElementById('results');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');
    
    if (!answer.value && !attempt.value) {
        setHiddenFields();
    }

    if (validateInput(input.value)) {
        attempt.value++;
    }
    else {
        return false;
    }

    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }
    else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }
    else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    let randomNumber = Math.floor(Math.random() * 10000).toString();

    answer.value = setPadLeft(randomNumber, 4);
    attempt.value = "0";
}

function setPadLeft(number, finalLength) {
    while (number.length < finalLength) {
        number = "0" + number;
    }

    return number;
}

function setMessage(stringMessage) {
    message.innerHTML = stringMessage;
}

function validateInput(input) {
    if (input.length == 4) {
        return true
    }

    setMessage("Guesses must be exactly 4 characters long.");

    return false;
}

function getResults(input) {
    let guessed = 0;
    let correctPosition = '<span class="glyphicon glyphicon-ok"></span>';
    let notRightPosition = '<span class="glyphicon glyphicon-transfer"></span>';
    let wrongNumber = '<span class="glyphicon glyphicon-remove"></span>';
    let resultsHTML = '';

    for (var index = 0; index < input.length; index++) {
        if (input[index] == answer.value[index]) {
            resultsHTML += correctPosition;
            guessed++;
        }
        else if (answer.value.includes(input[index])) {
            resultsHTML += notRightPosition;
        }
        else {
            resultsHTML += wrongNumber;
        }
    }

    results.innerHTML += `<div class="row">
                            <span class="col-md-6">${input}</span>
                            <div class="col-md-6">${resultsHTML}</div>
                        </div>`;

    return guessed == input.length;
}

function showAnswer(won) {
    code.innerHTML = answer.value;

    if (won) {
        code.className += " success";
    }
    else {
        code.className += " failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}