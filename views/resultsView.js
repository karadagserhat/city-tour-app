import View from './View.js';
import previewView from './previewView.js';

import icons from '../src/img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Böyle bir şehir bulamadık. Lütfen tekrar deneyiniz!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  // _generateMarkup() {
  //   return this._data.map(this._generateMarkupPreview).join('');
  // }

  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);

  //   return `
  //     <li class="preview">
  //     <a class="preview__link ${
  //       result.id === id ? 'preview__link--active' : ''
  //     }" href="#${result.id}">
  //       <figure class="preview__fig">
  //         <img src="${result.images}" alt="Test" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${result.tourName}</h4>
  //         <p class="preview__publisher">The Pioneer Woman</p>
  //       </div>
  //     </a>
  //   </li>
  //     `;
  // }
}

export default new ResultsView();
