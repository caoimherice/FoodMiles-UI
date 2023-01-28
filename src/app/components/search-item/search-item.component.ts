// import { Component, OnInit } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {HttpClient, HttpHeaders} from "@angular/common/http";
// import {CognitoService} from "../../cognito.service";
// @Component({
//   selector: 'app-search-item',
//   templateUrl: './search-item.component.html',
//   styleUrls: ['./search-item.component.css']
// })
// export class SearchItemComponent implements OnInit{
//   form: FormGroup;
//   constructor(public fb: FormBuilder, private http: HttpClient,  private cognitoService: CognitoService) {
//     this.form = this.fb.group({
//       food: [''],
//       origin: [null],
//     });
//   }
//   ngOnInit() {}
//   submitForm() {
//     // @ts-ignore
//     console.log("hello")
//     // @ts-ignore
//     console.log(this.form.get('food').value)
//     // @ts-ignore
//     var food1 = this.form.get('food').value
//     // @ts-ignore
//     var origin1 = this.form.get('origin').value
//     var data = {
//       'food': food1,
//       'origin': origin1
//     }
//     console.log("-------------------------------------------")
//     console.log(data)
//     let headers;
//     this.cognitoService.getSession()
//       .then(session => {
//         headers = new HttpHeaders ({
//           Authorization: 'Bearer ' + session.getAccessToken()
//         })
//       });
//     const requestOptions = {
//       headers: headers,
//     };
//     this.http
//       .post('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/users', data, requestOptions)
//       .subscribe({
//         next: (response) => console.log(response),
//         error: (error) => console.log(error),
//       });
//   }
// }
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CognitoService} from "../../cognito.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient,  private cognitoService: CognitoService) {

  }
  ngOnInit() {}
  food = {
    name: '',
    origin: ''
  };

  searchItem() {
    // var data = {
    //   'name': this.food.name,
    //   'origin': this.food.origin
    // }
    var url = 'https://gjru6axeok.execute-api.us-east-1.amazonaws.com/food/item/' + this.food.name + '/'+this.food.origin
    console.log(url)
    let headers;

    // this.cognitoService.getSession()
    //   .then(session => {
    //     console.log("hello")
    //     console.log(session.getIdToken())
    //     // headers = new HttpHeaders ({
    //     //   Authorization: 'Bearer eyJraWQiOiJCVGlxUFRjRFVwcllOMnFPRWhqVDJEZlF4OWVBbkp1NjM4eTVhSkFZZnZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0YTU1OThiMy1lNGRiLTRlMGMtYmU4OC1iNDRmMjdmZmIxNGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfTmdST2ZyYVo4IiwiY29nbml0bzp1c2VybmFtZSI6IjRhNTU5OGIzLWU0ZGItNGUwYy1iZTg4LWI0NGYyN2ZmYjE0YSIsIm9yaWdpbl9qdGkiOiJkNTc2N2Q1NS05ZDgyLTQ0YjgtYWU2Mi04ZGJjMDQ4ZGFhMWYiLCJhdWQiOiIydDA3NG5tdjNxMjV1aGcyY25xMXJkNjAycSIsImV2ZW50X2lkIjoiMzIxZWYyYmItOWIxZi00OGRkLWFkYWUtYjIyNTc4Mzg3NjM5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NzQ3MzE3NjEsIm5hbWUiOiJDYW9pbWhlMTIzNDUiLCJleHAiOjE2NzQ3MzUzNjEsImlhdCI6MTY3NDczMTc2MSwianRpIjoiMWU5MmMwYjMtMjFkYy00MTRmLWEyODgtMmU5NzhhMjhhNDFmIiwiZW1haWwiOiJjLnJpY2UxMEBudWlnYWx3YXkuaWUifQ.ec-809eKuBmd21SjIs9KqAUSMJCtu1-4V-s50am5FNVj6kGK1sGxWC7GlW8kAKeNvFA8IobiVIoxzGSBLcB6sRKlJTjsUs9fs6eP4ReKRsdfnag4rQoqlA6nMB5hz0Thpr1UcUG0MAEglVT-jPBDab7RA9m6f7y4IwcNCYiiwgOr1CgWJU5KmQC5oOz7FWJ7l4m7slLz4FtH46871rbS4Keg9BPFqwg-KnknYCPuoLvJn-mdNp3IBXd6yfFSTQdbQWVY60t6I04gzG7_GVIH9wauP0Gxe3u_QqUmZABLl0PUTDbW19aRRKm0unoEvJ7SLpfwVBkI-0f76JTR0uMZ9g'
    //     // })
    //     // const requestOptions = {
    //     //   headers: headers,
    //     // };
    //     const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
    //     console.log(headers)
    //     this.http
    //       .post('https://gjru6axeok.execute-api.us-east-1.amazonaws.com/food/item', data, {headers})
    //       .subscribe({
    //         next: (response) => console.log(response),
    //         error: (error) => console.log(error),
    //       });
    //   });

    this.cognitoService.getSession()
      .then(session => {
        console.log("hello")
        console.log(session.getIdToken())
        // headers = new HttpHeaders ({
        //   Authorization: 'Bearer eyJraWQiOiJCVGlxUFRjRFVwcllOMnFPRWhqVDJEZlF4OWVBbkp1NjM4eTVhSkFZZnZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0YTU1OThiMy1lNGRiLTRlMGMtYmU4OC1iNDRmMjdmZmIxNGEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfTmdST2ZyYVo4IiwiY29nbml0bzp1c2VybmFtZSI6IjRhNTU5OGIzLWU0ZGItNGUwYy1iZTg4LWI0NGYyN2ZmYjE0YSIsIm9yaWdpbl9qdGkiOiJkNTc2N2Q1NS05ZDgyLTQ0YjgtYWU2Mi04ZGJjMDQ4ZGFhMWYiLCJhdWQiOiIydDA3NG5tdjNxMjV1aGcyY25xMXJkNjAycSIsImV2ZW50X2lkIjoiMzIxZWYyYmItOWIxZi00OGRkLWFkYWUtYjIyNTc4Mzg3NjM5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NzQ3MzE3NjEsIm5hbWUiOiJDYW9pbWhlMTIzNDUiLCJleHAiOjE2NzQ3MzUzNjEsImlhdCI6MTY3NDczMTc2MSwianRpIjoiMWU5MmMwYjMtMjFkYy00MTRmLWEyODgtMmU5NzhhMjhhNDFmIiwiZW1haWwiOiJjLnJpY2UxMEBudWlnYWx3YXkuaWUifQ.ec-809eKuBmd21SjIs9KqAUSMJCtu1-4V-s50am5FNVj6kGK1sGxWC7GlW8kAKeNvFA8IobiVIoxzGSBLcB6sRKlJTjsUs9fs6eP4ReKRsdfnag4rQoqlA6nMB5hz0Thpr1UcUG0MAEglVT-jPBDab7RA9m6f7y4IwcNCYiiwgOr1CgWJU5KmQC5oOz7FWJ7l4m7slLz4FtH46871rbS4Keg9BPFqwg-KnknYCPuoLvJn-mdNp3IBXd6yfFSTQdbQWVY60t6I04gzG7_GVIH9wauP0Gxe3u_QqUmZABLl0PUTDbW19aRRKm0unoEvJ7SLpfwVBkI-0f76JTR0uMZ9g'
        // })
        // const requestOptions = {
        //   headers: headers,
        // };
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + session.getIdToken().getJwtToken());
        console.log(headers)
        this.http
          .get(url, {headers})
          .subscribe((response)=>{this.router.navigate(['displayItem',JSON.stringify(response)]);
            console.log(response)
          });
      });

    console.log(this.food);
    // Perform search with this.food.name and this.food.origin
  }
}

