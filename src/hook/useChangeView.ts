import router from '@/router';

const useChangeView = () => {
	const changeView = (view: string) => {
		router.push(view ?? '/not-found').then(() => {});
	};

	const goBackView = () => {
		// check if it has previous page and it's not home page
		const hasPreviousPage =
			router.pages.length > 1 &&
			router.pages[router.pages.length - 2] !== '/';

		// go back to previous page if it exists, otherwise go to home page
		if (hasPreviousPage) {
			router.back();
		} else {
			router.push('/').then(() => {});
		}
	};

	return {
		changeView,
		goBackView
	};
};

export default useChangeView;
