// authenticate as admin to divide by zero
// 5+5 = 55 for input
// power button just changes text color to background, or opacity





//assign buttons
// const acBtn = document.querySelector("#acBtn");
// const powerBtn = document.querySelector("#powerBtn");
// const oneBtn = document.querySelector("#oneBtn");
// const twoBtn = document.querySelector("#twoBtn");
// const threeBtn = document.querySelector("#threeBtn");
// const fourBtn = document.querySelector("#fourBtn");
// const fiveBtn = document.querySelector("#fiveBtn");
// const sixBtn = document.querySelector("#sixBtn");
// const sevenBtn = document.querySelector("#sevenBtn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");
// const Btn = document.querySelector("#Btn");


// declare display and displayValue
let display = document.querySelector("#display");
let currentDisplayValue = display.textContent;
// console.log(displayValue);

// add update displayValue function
function updateDV() {
    currentDisplayValue = display.textContent;  
}
// see currentDisplayValue click anywhere TESTER
document.querySelector("body").addEventListener("click", e => console.log(currentDisplayValue));



// change display with button click, and extract displayValue
const allBtns = document.querySelectorAll(".valueBtn");
allBtns.forEach(button => {
    button.addEventListener("click", function() {
        if(currentDisplayValue == 0) {
            display.textContent = button.textContent;
            updateDV();
        } else if (currentDisplayValue.length < 9) {
                display.textContent = currentDisplayValue + button.textContent;
                updateDV();
        }
    });
});

// add backspace mechanic
const backSpaceBtn = document.querySelector("#backSpaceBtn");
backSpaceBtn.addEventListener("click", function() {
    if(currentDisplayValue == 0) {
        // do nothing
    } else if(currentDisplayValue.length == 1) {
        display.textContent = 0;
        updateDV();    
    } else {
        display.textContent = display.textContent.slice(0, -1);
        
        updateDV();  
    }
});

