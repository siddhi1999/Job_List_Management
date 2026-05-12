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













