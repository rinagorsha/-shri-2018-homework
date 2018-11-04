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
