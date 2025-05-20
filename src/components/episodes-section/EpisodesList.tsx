import { useEpisodes } from "@/hooks/useEpisodes";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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

	if (!data) return <p>No shared episodes found.</p>;

	return (
		<div className='flex flex-col h-[35vh] rounded-lg px-10 gap-2 py-3 border-1 border-gray-700'>
			<h2 className='text-xl text-center font-bold mb-2'>{title}</h2>
			<Separator className='mb-2' />
			<div className='overflow-y-auto flex-1 '>
				<ScrollArea className='h-full w-full'>
					<div className='gap-3 pr-4 space-y-4'>
						{data?.map((episode, idx) => {
							return (
								<Card
									className='flex flex-col gap-0 py-3 justify-center items-center'
									key={idx}>
									<h3 className='font-bold text-md'>{episode.name}</h3>
									<Badge className='w-[70%] py-0 my-2'>
										{episode.air_date}
									</Badge>
									<Badge className='w-[70%] py-0 my-2'>{episode.episode}</Badge>
								</Card>
							);
						})}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
