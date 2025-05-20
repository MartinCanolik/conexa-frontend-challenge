"use client";
import { useCharacterSelectionStore } from "@/store/characterSelectionStore";
import EpisodesList from "./EpisodesList";

export default function EpisodesContainer() {
	const selectedCharacters = useCharacterSelectionStore(
		(state) => state.selectedCharacters
	);
	const characterLeft = selectedCharacters.character1;
	const characterRight = selectedCharacters.character2;
	const characterLeftEpisodes = characterLeft?.episode;
	const characterRightEpisodes = characterRight?.episode;
	const getSharedEpisodes = (
		characterLeftEpisodes: string[] | undefined,
		characterRightEpisodes: string[] | undefined
	) => {
		const linksLeft = new Set(characterLeftEpisodes);
		return characterRightEpisodes?.filter((link) => linksLeft.has(link));
	};
	const sharedEpisodes = getSharedEpisodes(
		characterLeftEpisodes,
		characterRightEpisodes
	);

	return (
		<section className='container relative flex flex-col mt-5 bg-slate-900 w-full h-[40vh] p-6 rounded-lg border-1 border-gray-700'>
			{!characterLeftEpisodes || !characterRightEpisodes ? (
				<h1 className='text-xl mx-auto font-bold mb-4'>
					Choose both characters to see the results ...
				</h1>
			) : (
				<div className='flex flex-row items-center justify-center gap-10'>
					<EpisodesList
						episodesURL={characterLeftEpisodes}
						title={`${characterLeft?.name} - only episodes`}
						id='left'
					/>
					<EpisodesList
						id='shared'
						episodesURL={sharedEpisodes}
						title={`Shared episodes`}
					/>
					<EpisodesList
						episodesURL={characterRightEpisodes}
						title={`${characterRight?.name} - only episodes`}
						id='right'
					/>
				</div>
			)}
		</section>
	);
}
