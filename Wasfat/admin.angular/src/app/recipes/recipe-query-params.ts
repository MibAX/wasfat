export const RecipeParamKeys = {
  categoryId: 'categoryId',
} as const;


export interface RecipeQueryParams {
  categoryId?: string | null;
}
