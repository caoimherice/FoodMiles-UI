import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "./register.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: [''],
      userId: [null],
    });
  }
  ngOnInit() {}
  submitForm() {
    // @ts-ignore
    var name1 = this.form.get('name').value
    // @ts-ignore
    var userId1 = this.form.get('userId').value
    var data = {
      'name': name1,
      'userId': userId1
    }
    const headerDict = {
      'Content-Type': 'application/json'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    // @ts-ignore
    //formData.append('name', this.form.get('name').value);
    // @ts-ignore
    //formData.append('userId', this.form.get('userId').value);
    this.http
      .post('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/users', data, requestOptions)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }
  // productForm: any;
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private productService: ProductService
  // ) {
  //   // build form fields for product
  //   this.productForm = this.formBuilder.group({
  //     'name': ['', [ Validators.required ] ],
  //     'id': []
  //   });
  //   // Get the id of the product from the url
  // }
  // productFormSubmit() {
  //   // If id_product is there in the URL then we will update the product information (PUT method)
  //   // Otherwise we will add the product  (POST method)
  //   this.addProduct();
  // }
  // // Function for adding the product (POST)
  // form: any;
  // addProduct() {
  //   let context = this.productForm.value;
  //   this.productService.addProduct(context)
  //     .subscribe(
  //       data => {
  //         if(data.success) {
  //           // Do your things if product successfully added
  //         } else {
  //           // Do your things if product is not added
  //         }
  //       }, error => {
  //         // Do your things if some error occurred in the request
  //       });
  // }
  //
  // submitForm() {
  //
  // }
  //
  // uploadFile($event: Event) {
  //
  // }
}
