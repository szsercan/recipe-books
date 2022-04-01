import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipe[];
  //subscription:Subscription;

  constructor(
    private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    //this.subscription= 
    this.recipeService.recipesLoaded.subscribe((data)=>{
      this.recipes=data;
    });
    this.recipeService.loadRecipes();

  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  onNewButtonClicked()
  {
    this.router.navigate(["new"],{relativeTo:this.route});
  }

}
