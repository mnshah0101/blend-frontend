'use client'
import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  ListFilter,
  MoreHorizontal,
 
  PlusCircle,

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Spinner from "./Spinner";

import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";

import { useEffect } from "react";

type Video = {
  id: string;
  email: string;
  status: string;
  video_url: string;
  clicked: boolean;
  created: string;
};

type Campaign = {
  id: string;
  name: string;
  email: string;
  goal: string;
  status: string;
  videos: string;
  clicks: string;
};

export default function Campaign() {

  const [videos, setVideos] = useState<Video[]>([]);

  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const { data: session } = useSession();

  const id = session?.user?.id || '';

  const pathname = usePathname();


  const campaign_id = pathname.split("/").pop();




  console.log(campaign_id);

  async function getCampaign() {

    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/get_video_from_sync_labs`, {
      method: "POST"
    });
      
      if (!campaign_id) {
        return;
      }
  
      const res = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          `/get_campaign_by_id?campaign_id=${campaign_id}`
      );
  
      const data = await res.json();
  
      if(data.error) {
        console.log(data.error);
        window.location.href = "/dashboard";
        return;
      }
  
      setCampaign(data);
  
   
  
    }



  async function getVideos() {

    if (!campaign_id) {
      return;
    }

    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL +
        `/get_videos_for_campaign?campaign_id=${campaign_id}`
    );

    const data = await res.json();

    if(data.error) {
      console.log(data.error);
      return;
    }


    setVideos(data['videos']);

    console.log(data['videos']);

  }


  useEffect(() => { 

    getCampaign();


    getVideos();
  },[]);





  
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Queued</TabsTrigger>
            <TabsTrigger value="none">Creating</TabsTrigger>
            <TabsTrigger value="draft">Created</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Video
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>{campaign?.name}</CardTitle>
              <CardDescription>
                Manage your videos and view their performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Link</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Clicked
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos &&
                    videos.map((video) => (
                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                         <Spinner></Spinner>
                        </TableCell>
                        <TableCell className="font-medium">
                          {video.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{video.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {video.video_url}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {video.clicked.toString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {video.created}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> videos
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
