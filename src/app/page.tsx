import CharacterContainer from "@/components/CharactersContainer";

export default function Home() {
	return (
		<div className='flex m-20 justify-center items-center'>
			<div className=' flex grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{Array.from({ length: 2 }).map((_, idx) => (
					<CharacterContainer key={idx} characterContainerId={idx} />
				))}
			</div>
		</div>
	);
}
