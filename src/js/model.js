import { API_URl, IMAGE_URL, CREW_URL, RES_PER_PAGE } from "./helper";
import { AJAX } from "./helper";

const state = {
  movie: {},
  search: {
    query: "",
    results: [],
    currentPage: 1,
    RES_PER_PAGE,
  },
  favourites: [],
  watchLater: [],
};

const loadMovie = async function (id) {
  try {
    const crew_Data = await AJAX(
      `https://api.themoviedb.org/3/movie/${id.slice(
        1
      )}/credits?api_key=d2082228c7efcc22b9d36dac09154033`
    );
    const data = await AJAX(
      `https://api.themoviedb.org/3/movie/${id.slice(
        1
      )}?api_key=d2082228c7efcc22b9d36dac09154033`
    );
    const slider_Images = await AJAX(
      `https://api.themoviedb.org/3/movie/${id.slice(
        1
      )}/images?api_key=d2082228c7efcc22b9d36dac09154033`
    );
    // console.log(data);
    // console.log(crew_Data);

    const slider_Backdrops = slider_Images.backdrops
      .filter((ele) => ele.height === 1080)
      .map((ele) => (ele.file_path = IMAGE_URL + ele.file_path))
      .slice(0, 4);

    const cast = crew_Data.cast.map((ele) => ele.name);
    const director = [
      ...new Set(
        crew_Data.crew
          .filter((ele) => ele.known_for_department === "Directing")
          .map((ele) => ele.name)
      ),
    ];

    // if (!res.ok) throw new Error(`${res.status}${res.statusText}`);
    state.movie = {
      id: data.id,
      poster: IMAGE_URL + data.poster_path,
      title: data.original_title,
      overview: data.overview,
      Date: data.release_date,
      runtime: data.runtime,
      genres: data.genres,
      adult: data.adult,
      tagline: data.tagline || "no specific tagline",
      revenue: data.revenue,
      popularity: data.popularity,
      stars: data.vote_average,
      backPoster: IMAGE_URL + data.backdrop_path,
      cast: cast,
      director: director,
      language: data.original_language,
      slider_Backdrops,
    };

    if (state.favourites.some((mov) => mov.id === state.movie.id)) {
      state.movie.fav_Marked = true;
    } else {
      state.movie.fav_Marked = false;
    }
    if (state.watchLater.some((mov) => mov.id === state.movie.id)) {
      state.movie.watch_later = true;
    } else {
      state.movie.watch_later = false;
    }
  } catch (err) {
    throw err;
  }
};

const loadSearchedMovie = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(
      `https://api.themoviedb.org/3//search/movie?query=${query}&api_key=d2082228c7efcc22b9d36dac09154033`
    );
    state.search.results = data.results.map((movie) => {
      return {
        id: movie.id,
        poster: IMAGE_URL + movie.poster_path,
        title: movie.original_title,
        overview: movie.overview,
        Date: movie.release_date,
        adult: movie.adult,
        backPoster: IMAGE_URL + movie.backdrop_path,
      };
    });
  } catch (err) {
    throw err;
  }
};
const settingLocalStorage = function () {
  localStorage.setItem("favourites", JSON.stringify(state.favourites));
};
const settingWLstorage = function () {
  localStorage.setItem("watchlaters", JSON.stringify(state.watchLater));
};

const getPagesOfResults = function (page = state.search.currentPage) {
  const start = (page - 1) * state.search.RES_PER_PAGE;
  const end = page * state.search.RES_PER_PAGE;
  state.search.currentPage = page;

  return state.search.results.slice(start, end);
};

const getPagesOfResultsSorted = function (
  page = state.search.currentPage,
  sort = false
) {
  const start = (page - 1) * state.search.RES_PER_PAGE;
  const end = page * state.search.RES_PER_PAGE;
  state.search.currentPage = page;

  const sw = sort
    ? state.search.results.slice(start, end).sort((a, b) => {
        return new Date(a.Date) - new Date(b.Date);
      })
    : state.search.results.slice(start, end);
  if (!sw) return;
  return sw;
};

export { getPagesOfResultsSorted };
const AddFavourite = function (movie) {
  //setting state
  state.favourites.push(movie);

  //adding a property to keep track of favourite marked movies
  if (movie.id === state.movie.id) {
    state.movie.fav_Marked = true;
  }
  settingLocalStorage();
};
const DeleteFavourite = function (id) {
  const index = state.favourites.findIndex((ele) => ele.id == id);
  state.favourites.splice(index, 1);
  if (id === state.movie.id) {
    state.movie.fav_Marked = false;
  }
  settingLocalStorage();
};

export {
  loadMovie,
  state,
  loadSearchedMovie,
  getPagesOfResults,
  AddFavourite,
  DeleteFavourite,
  addWatchLater,
  deleteWatchLater,
};

const addWatchLater = function (movie) {
  state.watchLater.push(movie);
  if (movie.id === state.movie.id) {
    state.movie.watch_later = true;
  }
  settingWLstorage();
};
const deleteWatchLater = function (id) {
  const index = state.watchLater.findIndex((ele) => ele.id === id);
  state.watchLater.splice(index, 1);
  if (id === state.movie.id) {
    state.movie.watch_later = false;
  }
  settingWLstorage();
};
const loadStorage = function () {
  const storage = localStorage.getItem("favourites");
  if (storage) state.favourites = JSON.parse(storage);
};

loadStorage();
const loadStorageWL = function () {
  const storage = localStorage.getItem("watchlaters");
  if (storage) state.watchLater = JSON.parse(storage);
};
loadStorageWL();
