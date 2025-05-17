"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import CharactersCard from "./characterCard";

export interface Character {
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

export interface Location {
	name: string;
	url: string;
}

export default function CharacterContainer({
	characterContainerId,
}: {
	characterContainerId: number;
}) {
	const [characters, setCharacters] = useState<Character[]>();
	useEffect(() => {
		fetch("https://rickandmortyapi.com/api/character")
			.then(async (res) => await res.json())
			.then((res) => setCharacters(res.results));
	}, []);
	console.log(characters);
	return (
		<div className='bg-slate-900 p-6 rounded-lg min-h-screen border-1 border-gray-700'>
			<h2 className='text-xl font-bold mb-4'>{`Select character# ${
				characterContainerId + 1
			}`}</h2>
			<ScrollArea className='grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[600px] pr-2'>
				{characters?.map((character) => {
					return <CharactersCard {...character} />;
				})}
			</ScrollArea>
		</div>
	);
}
