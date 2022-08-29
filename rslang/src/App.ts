import { MainPage } from "./components/main/main";

export default class App {
  mainPage = new MainPage();

  start() {
    this.mainPage.drawTestComponents();
  }
}