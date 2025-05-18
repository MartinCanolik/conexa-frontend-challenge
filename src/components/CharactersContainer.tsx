"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useCallback, useRef, useState } from "react";
import CharactersCard from "./characterCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Character } from "@/utils/types";
import { useCharactersQuery } from "@/hooks/useCharactersQuery";

export default function CharacterContainer({
	characterContainerId,
}: {
	characterContainerId: number;
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const observer = useRef<IntersectionObserver | null>(null);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useCharactersQuery(searchTerm);

	const lastCharacterRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (isFetchingNextPage) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});

			if (node) observer.current.observe(node);
		},
		[isFetchingNextPage, fetchNextPage, hasNextPage]
	);

	const characters: Character[] =
		data?.pages.flatMap((page) => page.results) || [];

	return (
		<div className='bg-slate-900 p-6 rounded-lg min-h-screen border-1 border-gray-700'>
			<h2 className='text-xl font-bold mb-4'>
				{`Select character# ${characterContainerId + 1}`}
			</h2>
			<div className='relative mb-4'>
				<Input
					type='text'
					placeholder='Search by character name...'
					className='w-full pl-10 py-2'
					value={searchTerm}
					onChange={handleSearch}
				/>

				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4' />
			</div>
			{characters.length === 0 ? (
				<div className='text-center py-8'>No characters found</div>
			) : (
				<ScrollArea className='grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[600px] pr-2'>
					{characters?.map((character, idx) => {
						const isLastCard = idx === characters.length - 1;
						return (
							<>
								<div key={character.id}>
									<CharactersCard
										characterId={character.id}
										characterContainerID={characterContainerId}
										characterName={character.name}
										status={character.status}
										species={character.species}
										gender={character.gender}
										image={character.image}
									/>
								</div>
								{isLastCard && <div ref={lastCharacterRef}></div>}
							</>
						);
					})}
				</ScrollArea>
			)}
			{isFetchingNextPage && (
				<div className='col-span-2 text-center py-4'>Loading more...</div>
			)}
		</div>
	);
}
