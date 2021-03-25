const fs = require('fs');
const os = require('os');
const path = require('path');

const inputLocationPrefix = path.join(os.homedir(), '/Downloads/');
const outputLocation = path.join(__dirname, 'src/Constants/metadata.json');

console.log(`Reading from ${inputLocationPrefix}\nWriting to ${outputLocation}`)

const fileLocations = [];
const numberOfSets = 4;

for (let i = 0; i < numberOfSets; i++) {
   const setName = `set${i + 1}-en_us`;
   const file = path.join(inputLocationPrefix, `${setName}/en_us/data/${setName}.json`);
   if (fs.existsSync(file)) {
      fileLocations.push(file);
      console.log(`Found set ${i + 1} in the input location`)
   } else {
      console.log(`Unable to find set ${i + 1} in the download location`);
   }
}

if (fileLocations.length === 0) {
   console.log('No sets found - exiting without doing any work');
   process.exit();
}

try {
   let allMetadata = [];

   for (const fileLoc of fileLocations) {
      const fileNameSplit = fileLoc.split('/');
      console.log(`Reading and parsing ${fileNameSplit[fileNameSplit.length - 1]}`);

      const file = fs.readFileSync(fileLoc, 'utf8');
      const metadataJson = JSON.parse(file);
      allMetadata = allMetadata.concat(metadataJson);
   }

   console.log('Trimming the metadata to ignore extraneous fields');

   const transformed = allMetadata.map(c => ({
      name: c.name.trim(),
      region: c.region.trim(),
      art: c.assets[0].gameAbsolutePath.trim(),
      code: c.cardCode.trim(),
      // Speed is only defined for spells. Ignore if not a spell
      speed: c.spellSpeed ? c.spellSpeed.trim() : undefined,
      cost: c.cost,
      // Ignore if not a champion
      isChamp: c.rarity === 'Champion' ? true : undefined
   }))

   console.log('Writing metadata to output file');

   const regions = new Set(transformed.map(c => c.region));

   const toWrite = {};

   regions.forEach(region => toWrite[region] = []);

   transformed.forEach(c => {
      const region = c.region;
      delete c.region;
      toWrite[region].push(c);
   });


   fs.writeFileSync(outputLocation, JSON.stringify(toWrite));
   console.log('Done')
} catch (e) {
   console.error(e);
}