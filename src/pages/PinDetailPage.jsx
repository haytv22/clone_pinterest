import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPinByIdAPI } from "../services/api.services";

export const PinDetailPage = () => {
  const id = useParams();
  console.log(id);

  const getPin = async()=>{
    const res = await getPinByIdAPI(id.id)
    if (res) {
      console.log(res);
    }
  }

  useEffect(()=>{
    getPin()
  },[])
  return <div>PinDetailPage</div>;
}
  


