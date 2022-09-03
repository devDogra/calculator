import {
    operate, 
} from "./utils.js"; 


const screen = document.querySelector(".screen-bottom>span"); 
const screenTop = document.querySelector(".screen-top>span"); 

const ACkey = document.querySelector("[AC-key]")
const OPkeys = document.querySelectorAll("[operation-key]")
const numKeys = document.querySelectorAll("[number-key]")
const equalsKey = document.querySelector("[equals-key]")
const flipKey = document.querySelector("[flip-sign-key]")
const delKey = document.querySelector("[DEL-key]")
const dotKey = document.querySelector("[decimal-key]")

let display = ""; 

// DEBUG
function status(key){
    console.log("PRESSING " + key.innerText + ",  DIS = " + display); 
}

// HELPERS
function updateScreen(){
    screen.innerText = display; 
}
function clearScreen(){
    screen.innerText = ""; 
}
function resetDisplay(){
    display = ""; 
}



function evaluateDisplay(){
    // Gets the capture groups (oprd1, op, oprd2) if they're there, otherwise returns a null for them
    function getOptionalGroups(myexpr) {
        let r = /(?<operand1>-?(\d*\.)?\d+)?(?<operator>[\/\+\*\-])?(?<operand2>(\d*\.)?\d+)?/;
        
        console.log(myexpr.match(r).groups);
        return myexpr.match(r).groups;
    }


    let {operand1: oprd1,  operator: op, operand2: oprd2} = getOptionalGroups(display); 

    if (display == ".") {
        display = 0;
        return; 
    }


    if (!oprd1 && !op && !oprd2){
        return; 
    } else if (oprd1 && !op && !oprd2){
        display = `${parseFloat(display)}`
        return; 
    } else if (oprd1 && op && !oprd2){
        display = oprd1;
        return;
    } else if (oprd1 && op && oprd2){
        display = operate(oprd1, op, oprd2); 
        return; 
    }

}

/// KEY PRESSES /// 

// OP KEY
OPkeys.forEach(opKey => {
    opKey.addEventListener("click", e => {
        if (display == "") return; 
        if (display.includes("Infinity") || display.includes("NaN")) return; 


        evaluateDisplay();
        if (!(display.includes("Infinity") || display.includes("NaN"))){
            display += opKey.innerText; 
        }
        updateScreen(); 
        status(opKey); 
    })
})

// NUM KEY
numKeys.forEach(numKey => {
    numKey.addEventListener("click", e => {
        
        if (display.includes("Infinity") || display.includes("NaN")) return; 

        display += numKey.innerText; 
        updateScreen();
        status(numKey); 
       
    })
})

// EQUALS KEY
equalsKey.addEventListener("click", e => {
    if (display.includes("Infinity") || display.includes("NaN")) return; 

    evaluateDisplay();
    updateScreen();
})

// AC
ACkey.addEventListener("click", e=>{
    resetDisplay(); 
    clearScreen(); 
})

// FLIP KEY
flipKey.addEventListener("click", e => {
    if (display == "") return;
    if (display.includes("Infinity") || display.includes("NaN")) return; 

    display = `${parseFloat(display) * -1}`
    status(flipKey); 
    updateScreen(); 
})

// DEL key
delKey.addEventListener("click", e => {
    if (display.includes("Infinity") || display.includes("NaN")) {
        resetDisplay();
        updateScreen();
        return;
    }

    display = display.slice(0, -1); 

    status(delKey);
    updateScreen(); 
})


// DOT KEY
dotKey.addEventListener("click", e => {
    if (display.includes(".")) return; 
    if (display.includes("Infinity") || display.includes("NaN")) return; 

    display += ".";
    updateScreen();
    status(dotKey);
})

