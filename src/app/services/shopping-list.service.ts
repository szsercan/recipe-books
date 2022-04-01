import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  startedEditing= new Subject<number>();

  private ingredients:Ingredient[]=[
    new Ingredient("Apple",5),
    new Ingredient("Tomato",10),
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients;
  }

  getIngredientByIndex(index:number){
    return this.ingredients[index];
  }

  itemAdd(newIng:Ingredient){
    this.ingredients.push(newIng);
  }

  itemUpdate(index:number,ing:Ingredient){
    this.ingredients[index]=ing;
  }

  itemDelete(index:number){
    this.ingredients.splice(index,1);
  }
}
