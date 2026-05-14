Step 1 - Problem Statement:
When preparing for jobs all the details are scattered. Notes are separate. Questions are forgotten. Application status becomes confusing. 
So this Application centralizes everything.
------
Tech Stack-
Frontend:
- React
- Vite
Backend:
- Node.js
- Express
Database:
- MongoDB
------
Step 2 - Screens of the App:

Page 1 - Dashboard
1. See List of all companies
2. Add Company
3. Delete Company
4. Click on Company for details

Page 2 - Company Detail Page
Company:
Status:
Interview Questions:
Preparation Notes:

Step 3 - How Data looks like? (For Reference)
in a JSON file
{ 
	"companyName": "HELLA",
	"positionName": "Intern",
	"status": "Interview Scheduled",
	"interviewDate": "19.05.2026",
	"questions": ["Explain RestAPI"],
	"notes": ["Revise React"]
}

------

The frontend structure of the our program
```text
src/
 ├── components/
 │     └── CompanyCard.jsx
 │
 ├── pages/
 │     └── Dashboard.jsx
 |     └── CompanyDetails.jsx
 │
 ├── App.jsx
```
------

Now first make frontend So in the Folder "Job_List_Management" install the Modern frontend build tool - Vite. While installing, make folder frontend with that as well.

>npm create vite@latest frontend
Framework: React
Variant: JavaScript

>cd frontend
>npm install
>npm run dev

------

We'll add twwo folders in src-
components
pages

Go to the pages then add file named Dashboard.jsx

In Dashboard we are building the main screen of the application. Make just one simple Dashboard with some headers.

Then edit App.jsx. REmove all content in the return then add that Dashboard component. 

So now, the heirarchy would look like-
App = Parent
	| 
Dashboard = Child

Now your browser should show 

Smart Interview Prep Tracker
Dashboard

------

Now we'll add one file named CompanyCard.jsx in folder components
Company Card does not own the data it receives or displays the data that is coming from the parent compoent that is Dashboard.jsx

Now we'll render the CompanyCard.jsx to the Dashboard. The use of dynamic UI like CompnayCard is that we can use it as many timea as we want with different data. It becomes like a template for the Companies Data. 

The visual Hirarchy is now:
```text
App
  ↓
Dashboard
  ├── CompanyCard (HELLA)
  └── CompanyCard (Amazon)
```

------

Now we go to state management phase where we will change the handcoded cards to data stored in state that uses Hooks. we will add companyList state where it will have all the list of companies in JSCON format. We'll then remove the hardcoded <CompanyCard .../> and add the logic inside the jsx code. We will add the mapping 

Lifting State: I lifted the companyList state to the Dashboard component because it is the common parent, so that all child components (CompanyCard) can access and modify the shared data through props and callbacks.
Prop Drilling: Passing data from a parent to deeply nested child components through multiple layers of props. Good thing isin my current project, I pass props from Dashboard to CompnayCard, but I haven't yet faced deep prop drilling scenarios. In larger applications this can become difficult to maintain, which is why solutions like Context API are used.
Context API is a way to share data across components without passing props manually at every level. For instance-
```text
cosnt CompanyContext = createContext();   //create Context
<CompnayContext.Provider value={companyList}>   //Provide Data (Parent level)
       <Dashboard />
<CompnayContext.Provider>
const data = useContext(CompanyContext);   //consume data (Any Child)
```
Now we no need to pass props manually. But this just theory and not our project implementation yet.
------

Now we'll come to Form handling with Event System phase. We'll control the UI with state and will take input from the user. So when the state update the UI updates.

When the user types inside the input field, the onChange event triggers and updates the corresponding React state using setState functions. After clicking the Add Company button, the handleSubmit function executes and creates a new company object. This new object is added into the companyList state using setCompanyList. Since state changes, React re-renders the component. During rendering, map() loops through the updated companyList array and dynamically creates CompanyCard components. The company data is passed as props to CompanyCard, which displays the information in the UI.

------

Implement delete functionality using React callbacks

Each companyCard will now have Delete Button. When clicked: the CompanyCard notifies Dashboard then Dashboard removes the company. UI re-renders automatically.
```text
Dashboard owns companyList
       ↓ props
CompanyCard receives data
       ↓ callback trigger
Dashboard updates state
       ↓
UI re-renders
```

A callback function in React is a function passed from a parent component to a child component through props, allowing the child to trigger logic in the parent component. 
We pass () => deleteCompany(index) so the function executes only when the delete button is clicked. Otherwise, deleteCompany would run immediately during component rendering.
When the user clicks the Delete button inside CompanyCard, the onDelete callback function is triggered. This callback executes the deleteCompany function in the Dashboard component with the correct company index. The Dashboard component updates the companyList state using filter() to create a new array without the selected company. Since the state changes, React re-renders the UI and the deleted CompanyCard disappears from the screen.
```text
Parent owns state
      ↓
Child receives props
      ↓
Child triggers callback
      ↓
Parent updates state
      ↓
React re-renders UI
```
------

Implement company status updates using immutable React state

Now we'll edit the existing data that is UPDATE. With this our CRUD operation will be done in the frontend. In the CompanyCard we'll add the button 'Mark as completed' that will change the status to Completed. Using the callback function.

When the user clicks the Mark Completed button, the onUpdate callback function is triggered inside CompanyCard. This callback executes the updateStatus function in the Dashboard component. The Dashboard updates the selected company’s status inside the companyList state using map(). After the state updates, React re-renders the UI and displays the updated company status.
```text
User clicks update button
       ↓
Child triggers callback
       ↓
Dashboard updates state
       ↓
map() creates updated array
       ↓
React re-renders UI
       ↓
Status changes visually
```

------
Implement conditional rendering based on company status

Frontend is NOT static HTML pages. Frontend is UI reacting to changing state. So we will now work on Conditional Rendering. The CompanyCard component dynamically displays different messages depending on the company status using React conditional rendering.
```text
State/Props change
       ↓
React re-renders component
       ↓
Conditions evaluated again
       ↓
Matching UI displayed
```
------
Implement React useEffect for state change tracking

React components mainly do render UI BUT applications also need API calls, fetching data, timers, localStorage, subscriptions, logging, syncing external systems. These are called side effects. Side effects are operations that interact with the outside world of React rendering, such as API calls, fetching data, timers, localStorage operations, or syncing with external systems. And that's why we will implement useState(). A side effect is somthing outside the normal UI rendering. So because React rendering should stay predictable so react separates UI rendering vs Side Effects.Rendering is the process where React updates the UI based on state or props changes. Side effects are operations that happen after rendering and are used for external tasks like API calls, logging, or interacting with the browser or server.

syntax of useEffect-
```text
useEffect(() => {
	//Side effect logic
}, [dependencies]);
```
useEffect is commonly used for fetching backend data, calling REST APIs, authentication checks, loading initial data. [dependencies] is a dependency array. It tells React to run the useEffect function only when the that state changes. 
------
Add localStorage persistence for company list

Local storage is a browser features that stores data in the browser, keeps data even after refresh and does not need backend. Because localStorage only stores strings So we convert array → string.

useState(() => {}) - This is called lazy initialization. It runs only once on first render.
localStorage.setItem("companies", ...) --- Here key = "companies", value = your data
```text
After adding companies: 
state changes
↓
useEffect runs
↓
data saved to localStorage

After refresh:
load from localStorage
↓
restore companyList
↓
UI shows previous data
```
------
Initialize Express backend server and REST API setup

Time for working in backend. We'll add one folder named backend and there create package.json file. -y here means yes for everything. So this command creates Node.js project instantly with default settings.
>npm init -y

Now we'll install 2 packages. express used for backend servers, APIs, routes, HTTP requests/responses. cors (cross-origin resource sharing) for frontend and backend to communicate, expecially when running on different ports. Without cors browser block requests.
>npm install express cors

The backend server was created using Express.js. CORS middleware was added to allow communication between the React frontend and backend server. The server listens on port 5000 and exposes a basic route to verify that the backend is running correctly.

A REST API is a communication system where the frontend and backend exchange data using HTTP requests such as GET, POST, PUT, and DELETE.
------
Create GET companies REST API endpoint

We will now create a real API endpoint. Endpoint is a URL on backend that performs some operation like GET /companies which means 'give me all companies'. 
When the backend server starts using app.listen(), it begins listening on port 5000. When the browser visits /companies, a GET request is sent to the backend. Express matches this request with the app.get('/companies') route. The callback function executes, and res.json(companies) sends the companies array back as a JSON response. The browser then displays the returned JSON data. 
```text
Browser
   ↓ GET request
localhost:5000/companies
   ↓
Express route matches
   ↓
Backend function runs
   ↓
res.json(companies)
   ↓
JSON response returned
   ↓
Browser displays data
```
------
Configure nodemon for backend auto-restart

since React/Vite auto refresh but Node restart is needed. We will install nodemon which is a development tool that automatically restarts your Node.js server whenever file changes.
>npm install nodemon --save-dev

You currently have:
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
}

Change to:
"scripts": {
    "start": "nodemon server.js"
}

Before you use to type- node server.js
Now run:
>npm start
------
Connect React frontend with backend REST API

React frontend will commmunicate with backend API. Currently frontend use hardcoded state data with localStorage. We will replace it with real backend API data.
```text
Dashboard loads
      ↓
useEffect runs
      ↓
fetch sends GET request
      ↓
backend receives request
      ↓
backend returns JSON
      ↓
response.json parses data
      ↓
setCompanyList updates state
      ↓
React re-renders UI
```
We'll remove the const companyList... state content from Dashboard bacause now backend owns the data not frontend.
When the Dashboard component loads, the useEffect runs once because of the empty dependency array. Inside useEffect, fetch() sends an asynchronous GET request to the backend API endpoint. The Express backend receives the request through app.get('/companies') and returns the companies array using res.json(). After the asynchronous request completes, the first .then() parses the JSON response into a JavaScript array/object using response.json(). The second .then() receives the parsed data and updates the React state using setCompanyList(data). React then re-renders the UI using the backend data.

```text
Example response object. Imagine backend sends: [ { "name": "Google" }, { "name": "Amazon" }]. The browser first receives something like:
response = {
   status: 200,
   ok: true,
   headers: {...},
   body: "raw stream data"
}
The actual JSON is still hidden inside the body. So we do: response.json(). This extracts and converts the body into JavaScript data.
```
------
Implement POST API for creating companies

We were getting data from backend with GET. Now we'll send data to teh backend with POST. Current situation is adding compnay only changes frontend state but after refresh company disappears.  so our goal is to add Compnany from the suer input then frontend will send the data to the backend and then backend should stores the company.
```text
User submits form
       ↓
Frontend creates company object
       ↓
POST request sent
       ↓
Backend receives req.body
       ↓
Backend stores company
       ↓
Backend sends response
       ↓
Frontend request completes
```
currently frontend UI will not automatically update yet because we only sent POST request. We have not refetched bakced data yet.

For testing: After clicking Add Company: visit: http://localhost:5000/companies . You should be able to see the newly added companies (dont forget to refresh).

When the user clicks the Add Company button, the async handleSubmit function runs. A newCompany object is created and sent to the backend using a POST request through fetch(). The request body contains JSON stringified company data. The backend receives the request through app.post('/companies'). express.json() middleware parses the incoming JSON and stores it inside req.body. The backend then pushes the new company into the companies array and sends a success response back to the frontend.

------
Implement synchronized frontend-backend CRUD flow

Right now our flow is Add Company -> Backend updates -> Frontend still old, because frontend state was never refreshed. So our goal is that after the POST request is done, Frontend automatically fetches latest backed data. This creates synchronised frontend + backend.
POST /companies → then GET /companies again. Backend is the real storage, Frontend is just display. So whenever backend changes, frontend must refresh data.
So there's only one mantra that frontend needs to follow 'After changing data, fetch it again'.

We can do this by moving our fetch logic outside the useEffect and make it as a function, so that we an call it on the handleSubmit as well. 

When the user submits the form, handleSubmit runs and sends a POST request containing the new company data to the backend. The backend stores the company data and returns a response. After the POST request completes, fetchCompanies() is called using await to retrieve the latest company list from the backend. The updated data is stored in React state using setCompanyList(), causing the UI to re-render. Additionally, fetchCompanies() also runs inside useEffect when the component initially loads.

------
Implement full-stack DELETE API functionality

Now we'll implement delete operation. Right now delating is only happening in frontend but the data is still saved in the backed. So after refresh the deleted data is still displayed again because backend was never updated. Our goal is when user clicks Delete button, frontend should send DELETE request and backend should remove company then frontend refreshes automatically.

To make that specific element delete we'll add the id on the companyList object.
```text
User clicks Delete
       ↓
Frontend sends DELETE request
       ↓
URL contains company id
       ↓
Backend receives id
       ↓
Backend filters company array
       ↓
Company removed
       ↓
Frontend refetches data
       ↓
UI updates automatically
```
When the user clicks the Delete button, deleteCompany() runs in the frontend. fetch() sends a DELETE request containing the company ID in the API URL. The backend receives the request through app.delete('/companies/:id'). Express extracts the route parameter using req.params.id. The backend then removes the matching company using filter() and returns a response. After deletion, the frontend refetches the updated company list and React re-renders the UI.

------

Implement full-stack UPDATE API (PUT)

Right now if status changes, we cannot update existing company. So we will fix with UPDATE API. Our goal is when user clicks 'Mark as complete' so backend should updates only status and then frontend refreshes UI. To do that we will use app.put() on the server.js.
Note: filter → removes items, map → updates items 

User clicks button
       ↓
Frontend calls updateCompanyStatus()
       ↓
PUT request sent with id + new data
       ↓
Backend receives req.params.id
       ↓
Backend uses map() to update item
       ↓
Backend sends response
       ↓
Frontend refetches data
       ↓
UI updates automatically

When the user clicks the ‘Mark as Completed’ button, the update function is triggered in the frontend. A PUT request is sent to the backend with the company ID and updated data. The backend receives the request through the route /companies/:id and extracts the ID using req.params.id. It then updates the correct company using map(), replacing only the required fields using the spread operator. After the update is completed, the backend sends a response. The frontend then calls fetchCompanies() to retrieve the latest data, and React re-renders the UI with the updated information.

------

Add controllers and refactor backend structure

Working with controllers. Now we'll split one simple thing into layers in the backend. Rgiht now the backend looks mixed with logic and route that is hard to maintain. So we|ll make clean structure.
```text
backend/
 ├── routes/
 │     └── companyRoutes.js
 ├── controllers/
 │     └── companyController.js
 ├── server.js

Now:
routes → define URL "WHERE request goes"
controllers → logic "WHAT happens there"
server → connection
```

After the end of the implementation we'll might get the syntax error: Cannot use import statement outside a module.
This happens when Node.js dont understand ES Module syntax (import/export) because your backend is still running in CommonJS mode that is (const express = require("express");). But I wrote: (import express from "express";) which is ES module syntax

Fixing: Go to backend/package.json
Add this: "type": "module"
in something like
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js"
  }
}

We separate routes and controllers to keep the backend modular and maintainable. Routes define the API URLs, while controllers contain the actual logic. This prevents server files from becoming too large and difficult to manage.
In my backend, server.js initializes the Express app and connects route files using app.use(). The route file defines API endpoints like GET, POST, PUT, and DELETE, and each route calls its corresponding controller function where the actual CRUD logic is implemented.

------

Add MongoDB Atlas integration and backend connection setup
Remove exposed MongoDB credentials and move to environment variables
Security fix: remove exposed .env and protect credentials

Right now the data is getting stored temporarily in RAM and if the UI rerenders the data gets deleted. So now to store it permanently we will use the Database and that too NoSQL DB MongoDB. 
We'll work with MongoDB Atlas (Cloud) a cloud hosted MongoDB. Its recommended for small projects and majority of the company use it. 
Make account here- https://www.mongodb.com/cloud/atlas
Create Cluster that is a group of server where our database will be stored and managed.
Simple Analogy here:
Cluster is your database machine/server- JobListServer
Database is folder- jobListDB
Collection is table- companies
Document is the raw/data- { companyName, positionName, status }

on the MongoDB atlas. Create cluster. Create username and password (suggestion: make pass without special characters). Then add the 
IP address: 0.0.0.0/0  
Description: Local Development

Press Connect button at the top. choose Drivers: Node.js

Now go to the backend and in the termal
>npm install mongoose
Then connect to the MongoDb server in the backend server.js. Connect it through mongoose.

Making .env file to save the URL that contains passwords. And also install
>npm install dotenv
Node.js cannot read .env automatically.
Then enable dotenv in Server meaning import it.
Add the .env file in .gitignore 
>backend/.env
----------------

Add MongoDB Company schema and model structure

First we'll talk about schema that defines the structure of data in MongoDB. For instance right now we are storing-
{companyName: "Amazon",
  positionName: "Intern",
  status: "Applied"}

Without schema we might forget the fields. So with schema we fix the structure. Like:
companyName → String
positionName → String
status → String

Make folder models inside backend. models becuase it holds all database structures (tables in SQL terms)














