import { mapListToDOMElements } from "./DOMinteractions.js";
import CardComponent from './CardCompontent.js';
import { getShowsByKey, getShowById } from "./requests.js";

class TVApp {
  constructor() {
    this.viewElems = {};
    this.showNameButtons = {};
    this.selectedName = 'harry';
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDOMelements();
    this.setupListeners();
    this.fetchAndDisplayShows();
  }

  connectDOMelements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
    const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);

    this.viewElems = mapListToDOMElements(listOfIds, 'id');
    this.showNameButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');
  }

  setupListeners = () => {
    Object.keys(this.showNameButtons).forEach(showName => {
      this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter);
    })
  }

  setCurrentNameFilter = name => {
    this.selectedName = event.target.dataset.showName;
    this.fetchAndDisplayShows();
  }

  fetchAndDisplayShows = () => {
    getShowsByKey(this.selectedName).then(shows => this.renderCardsOnList(shows));
  }

  renderCardsOnList = shows => {
    Array.from(
      document.querySelectorAll('[data-show-id]')
    ).forEach(btn => btn.removeEventListener('click', this.openDeatilsView));
    this.viewElems.showsWrapper.innerHTML = '';

    for (const { show } of shows) {
      const card = new CardComponent(show, this.openDeatilsView).createPreviewCard();
      this.viewElems.showsWrapper.appendChild(card);
    }
  }

  openDeatilsView = event => {
    const { showId } = event.target.dataset;
    getShowById(showId).then(show => {
      const card = new CardComponent(show).createDetailedCard();
      this.viewElems.showPreview.appendChild(card);
      this.viewElems.showPreview.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  closeDetailsView = event => {
    const { showId } = event.target.dataset;
    const closeBtn = document.querySelector(`[id="showPreview"] [data-show-id="${showId}"]`);
    closeBtn.removeEventListener('click', this.closeDetailsView);
    this.viewElems.showPreview.style.display = 'none';
    this.viewElems.showPreview.innerHTML = '';
    document.body.style.overflow = 'initial';
  }
}

document.addEventListener('DOMContentLoaded', new TVApp());
