import { useState } from 'react';
import CompanyCard from '../components/CompanyCard.jsx';

function Dashboard() {

    const [companyList, setCompanyList] = useState([
        {
            companyName: 'HELLA',
            positionName: 'Intern',
            status: 'Interview scheduled',
        },
        {
            companyName: 'Amazon',
            positionName: 'Werkstudent',
            status: 'Applied',
        }
    ]);

    return (
        <div>
            <h1>Smart Interview Prep Tracker</h1>
            {
                companyList.map( (company, index) => (
                    <CompanyCard 
                        key = {index}
                        companyName = {company.companyName}
                        positionName = {company.positionName}
                        status = {company.status}
                    />
                ))
            }
        </div>
    );
}

export default Dashboard; 