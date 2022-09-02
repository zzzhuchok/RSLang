import { LearnWordsAPI } from "../../services/API/LearnWordsAPI";
import { LocalStoreAPI } from "../../services/API/LocalStoreAPI";
import { store } from "../../services/store";
import { IWord } from "../../services/Types/Types";
import { AudioComponents } from "../Audio/AudioComponents";

export class Words {
  learnWordsApi = new LearnWordsAPI();
  localStoreApi = new LocalStoreAPI();

  reDraw;

  constructor(reDraw: () => void) {
    this.reDraw = reDraw;
  }

  drawWords(data: Array<IWord>): void {
    const textbookItems = document.querySelector(
      ".textbook__items"
    ) as HTMLElement;
    textbookItems.innerHTML = "";
    data.map((item: IWord) => {
      if (!item) {
        return;
      }
      const itemEl = document.createElement("div") as HTMLElement;
      const audio = new AudioComponents();
      itemEl.setAttribute("id", "item-" + item.id);
      itemEl.classList.add("item");
      itemEl.innerHTML = `
        <div class="item__image-container">
          <img src="${this.learnWordsApi.url}/${item.image}" alt="photo:${
        item.word
      }">
        </div>
        <div class="item__info">
          <div class="info__header">
            <span class="item__header__line"></span>
            <div class="item__header__content">
              <div class="item__title-transcription-block">
                <span class="title-transcription-block__title">${
                  item.word
                }</span>
                <span class="title-transcription-block__transcription">${
                  item.transcription
                }</span>
              </div>
              <span class="title-transcription-block__translate">${
                item.wordTranslate
              }</span>
            </div>
          </div>
          <div class="item__example">
            <div class="sentence">${item.textExample}</div>
            <div class="sentence_translate">${item.textExampleTranslate}</div>
          </div>
          <div class="item__meaning">
            <div class="sentence">${item.textMeaning}</div>
            <div class="sentence_translate">${item.textMeaningTranslate}</div>
          </div>
        </div>
        <div class="item__last-column">
          <audio id="audio-${item.id}" src="${this.learnWordsApi.url}/${
        item.audio
      }"></audio>
      ${
        this.localStoreApi.checkAuthUser()
          ? `
      <div class="counter-audio__container">
        <div class="item__counter-word">
          <div class="counter-word__correct">2</div>  
          <div class="counter-word__mistake">6</div>  
        </div>
        <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
      </div>
      <div class="last-column__buttons">
        <button id ="${
          item.id
        }-hard-button" class="item__hard-button">Сложно</button>
        <button id="${
          item.id
        }-learn-button" class="item__learn-button">Изучено</button>
      </div>
      `
          : `
      <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
      `
      }
      </div>
    `;
      textbookItems.appendChild(itemEl);
      this.listener(item.id, item);
      audio.isAudioIconClick(item.id, item);
    });
  }

  private listener(id: string, item: IWord) {
    if (this.localStoreApi.checkAuthUser()) {
      const hardButton = document.getElementById(
        `${id}-hard-button`
      ) as HTMLButtonElement;
      const learnButton = document.getElementById(
        `${id}-learn-button`
      ) as HTMLButtonElement;

      const { userId } = this.localStoreApi.getUser();

      hardButton.classList.remove("disable");
      learnButton.classList.remove("disable");

      const itemElement = document.getElementById(
        "item-" + item.id
      ) as HTMLElement;

      void this.checkWord("hard", userId, item.id, itemElement, hardButton);
      void this.checkWord("learn", userId, item.id, itemElement, learnButton);

      hardButton?.addEventListener("click", (event) => {
        if (!(event?.target as HTMLButtonElement).classList.contains("disable"))
          this.obButtonsClick("hard", userId, id, item, itemElement);
      });

      learnButton?.addEventListener("click", (event) => {
        if (!(event?.target as HTMLButtonElement).classList.contains("disable"))
          this.obButtonsClick("learn", userId, id, item, itemElement);
      });
    }
  }

  private async checkWord(
    type: string,
    userId: string,
    id: string,
    itemElement: HTMLElement,
    button: HTMLButtonElement
  ): Promise<void> {
    await this.learnWordsApi.isWordUser(type, userId, id).then((answer) => {
      if (answer) {
        itemElement.classList.add(type);
        button.classList.add("disable");
        button.disabled = true;
      }
    });
  }

  private obButtonsClick(
    type: string,
    userId: string,
    id: string,
    item: IWord,
    itemElement: HTMLElement
  ) {
    if (type === "hard") {
      itemElement.classList.remove("learn");
      itemElement.classList.add("hard");
    } else {
      itemElement.classList.remove("hard");
      itemElement.classList.add("learn");
    }
    void this.learnWordsApi.createUserWordAPI(
      {
        difficulty: type,
        optional: { ...item },
      },
      userId,
      id
    );
    if (store.group > 5) {
      itemElement.remove();
    }
  }
}
