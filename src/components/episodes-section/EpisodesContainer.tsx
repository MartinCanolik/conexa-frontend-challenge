"use client";
import { useCharacterSelectionStore } from "@/store/characterSelectionStore";
import EpisodesList from "./EpisodesList";
import { getSharedEpisodes } from "@/utils/functions";

export default function EpisodesContainer() {
	const { character1, character2 } = useCharacterSelectionStore(
		(state) => state.selectedCharacters
	);

	const characterLeftEpisodes = character1?.episode;
	const characterRightEpisodes = character2?.episode;

	const sharedEpisodes = getSharedEpisodes(
		characterLeftEpisodes,
		characterRightEpisodes
	);
	console.log(sharedEpisodes);
	<section className='container relative flex flex-col mt-5 bg-slate-900 w-full h-[40vh] p-6 rounded-lg border-1 border-gray-700'>
		{!characterLeftEpisodes || !characterRightEpisodes ? (
			<h1 className='text-xl mx-auto font-bold mb-4'>
				Choose both characters to see the results ...
			</h1>
		) : (
			<div className='flex flex-row items-center justify-center gap-10'>
				<EpisodesList
					episodesURL={characterLeftEpisodes}
					title={`${character1?.name} - only episodes`}
					id='left'
				/>
				<EpisodesList
					id='shared'
					episodesURL={sharedEpisodes}
					title={`Shared episodes`}
				/>
				<EpisodesList
					episodesURL={characterRightEpisodes}
					title={`${character2.name} - only episodes`}
					id='right'
				/>
			</div>
		)}
	</section>;
}
