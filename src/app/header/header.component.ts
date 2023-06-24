import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/error.service';
import { ModalProfilComponent } from 'src/app/modal-profil/modal-profil.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit,OnDestroy {
  isconnected  !: boolean
  
  chami !: Chami | undefined
  constructor(
    private router: Router,
    private modal: NgbModal,
    private errorService: ErrorService,
    private dataService : DataService
  ) {
    this.user$ = this.auth.getUserObservable()

  }
  ngOnInit(): void {
      this.ChamiFromUser
  }
  
  
  user$?: Observable<any>;

  login(): void {
    this.auth.GoogleAuth();
   }


  logout(): void {
    localStorage.removeItem('isConnected')
    this.auth.SignOut();
  }

get userCaurant(){
  return this.auth.usere
}


  routerDefi(): void {
    this.router.navigateByUrl('defi');
  }



 mesDefis() : void{
   if(this.userCaurant){
    this.router.navigateByUrl('mesDefis');
   }
   else{
    this.router.navigateByUrl('accueil');
    this.errorService.addError({
      message: 'Veuillez vous authentifier',
      type: 'warning',
      selfClosing: true,
    });
   }

 }

get  ChamiFromUser(){
  return this.dataService.ChamiCaurantObs.subscribe(
    (u) => { 
      this.chami =  u
     // this.chami = JSON.parse(localStorage.getItem('chami')!)
    }
  )
}


  openProfil(): void {
    if (this.userCaurant) {
      const modalRef = this.modal.open(ModalProfilComponent, { size: 'lg' });
      modalRef.componentInstance.chami = this.chami
    } else {
      this.router.navigateByUrl('accueil');
      this.errorService.addError({
        message: 'Veuillez vous authentifier',
        type: 'warning',
        selfClosing: true,
      });
    }
  }
  ngOnDestroy(): void {
    this.auth.SignOut();
  }
}
