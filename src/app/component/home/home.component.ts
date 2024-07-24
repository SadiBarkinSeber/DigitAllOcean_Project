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
    } else {
      this.initializeSampleData();
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

  initializeSampleData() {
    // Örnek verileri tanımla
    const sampleData = [
      {
        name: 'John',
        lastName: 'Doe',
        nationality: 'American',
        title: 'Captain',
        certificates: [
          'International Load Line Certificate',
          'International Tonnage Certificate',
          'Onboard Experience Certificate',
          'Security Awareness Certificate',
          'First Aid Certificate'
        ],
        daysOnBoard: 30,
        dailyRate: 200,
        currency: 'USD',
        totalIncome: 6000,
        discount: 10 // Örnek indirim değeri
      },
      {
        name: 'Jane',
        lastName: 'Smith',
        nationality: 'British',
        title: 'Chief Engineer',
        certificates: [
          'International Tonnage Certificate',
          'Onboard Experience Certificate'
        ],
        daysOnBoard: 45,
        dailyRate: 250,
        currency: 'USD',
        totalIncome: 11250,
        discount: 5 // Örnek indirim değeri
      },
      {
        name: 'Alice',
        lastName: 'Johnson',
        nationality: 'Canadian',
        title: 'Second Officer',
        certificates: [
          'Security Awareness Certificate'
        ],
        daysOnBoard: 20,
        dailyRate: 180,
        currency: 'USD',
        totalIncome: 3600,
        discount: 0 // Örnek indirim değeri
      },
      {
        name: 'Bob',
        lastName: 'Brown',
        nationality: 'Australian',
        title: 'Deckhand',
        certificates: [
          'First Aid Certificate',
          'Onboard Experience Certificate'
        ],
        daysOnBoard: 25,
        dailyRate: 150,
        currency: 'EUR',
        totalIncome: 3750,
        discount: 15 // Örnek indirim değeri
      },
      {
        name: 'Eve',
        lastName: 'Davis',
        nationality: 'New Zealander',
        title: 'Bosun',
        certificates: [
          'International Load Line Certificate'
        ],
        daysOnBoard: 40,
        dailyRate: 220,
        currency: 'EUR',
        totalIncome: 8800,
        discount: 8 // Örnek indirim değeri
      }
    ];
    this.person = sampleData.map(data => ({
      title: 'Sample Crew',
      rows: [data]
    }));
    localStorage.setItem('persons', JSON.stringify(this.person));
  }

  updateTotalIncome() {
    const daysOnBoard = this.newPerson.daysOnBoard || 0;
    const dailyRate = this.newPerson.dailyRate || 0;
    const discount = this.newPerson.discount || 0;

    const initialIncome = daysOnBoard * dailyRate;
    const discountAmount = (initialIncome * discount) / 100;
    this.newPerson.totalIncome = initialIncome - discountAmount;
  }

  updateDiscount(cardIndex: number, rowIndex: number, newDiscount: number) {
    const card = this.person[cardIndex];
    const member = card.rows[rowIndex];

    // Discount'u güncelle
    member.discount = newDiscount;

    // Total Income'u güncelle
    member.totalIncome = (member.daysOnBoard * member.dailyRate) - ((member.daysOnBoard * member.dailyRate) * member.discount / 100);
    
    // Veriyi localStorage'a kaydet
    localStorage.setItem('persons', JSON.stringify(this.person));
  }
}
