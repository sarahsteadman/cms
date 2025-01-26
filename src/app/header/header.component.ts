import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() pageSelected = new EventEmitter<string>();

    onSelect(page: string) {
        console.log(page)
        this.pageSelected.emit(page);
    }
}
