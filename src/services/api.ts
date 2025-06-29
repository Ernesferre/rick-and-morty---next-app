import { Character, Episode } from "../types";

const BASE_URL = "https://rickandmortyapi.com/api";

export async function fetchCharacters(page = 1): Promise<Character[]> {
  const res = await fetch(`${BASE_URL}/character?page=${page}`);
  const data = await res.json();
  return data.results;
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  return res.json();
}

export async function fetchEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  const ids = urls.map(url => url.split("/").pop()).join(",");
  const res = await fetch(`${BASE_URL}/episode/${ids}`);
  return res.json();
}

export async function searchCharactersByName(name: string) {
  const res = await fetch(`${BASE_URL}/character/?name=${name}`);
  const data = await res.json();
  return data.results || [];
}

