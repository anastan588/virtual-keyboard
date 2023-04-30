import { keysEn, keysRu } from "./keys.js";
import { keyBoardBody, key } from "./keyBoard.js";

let body = document.getElementsByTagName("body");

// console.log(keysEn,keysRu);
console.log(body);

export let newKeyBoard = new keyBoardBody();
console.log(newKeyBoard);
newKeyBoard.receiveKeyBoard();


newKeyBoard.keyBoard.addEventListener("click", event => {
  // newKeyBoard.textareaFocus();
  newKeyBoard.showKey(event);
});

window.addEventListener("keydown", event => {
  // newKeyBoard.textareaFocus();
  newKeyBoard.showKey(event);
});

// window.addEventListener("keyup", event => {
//   newKeyBoard.showKeyBoard(event);
// });

