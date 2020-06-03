import { DnD } from './dnd';

export class Note {
  constructor(button) {
    this.data = [];
    this.container = document.querySelector('.container');
    this.button = button;

    this._handleClickButton = this._clickButton.bind(this);
    this.setCoords = this._setCoords.bind(this);

    this._init();
    console.log(this.data);
    console.log(this.button);
  }

  _init() {
    this.button.addEventListener('click', this._handleClickButton);
  }

  _setCoords(note, coords) {
    const index = note.getAttribute('data-index');

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
    const newNoteObj = this._constructorNote('New note', 48, 24);
    this.data.push(newNoteObj);

    this.render();
  }

  _createNote(data, index) {
    const [divNode, buttonNode, textAreaNode] = [
      document.createElement('div'),
      document.createElement('button'),
      document.createElement('textarea'),
    ];

    const noteNode = divNode.cloneNode(true);
    noteNode.setAttribute('data-index', index);
    noteNode.classList.add('note');
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left: ${data.left}px;`;
    new DnD(noteNode, this.setCoords);

    const btnCloseNode = buttonNode.cloneNode(true);
    btnCloseNode.classList.add('note__close');
    btnCloseNode.innerHTML = 'X';
    btnCloseNode.addEventListener('click', () => {
      this._closeNote(index);
    });

    const contentNode = divNode.cloneNode(true);
    contentNode.classList.add('note__content');
    contentNode.innerHTML = data.content;

    noteNode.addEventListener('dblclick', () => {
      this._editNote(textAreaNode, contentNode, index);
    });

    textAreaNode.classList.add('note__textarea');
    textAreaNode.hidden = true;
    textAreaNode.value = data.content;

    noteNode.append(btnCloseNode, contentNode, textAreaNode);

    return noteNode;
  }

  _editNote(textAreaNode, contentNode, index) {
    if (textAreaNode.hidden) {
      textAreaNode.hidden = false;
      contentNode.hidden = true;
    } else {
      textAreaNode.hidden = true;
      contentNode.hidden = false;
      this.data[index] = textAreaNode.value;
      this.render();
    }
  }

  _closeNote(index) {
    this.data.splice(index, 1);
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index);

      this.container.append(noteNode);
    });
  }
}
