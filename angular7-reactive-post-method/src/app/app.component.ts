import { Component } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { 
	ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'angular7-reactive-postMethod';
  myform: FormGroup;	  
    constructor( private http: HttpClient) {
    	this.myform = new FormGroup({
         fName: new FormControl(	'',	[Validators.required, Validators.pattern('^[a-zA-Z]{2,15}$')]),
         lName: new FormControl(  '',  [Validators.required, Validators.pattern('^[a-zA-Z]{2,15}$')]),
         eMail: new FormControl(  '',  [Validators.required, Validators.pattern('^.+@.+\..+$')]),
         address: new FormControl('', 	[Validators.required])
      });  
  	}

  	 get formData() { return this.myform.controls; };
  
 validateForm() { 

for(let i in this.myform.controls)
    this.myform.controls[i].markAsTouched();

}

onSubmit (user: any): void  {
	console.log(user);    
    if (this.myform.valid) {
    let url = "https://reqres.in/api/users";     
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
      this.http.post(url, user).subscribe(res => console.log("Data Post Done"));
    
	}
	else{this.validateForm()}
  }
}
