import mongoose from "mongoose";

const authSchema=mongoose.Schema({
    empId:{
        type:String,
        unique:true
    },
    empName:String,
    password:String
});

const authModel=mongoose.model("authCredential",authSchema);

export default authModel;