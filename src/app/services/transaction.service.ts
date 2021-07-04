import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) { }

  getTransactionList(){
    // this.http.get('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions').subscribe(
    return this.http.get('http://localhost:4200/app/bb-ui/mock-data/transactions.json')
  }

  getSortedData(list:any[]){
    return list.sort((a:any,b:any) => {
      return <any>new Date(b.dates.valueDate) - <any>new Date(a.dates.valueDate);
    })
  }

}
