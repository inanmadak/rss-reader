import * as fastXmlParser from 'fast-xml-parser';

export interface IRSSItem {
  description: string;
  guid: string;
  link: string;
  pubDate: Date;
  source: string;
  title: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export const parseItems = (response: string): IRSSItem[] => {
  const json = fastXmlParser.parse(response);
  const channel = json && json.rss && json.rss.channel;
  return channel && channel.item ? channel.item : [];
};

export const shorten = (text: string, length: number) => {
  const shouldShorten = text.length > length;

  return shouldShorten ? text.substring(0, length).concat('...') : text;
}

// source: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export const isValidUrl = (url: string) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  return Boolean(pattern.test(url));
}