import { PersonModel } from './person.models'; // PersonModel'in doğru yolu

export interface PersonCardModel {
  title: string;
  rows: PersonModel[];
}