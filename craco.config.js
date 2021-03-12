// craco.config.js
const path = require(`path`);

const alias = (prefix = `src`) => ({
   '@images': `${prefix}/Images/`,
 });

const aliases = alias();

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
);

module.exports = {
   style: {
     postcss: {
       plugins: [
         require('tailwindcss'),
         require('autoprefixer'),
       ],
     },
   },
   webpack: {
      alias: resolvedAliases,
    },
 }