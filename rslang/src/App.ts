import { MainPage } from "./Render";
// import Router from "./Router";
import "./RouterConstants"
// import RouteConstants from "./RouterConstants";

export default class App {
  mainPage = new MainPage();

  start() {
    this.mainPage.drawMainComponents();
  }

  books() {
    this.mainPage.drawBookComponents();
  }



  // private initRouter = () => {
  //   new Router({
  //     mode: RouteConstants.HASH,
  //     root: RouteConstants.ROOT,
  //   }).add(RouteConstants.BOOKS_PATH, () => {
  //     alert('Welcome book page');
  //     })
  //   .add(RouteConstants.ABOUT_PATH, () => {
  //       alert('Welcome about page')
  //   })
  // };  
}

