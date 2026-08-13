# Google Sheets Client Review Approval System Setup Guide

This guide explains how to set up, deploy, and manage the automated **Google Sheets Client Review System** for **Vitta Vidhi Advisors**.

---

## 📊 Overview Architecture

```text
Customer Submits Review on Website
               │
               ▼ (POST JSON Payload)
Google Apps Script Web App Endpoint
               │
               ▼ (Appends Row with Status = "Pending")
Google Sheet ("Reviews" tab)
               │
               ▼ (Website Owner opens sheet & edits Status to "Approved")
Status Changed from "Pending" → "Approved"
               │
               ▼ (GET API returns only Approved rows)
Website Automatically Displays Approved Reviews on Page Refresh
```

---

## 🛠️ Step-by-Step Configuration Guide

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.google.com).
2. Create a new blank spreadsheet.
3. Name your spreadsheet: **Vitta Vidhi Advisors Reviews**.

### Step 2: Rename Sheet Tab to `Reviews`
1. At the bottom tab bar, double-click the tab named `Sheet1` and rename it to:
   ```text
   Reviews
   ```

### Step 3: Add Header Columns (Row 1)
Add these 7 columns in Row 1 (Columns A to G):

| Column A | Column B | Column C | Column D | Column E | Column F | Column G |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ID** | **Name** | **Rating** | **Service** | **Review** | **Status** | **Submitted At** |

---

### Step 4: Open Google Apps Script Editor
1. In the top menu of your Google Sheet, click:
   **Extensions → Apps Script**
2. Clear any default code in the editor (`myFunction`).

---

### Step 5: Paste the Apps Script Code
1. Open the file [google-apps-script/Code.gs](file:///e:/aboli/vitti_vidhi/google-apps-script/Code.gs).
2. Copy the entire code block.
3. Paste it into the Apps Script editor window.
4. Click the 💾 **Save** icon (or press `Ctrl + S` / `Cmd + S`).

---

### Step 6: Deploy as Web App
1. At the top right of the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Configure the deployment settings:
   * **Description**: `Vitta Vidhi Reviews API`
   * **Execute as**: `Me (your-email@gmail.com)`
   * **Who has access**: `Anyone` *(Crucial so the website can submit and fetch reviews)*
4. Click **Deploy**.
5. Google will prompt you to authorize permissions:
   * Click **Authorize access**.
   * Select your Google Account.
   * Click **Advanced → Go to Untitled project (unsafe)**.
   * Click **Allow**.

---

### Step 7: Copy Your Web App URL
Once deployed, copy the **Web App URL**. It will look like this:
```text
https://script.google.com/macros/s/AKfycbx.../exec
```

---

### Step 8: Configure Environment Variables
1. Open your project `.env` file (or deployment dashboard on Vercel / Netlify / Cloudflare Pages).
2. Add your Web App URL:
   ```env
   VITE_REVIEWS_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec
   ```

---

## 📑 How to Approve a Submitted Review

1. Open your Google Sheet (**Vitta Vidhi Advisors Reviews**).
2. Locate any newly submitted row where **Status** is set to `Pending`.
3. Review the customer's Name, Rating, Service, and Review text.
4. Double-click the **Status** cell (Column F) and change `Pending` to:
   ```text
   Approved
   ```
5. Press Enter to save the cell in Google Sheets.
6. **That's it!** The approved review will now automatically appear on the website when visitors load or refresh the page.

---

## ❓ Troubleshooting & FAQs

### 1. Reviews are not appearing on the website after approval
- Ensure the status string in Column F is typed as `Approved` (or `approved` / `APPROVED`).
- Verify that your `.env` file contains `VITE_REVIEWS_API_URL`.
- If you made changes to `Code.gs` after initial deployment, make sure to click **Deploy → Manage deployments → Edit → New version → Deploy** to publish your code updates.

### 2. Form submission shows an error
- Ensure **Who has access** is set to **Anyone** in your Apps Script Web App deployment settings.
- Make sure the tab name in Google Sheets is exactly `Reviews`.
- Verify row 1 contains the exact column names: `ID | Name | Rating | Service | Review | Status | Submitted At`.

---

© 2026 **Vitta Vidhi Advisors**. All Rights Reserved.
