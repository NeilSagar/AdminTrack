import express from "express";

import { addEmployee,getAllEmployees ,deleteEmployee,getAllInfo,editEmployeeData,saveAuthCredentials,getAuthCredentials} from "../controller/controller.js";



const router=express.Router();

router.post("/addEmployee",addEmployee);
router.get("/allEmployee",getAllEmployees);
router.delete("/deleteEmployee/:id",deleteEmployee);
router.get("/allInfo/:id",getAllInfo);
router.put("/editEmployee/:id",editEmployeeData);
// router.get("/getSpecificEmployees/:key",getSpecificEmployees);
router.post("/saveAuthCredential",saveAuthCredentials);
router.get("/getAuthCredential/:id",getAuthCredentials);
export default router;