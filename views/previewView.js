import View from './View.js';

import icons from '../src/img/icons.svg';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
      <a class="preview__link ${this._data.id === id ? 'preview__link--active' : ''}" href="#${
      this._data.id
    }">
        <figure class="preview__fig">
          <img src="${this._data.images}" alt="${this._data.tourName}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this._data.tourName}</h4>
          <p class="preview__publisher">${this._data.cityName}</p>
        </div>
      </a>
    </li>
      `;
  }
}

export default new PreviewView();
