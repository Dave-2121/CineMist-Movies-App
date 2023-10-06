import spinner_img from "../../img/spinner.png";
import View from "./View";
class sortView extends View {
  _parentEl = document.querySelector(".search-results");
  renderSort() {
    const markup = `<div>
    <button class="sort-Btn">
      <i class="fa-solid fa-sort"></i>
      <span class="tooltip">Sort by Date</span>
    </button>
  </div>`;
    document
      .querySelector(".results")
      .insertAdjacentHTML("beforebegin", markup);
  }
  addHandlerSort(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const click = e.target.closest(".sort-Btn");
      if (!click) return;
      handler();
    });
  }
}

export default new sortView();
