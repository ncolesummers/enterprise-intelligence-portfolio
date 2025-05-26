"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitContactForm } from "@/lib/actions";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setMessage("");
    setIsSuccess(false);
    
    try {
      const response = await submitContactForm(formData);
      setMessage(response.message);
      setIsSuccess(response.success);
      
      // Reset form on success
      if (response.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
      setIsSuccess(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="p-6">
      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea id="message" name="message" required />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && (
          <p className={`text-sm text-center mt-4 ${
            isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}>
            {message}
          </p>
        )}
      </form>
    </Card>
  );
}
