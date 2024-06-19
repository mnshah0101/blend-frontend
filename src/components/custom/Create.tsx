'use client'
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CsvImporter from "./CSVImporter"

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Loader from "./Loader";

import {
  ChevronLeft,

} from "lucide-react";
import { Badge } from "@/components/ui/badge";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";



let default_blob = new Blob();

import { ChangeEvent, SetStateAction, useState } from "react";

export default function CreateCampaign() {

  const { toast } = useToast();


  function errorToast(error:string) {
        toast({
          variant: "destructive",
          title: "There was an error",
          description: error,
          action: <ToastAction altText="Cancel">Cancel</ToastAction>,
        });
      }




  const { data: session } = useSession();

  console.log(session?.user?.id)


  const id = session?.user?.id || "";


  const [campaignName, setCampaignName] = useState<string>("");
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [campaignModel, setCampaignModel] = useState<string>("");
  const [campaignType, setCampaignType] = useState<string>("");
  const [audioFile, setAudioFile] = useState<Blob>(default_blob);
  const [videoFile, setVideoFile] = useState<Blob>(default_blob);
  const [customerRows, setCustomerRows] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);


  

  

  const handleSubmit = async () => {
    try{

    if (campaignName == ""){
      errorToast("Please enter a campaign name");
      return;
    }

    if (campaignDescription == ""){
      errorToast("Please enter a campaign description");
      return;
    }

    if (campaignModel == ""){
      errorToast("Please select a campaign model");
      return;
    }

    if (campaignType == ""){
      errorToast("Please select a campaign type");
      return;
    }

    if (audioFile == default_blob){
      errorToast("Please upload an audio file");
      return;
    }


    if (videoFile == default_blob){
      errorToast("Please upload a video file");
      return;
    }

    if (customerRows == ""){
      errorToast("Please upload a CSV file"); 
      return;
    }


    setLoading(true);








    

    const formData = new FormData();
    formData.append("name", campaignName);
    formData.append("description", campaignDescription);
    formData.append("model", campaignModel);
    formData.append("campaign_type", campaignType);
    formData.append("video", videoFile);
    formData.append("sample", audioFile);
    formData.append("data", JSON.stringify(customerRows));
    formData.append("user_id", id); 

    const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+"/create_campaign", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      window.location.href = "/dashboard";
      setLoading(false);


    } else {
      setLoading(false);
      errorToast(result.error);

    } 
  }
  catch (error){
    setLoading(false);
    errorToast("An error occurred. Please try again later");
  }

  };




    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: { (value: SetStateAction<Blob>): void; (value: SetStateAction<Blob>): void; (arg0: any): void; }) => {
      if (e.target.files === null) {
        return;
      }
      setFile(e.target.files[0]);
    };

  return (
    <div className="flex w-full">
      {loading && <Loader time={10}></Loader>}

      <main className="flex-1 grid items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid flex-1 auto-rows-max gap-4 w-full">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              New Campaign
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              Draft
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button onClick={handleSubmit} size="sm">
                Save Campaign
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 w-full">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Campaign Details</CardTitle>
                  <CardDescription>
                    Upload your campaign details, ad video, and customer
                    information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        defaultValue={""}
                        id="name"
                        type="text"
                        className="w-full"
                        placeholder="August 2024 Brand Awareness Campaign"
                        onChange={(e) => setCampaignName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                        className="min-h-32"
                        onChange={(e) => setCampaignDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Model Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-1">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Model</Label>
                      <Select onValueChange={setCampaignModel}>
                        <SelectTrigger id="category" aria-label="Select model">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Blend 1.1 Plus">
                            Blend 1.1 Plus
                          </SelectItem>
                          <SelectItem value="Blend 1.1">Blend 1.1</SelectItem>
                          <SelectItem value="Blend 1">Blend 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle> Upload Audio </CardTitle>
                  <CardDescription>
                    Accepted audio formats: MP3 (min 60 seconds)
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-2">
                    <Input
                      defaultValue={""}
                      id="audio"
                      type="file"
                      accept=".mp3"
                      onChange={(e) => handleFileChange(e, setAudioFile)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Campaign Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Type</Label>
                      <Select onValueChange={setCampaignType}>
                        <SelectTrigger id="status" aria-label="Select type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Clicks">Clicks</SelectItem>
                          <SelectItem value="Conversions">
                            Conversions
                          </SelectItem>
                          <SelectItem value="Awareness">Awareness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Upload Video</CardTitle>
                  <CardDescription>
                    Accepted Video Formats: <br />
                    MP4
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Input
                      defaultValue={""}
                      id="video"
                      type="file"
                      accept=".mp4"
                      onChange={(e) => handleFileChange(e, setVideoFile)}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Upload CSV</CardTitle>
                  <CardDescription>
                    CSV file containing customer information
                  </CardDescription>
                  <CsvImporter handler={setCustomerRows} />
                </CardHeader>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              variant="outline"
              size="sm"
            >
              Discard
            </Button>
            <Button onClick={handleSubmit} size="sm">
              Save Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
