import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { DocumentListComponent } from './document-list/document-list.component';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = MOCKDOCUMENTS;
  documentUpdated = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.maxDocumentId = this.getMaxId();
  }
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
  getMaxId(): number {
    let maxId = 0

    for (let document of this.documents) {
      let currentId = parseInt(document.id)

      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return
    }

    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString()
    this.documents.push(newDocument)
    this.documentUpdated.next(this.documents.slice())
  }
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return
    }
    let pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id
    this.documents[pos] = newDocument
    this.documentUpdated.next(this.documents.slice())
  }
  deleteDocument(document: Document): void {
    if (!Document) {
      return
    }
    let pos = this.documents.indexOf(document)
    if (pos < 0) {
      return
    }
    this.documents.splice(pos, 1)
    this.documentUpdated.next(this.documents.slice())
  }
}
