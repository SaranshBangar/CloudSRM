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
import { Input } from "./ui/input";

import Image from "next/image";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

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

export default AuthForm;
