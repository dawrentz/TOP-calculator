//declare display and displayValue
const display = document.querySelector("#display");
let currentDisplayVal = display.textContent;

//===========================================================================//
//variables
//===========================================================================//
let firstNum;
let secondNum;
let operator;
let firstClick = true;
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

function equals(num1, num2, op) {
    let temp;
    //operators and special case
    if (op == "+") temp = +num1 + +num2;
    if (op == "-") temp = +num1 - +num2;
    if (op == "x") temp = +num1 * +num2;
    if (op == "÷" && secondNum == 0) {
        temp = "Go to jail";
    } else if (op == "÷") temp = +num1 / +num2;

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
    firstClick = true;

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

//capture current display's value on every click
document.querySelector("#keys").addEventListener("click", e => {
    //bug fix for special case
    if (display.textContent == "Go to jail") {
        currentDisplayVal = undefined;
    } 
    //track display internally
    else {currentDisplayVal = display.textContent;}

    //tester: returns internal values on each click
    console.log("new================");
    console.log("currentDisplayVal: " + currentDisplayVal);
    console.log("firstNum: " + firstNum);
    console.log("secondNum: " + secondNum);
    console.log("operator: " + operator);
    console.log("prevSecondNum: " + prevSecondNum);
    console.log("prevOperator: " + prevOperator);
    console.log("typeof currentDisplayVal: " + typeof currentDisplayVal);
});

//===========================================================================//
//change display with button click
const allValueBtns = document.querySelectorAll(".valueBtn");
allValueBtns.forEach(valueBtn => {
    
    valueBtn.addEventListener("click", function() {
        //after overwrite
        if (!firstClick) {
            if (currentDisplayVal == "0") {
                updateDisplay(valueBtn.textContent);
            } else if (currentDisplayVal.length < 9 && currentDisplayVal[0] != "-") { 
                updateDisplay(currentDisplayVal + valueBtn.textContent);
            } else if (currentDisplayVal.length < 10 && currentDisplayVal[0] == "-") { 
                updateDisplay(currentDisplayVal + valueBtn.textContent);
            }
        }

        //overwrite (only needs to over write in certain scenarios)
        if (firstClick) {
            updateDisplay(valueBtn.textContent);
            firstClick = false;
        }
    });
});

//===========================================================================//
//add backspace mechanic
const backSpaceBtn = document.querySelector("#backSpaceBtn");
backSpaceBtn.addEventListener("click", function() {

    //lots of unrelated scenarios to respond to    
    if (currentDisplayVal == "0") {
        return; // do nothing
    } else if (currentDisplayVal.length == 1) {
        updateDisplay("0");
    } else if (currentDisplayVal[0] == "-" && currentDisplayVal.length == 2) {
        updateDisplay("0");
    } else if (currentDisplayVal == "-0.") {
        updateDisplay("0");
    } else {
        updateDisplay(display.textContent.slice(0, -1));
    }
    firstClick = false; //remove overwrite ability after user commits to change
});

//===========================================================================//
//add negation mechanic
const negativeBtn = document.querySelector("#negativeBtn");
negativeBtn.addEventListener("click", function() {
    
    if (currentDisplayVal == "Go to jail" || currentDisplayVal == 0) {
        return; // do nothing
    } else if (currentDisplayVal[0] !== "-") {
        updateDisplay("-" + currentDisplayVal);
    } else (updateDisplay(display.textContent.slice(1)))
    firstClick = false; //remove overwrite ability after user commits to change
});

//===========================================================================//
//add decimal ability
const decimalBtn = document.querySelector("#decimalBtn");
decimalBtn.addEventListener("click", function() {
    
    if (currentDisplayVal.includes(".")) {
        return; // do nothing
    } 
    //bug? example: allows "22222222."" but not "-22222222." Same difference.
    else if (currentDisplayVal.length < 9) {
        updateDisplay(currentDisplayVal + ".");
    }
    firstClick = false; //remove overwrite ability after user commits to change
});

//===========================================================================//
//add operators
const allOperatorBtns = document.querySelectorAll("#operators button");
allOperatorBtns.forEach(operatorBtn => {
    
    //extracts textContent for equals() to look at
    operatorBtn.addEventListener("click", function() {
        //scenario 0: special case
        if (display.textContent == "Go to jail") {
            return; // do nothing
        } 
        //scenario 1: fresh start. No firstNum yet
        else if (operator == undefined) {
            firstNum = currentDisplayVal;
            operator = operatorBtn.textContent;
            firstClick = true; //allow overwrite on next click
        } 
        //scenario 2: user needs to change selected operator mid use. firstNum is set and no overwrite must have been done. 
        else if (operator !== undefined && firstClick) {
            operator = operatorBtn.textContent;
            //firstClick is still true and unchanged here
        } 
        //scenario 3: user wants to use the selected operator on the answer of the first equation. Runs equals and sets up scenario 2.
        else if (operator !== undefined && !firstClick) {
            secondNum = currentDisplayVal;
            equals(firstNum, secondNum, operator);
            operator = operatorBtn.textContent;
            firstClick = true; //allow overwrite on next click
        } 
    });
})

//===========================================================================//
//create execute (equals) mechanic
const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", function() {
    //scenario 0: bug fix
    if (firstNum == undefined) {
        return; // do nothing
    }
    //scenario 1: allows user to reuse their selected secondNum and operator on their previous answer. (Common calculator mechanic. Ex: 5 + 2 + 2 + 2 + 2...) 
    //presence of preSecondNum and preOperator flags that user wants scenario 1
    else if (secondNum == undefined && operator == undefined &&
        prevSecondNum !== undefined && prevOperator !== undefined &&
        firstClick) {
            secondNum = prevSecondNum;
            operator = prevOperator;
            equals(firstNum, secondNum, operator);
        } 
        //scenario 2: normal scenario. User has selected a new secondNum and/or operator
        else {
          secondNum = currentDisplayVal;
          equals(firstNum, secondNum, operator);
        }
});

//===========================================================================//
//add all clear
const allClearBtn = document.querySelector("#allClearBtn");

//resets everything, save powerOn
function allClear() {
    updateDisplay(0);
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    firstClick = true;
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

        //all clicks = nothing
        document.querySelector("#keys").addEventListener("click", noInput);

    } else if (!powerOn) {
        document.querySelector("#keys").removeEventListener("click", noInput);
        powerOn = true;
        allClear();
    }
});


//===========================================================================//
//keyboard implementation

//put functions seperate then assign in eventlisteners, may help with keyboard
document.addEventListener("keydown", (event) => {
    console.log(event.key);

});
