import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { RICK_AND_MORTY_API_URL } from "@/utils/constants";

export function useCharactersQuery(searchTerm: string) {
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const fetchCharacters = async ({ pageParam = 1 }) => {
		const searchQuery = debouncedSearchTerm
			? `&name=${encodeURIComponent(debouncedSearchTerm)}`
			: "";
		const response = await fetch(
			`${RICK_AND_MORTY_API_URL}/character/?page=${pageParam}${searchQuery}`
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	};

	const query = useInfiniteQuery({
		queryKey: ["characters", debouncedSearchTerm],
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

	return {
		...query,
	};
}
