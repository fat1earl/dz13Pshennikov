// Метрика ------------------------------------------
// offsetWidth/Height - внешняя ширина и высота (ширина контента + padding + border)
// clientWidth/Height - размер области внутри рамок (ширина контента + padding)
// scrollWidth/Height - полный размер с учётом прокрученной области
// scrollLeft/scrollTop - ширина/высота прокрученной области

class Metrics {
  constructor(element) {
    this.element = element;
  }

  get width() {
    return this.element.offsetWidth;
  }

  get height() {
    return this.element.offsetHeight;
  }

  get innerWidth() {
    return this.element.clientWidth;
  }

  get innerHeight() {
    return this.element.clientHeight;
  }

  get scrollHeight() {
    return this.element.scrollHeight;
  }
}

export {Metrics};


// scrollTo, scrollBy, scrollIntoView