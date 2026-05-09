Step 1 - Problem Statement:
When preparing for jobs all the details are scattered. Notes are separate. Questions are forgotten. Application status becomes confusing. 
So this Application centralizes everything.
------
## Tech Stack
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
