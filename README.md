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
´´´

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
´´´
