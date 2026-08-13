# Vitta Vidhi Advisors — Official Website

Static, high-performance, animated website built for **Vitta Vidhi Advisors** (Tax, Compliance & Business Advisory).

---

## 📧 Direct Email & WhatsApp Contact Integration

The contact form operates completely on the client side without any database, custom backend, API keys, SMTP credentials, or third-party email services.

### 📬 How Form Dispatch Works:

1. **Email Integration (`mailto:`)**:
   - Recipient: **`vittavidhi@gmail.com`**
   - Subject: `New Enquiry - Vitta Vidhi Advisors`
   - Formats user details into a URL-encoded string and opens the customer's default email application (Outlook, Apple Mail, Gmail, Thunderbird, etc.) pre-filled with:
     ```
     Name: [Customer Name]
     Mobile Number: [Customer Mobile Number]
     Email Address: [Customer Email]
     Service Required: [Selected Service]

     Message:
     [Customer Message]
     ```

2. **WhatsApp Integration**:
   - Recipient Number: **`+91 9307479801`** (configured in `SITE_CONFIG.contact.whatsappNumber`)
   - Opens WhatsApp with a pre-filled enquiry message containing the exact same customer details.

3. **Privacy & Security**:
   - Zero customer data stored in any database.
   - Zero secret API keys or third-party credentials exposed.

---

## 💻 Tech Stack & Commands

* **Framework**: React + Vite + TypeScript
* **Styling**: Tailwind CSS + Glassmorphism + Luxury Design System
* **Icons**: Lucide React
* **Smooth Scrolling**: Lenis

### Command Reference

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Expose local server on network (for mobile testing)
npx vite --host

# Build static production bundle
npm run build

# Preview production build locally
npm run preview
```

---

© 2026 **Vitta Vidhi Advisors**. All Rights Reserved.
