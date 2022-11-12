export default class DismissableAlert extends HTMLElement {
  #root;

  constructor(attrs) {
    super();

    this.#root = document.createElement("div");
    this.#root.setAttribute(
      "class",
      "alert alert-info alert-dismissible fade show"
    );
    this.#root.setAttribute("role", "alert");

    this.#root.innerText = this.getAttribute("message") ?? attrs?.message;

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
