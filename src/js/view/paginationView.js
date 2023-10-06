import spinner_img from "../../img/spinner.png";
import View from "./View";
class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");
  _generateMarkup() {
    const NumPages = Math.ceil(
      this._data.results.length / this._data.RES_PER_PAGE
    );
    // console.log(NumPages);

    //page 1 and other pages
    if (this._data.currentPage === 1 && NumPages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.currentPage + 1
      }">
        <span>Page ${this._data.currentPage + 1}</span>
        <i class="fa-solid fa-angle-right"></i>
      </button>`;
    }
    //last page
    if (this._data.currentPage === NumPages && NumPages > 1) {
      return `<button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.currentPage - 1
      }">
        <i class="fa-solid fa-angle-left"></i>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>
    `;
    }
    //other pages
    if (this._data.currentPage < NumPages) {
      return `<button class="btn--inline pagination__btn--prev" data-goto="${
        this._data.currentPage - 1
      }">
        <i class="fa-solid fa-angle-left"></i>
        <span>Page ${this._data.currentPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--next" data-goto="${
        this._data.currentPage + 1
      }">
        <span>Page ${this._data.currentPage + 1}</span>
        <i class="fa-solid fa-angle-right"></i>
      </button>`;
    }

    //only 1 page
    return "";
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const click = e.target.closest(".btn--inline");
      if (!click) return;
      const goto = click.dataset.goto;
      handler(+goto);
    });
  }
}

export default new PaginationView();
