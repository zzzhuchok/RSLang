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
  handleBtnLevelsClick = async (evt: Event) => {
    const elem = evt.target as HTMLElement;

    if (elem.hasAttribute('data-page-words')) {

      const level = Number(elem.dataset.pageWords);
      const arrRandomPage = Array(3).fill(1).map(el => el * Math.floor(Math.random() * 30));

      const arrWordsForGame = await Promise.all(arrRandomPage.map(async (page) => await this.learnWords.getWordsAPI(level, page)));

      // console.log('RandomPage', arrRandomPage);
      // console.log('arrWords', arrWordsForGame);

      // this.sprintGame.arrWords = arrWordsForGame;

      import('../GameSprint/GameSprint')
        .then(component => {
          const sprintGame = new component.SprintGame();
          sprintGame.arrWords = arrWordsForGame;
          sprintGame.drawPage();
        })
        .catch((err) => console.log(err));


      // this.sprintGame.drawPage();
    }

  }


  listen() {
    document.querySelector('#sectionGames')?.addEventListener('click', this.handleBtnLevelsClick);
  }
}