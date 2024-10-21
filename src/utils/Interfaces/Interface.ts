export type RecipeType = {
  label: string;
  image: string;
  url: string;
  ingredientLines: string[];
  calories: number;
  totalDaily: { [key: string]: { label: string; quantity: number; unit: string;} };
};

export type HitType = { recipe: RecipeType };

export type NextType = {
  href: string;
  title: string;
}
