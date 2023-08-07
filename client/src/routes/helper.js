// Пути

export const pathsPublic = {
	home: '/',
	signin: '/user/signin',
	signup: '/user/signup',
	logout: '/user/logout',
	recipe: '/recipe',
	recipeedit: '/recipeedit',
	blog: '/blog',
	blogedit: '/blog/blogedit',
	blogdetail: '/blog/:id',
	about: '/about',
	profile: '/user/profile',
}

export const pathsPrivate = {
}

export const paths = Object.assign({}, pathsPublic, pathsPrivate);



// Проверка соответстия пути
export function checkPathMatch(pathname, paths) {
	let isMatch = false;

	const allPaths = Object.keys(paths).map(p => paths[p]);
	const pathFirstSection = pathname.split('/')[1];

	allPaths.forEach(p => {
		if (p.slice(1) === pathFirstSection) {
			isMatch = true;
		}
	});
	return isMatch;
}