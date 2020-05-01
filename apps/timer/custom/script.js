window.addEventListener('DOMContentLoaded', () => {
  const MessageType = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
  });
  let Ui;

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

  _upload = () => {
    sendCustomizedApp({
      id: 'timer',
    });
  };

  initUiElements = () => {
    Ui = {
      textColor: document.getElementById('textColor'),
      bgColor: document.getElementById('bgColor'),
      toastSuccess: document.getElementById('toastSuccess'),
      toastSuccessText: document.getElementById('toastSuccessText'),
      toastError: document.getElementById('toastError'),
      toastErrorText: document.getElementById('toastErrorText'),
      saveButton: document.getElementById('save'),
      uploadButton: document.getElementById('upload'),
    };
  };

  initListeners = () => {
    Ui.saveButton.addEventListener('click', _save);
    Ui.uploadButton.addEventListener('click', _upload);
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

        Ui.textColor.value = content['textColor'];
        Ui.bgColor.value = content['bgColor'];

        _showMessage(MessageType.SUCCESS, 'successfully saved.');
      });
    });
  };

  initUiElements();
  initListeners();
});
