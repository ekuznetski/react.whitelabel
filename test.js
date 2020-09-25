const path = require('path');
const fs = require('fs');


const excludeAssets = [];
const appTarget = 'bsfx' || '';

fs.readdirSync(path.join(__dirname, 'src/assets')).forEach(file => {
	const absolutePath = path.join(__dirname, 'src/assets', file);
	const targetAssetFolder = appTarget.length ? `_${appTarget}` : '_default';

	if (fs.lstatSync(absolutePath).isDirectory() && /^\_.*/.test(file) && file !== targetAssetFolder) {
		excludeAssets.push(absolutePath)
	}
});

console.log(excludeAssets)
