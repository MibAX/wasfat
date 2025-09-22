import { GetAllRecipesInputDto } from "@proxy/recipes";

export const RECIPE_QUERY_PARAMS = {
  CATEGORY_ID: 'categoryId' as keyof GetAllRecipesInputDto,
} as const