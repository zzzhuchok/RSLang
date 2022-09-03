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
    alert('welcome in books page');
    books.drawTextBookComponents();
  })
  .add(RouteConstants.EMPTY_FILLER, () => {
      console.log('welcome in catch all controller');
      (document.querySelector('#page') as HTMLElement).innerHTML = "";
      app.start();
  })
}
