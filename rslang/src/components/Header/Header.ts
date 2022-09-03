import { TextBook } from "../../pages/TextBook/TextBook";
import { LocalStoreAPI } from "../../services/API/LocalStoreAPI";
import { Authentication } from "../Authentication/Authentication";

export class Header {
  authentication = new Authentication();
  textbook = new TextBook();
  localStore = new LocalStoreAPI();

  init = (): void => {
    this.drawHeader();
    this.listen();
    this.authentication.init();
  };

  drawHeader = (): void => {
    const pageElement = document.querySelector("#page") as HTMLElement;
    const header = document.createElement("header");
    header.className = "header";
    header.setAttribute("id", "header");
    header.innerHTML = this.getHeaderHtml();
    pageElement.prepend(header);
  };

  getHeaderHtml = (): string => {
    const { isAuth, name = "anonymous" } = this.localStore.getUser();
    const userName = isAuth ? name : "";
    const userStateAuth = isAuth ? "" : "hidden";
    const btnAuthState = isAuth ? "hidden" : "";

    return `
      <div class="header__container">
        <a class="header__logo" href="#!">
          <img src="./logo.svg" alt="logo" id="mainPage">
        </a>
        <nav class="header__nav" id="nav">
          <a class="header__nav-link" href="#!" id="textBook">Учебник</a>
          <a class="header__nav-link" href="#!" id="miniGames">Мини-игры</a>
          <a class="header__nav-link" href="#!" id="statistic">Статистика</a>
          <a class="header__nav-link" href="#!" id="team">О команде</a>
        </nav>
        <div class="header__auth" id="blockHeaderkAuth">
          <div class="header__user-name ${userStateAuth}" id="userProfile">${userName}</div>
          <button class="header__btn-login btn btn--primery ${btnAuthState}" id="login">Вход</button>
          <button class="header__btn-reg btn ${btnAuthState}" id="registration">Регистрация</button>
          <button class="header__btn-logout btn--img ${userStateAuth}" type="button" id="logout">
            <img src="./icons/logout.svg" alt="">
          </button>
        </div>
      </div>
    `;
  };

  /* HANDLERS */
  handleHeaderClick = (evt: Event): void => {
    evt.preventDefault();
    const elem = evt.target as HTMLButtonElement;

    if (elem.closest("#blockHeaderkAuth")) {
      if (elem.id === "login") {
        (document.getElementById("formAuth") as HTMLElement).innerHTML =
          this.authentication.getFormHtml("login");
        document.getElementById("popupFormAuth")?.classList.remove("hidden");
      }

      if (elem.id === "registration") {
        (document.getElementById("formAuth") as HTMLElement).innerHTML =
          this.authentication.getFormHtml("registration");
        document.getElementById("popupFormAuth")?.classList.remove("hidden");
      }

      if (elem.closest("#logout")?.id === "logout") {
        this.authentication.logoutUser();
      }
    }

    if (elem.closest("#nav") || elem.closest("#mainPage")) {
      switch (elem.id) {
        case "mainPage":
          console.log("mainPage");
          break;
        case "textBook":
          this.textbook.drawTextBookComponents();
          break;
        case "miniGames":
          console.log("miniGames");
          break;
        case "statistic":
          console.log("statistic");
          break;
        case "team":
          console.log("team");
          break;
        default:
          break;
      }
    }
  };

  listen(): void {
    document
      .querySelector("#header")
      ?.addEventListener("click", this.handleHeaderClick);
  }
}
