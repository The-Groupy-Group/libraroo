export interface QueryOptions {
    maxResults?: number;  
    startIndex?: number;   
    sort?: { [key: string]: 1 | -1 };  
  }