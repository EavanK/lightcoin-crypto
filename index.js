// Allow multiple accounts to be created
// Each account can have many transactions
// Allow withdrawals and deposits into accounts
// Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
// Allow us to retrieve the current balance of the account at any time
// Don't allow withdrawals that exceed the remaining balance of the account


class Account {

  constructor(username) {
    this.username = username;
    // this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }




  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    // this.account.balance += this.value;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (0 <= this.account.balance - this.amount);
  }
}


class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}


// DRIVER CODE BELOW

const myAccount = new Account('Eavan Kim');

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(50.25, myAccount);
console.log('Commit result:', t1.commit());
console.log('Transaction 1:', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Transaction 2:', myAccount.balance);

console.log('Withdrawal for 8.99 should be allowed...');
const t3 = new Withdrawal(8.99, myAccount);
console.log('Commit result:', t3.commit());
console.log('Transaction 3:', myAccount.balance);


console.log('Ending Account Balance: ', myAccount.balance);

console.log('Account Transaction History: ', myAccount.transactions);
