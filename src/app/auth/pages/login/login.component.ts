import Swal from 'sweetalert2';
//import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  myForm: FormGroup = this.formBuilder.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]

  })

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              //private authService:AuthService
              ) { }

  login() {
  const {email, password} = this.myForm.value;
    //  console.log(this.myForm.value)
    //  console.log(this.myForm.valid)

    //  this.authService.login(email, password)
    //  .subscribe( ok => {
    //    console.log(ok, "ok from login")
    //    if ( ok === true ) {
    //      this.router.navigateByUrl('/dashboard')
    //    } else {
    //      Swal.fire({
    //        title: 'Error!',
    //       text: ok,
    //   icon: 'error',
    //        confirmButtonText: 'Close'
    //      })
    //    }
    //  })

  }
  

}