function getFooter() {
    
  const bodyEl = document.body as HTMLBodyElement;

  const footerEl = document.createElement("footer") as HTMLBodyElement;
  footerEl.className = "footer";
  bodyEl.appendChild(footerEl);

  const footerWrap = document.createElement("div");
  footerWrap.className = "footer_wrapper";
  footerEl.appendChild(footerWrap);

  const footerClassArr: Array<string> = ["dev_year", "devs_git", "rs_logo"];
  for (let i = 0; i < 3; i++) {
    const footerDivs = document.createElement("div") as HTMLElement;
    footerDivs.className = footerClassArr[i];
    footerWrap.appendChild(footerDivs);
  }

  const devYear = document.querySelector(".dev_year") as HTMLElement;
  devYear.innerHTML = "© 2022";

  const devsGit = document.querySelector(".devs_git") as HTMLElement;
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
    </span>`;

  const rsLogo = document.querySelector(".rs_logo") as HTMLElement;
  rsLogo.innerHTML = `<a class="rs_link" href="https://rs.school/js-stage0/">
      <div class="rs_img"></div>
    </a>`;

    return footerEl;
}

export default getFooter;