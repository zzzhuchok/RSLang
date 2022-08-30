import App from "./App";
import "./style.css";
import Router from "./Router";


const app = new App();

const router = new Router({
    mode: 'hash',
    root: '/'
  });
  
  router
    .add(/about/, () => {
      alert('welcome in about page');
    })
    .add(/books/, () => {
        alert('welcome in books page');
        app.books();
        // const newBody:string = `<div>NEW BODY</div>`;
        // (document.querySelector('.content_wrapper') as HTMLElement).replaceWith(newBody);
    })
    .add(/games/, () => {
        alert('welcome in games page');
      })
    .add(/stat/, () => {
        alert('welcome in statistic page');
    })
    .add('', () => {
        console.log('welcome in catch all controller');
    });


app.start();
