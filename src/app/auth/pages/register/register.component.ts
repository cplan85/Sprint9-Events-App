//import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    userName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]

  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    //private authService:AuthService
    ) { }

  register() {
    console.log(this.myForm.value)

    const {name, email, password} = this.myForm.value;

    // this.authService.register(name,email, password)
    // .subscribe( ok => {
    //   console.log(ok, "ok from register")
    //   if ( ok === true ) {
    //     this.router.navigateByUrl('/dashboard')
    //   } else {
    //     Swal.fire({
    //       title: 'Error!',
    //      text: ok,
    //  icon: 'error',
    //       confirmButtonText: 'Close'
    //     })
    //   }
    // })

  }


}
