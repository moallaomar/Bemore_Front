import {Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() public Question;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();



  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.Question);
  }

}
