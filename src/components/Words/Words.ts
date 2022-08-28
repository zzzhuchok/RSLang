import { URL } from "../../services/api";
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
      itemEl.innerHTML = `
        <img src="${URL}/${item.image}" alt="photo:${item.word}">
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
          <div class="item__example">
            <div class="sentence">${item.textMeaning}</div>
            <div class="sentence_translate">${item.textMeaningTranslate}</div>
          </div>
        </div>
        <audio id="audio-${item.id}" src="${URL}/${item.audio}"></audio>
        <div class="audio" id ="${item.id}">${audio.drawAudioIcon()}</div>
          `;
      textbookItems.appendChild(itemEl);
      audio.isAudioIconClick(item.id, item);
    });
  }
}
