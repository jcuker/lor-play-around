const fs = require('fs');
const path = require('path');

const inputLocationPrefix = '/Users/cukes/Downloads/';
const outputLocation = path.join(__dirname, 'src/Constants/metadata.json');

const fileLocations = []; 
const numberOfSets = 4;

for (let i =0 ; i < numberOfSets; i++) {
   const setName = `set${i+1}-en_us`;
   const file = path.join(inputLocationPrefix, `${setName}/en_us/data/${setName}.json`);
   fileLocations.push(file);
}


try {
   let allMetadata = [];

   for (const fileLoc of fileLocations) {
      const file = fs.readFileSync(fileLoc, 'utf8');
      const metadataJson = JSON.parse(file);
      allMetadata = allMetadata.concat(metadataJson);
   }
   
   const transformed = allMetadata.map(c => ({
      name: c.name.trim(),
      region: c.region.trim(),
      art: c.assets[0].gameAbsolutePath.trim(),
      code: c.cardCode.trim(),
      speed: c.spellSpeed.trim(),
      cost: c.cost
   }))

   const regions = new Set(transformed.map(c => c.region));

   const toWrite = {};

   regions.forEach(region => toWrite[region] = []);

   transformed.forEach(c => {
      const region = c.region;
      delete c.region;
      toWrite[region].push(c);
   });


   fs.writeFileSync(outputLocation, JSON.stringify(toWrite));

} catch (e) {
   console.error(e);
}