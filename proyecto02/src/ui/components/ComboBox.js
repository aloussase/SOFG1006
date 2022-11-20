export default class ComboBox extends HTMLElement {
  #value;

  /**
   * Retrieve the currently selected value from this `ComboBox`.
   */
  get value() {
    return this.#value;
  }

  constructor({ name, items }) {
    super();

    const div = document.createElement("div");
    div.setAttribute(
      "class",
      "d-flex align-items-center justify-content-center"
    );

    const label = document.createElement("label");
    label.setAttribute("for", name);
    label.setAttribute("class", "form-label w-100");
    label.textContent = name;

    const select = document.createElement("select");
    select.setAttribute("class", "form-select form-select-md");
    select.setAttribute("name", name);

    select.addEventListener("change", (e) => (this.#value = e.target.value));

    const options = items.map((item) => {
      const option = document.createElement("option");
      option.setAttribute("value", item);
      option.textContent = item;
      return option;
    });

    options.forEach((option) => select.appendChild(option));

    div.appendChild(label);
    div.appendChild(select);

    this.appendChild(div);
  }
}

customElements.define("combo-box", ComboBox);
