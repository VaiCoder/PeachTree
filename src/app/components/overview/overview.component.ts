import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  
  @ViewChild('makeTransferFormEl') makeTransferFormElement: any;

  fixedBalance: number = 5824.76;
  makeTransferForm!: FormGroup;
  transactionList:any = [];
  bkp_transactionList:any = [];
  closeResult: string | undefined;
  transactionSearchTerm:string = '';
  modalOptions:NgbModalOptions = {
    backdrop: 'static'
  }

  constructor(private transactionService:TransactionService, private modalService: NgbModal, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.transactionService.getTransactionList().subscribe(
      (res:any) => {
        let sortedData = this.transactionService.getSortedData(res.data)
        this.transactionList = sortedData
        this.bkp_transactionList = sortedData
      }
    )
    this.makeTransferForm = this.formBuilder.group({
      fromAccount: [{value: "My Personal Account: € "+this.fixedBalance, disabled:true}],
      toAccount: ['', [Validators.required]],
      totalamount: [null, 
        [
          Validators.min(0),
          Validators.required,
          Validators.max(this.fixedBalance)
        ]
      ],
    });
  }

  get tf(){
    return this.makeTransferForm.controls
  }

  getConfirmation(content:any) {
    // this.makeTransferFormElement.nativeElement.submit()
    if(this.makeTransferForm.invalid) return;
    this.modalService.open(content).result.then(
      (res) => {},
      (reason) => {
        if(reason == ModalDismissReasons.BACKDROP_CLICK || reason == ModalDismissReasons.ESC){
          this.makeTransferForm.reset();
        }
      })
  }

  closeModal(){
    this.modalService.dismissAll()
    this.makeTransferForm.reset()
  }

  sendTransaction(){
    let currentTransaction = {
      "categoryCode": "#fbbb1b",
      "dates": {
        "valueDate": new Date()
      },
      "transaction": {
        "amountCurrency": {
          "amount": this.tf.totalamount.value,
          "currencyCode": "EUR"
        },
        "type": "Transfer",
        "creditDebitIndicator": "DBIT"
      },
      "merchant": {
        "name": this.tf.toAccount.value,
        "accountNumber": "SI64397745065188826"
      }
    }
    this.transactionList = this.transactionList.concat(currentTransaction)
    this.modalService.dismissAll();
    this.makeTransferForm.reset();
  }
  
  handleChange(searchTerm:string){
    this.transactionSearchTerm = searchTerm
  }

}