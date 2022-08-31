import { HttpError } from "../Errors/HttpErrors";
import {
  Auth,
  NewToken,
  Settings as Settings,
  Statistic,
  User,
  UserWord,
  IWord,
} from "../Types/Types";
import { LocalStoreAPI } from "./LocalStoreAPI";

export class LearnWordsAPI {
  url = "https://react-learnwords-rss.herokuapp.com";
  users = `${this.url}/users`;
  words = `${this.url}/words`;
  signIn = `${this.url}/signin`;
  localStore = new LocalStoreAPI();

  /* WORDS */
  getWordsAPI = async (group = 0, page = 0): Promise<Array<IWord>> => {
    const response = await fetch(`${this.words}?group=${group}&page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const words: Array<IWord> = (await response.json()) as Array<IWord>;
    return words;
  };

  getWordAPI = async (wordId: string): Promise<IWord> => {
    const response = await fetch(`${this.words}/${wordId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const word = (await response.json()) as IWord;
    return word;
  };

  /* =============================================================================== */

  /* USERS */
  createUserAPI = async (data: User): Promise<void> => {
    const response = await fetch(`${this.users}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    (await response.json()) as User;
  };

  getUserAPI = async (userId: string): Promise<User | undefined> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // updating the token if the time has expired
    if (!response.ok) {
      if (response.status === 401) {
        console.log("uh...");
        await this.getNewUserTokenAPI(userId);
        await this.getUserAPI(userId);
        return;
      }

      throw new HttpError(response.status, response.statusText);
    }

    const userData = (await response.json()) as User;
    return userData;
  };

  updateUserAPI = async (data: User, userId: string): Promise<User | void> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // updating the token if the time has expired
    if (!response.ok) {
      if (response.status === 401) {
        await this.getNewUserTokenAPI(userId);
        await this.updateUserAPI(data, userId);
        return;
      }

      throw new HttpError(response.status, response.statusText);
    }

    const userNewData = (await response.json()) as User;
    return userNewData;
  };

  deleteUserAPI = async (userId: string): Promise<void> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // updating the token if the time has expired
    if (!response.ok) {
      if (response.status === 401) {
        await this.getNewUserTokenAPI(userId);
        await this.deleteUserAPI(userId);
        return;
      }

      throw new HttpError(response.status, response.statusText);
    }
  };

  getNewUserTokenAPI = async (userId: string): Promise<NewToken> => {
    const { refreshToken } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: "application/json",
      },
    });

    const userData = (await response.json()) as NewToken;
    this.localStore.updateUser(userData.token, userData.refreshToken);
    return userData;
  };

  /* =============================================================================== */
  /* Users/ Words */
  getAllUserWordsAPI = async (userId: string): Promise<UserWord[]> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const userWords = (await response.json()) as UserWord[];
    return userWords;
  };

  createUserWordAPI = async (
    newWord: UserWord,
    userId: string,
    wordId: string
  ) => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newWord),
    });

    const userWord = (await response.json()) as UserWord;
    return userWord;
  };

  getUserWordAPI = async (
    userId: string,
    wordId: string
  ): Promise<UserWord | void> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const word = (await response?.json()) as UserWord;
    return word;
  };

  updateUserWordAPI = async (
    data: UserWord,
    userId: string,
    wordId: string
  ): Promise<UserWord> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const word = (await response?.json()) as UserWord;
    return word;
  };

  deleteUserWordAPI = async (userId: string, wordId: string): Promise<void> => {
    const { token } = this.localStore.getUser();
    await fetch(`${this.users}/${userId}/words/${wordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  /* =============================================================================== */
  /* Users/AggregatedWords */
  getAllUserAggrWords = async (
    userId: string,
    wordsPerPage: string,
    filter: string,
    group?: string,
    page?: string
  ) => {
    const { token } = this.localStore.getUser();
    const groupValue = group ? `group=${group}` : "";
    const pageValue = page ? `&page=${page}` : "";
    const response = await fetch(
      `${this.users}/${userId}/aggregatedWords?${groupValue}${pageValue}&wordsPerPage=${wordsPerPage}&filter=${filter}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    const statistic = (await response.json()) as Statistic;
    return statistic;
  };

  /* =============================================================================== */
  /* Users/ Statistic */
  getUserStatisticAPI = async (userId: string): Promise<Statistic> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/statistics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const statistic = (await response.json()) as Statistic;
    return statistic;
  };

  updateUserStatisticAPI = async (
    data: Statistic,
    userId: string
  ): Promise<Statistic> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/statistics`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updateStat = (await response.json()) as Statistic;
    return updateStat;
  };

  /* =============================================================================== */

  /* Users/ Setting */
  getUserSettingsAPI = async (userId: string): Promise<Settings> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/settings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const settings = (await response.json()) as Settings;
    return settings;
  };

  updateUserSettingsAPI = async (
    data: Settings,
    userId: string
  ): Promise<Settings> => {
    const { token } = this.localStore.getUser();
    const response = await fetch(`${this.users}/${userId}/settings`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const updateSettings = (await response.json()) as Settings;
    return updateSettings;
  };

  /* =============================================================================== */

  /* SIGN IN */
  loginUserAPI = async (data: User): Promise<Auth> => {
    const response = await fetch(`${this.signIn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }

    const dataAuth = (await response.json()) as Auth;
    return dataAuth;
  };

  isWordHard = async (userId: string, wordId: string): Promise<boolean> => {
    const data = await this.getAllUserWordsAPI(userId);

    return (
      data.filter((element) => {
        return element.optional.id === wordId && element.difficulty === "hard";
      }).length > 0
    );
  };
}
