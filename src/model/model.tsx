export interface ListProps {
  items: ListItemProps[];
  dateString: string;
}

export interface Itemprops {
  item: ListItemProps;
  dateString: string;
}
export interface ListItemProps {
  text: string;
  isFavourite: boolean;
}

export interface Store {
  key: string;
  value: string[];
}

export interface PersistentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: any): void;
}

export interface AccordingProps {
  title: string;
  list: string[];
}
