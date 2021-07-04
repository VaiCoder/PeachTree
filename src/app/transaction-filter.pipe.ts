import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionFilter'
})
export class TransactionFilterPipe implements PipeTransform {

  transform(transactionList: any[], searchTerm: string): any[] {
    let searchResult:any[] = [];
    if(transactionList.length > 0){
      if(!!searchTerm){
        searchTerm = searchTerm.toLowerCase()
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
