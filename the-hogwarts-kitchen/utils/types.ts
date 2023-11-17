export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  servings: number;
  difficulty: string;
  magicLevel: string;
}

export interface RecipeSample {
  recipe: Recipe;
}
