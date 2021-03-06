const fs = require('fs');
const path = require('path');

const outputLocation = path.join(__dirname, 'src/Constants/lists.json');
const generatedMetadataLocation = path.join(__dirname, 'src/Constants/metadata.json');

function curated() {
   const defaultBandleCity = [
      'Otterpus'
   ];

   const defaultBilgewater = [
      'Bone Skewer',
      'Boomship',
      'Devourer of the Depths',
      'Double Up',
      'Make it Rain',
      'Mind Meld',
      'Monster Harpoon',
      'Parrrley',
      'Playful Trickster',
      'Pocket Aces',
      'Riptide',
      'Scrapshot',
      'Shakedown',
      'Twisted Fate',
      'Warning Shot',
      'Ye Been Warned',
   ];

   const defaultDemacia = [
      'Back to Back',
      'Brightsteel Formation',
      'Brightsteel Protector',
      'Cataclysm',
      'Chain Vest',
      'Cithria, Lady of Clouds',
      'Concerted Strike',
      'Detain',
      'For Demacia!',
      'Genevieve Elmheart',
      'Golden Aegis',
      'Jarvan IV',
      'Judgment',
      'King Jarvan III',
      'Molten Breath',
      'Prismatic Barrier',
      'Purify',
      'Radiant Guardian',
      'Radiant Strike',
      "Ranger's Resolve",
      'Redoubled Valor',
      'Relentless Pursuit',
      'Reposte',
      'Sharpsight',
      'Single Combat',
      'Stand Alone',
      'Strafing Strike',
      'Unyielding Spirit',
   ];

   const defaultFreljord = [
      'Avalanche',
      'Avarosan Marksman',
      'Battle Fury',
      'Blighted Ravine',
      'Bloodsworn Pledge',
      'Brittle Steel',
      'Buried in Ice',
      'Catalyst of Aeons',
      'Caught in the Cold',
      'Cold Resistance',
      'Elixir of Iron',
      'Ember Maiden',
      'Entomb',
      'Flash Freeze',
      'Fury of the North',
      'Harsh Winds',
      'Ice Shard',
      'Icequake',
      'Icevale Archer',
      'Kindly Tavernkeeper',
      'Pack Mentality',
      'Revitalizing Roar',
      'Shatter',
      'Spoils of War',
      'Succumb to the Cold',
      'Take Heart',
      'Three Sisters',
      'Troll Chant',
      'Troll Gifts',
      "Winter's Breath",
   ];

   const defaultIonia = [
      'Concussive Palm',
      'Dawn and Dusk',
      'Death Mark',
      'Deny',
      "Dragon's Rage",
      'Flurry of Fists',
      'Ghost',
      'Go Get It',
      'Health Potion',
      'Homecoming',
      'Lead and Follow',
      'Minah Swiftfoot',
      'Nopeify!',
      'Recall',
      'Retreat',
      'Ritual of Renewal',
      'Rush',
      'Shadow Flare',
      'Shadowshift',
      'Shadows of the Past',
      'Singular Will',
      'Sonic Wave',
      "Spirit's Refuge",
      'Stand United',
      'Steel Tempest',
      'Syncopation',
      'Twin Disciples',
      'Whimsy!',
      'Will of Ionia',
      'Yone, Windchaser',
   ];

   const defaultNoxus = [
      'Apprehend',
      "Blade's Edge",
      'Bloody Business',
      "Brothers' Bond",
      'Culling Strike',
      'Death Lotus',
      "Death's Hand",
      'Decimate',
      'Elixir of Wrath',
      'Guile',
      'Might',
      'Noxian Fervor',
      'Noxian Guillotine',
      'Ravenous Flock',
      'Reckoning',
      'Shunpo',
      'Scorched Earth',
      'Sharpened Resolve',
      'Sigil of Malice',
      'Survival Skills',
      'Vision',
      'Weapon Hilt',
      'Whirling Death',
      'Wild Claws',
   ];

   const defaultPnZ = [
      'Aftershock',
      'Death Ray - Mk 1',
      'Death Ray - Mk 2',
      'Death Ray - Mk 3',
      'Get Excited!',
      'Gotcha!',
      'Hextech Transmogulator',
      'Mystic Shot',
      'Rising Spell Force',
      'Statikk Shock',
      'Suit Up!',
      'Thermogenic Beam',
      'Tri-beam Improbulator',
      'Trueshot Barrage',
      'Vault Breaker',
   ];

   const defaultSI = [
      'Absorb Soul',
      'Atrocity',
      'Black Spear',
      'Commander Ledros',
      'Crawling Sensation',
      'Crumble',
      'Frenzied Skitterer',
      'Fresh Offerings',
      'Glimpse Beyond',
      'Gluttony',
      'Go Hard',
      'Grasp of the Undying',
      "Lamb's Respite",
      'Mark of the Isles',
      "Mist's Call",
      'Passage Unearned',
      'Possession',
      'Risen Mists',
      'Sap Magic',
      'Song of the Isles',
      'Spirit Journey',
      'Splinter Soul',
      'The Box',
      'The Etherfiend',
      'The Harrowing',
      'The Ruination',
      'Unspeakable Horror',
      'Vengeance',
      'Vile Feast',
      'Withering Wail',
   ];

   const defaultShurima = [
      'Ancient Hourglass',
      'Baccai Sandspinner',
      'Boomerang Blade',
      'Chronoshift',
      "Emperor's Divide",
      'Exhaust',
      'Merciless Hunter',
      'Payday',
      'Preservationist',
      'Quicksand',
      'Rampaging Baccai',
      'Ricochet',
      'Rite of Dominance',
      'Rite of Negation',
      'Ruinous Path',
      'Ruthless Predator',
      'Sanctum Conservator',
      'Scrying Sands',
      'Shaped Stone',
      'Siphoning Strike',
      'Spirit Fire',
      'Unworthy',
      'Weight of Judgement',
   ];

   const defaultTargon = [
      'Astral Protection',
      'Bastion',
      'Blessing of Targon',
      'Cosmic Rays',
      'Crescent Strike',
      'Divergent Paths',
      "Dragon's Clutch",
      'Equinox',
      'Falling Comet',
      'Grandfather Rumul',
      'Ground slam',
      'Guiding Touch',
      'Hush',
      'Meteor Shower',
      'Moonglow',
      'Moonlight Affliction',
      'Morning Light',
      'Paddle Star',
      'Pale Cascade',
      'Resplendent Stellacorn',
      'Sleepy Trouble Bubble',
      'Sneaky Zeebles',
      'Solari Sunhawk',
      'Spell Thief',
      'Starshaping',
      'Sunblessed Vigor',
      'Sunburst',
      'Supernova',
      'The Cloven Way',
      'The Infinite Mindsplitter',
      'The Serpent',
      'The Skies Descend',
      'Wish',
      'Zenith Blade',
   ];

   return {
      default: {
         'Bandle City': defaultBandleCity,
         Bilgewater: defaultBilgewater,
         Demacia: defaultDemacia,
         Freljord: defaultFreljord,
         Ionia: defaultIonia,
         Noxus: defaultNoxus,
         'Piltover & Zaun': defaultPnZ,
         'Shadow Isles': defaultSI,
         Shurima: defaultShurima,
         Targon: defaultTargon,
      },
   };
}

function generateDefaultList() {
   const metadata = JSON.parse(fs.readFileSync(generatedMetadataLocation));

   const regions = Object.keys(metadata);

   const list = {};

   for (const region of regions) {
      const regionList = [];
      const regionCards = metadata[region];

      for (const card of regionCards) {
         if (card.speed) regionList.push(card.name)
      }

      list[region] = Array.from(new Set(regionList));
   }

   return {default: list};
}

function getRemoteList(listId) {
   // not yet implemented
   return generateDefaultList();
}

function main() {
   const myArgs = process.argv.slice(2);

   let lists = {};
   if (myArgs.includes('-d') || myArgs.includes('--default'))
      lists = { ...lists, ...generateDefaultList() };
   else {
      console.log('Usage: (-d | --default) generates default list.');
      return;
   }

   fs.writeFileSync(outputLocation, JSON.stringify(lists));
}

main();
