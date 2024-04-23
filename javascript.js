//declare display and displayValue
const display = document.querySelector("#display");
let currentDisplayVal = display.textContent;

//===========================================================================//
//variables
//===========================================================================//
let firstNum;
let secondNum;
let operator;
let overwriteable = true;
let powerOn = true;
let prevSecondNum;
let prevOperator;

//===========================================================================//
//functions
//===========================================================================//

//update display
function updateDisplay(value) {
    display.textContent = value;
}

//===========================================================================//
//round if too long for display
function round(num) {
    //bug fix for when num is in sci notation
    if (num.toString().includes("e")) {
        return num.toExponential(2);
    }

    //declarations
    let absNum = Math.abs(num); //use abs value to save on redunancy on negative numbers

    function countChar(value) {
        return value.toString().length;
    }

    //logic
    if (countChar(absNum) > 9) { 
        let leftAndRight = absNum.toString().split(".");
        let [wholeNum, decNum] = leftAndRight;     

        //big number only needs sci notation
        if (countChar(wholeNum) > 9) {
            return num.toExponential(2);
        }
        else if (decNum > 0.0000001 && wholeNum != 0 && decNum != 0) {
            return Math.round(num);
        }
        //middle numbers need all whole numbers and rounded decimals to a variable length
        else if (decNum > 0.0000001) {
            let roundTo = 9 - countChar(wholeNum) - 1; //gets max decimal length. -1 for decimal point itself
            
            return num.toFixed(roundTo);
        }

        //small number only needs sci notation
        if (absNum < 0.0000001) {
            return num.toExponential(2);
        }
    } 
    //if absNum length not over 9, just return num
    else return num;
}

//===========================================================================//
function equals(num1, num2, op) {
    let temp;
    //bug fix from keyboard implementation
    if (op == "÷") { op = "/";}
    if (op == "x") { op = "*";}


    //operators and special case
    if (op == "+") temp = +num1 + +num2;
    if (op == "-") temp = +num1 - +num2;
    if (op == "*") temp = +num1 * +num2;
    if (op == "/" && secondNum == 0) {
        temp = "Go to jail";
    } else if (op == "/") temp = +num1 / +num2;

    //store calculation in memory just in case needed later
    prevSecondNum = secondNum;
    prevOperator = operator; 

    //if not the special case, run all answers through round() and update display with answer
    if (temp !== "Go to jail") {
        updateDisplay(round(temp));
    } else updateDisplay(temp);

    //update/reset values
    firstNum = display.textContent;
    secondNum = undefined;
    operator = undefined;
    overwriteable = true;

    //reset all values if special case
    if (temp == "Go to jail") {        
        firstNum = undefined;
        prevSecondNum = undefined;
        prevOperator = undefined; 
    }
}

//===========================================================================//
//eventListeners
//===========================================================================//

//capture current display's value on every event
function updater() {
        //bug fix for special case
        if (display.textContent == "Go to jail") {
            currentDisplayVal = undefined;
        } 
        //track display internally
        else {currentDisplayVal = display.textContent;}
    
        // tester: returns internal values on each event
        console.log("new================");
        console.log("currentDisplayVal: " + currentDisplayVal);
        console.log("firstNum: " + firstNum);
        console.log("secondNum: " + secondNum);
        console.log("operator: " + operator);
        console.log("prevSecondNum: " + prevSecondNum);
        console.log("prevOperator: " + prevOperator);
        console.log("typeof currentDisplayVal: " + typeof currentDisplayVal);
}

document.querySelector("#keys").addEventListener("click", updater);


//===========================================================================//
const allValueBtns = document.querySelectorAll(".valueBtn");

//change display with button event
function valueToDisplay(e) {
    let value;
    //determine type of event and extract value accordingly
    if (e.type == "click") {
        value =  e.target.textContent;
    } else if (e.type == "keydown") {
        value =  e.key;
    }

    //after an overwrite. Max lengths diff for pos/neg
    if (!overwriteable) {
        if (currentDisplayVal == "0") {
            updateDisplay(value);
        } else if (currentDisplayVal.length < 9 && currentDisplayVal[0] != "-") { 
            updateDisplay(currentDisplayVal + value); //string concat
        } else if (currentDisplayVal.length < 10 && currentDisplayVal[0] == "-") { 
            updateDisplay(currentDisplayVal + value); //string concat
        }
    }

    //only needs to overwrite in certain scenarios
    if (overwriteable) {
        updateDisplay(value);
        overwriteable = false;
    }
}

allValueBtns.forEach(valueBtn => {    
    valueBtn.addEventListener("click", valueToDisplay);
});

//===========================================================================//
//add backspace mechanic
const backSpaceBtn = document.querySelector("#backSpaceBtn");

function backspacer() {
    //lots of unrelated scenarios to respond to    
    //scenario 0: special case, positive single digit interger, sci notation, or zero
    if (display.textContent == "Go to jail" || 
        currentDisplayVal.length == 1 ||
        currentDisplayVal.includes("e")) {
        updateDisplay("0");
    } 
    //scenario 1: negative single digit interger. Avoids having only "-" in the display. 
    else if (currentDisplayVal[0] == "-" && currentDisplayVal.length == 2) {
        updateDisplay("0");
    } 
    //scenario 2: Avoids having only "-0" in the display.
    else if (currentDisplayVal == "-0.") {
        updateDisplay("0");
    } 
    //scenario 3: everything else gets the end chopped off
    else {
        updateDisplay(display.textContent.slice(0, -1));
    }

    overwriteable = false; //remove overwrite ability after user commits to change
}

backSpaceBtn.addEventListener("click", backspacer);

//===========================================================================//
//add negation mechanic
const negativeBtn = document.querySelector("#negativeBtn");

function negator() {    
    //scenario 0: special case or zero. Avoids "-0" in display
    if (display.textContent == "Go to jail" || currentDisplayVal == 0) {
        return; // do nothing
    } 
    //scenario 1: number is not negative. Append "-" to front
    else if (currentDisplayVal[0] !== "-") {
        updateDisplay("-" + currentDisplayVal);
    } 
    //scenario 2: number is negative. Chop off first char
    else (updateDisplay(display.textContent.slice(1)))
    
    overwriteable = false; //remove overwrite ability after user commits to change
}

negativeBtn.addEventListener("click", negator);

//===========================================================================//
//add decimal ability
const decimalBtn = document.querySelector("#decimalBtn");

function addDecimal() {    
    if (currentDisplayVal.includes(".")) {
        return; // do nothing
    } 
    //bug? example: allows "22222222."" but not "-22222222." Same difference.
    else if (currentDisplayVal.length < 9) {
        updateDisplay(currentDisplayVal + ".");
    }

    overwriteable = false; //remove overwrite ability after user commits to change
}

decimalBtn.addEventListener("click", addDecimal);

//===========================================================================//
//add operators
const allOperatorBtns = document.querySelectorAll("#operators button");

function operatorChoose(e) {
    let value;
    //determine type of event and extract value accordingly
    if (e.type == "click") {
        value =  e.target.textContent;
    } else if (e.type == "keydown") {
        value =  e.key;
    }
    
    //scenario 0: special case
    if (display.textContent == "Go to jail") {
        return; // do nothing
    } 
    //scenario 1: fresh start. No firstNum yet
    else if (operator == undefined) {
        firstNum = currentDisplayVal;
        operator = value;
        overwriteable = true; //allow overwrite on next event
    } 
    //scenario 2: user needs to change selected operator mid use. firstNum is set and no overwrite must have been done. 
    else if (operator !== undefined && overwriteable) {
        operator = value;
        //overwriteable is still true and unchanged here
    } 
    //scenario 3: user wants to use the selected operator on the answer of the first equation. Runs equals and sets up scenario 2.
    else if (operator !== undefined && !overwriteable) {
        secondNum = currentDisplayVal;
        equals(firstNum, secondNum, operator);
        operator = value;
        overwriteable = true; //allow overwrite on next event
    } 
}

allOperatorBtns.forEach(operatorBtn => {    
    operatorBtn.addEventListener("click", operatorChoose);
})

//===========================================================================//
//create execute (equals) mechanic
const equalsBtn = document.querySelector("#equalsBtn");

function equator() {
    //scenario 0: bug fix
    if (firstNum == undefined) {
        return; // do nothing
    }
    //scenario 1: allows user to reuse their selected secondNum and operator on their previous answer. (Common calculator mechanic. Ex: 5 + 2 + 2 + 2 + 2...) 
    //presence of preSecondNum and preOperator flags that user wants scenario 1
    else if (secondNum == undefined && operator == undefined &&
        prevSecondNum !== undefined && prevOperator !== undefined &&
        overwriteable) {
            secondNum = prevSecondNum;
            operator = prevOperator;
            equals(firstNum, secondNum, operator);
        } 
        //scenario 2: normal scenario. User has selected a new secondNum and/or operator
        else {
          secondNum = currentDisplayVal;
          equals(firstNum, secondNum, operator);
        }
}

equalsBtn.addEventListener("click", equator);

//===========================================================================//
//add all clear
const allClearBtn = document.querySelector("#allClearBtn");

//resets everything, save powerOn
function allClear() {
    updateDisplay(0);
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    overwriteable = true;
    prevSecondNum = undefined;
    prevOperator = undefined;
}

allClearBtn.addEventListener("click", allClear);

//===========================================================================//
//add power button
const powerBtn = document.querySelector("#powerBtn");

function noInput() {
    updateDisplay("");
}

powerBtn.addEventListener("click", function() {
    if (powerOn) {
        powerOn = false;
        noInput();
        //all events = nothing
        document.querySelector("#keys").addEventListener("click", noInput);

    } else if (!powerOn) {
        document.querySelector("#keys").removeEventListener("click", noInput);
        powerOn = true;
        allClear();
    }
});

//===========================================================================//
//keyboard implementation

document.addEventListener("keydown", event => {
    if (event.key >= 0 && event.key <= 9) {valueToDisplay(event)};
    if (event.key == "Backspace") {backspacer()};
    // if (event.key == "-") {negator()}; //interferes with subtraction
    if (event.key == ".") {addDecimal()};

    if (event.key == "+" || event.key == "-" ||
        event.key == "x" || event.key == "*" || 
        event.key == "/") {
            operatorChoose(event)
        };

    if (event.key == "Enter") {equator();}
    if (event.key == "Delete") {allClear();}

    updater();
});

//bug fix: "Enter" repeats last click command
let allButtons = document.querySelectorAll("button");

allButtons.forEach(button => {
    button.addEventListener("click", function() {
        this.blur();
    });
});