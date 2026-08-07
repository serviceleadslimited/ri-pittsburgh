export type SearchIndexPolicy = {
  index?: boolean;
};

export function isSearchIndexable(page: SearchIndexPolicy): boolean {
  return page.index !== false;
}
