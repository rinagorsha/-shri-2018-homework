import dispatcher from 'shri-2018-flux';
import store, { LOCATION_CHANGE } from './store';
import initPage from './page';

(() => {
  const links: NodeListOf<HTMLElement> = document.querySelectorAll('.js-link');
  const main = document.getElementById('main');

  if (!main || !links.length) return;

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', togglePage);
  }

  store.addListener(renderPage);

  // Первая отрисовка страницы
  dispatcher.dispatch({
    type: LOCATION_CHANGE,
    data: store.getState().currentPage,
  });

  function renderPage() {
    if (!main) return;

    const page = store.getState().currentPage;
    fetch(`${page}.html`)
      .then(data => data.text())
      .then((data) => {
        main.innerHTML = data;
        initPage();
      })
      .catch(e => console.error(e));

    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }

    const activeLink = document.querySelector(`.js-link[data-url=${page}]`);
    if (activeLink) activeLink.classList.add('active');
  }

  function togglePage(this: HTMLLinkElement, e: Event) {
    e.preventDefault();
    const { url } = this.dataset;

    dispatcher.dispatch({
      type: LOCATION_CHANGE,
      data: url,
    });
  }
})();
