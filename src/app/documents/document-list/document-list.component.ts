import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[];
  private docChangeSub: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.docChangeSub = this.documentService.documentUpdated.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      })
  }
  ngOnDestroy(): void {
    this.docChangeSub.unsubscribe();
  }
}

