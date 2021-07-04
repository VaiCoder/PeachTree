import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OverviewComponent } from './overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionFilterPipe } from 'src/app/transaction-filter.pipe';
import { SubmitButtonComponent } from 'src/app/bb-ui/components/submit-button/submit-button.component';
import { FilterComponent } from 'src/app/bb-ui/components/filter/filter.component';

export class MockNgbModalRef{
  result:Promise<any> = new Promise((resolve, reject) => resolve('x'))
}

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let element: HTMLElement;
  let modalService:NgbModal;
  let mockModal:MockNgbModalRef = new MockNgbModalRef()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ 
        SubmitButtonComponent,
        FilterComponent,
        OverviewComponent,
        TransactionFilterPipe 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    modalService = TestBed.get(NgbModal)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fixedBalance as 5824.76', () => {
    expect(component.fixedBalance).toEqual(5824.76);
  });

  it('should call the getConfirmation method', ()=> {
    spyOn(component, 'getConfirmation');
    element = fixture.debugElement.query(By.css('.submitBtn')).nativeElement;
    element.click();
    expect(component.getConfirmation).toHaveBeenCalledTimes(0)
  })

  it('form should be invalid with empty inputs', ()=> {
    component.makeTransferForm.controls['toAccount'].setValue('');
    component.makeTransferForm.controls['totalamount'].setValue('');
    expect(component.makeTransferForm.valid).toBeFalsy();
  })

  it('form should be invalid with negative amount', ()=> {
    component.makeTransferForm.controls['totalamount'].setValue(-9);
    expect(component.makeTransferForm.valid).toBeFalsy();
  })

  it('form should be invalid with excess amount', ()=> {
    component.makeTransferForm.controls['totalamount'].setValue(59999);
    expect(component.makeTransferForm.valid).toBeFalsy();
  })

  it('form should be invalid with balance below 500', ()=> {
    component.makeTransferForm.controls['totalamount'].setValue(5833);
    expect(component.makeTransferForm.valid).toBeFalsy();
  })

  it('form should be valid', ()=> {
    component.makeTransferForm.controls['toAccount'].setValue('Vaidehi');
    component.makeTransferForm.controls['totalamount'].setValue(1000)
    expect(component.makeTransferForm.valid).toBeTruthy();
  })

  // it('should clear Transfer form variables on modal close', ()=> {
  //   spyOn(modalService, 'dismissAll')
  //   expect(component.setMakeTransferForm).toHaveBeenCalled()
  // })

  // it('should call the sendTransaction method when modal closed', ()=> {
  //   // component.makeTransferForm.controls['toAccount'].setValue('Vaidehi');
  //   // component.makeTransferForm.controls['totalamount'].setValue(1000)
  //   spyOn(modalService, 'open').and.returnValue(mockModal);
  //   component.getConfirmation("<xxxx>")
  //   expect(modalService.open).toHaveBeenCalledWith('<xxxx>')
  // })

});
