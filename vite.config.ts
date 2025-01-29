import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// console.log('meta', path);
// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [
		createHtmlPlugin({
			inject: {
				data: {
					MODE: process.env.VITE_MODE
				}
			}
		}),
		vue(),
		legacy({
			targets: ['chrome 60', 'safari >=11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime']
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		},
		extensions: ['.js', '.vue', '.ts']
	},
	server: {
		port: 3000
	},
	publicDir: 'public',
	build: {
		emptyOutDir: true,
		outDir: 'dist'
	}
});
