// Пути

export const pathsPublic = {
	home: '/',
	signin: '/user/signin',
	signup: '/user/signup',
	logout: '/user/logout',
	categories: '/recipe',
	recipe: '/recipe/*',
	categorydetail: 'category/:name',
	recipedetail: '/recipe/:name',
	recipeedit: '/recipeedit',
	recipeadd: '/recipeadd',
	blog: '/blog',
	blogedit: '/blog/blogedit',
	blogdetail: '/blog/:name',
	blogadd: '/blog/add',
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