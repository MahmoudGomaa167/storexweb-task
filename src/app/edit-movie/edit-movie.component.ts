import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {
  image: any;
  error: string = '';
  success: string = '';
  movie: any;
  token: any = localStorage.getItem('userInfo');
  id: any;
  categories: any[] = []

  constructor(private _Location: Location,
    private _MoviesService: MoviesService,
    private _CategoriesService: CategoriesService,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService,
    private _ActivatedRoute: ActivatedRoute
    ) { }

    movieForm: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      category_id: new FormControl(null, [Validators.required]),
    })

    formData = new FormData();

    onFileChange(event: any) {
      this.image = <File>event.target.files[0];
      if (event.target.files.length == 1 && this.image.type.match(/^(image\/png|image\/jpg|image\/jpeg){1}$/)) {
        this.formData.append('image', this.image, this.image.name);
      }
    }

    getMovie() {
      this.spinner.show()
      this._MoviesService.showMovie(this.token, this.id).subscribe({
        next: (response) => {
          this.spinner.hide()
          if(response.status === 'success'){
            this.movie = response.message;
            this.setFormValue(this.movie)
          }else{
            this.error = 'Failed To load the movie'
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });

          }
        },
        error: (error) => {
          this.spinner.hide()
          this.error = 'Something Went Wrong, please try again later'
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });

        }
      })
    }

    setFormValue(movie: any) {
      this.movieForm.setValue({
        name: movie?.name || '',
        description: movie?.description || '',
        category_id: movie?.category?.id || ''
      })
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

    getMovieId() {
      this.id =  this._ActivatedRoute.snapshot.params['id']
    }

    setFormData(movieForm: FormGroup) {
      this.spinner.show();
      if(movieForm.valid){
        this.formData.set('name', this.movieForm.controls['name'].value);
        this.formData.set('description', this.movieForm.controls['description'].value);
        this.formData.set('category_id', this.movieForm.controls['category_id'].value);
        this.formData.set('_method', 'put')
        this.updateMovie(this.formData)
      }else{
        this.spinner.hide();
        this.error = 'Form is not valid'
        this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
      }
    }

    updateMovie(formData: FormData){
      this._MoviesService.updateMovie(this.token, this.id, formData).subscribe({
        next: (response) => {
          this.spinner.hide();
          if(response.status === 'success'){
            this.success = 'Movie Updated Successfully';
            this._Location.back()
          this.toastr.success(this.success, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
          }else{
            this.error = 'Failed to update';
            this._Location.back()
            this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
          }
          
        },
        error: (error) => {
          this.spinner.hide();
          this.error = 'Something went wrong';
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
        }
      })
    }

   



  ngOnInit(): void {
    this.getMovieId();
    this.getMovie();
    this.getCategories()
  }

}
