const BASE_URL = process.env.REACT_APP_BASE_URL;

export function getCardImageURL(code: string) {
   const url = BASE_URL + code + ".png";
   return url;
}

export async function getList(
   listName: string,
   local = false
): Promise<Record<string, any>> {
   if (local) {
      return require(`../Constants/Lists/${listName}.json`);
   } else {
      return {};
   }
}
