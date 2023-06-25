import mongoose from "mongoose";


import employeeModel from "../schemas/employeeSchema.js";
import authModel from "../schemas/authSchema.js";



export const addEmployee= async(req,res)=>{
    const employeeData=req.body;
    const newEmployee=new employeeModel(employeeData);
    // console.log(newEmployee);
    try {
        const response=await newEmployee.save();
        res.status(201).json({message:response});
    } catch (error) {
        res.status(404).json({message:error.message});
    }

};

export const getAllEmployees=async(req,res)=>{
    try {
        const allEmployeeData=await employeeModel.find({}).select("empId name jobTitle");
        // console.log(allEmployeeData);
        res.status(200).json(allEmployeeData);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const deleteEmployee=async(req,res)=>{
    const empId=req.params.id;
    try {
        await employeeModel.findOneAndDelete({"empId":empId});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const getAllInfo=async(req,res)=>{
    const empId=req.params.id.toUpperCase();
    try {
        const employeeData=await employeeModel.findOne({"empId":empId});
        res.status(200).json(employeeData);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const editEmployeeData=async(req,res)=>{
    const empId=req.params.id.toUpperCase();
    const data=req.body;
    const changedEmpData=new employeeModel(data);
    try {
        await employeeModel.findOneAndUpdate({"empId":empId},changedEmpData);
        res.status(200).json({message:"Employee Updated Successfully."});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

// export const getSpecificEmployees=async(req,res)=>{
//     console.log(req.params.key);
// }

export const saveAuthCredentials=async(req,res)=>{
    const data=req.body;
    const signingUpUserData=new authModel(data);

    // console.log(signingUpUserData);
    try {
        const response=await signingUpUserData.save();
        res.status(201).json({message:response});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getAuthCredentials=async(req,res)=>{
    const empId=req.params.id;
    try {
        const empDetails=await authModel.findOne({empId:empId});
        res.status(201).json(empDetails);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}