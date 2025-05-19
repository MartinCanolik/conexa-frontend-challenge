import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "rickandmortyapi.com",
				port: "",
				pathname: "/api/character/avatar/**",
				search: "",
			},

			new URL(
				"https://res.cloudinary.com/drhj3sc2o/image/upload/v1747685085/rickAndMortyLogo_ry7sz1.png"
			),
		],
	},
};

export default nextConfig;
