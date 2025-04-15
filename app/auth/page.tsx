"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "@/components/OTPModal";
import { Input } from "@/components/ui/input";

type FormType = "sign-in" | "sign-up";

const formSchema = z.object({
  netid: z.string().nonempty("Net ID is required"),
});

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      netid: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await createAccount({
        netid: values.netid + "@srmist.edu.in",
      });

      if (user?.error) {
        console.error("Error from server:", user.error);
        setErrorMessage(user.error);
        return;
      }
      if (user && user.accountId) {
        setAccountId(user.accountId);
      } else {
        console.error("No accountId returned:", JSON.stringify(user));
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Auth error details:", error);
      setErrorMessage(
        type === "sign-up" ? "Failed to create account" : "Failed to sign in",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">Sign In</h1>
          <FormField
            control={form.control}
            name="netid"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Net ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Eg - sb5116"
                      {...field}
                      className="shad-input"
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </Form>
      {accountId && (
        <OTPModal
          email={form.getValues("netid") + "@srmist.edu.in"}
          accountId={accountId}
        />
      )}
    </>
  );
};

const AuthPage = () => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="text-white flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="logo"
              width={82}
              height={82}
              className="h-auto"
            />
            <h1 className="h1">CloudSRM</h1>
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way!</h1>
            <p className="body-1">
              This is a place where you can store all your documents
            </p>
          </div>
          <Image
            src="/assets/images/files.svg"
            alt="files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={82}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        <AuthForm type="sign-in" />
      </section>
    </div>
  );
};

export default AuthPage;
