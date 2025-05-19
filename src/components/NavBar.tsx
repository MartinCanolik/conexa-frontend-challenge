import Image from "next/image";
import ConexaSVG from "./ui/conexa-svg";

export default function NavBar() {
	return (
		<div className='flex w-full justify-center gap-[80px] py-10 px-[50px]'>
			<div className='flex items-center justify-center'>
				<Image
					width={200}
					height={200}
					src='https://res.cloudinary.com/drhj3sc2o/image/upload/v1747685085/rickAndMortyLogo_ry7sz1.png'
					alt='rick-and-morty'
				/>
			</div>
			<div className='flex items-center justify-center'>
				<Image
					width={35}
					height={35}
					src='https://res.cloudinary.com/drhj3sc2o/image/upload/v1747687822/uzg2hmtvgmzmfoyx26yy.svg'
					alt='by'
				/>
			</div>
			<div className='flex items-center justify-center'>
				<ConexaSVG />
			</div>
		</div>
	);
}
