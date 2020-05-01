window.addEventListener('DOMContentLoaded', () => {
  const txtTest1 = document.getElementById('txtTest1');
  const txtTest2 = document.getElementById('txtTest2');

  document.getElementById('upload').addEventListener('click', () => {
    const data = {
      txtTest1: txtTest1.value,
      txtTest2: txtTest2.value,
    };

    // sendCustomizedApp({
    //   id: 'timer',
    //   storage: [
    //     {
    //       name: 'timer.custom.json',
    //       content: JSON.stringify(data),
    //     },
    //     {
    //       name: 'timer.app.js',
    //       url: 'app/index.js',
    //     },
    //     {
    //       name: 'timer.img',
    //       url: 'assets/timer-icon.js',
    //       evaluate: true,
    //     },
    //   ],
    // });

    Puck.write('\x03', () => {
      Puck.eval(`require("Storage").writeJSON("timer.custom.json", ${JSON.stringify(data)})`, (content, err) => {
        if (err) {
          console.error(err);
          return;
        }
        if (content === null) {
          console.error('content === null');
          return;
        }

        console.log(content);
      });
    });
  });

  onInit = () => {
    Puck.write('\x03', () => {
      Puck.eval('require("Storage").readJSON("timer.custom.json", true)', (content, err) => {
        if (err) {
          console.error(err);
          return;
        }
        if (content === null) {
          console.error('content === null');
          return;
        }

        console.log(content);

        txtTest1.value = content.txtTest1;
        txtTest2.value = content.txtTest2;
      });
    });
  };
});
