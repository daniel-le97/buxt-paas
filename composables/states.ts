export const useTabIndex = () => useState('tab-index', () => 0);
export const useActiveId = () => useState('activeRepoId', () => '');
export const useBuildSSE = () => useState( 'sse', () => '' );
export const useRepo = () =>  useState( 'repo', () => 'https://github.com/daniel-le97/nuxt-elysia' );