import Router from "./Router";
import "./RouteConstants";

import { TextBook } from "../../pages/TextBook/TextBook";
import { App } from "../../App";
import RouteConstants from "./RouteConstants";
import { Games } from "../../pages/Games/Games";

const app = new App();
const books = new TextBook();
const games = new Games();

const router = new Router({
    mode: 'hash',
    root: '/'
  });

export function RouteStatus () {
  router.add(RouteConstants.BOOKS_PATH, () => {
    books.drawTextBookComponents();
  })
  .add(RouteConstants.GAMES_PATH, () => {
    games.init();
  })
  .add(RouteConstants.EMPTY_FILLER, () => {
    app.init();
  })
}
