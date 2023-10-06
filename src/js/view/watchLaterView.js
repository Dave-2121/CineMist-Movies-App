import View from "./View";
class watchlaterView extends View {
  _parentEl = document.querySelector(".watch-later-list");
  _generateMarkup() {
    return this._data
      .map((ele) => {
        return ` <li class="watch-later-item" data-x='${ele.id}'>
        <div class="watch-later-img">
          <img src="${
            !ele.poster.includes("null") ? ele.poster : ele.backPoster
          }" alt="" />
        </div>
        <p class="watch-later-description">${ele.title}</p>
        <button class="watch-later-deleteBtn">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </li>`;
      })
      .join("");
  }
  addHandlerRender(handler) {
    ["load"].forEach((ele) => window.addEventListener(ele, handler));
  }
}

export default new watchlaterView();
