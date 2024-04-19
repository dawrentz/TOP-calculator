//authenticate as admin to divide by zero, go to jail
//power button just changes text color to background, or opacity
//it returns -0.0

//declare display and displayValue
const display = document.querySelector("#display");
let currentDisplayValue = display.textContent;

//variables
let firstNum;
let secondNum;
let operator;
let firstClick = true;

//capture current display's value on every click
document.querySelector("#keys").addEventListener("click", e => {
    currentDisplayValue = display.textContent;

    //add tester
    console.log("new=========================");
    console.log("currentDisplayValue: " + currentDisplayValue);
    console.log("firstNum: " + firstNum);
    console.log("secondNum: " + secondNum);
    console.log("operator: " + operator);
    });

//change display with button click, and extract displayValue
const allValueBtns = document.querySelectorAll(".valueBtn");
allValueBtns.forEach(valueButton => {
    valueButton.addEventListener("click", function() {
        //after overwrite
        if (!firstClick) {
            if (currentDisplayValue == "0") {
                display.textContent = valueButton.textContent;
            } else if (currentDisplayValue.length < 9 && currentDisplayValue[0] != "-") { 
                    display.textContent = currentDisplayValue + valueButton.textContent;
            } else if (currentDisplayValue.length < 10 && currentDisplayValue[0] == "-") { 
                display.textContent = currentDisplayValue + valueButton.textContent;
            }
            console.log("not first!!!"); //test
        }

        //overwrite
        if (firstClick) {
            display.textContent = valueButton.textContent;
            firstClick = false;
            console.log("first!!!"); //test
        }
    });
});

//add backspace mechanic
const backSpaceBtn = document.querySelector("#backSpaceBtn");
backSpaceBtn.addEventListener("click", function() {
    if (currentDisplayValue == "0") {
        //do nothing
    } else if (currentDisplayValue.length == 1) {
        display.textContent = "0";
    } else if (currentDisplayValue[0] = "-" && currentDisplayValue.length == 2) {
        display.textContent = "0";
    } else if (currentDisplayValue == "-0.") {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
});

//add negation mechanic
const negativeBtn = document.querySelector("#negativeBtn");
negativeBtn.addEventListener("click", function() {
    if (currentDisplayValue == "0") {
        //do nothing
    } else if (currentDisplayValue[0] !== "-") {
        display.textContent = "-" + currentDisplayValue;
    } else (display.textContent = display.textContent.slice(1))
});

//add decimal ability
const decimalBtn = document.querySelector("#decimalBtn");
decimalBtn.addEventListener("click", function() {
    if (currentDisplayValue.includes(".")) {
        //do nothing
    } else (display.textContent = currentDisplayValue + ".");
});

//add operators
const allOperatorBtns = document.querySelectorAll("#operators button");
allOperatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", function() {
        if (firstNum == undefined) {
            firstNum = currentDisplayValue;
            operator = operatorBtn.textContent;
        } else if (firstNum !== undefined && secondNum == undefined) {
            operator = operatorBtn.textContent;
        }
        firstClick = true;
        //if both numbers defined, run equals, and set firstNum to second and second to undef (and operator to that buttonOPerator)
        //need allow overwrite display after operator

    });
})

//create excute (equals) mechanic
const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", function() {
    if (operator == undefined) {
        //do nothing
    } else {
        secondNum = currentDisplayValue;
    }
    //need reset display after = if 

    
});

// let string = "hello!";
// console.log(string);
// string = string.slice(0,-1);
// console.log(string);