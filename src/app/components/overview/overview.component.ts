import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  
  @ViewChild('makeTransferFormEl') makeTransferFormElement: any;

  fixedBalance: number = 5824.76;
  defaultFromAccount:string = "My Personal Account: € "+this.fixedBalance;
  makeTransferForm!: FormGroup;
  transactionList:any = [];
  bkp_transactionList:any = [];
  closeResult: string | undefined;
  transactionSearchTerm:string = '';
  modalOptions:NgbModalOptions = {
    backdrop: 'static'
  }

  constructor(private http:HttpClient, private modalService: NgbModal, private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    // this.http.get('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions').subscribe(
      this.http.get('http://localhost:4200/app/bb-ui/mock-data/transactions.json').subscribe(
      (res:any) => {
        let sortedData = this.getSortedData(res.data)
        this.transactionList = sortedData
        this.bkp_transactionList = sortedData
      }
    )
    this.setMakeTransferForm();
  }

  getSortedData(list:any[]){
    return list.sort((a:any,b:any) => {
      return <any>new Date(b.dates.valueDate) - <any>new Date(a.dates.valueDate);
    })
  }

  setMakeTransferForm(){
    this.makeTransferForm = this.formBuilder.group({
      fromAccount: [{value: this.defaultFromAccount, disabled:true}],
      toAccount: ['', [Validators.required]],
      totalamount: [null, 
        [
          Validators.min(0),
          Validators.required,
          Validators.max(this.fixedBalance),
          this.checkAmount.bind(this)
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
          this.setMakeTransferForm();
        }
      })
  }

  closeModal(){
    this.modalService.dismissAll()
    this.setMakeTransferForm();
  }

  checkAmount(fieldCtrl:AbstractControl):any{
    if(!fieldCtrl.value || fieldCtrl.value < 0 || fieldCtrl.value > this.fixedBalance) return null;
    if(this.fixedBalance - fieldCtrl.value < 500 ){
      return {
          below500: true
        }
    }
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
    this.makeTransferForm.reset({'fromAccount':"My Personal Account: € "+this.fixedBalance});
  }
  
  handleChange(searchTerm:string){
    this.transactionSearchTerm = searchTerm
  }

}