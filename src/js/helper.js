const KEY = "api_key=d2082228c7efcc22b9d36dac09154033";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const CREW_URL =
  "https://api.themoviedb.org/3/movie/565770/credits?api_key=d2082228c7efcc22b9d36dac09154033";

const ALL_IMAGES =
  "https://api.themoviedb.org/3/movie/565770/images?api_key=d2082228c7efcc22b9d36dac09154033";
const RES_PER_PAGE = 6;

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! timeout after ${s} seconds`));
    }, s * 1000);
  });
};
const AJAX = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(2.5)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status}${res.statusText}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export { API_URl, IMAGE_URL, CREW_URL, AJAX, RES_PER_PAGE };
