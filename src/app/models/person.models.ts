export class PersonModel {
  name: string = "";
  lastName: string = "";
  nationality: string = "";
  title: string = "";
  certificates: string[] = []; // Dizi olarak tanımlanmalı
  daysOnBoard: number = 0;    
  dailyRate: number = 0;      
  currency: string = "";
  totalIncome: number = 0;    
}