import { useEffect } from "react";
import Stepper from "../components/Stepper/Stepper";

function Verification() {
  // const userType = "CLIENT"


  useEffect(() => {
    window.scrollTo(0, 0);
  });


  return (


   
      <div className=" flex flex-col gap-10 h-screen items-center justify-center pt-28">

            
            
      <Stepper userType="client" />
{/*<Stepper userType="engineer" />*/}


          </div>
)};


export default Verification;
