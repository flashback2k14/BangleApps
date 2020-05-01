window.addEventListener('DOMContentLoaded', () => {
  let Ui;

  const MessageType = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
  });

  _showMessage = (type, message) => {
    const text = type === MessageType.SUCCESS ? Ui.toastSuccessText : Ui.toastErrorText;
    const container = type === MessageType.SUCCESS ? Ui.toastSuccess : Ui.toastError;

    text.textContent = message;
    container.classList.remove('d-none');
    container.classList.add('d-block');

    setTimeout(() => {
      container.classList.remove('d-block');
      container.classList.add('d-none');
      text.textContent = '';
    }, 3000);
  };

  _save = () => {
    const data = {
      timerSeconds: Ui.timerSeconds.value,
      textColor: Ui.textColor.value,
      bgColor: Ui.bgColor.value,
    };

    Puck.write('\x03', () => {
      Puck.eval(`require("Storage").writeJSON("timer.custom.json", ${JSON.stringify(data)})`, (content, err) => {
        if (err) {
          console.error(err);
          _showMessage(MessageType.ERROR, JSON.stringify(err));
          return;
        }

        if (content === null) {
          console.error('content === null');
          _showMessage(MessageType.ERROR, 'no content found.');
          return;
        }

        _showMessage(MessageType.SUCCESS, 'successfully saved.');
      });
    });
  };

  initUiElements = () => {
    Ui = {
      timerSeconds: document.getElementById('timerSeconds'),
      textColor: document.getElementById('textColor'),
      bgColor: document.getElementById('bgColor'),
      toastSuccess: document.getElementById('toastSuccess'),
      toastSuccessText: document.getElementById('toastSuccessText'),
      toastError: document.getElementById('toastError'),
      toastErrorText: document.getElementById('toastErrorText'),
      saveButton: document.getElementById('save'),
    };
  };

  initListeners = () => {
    Ui.saveButton.addEventListener('click', _save);
  };

  onInit = () => {
    Puck.write('\x03', () => {
      Puck.eval('require("Storage").readJSON("timer.custom.json", true)', (content, err) => {
        if (err) {
          console.error(err);
          _showMessage(MessageType.ERROR, JSON.stringify(err));
          return;
        }
        if (content === null) {
          console.error('content === null');
          _showMessage(MessageType.ERROR, 'no content found.');
          return;
        }

        Ui.timerSeconds.value = content['timerSeconds'];
        Ui.textColor.value = content['textColor'];
        Ui.bgColor.value = content['bgColor'];

        Ui.timerSeconds.classList.remove('timerSeconds');
        Ui.textColor.classList.remove('disabled');
        Ui.bgColor.classList.remove('disabled');
        Ui.saveButton.classList.remove('disabled');

        _showMessage(MessageType.SUCCESS, 'successfully loaded.');
      });
    });
  };

  initUiElements();
  initListeners();
});
