/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['mongoose'],
	},
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	},
};

module.exports = nextConfig;