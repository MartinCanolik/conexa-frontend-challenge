import { Character } from "@/utils/types";
import { create } from "zustand";
type SelectedCharacters = { character1?: Character; character2?: Character };
export type CharacterSelectionStore = {
	selectedCharacters: SelectedCharacters;
	setSelectedCharacters: (
		characterPosition: string,
		character: Character
	) => void;
};

export const useCharacterSelectionStore = create<CharacterSelectionStore>(
	(set) => ({
		selectedCharacters: {},
		setSelectedCharacters: (characterPosition, character) => {
			set((state) => ({
				selectedCharacters: {
					...state.selectedCharacters,
					[characterPosition]: character,
				},
			}));
		},
	})
);
