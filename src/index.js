import Notiflix from 'notiflix';
import PicturesAPIService from './js/fetchitems';

const refs = {
  input: document.querySelector('input[name="searchQuery"]'),
  button: document.querySelector('button[name="searchButton"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};

const picturesAPIService = new PicturesAPIService();

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
  refs.loadMoreButton.classList.add('visually-hidden');
  refs.gallery.innerHTML = '';
};

const handleSearch = e => {
  e.preventDefault();

  picturesAPIService.query = refs.input.value.trim();
  if (picturesAPIService.query === '') {
    return Notiflix.Notify.failure('Enter something...');
  }

  picturesAPIService.resetPage();
  picturesAPIService.fetchQuery().then(({ totalHits, hits }) => {
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearMarkup();
      return;
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    clearMarkup();
    renderImgsList(hits);
    if (refs.loadMoreButton.classList.contains('visually-hidden')) {
      refs.loadMoreButton.classList.remove('visually-hidden');
    }
  });
};

const onLoadMore = () => {
  picturesAPIService.fetchQuery().then(({ hits }) => renderImgsList(hits));
};

refs.button.addEventListener('click', handleSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);
