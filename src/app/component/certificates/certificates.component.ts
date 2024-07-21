import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html'
})
export class CertificatesComponent {
  @Input() certificates: string[] = [];
}