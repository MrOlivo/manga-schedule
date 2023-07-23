export interface IManga {
  name: string;
  volume: string;
  price: string;
  editorial: string;
  publicationDate: string;
  url: string;
  frontImageUrl: string;
}

export interface IGroupedManga {
  [key: string]: IManga[]
};

export interface ICollection {
  name: string;
  url: string;
  frontImageUrl: string;
}