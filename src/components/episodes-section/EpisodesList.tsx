import { useEpisodes } from "@/hooks/useEpisodes";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

type EpisodesListProps = {
	title: string;
	episodesURL: string[] | undefined;
	id: string;
};

export default function EpisodesList({
	title,
	episodesURL,
	id,
}: EpisodesListProps) {
	const { data } = useEpisodes(episodesURL, id);
	console.log(data);
	return (
		<div className='h-[160px]'>
			<h2 className='text-xl font-bold mb-4'>{title}</h2>
			<ScrollArea>
				{data?.map((episode, idx) => {
					return (
						<Card key={idx}>
							<div>{episode.name}</div>
							<div>{episode.air_date}</div>
							<div>{episode.episode}</div>
						</Card>
					);
				})}
			</ScrollArea>
		</div>
	);
}
