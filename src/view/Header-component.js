import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderTemplate() {
  return `<h1>Планер поездок</h1>`;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderTemplate();
  }
}
