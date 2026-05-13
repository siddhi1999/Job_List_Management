let companies = [];  //using let because we'll add,delete,update company

export const getCompanies = (req, res) => {
    res.json(companies);  //send JSON data back to frontend
}

export const addCompanies = (req, res) => {
    const newCompany = { 
        id: Date.now(),
        ...req.body
    };  //req.body contains data sent from frontend. This only worked becasue earlier we added app.use(express.json()). It spreads compnayName, positionName, status here
    companies.push(newCompany);   //temporary stores new compnay in backend array. Letr MOngoDB will replace this
    res.json(({message: "Company added successfully"}));
}

export const deleteCompanies = (req, res) => {
    const companyId = Number(req.params.id);   //:id is a dynamic route parameter and those are in strong when it comes back to the backend to we use Number() to convert it
    companies = companies.filter((company) =>
        company.id !== companyId
    );
    res.json({message: "Company deleted succesfully"});
}

export const updateCompanies = (req, res) => {
    const companyId = Number(req.params.id);
    companies = companies.map((company) => {
        if(company.id === companyId) {
            return {
                ...company,  //these two lines keep old data + overwrite updated fields
                ...req.body
            };
        };
        return company;
    });
    res.json({message: "Company updated successfully"});
}

// export default getCompanies;
// export default addCompanies;
// export default deleteCompanies;
// export default updateCompanies;