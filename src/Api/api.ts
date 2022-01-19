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
