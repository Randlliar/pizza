import {Component, ElementRef, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
})
export class PopupComponent {
  private modalService = inject(NgbModal);


  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

 @Input() data: string = '';


 open(): void {
   this.modalService.open(this.popup)
 }

}
