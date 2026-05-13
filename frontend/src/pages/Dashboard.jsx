import { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard.jsx';

function Dashboard() {

    const [companyName, setCompanyName] = useState('');
    const [positionName, setPositionName] = useState('');
    const [status, setStatus] = useState('');

    const [companyList, setCompanyList] = useState([]);

    const handleSubmit = async (e) => {  //this function contains asynchronous operation that is await
        e.preventDefault();

        const newCompany = {
            companyName, 
            positionName,
            status
        };

        await fetch('http://localhost:5000/companies', {  //await means wait until API request completes
            method: 'POST',
            headers: {   //Frontend sending JSON data
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newCompany)   //send company object to backend
        });

        await fetchCompanies();

    };

    const deleteCompany = async (indexToDelete) => {
        await fetch(`http://localhost:5000/companies/${indexToDelete}`, 
            {method: 'DELETE'}
        ); 
        await fetchCompanies();
    };

    const updateStatus = async (indexToUpdate) => {
        await fetch(`http://localhost:5000/companies/${indexToUpdate}`,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({status: 'Completed'})
            }
        );
        await fetchCompanies();
    };

    const fetchCompanies = async () => {
        const response = await fetch('http://localhost:5000/companies');   //there are two wasits because both operations are asynchronous: network request, JSON parsing
        const data = await response.json();
        setCompanyList(data);
    };

    useEffect(() => {
        fetchCompanies();
    }, []); // empty dependency array run only once when component loads

    return (
        <div>
            <h1>Smart Interview Prep Tracker</h1>
            <p><b>Insert New Company Here</b></p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='companyName'>Enter Company Name</label>
                    <input 
                        id = "companyName"
                        placeholder = "Company Name"
                        type = "text"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                    />

                    <label htmlFor='positionName'>Enter Position Name</label>
                    <input 
                        id = "positionName"
                        placeholder = "Position Name"
                        type = "text"
                        value={positionName}
                        onChange={(event) => setPositionName(event.target.value)}
                    />

                    <label htmlFor='status'>What's the status</label>
                    <input 
                        id = "status"
                        placeholder = "Status"
                        type = "text"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    />
                </div>
                <button type='submit'>Add Company</button>
            </form>

            {
                companyList.map( (company, index) => (
                    <CompanyCard 
                        key = {index}
                        companyName = {company.companyName}
                        positionName = {company.positionName}
                        status = {company.status}

                        onDelete = {() => deleteCompany(company.id)}  //attention we are ending function as a prop and this is callback
                        onUpdate = {() => updateStatus(company.id)}
                    />
                ))
            }
        </div>
    );
}

export default Dashboard; 