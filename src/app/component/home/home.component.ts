import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonModel } from '../../models/person.models'; // Doğru yolu kontrol et
import { PersonCardModel } from '../../models/personCard.model'; // Doğru yolu kontrol et

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  person: PersonCardModel[] = []; // PersonCardModel kullanıyoruz
  newPerson: PersonModel = new PersonModel();
  personCertificates: string[] = [];
  tempPerson: PersonModel[] = []; // Temporarily hold the persons added via Add Crew
  availableCertificates: string[] = [
    'International Load Line Certificate',
    'International Tonnage Certificate',
    'Onboard Experience Certificate',
    'Security Awareness Certificate',
    'First Aid Certificate'
  ]; 
  selectedPerson: PersonModel = new PersonModel(); // To hold the person whose certificates are to be viewed

  
  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedPersons = localStorage.getItem('persons');
    if (storedPersons) {
      this.person = JSON.parse(storedPersons);
    }
  }

  onCertificatesChange(event: any) {
    const selectedCert = event.target.value;
    if (event.target.checked) {
      this.newPerson.certificates.push(selectedCert);
    } else {
      this.newPerson.certificates = this.newPerson.certificates.filter(cert => cert !== selectedCert);
    }
  }

  addPerson() {
    this.tempPerson.push({ ...this.newPerson });
    this.resetForm();
  }

  saveChanges() {
    if (this.tempPerson.length > 0) {
      const tableCard: PersonCardModel = {
        title: 'New Crew List',
        rows: this.tempPerson
      };
      this.person.push(tableCard);
      this.tempPerson = [];
      localStorage.setItem('persons', JSON.stringify(this.person));
    }
  }

  resetForm() {
    this.newPerson = new PersonModel();
  }

  deletePerson(cardIndex: number, rowIndex: number) {
    const card = this.person[cardIndex];
    card.rows.splice(rowIndex, 1);

    if (card.rows.length === 0) {
      this.person.splice(cardIndex, 1);
    }
    localStorage.setItem('persons', JSON.stringify(this.person));
  }

  viewPersonDetails(cardIndex: number, rowIndex: number) {
    this.router.navigate(['/crew', cardIndex, rowIndex]);
  }

  viewCertificates(cardIndex: number, rowIndex: number) {
    const selectedCard = this.person[cardIndex];
    this.personCertificates = selectedCard.rows[rowIndex].certificates;
  
    // Modal'ı açmak için jQuery kullanarak
    (window as any).$('#certificatesModal').modal('show');
  }
  
  openModal(cardIndex: number, rowIndex: number): void {
    const selectedCard = this.person[cardIndex];
    this.selectedPerson = selectedCard.rows[rowIndex];
  }
}