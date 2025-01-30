import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: false,

  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document: Document;
  @Output() documentSelected = new EventEmitter<void>
  constructor() { }

  onSelected() {
    this.documentSelected.emit();
  }
}
