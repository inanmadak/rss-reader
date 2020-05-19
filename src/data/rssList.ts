import { ISelectOption } from "./interfaces";

export const RSSList: ISelectOption[] = [
  {
    label: 'BBC | World News',
    value: 'http://feeds.bbci.co.uk/news/world/rss.xml#'
  },
  {
    label: 'Wired',
    value: 'http://feeds.wired.com/wired/index',
  },
  {
    label: 'Techcrunch',
    value: 'http://feeds.feedburner.com/Techcrunch'
  },
  {
    label: 'Sky Sports',
    value: 'https://www.skysports.com/rss/12040',
  },
  {
    label: 'Fox Sports | Football',
    value: 'https://api.foxsports.com/v1/rss?tag=soccer',
  }
];