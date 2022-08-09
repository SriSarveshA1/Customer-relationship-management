
# Customer Relationship Management

In this application customer should be able to raise the issue(as a Ticket) and track it .



## Features
-User Registration and Login 

-Admin registration will be from the backend directly. No API support for the ADMIN user creation

-Engineer registration will be supported through API, but it needs to be approved by the ADMIN

-Customer registration will be supported through API with no approval needed from the ADMIN

-API to support the ADMIN login. Login API call should return the access token, which will be used to make all the other calls

-API to support the CUSTOMER login. Login API call should return the access token, which will be used to make all the other calls

-API to support the ENGINEER login. Login API call should return the access token, which will be used to make all the other calls.

-Login API will succeed only if the ENGINEER registration request has been approved by the ADMIN.

-Proper error message in the case ADMIN has yet not approved/rejected the registration request

-Proper validation if User Post empty request.

-And also this application will be making a call to another application which is notification service using node-rest-client
module.

-So when ever there is a ticket creation the respective Customer who created the ticket ,Engineer to whom the ticket has been assigned,
and the admin to all these stakeholders the mail will be sent.
## 🛠 Tech



-So for the Backend API I have used Nodejs and Express framework.

-And for the Database I have used Mongodb and mongoose as a ODM

-To test the apis i have used POSTMAN

## Run Locally

Clone the project

```bash
  git clone https://github.com/SriSarveshA1/Customer-relationship-management
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```

