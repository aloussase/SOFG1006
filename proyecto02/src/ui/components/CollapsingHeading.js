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
  #icon;

  constructor(attrs) {
    super();

    const title = this.getAttribute("title") ?? attrs?.title;
    const target = this.getAttribute("target") ?? attrs?.target;

    if (!_.isString(title)) {
      throw new IllegalArgumentException(
        `Expected title to be a string but got: ${typeof title}: ${title}`
      );
    }

    if (!_.isString(target)) {
      throw new IllegalArgumentException(
        `Expected target to be a string but got: ${typeof title}: ${target}`
      );
    }

    const heading = document.createElement("h2");
    heading.setAttribute("data-bs-toggle", "collapse");
    heading.setAttribute("data-bs-target", `#${target}`);
    heading.setAttribute("aria-controls", target);
    heading.ariaExpanded = false;

    this.#icon = document.createElement("i");
    this.#icon.setAttribute("class", this.#collapsedIconClasses);
    heading.appendChild(this.#icon);

    const text = document.createTextNode(` ${title}`);
    heading.appendChild(text);

    heading.addEventListener("click", () => this.#nextState());

    this.appendChild(heading);
  }

  /**
   * Move to the next state.
   */
  #nextState() {
    if (this.#state === State.COLLAPSED) {
      this.#state = State.EXPANDED;
      this.#icon.setAttribute("class", this.#expandedIconClasses);
    } else {
      this.#state = State.COLLAPSED;
      this.#icon.setAttribute("class", this.#collapsedIconClasses);
    }
  }
}

customElements.define("collapsing-heading", CollapsingHeading);
