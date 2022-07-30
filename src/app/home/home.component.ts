import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { CategoriesService } from '../categories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: any = localStorage.getItem('userInfo');
  movies: any[] = [];
  error: string = '';
  categories: any[] = [];

  constructor(private _MoviesService: MoviesService,
    private _CategoriesService: CategoriesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _Router: Router
    ) { }

  selectForm: FormGroup = new FormGroup({
    categoryId: new FormControl(null)
  })

  getMovies() {
    this.spinner.show();
    this._MoviesService.listMovies(this.token).subscribe({
      next: (response) => {
        this.spinner.hide();
        if(response.status === 'success') {
          this.movies = response.message;
        }else{
          this.error = 'Failed To Load Movies';
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.error = 'Something Went Wrong, Please try again later.'
        this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
      }
    })
  }

  getCategories() {
    this._CategoriesService.getCategories(this.token).subscribe({
      next: (response) => {
        if(response.status === 'success') {
          this.categories = response.message
        }else{
          this.error = 'Failed to load categories'
        }
      },
      error: (error) => {
        this.error = 'Something went wrong';
      }
    })
  }


  filterMovieByCategory(formData: FormGroup) {
    this.spinner.show()
    this._MoviesService.getMovieByCategory(this.token, formData.controls['categoryId'].value).subscribe({
      next: (response) => {
        this.spinner.hide()
        if(response.status === 'success'){
          this.movies = response.message;
        }else{
          this.error = 'Failed To Load Movies';
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
        }
      },
      error: (error) => {
        this.spinner.hide()
        this.error = 'Something Went Wrong, Please try again later.'
        this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
      }
    })
  }

  handleNavigate(id: any) {
    this._Router.navigate(['/movieDetails', id])
  }

  ngOnInit(): void {
    this.getMovies()
    this.getCategories()
  }

}
