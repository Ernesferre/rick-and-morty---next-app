// types/index.ts
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  episode: string[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
}
