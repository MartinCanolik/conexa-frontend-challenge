"use client";

import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Character } from "@/utils/types";
import { useCharacterCard } from "@/components/characters-section/useCharacterCard";
import { getSelectedCharacterCardClass } from "@/utils/functions";

type CharactersCardProps = {
	character: Character;
	characterContainerId: number;
};

export default function CharacterCard({
	characterContainerId,
	character,
}: CharactersCardProps) {
	const { handleSelectCharacter, characterClicked } = useCharacterCard(
		characterContainerId,
		character
	);

	const isSelected = characterClicked === character.id;

	const badgeStyle = "w-full py-0 my-1 text-xs";

	return (
		<Card
			key={character.id}
			onClick={handleSelectCharacter}
			className={`max-width-[100px] p-0 gap-0  flex flex-row rounded-lg overflow-hidden hover:border-gray-500 border transition-all duration-200 cursor-pointer ${getSelectedCharacterCardClass(
				isSelected
			)}`}>
			<div className='w-1/3 border-1 border-white'>
				<Image
					src={character.image}
					alt={character.name}
					width={100}
					height={100}
					className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
				/>
			</div>
			<div className='w-2/3'>
				<div className='flex flex-col py-2 mx-4'>
					<CardHeader className='line-clamp-1 whitespace-nowrap text-ellipsis'>
						{character.name}
					</CardHeader>

					<Badge className={badgeStyle}>{character.status}</Badge>
					<Badge className={badgeStyle}>{character.species}</Badge>
					<Badge className={badgeStyle}>{character.gender}</Badge>
				</div>
			</div>
		</Card>
	);
}
