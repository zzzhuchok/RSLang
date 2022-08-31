import { EnglishLevel } from "../../components/EnglishLevel/EnglishLevel";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "../../components/Pagination/Pagination";
import { Words } from "../../components/Words/Words";
import { getWords } from "../../services/api";
import { store } from "../../services/store";

export class TextBook {
  onFilterChange = async (): Promise<void> => {
    Loading();
    const data = await getWords(store.activePage - 1, store.group);
    if (store.group > 5) {
      alert("Hard WORDS!");
    }
    this.words.drawWords(data);
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
    void getWords(store.activePage - 1, store.group).then((data) => {
      this.words.drawWords(data);
    });
  }
}
