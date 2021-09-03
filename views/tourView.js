import View from './View.js';
import icons from '../src/img/icons.svg';

class TourView extends View {
  _parentElement = document.querySelector('.tour');
  _errorMessage = 'Böyle bir yer bulamadık. Lütfen tekrar deneyiniz!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(el => window.addEventListener(el, handler));
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="tour__fig">
      <img src="${this._data.images}" alt="${this._data.tourName}" class="tour__img" />
        <h1 class="tour__title">
          <span>${this._data.tourName}</span>
        </h1>
    </figure>

    <div class="tour__details">
      <div class="tour__info">
        <p>${this._data.tourDescription}</p>
      </div>


      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
        </svg>
      </button>
    </div>

    <div id='map'></div>

    <div class="tour__directions">
        <h2 class="heading--2">Adres</h2>
        <p class="tour__directions-text">
        ${this._data.address}
        
        </p>
        <a
        class="btn--small tour__btn"
        href="${this._data.details_url}"
        target="_blank"
        >
        <span>Detaylı Bigi</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </a>
    </div>
`;
  }
}

export default new TourView();
