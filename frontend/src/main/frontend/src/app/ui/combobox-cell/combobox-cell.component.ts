import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'combobox-cell',
  templateUrl: './combobox-cell.component.html',
  styleUrls: ['./combobox-cell.component.css']
})
export class ComboboxCellComponent implements OnInit {

  @Input()  id: any;
  @Input()  text: any;
  @Input()  values: any[];
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

