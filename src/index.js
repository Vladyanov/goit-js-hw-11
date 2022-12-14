import Notiflix from 'notiflix';
import { fetchQuery } from './js/fetchitems';

const refs = {
  input: document.querySelector('input[name="searchQuery"]'),
  button: document.querySelector('button[name="searchButton"]'),
  gallery: document.querySelector('.gallery'),
};

const renderImgsList = imgsArray => {
  const markupImgsList = imgsArray
    .map(
      ({
        likes,
        views,
        comments,
        downloads,
        webformatURL,
        tags,
        largeImageURL,
      }) => {
        return `
    <div class="photo-card">
      <a  href="${largeImageURL}" class="gallery__link">
        <img class="gallery__image" src="${webformatURL}" 
           alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
    </div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markupImgsList);
};

const clearMarkup = () => {
  refs.gallery.innerHTML = '';
};

const handleSearch = e => {
  e.preventDefault();
  clearMarkup();
  const queryValue = refs.input.value.trim();
  fetchQuery(queryValue).then(({ totalHits, hits, total }) => {
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearMarkup();
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    renderImgsList(hits);
  });
};

refs.button.addEventListener('click', handleSearch);
