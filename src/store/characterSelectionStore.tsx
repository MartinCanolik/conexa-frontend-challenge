import { create } from "zustand";
type SelectedCharacters = { character1: number; character2: number };
export type CharacterSelectionStore = {
	selectedCharacters: SelectedCharacters;
	setSelectedCharacters: (
		characterPosition: string,
		characterID: number
	) => void;
};

export const useCharacterSelectionStore = create<CharacterSelectionStore>(
	(set) => ({
		selectedCharacters: { character1: 0, character2: 0 },
		setSelectedCharacters: (characterPosition, characterID) => {
			set((state) => ({
				selectedCharacters: {
					...state.selectedCharacters,
					[characterPosition]: characterID,
				},
			}));
		},
	})
);
