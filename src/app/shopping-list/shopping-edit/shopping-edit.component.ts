import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f') form:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingListService.startedEditing.subscribe((index:number)=>{
      this.editMode=true;
      this.editedItemIndex=index;
      this.editedItem= this.shoppingListService.getIngredientByIndex(index);
      this.form.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount,
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSubmit(form:NgForm){
    const value=form.value;
    const newIng=new Ingredient(value.name,value.amount);
    if(!this.editMode){
      this.shoppingListService.itemAdd(newIng);
    }    
    else{
      this.shoppingListService.itemUpdate(this.editedItemIndex,newIng);
    }

    this.editMode=false;
    form.reset();

  } 

  onClear(){
    this.editMode=false;
    this.form.reset();
  }

  onDelete(){
    if(this.editMode){
      this.shoppingListService.itemDelete(this.editedItemIndex);
      this.onClear();
    }
  }

}
