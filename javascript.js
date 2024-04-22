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
let prevSecondNum;
let prevOperator;

//functions
//return whole num length to sub from 10 or 9 and use toFixed
function round(num) {
    let numString = num.toString();
    if (numString.length > 9 && numString[0] !== "-") {
        let wholeNumLength = Math.round(num).toString().length;
        //add one for decimal
        return num.toFixed(9 - wholeNumLength -1);
    } else if (numString.length > 10 && numString[0] == "-") {
        let wholeNumLength = Math.round(num).toString().length;
        //add one for decimal
        return num.toFixed(10 - wholeNumLength -1);
    } else return num;
}

function equals(num1, num2, op) {
    let temp;
    if (op == "+") temp = +num1 + +num2;
    if (op == "-") temp = +num1 - +num2;
    if (op == "x") temp = +num1 * +num2;
    if (op == "÷") temp = +num1 / +num2;
    // if (temp == "NaN") temp = "3rr0r";
    if (op == "÷" && secondNum == 0) temp = "Go to jail";
    prevSecondNum = secondNum;
    prevOperator = operator; 
    console.log(temp);


    if (
        // temp !== "3rr0r" && 
        temp !== "Go to jail" //&& 
        // temp !== "NaN"
    ) {
        display.textContent = round(temp);
    } else display.textContent = temp;

    firstNum = display.textContent;
    secondNum = undefined;
    operator = undefined;
    firstClick = true;

    if (temp = "Go to jail") {        
        firstNum = undefined;
        prevSecondNum = undefined;
        prevOperator = undefined; 
    }

    //needs rounding
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
    
    if (currentDisplayVal == "0" || currentDisplayVal == "NaN" ||
    currentDisplayVal == "3rr0r" || currentDisplayVal == "Go to jail") {
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
    } else if (currentDisplayVal.length < 9) {
        display.textContent = currentDisplayVal + ".";
    }
    firstClick = false;
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

//add a keep old values button, run with those if not currnet defined 


//add all clear
const allClearBtn = document.querySelector("#allClearBtn");
allClearBtn.addEventListener("click", function() {
    
    display.textContent = 0;
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
    display.textContent = "";
}

powerBtn.addEventListener("click", function() {
    if (powerOn) {
        powerOn = false;
        display.textContent = "";

        document.querySelector("#keys").addEventListener("click", noInput);

    } else if (!powerOn) {
        document.querySelector("#keys").removeEventListener("click", noInput);
        powerOn = true;
        display.textContent = 0;
        firstNum = undefined;
        secondNum = undefined;
        operator = undefined;
        firstClick = true;
    }
});



// let x = -123456.654321;
// display.textContent = round(x);
// console.log(round(x));

// console.log("length: " + x.toString().length);
// console.log(round(x));

// let x = "Go to jail";
// let y = 4;
// let z = +x + +y;

// console.log(z);
// console.log(typeof +x);
// console.log(typeof +y);
// console.log(typeof z);


