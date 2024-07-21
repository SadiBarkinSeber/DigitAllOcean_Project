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
}