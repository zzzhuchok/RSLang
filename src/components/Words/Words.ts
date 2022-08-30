import { URL } from "../../services/api";
import { isAuthorized } from "../../services/isAuthorized";
import { IWord } from "../../type/IWord";
import { AudioComponents } from "../Audio/AudioComponents";

export class Words {
  drawWords(data: Array<IWord>) {
    const textbookItems = document.querySelector(
      ".textbook__items"
    ) as HTMLElement;
    textbookItems.innerHTML = "";
    data.map((item: IWord) => {
      const itemEl = document.createElement("div") as HTMLElement;
      const audio = new AudioComponents();
      itemEl.classList.add("item");
      if (isAuthorized()) {
        itemEl.classList.add("hard");
      }
      itemEl.innerHTML = `
        <div class="item__image-container">
          <img src="${URL}/${item.image}" alt="photo:${item.word}">
        </div>
        <div class="item__info">
          <div class="info__header">
            <span class="header__line"></span>
            <div class="header__container">
              <div class="title-transcription-block">
                <span class="title">${item.word}</span>
                <span class="transcription">${item.transcription}</span>
              </div>
              <span class="translate">${item.wordTranslate}</span>
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
          <audio id="audio-${item.id}" src="${URL}/${item.audio}"></audio>
            ${
              isAuthorized()
                ? `
            <div class="counter-audio__container">
              <div class="item__counter-word">
                <div class="counter-word__correct">2</div>  
                <div class="counter-word__mistake">6</div>  
              </div>
              <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
            </div>
            <div class="last-column__buttons">
              <button class="item__hard-button">Сложно</button>
              <button class="item__learn-button">Изучено</button>
            </div>
            `
                : `
            <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
            `
            }
        </div>
          `;
      textbookItems.appendChild(itemEl);
      audio.isAudioIconClick(item.id, item);
    });
  }
}
