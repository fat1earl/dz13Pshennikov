// import {Metrics} from './metrics'

// const sectionNode = document.querySelector('section');

// const sectionMetrics = new Metrics(sectionNode);

// console.log(sectionMetrics);

// Координаты
// elem.getBoundingClientRect();
// console.log(sectionNode.getBoundingClientRect());

// window.onscroll = function() {
//   console.log(getCoords(sectionNode))
//   console.log({clientX: sectionNode.getBoundingClientRect().left, clientY: sectionNode.getBoundingClientRect().top});
// }

// Координаты относительно документа
// function getCoords(elem) {
//   const rect = elem.getBoundingClientRect();

//   return {
//     pageX: rect.left + pageXOffset,
//     pageY: rect.top + pageYOffset
//   }
// }

// Drag'n'Drop с событиями мыши
// import {DnD} from './dnd';

// const rectNode = document.querySelector('.rectangle');

// new DnD(rectNode);


// mousedown - нажатие левой клавиши мыши
// mousemove - движение курсора мыши
// mouseup - отпускание левой клавиши мыши

// Note
import {Note} from './note';

const newNoteBtnNode = document.querySelector('#newNoteBtn');

new Note(newNoteBtnNode);