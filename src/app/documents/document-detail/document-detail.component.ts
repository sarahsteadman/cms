import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,

  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
  id: string
  document: Document
  nativeWindow: any;

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private windRefService: WindRefService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nativeWindow = this.windRefService.getNativeWindow();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      console.log(this.id)
      this.document = this.documentService.getDocument(this.id)
      console.log(this.document)
    })

  }
  onView(): void {
    if (this.document && this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(): void {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
