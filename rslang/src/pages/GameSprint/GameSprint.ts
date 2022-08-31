import { Word } from '../../services/Types/Types';

export class SprintGame {

  cntPageWord: number;
  cntWord: number;
  arrWords: Word[][];
  currentWordTranslate: string;
  arrCorrectAnswers: Word[];
  arrIncorrectAnswers: Word[];

  MAX_PAGE = 3;
  MAX_WORDS_PAGE = 20;

  constructor() {
    this.cntPageWord = 0;
    this.cntWord = 0;

    this.arrWords = [];
    this.currentWordTranslate = '';

    this.arrCorrectAnswers = [];
    this.arrIncorrectAnswers = [];
  }

  drawPage = () => {
    (document.querySelector('main') as HTMLElement).innerHTML = `
      <section class="game-sprint" id="gameSprint">
        <div class="game-sprint__wrapper">
          <div class="game-sprint__card-score">24</div>
          <div class="game-sprint__card-word">
            <div class="card-word__top">
              <div class="card-word__progress">
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <img src="./sprint_img-card.png" alt="cat">
            </div>
            <div class="card-word__bottom">
              ${this.getHTMLCard()}
            </div>
          </div>
         </div>
        <div class="game-sprint__timer timer">
          <div class="timer__count">60</div>
        </div>
        <button class="game-sprint__close" id="btnCloseSprint">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.1818L20.7273 22.9091C21.3298 23.5116 22.3066 23.5116 22.9091 22.9091C23.5116 22.3066 23.5116 21.3298 22.9091 20.7273L14.1818 12L22.9091 3.27273C23.5116 2.67023 23.5116 1.6934 22.9091 1.09091C22.3066 0.488417 21.3298 0.488416 20.7273 1.09091L12 9.81818L3.27273 1.09091C2.67023 0.488417 1.6934 0.488417 1.09091 1.09091C0.488417 1.6934 0.488416 2.67023 1.09091 3.27273L9.81818 12L1.09091 20.7273C0.488416 21.3298 0.488417 22.3066 1.09091 22.9091C1.6934 23.5116 2.67023 23.5116 3.27273 22.9091L12 14.1818Z"/>
          </svg>
        </button>

        <div class="game-sprint__popup hidden">
          <div class="popup-sprint">
            <h3 class="popup-sprint__title">Ваш результат: +${100500} очков</h3>
            <div class="popup-sprint__incorrect-answers" id="listIncorrectAnswers">
              <div class="popup-sprint__incorrect-cnt">ОШИБОК: <span id="sprintCntIncorrect">${this.arrIncorrectAnswers.length}</span></div>
            </div>
            <div class="popup-sprint__correct-answers" id="listCorrectAnswers">
              <div class="popup-sprint__correct-cnt">ВЕРНО: <span id="sprintCntCorrect">${this.arrCorrectAnswers.length}</span></div>
            </div>
            <div class="popup-sprint__btns">
              <button class="popup-sprint__btn-relay btn btn--primery" id="sprintStartAgain">Начать заново</button>
              <button class="popup-sprint__btn-exit btn" id="backToGames">К списку игр</button>
            </div>
          </div>
        </div>
      </section>
    `;
    this.listen();
    this.finishGame();
    // this.startTimer();
  }

  drawCardWord = () => {
    (document.querySelector('.card-word__bottom') as HTMLElement).innerHTML = this.getHTMLCard();
    this.listen();
  }

  getHTMLCard = () => {
    console.log(`cntPage: ${this.cntPageWord}; cntWord: ${this.cntWord}`);
    const {word, wordTranslate: translateTrue} = this.arrWords[this.cntPageWord][this.cntWord];
    let randomWordObj = this.getRandomWord();

    while (translateTrue === randomWordObj.wordTranslate) {
      randomWordObj = this.getRandomWord();
    }

    const {wordTranslate: translateFalse} = randomWordObj;

    console.log('TRANSLATES: ',translateTrue, translateFalse);

    const wordTranslate = (Math.random() > 0.5) ? translateTrue : translateFalse;
    this.currentWordTranslate = wordTranslate;

    return `
      <div class="card-word__word-en">${word}</div>
      <div class="card-word__word-ru">${wordTranslate}</div>
      <div class="card-word__block-btn">
        <button class="card-word__btn-no btn btn--incorrect" type="button" data-check-translate="${translateFalse}" id="sprintBtnNo">Неверно</button>
        <button class="card-word__btn-yes btn btn--correct" type="button" data-check-translate="${translateTrue}" id="sprintBtnYes">Верно</button>
      </div>
      <div class="card-word__block-img-btn">
        <img src="./icons/arrow-left.svg" alt="left">
        <img src="./icons/arrow-right.svg" alt="right">
      </div>
    `
  }

  getRandomWord = (): Word => this.arrWords[this.cntPageWord][Math.floor(Math.random() * this.arrWords[this.cntPageWord].length)];

  getResultAnswers = (result: 'correct' | 'incorrect') => {
    const arrAnswer = (result === 'correct') ? this.arrCorrectAnswers : this.arrIncorrectAnswers;
    const fragment = document.createDocumentFragment();
    for (const item of arrAnswer) {
      const div = document.createElement('div');
      div.className = 'popup-sprint__word';
      div.innerHTML = `<span>${item.word}</span> ${item.transcription} - ${item.wordTranslate}`;
      fragment.appendChild(div);
    }
    return fragment;
  }


  startTimer = (): void => {
    const endTime = Date.now() + 15000;

    const timerText = document.querySelector('.game-sprint__timer') as HTMLElement;

    const timer = setInterval(() => {
      const now = Date.now();
      const time = endTime - now;

      if (time >= 0) {
        const sec = Math.floor((time % (1000 * 60)) / 1000);
        timerText.innerHTML = `${sec}`;
      } else {
        console.log('The end...');
        clearInterval(timer);
      }
    }, 1000);
  }

  finishGame = () => {
    setTimeout(() => {
      const popup = document.querySelector('.game-sprint__popup') as HTMLElement;
      popup.classList.remove('active');

      const correctAnswers = this.getResultAnswers('correct');
      const incorrectAnswers = this.getResultAnswers('incorrect');

      (document.getElementById('sprintCntIncorrect') as HTMLElement).innerHTML = this.arrIncorrectAnswers.length.toString();
      (document.getElementById('sprintCntCorrect') as HTMLElement).innerHTML = this.arrCorrectAnswers.length.toString();

      (document.getElementById('listCorrectAnswers') as HTMLElement).appendChild(correctAnswers);
      (document.getElementById('listIncorrectAnswers') as HTMLElement).appendChild(incorrectAnswers);

      console.log('correct: ', this.arrCorrectAnswers);
      console.log('incorrect: ', this.arrIncorrectAnswers);
    }, 15000);
  }



  /* HANDLERS */
  handleBtnsWordCardClick = (evt: Event) => {
    const elem = evt.target as HTMLElement;

    if (elem.hasAttribute('data-check-translate')) {
      const selectTranslate = elem.dataset.checkTranslate;
      const word = this.arrWords[this.cntPageWord][this.cntWord];

      console.log(selectTranslate, this.currentWordTranslate);

      if (selectTranslate === this.currentWordTranslate) {
        console.log(true, 'УГАДАНО', word);
        this.arrCorrectAnswers.push(word);
      } else {
        console.log(false, 'НЕ УГАДАНО: ', this.arrWords[this.cntPageWord][this.cntWord]);
        this.arrIncorrectAnswers.push(word);
      }
    }

    if (elem.classList.contains('btn')) {
      if (this.cntWord < this.MAX_WORDS_PAGE - 1 && this.cntPageWord === this.MAX_PAGE - 1) {
        console.log('слова закончились');
        return;
      }

      if (this.cntWord < this.MAX_WORDS_PAGE - 1) {
        this.cntWord += 1;
      } else {
        this.cntPageWord += 1;
        this.cntWord = 0;
      }

      this.drawCardWord();
    }
  }

  handlePageGameSprintClick = (evt: Event) => {
    const elem = evt.target as HTMLElement;


    if (elem.id === 'sprintStartAgain') {
      this.cntPageWord = 0;
      this.cntWord = 0;
      this.arrCorrectAnswers = [];
      this.arrIncorrectAnswers = [];
      this.drawPage();
    }

    if (elem.id === 'backToGames') {
      console.log('uti-puti');
      import('../Games/Games')
        .then(component => new component.Games().init())
        .catch(err => console.log(err))
    }

    if (elem.closest('#btnCloseSprint')) {
      console.log('closeGame');
      import('../Games/Games')
        .then(component => new component.Games().init())
        .catch(err => console.log(err))
    }
  }

  listen() {
    document.querySelector('.card-word__block-btn')?.addEventListener('click', this.handleBtnsWordCardClick);
    document.querySelector('#gameSprint')?.addEventListener('click', this.handlePageGameSprintClick);

  }
}