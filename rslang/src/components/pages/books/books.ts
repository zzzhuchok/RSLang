function getMainBooks () {
    const mainBooksEl = document.createElement("main") as HTMLBodyElement;
    mainBooksEl.className = "main";

    mainBooksEl.innerHTML = `<div class="content_wrapper">
      <h1>BOOKS</h1>
    </div>`
      
    return mainBooksEl;
}

export default getMainBooks;