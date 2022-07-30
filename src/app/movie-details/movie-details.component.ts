import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  error: string = '';
  success: string = '';
  id: any;
  token: any = localStorage.getItem('userInfo')

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _MoviesService: MoviesService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _Router: Router
    ) { }

    formData = new FormData()

    getMovieId() {
      this.id =  this._ActivatedRoute.snapshot.params['id']
    }

    getMovie() {
      this.spinner.show()
      this._MoviesService.showMovie(this.token, this.id).subscribe({
        next: (response) => {
          this.spinner.hide()
          if(response.status === 'success'){
            this.movie = response.message;
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


    handleEdit(id: any) {
      this._Router.navigate(['/editMovie', id])
    }


    setFormData() {
      this.spinner.show();
      this.formData.set('_method', 'delete')
      this.deleteMovie(this.formData)
    }

    deleteMovie(formData: FormData) {
      this._MoviesService.updateMovie(this.token, this.id, formData).subscribe({
        next: (response) => {
          this.spinner.hide();
          if(response.status === 'success'){
            this._Router.navigate(['/home']);
            this.success = 'Movie Deleted Successfully'
            this.toastr.success(this.success, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });

          }else{
            this.error = 'Failed to delete the movie'
            this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
          }
        },
        error: (error) => {
          this.spinner.hide()
          this.error = 'Something went wrong, please try again later.'
          this.toastr.error(this.error, "", { positionClass: 'toast-bottom-right', timeOut: 5000 });
        }
      })
    }


  ngOnInit(): void {
    this.getMovieId()
    this.getMovie()
  }

}
