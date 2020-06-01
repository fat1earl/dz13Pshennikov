import {DnD} from './dnd';

export class Note {
  constructor(button) {
    this.data = [];
    this.container = document.querySelector('.container'); // контейнер, нужен для изоляции заметок от остального html
    this.button = button;

    this._handleClickButton = this._clickButton.bind(this);
    this._handleCloseNote = this._closeNote.bind(this);
    
    this.setCoords = this._setCoords.bind(this);

    this._init();
    console.log(this.data);
    console.log(this.button);
    // console.log(this._init());
  }
  // console.log(this.data);
 

  _init() {
    this.button.addEventListener('click', this._handleClickButton);
    // this.btnCloseNode.addEventListener('click', this._closeNote);
  }
  _closeNote(event) {
    const noteEvent = event.currentTarget.parentNode;
    const noteIndex = noteEvent.getAttribute('data-index');

    this.data.splice(noteIndex, 1);
    noteEvent.remove();
    console.log(this.data.splice(noteIndex, 1));

  }

  




  // метод для записи координат в data, передаём его в класс DnD
  _setCoords(note, coords) {
    const index = note.getAttribute('data-index');

    this.data[index].left = coords.x;
    this.data[index].top = coords.y;
    console.log(this.data); // если вызвать в контексте класса Note в другом классе, есть доступ к data
  }
  
  _constructorNote(content, top, left) {
    return {
      content,
      top,
      left
    }
  }

  _clickButton() {
    const newNoteObj = this._constructorNote('Hello', 48, 24); // передаём дефолтные значения
    this.data.push(newNoteObj);

    this.render();
  }

  _createNote(data, index) {
    const [divNode, buttonNode, textAreaNode] = [
      document.createElement('div'),
      document.createElement('button'),
      document.createElement('textarea'),
    ]

    const noteNode = divNode.cloneNode(true);
    noteNode.setAttribute('data-index', index); // index нужен, чтобы найти объект в массиве data
    noteNode.classList.add('note');
    noteNode.style.cssText = `position: absolute; top: ${data.top}px; left: ${data.left}px;`;
    new DnD(noteNode, this.setCoords);

    const btnCloseNode = buttonNode.cloneNode(true);
    btnCloseNode.classList.add('note__close');
    btnCloseNode.innerHTML = 'X';
    btnCloseNode.addEventListener('click', this._handleCloseNote);
    

    const contentNode = divNode.cloneNode(true);
    contentNode.classList.add('note__content');
    contentNode.innerHTML = data.content;


    noteNode.append(btnCloseNode, contentNode)

    return noteNode;
  }
  
  
  // console.log(this._closeNote());
  
 
    

  render() {
    this.container.innerHTML = ''; // очищаем контейнер перед каждым рендером

    this.data.forEach((noteObj, index) => {
      const noteNode = this._createNote(noteObj, index);

      this.container.append(noteNode);
    })
  }
}