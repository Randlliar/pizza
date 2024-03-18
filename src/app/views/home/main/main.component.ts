import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {map, Subject, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {


  private subscription: Subscription | null = null;
  private subject: Subject<number>;
  private modalService = inject(NgbModal);

  constructor(public cartService: CartService) {
    this.subject = new Subject<number>();

    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);

    const timeout1 = setTimeout(() => {
      this.subject.complete();
    }, 4000);
  }



  ngOnInit() {

    console.log(environment.production)
    // const myModalAlternative = new bootstrap.Modal('#myModal', {})
    // myModalAlternative.show()

    this.subscription = this.subject
      .subscribe(
        {
          next: (param: number) => {
            console.log('sub 1: ', param)
          },
          error: (error: string) => {
            console.log('ERROR!!! ' + error);
          }
        }
      )
  }

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    this.popupComponent.open();
    // this.modalService.open(this.popup, {})
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {

    this.subject
      .pipe(
        map((number) => {
          return 'Number ' + number;
        })
      )
      .subscribe((param: string) => {
        console.log('sub 2: ', param)
      })
  }

}
