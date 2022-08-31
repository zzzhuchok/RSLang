import { EnglishLevel } from "../../components/EnglishLevel/EnglishLevel";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import { Words } from "../../components/Words/Words";
import { LearnWordsAPI } from "../../services/API/LearnWordsAPI";

import { store } from "../../services/store";

export class TextBook {
  learnword = new LearnWordsAPI();
  onFilterChange = (): void => {
    Loading();
    void this.learnword
      .getWordsAPI(store.group, store.activePage - 1)
      .then((data) => {
        if (store.group > 5) {
          alert("Hard WORDS!");
        } else {
          this.words.drawWords(data);
        }
      })
      .finally(() => {
        localStorage.setItem("page", String(store.activePage + 1));
        localStorage.setItem("group", String(store.group));
      });
  };

  englishLevel = new EnglishLevel(this.onFilterChange);
  pagination = new Pagination(this.onFilterChange);
  words = new Words();

  drawTextBookComponents() {
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
    this.englishLevel.drawEnglishLevel();
    void this.learnword
      .getWordsAPI(store.group, store.activePage - 1)
      .then((data) => {
        this.words.drawWords(data);
      });
  }
}
