class FlexContainerComponent {
  htmlElement;

  constructor() {
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'd-flex gap-3 align-items-start';
  }

  addComponents(...components) {
    const htmlElements = components.map(a => a.htmlElement);
    this.htmlElement.append(...htmlElements);
  }
}

export default FlexContainerComponent;