/* eslint-disable no-mixed-spaces-and-tabs */
// export class TestComponents {
//   drawTestComponents(): void {
//     const bodyEl = document.body as HTMLBodyElement;

//     const h1El = document.createElement("h1") as HTMLElement;
//     h1El.textContent = "Hello, TestComponent!";
//     bodyEl.appendChild(h1El);
//   }
// }

import "./main.css"

export class TestComponents {
  drawTestComponents(): void {

    const bodyEl = document.body as HTMLBodyElement;

    // const kek = document.createElement("h1") as HTMLElement;
    // bodyEl.appendChild(kek)
    // kek.innerHTML = "RETARD"
    
    // Header
    const headerEl = document.createElement("header") as HTMLBodyElement;
    headerEl.className = "header";
    bodyEl.appendChild(headerEl);

    const headerClassArr: Array<string> = ["app_logo", "header_menu", "app_login", "menu_list"];
    for(let i = 0; i < headerClassArr.length; i++) {
      const headerDivs = document.createElement("div") as HTMLElement;
      headerDivs.className = headerClassArr[i];
      headerEl.appendChild(headerDivs);
    }

    const appLogo = headerEl.querySelector(".app_logo") as HTMLElement;
    const logoImg = document.createElement("div") as HTMLElement;
    logoImg.className = "img_app";
    appLogo.appendChild(logoImg);


    const headerMenu = document.querySelector('.header_menu') as HTMLElement;
    headerMenu.innerHTML = `<div class="header_ennumeration">
    <nav>
      <ul class="menu_links">
        <li><a href="#">Учебники</a></li>
        <li><a href="#">Игры</a></li>
        <li><a href="#">Статистика</a></li>
        <li><a href="#">Настройка</a></li>
      </ul>
    </nav>
  </div>`
    // const appName = headerEl.querySelector(".app-login") as HTMLElement;
    // let headerClassBtn:Array<string> = ["login-btn", "register-btn"];
    // for(let i = 0; i < headerClassArr.length; i++) {
    //   const authElements = document.createElement("button") as HTMLElement;
    //   authElements.innerHTML = "login"
    //   appName.appendChild(authElements);
    // }
    
    const authMenu = document.querySelector('.app_login') as HTMLElement;
    authMenu.innerHTML = `<button class="login-btn">Вход</button>
    <button class="signIn-btn">Регистрация</button>`


    
    const menuList = headerEl.querySelector(".menu_list") as HTMLElement;
    menuList.innerHTML = `<div class="menu">
      <nav>
        <ul>
          <li><a href="#">Учебники</a></li>
          <li><a href="#">Игры</a></li>
          <li><a href="#">Статистика</a></li>
          <li><a href="#">Настройка</a></li>
        </ul>
      </nav>
    </div>`
    const btnMenu = document.createElement("button") as HTMLElement;
    btnMenu.innerHTML = `<div class="menu-btn">
		  <span></span>
		  <span></span>
		  <span></span>
	  </div>`
    headerEl.appendChild(btnMenu);

    const menuBtn = document.querySelector('.menu-btn') as HTMLElement;
    const menu = document.querySelector('.menu') as HTMLElement;
    const menuElems = document.querySelector('.menu_list') as HTMLElement
    menuBtn.addEventListener('click', function(){
      menuElems.classList.toggle('active');
      menuBtn.classList.toggle('active');
      menu.classList.toggle('active');
      
    })
  //   const menuBtn = document.querySelector('.menu-btn') as HTMLElement;
  //   const menu = document.querySelector('.menu') as HTMLElement;
  //   menuBtn.addEventListener('click', function(){
  //   menuBtn.classList.toggle('active');
  //   menu.classList.toggle('active');
  // })
    // btnMenu.className = "c-hamburger c-hamburger-line";
    // menuList.appendChild(btnMenu);
    // const menuContent = document.createElement("span") as HTMLElement;
    // btnMenu.appendChild(menuContent);
    // (document.querySelector(".c-hamburger") as HTMLElement).addEventListener('click', function(e) {
    //   e.preventDefault();
    //   if(this.classList.contains('is-active')) {
    //     this.classList.remove('is-active');
    //     menuList.classList.remove('body-active');
    //     document.body.classList.remove('body-active');
    //   } else{
        
    //     this.classList.add('is-active');
    //     menuList.classList.add('nav-active');
    //     document.body.classList.add('body-active');
    //   }
    // })


    //headerEnd

    //Main
    const mainEl = document.createElement("main") as HTMLBodyElement;
    mainEl.className = "main";
    mainEl.innerHTML = `<div class="content_wrapper">
      <div class="left_content">
        <div class="about-block">
          <h1 class="content-title">STUDY ENGLISH</h1>
          <h3 class="content-description">Нескучное онлайн-обучение английскому языку<br>
          с помощью игр и интересных заданий<br>
          в любое удобное для вас время</h3>
          <button class="btn-start">Начать обучение</button>
        </div>
        <div class="reviews-block">
          <div class="active-users">
            <h3 class="user-count">28k+</h3>
            <p class="user-text">активных<br>
            пользователей<br>
            платформы</p>
          </div>
          <div class="teach-block">
            <h3 class="teach-count">5 лет</h3>
            <p class="teach-text">успешно обучаем<br>
            языку</p>
          </div>
        </div>

      </div>
      <div class="menu_wrapper">
        <div class="teacher-block">
          <div class="teacher-img">
          </div>
        </div>
      </div>
    </div>`
      
    bodyEl.appendChild(mainEl);
    //MainEnd

    //Footer
    const footerEl = document.createElement("footer") as HTMLBodyElement;
    footerEl.className = "footer";
    bodyEl.appendChild(footerEl);

    const footerClassArr: Array<string> = ["dev_year", "devs_git", "rs_logo"];
    for(let i = 0; i < 3; i++) {
      const footerDivs = document.createElement("div") as HTMLElement;
      footerDivs.className = footerClassArr[i];
      footerEl.appendChild(footerDivs);
    }

    const devYear = document.querySelector('.dev_year') as HTMLElement;
    devYear.innerHTML = "© 2022"

    const devsGit = document.querySelector('.devs_git') as HTMLElement;
    devsGit.innerHTML = `
    <span class="github-logo">
    <a href="https://github.com/">
      <span class="github-image">
    </a>
    </span>
    <span class="developer1">
      <a href="https://github.com/nvfnvm">nvfnvm</a>
    </span>
    <span class="developer2">
      <a href="https://github.com/nvfnvm">shumak_k</a>
    </span>
    <span class="developer3">
      <a href="https://github.com/nvfnvm">zzzhuchok</a>
    </span>
    <span class="developer4">
      <a href="https://github.com/nvfnvm">whattablackhole</a>
    </span>`
    
    const rsLogo = document.querySelector('.rs_logo') as HTMLElement;
    rsLogo.innerHTML = `<a class="rs_link" href="https://rs.school/js-stage0/">
      <div class="rs_img"></div>
    </a>`

    //FooterEnd
  }
}
