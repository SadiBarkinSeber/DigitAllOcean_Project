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
    // Person ID'sini almak için route parametrelerini kullan
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const personId = parseInt(id, 10);
      const storedPersons = localStorage.getItem('persons');
      if (storedPersons) {
        const persons: PersonCardModel[] = JSON.parse(storedPersons);
        // İlgili kişiyi bul ve ata
        if (persons[personId] && persons[personId].rows.length > 0) {
          this.person = persons[personId].rows[0]; 
        }
      }
    }
  }
}