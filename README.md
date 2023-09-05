# Assignment 1 Javascript

## Online Bank CLI

Create ClI APP act like online banking, there is feature to login and register. user able to credit and debit the money. also able to see mutation

## Learning Competencies

- Using input/output console
- Able to implement oop in javascript
- Able to implement asyncrounous javascirpt
- Able to implement api resource with javascript
- Able to implement and modeling javascript with real case scenario

**Note** :

- Do frequent commit
- Endpoint will be serve
- you may use chalk.js library to create your cli colorful
- you may use table js library to create table

## Prerequisites

- Clone [strapi-api]() repo and
- `cd` to repo
- run `npm install`
- run `npm start`

## List endpoint

#### 1. Login

<details>
 <summary><code>POST</code> <code><b>/api/login</b></code></summary>

##### Body

```
{
    "data":{
        "username":"daniel",
        "pin":"123456"
    }
}
```

</details>

#### 2. Register

<details>
 <summary><code>POST</code> <code><b>/api/register</b></code></summary>

##### Body

```
{
   "data":{
        "username": "tandry",
        "pin": "123456",
        "wallet_number":"2220098766"
    }
}
```

</details>

#### 3. Debit

<details>
 <summary><code>POST</code> <code><b>/api/transactions</b></code></summary>

##### Body

```json
{
  "data": {
    "amount": -26000,
    "userId": 1
  }
}
```

</details>

#### 4. CREDIT

<details>
 <summary><code>POST</code> <code><b>/api/transactions</b></code></summary>

##### Body

```json
{
  "data": {
    "amount": 20000,
    "userId": 1
  }
}
```

</details>

#### 5. Balance

<details>
 <summary><code>GET</code> <code><b>/api/balance/:userId</b></code></summary>

| Parameter | Value  |
| --------- | ------ |
| UserId    | number |

</details>

#### 5. Mutation

<details>
 <summary><code>GET</code> <code><b>/api/mutation/:userId?sort=[ORDER]&filter=[TYPE]</b></code></summary>

| Parameter | Value              |
| --------- | ------------------ |
| Order     | ["asc","desc"]     |
| Type      | ["CREDIT","DEBIT"] |
| UserId    | number             |

</details>

### Story 1

User able to login and register in the cli app.

#### Part 1 Register

```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input :
```

when user input `1`

```sh
    Register
    username :
```

```sh
    Register
    pin :
```

##### Requirement:

- Username max length 10
- Pin only allowed number

if user input doesn't match with require repeat the input

if success back to :

```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input :
```

#### Part 2 Login

```sh
    Welcome to DIGI ATM
    Menu:
    1. Register
    2. Login
    Input :
```

when user input `2`

```sh
    Login
    username :
```

```sh
    Login
    pin :
```

if success enter to the main menu

### Story 2

User able to see main menu and check their balance

#### Part 1

Main menu

```sh
    Welcome to DIGI ATM
    Menu:
    1. Check Balance
    2. Debit
    3. Credit
    4. Check mutation
    5. Exit
    Input :
```

#### Part 2

if input 1

Fetch data from API

```sh
    Check balance
    Your balance is Rp. 100.000,00
    Press any Key to Back...
```

### Story 3

User able to Debit their money from the atm:

- if balance < Debit, give error display and back to main menu
- if success, back to main menu
- only allow input > 0 , if not repeat the input

user input 2

```sh
    Debit
    input :
```

Error response:

```sh
    Balance not enough for Debit
```

```sh
    error message from server
```

### Story 4

User able to Credit their money from the atm:

- if success, back to main menu
- Only allow input > 0 , if not repeat the input

user input 3

```sh
    Credit
    input :
```

Error response:

```sh
    error message from server
```

### Story 5

User able to see their mutation, the list of transaction can be sort date [asc,desc] and filter mutation base on type [CREDIT,DEBIT,ALL]

you can use `console.table` or other library to create table
input must have two word

```sh
    input : [type] [order]
```

example

```sh
    input : CREDIT asc
```

```sh
    Date        | Type   | Amount
    09-07-2023  | KREDIT | Rp. 5.000,00
    10-07-2023  | KREDIT | Rp. 20.000,00
    11-07-2023  | DEBIT  | Rp. 5.000,00
    12-07-2023  | DEBIT  | Rp. 10.000,00
```

**Note**:
`you may use libary like "table" for creating table or just use console.table`
