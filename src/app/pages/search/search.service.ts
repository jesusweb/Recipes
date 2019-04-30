import { Injectable } from '@angular/core';
import { ServerService } from '@core/services/server.service';
import { Recipe } from '@core/models/recipe';

@Injectable({
    providedIn: 'root'
})

export class SearchRecipesService {
    constructor(private server: ServerService) { }

    fetchRecipes(url: string) {
        return this.server.get<FetchRecipesResponse>(url);
    }
}

export interface FetchRecipesResponse {
    title: string;
    version: number;
    href: string;
    results: Recipe[];
}