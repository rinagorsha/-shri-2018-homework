export type eventItemType = {
  type: string,
  title: string,
  source: string,
  time: string,
  description: string | null,
  icon: string,
  size: 's' | 'm' | 'l',
  data?: {
    type?: string,
  }
}

export type eventsJsonType = {
  events: eventItemType[],
};

export type paginationResultType = {
  errors: boolean,
  limit: number,
  page: number,
};