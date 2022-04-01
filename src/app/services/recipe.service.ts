import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  //public recipeSelected=new EventEmitter<Recipe>();
  //recipeList=new Subject<Recipe[]>();
  recipesLoaded=new EventEmitter<Recipe[]>();
  apiUrl="http://localhost:35512/api/";

  constructor(private httpClient:HttpClient) { }

  loadRecipes(){
    let path=this.apiUrl+"Recipe/GetAll";
    this.httpClient.get<Recipe[]>(path).subscribe((response)=>{
      //this.recipeList.next(response);
      this.recipesLoaded.emit(response);
    })
  }

  getRecipeById(id:number){
    let path=this.apiUrl+"Recipe/Get?Id="+id;
    return this.httpClient.get<Recipe>(path);
  }

  addRecipe(recipe:Recipe){
    return this.httpClient.post(this.apiUrl+"Recipe/Add",recipe);
  }

  updateRecipe(id:number,recipe:Recipe){
    const obj={...recipe,id:id};
    return this.httpClient.post(this.apiUrl+"Recipe/Update",obj);
  }

  deleteRecipe(id:number){
    const obj={Id:id};
    return this.httpClient.post(this.apiUrl+"Recipe/Delete",id);
  }


}
