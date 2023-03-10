import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
ngOnInit(): void {
  this.initializeForm()
}
loginForm:FormGroup = new FormGroup({});

validationErrors: string[] | undefined;

constructor(
  public accountService: AccountService,
  private fb: FormBuilder,
  private router: Router

){}

  initializeForm() {
    this.loginForm = this.fb.group({
      email:['', [Validators.required,Validators.maxLength(50),Validators.email]],
      password:['',[Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
    })
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=>{
        this.router.navigateByUrl("/")
      },
      error:(error)=>{
        this.validationErrors = error;
      }
    })
  }
  
  }
