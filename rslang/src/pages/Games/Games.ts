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
        <h2 class="games__title">Список игр</h2>
        <div class="games__levels">
          <button data-page-words="0">0</button>
        </div>
      </section>
    `
  }


  /* HANDLERS */
  handleBtnLevelsClick = (evt: Event) => {
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