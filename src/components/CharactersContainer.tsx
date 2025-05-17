"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useCallback, useEffect, useRef, useState } from "react";
import CharactersCard from "./characterCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

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
	const [searchTerm, setSearchTerm] = useState("");
	const observer = useRef<IntersectionObserver | null>(null);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	console.log(searchTerm);
	const fetchCharacters = async ({ pageParam = 1 }) => {
		const searchQuery = searchTerm
			? `&name=${encodeURIComponent(searchTerm)}`
			: "";
		const response = await fetch(
			`https://rickandmortyapi.com/api/character/?page=${pageParam}${searchQuery}`
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	};
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useInfiniteQuery({
		queryKey: ["characters", searchTerm],
		queryFn: fetchCharacters,
		getNextPageParam: (lastPage) => {
			return lastPage.info.next
				? Number.parseInt(
						new URL(lastPage.info.next).searchParams.get("page") || "1"
				  )
				: undefined;
		},
		initialPageParam: 1,
	});

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
				<input
					type='text'
					placeholder='Search by character name...'
					className='w-full bg-[#1a1e26] border border-gray-700 rounded-md pl-10 py-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500'
					value={searchTerm}
					onChange={handleSearch}
				/>
				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4' />
			</div>
			<ScrollArea className='grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-[600px] pr-2'>
				{characters?.map((character, idx) => {
					const isLastPage = idx === characters.length - 1;
					return (
						<>
							{isLastPage && <div ref={lastCharacterRef}></div>}

							<div key={character.id}>
								<CharactersCard {...character} />
							</div>
						</>
					);
				})}
			</ScrollArea>
			{isFetchingNextPage && (
				<div className='col-span-2 text-center py-4'>Loading more...</div>
			)}
		</div>
	);
}
