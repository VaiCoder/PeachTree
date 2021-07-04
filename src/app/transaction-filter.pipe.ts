import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionFilter'
})
export class TransactionFilterPipe implements PipeTransform {

  transform(transactionList: [], searchTerm: string): any[] {
    let searchResult:[] = [];
    if(transactionList.length > 0){
      if(!!searchTerm){
        searchResult = <[]>transactionList.filter(
          (each:any) => {
            return each.merchant.name.toLowerCase().indexOf(searchTerm) > -1;
          }
        )
      }else{
        searchResult = transactionList
      }
    }
    return searchResult;
  }

}
