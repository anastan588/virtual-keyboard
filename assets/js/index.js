const keysEn = [
  [
    ['`', '~'],
    ['1', '!'],
    ['2', '@'],
    ['3', '#'],
    ['4', '$'],
    ['5', '%'],
    ['6', '^'],
    ['7', '&'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+'],
    'Backspace',
  ],
  [
    'Tab',
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    ['[', '{'],
    [']', '}'],
    ['\\', '|'],
    'Del',
  ],
  [
    'CapsLock',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    [';', ':'],
    ["'", '"'],
    'Enter',
  ],
  [
    'Shift',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    [',', '<'],
    ['.', '>'],
    ['/', '?'],
    '▲',
    'Shift',
  ],
  ['Ctrl', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

const keysRu = [
  [
    'ё',
    '1',
    ['2', '"'],
    ['3', '№'],
    '4',
    '5',
    ['6', ':'],
    ['7', '?'],
    '8',
    '9',
    '0',
    '-',
    '=',
    'Backspace',
  ],
  [
    'Tab',
    'й',
    'ц',
    'у',
    'к',
    'е',
    'н',
    'г',
    'ш',
    'щ',
    'з',
    'х',
    'ъ',
    '/',
    'Del',
  ],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  [
    'Shift',
    'я',
    'ч',
    'с',
    'м',
    'и',
    'т',
    'ь',
    'б',
    'ю',
    ['.', ','],
    '▲',
    'Shift',
  ],
  ['Ctrl', 'Alt', ' ', 'Alt', '◄', '▼', '►', 'Ctrl'],
];

// class Key {
//   constructor(value) {
//     this.button = document.createElement('div');
//     this.button.textContent = value;
//     this.button.classList.add('keyButton');
//     // console.log(this.button);
//   }
// }

class KeyBoardBody {
  constructor() {
    // console.log(this);
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('container');
    this.title = document.createElement('h1');
    this.title.textContent = 'Virtual KeyBoard';
    this.title.classList.add('title');
    this.textarea = document.createElement('textarea');
    this.textarea.rows = '5';
    this.textarea.classList.add('textarea');
    this.keyBoard = document.createElement('div');
    this.keyBoard.classList.add('keyBoard');
    this.PS = document.createElement('div');
    this.PS.classList.add('ps');
    this.PS.textContent = `Клавиатура создана на Windows OC,\n
     переключение языка осуществляется сочетанием клавиш "Alt+Shift" или "Ctrl+Shift"`;
    this.wrapper.append(this.title);
    this.wrapper.append(this.textarea);
    this.wrapper.append(this.keyBoard);
    this.wrapper.append(this.PS);
    document.body.prepend(this.wrapper);
    this.textarea.focus();
  }

  receiveKeyBoard() {
    const { keyBoard } = this;
    let keys = [];
    if (
      !localStorage.getItem('language')
      || localStorage.getItem('language') === 'en'
    ) {
      keys = keysEn;
    } else {
      keys = keysRu;
    }
    // console.log(Object.keys(keys));
    for (let keyRow = 0; keyRow < keys.length; keyRow += 1) {
      for (let rowItem = 0; rowItem < keys[keyRow].length; rowItem += 1) {
        // console.log(typeof keys[keyRow][rowItem]);
        let value = '';
        if (typeof keys[keyRow][rowItem] === 'object') {
          let item = keys[keyRow][rowItem][0];
          value = item;
          item = 0;
        } else {
          let item = keys[keyRow][rowItem];
          value = item;
          item = 0;
        }
        const newKey = {};
        newKey.button = document.createElement('div');
        newKey.button.textContent = value;
        newKey.button.classList.add('keyButton');
        newKey.button.classList.add('button');
        //   console.log(newKey.button);
        if (newKey.button.textContent === ' ') {
          newKey.button.style.paddingLeft = '265px';
          newKey.button.style.paddingRight = '265px';
        } else if (newKey.button.textContent === 'Shift') {
          newKey.button.style.paddingLeft = '50px';
          newKey.button.style.paddingRight = '50px';
        }
        keyBoard.append(newKey.button);
      }
    }
    // console.log(keyBoard);
  }

  showKey(event) {
    // console.log(event.key);
    // console.log(event.type);
    event.preventDefault();
    const buttonsCollection = document.querySelectorAll('.button');
    const currentButton = event.target.closest('.button');
    if (!currentButton && event.type === 'click') {
      // console.log(!currentButton);
      return;
    }
    let countofShift = 0;
    // console.log(buttonsCollection);
    for (let button = 0; button < buttonsCollection.length; button += 1) {
      // console.log(button);
      if (
        ((event.key === buttonsCollection[button].textContent
          || (event.key === 'ArrowUp' && buttonsCollection[button].textContent === '▲')
          || (event.key === 'ArrowLeft' && buttonsCollection[button].textContent === '◄')
          || (event.key === 'ArrowRight' && buttonsCollection[button].textContent === '►')
          || (event.key === 'ArrowDown' && buttonsCollection[button].textContent === '▼'))
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && !buttonsCollection[button].classList.contains('active')
        && buttonsCollection[button].textContent !== 'Backspace'
        && buttonsCollection[button].textContent !== 'Tab'
        && buttonsCollection[button].textContent !== 'Del'
        && buttonsCollection[button].textContent !== 'Tab'
        && buttonsCollection[button].textContent !== 'CapsLock'
        && buttonsCollection[button].textContent !== 'Enter'
        && buttonsCollection[button].textContent !== 'Shift'
        && buttonsCollection[button].textContent !== 'Ctrl'
        && buttonsCollection[button].textContent !== 'Win'
        && buttonsCollection[button].textContent !== 'Alt'
      ) {
        this.textarea.textContent += buttonsCollection[button].textContent;
        buttonsCollection[button].classList.add('active');
        setTimeout(() => {
          buttonsCollection[button].classList.remove('active');
        }, 500);
      } else if (
        (event.key === buttonsCollection[button].textContent
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'CapsLock'
      ) {
        if (
          !localStorage.getItem('CapsLock')
          && !buttonsCollection[button].classList.contains('active')
        ) {
          localStorage.setItem('CapsLock', 'true');
          for (
            let buttonForLanguage = 0;
            buttonForLanguage < buttonsCollection.length;
            buttonForLanguage += 1
          ) {
            if (
              (buttonsCollection[buttonForLanguage].textContent.match(
                /[A-Za-z]/,
              )
                || buttonsCollection[buttonForLanguage].textContent.match(/[А-Яа-я]/))
              && buttonsCollection[buttonForLanguage].textContent.length <= 1
            ) {
              // console.log(button.textContent.match(/[A-Za-z]/));
              let buttonText = buttonsCollection[buttonForLanguage].textContent.toUpperCase();
              buttonsCollection[buttonForLanguage].textContent = buttonText;
              buttonText = '';
            }
          }
          buttonsCollection[button].classList.add('active');
        } else {
          localStorage.removeItem('CapsLock');
          for (
            let buttonForLanguage = 0;
            buttonForLanguage < buttonsCollection.length;
            buttonForLanguage += 1
          ) {
            if (
              (buttonsCollection[buttonForLanguage].textContent.match(
                /[A-Za-z]/,
              )
                || buttonsCollection[buttonForLanguage].textContent.match(
                  /[А-Яа-я]/,
                ))
              && buttonsCollection[buttonForLanguage].textContent.length <= 1
            ) {
              // console.log(button.textContent.match(/[A-Za-z]/));
              let buttonText = buttonsCollection[buttonForLanguage].textContent.toLowerCase();
              buttonsCollection[buttonForLanguage].textContent = buttonText;
              buttonText = '';
            }
          }
          buttonsCollection[button].classList.remove('active');
        }
      } else if (
        (event.key === buttonsCollection[button].textContent
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Alt'
      ) {
        // console.log(button.textContent);
        if (
          !localStorage.getItem('Alt')
          && !buttonsCollection[button].classList.contains('active')
        ) {
          localStorage.setItem('Alt', 'true');
          // console.log(!button.classList.contains('active'));

          // button.classList.add("active");
          // let count = 0;
          for (let secondButton = 0; secondButton < buttonsCollection.length; secondButton += 1) {
            if (
              buttonsCollection[secondButton].textContent === buttonsCollection[button].textContent
            ) {
              // console.log(secondButton);
              // button.classList.add("active");
              buttonsCollection[secondButton].classList.add('active');
              // count += 1;
              // console.log(count);
            }
          }
          return;
        }
        if (
          localStorage.getItem('Alt')
          && buttonsCollection[button].classList.contains('active')
        ) {
          for (let secondButton = 0; secondButton < buttonsCollection.length; secondButton += 1) {
            if (
              buttonsCollection[secondButton].textContent === buttonsCollection[button].textContent
            ) {
              // console.log(secondButton);
              // button.classList.add("active");
              buttonsCollection[secondButton].classList.remove('active');
            }
          }
          localStorage.removeItem('Alt');
          return;
        }
      } else if (
        (event.key === buttonsCollection[button].textContent
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Shift'
      ) {
        // console.log(event.key);
        countofShift += 1;
        // console.log(countofShift);
        if (
          (localStorage.getItem('Alt') || localStorage.getItem('Ctrl'))
          && !buttonsCollection[button].classList.contains('active')
        ) {
          localStorage.setItem('Shift', 'true');
          buttonsCollection[button].classList.add('active');
          // console.log(localStorage.getItem('language'));
          if (localStorage.getItem('language') === 'ru' && countofShift < 2) {
            // console.log(localStorage.getItem('language'));
            localStorage.language = 'en';
            // console.log(localStorage.getItem('language'));
          } else if (
            (localStorage.getItem('language') === 'en'
              || !localStorage.getItem('language'))
            && countofShift < 2
          ) {
            localStorage.setItem('language', 'ru');
          }
          let keys = [];
          if (
            !localStorage.getItem('language')
            || localStorage.getItem('language') === 'en'
          ) {
            keys = keysEn;
          }
          if (localStorage.getItem('language') === 'ru') {
            keys = keysRu;
          }
          // console.log(keys);
          let count = 0;
          for (let keyRow = 0; keyRow < keys.length; keyRow += 1) {
            for (let rowItem = 0; rowItem < keys[keyRow].length; rowItem += 1) {
              if (typeof keys[keyRow][rowItem] === 'object') {
                let buttonInner = keys[keyRow][rowItem][0];
                buttonsCollection[count].textContent = buttonInner;
                buttonInner = '';
              } else {
                let buttonInner = keys[keyRow][rowItem];
                buttonsCollection[count].textContent = buttonInner;
                buttonInner = '';
              }
              count += 1;
            }
          }
          setTimeout(() => {
            localStorage.removeItem('Shift');
            localStorage.removeItem('Alt');
            localStorage.removeItem('Ctrl');
            for (let secondButton = 0; secondButton < buttonsCollection.length; secondButton += 1) {
              if (
                (buttonsCollection[secondButton].textContent === 'Alt' || buttonsCollection[secondButton].textContent === 'Ctrl')
                 || buttonsCollection[secondButton].textContent === 'Shift'
              ) {
                // console.log(secondButton);
                buttonsCollection[secondButton].classList.remove('active');
              }
            }
          }, 500);
        } else if (
          (!localStorage.getItem('Alt') || !localStorage.getItem('Ctrl'))
          && !buttonsCollection[button].classList.contains('active')
        ) {
          localStorage.setItem('Shift', 'true');
          buttonsCollection[button].classList.add('active');
          let keys = [];
          if (
            !localStorage.getItem('language')
            || localStorage.getItem('language') === 'en'
          ) {
            keys = keysEn;
          }
          if (localStorage.getItem('language') === 'ru') {
            keys = keysRu;
          }
          let count = 0;
          for (let keyRow = 0; keyRow < keys.length; keyRow += 1) {
            for (let rowItem = 0; rowItem < keys[keyRow].length; rowItem += 1) {
              if (typeof keys[keyRow][rowItem] === 'object') {
                let buttonInn = keys[keyRow][rowItem][1];
                buttonsCollection[count].textContent = buttonInn;
                buttonInn = '';
              } else {
                let buttonInn = keys[keyRow][rowItem];
                buttonsCollection[count].textContent = buttonInn;
                buttonInn = '';
              }
              count += 1;
            }
          }
        } else if (
          (!localStorage.getItem('Alt') || !localStorage.getItem('Ctrl'))
          && buttonsCollection[button].classList.contains('active')
        ) {
          localStorage.removeItem('Shift');
          buttonsCollection[button].classList.remove('active');
          let keys = [];
          if (
            !localStorage.getItem('language')
            || localStorage.getItem('language') === 'en'
          ) {
            keys = keysEn;
          }
          if (localStorage.getItem('language') === 'ru') {
            keys = keysRu;
          }
          let count = 0;
          for (let keyRow = 0; keyRow < keys.length; keyRow += 1) {
            for (let rowItem = 0; rowItem < keys[keyRow].length; rowItem += 1) {
              if (typeof keys[keyRow][rowItem] === 'object') {
                let buttonInnText = keys[keyRow][rowItem][0];
                buttonsCollection[count].textContent = buttonInnText;
                buttonInnText = '';
              } else {
                let buttonInnText = keys[keyRow][rowItem];
                buttonsCollection[count].textContent = buttonInnText;
                buttonInnText = '';
              }
              count += 1;
            }
          }
        }
      } else if (
        (event.key === buttonsCollection[button].textContent
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Backspace'
      ) {
        const textArray = this.textarea.textContent.split('');
        // console.log(textArray);
        textArray.splice(textArray.length - 1, 1);
        // console.log(textArray);
        const text = textArray.join('');
        // console.log(text);

        this.textarea.textContent = text;
        buttonsCollection[button].classList.add('active');
        setTimeout(() => {
          buttonsCollection[button].classList.remove('active');
        }, 500);
      } else if (
        (event.key === 'Delete'
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Del'
      ) {
        this.textarea.textContent = '';
        buttonsCollection[button].classList.add('active');
        setTimeout(() => {
          buttonsCollection[button].classList.remove('active');
        }, 500);
      } else if (
        (event.key === buttonsCollection[button].textContent
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Enter'
      ) {
        this.textarea.textContent += '\n';
        buttonsCollection[button].classList.add('active');
        setTimeout(() => {
          buttonsCollection[button].classList.remove('active');
        }, 500);
      } else if (
        (event.key === buttonsCollection[button].textContent
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Tab'
      ) {
        this.textarea.textContent += '        ';
        buttonsCollection[button].classList.add('active');
        setTimeout(() => {
          buttonsCollection[button].classList.remove('active');
        }, 500);
      } else if (
        (event.key === 'Control'
          || (event.type === 'click'
            && currentButton.textContent
              === buttonsCollection[button].textContent))
        && buttonsCollection[button].textContent === 'Ctrl') {
        // console.log(localStorage.getItem('Ctrl'));
        if (
          !localStorage.getItem('Ctrl')
            && !buttonsCollection[button].classList.contains('active')
        ) {
          localStorage.setItem('Ctrl', 'true');
          // console.log(localStorage.getItem('Ctrl'));
          for (let secondButton = 0; secondButton < buttonsCollection.length; secondButton += 1) {
            // console.log(buttonsCollection[secondButton].textContent);
            if (
              buttonsCollection[secondButton].textContent === buttonsCollection[button].textContent
            ) {
              buttonsCollection[secondButton].classList.add('active');
            }
          }
          return;
        }
        if (
          localStorage.getItem('Ctrl')
          && buttonsCollection[button].classList.contains('active')
        ) {
          for (let secondButton = 0; secondButton < buttonsCollection.length; secondButton += 1) {
            if (
              buttonsCollection[secondButton].textContent === buttonsCollection[button].textContent
            ) {
              buttonsCollection[secondButton].classList.remove('active');
            }
          }
          localStorage.removeItem('Ctrl');
          return;
        }
      }
    }
  }

  textareaFocus() {
    this.textarea.focus();
  }
}

// const body = document.getElementsByTagName('body');

// console.log(keysEn,keysRu);
// console.log(body);

const newKeyBoard = new KeyBoardBody();
// console.log(newKeyBoard);
newKeyBoard.receiveKeyBoard();

newKeyBoard.keyBoard.addEventListener('click', (event) => {
  // newKeyBoard.textareaFocus();
  newKeyBoard.showKey(event);
});

window.addEventListener('keydown', (event) => {
  // newKeyBoard.textareaFocus();
  newKeyBoard.showKey(event);
});

export default newKeyBoard;
