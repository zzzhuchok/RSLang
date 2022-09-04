/* eslint-disable @typescript-eslint/no-misused-promises */
import { LearnWordsAPI } from '../../services/API/LearnWordsAPI';

export class Games {

  learnWords = new LearnWordsAPI();

  init() {
    this.drawPage();
    this.listen();
  }

  drawPage = () => {
    (document.querySelector('main') as HTMLElement).innerHTML = this.getGamePagesHTML();
  }

  getGamePagesHTML = () => {
    return `
      <section class="games" id="sectionGames">
        <div class="games__container">
          <div class="games__item game audiocall">
            <img src="./audioGameIcon.svg" alt="icon">
            <h3 class="game__title">Аудиовызов</h3>
            <div class="game__description">
              Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова.
            </div>
            <div class="game__block-levels">
              ${this.getLevelGameLinks('audiocall')}
            </div>
          </div>
          <div class="games__item game sprint">
            <img src="./sprintGameIcon.svg" alt="icon">
            <h3 class="game__title">Спринт</h3>
            <div class="game__description">
              Тренерует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову.
            </div>
            <div class="game__block-levels">
              ${this.getLevelGameLinks('sprint')}
            </div>

          </div>
        </div>

    `
  }

  private getLevelGameLinks(nameGame: string, numberOfLevels = 6) {
    let result = '';

    for (let i =0; i < numberOfLevels; i++) {
      const level = document.createElement('a');
      level.className = `game__level game__level--${i+1}`
      level.setAttribute('data-page-words', `${i}`);
      level.setAttribute('href', `#/games/${nameGame}/level-${i}`);
      level.textContent = `${i+1}`;
      result = result.concat(`${level.outerHTML}\n`)
    }

    return result;
  }


  /* HANDLERS */
  handleBtnLevelsClick = (evt: Event) => {
    evt.preventDefault();
    const elem = evt.target as HTMLElement;

    if (elem.hasAttribute('data-page-words')) {

      const level = Number(elem.dataset.pageWords);
      import('../GameSprint/GameSprint')
        .then(component => {
          const sprintGame = new component.SprintGame({state: 'games', level});
          sprintGame.init().catch(err => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }

  listen() {
    document.querySelector('#sectionGames')?.addEventListener('click', this.handleBtnLevelsClick);
  }
}