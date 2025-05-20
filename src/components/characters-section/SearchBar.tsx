"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
	searchTerm: string;
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchBar = ({ searchTerm, handleSearch }: SearchBarProps) => {
	return (
		<div className='relative mb-4 px-4'>
			<Input
				type='text'
				placeholder='Search by character name...'
				className='w-full pl-10 py-2'
				value={searchTerm}
				onChange={handleSearch}
			/>

			<Search className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4' />
		</div>
	);
};
export default SearchBar;
