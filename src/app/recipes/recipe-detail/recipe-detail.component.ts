import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  id:number;

  constructor(private shoppingListService:ShoppingListService,
              private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'];
      this.recipeService.getRecipeById(this.id).subscribe((recipe)=>{
          this.recipe=recipe;
      });
    })
    
   
    // this.route.url.subscribe((url:UrlSegment[])=>{
    //   this.recipeService.getRecipeById(this.id).subscribe((recipe)=>{
    //     this.recipe=recipe;
    //   });
    // })
  }

  addToShoppingList(){
    for (let index = 0; index < this.recipe.ingredients.length; index++) {
      this.shoppingListService.itemAdd(this.recipe.ingredients[index])
    }
  }

  editRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id).subscribe((response)=>{
      this.recipeService.loadRecipes();
      this.router.navigate(['recipes/']);
    });
    
  }
}
