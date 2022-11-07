import * as _ from "lodash";

import IllegalArgumentException from "../../domain/common/IllegalArgumentException";

const State = {
  COLLAPSED: "Collapsed",
  EXPANDED: "Expanded",
};

export default class CollapsingHeading extends HTMLElement {
  #collapsedIconClasses = "fa-solid fa-angle-right";
  #expandedIconClasses = "fa-solid fa-angle-down";
  #state = State.COLLAPSED;

  constructor() {
    super();

    const title = this.getAttribute("title");

    if (!_.isString(title)) {
      throw new IllegalArgumentException(
        `Expected title to be a string but got: ${typeof title}`
      );
    }

    const target = this.getAttribute("target");

    if (!_.isString(target)) {
      throw new IllegalArgumentException(
        `Expected target to be a string but got: ${typeof title}`
      );
    }

    const heading = document.createElement("h2");
    heading.setAttribute("data-bs-toggle", "collapse");
    heading.setAttribute("data-bs-target", `#${target}`);
    heading.setAttribute("aria-controls", target);
    heading.ariaExpanded = false;

    const icon = document.createElement("i");
    icon.setAttribute("class", this.#collapsedIconClasses);
    heading.appendChild(icon);

    const text = document.createTextNode(` ${title}`);
    heading.appendChild(text);

    heading.addEventListener("click", () => {
      if (this.#state === State.COLLAPSED) {
        this.#state = State.EXPANDED;
        icon.setAttribute("class", this.#expandedIconClasses);
      } else {
        this.#state = State.COLLAPSED;
        icon.setAttribute("class", this.#collapsedIconClasses);
      }
    });

    this.appendChild(heading);
  }
}

customElements.define("collapsing-heading", CollapsingHeading);
