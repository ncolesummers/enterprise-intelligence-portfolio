"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/lib/actions";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  async function onSubmit(data: ContactFormData) {
    setPending(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const response = await submitContactForm(formData);
      setMessage(response.message);
      setIsSuccess(response.success);

      if (response.success) {
        reset();
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <Input
            id="name"
            type="text"
            error={errors.name?.message}
            {...register("name", {
              onBlur: () => trigger("name"),
            })}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            error={errors.email?.message}
            {...register("email", {
              onBlur: () => trigger("email"),
            })}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea
            id="message"
            error={errors.message?.message}
            {...register("message", {
              onBlur: () => trigger("message"),
            })}
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending || !isValid}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && (
          <p
            className={`text-sm text-center mt-4 ${
              isSuccess
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </Card>
  );
}
