import spinner_img from "../../img/spinner.png";
export default class View {
  _parentEl = document.querySelector("*");
  _data;
  _ErrorMessage;

  render(data) {
    this._data = data;
    this._clear();
    const movieMarkup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML("afterbegin", movieMarkup);
  }
  _clear() {
    this._parentEl.innerHTML = "";
  }
  renderSpinner() {
    const spinnerMarkup = `<div class="spinner"><img src="${spinner_img}" class="spinner-png"/>
            </div>`;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }
  renderError(msg = this._ErrorMessage) {
    const errorMarkup = `  <div class="error">
    <p>${msg}</p>
  </div>`;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", errorMarkup);
  }
}
