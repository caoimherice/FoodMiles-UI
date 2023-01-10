// code for product.service.ts

import { Injectable } from '@angular/core';
//import { Response } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
//import { Register } from './register.component';
import { map } from 'rxjs/operators'


@Injectable()
export class ProductService {
  postId: any;
  constructor(
    private http: HttpClient) { }

  // Create a get http request (get product information in json format)
  // getProduct(id: number): Observable<Register> {
  //   return this.http.get(`$this.http_product_url/${id}`)
  //     .pipe(map((response: Response) => response.json()));
  // }

  // Create a post http request (post/add product data to server)
  // addProduct(context: any) {
  //   return this.http.post(`$this.http_product_url`, JSON.stringify(context))
  //     .pipe(map((response: Response) => response.json()));
  // }
  ngOnInit() {
    // Simple POST request with a JSON body and response type <any>
    this.http.post<any>('https://reqres.in/api/posts', { title: 'Angular POST Request Example' }).subscribe(data => {
      this.postId = data.id;
    })
  }
}
