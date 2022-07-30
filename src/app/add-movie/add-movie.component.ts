import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  image: any;
  error: string = '';
  success: string = '';
  token: any = localStorage.getItem('userInfo');
  id: any;
  categories: any[] = []

  constructor(private _Location: Location,
    private _MoviesService: MoviesService,
    private _CategoriesService: CategoriesService,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService,
    private _Router: Router
    ) { }

  movieForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
  })

  formData = new FormData();

  onFileChange(event: any) {
    this.image = <File>event.target.files[0];
    if (event.target.files.length === 1 && this.image.type.match(/^(image\/png|image\/jpg|image\/jpeg){1}$/)) {
      this.formData.append('image', this.image, this.image.name);
    }
  }

  getCategories() {
    this._CategoriesService.getCategories(this.token).subscribe({
      next: (response) => {
        if(response.status === 'success') {
          this.categories = response.message
        }else{
          this._Location.back()
        }
      },
      error: (error) => {
        this._Location.back()
      }
    })
  }

  setFormData(movieForm: FormGroup) {
    this.spinner.show();
    if(movieForm.valid){
      this.formData.set('name', this.movieForm.controls['name'].value);
      this.formData.set('description', this.movieForm.controls['description'].value);
      this.formData.set('category_id', this.movieForm.controls['category_id'].value);
      this.addMovie(this.formData)
    }else{
      this.spinner.hide();
      this.error = 'Form is not valid'
      this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
    }
  }

  addMovie(formData: FormData){
    this._MoviesService.addMovie(this.token, formData).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response.status === 'success'){
          this.success = "Movie Added Successfully"
          this._Router.navigate(['/home']);
          this.toastr.success(this.success, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
        }else{
          this.error = 'Failed to add the movie';
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.error = "Something Went Wrong";
        this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
      }
    })
  }

  ngOnInit(): void {
    this.getCategories()
  }

}
