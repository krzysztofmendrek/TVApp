import { createDOMElem } from "./DOMinteractions.js";

export default class CardComponent {
  constructor(show, callbackFn) {
    this.btnFunc = callbackFn;
    this.show = show;
    this.card = createDOMElem('div', 'card');
  }

  createDetailedCard = () => {
    const divCardBody = createDOMElem('div', 'card-body');
    const h5 = createDOMElem('h5', 'card-title', this.show.name);
    const btn = createDOMElem('button', 'btn btn-primary', 'Show details');
    
    let img, p, pGenres, pRuntime, pCast;

    if(this.show.image) {
      if(isDetailed){
        img = createDOMElem('div', 'card-preview-bg');
        img.style.backgroundImage = `url('${this.show.image.original}')`
      } else {
        img = createDOMElem('img', 'card-img-top', null, this.show.image.medium);
      }
    } else if (isDetailed) {
      img = createDOMElem('img', 'card-img-top', null, 'https://via.placeholder.com/210x75');
    } else {
      img = createDOMElem('img', 'card-img-top', null, 'https://via.placeholder.com/210x295');
    }

    if(this.show.summary) {
      if(isDetailed) {
        p = createDOMElem('p', 'card-text', this.show.summary.replace(/(<([^>]+)>)/ig,""));
      } else {
        p = createDOMElem('p', 'card-text', `${this.show.summary.replace(/(<([^>]+)>)/ig,"").slice(0, 100)}...`);
      }
    } else {
      p = createDOMElem('p', 'card-text', "This show has no summary yet");
    }

    if(isDetailed) {
      let casts = '';
      for (let [i, { person }] of this.show._embedded.cast.entries()) {
        if (i === this.show._embedded.cast.length - 1) {
          casts = casts + person.name;
        } else {
          casts = casts + person.name + ', ';
        }
      }
      pCast = createDOMElem('p', '', casts);
    }

    const btnReturn = createDOMElem('button', 'btn btn-secondary', 'Close details');
    btn.dataset.showId = this.show.id;
    btnReturn.dataset.showId = this.show.id;
    
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    if(isDetailed && this.show.genres) {
      pGenres = createDOMElem('p', 'card-text', `Genre: ${this.show.genres}`);
      divCardBody.appendChild(pGenres);
    };
    if(isDetailed && this.show.runtime) {
      pRuntime = createDOMElem('p', 'card-text', `Runtime: ${this.show.runtime} minutes`);
      divCardBody.appendChild(pRuntime);
    };

    if (pCast) {
      divCardBody.appendChild(pCast);
    }

    if(isDetailed) {
      divCardBody.appendChild(btnReturn);
      btnReturn.addEventListener('click', this.closeDetailsView);
    } else {
      divCardBody.appendChild(btn);
      btn.addEventListener('click', this.openDeatilsView);
    }
    
    return divCard;
  }

  createPreviewCard = () => {
    const divCardBody = createDOMElem('div', 'card-body');
    const h5 = createDOMElem('h5', 'card-title', this.show.name);
    const btn = createDOMElem('button', 'btn btn-primary', 'Show details');
    
    let img, p, pCast;

    if(this.show.image) {
      img = createDOMElem('img', 'card-img-top', null, this.show.image.medium);
    } else {
      img = createDOMElem('img', 'card-img-top', null, 'https://via.placeholder.com/210x295');
    }

    if(this.show.summary) {
      p = createDOMElem('p', 'card-text', `${this.show.summary.replace(/(<([^>]+)>)/ig,"").slice(0, 100)}...`);
    } else {
      p = createDOMElem('p', 'card-text', "This show has no summary yet");
    }

    const btnReturn = createDOMElem('button', 'btn btn-secondary', 'Close details');
    btn.dataset.showId = this.show.id;
    btnReturn.dataset.showId = this.show.id;
    
    this.card.appendChild(divCardBody);
    divCardBody.appendChild(img);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);

    if (pCast) {
      divCardBody.appendChild(pCast);
    }

    divCardBody.appendChild(btn);
    btn.addEventListener('click', this.btnFunc);
    
    return this.card;
  }
}
