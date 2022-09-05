import Router from "./Router";
import "./RouteConstants";

import { TextBook } from "../../pages/TextBook/TextBook";
import { App } from "../../App";
import RouteConstants from "./RouteConstants";
import { Games } from "../../pages/Games/Games";
import { AboutPage } from "../../pages/AboutPage/AboutPage";
import { StatPage } from "../../pages/StatPage/StatPage";

const app = new App();
const books = new TextBook();
const games = new Games();
const about = new AboutPage();
const stat = new StatPage();

const router = new Router({
    mode: 'hash',
    root: '/'
  });

export function RouteStatus () {
  router.add(RouteConstants.BOOKS_PATH, () => {
    books.drawTextBookComponents();
  })
  .add(RouteConstants.ABOUT_PATH, () => {
    about.drawPage();
  })
  .add(RouteConstants.GAMES_PATH, () => {
    games.init();
  })
  .add(RouteConstants.STAT_PATH, () => {
    stat.init();
  })
  .add(RouteConstants.EMPTY_FILLER, () => {
    app.init();
  })
}
