let buffer = "0";
let runningTotal = 0;
let previousOperator = null;

const display = document.querySelector(".display");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSybol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
  //console.log(buffer);
}

function handleMath(value){
    if (buffer === '0') {
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer);
    
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation (intBuffer)
    }

    previousOperator = value;
    buffer = '0';
    //console.log(runningTotal)
}

function flushOperation (intBuffer){
    if (previousOperator === '+') {
        runningTotal += intBuffer
    }else if (previousOperator === '-') {
        runningTotal -= intBuffer
    }else if (previousOperator === 'X') {
        runningTotal *= intBuffer
    }else if (previousOperator === '/') {
        runningTotal /= intBuffer
    }
}

function handleSybol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "=":
        if (previousOperator === null) {
            return;
        }
        flushOperation(parseInt(buffer))
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;

    break;
    case "←":
        if (buffer.length === 1) {
            buffer = '0';
        }else {
            // substring devuelve la cadena desde una posicion a otra del string
            buffer = buffer.substring(0, buffer.length -1)
        }
      break;
    case "/":
        handleMath(symbol);
      break;
    case "X":
        handleMath(symbol);
      break;
    case "-":
        handleMath(symbol);
      break;
    case "+":
        handleMath(symbol);
      break;
  }

  //console.log("symbol");
}

function init() {
  console.log("hi");
  document
    .querySelector(".container")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

function rerender() {
  display.innerText = buffer;
}
init();
