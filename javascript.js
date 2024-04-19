//power button just changes text color to background, or opacity
//want to continue last op when continue press equals

//declare display and displayValue
const display = document.querySelector("#display");
let currentDisplayVal = display.textContent;

//variables
let firstNum;
let secondNum;
let operator;
let firstClick = true;
let powerOn = true;

//functions
function equals(num1, num2, op) {
    if (op == "+") display.textContent = +num1 + +num2;
    if (op == "-") display.textContent = +num1 - +num2;
    if (op == "x") display.textContent = +num1 * +num2;
    if (op == "÷") display.textContent = +num1 / +num2;
    if (display.textContent == "NaN") display.textContent = "3rr0r";
    if (op == "÷" && secondNum == 0) display.textContent = "Go to jail";
    firstNum = display.textContent;
    secondNum = undefined;
    operator = undefined;
    firstClick = true;

    //needs rounding
}

//capture current display's value on every click
document.querySelector("#keys").addEventListener("click", e => {
    currentDisplayVal = display.textContent;

    //add tester
    console.log("new================");
    console.log("currentDisplayVal: " + currentDisplayVal);
    console.log("firstNum: " + firstNum);
    console.log("secondNum: " + secondNum);
    console.log("operator: " + operator);
});

//change display with button click, and extract displayValue
const allValueBtns = document.querySelectorAll(".valueBtn");
allValueBtns.forEach(valueBtn => {
    valueBtn.addEventListener("click", function() {
        //after overwrite
        if (!firstClick) {
            if (currentDisplayVal == "0") {
                display.textContent = valueBtn.textContent;
            } else if (currentDisplayVal.length < 9 && currentDisplayVal[0] != "-") { 
                    display.textContent = currentDisplayVal + valueBtn.textContent;
            } else if (currentDisplayVal.length < 10 && currentDisplayVal[0] == "-") { 
                display.textContent = currentDisplayVal + valueBtn.textContent;
            }
            console.log("not first!!!"); //test
        }

        //overwrite
        if (firstClick) {
            display.textContent = valueBtn.textContent;
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
        display.textContent = "0";
    } else if (currentDisplayVal[0] == "-" && currentDisplayVal.length == 2) {
        display.textContent = "0";
    } else if (currentDisplayVal == "-0.") {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
    firstClick = false;
});

//add negation mechanic
const negativeBtn = document.querySelector("#negativeBtn");
negativeBtn.addEventListener("click", function() {
    if (currentDisplayVal == "0") {
        //do nothing
    } else if (currentDisplayVal[0] !== "-") {
        display.textContent = "-" + currentDisplayVal;
    } else (display.textContent = display.textContent.slice(1))
    firstClick = false;

});

//add decimal ability
const decimalBtn = document.querySelector("#decimalBtn");
decimalBtn.addEventListener("click", function() {
    if (currentDisplayVal.includes(".")) {
        //do nothing
    } else (display.textContent = currentDisplayVal + ".");
});

//add operators
const allOperatorBtns = document.querySelectorAll("#operators button");
allOperatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", function() {
        if (operator == undefined) {
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
       
        //if both numbers defined, run equals, and set firstNum to second and second to undef (and operator to that buttonOPerator)

    });
})

//create excute (equals) mechanic
const equalsBtn = document.querySelector("#equalsBtn");
equalsBtn.addEventListener("click", function() {
          secondNum = currentDisplayVal;
        equals(firstNum, secondNum, operator);
});

//add all clear
const allClearBtn = document.querySelector("#allClearBtn");
allClearBtn.addEventListener("click", function() {
    display.textContent = 0;
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    firstClick = true;
})

//add power button
const powerBtn = document.querySelector("#powerBtn");
powerBtn.addEventListener("click", function() {
    // function noInput() {
    //     display.textContent = "";
    // }


    if (powerOn) {
        display.style.color = "lightgray";
        powerOn = false;
        display.textContent = "";

        // document.querySelector("#keys").addEventListener("click", noInput);

    } else if (!powerOn) {
        // document.querySelector("#keys").removeEventListener("click", noInput);

        display.style.color = "black";
        powerOn = true;
        display.textContent = 0;
        firstNum = undefined;
        secondNum = undefined;
        operator = undefined;
        firstClick = true;
    }
});

function noInput() {
        display.textContent = "";
    }

document.querySelector("#keys").addEventListener("click", noInput);

// document.querySelector("#keys").removeEventListener("click", noInput);


//need to add/remove event listener to power button

