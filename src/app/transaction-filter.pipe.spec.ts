import { TransactionFilterPipe } from './transaction-filter.pipe';

describe('TransactionFilterPipe', () => {
  const pipe = new TransactionFilterPipe();
  const mockTransaction = [
    {
      merchant: {
        name: 'abc'
      }
    },
    {
      merchant: {
        name: 'abcd'
      }
    },
    {
      merchant: {
        name: 'pqr'
      }
    }
  ]
  const mockTransactionResult = [
    {
      merchant: {
        name: 'abc'
      }
    },
    {
      merchant: {
        name: 'abcd'
      }
    }
  ]
  const mockSearchTerm = "abc"

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  }); 

  it('should return all transactions when no searchterm', ()=> {
    expect(pipe.transform([1],'')).toEqual([1])
  })

  it('should return empty when no transactions', ()=> {
    expect(pipe.transform([],'test')).toEqual([])
  })

  it('should return transactions merchant name having searchterm', ()=> {
    
    expect(pipe.transform(mockTransaction,mockSearchTerm)).toEqual(mockTransactionResult)
  })



});
