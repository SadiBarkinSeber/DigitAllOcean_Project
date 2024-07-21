import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}

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
    }
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
  }
}