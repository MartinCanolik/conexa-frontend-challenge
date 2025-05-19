import { Episode } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const fetchEpisodes = async (urls: string[]): Promise<Episode[]> => {
	return await Promise.all(
		urls.map(async (url) => {
			const res = await fetch(url);
			if (!res.ok) throw new Error(`Error fetching ${url}`);
			return res.json();
		})
	);
};

// Reusable hook
export const useEpisodes = (
	episodesURL: string[] | undefined,
	label: string
) => {
	return useQuery<Episode[]>({
		queryKey: ["episodes", label, episodesURL],
		queryFn: () => fetchEpisodes(episodesURL ?? []),
		enabled: !!episodesURL && episodesURL.length > 0,
	});
};
