import Router from "./Router";
import "./RouteConstants";

import { TextBook } from "../../pages/TextBook/TextBook";
import { App } from "../../App";
import RouteConstants from "./RouteConstants";
import { Games } from "../../pages/Games/Games";
import { LocalStoreAPI } from "../API/LocalStoreAPI";
import { SprintGame } from "../../pages/GameSprint/GameSprint";

const app = new App();
const books = new TextBook();
const games = new Games();
const localStore = new LocalStoreAPI();

const router = new Router({
    mode: 'hash',
    root: '/'
  });

export function RouteStatus () {
  router
    .add(/books\/sprint/, () => {
      const group = localStore.getValue('group');
      const pageTextbook = localStore.getValue('page');
      const sprintGame = new SprintGame({state: 'textbook', level: group as number, page: (pageTextbook as number) - 1});
      sprintGame.init().catch(err => console.log(err));
    })
    .add(/books/, () => {
      books.drawTextBookComponents();
    })
    .add(/games\/sprint\/level-(.*)/, () => {
      const arrPath = window.location.hash.split('/');
      const levelInPathReg = arrPath[arrPath.length - 1].match(/\d+/);

      if (levelInPathReg?.length) {
        const levelGame = +levelInPathReg[0];
        const sprintGame = new SprintGame({state: 'games', level: levelGame});
        sprintGame.init().catch(err => console.log(err));
      }
    })
    .add(/games/, () => {
      games.init();
    })
    .add(RouteConstants.EMPTY_FILLER, () => {
      app.init();
    })
}
