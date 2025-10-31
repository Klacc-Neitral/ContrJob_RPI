import { AbstractComponent } from "../framework/view/abstract-component.js";

function createContainerTemplate() {
  return `<div class="container"></div>`;
}

export default class ContainerComponent extends AbstractComponent {
  get template() {
    return createContainerTemplate();
  }
}
