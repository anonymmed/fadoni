# Fadoni

This project is created with React (next.js framework) and NodeJS.

## Requirement
You need Node, npm and yarn to run this project

## Installation

open the backend folder and type.

```bash
npm install
```
open the frontend folter and type

```bash
yarn install
```
## Usage
First run the backend server
```python
npm start
```
and to run the frontend dev server type:
```python
yarn dev
```
## Backend API urls (with pagination):
GET ALL PRODUCTS: GET Request to  ```http://localhost:4000/api/products/all?page=1&limit=5```
 
ADD NEW PRODUCT: POST Request to: ```http://localhost:4000/api/products/add``` with json body containing name, price and image (if image url not send in body, an image placeholder will be saved automatically)

DELETE A PRODUCTS: POST Request to  ```http://localhost:4000/api/products/delete``` with a json body containing the id of the product

SORT PRODUCTS BY NAME & PRICE: GET Request to  ```http://localhost:4000/api/products/getSorted?limit=5&page=1```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
