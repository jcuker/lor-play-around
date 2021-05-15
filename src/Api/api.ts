const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getCardImageURL(code: string) {
   const url = BASE_URL + code + '.png';
   return url;
}

export async function getList(
   listName: string,
   local = false
): Promise<Record<string, any>> {
   if (local) {
      const lists = require(`../Constants/lists.json`);
      return lists[listName] || {};
   } else {
      return {};
   }
}
