var counter = 31;
var interval;

function outOfTime() {
  if (interval) {
    return;
  }

  E.showMessage('Out of Time', 'My Timer');
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

  g.setFontAlign(0, 0);
  g.setFont('6x8', 8);

  g.drawString(counter, g.getWidth() / 2, g.getHeight() / 2);

  g.flip();
}

function startTimer() {
  counter = 31;
  countDown();
  if (!interval) {
    interval = setInterval(countDown, 1000);
  }
}

startTimer();
