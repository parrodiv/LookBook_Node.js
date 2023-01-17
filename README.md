<p align="center">
  
  <h1 align="center">LookBook API Restful</h1>

  <p align="center">
    LookBook is an app for the sale of second hand clothing that is working <br>
    on a refactor of the swap function, to allow the exchange of used clothes. <br>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#application-structure">Application Structure</a></li>
        <li><a href="#error-handling">Error Handling</a></li>
      </ul>
    </li>
    <li><a href="#how-it-works">How it Works</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#endpoints">Endpoints</a></li>
        <ul>
          <li><a href="#users">Users</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#ordes">Orders</a></li>
        </ul>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project
This project is the final step to complete the Node.js, Express.js and MongoDB section of start2impact University.


### Built With

* [![Javascript][Javascript.js]][Javascript-url]
* [![NodeJs][NodeJs.js]][NodeJs-url]
* [MongoDB](https://www.mongodb.com/) - The database for storing data


### :books: Dependencies

* [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
* [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
* [dotenv](https://www.npmjs.com/package/dotenv) - For defining our environment variables
* [helmet](https://helmetjs.github.io/) - For secure Express App by setting various HTTP headers
* [multer](https://www.npmjs.com/package/multer) - Middleware for storing files and for handling multipart/form-data
* [cors](https://www.npmjs.com/package/cors) - Middleware which allows us to relax security applied to an API

### :gear: Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes I'll be using in the application.
- `config/` - This folder contains configuration contains allowed origins for CORS and its options, and connect database function.
- `routes/` - This folder contains the route definitions for our API.
- `model/` - This folder contains the schema definitions for our Mongoose models.

### :heavy_multiplication_x: Error Handling

In `server.js`, I use a error-handling middleware for handling log requests. This middleware is in `middleware/` folder and when an error occurs it will log date&time, the error name, error message and will create `errLog.txt` if it isn't already there.

## How It Works

This API has three model Schemas: 

- Order
- Product
- User

Through various endpoints you can make CRUD requests.

## :open_file_folder: Getting Started

### Prerequisites

To start the application you need to have Node.js installed on your machine, so to install latest version run the following command: 
```sh
npm install npm@latest -g
```

### :flippy_disk: Installation

1. Clone the repository with git in the path you prefer:

```sh
https://github.com/parrodiv/LookBook_Node.js.git
```

2. Install NPM packages

```sh
 npm install
```

3. Open app with:

```sh
  npm run dev
```

4. Connect your MongoDB database

Create, if don't exist, a `.env` file and the insert an enviroment variable named `DATABASE_URI`with your MongoDB connection string.  
Example:
`DB_URI="mongodb+srv://...`

5. Test with a client
 
If you are using VS CODE I suggest you to use Thunderclient extension, otherwise you can use Postman also.


### :pushpin: Endpoints

#### Users

You can get the entire list of users with a GET request:

`/users`

or GET one specific user

`/users/:userID`

userID must be a valid MongoDB Object ID.
You can also modify and delete one specific user with a PUT request/DELETE request to the same endpoint.

To add new user you should make a POST request to:

`/users`

```json
{
  "firstname": "alphanumeric string",
  "surname": "alphanumeric string",
  "email": "valid email"
}
```


#### Product

You can get the entire list of products with a GET request:

`/products`

To GET a specific product

`/products/:productId`

You can also modify and delete one specific product with a PUT request/DELETE request to the same endpoint.

To POST a new product: 

```json
{
  "name": "alphanumeric string",
  "images": "array of images, max 4 files",
}
```

#### Orders

To GET all orders & to POST a new order: 

`/orders`

To modify/delete a specific order make a PUT/DELETE request to:

`/orders/:orderId`

For a new order, use a POST request to: 

`/orders`

```json
{
  "users": "array of ObjectIDs of existing users",
  "products": "array of ObjectIDs of existing products"
}
```

You can filter through orders by date and products contained in the orders using QUERY parameters

 -> `/orders/date`

Filter parameters:
  - startDate: valid ISO date (2023-01-01)
  - endDate: valid ISO date (2023-01-15)
  - targetDate: valid ISO date for one specific date

- To filter throgh one specific range of dates:

`orders/date?startDate=2023-01-01&endDate=2023-01-15`

This example will return all orders placed between 2023-01-01 and 2023-01-15

- To filter one specific targetDate:

`orders/date?targetDate=2023-01-20`

This example will return all orders placed on 2023-01-20

->  `/orders/products`

Filter parameter: 

- productIds: valid IDs of existing products 

example: `orders/products?productIds=63bfcfbd9a0c7f56e698c561,63bd8985cfa6477a6d06dc49`

This example will return all all orders containing these two specific products


## License
Distributed under the MIT License. See [MIT](https://choosealicense.com/licenses/mit/) for more information.

## Contacts

Linkedin - [Alessandro Parrilla](https://www.linkedin.com/in/alessandro-parrilla-994931222/) 
Email - alessandro.parrilla.dev@gmail.com











