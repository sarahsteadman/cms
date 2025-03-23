import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { DocumentListComponent } from './document-list/document-list.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentUpdated = new Subject<Document[]>();
  maxDocumentId: number;
  private url: string = "http://localhost:3000/documents";
  // private url: string = "https://cms-wdd-430-8b69d-default-rtdb.firebaseio.com/documents.json";


  constructor(private http: HttpClient) {
    this.fetchDocuments();
  }
  getDocuments() {
    if (!this.documents) {
      console.log("No document's yet.")
      return
    }
    return this.documents.slice();
  }
  getDocument(id: string) {
    let i = 0
    for (let document of this.documents) {
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
    newDocument.id = ""
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>(this.url,
      newDocument,
      { headers: headers })

      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.url + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
        }
      );
  }
  deleteDocument(document: Document): void {
    if (!document) {
      return
    }
    let pos = this.documents.indexOf(document)
    if (pos < 0) {
      return
    }
    this.http.delete(this.url + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
        }
      );
  }
  async fetchDocuments() {
    try {
      this.documents = await this.http.get<Document[]>(this.url).toPromise() || [];
      this.maxDocumentId = this.getMaxId();
      this.documentUpdated.next(this.documents.slice());
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }
  storeDocuments() {
    this.http.put(this.url, this.documents).subscribe(response => {
      console.log(response)
    },
      (error) => {
        console.error("Error storing documents:", error);
      })
  }
}
