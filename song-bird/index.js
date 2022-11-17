import './styles/normalize.scss';
import './styles/style.scss';
import './styles/game-page-styles.scss';
import './styles/player.scss';
import './styles/game-result-styles.scss';
import parallax from './functions/design_and_styling/parallax';
import {
  body,
  mainContainer,
  main,
  homeNavButton,
  homePopup,
  homePopupBtnCancel,
  homePopupBtnOk,
  mainWrapper,
  mainText,
  langNavButton,
  mainButton,
  playNavButton,
  playNavLink,
  resultNavButton,
} from './constants/dom/constants_dom';
import renderGamePage from './functions/render_gamepage';
import getRandomNum from './functions/usefull/getRandomNum';
import { mainTextEn, mainTextRus } from './constants/main-text';
import birdsLang from './constants/birdsLang';
import observable from './functions/usefull/observer';
import setLocalStorage from './functions/LS/setLocalStorage';
import renderResultPage from './functions/renderResultPage';
// import gamePageLang from './constants/gamePageLang';

if (window.screen.width > 1400) { // moving background by mousemove
  document.addEventListener('mousemove', parallax);
}
const randomNum = getRandomNum();
const gameLevel = 0;
const score = 0;

let language = '';

if (localStorage.getItem('lang-Sharp13')) {
  language = localStorage.getItem('lang-Sharp13');
  if (language === 'ru') {
    langNavButton.classList.add('rus');
    mainText.innerHTML = mainTextRus;
    langNavButton.textContent = 'RU';
    mainButton.textContent = 'Играть';
    playNavLink.textContent = 'Играть';
    resultNavButton.textContent = 'Результаты';
  }
} else {
  language = 'en';
  langNavButton.classList.remove('rus');
  mainText.innerHTML = mainTextEn;
  langNavButton.textContent = 'EN';
  mainButton.textContent = 'Play';
  playNavLink.textContent = 'Play';
  resultNavButton.textContent = 'Results';
}

const observer = observable();

body.addEventListener('click', (event) => { // -------------------play_Button click---------------
  const { gameWrapper } = renderGamePage(
    birdsLang[language],
    birdsLang[language][gameLevel][randomNum].audio,
    gameLevel,
    randomNum,
    score,
    language,
    observer,
  );

  if (body.classList.contains('game')) return;
  if (event.target.dataset.action !== 'play') return;
  // -------------------avoid many clicks by users
  playNavButton.style.pointerEvents = 'none';
  mainButton.style.pointerEvents = 'none';

  gameWrapper.classList.remove('opacity');
  mainContainer.classList.add('hidden');
  gameWrapper.remove();

  playNavButton.classList.add('game');
  resultNavButton.classList.add('game');

  setTimeout(() => {
    mainContainer.style.display = 'none';
    body.classList.add('game');
    main.append(gameWrapper);

    playNavButton.style.pointerEvents = 'auto';
    mainButton.style.pointerEvents = 'auto';
  }, 700);
});

homeNavButton.addEventListener('click', () => { // -------------------home_Button click---------------
  const gameWrapperToDelete = document.querySelector('.wrapper-game');
  if (gameWrapperToDelete) { // we're on the game page
    mainWrapper.classList.add('opacity-for-homepopup');
    setTimeout(() => {
      homePopup.classList.remove('hidden');
    }, 700);

    homePopupBtnCancel.addEventListener('click', () => {
      mainWrapper.classList.remove('opacity-for-homepopup');
      homePopup.classList.add('hidden');
    });

    homePopupBtnOk.addEventListener('click', () => {
      homePopup.classList.add('hidden');
      mainWrapper.classList.remove('opacity-for-homepopup');
      mainContainer.style.display = 'flex';
      body.classList.remove('game');
      gameWrapperToDelete.remove();
      mainContainer.classList.remove('hidden');

      playNavButton.classList.remove('game');
      resultNavButton.classList.remove('game');
    });
  }
});

langNavButton.addEventListener('click', () => { // -------------------language_Button click---------------
  const scoreInLS = localStorage.getItem('score-Sharp13');
  langNavButton.classList.toggle('rus');
  if (langNavButton.classList.contains('rus')) {
    language = 'ru';
    setLocalStorage(language, scoreInLS);
    observer.update(language);
    mainText.innerHTML = mainTextRus;
    langNavButton.textContent = 'RU';
    mainButton.textContent = 'Играть';
    playNavLink.textContent = 'Играть';
    resultNavButton.textContent = 'Результаты';
  } else {
    language = 'en';
    setLocalStorage(language, scoreInLS);
    observer.update(language);
    mainText.innerHTML = mainTextEn;
    langNavButton.textContent = 'EN';
    mainButton.textContent = 'Play';
    playNavLink.textContent = 'Play';
    resultNavButton.textContent = 'Results';
  }
});

resultNavButton.addEventListener('click', () => { // -------------------results_Button click---------------
  const scoreInLS = localStorage.getItem('score-Sharp13');
  const langInLS = localStorage.getItem('lang-Sharp13');
  if (!body.classList.contains('game')) {
    if (scoreInLS) {
      body.classList.add('noscroll');
      body.append(renderResultPage(scoreInLS, langInLS, observer));
    } else {
      body.classList.add('noscroll');
      body.append(renderResultPage(scoreInLS, langInLS, observer));
    }
  }
});
