import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonModel } from '../../models/person.models'; // Doğru yolu kontrol et
import { PersonCardModel } from '../../models/personCard.model'; // Doğru yolu kontrol et

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {
  person: PersonModel | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cardIndex = +params.get('cardIndex')!;
      const rowIndex = +params.get('rowIndex')!;
      const storedPersons = localStorage.getItem('persons');
      if (storedPersons) {
        const persons: PersonCardModel[] = JSON.parse(storedPersons);
        if (persons[cardIndex] && persons[cardIndex].rows[rowIndex]) {
          this.person = persons[cardIndex].rows[rowIndex]; 
        }
      }
    });
  }
}