import { keysEn, keysRu } from "./keys.js";
import { newKeyBoard } from "./index.js";

export class key {
  constructor(value) {
    this.button = document.createElement("div");
    this.button.textContent = value;
    this.button.classList.add("keyButton");
    // console.log(this.button);
  }
}

export class keyBoardBody {
  constructor() {
    console.log(this);
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("container");
    this.title = document.createElement("h1");
    this.title.textContent = "Virtual KeyBoard";
    this.title.classList.add("title");
    this.textarea = document.createElement("textarea");
    this.textarea.rows = "5";
    this.textarea.classList.add("textarea");
    this.keyBoard = document.createElement("div");
    this.keyBoard.classList.add("keyBoard");
    this.PS = document.createElement("div");
    this.PS.classList.add("ps");
    this.PS.textContent = `Клавиатура создана на Windows OC,\n
     переключение языка осуществляется сочетанием клавиш \"Alt+Shift\"`;
    this.wrapper.append(this.title);
    this.wrapper.append(this.textarea);
    this.wrapper.append(this.keyBoard);
    this.wrapper.append(this.PS);
    document.body.prepend(this.wrapper);
  }

  receiveKeyBoard() {
    let keyBoard = document.querySelector(".keyBoard");
    let keys = [];
    if (
      !localStorage.getItem("language") ||
      localStorage.getItem("language") === "en"
    ) {
      keys = keysEn;
    } else {
      keys = keysRu;
    }
    for (let keyRow in keys) {
      for (let rowItem in keys[keyRow]) {
        console.log(typeof keys[keyRow][rowItem]);
        let value = "";
        if (typeof keys[keyRow][rowItem] === "object") {
          value = keys[keyRow][rowItem][0];
        } else {
          value = keys[keyRow][rowItem];
        }
        let newKey = new key(value);
        newKey.button.classList.add("button");
        //   console.log(newKey.button);
        if (newKey.button.textContent === " ") {
          newKey.button.style.paddingLeft = "265px";
          newKey.button.style.paddingRight = "265px";
        } else if (newKey.button.textContent === "Shift") {
          newKey.button.style.paddingLeft = "50px";
          newKey.button.style.paddingRight = "50px";
        }
        keyBoard.append(newKey.button);
      }
    }
    console.log(keyBoard);
  }

  showKey(event) {
    console.log(event.key);
    console.log(event.type);
    let buttonsCollection = document.querySelectorAll(".button");
    let currentButton = event.target.closest(".button");
    if (!currentButton && event.type === "click") {
      console.log(!currentButton);
      return;
    }
    let countofShift = 0;
    // console.log(buttonsCollection);
    for (let button of buttonsCollection) {
      // console.log(button);
      if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        !button.classList.contains("active") &&
        button.textContent !== "Backspace" &&
        button.textContent !== "Tab" &&
        button.textContent !== "Del" &&
        button.textContent !== "Tab" &&
        button.textContent !== "CapsLock" &&
        button.textContent !== "Enter" &&
        button.textContent !== "Shift" &&
        button.textContent !== "Ctrl" &&
        button.textContent !== "Win" &&
        button.textContent !== "Alt"
      ) {
        this.textarea.textContent += button.textContent;
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 500);
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "CapsLock"
      ) {
        if (
          !localStorage.getItem("CapsLock") &&
          !button.classList.contains("active")
        ) {
          localStorage.setItem("CapsLock", "true");
          for (let button of buttonsCollection) {
            if (
              (button.textContent.match(/[A-Za-z]/) ||
                button.textContent.match(/[А-Яа-я]/)) &&
              button.textContent.length <= 1
            ) {
              // console.log(button.textContent.match(/[A-Za-z]/));
              button.textContent = button.textContent.toUpperCase();
            }
          }
          button.classList.add("active");
        } else {
          localStorage.removeItem("CapsLock");
          for (let button of buttonsCollection) {
            if (
              (button.textContent.match(/[A-Za-z]/) ||
                button.textContent.match(/[А-Яа-я]/)) &&
              button.textContent.length <= 1
            ) {
              console.log(button.textContent.match(/[A-Za-z]/));
              button.textContent = button.textContent.toLowerCase();
            }
          }
          button.classList.remove("active");
        }
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "Alt"
      ) {
        console.log(button.textContent);
        if (
          !localStorage.getItem("Alt") &&
          !button.classList.contains("active")
        ) {
          localStorage.setItem("Alt", "true");
          console.log(!button.classList.contains("active"));

          // button.classList.add("active");
          let count = 0;
          for (let secondButton of buttonsCollection) {
            if (secondButton.textContent === button.textContent) {
              console.log(secondButton);
              // button.classList.add("active");
              secondButton.classList.add("active");
              count++;
              console.log(count);
            }
          }
          return;
        }
        if (
          localStorage.getItem("Alt") &&
          button.classList.contains("active")
        ) {
          for (let secondButton of buttonsCollection) {
            if (secondButton.textContent === button.textContent) {
              console.log(secondButton);
              // button.classList.add("active");
              secondButton.classList.remove("active");
            }
          }
          localStorage.removeItem("Alt");
          return;
        }
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "Shift"
      ) {
        // console.log(event.key);
        countofShift++;
        console.log(countofShift);
        if (
          localStorage.getItem("Alt") &&
          !button.classList.contains("active")
        ) {
          localStorage.setItem("Shift", "true");
          button.classList.add("active");
          console.log(localStorage.getItem("language"));
          if (localStorage.getItem("language") === "ru" && countofShift < 2) {
            console.log(localStorage.getItem("language"));
            localStorage.language = "en";
            console.log(localStorage.getItem("language"));
          } else if (
            (localStorage.getItem("language") === "en" ||
              !localStorage.getItem("language")) &&
            countofShift < 2
          ) {
            localStorage.setItem("language", "ru");
          }
          let keys = [];
          if (
            !localStorage.getItem("language") ||
            localStorage.getItem("language") === "en"
          ) {
            keys = keysEn;
          }
          if (localStorage.getItem("language") === "ru") {
            keys = keysRu;
          }
          console.log(keys);
          let count = 0;
          for (let keyRow in keys) {
            for (let rowItem in keys[keyRow]) {
              if (typeof keys[keyRow][rowItem] === "object") {
                buttonsCollection[count].textContent = keys[keyRow][rowItem][0];
              } else {
                buttonsCollection[count].textContent = keys[keyRow][rowItem];
              }
              count++;
            }
          }
          setTimeout(() => {
            localStorage.removeItem("Shift");
            localStorage.removeItem("Alt");
            for (let secondButton of buttonsCollection) {
              if (
                secondButton.textContent === "Alt" ||
                secondButton.textContent === "Shift"
              ) {
                console.log(secondButton);
                secondButton.classList.remove("active");
              }
            }
          }, 500);
        } else if (
          !localStorage.getItem("Alt") &&
          !button.classList.contains("active")
        ) {
          localStorage.setItem("Shift", "true");
          button.classList.add("active");
          let keys = [];
          if (
            !localStorage.getItem("language") ||
            localStorage.getItem("language") === "en"
          ) {
            keys = keysEn;
          }
          if (localStorage.getItem("language") === "ru") {
            keys = keysRu;
          }
          let count = 0;
          for (let keyRow in keys) {
            for (let rowItem in keys[keyRow]) {
              if (typeof keys[keyRow][rowItem] === "object") {
                buttonsCollection[count].textContent = keys[keyRow][rowItem][1];
              } else {
                buttonsCollection[count].textContent = keys[keyRow][rowItem];
              }
              count++;
            }
          }
        } else if (
          !localStorage.getItem("Alt") &&
          button.classList.contains("active")
        ) {
          localStorage.removeItem("Shift");
          button.classList.remove("active");
          let keys = [];
          if (
            !localStorage.getItem("language") ||
            localStorage.getItem("language") === "en"
          ) {
            keys = keysEn;
          }
          if (localStorage.getItem("language") === "ru") {
            keys = keysRu;
          }
          let count = 0;
          for (let keyRow in keys) {
            for (let rowItem in keys[keyRow]) {
              if (typeof keys[keyRow][rowItem] === "object") {
                buttonsCollection[count].textContent = keys[keyRow][rowItem][0];
              } else {
                buttonsCollection[count].textContent = keys[keyRow][rowItem];
              }
              count++;
            }
          }
        }
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "Backspace"
      ) {
        let textArray = this.textarea.textContent.split("");
        console.log(textArray);
        textArray.splice(textArray.length - 1, 1);
        console.log(textArray);
        let text = textArray.join("");
        console.log(text);

        this.textarea.textContent = text;
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 500);
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "Del"
      ) {
        this.textarea.textContent = "";
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 500);
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "Enter"
      ) {
        this.textarea.textContent += "\n";
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 500);
      } else if (
        (event.key === button.textContent ||
          (event.type === "click" &&
            currentButton.textContent === button.textContent)) &&
        button.textContent === "Tab"
      ) {
        this.textarea.textContent += "\t";
        button.classList.add("active");
        setTimeout(() => {
          button.classList.remove("active");
        }, 500);
      }
    }
  }

  textareaFocus() {
    this.textarea.focus();
  }
}
