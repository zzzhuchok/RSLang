function getHeader() {
  const bodyEl = document.body as HTMLBodyElement;

  const headerEl = document.createElement("header") as HTMLBodyElement;
  headerEl.className = "header";
  bodyEl.appendChild(headerEl);

  const headerWrap = document.createElement("div") as HTMLElement;
  headerWrap.className = "header-wrapper";
  headerEl.appendChild(headerWrap);

  const headerClassArr: Array<string> = [
    "app_logo",
    "header_menu",
    "app_login",
  ];
  for (let i = 0; i < headerClassArr.length; i++) {
    const headerDivs = document.createElement("div") as HTMLElement;
    headerDivs.className = headerClassArr[i];
    headerWrap.appendChild(headerDivs);
  }

  const appLogo = headerWrap.querySelector(".app_logo") as HTMLElement;
  const logoImg = document.createElement("div") as HTMLElement;
  logoImg.className = "img_app";
  appLogo.appendChild(logoImg);

  const headerMenu = document.querySelector(".header_menu") as HTMLElement;
  headerMenu.innerHTML = `<div class="header_ennumeration">
<nav>
  <ul class="menu_links">
    <li><a href="/#/books">Учебники</a></li>
    <li><a href="/#/games">Игры</a></li>
    <li><a href="/#/stat">Статистика</a></li>
    <li><a href="/#/about">О команде</a></li>
  </ul>
</nav>
</div>`;

  const authMenu = document.querySelector(".app_login") as HTMLElement;
  authMenu.innerHTML = `<button class="login-btn">Вход</button>
<button class="signIn-btn">Регистрация</button>`;

return headerEl;
}

export default getHeader;