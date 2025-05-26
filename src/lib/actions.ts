"use server";

import { z } from "zod";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message too long"),
});

export async function submitContactForm(formData: FormData) {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const validatedData = contactFormSchema.parse(rawData);

    // Submit to FormSpree
    const formspreeEndpoint = "https://formspree.io/f/xeogbrzn";
    
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error(`FormSpree error: ${response.status}`);
    }

    return {
      success: true,
      message: "Thanks for your message! I'll get back to you soon.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: error.errors[0].message,
        errors: error.errors,
      };
    }

    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
