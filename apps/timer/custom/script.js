window.addEventListener('DOMContentLoaded', () => {
  const txtTest1 = document.getElementById('txtTest1');
  const txtTest2 = document.getElementById('txtTest2');

  document.getElementById('upload').addEventListener('click', () => {
    const data = {
      txtTest1: txtTest1.value,
      txtTest2: txtTest2.value,
    };

    sendCustomizedApp({
      id: 'timer',
      storage: [
        {
          name: 'timer.custom.json',
          content: JSON.stringify(data),
        },
        {
          name: 'timer.app.js',
          url: 'app/index.js',
        },
        {
          name: 'timer.img',
          url: 'assets/timer-icon.js',
          evaluate: true,
        },
      ],
    });
  });
});
