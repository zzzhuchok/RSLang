import { EnglishLevel } from "../../components/EnglishLevel/EnglishLevel";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import { Words } from "../../components/Words/Words";
import { LearnWordsAPI } from "../../services/API/LearnWordsAPI";
import { LocalStoreAPI } from "../../services/API/LocalStoreAPI";

import { store } from "../../services/store";
import { IWord } from "../../services/Types/Types";

export class TextBook {
  learnword = new LearnWordsAPI();
  localStoreApi = new LocalStoreAPI();

  onFilterChange = (): void => {
    Loading();

    if (Number(localStorage.getItem("group")) !== store.group) {
      store.activePage = 1;
      this.pagination.drawPagination();
      this.pagination.listener();
    }
    if (store.group > 5) {
      const { userId } = this.localStoreApi.getUser();
      void this.learnword.getAllUserWordsAPI(userId).then((data) => {
        const hardWords = data.map((element) => {
          if (element.difficulty === "hard") return element.optional;
        });
        this.words.drawWords(hardWords as Array<IWord>);
      });
    } else {
      void this.learnword
        .getWordsAPI(store.group, store.activePage - 1)
        .then((data) => {
          this.words.drawWords(data);
        });
    }
    localStorage.setItem("page", String(store.activePage));
    localStorage.setItem("group", String(store.group));
  };

  englishLevel = new EnglishLevel(this.onFilterChange);
  pagination = new Pagination(this.onFilterChange);
  words = new Words();

  drawTextBookComponents(): void {
    const mainEl = document.querySelector("main") as HTMLElement;
    mainEl.innerHTML = `
      <div class="textbook__wrapper">
        <div class="pagination-up">
          <ul class="pagination-content"></ul>
        </div>
        <div class="textbook__block">
          <div class="textbook__items"></div>
          <div class="textbook__level-block"></div>
        </div>
        <div class="pagination-down">
          <ul class="pagination-content"></ul>
        </div>
      </div>
  `;
    Loading();
    this.pagination.drawPagination();
    this.pagination.listener();

    this.englishLevel.drawEnglishLevel();
    this.englishLevel.listener();

    if (store.group > 5) {
      const { userId } = this.localStoreApi.getUser();
      void this.learnword.getAllUserWordsAPI(userId).then((data) => {
        const hardWords = data.map((element) => {
          if (element.difficulty === "hard") return element.optional;
        });
        this.words.drawWords(hardWords as Array<IWord>);
      });
    } else {
      void this.learnword
        .getWordsAPI(store.group, store.activePage - 1)
        .then((data) => {
          this.words.drawWords(data);
        });
    }
  }
}
