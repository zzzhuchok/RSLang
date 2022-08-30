import headerEl from "./components/header/header";
import mainEl from "./components/main/main";
import footerEl from "./components/footer/footer";
import "./components/main/main.css";
import mainBooksEl from "./components/pages/books/books"

export class MainPage {
    drawMainComponents(): void {
  
      const bodyEl = document.body as HTMLBodyElement;
      bodyEl.appendChild(headerEl());
      bodyEl.appendChild(mainEl());
      bodyEl.appendChild(footerEl());
    }

    drawBookComponents():void {
      const bodyEl = document.body as HTMLBodyElement;
      bodyEl.appendChild(headerEl());
      bodyEl.appendChild(mainBooksEl());
      bodyEl.appendChild(footerEl());
    }
}

