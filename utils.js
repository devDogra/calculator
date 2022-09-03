function add(oprd1, op, oprd2){
    return parseFloat(oprd1) + parseFloat(oprd2); 
}
function subtract(oprd1, op, oprd2){
    return parseFloat(oprd1) - parseFloat(oprd2); 
}
function multiply(oprd1, op, oprd2){
    return parseFloat(oprd1) * parseFloat(oprd2); 
}
function divide(oprd1, op, oprd2){
    return parseFloat(oprd1) / parseFloat(oprd2); 
}

function operate(oprd1, op, oprd2){
    let retval = ""; 
    switch(op){
        case '+': retval += add(oprd1, op, oprd2); break; 
        case '-': retval +=  subtract(oprd1, op, oprd2); break; 
        case '*': retval += multiply(oprd1, op, oprd2); break; 
        case '/': retval += divide(oprd1, op, oprd2); break; 
    }
    return retval; 
}






export {
    operate, 
}