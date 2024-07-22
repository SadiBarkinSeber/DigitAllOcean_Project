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
  tempPerson: PersonModel[] = []; // Temporarily hold the persons added via Add Crew
  availableCertificates: string[] = ['Cert1', 'Cert2', 'Cert3', 'Cert4', 'Cert5']; // Sertifikalar

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCertificatesChange(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions, (option: any) => option.value);
    this.newPerson.certificates = selectedOptions;
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
      this.person.push(tableCard); // PersonCardModel ile uyumlu
      this.tempPerson = []; // Clear the temporary list after saving
  
      // Verileri localStorage'a kaydet
      localStorage.setItem('persons', JSON.stringify(this.person));
    }
    localStorage.setItem('persons', JSON.stringify(this.person));

  }

  resetForm() {
    this.newPerson = new PersonModel(); // Reset form
  }

  deletePerson(cardIndex: number, rowIndex: number) {
    const card = this.person[cardIndex];
    card.rows.splice(rowIndex, 1); // Remove the person from the rows array

    // If card.rows is empty, remove the entire card
    if (card.rows.length === 0) {
      this.person.splice(cardIndex, 1); // Remove the card
    }
    localStorage.setItem('persons', JSON.stringify(this.person));
  }

  viewPersonDetails(cardIndex: number, rowIndex: number) {
    this.router.navigate(['/crew', cardIndex, rowIndex]);
  }
}
