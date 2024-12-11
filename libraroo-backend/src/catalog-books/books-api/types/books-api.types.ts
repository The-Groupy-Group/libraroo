interface VolumeInfo {
  title: string;
  authors: string[];
  language: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  categories?: string[];
}

interface BookItem {
  volumeInfo: VolumeInfo;
}
