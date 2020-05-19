import * as fastXmlParser from 'fast-xml-parser';

export interface IRSSItem {
  description: string;
  guid: string;
  link: string;
  pubDate: Date;
  source: string;
  title: string;
}

export const parseItems = (response: string): IRSSItem[] => {
  const json = fastXmlParser.parse(response);
  const channel = json && json.rss && json.rss.channel;
  return channel && channel.item ? channel.item : [];
};