import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  documentSelected = new EventEmitter<Document>();
  documentDeleted = new EventEmitter<Document[]>();

  constructor() { }
  getDocuments() {
    return this.documents.slice();
  }
  getDocument(id: string) {
    console.log("Get Document called")
    let i = 0
    for (let document of this.documents) {
      console.log(i, id, document.id)
      i++
      if (document.id == id) {
        return document
      }
    }
    return null
  }
  deleteDocument(document: Document): void {
    const index = this.documents.indexOf(document);
    if (index < 0) {
      return;
    }
    this.documents.splice(index, 1);
    this.documentDeleted.emit(this.documents.slice());
  }
}
