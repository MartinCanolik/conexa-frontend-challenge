import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useCharacterSelectionStore } from "@/store/characterSelectionStore";
import { Character } from "@/utils/types";
import { toast } from "sonner";
import { X } from "lucide-react";

type CharactersCardType = {
	character: Character;
	characterContainerId: number;
};

export default function CharacterCard({
	character,
	characterContainerId,
}: CharactersCardType) {
	const setSelectedCharacters = useCharacterSelectionStore(
		(state) => state.setSelectedCharacters
	);
	const selectedCharacters = useCharacterSelectionStore(
		(state) => state.selectedCharacters
	);

	const characterPosition = `character${characterContainerId + 1}`;

	const handleSelectCharacter = () => {
		const selectedCharactersKeys = Object.keys(selectedCharacters);
		const isCharacterSelected = selectedCharactersKeys.some(
			(key) =>
				selectedCharacters[key as keyof typeof selectedCharacters] ===
				character.id
		);
		if (isCharacterSelected) {
			toast("Character already selected", {
				description: "Select a difrent card",
				action: <X className='h-5 w-5 mr-2 text-red-500' />,
			});
		} else {
			setSelectedCharacters(characterPosition, character.id);
		}
	};
	const characterClicked =
		selectedCharacters[characterPosition as keyof typeof selectedCharacters];
	const isSelected = characterClicked === character.id;

	const selectedClass =
		isSelected &&
		"border-green-400 border-2 shadow-[0_0_10px_rgba(74,222,128,0.5)] ring-1 ring-green-400";

	return (
		<Card
			key={character.id}
			onClick={handleSelectCharacter}
			className={`max-width-[100px] p-0 gap-0  flex flex-row rounded-lg overflow-hidden hover:border-gray-500 border transition-all duration-200 cursor-pointer ${selectedClass}`}>
			<div className='w-1/3 border-1 border-white'>
				<Image
					src={character.image}
					alt={character.name}
					width={100}
					height={100}
					className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
				/>
			</div>
			<div className='w-2/3 border-2 border-danger'>
				<div className='flex flex-col gap-2 p-3 '>
					<CardHeader className=''>{character.name}</CardHeader>

					<Badge className='w-full'>{character.status}</Badge>
					<Badge className='w-full'>{character.species}</Badge>
					<Badge className='w-full'>{character.gender}</Badge>
				</div>
			</div>
		</Card>
	);
}
