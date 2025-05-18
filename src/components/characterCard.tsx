import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useCharacterSelectionStore } from "@/store/characterSelectionStore";

type CharacterCardProps = {
	characterId: number;
	characterContainerID: number;
	characterName: string;
	status: string;
	species: string;
	gender: string;
	image: string;
};

export default function CharactersCard({
	characterId,
	characterContainerID,
	characterName,
	status,
	gender,
	image,
	species,
}: CharacterCardProps) {
	const setSelectedCharacters = useCharacterSelectionStore(
		(state) => state.setSelectedCharacters
	);

	const characterPosition = `character${characterContainerID + 1}`;

	return (
		<Card
			key={characterId}
			onClick={() => setSelectedCharacters(characterPosition, characterId)}
			className='max-width-[100px] p-0 gap-0 flex flex-row rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer'>
			<div className='w-1/3 border-1 border-white'>
				<Image
					src={image}
					alt={characterName}
					width={100}
					height={100}
					className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
				/>
			</div>
			<div className='w-2/3 border-2 border-danger'>
				<div className='flex flex-col gap-2 p-3 '>
					<CardHeader className='line-clamp-1 text-elipsis'>
						{characterName}
					</CardHeader>

					<Badge className='w-full'>{status}</Badge>
					<Badge className='w-full'>{species}</Badge>
					<Badge className='w-full'>{gender}</Badge>
				</div>
			</div>
		</Card>
	);
}
