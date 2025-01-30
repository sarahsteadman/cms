import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() passDocument = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      "1",
      "Chicken Breeds Guide",
      "An overview of the most popular chicken breeds and their characteristics.",
      "https://example.com/chicken-breeds",
      []
    ),
    new Document(
      "2",
      "Chicken Coop Building Tips",
      "A detailed guide on how to design and build a safe and functional chicken coop.",
      "https://example.com/chicken-coop-tips",
      []
    ),
    new Document(
      "3",
      "Raising Healthy Chickens",
      "Tips and tricks for keeping your chickens healthy and happy.",
      "https://example.com/raising-chickens",
      []
    ),
    new Document(
      "4",
      "Egg Production Optimization",
      "Best practices for maximizing egg production from your flock.",
      "https://example.com/egg-production",
      []
    )
  ];


  onDocumentSelected(document: Document) {
    console.log('Document selected in list:', document);
    this.passDocument.emit(document)
  }
}

