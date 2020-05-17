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
  return json && json.rss && json.rss.channel && json.rss.channel.item;
};

export const shorten = (text: string, length: number) => {
  const shouldShorten = text.length > length ? length : text.length;

  return shouldShorten ? text.substring(0, length).concat('...') : text;
}

// export const rssMapper = (items: IRSSItem[]): I => {
//   items.map((item) => {
//     return {
//       description: item.description,
//       id: item.guid,
//       link: item.link,

//     }
//   })
// }