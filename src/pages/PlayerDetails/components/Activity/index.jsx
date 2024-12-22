import React, { useState } from "react";
import ActivityTable from "./ActivityTable";
import AccountOverview from "./AccountOverview";

const index = ({basicInfo}) => {
  const [openAccountOverview, setOpenAccountOverview] = useState(false)
  const [currentDetails,setCurrentDetails] = useState({})
  return (
    <>
      {openAccountOverview ? 
      <AccountOverview 
      setOpenAccountOverview={setOpenAccountOverview}
      basicInfo={basicInfo}
      setCurrentDetails={setCurrentDetails}
      currentDetails={currentDetails}
      /> : 
      <ActivityTable 
      setOpenAccountOverview={setOpenAccountOverview} 
      basicInfo={basicInfo}
      setCurrentDetails={setCurrentDetails}
      />}
    </>
  );
};

export default index;
