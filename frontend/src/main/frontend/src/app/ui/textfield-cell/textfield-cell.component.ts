import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'textfield-cell',
  templateUrl: './textfield-cell.component.html',
  styleUrls: ['./textfield-cell.component.css']
})
export class TextfieldCellComponent implements OnInit {

  @Input()  id: any;
  @Input()  text: any;
  @Output() textChange: EventEmitter<any> = new EventEmitter();

  private isEditing: boolean;
  
  constructor() { }

  ngOnInit() {
    this.isEditing = false;
  }


  @Input()
  set selectedId(selectedId: any) {
    this.isEditing = (selectedId === this.id);
  }

}
