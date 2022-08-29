import "./main.css"

export class MainPage {
  drawTestComponents(): void {

    const bodyEl = document.body as HTMLBodyElement;

    // Header
    const headerEl = document.createElement("header") as HTMLBodyElement;
    headerEl.className = "header";
    bodyEl.appendChild(headerEl);

    const headerWrap = document.createElement("div") as HTMLElement;
    headerWrap.className = "header-wrapper";
    headerEl.appendChild(headerWrap);

    const headerClassArr: Array<string> = ["app_logo", "header_menu", "app_login", "menu_list"];
    for(let i = 0; i < headerClassArr.length; i++) {
      const headerDivs = document.createElement("div") as HTMLElement;
      headerDivs.className = headerClassArr[i];
      headerWrap.appendChild(headerDivs);
    }

    const appLogo = headerWrap.querySelector(".app_logo") as HTMLElement;
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
        <li><a href="#">О команде</a></li>
      </ul>
    </nav>
  </div>`
    
    const authMenu = document.querySelector('.app_login') as HTMLElement;
    authMenu.innerHTML = `<button class="login-btn">Вход</button>
    <button class="signIn-btn">Регистрация</button>`


    
    const menuList = headerWrap.querySelector(".menu_list") as HTMLElement;
    menuList.innerHTML = `<div class="menu">
      <nav>
        <ul>
          <li><a href="#">Учебники</a></li>
          <li><a href="#">Игры</a></li>
          <li><a href="#">Статистика</a></li>
          <li><a href="#">О команде</a></li>
        </ul>
      </nav>
    </div>`
    // const btnMenu = document.createElement("button") as HTMLElement;
    // btnMenu.innerHTML = `<div class="menu-btn">
		//   <span></span>
		//   <span></span>
		//   <span></span>
	  // </div>`
    // headerWrap.appendChild(btnMenu);

    // const menuBtn = document.querySelector('.menu-btn') as HTMLElement;
    // const menu = document.querySelector('.menu') as HTMLElement;
    // const menuElems = document.querySelector('.menu_list') as HTMLElement
    // menuBtn.addEventListener('click', function(){
    //   menuElems.classList.toggle('active');
    //   menuBtn.classList.toggle('active');
    //   menu.classList.toggle('active');
      
    // })

    //headerEnd

    //Main
    const mainEl = document.createElement("main") as HTMLBodyElement;
    mainEl.className = "main";

    mainEl.innerHTML = `<div class="content_wrapper">
      <div class="left_content">
        <div class="about-block">
          <h1 class="content-title">STUDY ENGLISH</h1>
          <p class="content-description">Нескучное онлайн-обучение английскому языку<br>
          с помощью игр и интересных заданий<br>
          в любое удобное для вас время</p>
          <button class="btn-start">Начать обучение</button>
        </div>
        <div class="reviews-block">
          <div class="active-users">
            <p class="user-count">28k+</p>
            <p class="user-text">активных<br>
            пользователей<br>
            платформы</p>
          </div>
          <div class="teach-block">
            <p class="teach-count">5 лет</p>
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

    const footerWrap = document.createElement('div');
    footerWrap.className = "footer_wrapper";
    footerEl.appendChild(footerWrap);

    const footerClassArr: Array<string> = ["dev_year", "devs_git", "rs_logo"];
    for(let i = 0; i < 3; i++) {
      const footerDivs = document.createElement("div") as HTMLElement;
      footerDivs.className = footerClassArr[i];
      footerWrap.appendChild(footerDivs);
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
      <a href="https://github.com/Konstantsin-Shumak">shumak_k</a>
    </span>
    <span class="developer3">
      <a href="https://github.com/zzzhuchok">zzzhuchok</a>
    </span>
    <span class="developer4">
      <a href="https://github.com/whattablackhole">whattablackhole</a>
    </span>`
    
    const rsLogo = document.querySelector('.rs_logo') as HTMLElement;
    rsLogo.innerHTML = `<a class="rs_link" href="https://rs.school/js-stage0/">
      <div class="rs_img"></div>
    </a>`

    //FooterEnd
  }
}
