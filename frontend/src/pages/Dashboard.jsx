import { useEffect, useState } from 'react';
import CompanyCard from '../components/CompanyCard.jsx';

function Dashboard() {

    const [companyName, setCompanyName] = useState('');
    const [positionName, setPositionName] = useState('');
    const [status, setStatus] = useState('');

    const [companyList, setCompanyList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCompany = {
            companyName, 
            positionName,
            status
        };

        setCompanyList([...companyList, newCompany]);
    };

    const deleteCompany = (indexToDelete) => {
        const updatedCompanyList = companyList.filter((_,index) => index !== indexToDelete);  //filter contain only the matching elements
        setCompanyList(updatedCompanyList);
    };

    const updateStatus = (indexToUpdate) => {
        const updatedCompanyList = companyList.map((company,index) => {
            if(index === indexToUpdate) {
                return({
                    ...company,
                    status: 'Completed'
            });
            }
            return company;
        });
        setCompanyList(updatedCompanyList);
    };

    useEffect(() => {
        fetch('http://localhost:5000/companies')   //sends async http requst to the backend API endpoint and returns a Promise containing the response
        .then((response) => response.json())  //.then() means when async operation finishes, run this. response.json() convert backend response into JS object/array 
        .then((data) => {setCompanyList(data)})  //saving backend JSON string data into React usable JS data
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

                        onDelete = {() => deleteCompany(index)}  //attention we are ending function as a prop and this is callback
                        onUpdate = {() => updateStatus(index)}
                    />
                ))
            }
        </div>
    );
}

export default Dashboard; 