"use client";
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
import { useState } from "react";
import { signIn } from "next-auth/react";







export default function Login() {

  const  [email, setEmail] = useState("");
  const  [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const handleSubmit = async () => {

    setError("");


    const result = await signIn("credentials", {
      redirect: false,
      username:email,
      password,
    });

    console.log(result);

    if (result && result.ok == true){
      window.location.href = "/dashboard";
    }



    if (result && result.ok != true){
      setError("Invalid credentials");
    }


    
  };




  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSubmit()} className="w-full">
            Sign in
          </Button>
        </CardFooter>
        {error && <p className="text-red-500 text-center mb-5">{error}</p>}
      </Card>
    </div>
  );
}
