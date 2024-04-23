//put functions seperate then asssing in eventlisteners, may help with keyboard

//declare display and displayValue
const display = document.querySelector("#display");
let currentDisplayVal = display.textContent;

//variables
let firstNum;
let secondNum;
let operator;
let firstClick = true;
let powerOn = true;
let prevSecondNum;
let prevOperator;

//functions==========================

//update display
function updateDisplay(value) {
    display.textContent = value;
}

//round if too long. Return only whole num length then sub from 10 or 9 and use toFixed
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
    if (op == "+") temp = +num1 + +num2;
    if (op == "-") temp = +num1 - +num2;
    if (op == "x") temp = +num1 * +num2;
    if (op == "÷" && secondNum == 0) {
        temp = "Go to jail";
    } else if (op == "÷") temp = +num1 / +num2;

    prevSecondNum = secondNum;
    prevOperator = operator; 

    if (temp !== "Go to jail") {
        updateDisplay(round(temp));
    } else updateDisplay(temp);

    firstNum = display.textContent;
    secondNum = undefined;
    operator = undefined;
    firstClick = true;

    if (temp == "Go to jail") {        
        firstNum = undefined;
        prevSecondNum = undefined;
        prevOperator = undefined; 
    }
}

//capture current display's value on every click
document.querySelector("#keys").addEventListener("click", e => {
    if (display.textContent == "Go to jail") {
        currentDisplayVal = undefined;
    } else {currentDisplayVal = display.textContent;}

    //add tester
    console.log("new================");
    console.log("currentDisplayVal: " + currentDisplayVal);
    console.log("firstNum: " + firstNum);
    console.log("secondNum: " + secondNum);
    console.log("operator: " + operator);
    console.log("prevSecondNum: " + prevSecondNum);
    console.log("prevOperator: " + prevOperator);
    console.log("typeof currentDisplayVal: " + typeof currentDisplayVal);
});

//change display with button click, and extract displayValue==================
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
            console.log("not first!!!"); //test
        }

        //overwrite
        if (firstClick) {
            updateDisplay(valueBtn.textContent);
            firstClick = false;
            console.log("first!!!"); //test
        }
    });
});

//add backspace mechanic===========================
const backSpaceBtn = document.querySelector("#backSpaceBtn");
backSpaceBtn.addEventListener("click", function() {
    
    if (currentDisplayVal == "0") {
        //do nothing
    } else if (currentDisplayVal.length == 1) {
        updateDisplay("0");
    } else if (currentDisplayVal[0] == "-" && currentDisplayVal.length == 2) {
        updateDisplay("0");
    } else if (currentDisplayVal == "-0.") {
        updateDisplay("0");
    } else {
        updateDisplay(display.textContent.slice(0, -1));
    }
    firstClick = false;
});

//add negation mechanic========================
const negativeBtn = document.querySelector("#negativeBtn");
negativeBtn.addEventListener("click", function() {
    
    if (currentDisplayVal == "Go to jail" || currentDisplayVal == 0) {
        //do nothing
    } else if (currentDisplayVal[0] !== "-") {
        updateDisplay("-" + currentDisplayVal);
    } else (updateDisplay(display.textContent.slice(1)))
    firstClick = false;

});

//add decimal ability======================
const decimalBtn = document.querySelector("#decimalBtn");
decimalBtn.addEventListener("click", function() {
    
    if (currentDisplayVal.includes(".")) {
        //do nothing
    } else if (currentDisplayVal.length < 9) {
        updateDisplay(currentDisplayVal + ".");
    }
    firstClick = false;
});

//add operators=======================================
const allOperatorBtns = document.querySelectorAll("#operators button");
allOperatorBtns.forEach(operatorBtn => {
    
    operatorBtn.addEventListener("click", function() {
        if (display.textContent == "Go to jail") {
            //do nothing
        } else if (operator == undefined) {
            firstNum = currentDisplayVal;
            operator = operatorBtn.textContent;
            firstClick = true;
        } else if (operator !== undefined &&  firstClick) {
            operator = operatorBtn.textContent;
        } else if (operator !== undefined && !firstClick) {
            secondNum = currentDisplayVal;
            equals(firstNum, secondNum, operator);
            operator = operatorBtn.textContent;
            firstClick = true;
        } 
    });
})

//create excute (equals) mechanic=============================
const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", function() {
    if (firstNum == undefined) {
        // do nothing
        return;
    }
    else if (secondNum == undefined && operator == undefined &&
        prevSecondNum !== undefined && prevOperator !== undefined &&
        firstClick) {
            secondNum = prevSecondNum;
            operator = prevOperator;
            equals(firstNum, secondNum, operator);
        } else {
          secondNum = currentDisplayVal;
          equals(firstNum, secondNum, operator);
        }
});

//add all clear=================================
const allClearBtn = document.querySelector("#allClearBtn");
allClearBtn.addEventListener("click", function() {
    
    updateDisplay(0);
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    firstClick = true;
    prevSecondNum = undefined;
    prevOperator = undefined;
})

//add power button
const powerBtn = document.querySelector("#powerBtn");

function noInput() {
    updateDisplay("");
}

powerBtn.addEventListener("click", function() {
    if (powerOn) {
        powerOn = false;
        updateDisplay("");

        document.querySelector("#keys").addEventListener("click", noInput);

    } else if (!powerOn) {
        document.querySelector("#keys").removeEventListener("click", noInput);
        powerOn = true;
        updateDisplay(0);
        firstNum = undefined;
        secondNum = undefined;
        operator = undefined;
        firstClick = true;
        prevSecondNum = undefined;
        prevOperator = undefined;
    }
});

document.addEventListener("keydown", (event) => {
    console.log(event.key);

});
