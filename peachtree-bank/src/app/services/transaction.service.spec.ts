import { TestBed } from '@angular/core/testing';
import * as mockTransactionData from '../bb-ui/mock-data/transaction'

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should return transactionList', () => {
    expect(service.getTransactionList()).toBe(mockTransactionData);
  });
});
