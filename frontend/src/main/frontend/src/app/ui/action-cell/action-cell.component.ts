import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'action-cell',
  templateUrl: './action-cell.component.html',
  styleUrls: ['./action-cell.component.css']
})
export class ActionCellComponent implements OnInit {


  @Input() id: any;
  @Input() value: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onSelectMore: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() selectedIdChange: EventEmitter<any> = new EventEmitter();

  private isEditing: boolean;
  private copy: any;

  constructor() {
    this.isEditing = false;
  }

  ngOnInit() {
  }

  edit() {
    this.selectedIdChange.emit(this.id);
    this.copy = { ...this.value };
  }

  save() {
    this.onSave.emit(this.value);
    this.selectedIdChange.emit(null);
  }

  cancel() {
    this.onCancel.emit(this.copy);
    this.selectedIdChange.emit(null);
  }

  more() {
    this.onSelectMore.emit(this.value);
  }

  @Input()
  set selectedId(selectedId: any) {
    const isEditing: boolean = (selectedId === this.id);
    if (this.isEditing === true && isEditing === false) {
      this.onCancel.emit(this.copy);
    }
    this.isEditing = isEditing;
  }


}
