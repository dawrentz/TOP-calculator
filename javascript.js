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

//functions==============

//update display
function updateDisplay(value) {
    display.textContent = value;
}

//round if too long. Return only whole num length then sub from 10 or 9 and use toFixed
//fix decimal assumption!!!!!!!!!!!!!!!!!!!!
function round(num) {
    let numString = num.toString();
    //negative with decimal (add 1 to length for decimal)
    if (numString[0] == "-" && numString.length > 10) {
        return num.toExponential(4);
    }




    //need to force to scientific notation
    //need trigger for <1 and whole number length over 9/10

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

//change display with button click, and extract displayValue
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

//add backspace mechanic
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

//add negation mechanic
const negativeBtn = document.querySelector("#negativeBtn");
negativeBtn.addEventListener("click", function() {
    
    if (currentDisplayVal == "Go to jail" || currentDisplayVal == 0) {
        //do nothing
    } else if (currentDisplayVal[0] !== "-") {
        updateDisplay("-" + currentDisplayVal);
    } else (updateDisplay(display.textContent.slice(1)))
    firstClick = false;

});

//add decimal ability
const decimalBtn = document.querySelector("#decimalBtn");
decimalBtn.addEventListener("click", function() {
    
    if (currentDisplayVal.includes(".")) {
        //do nothing
    } else if (currentDisplayVal.length < 9) {
        updateDisplay(currentDisplayVal + ".");
    }
    firstClick = false;
});

//add operators
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

//create excute (equals) mechanic
const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", function() {
    if (secondNum == undefined && operator == undefined &&
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

//add all clear
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

// let x = 143242432;
// x = 
// updateDisplay(x.toExponential(3));

// console.log(1.432e+8);