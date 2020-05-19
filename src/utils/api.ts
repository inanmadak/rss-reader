import { isValidUrl } from "./common";
import { INVALID_URL } from "containers/RssFeed/constants";

const request = async (url: string, options?: RequestInit) => {
  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort();
  }, 5000);

  try {
    if (url !== '' && !isValidUrl(url)) {
      throw new Error(INVALID_URL);
    }
    const response = await fetch(url, { ...options, signal: abortController.signal });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    clearTimeout(timeout);
    return response;
   } catch (err) {
     // tslint:disable-next-line
     console.log(err);
     clearTimeout(timeout);
     throw err;
   }
}

export const api = {
  request,
};