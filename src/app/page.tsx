import CharacterContainer from "@/components/characters-section/CharactersContainer";
import EpisodesContainer from "@/components/episodes-section/EpisodesContainer";
import NavBar from "@/components/NavBar";

export default function Home() {
	return (
		<div className='flex flex-col h-full w-full justify-center items-center'>
			<NavBar />
			<section className='h-[65vh] grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{Array.from({ length: 2 }).map((_, idx) => (
					<CharacterContainer key={idx} characterContainerId={idx} />
				))}
			</section>
			<div className='w-full px-10'>
				<EpisodesContainer />
			</div>
		</div>
	);
}
