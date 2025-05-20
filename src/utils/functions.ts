export const getSharedEpisodes = (
	characterLeftEpisodes: string[] | undefined,
	characterRightEpisodes: string[] | undefined
) => {
	const linksLeft = new Set(characterLeftEpisodes);
	return characterRightEpisodes?.filter((link) => linksLeft.has(link));
};

export const getSelectedCharacterCardClass = (isSelected: boolean) => {
	return (
		isSelected &&
		"border-green-400 border-2 shadow-[0_0_10px_rgba(74,222,128,0.5)] ring-1 ring-green-400"
	);
};
