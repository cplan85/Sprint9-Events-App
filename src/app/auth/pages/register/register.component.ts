//import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    name: ['John Doe', [Validators.required, Validators.minLength(2)]],
    userName: ['Jdoe1', [Validators.required, Validators.minLength(4)]],
    email: ['JohnDoe@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]

  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthService
    ) { }

    swalWithCustomStyle = Swal.mixin({
      customClass: {
        confirmButton: 'mat-raised-button mat-warn',
        cancelButton: 'mat-raised-button mat-accent'
      },
      buttonsStyling: false
    })

  register() {
    console.log(this.myForm.value)

    const {name, userName, email, password} = this.myForm.value;

     this.authService.register(name,userName, email, password)
     .subscribe( ok => {
       console.log(ok, "ok from register")
       if ( ok === true ) {
         this.router.navigateByUrl('/dashboard')
      } else {
         this.swalWithCustomStyle.fire({
           title: 'Error!',
         text: ok,
      icon: 'error',
          confirmButtonText: 'Close'
         })
      }
     })

  }


}
