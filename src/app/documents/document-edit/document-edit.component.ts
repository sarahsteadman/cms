import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-document-edit',
  standalone: false,

  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') docForm: NgForm
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  nativeWindow: any;
  id: string;

  constructor(private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      if (!this.id) {
        this.editMode = false;
        console.log("Id not found")
        return
      }
      console.log(this.id)
      this.originalDocument = this.documentService.getDocument(this.id)
      console.log(this.originalDocument)
      if (!this.originalDocument) {
        return
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
      console.log(this.document)
    })
  }
  onCancel(): void {
    this.router.navigate(['/documents']);
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(this.id, value.name, value.description, value.url, value.children);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

}
