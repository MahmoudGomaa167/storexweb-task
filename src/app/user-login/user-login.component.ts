import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  error: string = '';
  success: string = '';

  constructor(private _UserAuthService: UserAuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }

    loginForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    loginSubmit(loginForm: FormGroup) {
      if(loginForm.valid){
        this.spinner.show()
        this._UserAuthService.login(loginForm.value).subscribe({
          next: (response) => {
            this.spinner.hide()
            if(response.status === 'success'){
              localStorage.setItem('userInfo', response.authorisation.token)
              this._Router.navigate(['/home']);
              this.success = 'Login Successfully'
              this.toastr.success(this.success, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }else if(response.status === 'error'){
              this.error = 'Failed to Login';
              this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }
          },
          error: (error) => {
            this.spinner.hide()
            if(error.error.message === 'Unauthorized'){
              this.error = "Invalid Email or Password Please Register"
              this._Router.navigate(['/register'])
              this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }else{
              this.error = error.error.message
              this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }
          }
        })
      }else{
        this.spinner.hide()
        this.error = 'Invalid Inputs'
        this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
      }
    }



  ngOnInit(): void {
    
  }

}
