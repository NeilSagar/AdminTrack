import axios from "axios";
const URL="http://localhost:5000";

export const addEmployee=async(data)=>{
    try {
        const response=await axios.post(URL+"/addEmployee",data);
        // console.log("Employee successfully added.",response);
        return response;
    } catch (error) {
        console.log("Error while adding employee:",error.message);
        return error.response;
    }
}

export const allEmployee=async()=>{
    try {
        const response=await axios.get(URL+"/allEmployee");
        // console.log(response);
        return (response.data) ;
    } catch (error) {
        console.log("Error while fetching all employees' data:",error.message);
        return error;
    }
}

export const deleteEmployee=async(empId)=>{
    try {
        const response=await axios.delete(URL+"/deleteEmployee/"+empId);
        return response;
    } catch (error) {
        console.log("Error while deleting the employee:"+empId,error.message);
        return error;
    }
}

export const moreInfoEmployee=async(empId)=>{
    try {
        const response=await axios.get(URL+"/allInfo/"+empId);
        // console.log(response);
        return response;
    } catch (error) {
        console.log("Error while getting all data about the employee:"+empId,error.message);
        console.log(error);
    }
}

export const editEmployeeData=async(data,empId)=>{
    try {
        const response=await axios.put(URL+"/editEmployee/"+empId,data);
        return response;
    } catch (error) {
        console.log("Error while updating employee:"+empId,error.message);
    }
}

// export const getSpecificEmployees=async(keyword)=>{
//     const searchedVal={"searchedVal":keyword};
//     try {
//         // console.log(searchedVal);
//         const response=await axios.get(URL+"/getSpecificEmployees/"+keyword);
//         console.log(response);
//     } catch (error) {
//         console.log("Error while fetching the employees with keyword:"+keyword,error.message);
//     }
// }

export const saveAuthCredentials=async(data)=>{
    try {
        const response=await axios.post(URL+"/saveAuthCredential",data);
        return response;
    } catch (error) {
        console.log("Error while saving Auth-Credentials. Error:",error.message);
        return error;
    }
}

export const getAuthCredentials=async(empId)=>{
    try {
        const response=await axios.get(URL+"/getAuthCredential/"+empId);
        console.log(response);
        return response;
    } catch (error) {
        console.log("Error while fetch log In credentials",error.message);
        return error;
    }
}