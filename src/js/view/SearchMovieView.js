import View from "./View";
class SearchMovie extends View {
  _ErrorMessage = "There was no results for this query 😫";
  _parentEl = document.querySelector(".form");
  _getMovieQuery() {
    return this._parentEl.querySelector("input").value;
  }
  _clearSearch() {
    this._parentEl.querySelector("input").value = "";
    this._parentEl.querySelector("input").blur();
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchMovie();
