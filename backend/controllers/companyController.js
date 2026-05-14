import Company from "../models/Company.js";

export const getCompanies = async (req, res) => {
    const companies = await Company.find();   //find() queries MongoDB and retrieves all documents from the collection
    res.json(companies);
};

export const addCompanies = async (req, res) => {
    const newCompany = await Company.create(req.body);
    res.json(newCompany);
};

export const deleteCompanies = async (req, res) => {
    await Company.findByIdAndDelete(req.params.id);    //req.params.id is a dynamic value extracted from the URL path parameter
    res.json({message: "Company deleted succesfully"});
};

export const updateCompanies = async (req, res) => {
    await Company.findByIdAndUpdate(req.params.id, req.body);   //findByIdAndUpdate has a format Model.findByIdAndUpdate(id, updatedData)
    res.json({message: "Company updated successfully"});
};

