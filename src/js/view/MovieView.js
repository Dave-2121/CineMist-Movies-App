import spinner_img from "../../img/spinner.png";
import View from "./View";

class MovieView extends View {
  _ErrorMessage = "There was no results for this search!please try again😣";
  _parentEl = document.querySelector(".movie-results");
  _generateMarkup() {
    // console.log(this._data);

    return `<div class="flex-up">
        <div class="movie__fig">
          <img src="${
            !this._data.poster.includes("null")
              ? this._data.poster
              : this._data.backPoster
          }" alt="" class="movie-img" />
        </div>
        <div class="movie__fig-details">
          <h2 class="movie-title">${this._data.title}</h2>
          <div class="movie-rating">
            <i class="fa-solid fa-star star"></i>
            <h3>${Math.ceil(this._data.stars)}</h3>
          </div>
          <div class="popularity">
          <i class="fa-solid fa-fire"></i>
          <h3>${Math.round(this._data.popularity).toFixed(0)}</h3>
          </div>
          <div class="details">
            <span>${this._data.adult ? "RATED R" : "PG-13"}</span>
            <span>${this._data.Date ? this._data.Date : "In Production"}</span>
            <span>${this._data.runtime} mins</span>
          </div>
          <div class="genre">
            ${this._data.genres
              .map((ele, _, arr) => {
                if (arr.length <= 3) {
                  return `<div>${ele.name}</div>`;
                }
              })
              .join("")}
          </div>
          <button class="fav-btn">
            <i class="fa-solid fa-heart ${
              this._data.fav_Marked ? "btn-red" : ""
            }"></i>
          </button>
        </div>
        </div>
        </div>
        <div class="flex-down">
        <div class="plot">
          <h1>Plot:</h1>
          <p>
            ${this._data.overview}
          </p>
        </div>
        <div class="cast">
          <h1>Details:</h1>
          <p><span>cast:</span> ${this._data.cast
            .slice(0, 5)
            .join(",")
            .trim()}...</p>
          <p><span>directors:</span> ${
            this._data.director.length > 0
              ? this._data.director.join(",")
              : "N/A"
          }</p>
          <p><span>tagline:</span> ${this._data.tagline}</p>
          <p><span>revenue:</span> ${
            this._data.revenue
              ? `${this._data.revenue} <span id='dollar'>$</span>`
              : "N/A"
          }</p>
          <p><span>language:</span> ${this._data.language.toUpperCase()}</p>
        </div>
        <div class="slider">
        ${this._data.slider_Backdrops
          .map((ele) => {
            return `
          <div class="slides">
         <img src="${ele}" alt="">
         </div>
          `;
          })
          .join("")}
      
        <button class="prev_btn"><span>&#8249;</span></button>
        <button class="next_btn"><span>&#8250;</span></button>
      </div>
        <div class="watch-later-button">
          <button class="btn-wl">
            <span>add to watch later</span>
            <i class="fa-regular fa-clock"></i>
          </button>
        </div>
        </div>
        
      `;
  }
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ele) =>
      window.addEventListener(ele, handler)
    );
  }
  addHandlerFavourite(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const click = e.target.closest(".fav-btn");
      if (!click) return;
      handler();
    });
  }
  addHandlerWL(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const click = e.target.closest(".btn-wl");
      if (!click) return;
      handler();
    });
  }
}

export default new MovieView();

// console.log([1, 2, 3].slice(0, 100));

//Math.round(this._data.popularity).toFixed(0)
