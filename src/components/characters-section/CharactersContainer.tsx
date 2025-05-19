"use client";

import { useCallback, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Character } from "@/utils/types";
import { useCharactersQuery } from "@/hooks/useCharactersQuery";
import CharacterCard from "./CharacterCard";
import { ScrollArea } from "../ui/scroll-area";

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
		<div className='flex flex-col bg-slate-900 h-[65vh] w-[650px] p-6 rounded-lg border-1 border-gray-700'>
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
			<div className='flex-1 flex flex-col h-[350px]'>
				{characters.length === 0 ? (
					<div className='text-center py-8'>No characters found</div>
				) : (
					<div className='relative flex-1 overflow-hidden'>
						<ScrollArea className='h-full w-full'>
							<div className='grid grid-cols-1 sm:grid-cols-2 object-contain gap-4 h-full max-h-[600px] pr-4'>
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
				{isFetchingNextPage && (
					<div className='col-span-2 text-center'>Loading more...</div>
				)}
			</div>
		</div>
	);
}
