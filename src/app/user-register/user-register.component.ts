import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  error: string = '';
  success: string = '';

  constructor(private _UserAuthService: UserAuthService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }

    registerForm: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    registerSubmit(registerForm: FormGroup){
      if(registerForm.valid){
        this.spinner.show();
        this._UserAuthService.register(registerForm.value).subscribe({
          next: (response) => {
            this.spinner.hide();
            if(response.status === 'success'){
              localStorage.setItem('userInfo', response.authorisation.token);
              this._UserAuthService.user.next(response.user);
              this._Router.navigate(['/home']);
              this.success = 'Registered Successfully';
              this.toastr.success(this.success, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }else if(response.status === 'failed'){
              this.error = "The email has already been taken";
              this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }else{
              this.error = 'Failed to Register'
              this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
            }
          },
          error: (error) => {
            this.spinner.hide();
            this.error = "Failed to Register"
            this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
          }
        })
      }else{
        this.spinner.hide();
        this.error = 'Invalid Inputs';
        this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
      }
    }

  ngOnInit(): void {
  }

}
