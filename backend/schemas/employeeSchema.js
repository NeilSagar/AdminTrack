import mongoose from "mongoose";

const employeeSchema=mongoose.Schema({
    empId:{
        type:String,
        unique:true
    },
    name:String,
    sex:String,
    dob:{type:String},
    phone:{type: Number},
    email:{type:String},
    address:{type:String},
    jobTitle:{type:String},
    department:{type:String},
    joiningDate:{type:String},
    reportingTo:{type:String},
    salary:{type:Number},
    workingHourStarts:{type:String},
    workingHourEnds:{type:String},
    leaveBalance:{type:Number},
    leavesTaken:{type:Number},
    notableContributions:{type:String}
});

const employeeModel=mongoose.model("employee",employeeSchema);

export default employeeModel;