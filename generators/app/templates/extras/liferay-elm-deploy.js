const fs = require('fs');

const pkgJson = JSON.parse(fs.readFileSync('package.json'));
const buildJson = JSON.parse(fs.readFileSync('.npmbuildrc'));
const jarFileName = `${pkgJson.name}-${pkgJson.version}.jar`;
const src = `build.liferay/${jarFileName}`;
const dest = `${buildJson.deployDir}/${jarFileName}`;

fs.copyFile(src, dest, function() {
  console.log(`Copied ${src} to ${buildJson.deployDir}`);
});
