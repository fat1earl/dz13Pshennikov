import { DnD } from "./dnd";

export class Note {
  constructor(button) {
    this.data = [];
    this.container = document.querySelector(".container");
    this.button = button;

    this._handleClickButton = this._clickButton.bind(this);
    this.setCoords = this._setCoords.bind(this);

    this._init();
    console.log(this.data);
    console.log(this.button);
  }

  _init() {
    this.button.addEventListener("click", this._handleClickButton);
  }

  _setCoords(note, coords) {
    const index = note.getAttribute("data-index");

    this.data[index].left = coords.x;
    this.data[index].top = coords.y;
    console.log(this.data);
  }

  _constructorNote(content, top, left) {
    return {
      content,
      top,
      left,
    };
  }

  _clickButton() {
    const newNoteObj = this._constructorNote(
      "Double click to add or save New Note",
      48,
      24
    );
    this.data.push(newNoteObj);

    this.render();
  }

  _createNote(data, index) {
    const [divNode, buttonNode, textareaNode] = [
      document.createElement("div"),
      document.createElement("button"),
      document.createElement("textarea"),
    ];

    const noteNode = divNode.cloneNode(true);
    noteNode.setAttribute("data-index", index);
    noteNode.classList.add("note");
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left: ${data.left}px;`;
    new DnD(noteNode, this.setCoords);
    noteNode.addEventListener("dblclick", () => {
      this._editNote(textareaNode, contentNode, index);
    });

    const btnCloseNode = buttonNode.cloneNode(true);
    btnCloseNode.classList.add("note__close");
    btnCloseNode.innerHTML = "X";
    btnCloseNode.addEventListener("click", () => {
      this._closeNote(index);
    });

    const contentNode = divNode.cloneNode(true);
    contentNode.classList.add("note__content");
    contentNode.style.cssText = `width: 90%;`;
    contentNode.innerHTML = data.content;

    textareaNode.classList.add("note__textarea");
    textareaNode.hidden = true;
    textareaNode.value = data.content;

    noteNode.append(btnCloseNode, contentNode, textareaNode);

    return noteNode;
  }

  _editNote(textareaNode, contentNode, index) {
    if (textareaNode.hidden) {
      textareaNode.hidden = false;
      contentNode.hidden = true;
    } else {
      textareaNode.hidden = true;
      contentNode.hidden = false;
      this.data[index].content = textareaNode.value;
      this.render();
    }
  }

  _closeNote(index) {
    this.data.splice(index, 1);
    this.render();
  }

  render() {
    this.container.innerHTML = "";

    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index);

      this.container.append(noteNode);
    });
  }
}
