import spinner_img from "../../img/spinner.png";
import View from "./View";
class ResultsMovieView extends View {
  _ErrorMessage = "There was no results for this query 😫";
  _parentEl = document.querySelector(".results");
  _generateMarkup() {
    return this._data
      .map((ele) => {
        return ` <li class="preview">
        <a class="preview__link preview__link--active" href="#${ele.id}">
          <figure class="preview__fig">
            <img src="${
              !ele.poster.includes("null") ? ele.poster : ele.backPoster
            }" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${ele.title} ...</h4>
            <p class="preview__publisher">${ele.Date}</p>
          </div>
        </a>
      </li>`;
      })
      .join("");
  }
  _ClickLink() {
    this._parentEl.addEventListener("click", function (e) {
      const all_links = this.querySelectorAll("a");
      all_links.forEach((ele) => {
        ele.classList.remove("active-link");
      });
      const click = e.target.closest("a");
      if (!click) return;
      click.classList.add("active-link");
    });
  }
}

export default new ResultsMovieView();
