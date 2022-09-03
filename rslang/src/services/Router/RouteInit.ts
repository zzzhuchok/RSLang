import Router from "./Router";
import "./RouteConstants";

import { TextBook } from "../../pages/TextBook/TextBook";
import { App } from "../../App";
import RouteConstants from "./RouteConstants";

const app = new App();
const books = new TextBook();

const router = new Router({
    mode: 'hash',
    root: '/'
  });
  
export function RouteStatus () {
  router.add(RouteConstants.BOOKS_PATH, () => {
    books.drawTextBookComponents();
  })
  .add(RouteConstants.EMPTY_FILLER, () => {
      (document.querySelector('#page') as HTMLElement).innerHTML = "";
      app.start();
  })
}
