import 'regenerator-runtime/runtime';
import 'core-js';

import { API_URL, RES_PER_PAGE } from '../config/config.js';
import { getJSON } from '../helpers/helpers.js';

export const state = {
  tour: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadTour = async id => {
  try {
    const data = await getJSON(`${API_URL}/loc/${id}`);

    const tour = data.data.tour[0].locations[0];

    state.tour = {
      id: tour._id,
      coordinates: tour.coordinates,
      cityName: tour.cityName,
      images: tour.images,
      tourDescription: tour.tourDescription,
      tourName: tour.tourName,
      address: tour.address,
      details_url: tour.details_url,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id)) state.tour.bookmarked = true;
    else state.tour.bookmarked = false;
    // state.recipe.bookmarked = state.bookmarks.some(b => b.id === id);
  } catch (err) {
    // console.error(`${err} 🧨🧨🧨🧨`);
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;

    query = query.toLocaleLowerCase('tr-TR');

    const data = await getJSON(`${API_URL}?name=${query}`);

    state.search.results = data.data.tour[0]?.locations.map(lc => {
      return {
        id: lc._id,
        images: lc.images,
        tourName: lc.tourName,
        cityName: lc.cityName,
      };
    });
    state.search.page = 1;
  } catch (err) {
    // console.error(`${err} 🧨🧨🧨🧨`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results?.slice(start, end);
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = tour => {
  // Add bookmark
  state.bookmarks.push(tour);

  // Mark current tour as bookmarked
  if (tour.id === state.tour.id) state.tour.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = id => {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current tour as NOT bookmarked
  if (id === state.tour.id) state.tour.bookmarked = false;

  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};
// clearBookmarks();  Just Development
