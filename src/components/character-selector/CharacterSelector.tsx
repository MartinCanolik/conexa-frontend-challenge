"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function CharacterSelector() {
	interface Character {
		id: number;
		name: string;
		status: string;
		species: string;
		type: string;
		gender: string;
		origin: Location;
		location: Location;
		image: string;
		episode: string[];
		url: string;
		created: Date;
	}

	interface Location {
		name: string;
		url: string;
	}

	const [characters, setCharacters] = useState<Character[]>();
	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character")
			.then(async (res) => await res.json())
			.then((res) => setCharacters(res.results));
	}, []);
	console.log(characters);
	return (
		<div className=' flex grid grid-cols-1 lg:grid-cols-2 gap-6'>
			{new Array(2).map((_, idx) => {
				return (
					<div
						key={idx}
						className='bg-slate-900 p-6 rounded-lg min-h-screen border-1 border-gray-700'>
						<ScrollArea className='grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[600px] pr-2'>
							{characters?.map((character) => {
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
											<div className='flex flex-col gap-2 p-3 text-left'>
												<CardHeader>{character.name}</CardHeader>
												<Badge className='w-full'>{character.status}</Badge>
												<Badge className='w-full'>{character.species}</Badge>
												<Badge className='w-full'>
													{character.location?.name}
												</Badge>
											</div>
										</div>
									</Card>
								);
							})}
						</ScrollArea>
					</div>
				);
			})}
		</div>
	);
}
