import { Component } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {
  selectedText: string = 'video'

  showText(text: string): void {
    this.selectedText = text;
  }
}
