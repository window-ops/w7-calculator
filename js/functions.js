// Calculator Window

// Display

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

// Calculations

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

// Disable/Enable Calculator Buttons

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

// Drag

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function enableGrab(windowElement) {
  let isDragging = false;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === windowElement.querySelector('.title-bar')) {
      isDragging = true;
      let transform = getComputedStyle(windowElement).transform;
      let initialWindowX = parseFloat(transform.split(',')[4]);
      let initialWindowY = parseFloat(transform.split(',')[5]);
      windowElement.dataset.initialWindowX = initialWindowX;
      windowElement.dataset.initialWindowY = initialWindowY;
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

      let newX = parseFloat(windowElement.dataset.initialWindowX) + xOffset;
      let newY = parseFloat(windowElement.dataset.initialWindowY) + yOffset;

      setTranslate(newX, newY, windowElement);
    }
  }

  function dragEnd() {
    xOffset = 0;
    yOffset = 0;
    isDragging = false;
  }

  windowElement.querySelector('.title-bar').addEventListener('mousedown', dragStart);
  windowElement.querySelector('.title-bar').addEventListener('mouseup', dragEnd);
  windowElement.querySelector('.title-bar').addEventListener('mousemove', drag);
  windowElement.querySelector('.title-bar').addEventListener('touchstart', dragStart);
  windowElement.querySelector('.title-bar').addEventListener('touchend', dragEnd);
  windowElement.querySelector('.title-bar').addEventListener('touchmove', drag);
}

// Drag Calculator Window

document.addEventListener('DOMContentLoaded', function() {
  let calculatorWindow = document.getElementById('calculatorWindow');
  enableGrab(calculatorWindow);
});

// About Window

function openAboutWindow() {
  let aboutWindowHTML = '<div class="d-flex flex-column align-items-center window active" id="aboutWindow">' +
                        '<div class="title-bar" id="aboutWindowTitleBar">' +
                        '<div class="title-bar-text">About</div>' +
                        '<div class="title-bar-controls">' +
                        '<button aria-label="Close" onclick="closeAboutWindow()"></button>' +
                        '</div>' +
                        '</div>' +
                        '<div class="window-body has-space"></div>' +
                        '</div>';
  let aboutWindow = document.createElement('div');
  aboutWindow.innerHTML = aboutWindowHTML;
  document.body.appendChild(aboutWindow);
  enableGrab(aboutWindow);
}