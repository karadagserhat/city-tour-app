import 'regenerator-runtime/runtime';
import 'core-js/';

import * as model from '../models/model.js';
import tourView from '../views/tourView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';
import paginationView from '../views/paginationView.js';
import bookmarksView from '../views/bookmarksView.js';

const controlTour = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    tourView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading Tour
    await model.loadTour(id);

    // 3) Rendering tour
    tourView.render(model.state.tour);

    // 4) Rendering map
    controlMap();
  } catch (err) {
    tourView.renderError();
  }
};

const controlMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2FyYWRhZ3NlcmhhdCIsImEiOiJja3QydnlmYTQwbzVxMnZuejdldzJkZGk5In0.BgX7_F6nbLFU2Q3gl8WZzg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/karadagserhat/ckt2w1qhz2dou17o0c49z9vhf',
    center: model.state.tour.coordinates,
    zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';
  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(model.state.tour.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(model.state.tour.coordinates)
    .setHTML(`<p  style="color:blue; color:#918581" >${model.state.tour.tourName}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(model.state.tour.coordinates);

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

const controlSearchResults = async () => {
  try {
    // 1) Get search query
    const query = searchView.getQuery();

    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = goToPage => {
  // 1) Render new results
  // resultsView.render(model.state.search.results);
  resultsView.render(model.getSearchResultPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlAddBookmark = () => {
  // 1) Add / remove bookmark
  if (!model.state.tour.bookmarked) model.addBookmark(model.state.tour);
  else model.deleteBookmark(model.state.tour.id);

  // 2) Update tour view
  tourView.update(model.state.tour);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);

  controlMap();
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  tourView.addHandlerRender(controlTour);
  tourView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
