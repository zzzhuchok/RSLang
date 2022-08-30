function getMain () {
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
      
    return mainEl;
}

export default getMain;