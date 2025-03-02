import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ContactsComponent } from "./contacts/contacts.component";
import { DocumentsComponent } from "./documents/documents.component";
import { MessagesComponent } from "./messages/messages.component";
import { DocumentDetailComponent } from "./documents/document-detail/document-detail.component";
import { ContactDetailComponent } from "./contacts/contact-detail/contact-detail.component";
import { DocumentStartComponent } from "./documents/document-start/document-start.component";
import { ContactStartComponent } from "./contacts/contact-start/contact-start.component";
import { ContactEditComponent } from "./contacts/contact-edit/contact-edit.component";
import { DocumentEditComponent } from "./documents/document-edit/document-edit.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/documents', pathMatch: 'full' },
    {
        path: 'documents', component: DocumentsComponent, children: [
            { path: '', component: DocumentStartComponent, pathMatch: 'full' },
            { path: 'add', component: DocumentEditComponent },
            { path: ':id', component: DocumentDetailComponent },
            { path: ':id/edit', component: DocumentEditComponent },
        ]
    },
    {
        path: 'contacts', component: ContactsComponent, children: [
            { path: '', component: ContactStartComponent, pathMatch: 'full' },
            { path: 'add', component: ContactEditComponent },
            { path: ':id', component: ContactDetailComponent },
            { path: ':id/edit', component: ContactEditComponent },

        ]
    },
    {
        path: 'messages', component: MessagesComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}