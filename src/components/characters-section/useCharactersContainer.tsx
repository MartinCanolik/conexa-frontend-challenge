/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCharactersQuery } from "@/hooks/useCharactersQuery";
import { InfiniteData } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

type UseCharacterContainerType = {
	lastCharacterRef: (node: HTMLDivElement | null) => void;
	data: InfiniteData<any, unknown> | undefined;
	isFetchingNextPage: boolean;
};
export const useCharacatersContainer = (
	searchTerm: string,
	characterContainerId: number
): UseCharacterContainerType => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useCharactersQuery(searchTerm, characterContainerId);
	const observer = useRef<IntersectionObserver | null>(null);
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
	return { data, lastCharacterRef, isFetchingNextPage };
};
