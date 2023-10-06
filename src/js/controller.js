import {
  loadMovie,
  state,
  loadSearchedMovie,
  getPagesOfResults,
  AddFavourite,
  DeleteFavourite,
  addWatchLater,
  deleteWatchLater,
  getPagesOfResultsSorted,
} from "./model";
import SearchMovieView from "./view/SearchMovieView";
import ResultsMovieView from "./view/ResultsMovieView";
import "core-js/stable";
import "regenerator-runtime/runtime";
import paginationView from "./view/paginationView";
import FavouritesView from "./view/FavouritesView";

import MovieView from "./view/MovieView";
import watchLaterView from "./view/watchLaterView";
import SortView from "./view/SortView";
// import { search } from "core-js/fn/symbol";

const showMovie = async function () {
  try {
    const id = window.location.hash;
    if (!id) return;
    //rendering spinner
    MovieView.renderSpinner();
    //setting state
    await loadMovie(id);

    //rendering the movie
    MovieView.render(state.movie);
    //slider
    slidesController();
  } catch (err) {
    MovieView.renderError();
  }
};

const SearchMovieController = async function () {
  try {
    //rendering spinner
    ResultsMovieView.renderSpinner();
    //getting query
    const query = SearchMovieView._getMovieQuery();
    if (!query) return;
    SearchMovieView._clearSearch();
    //setting state
    await loadSearchedMovie(query);

    //render sort button
    SortView.renderSort();

    //rendering search results
    ResultsMovieView.render(getPagesOfResults(1));

    //rendering pagination buttons
    paginationView.render(state.search);

    //error
    if (!state.search.results.length > 0) {
      ResultsMovieView.renderError();
    }
  } catch (err) {
    ResultsMovieView.renderError();
  }
};

const PaginationController = function (gotoPage) {
  ResultsMovieView.render(getPagesOfResults(gotoPage));
  paginationView.render(state.search);
};

const favouritesController = function () {
  //adding and deleting favs
  if (!state.movie.fav_Marked) {
    AddFavourite(state.movie);
    MovieView.render(state.movie);
    //slider
    slidesController();
  } else {
    DeleteFavourite(state.movie.id);
    MovieView.render(state.movie);
    //slider
    slidesController();
  }
  //rendering favs
  if (state.favourites.length > 0) {
    FavouritesView.render(state.favourites);
  } else {
    FavouritesView._renderFavError();
  }
};

const favouritesLoadonReload = function () {
  if (state.favourites.length > 0) {
    FavouritesView.render(state.favourites);
  }
};
const WatchLaterController = function () {
  if (!state.movie.watch_later) {
    addWatchLater(state.movie);
    watchLaterView.render(state.watchLater);
    // console.log(state.movie);
  }
};
function x() {
  document
    .querySelector(".watch-later-list")
    .addEventListener("click", function (e) {
      const click = e.target.closest(".watch-later-deleteBtn");
      if (!click) return;
      if (click) {
        if (state.watchLater.some((ele) => ele.watch_later === true)) {
          const todelid = click.closest(".watch-later-item").dataset.x;
          deleteWatchLater(+todelid);

          click.closest(".watch-later-item").remove();
          // console.log(state.watchLater);
          e.stopImmediatePropagation();
        }
      }
    });
}

const WatchLterLoadonReload = function () {
  if (state.watchLater.length > 0) {
    watchLaterView.render(state.watchLater);
  }
};

function slidesController() {
  const slides = document.querySelectorAll(".slides");
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * i}%)`;
  });
  let cur_Slide = 0;
  const nextBtn = document.querySelector(".next_btn");
  const prevBtn = document.querySelector(".prev_btn");
  nextBtn.addEventListener("click", function () {
    if (cur_Slide >= slides.length - 1) {
      cur_Slide = 0;
    } else {
      cur_Slide++;
    }

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - cur_Slide)}%)`;
    });
  });
  prevBtn.addEventListener("click", function () {
    if (cur_Slide === 0) {
      cur_Slide = slides.length - 1;
    } else {
      cur_Slide--;
    }

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - cur_Slide)}%)`;
    });
  });
}
let sort = false;
const sortController = function () {
  // console.log(getPagesOfResultsSorted());
  // console.log(state.search.currentPage);
  ResultsMovieView.render(
    getPagesOfResultsSorted(state.search.currentPage, !sort)
  );
  sort = !sort;
};

const init = function () {
  MovieView.addHandlerRender(showMovie);
  SearchMovieView.addHandlerSearch(SearchMovieController);
  paginationView.addHandlerPagination(PaginationController);
  ResultsMovieView._ClickLink();
  MovieView.addHandlerFavourite(favouritesController);
  FavouritesView._ClickLink();
  FavouritesView.addHandlerRender(favouritesLoadonReload);
  MovieView.addHandlerWL(WatchLaterController);
  watchLaterView.addHandlerRender(WatchLterLoadonReload);
  x();
  SortView.addHandlerSort(sortController);
};

init();
