import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  documentSelected = new EventEmitter<Document>();

  constructor() { }
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id == id) {
        return document
      }
      return null
    }
  }
}
