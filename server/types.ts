export interface IeventItemType {
  type: string;
  title: string;
  source: string;
  time: string;
  description: string | null;
  icon: string;
  size: 's' | 'm' | 'l';
  data?: {
    type?: string,
    values?: [],
    humidity?: string,
    temperature?: string,
    albumcover?: string,
    artist?: string,
    track?: {
      name: string,
      length: string,
    },
    volume?: number,
    buttons?: string[],
    image?: string,
  };
}

export interface IeventsJsonType {
  events: IeventItemType[];
}

export interface IpaginationResultType {
  errors: boolean;
  limit: number;
  page: number;
}
