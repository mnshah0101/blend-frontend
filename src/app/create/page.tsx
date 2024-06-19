"use client";
import Sidebar from "@/components/custom/Sidebar";
import CreateCampaign from "@/components/custom/Create";
import {useState} from "react";

export default function Create() {
  const [email, setEmail] = useState("")

  
  return (
    <div className="flex">
      <Sidebar page="create">

        
        <CreateCampaign />
      </Sidebar>
    </div>
  );
}
