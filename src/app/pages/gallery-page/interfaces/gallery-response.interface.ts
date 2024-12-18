export interface GalleryFetchState{
  data: GalleryResponse | null;
  error: boolean;
}

export interface GalleryResponse {
  id:           number;
  profile:      Profile;
  highlights:   Highlight[];
  publications: Publication[];
}

export interface Highlight {
  id:         number;
  title:      string;
  multimedia: Multimedia;
}

export interface Multimedia {
  cover:   string;
  content: Content[];
}

export interface Content {
  url:       string;
  mediaType: string;
}

export interface Publication {
  id:         number;
  title:      string;
  description:string;
  multimedia: Multimedia;
  type:       string;
  created:    string;
  likes:       number;
}

export interface URLElement {
  text: string;
  link: string;
}


export interface Profile {
  userName: string;
  realName: string;
  biography: string;
  photo: string;
  publications: number;
  likes: number;
  urls: URLElement[];
}

