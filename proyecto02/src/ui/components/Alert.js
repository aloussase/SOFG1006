export default class DismissableAlert extends HTMLElement {
  #root;

  constructor() {
    super();

    this.#root = document.createElement("div");
    this.#root.setAttribute(
      "class",
      "alert alert-warning alert-dismissible fade show"
    );
    this.#root.setAttribute("role", "alert");

    const message = this.getAttribute("message");
    this.#root.innerText = message;

    const dismissButton = document.createElement("button");
    dismissButton.setAttribute("type", "button");
    dismissButton.setAttribute("class", "btn-close");
    dismissButton.setAttribute("data-bs-dismiss", "alert");
    dismissButton.setAttribute("aria-label", "close");

    this.#root.appendChild(dismissButton);

    this.appendChild(this.#root);
  }
}

customElements.define("dismissable-alert", DismissableAlert);
