"use client";
import { useCharacterSelectionStore } from "@/store/characterSelectionStore";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Character } from "@/utils/types";

type UseCharacterCardType = {
	handleSelectCharacter: () => void;
	characterClicked: number | undefined;
};

export const useCharacterCard = (
	characterContainerId: number,
	character: Character
): UseCharacterCardType => {
	const characterPosition = `character${characterContainerId + 1}`;
	const setSelectedCharacters = useCharacterSelectionStore(
		(state) => state.setSelectedCharacters
	);
	const selectedCharacters = useCharacterSelectionStore(
		(state) => state.selectedCharacters
	);
	const handleSelectCharacter = () => {
		const selectedCharactersKeys = Object.keys(selectedCharacters);
		const isCharacterSelected = selectedCharactersKeys.some(
			(key) =>
				selectedCharacters[key as keyof typeof selectedCharacters]?.id ===
				character.id
		);
		if (isCharacterSelected) {
			toast("Character already selected", {
				description: "Select a difrent card",
				action: <X className='h-5 w-5 mr-2 text-red-500' />,
			});
		} else {
			setSelectedCharacters(characterPosition, character);
		}
	};
	const characterClicked =
		selectedCharacters[characterPosition as keyof typeof selectedCharacters]
			?.id;

	return { handleSelectCharacter, characterClicked };
};
