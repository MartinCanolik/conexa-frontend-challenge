"use client";

import { useState } from "react";

import { Character } from "@/utils/types";
import CharacterCard from "./CharacterCard";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";
import { useCharacatersContainer } from "./useCharactersContainer";
import SearchBar from "./SearchBar";

export default function CharacterContainer({
	characterContainerId,
}: {
	characterContainerId: number;
}) {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { data, lastCharacterRef, isFetchingNextPage } =
		useCharacatersContainer(searchTerm, characterContainerId);

	const characters: Character[] =
		data?.pages.flatMap((page) => page.results) || [];

	return (
		<div className='flex flex-col bg-slate-900 h-[65vh] w-[650px] p-6 rounded-lg border-1 border-gray-700'>
			<h2 className='text-xl font-bold mb-3 px-4'>
				{`Select character# ${characterContainerId + 1}`}
			</h2>
			<SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
			<div className='flex-1 flex flex-col pb-2 h-[350px]'>
				{characters.length === 0 ? (
					<div className='text-center py-8'>No characters found</div>
				) : (
					<div className='relative flex-1 overflow-hidden'>
						<ScrollArea className='h-full w-full'>
							<div className='grid grid-cols-1 sm:grid-cols-2 object-contain gap-4 h-full max-h-[600px] p-4'>
								{characters?.map((character, idx) => {
									const isLastCard = idx === characters.length - 1;
									return (
										<div key={character.id}>
											{isLastCard && <div ref={lastCharacterRef}></div>}
											<CharacterCard
												character={character}
												characterContainerId={characterContainerId}
											/>
										</div>
									);
								})}
							</div>
						</ScrollArea>
					</div>
				)}
				{isFetchingNextPage && <Spinner />}
			</div>
		</div>
	);
}
