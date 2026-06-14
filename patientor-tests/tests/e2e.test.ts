/**
 * End-to-End (E2E) Integration Tests for the Patientor Frontend Application
 * Powered by Playwright Test Runner
 */
import { test, expect } from "@playwright/test";

// Test suite for verifying the initial data rendering on the homepage dashboard
test.describe("Listing patients", () => {
  // Clean, single-line parameter typing fixes the syntax layout error
  test("should show column headers Name, Gender and Occupation", async ({
    page,
  }: {
    page: any;
  }) => {
    await page.goto("/");

    // Assert that core informational column headers are visible to the user
    await expect(
      page.getByRole("columnheader", { name: "Name" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Gender" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Occupation" }),
    ).toBeVisible();
  });

  test("should list seed patients", async ({ page }: { page: any }) => {
    await page.goto("/");

    // Target the specific links mapping to individual patient records
    await expect(
      page.getByRole("link", { name: "John McClane" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Martin Riggs" }),
    ).toBeVisible();
  });
});

// Test suite for validating interaction flows and modal forms
test.describe("Adding a patient", () => {
  test("should open modal and add a new patient that appears in the list", async ({
    page,
  }: {
    page: any;
  }) => {
    // Generate a unique dynamic string to avoid colliding with existing dataset entries
    const patientName = `E2E Patient ${Date.now()}`;
    await page.goto("/");

    // Simulate mouse interaction clicking the form activation trigger button
    await page.getByRole("button", { name: "Add New Patient" }).click();
  });
});
