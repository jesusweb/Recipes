import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Response } from '@core/models/response';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: CoreModule
})
export class ServerService {
    constructor(private http: HttpClient) {}

    get<T = any>(url: string): Observable<Response<T>> {
        const fullURL = this.getFullURL(url);
        const options = {
            headers: new HttpHeaders().set(
                'X-Requested-With',
                'For use with cors-anywhere'
            )
        };

        return this.http.get<T>(fullURL, options).pipe(
            map(response => {
                console.log(response);
                return Response.success(response);
            }),
            catchError(this.handleError)
        );
    }

    private handleError(error) {
        return of(Response.error(error));
    }

    private getFullURL(url: string) {
        return environment.corsHelperURL + '/' + environment.apiURL + url;
    }
}