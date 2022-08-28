import { IWord } from "../type/IWord";

export const URL = "https://react-learnwords-rss.herokuapp.com";

export const getWords = async (
  page: number,
  group: number
): Promise<Array<IWord>> => {
  localStorage.setItem("page", String(page + 1));
  localStorage.setItem("group", String(group));
  const response = await fetch(`${URL}/words?group=${group}&page=${page}`, {
    method: "GET",
  });
  return (await response.json()) as Promise<Array<IWord>>;
};
