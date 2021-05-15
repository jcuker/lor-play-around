const fs = require('fs');
const path = require('path');
const axios = require('axios');
const AdmZip = require('adm-zip');

const inputLocationPrefix = path.join(__dirname, '/data/');
const outputLocation = path.join(__dirname, 'src/Constants/metadata.json');
const numberOfSets = 4;

async function downloadSets() {
   const urlTemplate = (setNumber) =>
      `https://dd.b.pvp.net/latest/set${setNumber}-lite-en_us.zip`;

   for (let i = 0; i < numberOfSets; i++) {
      const setNumber = i + 1;
      const setMetadataFileName = `en_us/data/set${setNumber}-en_us.json`;
      const setUrl = urlTemplate(setNumber);

      try {
         console.log(`Downloading set ${setNumber}...`);

         const body = await axios.get(setUrl, {
            responseType: 'arraybuffer',
         });

         console.log(`Parsing set ${setNumber}...`);

         const zip = new AdmZip(body.data);

         const metadataFile = zip
            .getEntries()
            .find((entry) => entry.entryName === setMetadataFileName);

         if (!metadataFile)
            console.log(`Unable to find metadata file for set ${setNumber}`);

         const unzippedMetadata = JSON.parse(
            metadataFile.getData().toString('utf8')
         );

         const setMetadataOutputPath = path.join(
            __dirname,
            `data/set${setNumber}.json`
         );

         fs.writeFileSync(
            setMetadataOutputPath,
            JSON.stringify(unzippedMetadata)
         );
      } catch (err) {
         console.log('Encountered an error: ', err.message);
      }
   }
}

async function main() {
   const myArgs = process.argv.slice(2);

   if (myArgs.includes('-d') || myArgs.includes('--download'))
      await downloadSets();

   console.log('Reading in sets and transforming...');
   const fileLocations = [];

   for (let i = 0; i < numberOfSets; i++) {
      const setName = `set${i + 1}`;
      const file = path.join(inputLocationPrefix, `${setName}.json`);

      if (fs.existsSync(file)) {
         fileLocations.push(file);
         console.log(`Found set ${i + 1} in the input location`);
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
         console.log(
            `Reading and parsing ${fileNameSplit[fileNameSplit.length - 1]}`
         );

         const file = fs.readFileSync(fileLoc, 'utf8');
         const metadataJson = JSON.parse(file);
         allMetadata = allMetadata.concat(metadataJson);
      }

      console.log('Trimming the metadata to ignore extraneous fields');

      const transformed = allMetadata.map((c) => ({
         name: c.name.trim(),
         region: c.region.trim(),
         art: c.assets[0].gameAbsolutePath.trim(),
         code: c.cardCode.trim(),
         // Speed is only defined for spells. Ignore if not a spell
         speed: c.spellSpeed ? c.spellSpeed.trim() : undefined,
         cost: c.cost,
         // Ignore if not a champion
         isChamp: c.rarity === 'Champion' ? true : undefined,
         collectible: c.collectible ? true : undefined,
         subtype: c.subtype,
      }));

      console.log('Writing metadata to output file');

      const regions = new Set(transformed.map((c) => c.region));

      const toWrite = {};

      regions.forEach((region) => (toWrite[region] = []));

      transformed.forEach((c) => {
         const region = c.region;
         delete c.region;
         toWrite[region].push(c);
      });

      fs.writeFileSync(outputLocation, JSON.stringify(toWrite));
      console.log('Done');
   } catch (e) {
      console.error(e);
   }
}

main();
