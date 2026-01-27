export interface EmailTestConfig {
  expectedRecipient: string;
  formspreeEndpoint: string;
  testSenderEmail: string;
  testSenderName: string;
  testMessage: string;
  enableNetworkInterception: boolean;
}

export const emailTestConfig: EmailTestConfig = {
  expectedRecipient:
    process.env.EXPECTED_EMAIL_RECIPIENT || "nate@ncolesummers.com",
  formspreeEndpoint:
    process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xeogbrzn",
  testSenderEmail: process.env.TEST_EMAIL || "test@example.com",
  testSenderName: "Test User",
  testMessage: "This is a test message from Playwright E2E testing.",
  enableNetworkInterception: process.env.ENABLE_EMAIL_VERIFICATION !== "false",
};
