import HomePage from "../components/HomePage";
import { fetchCharacters } from "@/services/api";
import { Character } from "@/types";

export default async function Page() {
  const initialCharacters: Character[] = await fetchCharacters();

  return <HomePage initialCharacters={initialCharacters} />;
}
