import CharacterContainer from "@/components/characters-section/CharactersContainer";
import EpisodesContainer from "@/components/episodes-section/EpisodesContainer";

export default function Home() {
	return (
		<div className='flex m-20 justify-center items-center'>
			<div className=' flex grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{Array.from({ length: 2 }).map((_, idx) => (
					<CharacterContainer key={idx} characterContainerId={idx} />
				))}
				<EpisodesContainer />
			</div>
		</div>
	);
}
