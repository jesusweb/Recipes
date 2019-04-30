import { Component, OnInit } from '@angular/core';
import { SearchRecipesService } from './search.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  recipeList: any[] = [];

  constructor(private service: SearchRecipesService, private fb: FormBuilder) {
    this.initializeSearchForm();
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(res => {
      this.getRecipes();
    });
  }

  initializeSearchForm() {
    this.searchForm = this.fb.group({
      searchString: ['', []]
    });
  }

  getRecipes() {
    const searchString = this.searchForm.get('searchString').value.trim();

    if (searchString.length === 0) {
      return;
    }

    this.service
      .fetchRecipes(`/api/?q=${searchString}&p=1`)
      .subscribe(res => {
        console.log('response: ', res);

        if (res.isOK) {
          this.recipeList = res.payload.results;
        }
      });
  }

}
