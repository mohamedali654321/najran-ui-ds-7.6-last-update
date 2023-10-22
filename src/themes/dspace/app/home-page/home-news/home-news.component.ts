import { Component ,Input  } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { SubmissionService } from 'src/app/submission/submission.service';
import { SubmissionObject } from 'src/app/core/submission/models/submission-object.model';
import { isNotEmpty, isNotNull } from 'src/app/shared/empty.util';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer'; //kware-edit
import { select, Store } from '@ngrx/store'; //kware-edit
import { isAuthenticated } from 'src/app/core/auth/selectors'; //kware-edit
import { Observable } from 'rxjs';
@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html'
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {
  isAuthorized$: Observable<boolean>;  //kware-edit
  images = [
  
    {
      imageSrc:'/assets/dspace/images/nu.jpg',
      imageAlt: 'nature2',
    },
    {
      imageSrc:'/assets/dspace/images/3.jpg',
      imageAlt: 'person1',
    },
    {
      imageSrc:'/assets/dspace/images/4.jpg',
      imageAlt: 'person2',
    },
    {
      imageSrc:'/assets/dspace/images/2.png',
      imageAlt: 'person2',
    },
    {
      imageSrc:'/assets/dspace/images/6.jpg',
      imageAlt: 'person2',
    },
    {
      imageSrc:'/assets/dspace/images/7.jpg',
      imageAlt: 'person2',
    },
    {
      imageSrc:'/assets/dspace/images/8.jpg',
      imageAlt: 'person2',
    },
  ];


 




  constructor( private submissionService: SubmissionService,private router: Router,public store: Store<AppState>){super();}
  @Input() showScopeSelector = true;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isAuthorized$ = this.store.pipe(select(isAuthenticated)); //kware-edi
  }

  createSubmissionFormById(id: string){
    this.submissionService.createSubmission(id)
    .subscribe((submissionObject: SubmissionObject) => {
      if (isNotNull(submissionObject)) {
        if (isNotEmpty(submissionObject) && this.isAuthorized$) {
         this.router.navigate(['/workspaceitems/',submissionObject?.id,'edit']);
      }
      else{
        this.router.navigate(['login'])
      }
    }})
  }
}

