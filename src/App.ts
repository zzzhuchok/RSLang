import { TextBook } from "./pages/TextBook/TextBook";

export default class App {
  textBook = new TextBook();

  async start() {
    await this.textBook.drawTextBookComponents();
  }
}
