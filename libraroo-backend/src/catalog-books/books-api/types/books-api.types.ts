export interface VolumeInfo {
  title: string;
  subtitle?:string;
  authors: string[];
  language: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  categories?: string[];
}

export interface BookItem {
  volumeInfo: VolumeInfo;
}

export interface BooksApiResponse {
  totalItems: number;
  items: BookItem[];
}
