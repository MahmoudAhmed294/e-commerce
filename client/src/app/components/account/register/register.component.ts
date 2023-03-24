import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

ngOnInit(): void {
  this.initializeForm()
}
registerForm:FormGroup = new FormGroup({});
validationErrors: string[] | undefined;

constructor(
  public accountService: AccountService,
  private fb: FormBuilder,
  private router: Router

) {}
initializeForm() {
  this.registerForm = this.fb.group({
    name:['', [Validators.required,Validators.maxLength(30)]],
    email:['', [Validators.required,Validators.maxLength(50),Validators.email]],
    password:['',[Validators.required,Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword:['',[Validators.required , this.matchPassword('password')]]
  })
  this.registerForm.controls['password'].valueChanges.subscribe({
    next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
  })
}

matchPassword(matchTo:string):ValidatorFn {
  return (control : AbstractControl)=>{
    return control.value === control.parent?.get(matchTo)?.value
    ? null
    : {notMatching: true}
  }
}

register(){
  this.accountService.register(this.registerForm.value).subscribe({
    next:()=>{
      this.router.navigateByUrl("/")
    },
    error:(error)=>{
      this.validationErrors = error;
    }
  })

}
}
