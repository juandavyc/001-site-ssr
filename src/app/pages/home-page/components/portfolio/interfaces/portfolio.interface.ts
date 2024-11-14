import { Technology } from "../../technologies/interfaces/technology.interface";

export interface Portfolio {
  id:           number;
  title:        string;
  technologies: Technology[];
  description:  string;
  urls:         UrlPortfolio[];
}

export interface UrlPortfolio {
  icon:  string;
  url:   string;
  title: string;
}
