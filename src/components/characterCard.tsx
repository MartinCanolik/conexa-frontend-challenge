import { Character } from "./CharactersContainer";
import { Card, CardHeader } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function CharactersCard(character: Character) {
	return (
		<Card
			key={character.id}
			className='max-width-[100px] p-0 gap-0 flex flex-row rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer'>
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
					<CardHeader className='line-clamp-1 text-elipsis'>
						{character.name}
					</CardHeader>

					<Badge className='w-full'>{character.status}</Badge>
					<Badge className='w-full'>{character.species}</Badge>
					<Badge className='w-full'>{character.location?.name}</Badge>
				</div>
			</div>
		</Card>
	);
}
