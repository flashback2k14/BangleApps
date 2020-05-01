let counter;
let interval;
let uiConfig = {};

function loadData() {
  const data = require('Storage').readJSON('timer.custom.json', true);
  if (data) {
    counter = data.timerSeconds;
    uiConfig.timerSeconds = data.timerSeconds;
    uiConfig.textColor = data.textColor;
    uiConfig.bgColor = data.bgColor;
  } else {
    counter = 6;
    uiConfig.timerSeconds = 6;
    uiConfig.textColor = 0xffff;
    uiConfig.bgColor = 0x0000;
  }
}

function outOfTime() {
  if (interval) {
    return;
  }

  E.showMessage('Restart with\nthe\nmiddle button.', 'Out of Time.');

  Bangle.buzz();
  Bangle.beep(200, 4000)
    .then(() => new Promise((resolve) => setTimeout(resolve, 200)))
    .then(() => Bangle.beep(200, 3000));

  setTimeout(outOfTime, 10000);
}

function countDown() {
  counter--;

  if (counter <= 0) {
    clearInterval(interval);
    interval = undefined;
    setWatch(startTimer, BTN2);
    outOfTime();
    return;
  }

  g.clear();

  g.setColor(uiConfig.textColor)
    .setBgColor(uiConfig.bgColor)
    .setFontAlign(0, 0)
    .setFont('6x8', 8)
    .drawString(counter, g.getWidth() / 2, g.getHeight() / 2)
    .flip();
}

function startTimer() {
  counter = uiConfig.timerSeconds;

  countDown();
  if (!interval) {
    interval = setInterval(countDown, 1000);
  }
}

loadData();
startTimer();
