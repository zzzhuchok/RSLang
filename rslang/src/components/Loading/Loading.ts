export const Loading = () => {
  const textbookItems = document.querySelector(
    ".textbook__items"
  ) as HTMLElement;
  textbookItems.innerHTML = `
    <div class="loader"></div>
    `;
};
