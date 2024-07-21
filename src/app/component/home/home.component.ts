import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../../models/person.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // 'styleUrl' yerine 'styleUrls' olmalı
})
export class HomeComponent implements OnInit {
  person: PersonModel[] = [];

  newPerson: PersonModel = {
    name: '',
    lastName: '',
    nationality: '',
    title: '',
    certificates: '',
    daysOnBoard: 0,
    dailyRate: 0,
    currency: '',
    totalIncome: 0
  };

  constructor() {}

  ngOnInit(): void {}

  addPerson() {
    this.person.push({ ...this.newPerson });
    this.resetForm();
  }

  saveChanges() {
    // Bu noktada, person dizisini bir servise göndererek kalıcı olarak kaydedebilirsiniz.
    console.log('Person List Saved:', this.person);
  }

  resetForm() {
    this.newPerson = {
      name: '',
      lastName: '',
      nationality: '',
      title: '',
      certificates: '',
      daysOnBoard: 0,
      dailyRate: 0,
      currency: '',
      totalIncome: 0
    };
  }
}