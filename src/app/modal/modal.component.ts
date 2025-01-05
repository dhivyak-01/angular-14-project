import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Component({
    selector: 'jw-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    isOpen = false;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit() {
        // Add self (this modal instance) to the modal service so it can be opened from any component
        this.modalService.add(this);

        // Move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // Close modal on background click
        this.element.addEventListener('click', (el: any) => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });
    }

    ngOnDestroy() {
        // Remove self from modal service
        this.modalService.remove(this);

        // Remove modal element from html
        this.element.remove();
    }

    open() {
        // Add 'visible' class to display the modal
        this.element.classList.add('visible');
        document.body.classList.add('jw-modal-open');
        this.isOpen = true;
    }

    close() {
        // Remove 'visible' class to hide the modal
        this.element.classList.remove('visible');
        document.body.classList.remove('jw-modal-open');
        this.isOpen = false;
    }
}
