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
		<section className='grid grid-cols-3 gap-4'>
			<EpisodesList
				episodesURL={characterLeftEpisodes}
				title={`${characterLeft?.name} only episodes`}
				id='left'
			/>
			<EpisodesList
				episodesURL={sharedEpisodes}
				title={`characters ${characterLeft?.name} and ${characterRight?.name} - shared episodes`}
				id='shared'
			/>
			<EpisodesList
				episodesURL={characterRightEpisodes}
				title={`${characterRight?.name} only episodes`}
				id='right'
			/>
		</section>
	);
}
