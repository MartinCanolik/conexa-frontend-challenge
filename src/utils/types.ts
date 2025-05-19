export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
}
export interface Character {
	id: number;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	origin: Location;
	location: Location;
	image: string;
	episode: string[];
	url: string;
	created: Date;
}

export interface Location {
	name: string;
	url: string;
}
