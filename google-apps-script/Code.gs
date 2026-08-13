/**
 * GOOGLE APPS SCRIPT — CLIENT REVIEW MANAGEMENT SYSTEM
 * Vitta Vidhi Advisors (Tax, Compliance & Business Advisory)
 * 
 * Instructions:
 * 1. Open Google Sheets -> Create a Sheet named: "Reviews"
 * 2. Header Row (Row 1): ID | Name | Rating | Service | Review | Status | Submitted At
 * 3. Extensions -> Apps Script -> Paste this complete Code.gs
 * 4. Deploy -> New deployment -> Select "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Copy the Web App URL and set it in your website's .env:
 *    VITE_REVIEWS_API_URL=https://script.google.com/macros/s/.../exec
 */

var SHEET_NAME = "Reviews";

/**
 * Handle GET Requests
 * Returns ONLY reviews where Status = "Approved" (case-insensitive)
 */
function doGet(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = sheet.getDataRange().getValues();
    
    // If sheet only has headers, return empty array
    if (data.length <= 1) {
      return createJsonResponse({ success: true, count: 0, reviews: [] });
    }
    
    var headers = data[0];
    var idIdx = headers.indexOf("ID");
    var nameIdx = headers.indexOf("Name");
    var ratingIdx = headers.indexOf("Rating");
    var serviceIdx = headers.indexOf("Service");
    var reviewIdx = headers.indexOf("Review");
    var statusIdx = headers.indexOf("Status");
    var dateIdx = headers.indexOf("Submitted At");
    
    var approvedReviews = [];
    
    // Loop through rows starting from row index 1 (skipping headers)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var rawStatus = String(row[statusIdx] || "").trim().toUpperCase();
      
      // Strict filter: ONLY Approved rows are returned
      if (rawStatus === "APPROVED") {
        approvedReviews.push({
          id: String(row[idIdx] || "REV-" + i),
          name: sanitizeOutput(String(row[nameIdx] || "Valued Client")),
          rating: parseInt(row[ratingIdx] || 5, 10),
          service: sanitizeOutput(String(row[serviceIdx] || "Taxation & Advisory")),
          review: sanitizeOutput(String(row[reviewIdx] || "")),
          submittedAt: row[dateIdx] ? String(row[dateIdx]) : ""
        });
      }
    }
    
    return createJsonResponse({
      success: true,
      count: approvedReviews.length,
      reviews: approvedReviews
    });
    
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * Handle POST Requests
 * Validates submission and ALWAYS forces Status = "Pending"
 */
function doPost(e) {
  try {
    var contents = {};
    
    if (e.postData && e.postData.contents) {
      try {
        contents = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // Fallback for form-urlencoded or parameter payload
        contents = e.parameter || {};
      }
    } else if (e.parameter) {
      contents = e.parameter;
    }
    
    // Honeypot anti-spam check: if website/hp_field is filled, ignore submission
    if (contents.website || contents.hp_field) {
      return createJsonResponse({ success: true, message: "Review processed successfully." });
    }
    
    // 1. Validate Required Fields
    var name = String(contents.name || contents.fullName || "").trim();
    var rating = parseInt(contents.rating, 10);
    var service = String(contents.service || contents.serviceUsed || "").trim();
    var review = String(contents.review || contents.message || "").trim();
    
    if (!name || name.length > 100) {
      return createJsonResponse({ success: false, error: "Valid Name is required (max 100 characters)." });
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return createJsonResponse({ success: false, error: "Rating must be a number between 1 and 5." });
    }
    if (!service || service.length > 100) {
      return createJsonResponse({ success: false, error: "Service category is required." });
    }
    if (!review || review.length > 1500) {
      return createJsonResponse({ success: false, error: "Review text is required (max 1500 characters)." });
    }
    
    // 2. Generate Unique Review ID
    var reviewId = "REV-" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000);
    var timestamp = new Date().toISOString();
    
    // 3. FORCE Status = "Pending" (Frontend CANNOT override this)
    var forcedStatus = "Pending";
    
    // 4. Save Row to Google Sheet
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      reviewId,
      name,
      rating,
      service,
      review,
      forcedStatus,
      timestamp
    ]);
    
    return createJsonResponse({
      success: true,
      message: "Thank you for sharing your experience! Your review has been submitted for approval.",
      id: reviewId,
      status: forcedStatus
    });
    
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * Helper: Get or Create "Reviews" Sheet with Headers
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["ID", "Name", "Rating", "Service", "Review", "Status", "Submitted At"]);
    sheet.getRange("1:1").setFontWeight("bold").setBackground("#580B14").setFontColor("#FFFFFF");
  }
  
  return sheet;
}

/**
 * Helper: Create CORS-compatible JSON Response
 */
function createJsonResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Helper: Sanitize string output
 */
function sanitizeOutput(str) {
  if (!str) return "";
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
