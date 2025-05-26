"use server";

import { z } from "zod";
import { contactFormSchema } from "./validation";

export async function submitContactForm(formData: FormData) {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const validatedData = contactFormSchema.parse(rawData);

    // Use mock endpoint during testing
    const isTestMode = process.env.NODE_ENV === 'test' || process.env.PLAYWRIGHT_TEST_MODE === 'true';
    const formspreeEndpoint = isTestMode 
      ? "http://localhost:3001/api/test/formspree-mock"
      : "https://formspree.io/f/xeogbrzn";
    
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
