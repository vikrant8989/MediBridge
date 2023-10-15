import { configureStore } from "@reduxjs/toolkit";
import loginSlice  from "../Login/Loginslice";

 

export const store=configureStore({
    reducer:{
      check:loginSlice,
    },
})