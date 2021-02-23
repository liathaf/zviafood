import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countRecipe'
})
export class CountRecipePipe implements PipeTransform {

  transform(recipes: [], countRecipe: Number): unknown {
    if (!countRecipe) return recipes;
    return recipes.filter((recipe , idx) => {
      if (idx < countRecipe) return recipe;
    });
  }

}
