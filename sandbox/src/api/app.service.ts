import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { product } from "../app/pages/products/products.model";


@Injectable()

export class AppHttpService {
    private apiUrl = 'http://localhost:8080/api';
    constructor(private http: HttpClient) {}

    findAllProducts(): Observable<product[]> {
        return this.http.get<product[]>(this.apiUrl + '/products');
    }

}