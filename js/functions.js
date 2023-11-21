let hasResult = false;

function appendToDisplay(value) {
  if (document.getElementById('display').value === 'Error' || hasResult) {
    return;
  }
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
  enableButtons();
  hasResult = false;
}

function calculate() {
  try {
    document.getElementById('display').value = eval(document.getElementById('display').value);
    disableButtons();
    hasResult = true;
  } catch (error) {
    document.getElementById('display').value = 'Error';
    disableButtons();
    hasResult = true;
  }
}

function disableButtons() {
  document.getElementById('button-0').disabled = true;
  document.getElementById('button-1').disabled = true;
  document.getElementById('button-2').disabled = true;
  document.getElementById('button-3').disabled = true;
  document.getElementById('button-4').disabled = true;
  document.getElementById('button-5').disabled = true;
  document.getElementById('button-6').disabled = true;
  document.getElementById('button-7').disabled = true;
  document.getElementById('button-8').disabled = true;
  document.getElementById('button-9').disabled = true;
  document.getElementById('button-add').disabled = true;
  document.getElementById('button-subtract').disabled = true;
  document.getElementById('button-multiply').disabled = true;
  document.getElementById('button-divide').disabled = true;
  document.getElementById('button-decimal').disabled = true;
  document.getElementById('button-equals').disabled = true;
}

function enableButtons() {
  document.getElementById('button-0').disabled = false;
  document.getElementById('button-1').disabled = false;
  document.getElementById('button-2').disabled = false;
  document.getElementById('button-3').disabled = false;
  document.getElementById('button-4').disabled = false;
  document.getElementById('button-5').disabled = false;
  document.getElementById('button-6').disabled = false;
  document.getElementById('button-7').disabled = false;
  document.getElementById('button-8').disabled = false;
  document.getElementById('button-9').disabled = false;
  document.getElementById('button-add').disabled = false;
  document.getElementById('button-subtract').disabled = false;
  document.getElementById('button-multiply').disabled = false;
  document.getElementById('button-divide').disabled = false;
  document.getElementById('button-decimal').disabled = false;
  document.getElementById('button-equals').disabled = false;
}

// Calculator Window Buttons

function minimizeCalculatorWindow() {
  document.getElementById('calculatorWindow').style.display = "none";
  document.getElementById('calculatorWindowActions').style.display = "block";
}

function closeCalculatorWindow() {
  document.getElementById('calculatorWindow').remove();
  document.getElementById('calculatorWindowActions').remove();
}

function restoreCalculatorWindow() {
  document.getElementById('calculatorWindow').style.display = "block";
  document.getElementById('calculatorWindowActions').style.display = "none";
}

// Drag Calculator Window

let isDragging = false;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('title-bar').addEventListener('mousedown', dragStart);
  document.getElementById('title-bar').addEventListener('mouseup', dragEnd);
  document.getElementById('title-bar').addEventListener('mousemove', drag);
  document.getElementById('title-bar').addEventListener('touchstart', dragStart);
  document.getElementById('title-bar').addEventListener('touchend', dragEnd);
  document.getElementById('title-bar').addEventListener('touchmove', drag);
});

function dragStart(e) {
  if (e.type === 'touchstart') {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === document.getElementById('calculatorWindowTitleBar')) {
    isDragging = true;
    initialWindowX = parseFloat(getComputedStyle(document.getElementById('calculatorWindow')).transform.split(',')[4]);
    initialWindowY = parseFloat(getComputedStyle(document.getElementById('calculatorWindow')).transform.split(',')[5]);
  }
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();

    if (e.type === 'touchmove') {
      xOffset = e.touches[0].clientX - initialX;
      yOffset = e.touches[0].clientY - initialY;
    } else {
      xOffset = e.clientX - initialX;
      yOffset = e.clientY - initialY;
    }

    let newX = initialWindowX + xOffset;
    let newY = initialWindowY + yOffset;

    setTranslate(newX, newY, document.getElementById('calculatorWindow'));
  }
}

function dragEnd() {
  xOffset = 0; 
  yOffset = 0;
  isDragging = false;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}