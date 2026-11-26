/**
 * =========================================================================
 * ANAYAH ASSOCIATES, SHRIRAMPUR
 * GOOGLE SHEETS & INSTANT EMAIL INQUIRY ENGINE (PRODUCTION V1.0)
 * 
 * Principal Consultant: Er. Sameer Subhedar Shaikh
 * Office: Sai Super Market, Main Road, Shrirampur, Dist-Ahilyanagar, MH 413709
 * Contact: +91 87887 31650 | Email: anayahassociates1@gmail.com
 * 
 * -------------------------------------------------------------------------
 * FEATURES:
 * 1. 4 DEDICATED SHEETS (Strict Separation by Project Type):
 *    - "Residential Projects"        -> Bungalows, Villas, Row Houses, Farmhouses, MahaVastu
 *    - "Commercial & PEB Plants"     -> Shopping Centers, Commercial Complexes, Hotels, Industrial Plants, PEB Warehouses
 *    - "Sanctions & Structural"      -> MahaBPMS Municipal Sanctions, Earthquake RC Structural Design, 3D Elevations
 *    - "General & Turnkey Inquiries" -> Full Turnkey Construction, General Consultations, Contact Us
 * 
 * 2. 100% Alignment with Anayah Associates Website Form:
 *    - Client Name, Phone, Email, Project Type, Plot Location & Dimensions, Message/Requirements
 * 
 * 3. Auto-repair of Row 1 Sheet Headers with Elegant Luxury Navy & Gold Theme:
 *    - Frozen headers, auto column width, alternating row zebra styling.
 * 
 * 4. INSTANT BRANDED HTML EMAIL NOTIFICATION ON EVERY SUBMISSION:
 *    - Sends instant lead alert to anayahassociates1@gmail.com
 *    - Includes 3 One-Click Direct Action Buttons:
 *        📞 [Call Client Now]
 *        💬 [WhatsApp Chat Direct]
 *        ✉️ [Reply to Client Email]
 * =========================================================================
 */

// =========================================================================
// EMAIL CONFIGURATION
// Inquiries are automatically sent to Er. Sameer Shaikh
// =========================================================================
var PRIMARY_NOTIFICATION_EMAIL = "anayahassociates1@gmail.com"; 

function doPost(e) {
  return handleInquiryRequest(e);
}

function doGet(e) {
  return handleInquiryRequest(e);
}

function handleInquiryRequest(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'No active Google Spreadsheet found. Please create or open a sheet.' 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Parse parameters from query string or JSON payload
    var params = {};
    if (e && e.parameter) {
      params = e.parameter;
    }
    if (e && e.postData && e.postData.contents) {
      try {
        var postObj = JSON.parse(e.postData.contents);
        for (var k in postObj) {
          if (postObj.hasOwnProperty(k)) {
            params[k] = postObj[k];
          }
        }
      } catch (jsonErr) {
        // Fall back to e.parameter
      }
    }

    // Extract fields matching Anayah Associates form structure
    var timestamp = params.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    var fullName = (params.fullName || params.name || 'Prospective Client').trim();
    var mobile = (params.mobile || params.phone || '-').trim();
    var email = (params.email || '-').trim();
    var projectType = (params.projectType || params.type || 'Residential Villa').trim();
    var location = (params.location || params.plotLocation || '-').trim();
    var notes = (params.notes || params.message || '-').trim();
    var sourceUrl = (params.sourceUrl || params.pageUrl || 'https://anayahassociates.com').trim();
    var requestedSheet = (params.targetSheet || '').trim();

    // -------------------------------------------------------------
    // DETERMINE TARGET SHEET: 4 Dedicated Sheets
    // -------------------------------------------------------------
    var targetSheetName = "";
    var pLower = projectType.toLowerCase();
    var nLower = notes.toLowerCase();
    var rLower = requestedSheet.toLowerCase();

    var isCommercial = 
      rLower.indexOf('commercial') !== -1 ||
      pLower.indexOf('commercial') !== -1 ||
      pLower.indexOf('industrial') !== -1 ||
      pLower.indexOf('peb') !== -1 ||
      nLower.indexOf('commercial') !== -1 ||
      nLower.indexOf('hotel') !== -1 ||
      nLower.indexOf('shopping') !== -1 ||
      nLower.indexOf('factory') !== -1 ||
      nLower.indexOf('plant') !== -1;

    var isSanctionStructural = !isCommercial && (
      rLower.indexOf('sanction') !== -1 ||
      rLower.indexOf('structural') !== -1 ||
      pLower.indexOf('mahavastu') !== -1 ||
      pLower.indexOf('sanction') !== -1 ||
      pLower.indexOf('3d elevation') !== -1 ||
      pLower.indexOf('rc design') !== -1 ||
      nLower.indexOf('bpms') !== -1 ||
      nLower.indexOf('sanction') !== -1 ||
      nLower.indexOf('structural') !== -1
    );

    var isTurnkeyGeneral = !isCommercial && !isSanctionStructural && (
      rLower.indexOf('turnkey') !== -1 ||
      rLower.indexOf('general') !== -1 ||
      pLower.indexOf('turnkey') !== -1 ||
      nLower.indexOf('turnkey') !== -1
    );

    if (isCommercial) {
      // -------------------------------------------------------------
      // SHEET 1: Commercial & PEB Plants
      // -------------------------------------------------------------
      targetSheetName = "Commercial & PEB Plants";
      var commercialHeaders = [
        "Timestamp (IST)",
        "Client Name",
        "Mobile Number",
        "Email Address",
        "Commercial / Industrial Type",
        "Plot Location & Dimensions",
        "Project Scope & Requirements",
        "Source Page / URL"
      ];

      var sheet = getOrCreateSheet(ss, targetSheetName, commercialHeaders, "#b45309"); // Rich Amber / Gold
      sheet.appendRow([
        timestamp,
        fullName,
        "'" + mobile,
        email,
        projectType,
        location,
        notes,
        sourceUrl
      ]);
      formatNewRow(sheet);

    } else if (isSanctionStructural) {
      // -------------------------------------------------------------
      // SHEET 2: Sanctions & Structural
      // -------------------------------------------------------------
      targetSheetName = "Sanctions & Structural";
      var structuralHeaders = [
        "Timestamp (IST)",
        "Client Name",
        "Mobile Number",
        "Email Address",
        "Service Required (BPMS / 3D / RC)",
        "Plot Location & Dimensions",
        "Approval / Structural Requirements",
        "Source Page / URL"
      ];

      var sheet = getOrCreateSheet(ss, targetSheetName, structuralHeaders, "#047857"); // Deep Emerald
      sheet.appendRow([
        timestamp,
        fullName,
        "'" + mobile,
        email,
        projectType,
        location,
        notes,
        sourceUrl
      ]);
      formatNewRow(sheet);

    } else if (isTurnkeyGeneral) {
      // -------------------------------------------------------------
      // SHEET 3: General & Turnkey Inquiries
      // -------------------------------------------------------------
      targetSheetName = "General & Turnkey Inquiries";
      var turnkeyHeaders = [
        "Timestamp (IST)",
        "Client Name",
        "Mobile Number",
        "Email Address",
        "Inquiry / Contract Type",
        "Plot Location & Dimensions",
        "Project Requirements / Scope",
        "Source Page / URL"
      ];

      var sheet = getOrCreateSheet(ss, targetSheetName, turnkeyHeaders, "#334155"); // Modern Slate
      sheet.appendRow([
        timestamp,
        fullName,
        "'" + mobile,
        email,
        projectType,
        location,
        notes,
        sourceUrl
      ]);
      formatNewRow(sheet);

    } else {
      // -------------------------------------------------------------
      // SHEET 4: Residential Projects (Default for Homes & Villas)
      // -------------------------------------------------------------
      targetSheetName = "Residential Projects";
      var residentialHeaders = [
        "Timestamp (IST)",
        "Client Name",
        "Mobile Number",
        "Email Address",
        "Residential Project Type",
        "Plot Location & Dimensions",
        "Bungalow / Home Requirements",
        "Source Page / URL"
      ];

      var sheet = getOrCreateSheet(ss, targetSheetName, residentialHeaders, "#0f172a"); // Elegant Dark Navy
      sheet.appendRow([
        timestamp,
        fullName,
        "'" + mobile,
        email,
        projectType,
        location,
        notes,
        sourceUrl
      ]);
      formatNewRow(sheet);
    }

    // -------------------------------------------------------------
    // INSTANT EMAIL NOTIFICATION DISPATCH TO ER. SAMEER SHAIKH
    // -------------------------------------------------------------
    var leadData = {
      timestamp: timestamp,
      fullName: fullName,
      mobile: mobile,
      email: email,
      projectType: projectType,
      location: location,
      notes: notes,
      sourceUrl: sourceUrl
    };

    var skipEmail = params.skipEmail === 'true' || params.skipEmail === true;
    if (!skipEmail) {
      sendEmailNotification(targetSheetName, leadData);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      targetSheet: targetSheetName,
      clientName: fullName,
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Send Instant Branded HTML Email Alert to Website Owner (Er. Sameer Shaikh)
 */
function sendEmailNotification(inquiryType, data) {
  try {
    var recipient = (PRIMARY_NOTIFICATION_EMAIL && PRIMARY_NOTIFICATION_EMAIL.trim() !== "")
      ? PRIMARY_NOTIFICATION_EMAIL.trim()
      : Session.getEffectiveUser().getEmail();

    if (!recipient || recipient.indexOf('@') === -1) {
      Logger.log("No valid recipient email address found.");
      return;
    }

    var subject = "";
    var badgeText = "";
    var headerGradient = "";

    if (inquiryType === "Residential Projects") {
      subject = "🏡 [Residential Lead] " + data.fullName + " - " + data.projectType + " (" + (data.location !== '-' ? data.location : "Shrirampur") + ")";
      badgeText = "Residential Villa & Bungalow Inquiry";
      headerGradient = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
    } else if (inquiryType === "Commercial & PEB Plants") {
      subject = "🏢 [Commercial/PEB Lead] " + data.fullName + " - " + data.projectType + " (" + (data.location !== '-' ? data.location : "Commercial Hub") + ")";
      badgeText = "Commercial Complex & Industrial Plant";
      headerGradient = "linear-gradient(135deg, #78350f 0%, #b45309 100%)";
    } else if (inquiryType === "Sanctions & Structural") {
      subject = "📐 [Sanction & Structural Lead] " + data.fullName + " - " + data.projectType;
      badgeText = "MahaBPMS & RC Structural Consultancy";
      headerGradient = "linear-gradient(135deg, #064e3b 0%, #047857 100%)";
    } else {
      subject = "🏗️ [Turnkey Inquiry] " + data.fullName + " - " + data.projectType;
      badgeText = "General & Turnkey Consultation";
      headerGradient = "linear-gradient(135deg, #1e293b 0%, #334155 100%)";
    }

    // Clean phone number for direct dial and WhatsApp link
    var rawDigits = String(data.mobile || '').replace(/[^0-9]/g, '');
    var waNumber = rawDigits;
    if (waNumber.length === 10) {
      waNumber = "91" + waNumber;
    }
    
    var prefillText = encodeURIComponent("Hello " + data.fullName + ", thank you for contacting Anayah Associates regarding your " + data.projectType + " project. How can Er. Sameer Shaikh assist you today?");
    var whatsappUrl = waNumber ? "https://wa.me/" + waNumber + "?text=" + prefillText : "";
    var phoneCallUrl = data.mobile && data.mobile !== '-' ? "tel:" + data.mobile : "";

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">';
    html += '<style>';
    html += 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }';
    html += '.card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }';
    html += '.header { background: ' + headerGradient + '; padding: 26px 28px; text-align: left; }';
    html += '.brand-tag { color: #d4af37; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }';
    html += '.header h1 { color: #ffffff; margin: 0; font-size: 21px; font-weight: 700; letter-spacing: -0.3px; }';
    html += '.badge { display: inline-block; background: rgba(212,175,55,0.2); color: #fbbf24; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px; margin-top: 10px; border: 1px solid rgba(251,191,36,0.3); }';
    html += '.header p { color: #94a3b8; margin: 8px 0 0 0; font-size: 13px; }';
    html += '.content { padding: 24px 28px; }';
    html += '.field-table { width: 100%; border-collapse: collapse; margin-top: 8px; }';
    html += '.field-table td { padding: 11px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }';
    html += '.field-label { width: 36%; color: #64748b; font-weight: 600; font-size: 13px; }';
    html += '.field-val { width: 64%; color: #0f172a; font-weight: 500; }';
    html += '.highlight { color: #0f172a; font-weight: 700; font-size: 15px; }';
    html += '.actions { padding: 22px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; }';
    html += '.btn { display: inline-block; margin: 6px 4px; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700; }';
    html += '.btn-call { background: #0f172a; color: #ffffff !important; }';
    html += '.btn-wa { background: #25D366; color: #ffffff !important; }';
    html += '.btn-mail { background: #b45309; color: #ffffff !important; }';
    html += '.footer { text-align: center; padding: 16px; font-size: 12px; color: #94a3b8; background: #ffffff; border-top: 1px solid #f1f5f9; }';
    html += '</style></head><body>';
    html += '<div class="card">';

    // Header
    html += '<div class="header">';
    html += '<div class="brand-tag">ANAYAH ASSOCIATES &bull; SHRIRAMPUR</div>';
    html += '<h1>New Website Project Enquiry</h1>';
    html += '<span class="badge">' + badgeText + '</span>';
    html += '<p>Received on ' + data.timestamp + ' (IST) &bull; Category: <strong>' + inquiryType + '</strong></p>';
    html += '</div>';

    // Body Table
    html += '<div class="content">';
    html += '<table class="field-table">';
    html += '<tr><td class="field-label">Client Name</td><td class="field-val highlight">' + escapeHtml(data.fullName) + '</td></tr>';
    html += '<tr><td class="field-label">Mobile Number</td><td class="field-val"><a href="' + phoneCallUrl + '" style="color:#0f172a;text-decoration:none;font-weight:700;font-size:15px;">' + escapeHtml(data.mobile) + '</a></td></tr>';
    html += '<tr><td class="field-label">Email Address</td><td class="field-val"><a href="mailto:' + escapeHtml(data.email) + '" style="color:#b45309;text-decoration:none;">' + escapeHtml(data.email) + '</a></td></tr>';
    html += '<tr><td class="field-label">Project Type</td><td class="field-val highlight" style="color:#047857;">' + escapeHtml(data.projectType) + '</td></tr>';
    html += '<tr><td class="field-label">Plot Location / Dimensions</td><td class="field-val">' + escapeHtml(data.location) + '</td></tr>';

    if (data.notes && data.notes !== '-') {
      html += '<tr><td class="field-label">Project Requirements</td><td class="field-val" style="background:#f8fafc;padding:12px 14px;border-radius:8px;border:1px solid #e2e8f0;line-height:1.5;">' + escapeHtml(data.notes) + '</td></tr>';
    }

    html += '<tr><td class="field-label">Source URL</td><td class="field-val" style="font-size:12px;color:#64748b;">' + escapeHtml(data.sourceUrl) + '</td></tr>';
    html += '</table>';
    html += '</div>';

    // Instant Action Buttons
    html += '<div class="actions">';
    if (phoneCallUrl) {
      html += '<a href="' + phoneCallUrl + '" class="btn btn-call">📞 Call Client Now</a>';
    }
    if (whatsappUrl) {
      html += '<a href="' + whatsappUrl + '" class="btn btn-wa" target="_blank">💬 WhatsApp Chat</a>';
    }
    if (data.email && data.email !== '-') {
      html += '<a href="mailto:' + data.email + '" class="btn btn-mail">✉️ Reply via Email</a>';
    }
    html += '</div>';

    html += '<div class="footer">';
    html += 'Anayah Associates &bull; Principal Consultant Er. Sameer Shaikh &bull; +91 87887 31650';
    html += '</div></div></body></html>';

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: html
    });

    Logger.log("Email notification dispatched successfully to: " + recipient);
  } catch (mailErr) {
    Logger.log("Email dispatch error: " + mailErr.toString());
  }
}

/**
 * HTML Escaping Helper to sanitize inputs in email
 */
function escapeHtml(text) {
  if (text === null || text === undefined || text === '') return '-';
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Retrieve an existing sheet or create it, AND auto-repair Row 1 headers
 */
function getOrCreateSheet(ss, sheetName, headers, headerColor) {
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    var allSheets = ss.getSheets();
    if (allSheets.length === 1 && (allSheets[0].getName() === 'Sheet1' || allSheets[0].getName().indexOf('Sheet') !== -1)) {
      sheet = allSheets[0];
      sheet.setName(sheetName);
    } else {
      sheet = ss.insertSheet(sheetName);
    }
  }

  // Ensure Row 1 ALWAYS has updated headers
  var needsHeaderUpdate = false;
  if (sheet.getLastRow() === 0) {
    needsHeaderUpdate = true;
  } else {
    var existingCols = sheet.getLastColumn();
    if (existingCols < headers.length) {
      needsHeaderUpdate = true;
    } else {
      var currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      for (var i = 0; i < headers.length; i++) {
        if (String(currentHeaders[i] || '').trim().toLowerCase() !== headers[i].toLowerCase()) {
          needsHeaderUpdate = true;
          break;
        }
      }
    }
  }

  if (needsHeaderUpdate) {
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setBackground(headerColor || "#0f172a");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Inter");
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 38);
    sheet.setFrozenRows(1);

    // Auto-fit column widths
    for (var c = 1; c <= headers.length; c++) {
      sheet.setColumnWidth(c, 210);
    }
  }

  return sheet;
}

/**
 * Format newly appended row with alternating zebra background
 */
function formatNewRow(sheet) {
  var lastRow = sheet.getLastRow();
  var numCols = sheet.getLastColumn();
  if (lastRow > 1) {
    var rowRange = sheet.getRange(lastRow, 1, 1, numCols);
    rowRange.setFontFamily("Inter");
    rowRange.setFontSize(9.5);
    rowRange.setVerticalAlignment("middle");
    sheet.setRowHeight(lastRow, 32);

    if (lastRow % 2 === 0) {
      rowRange.setBackground("#F8FAFC");
    } else {
      rowRange.setBackground("#FFFFFF");
    }
  }
}

/**
 * Standalone utility to initialize all 4 sheets at once
 */
function setupAll4SheetsWithHeaders() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var residentialHeaders = [
    "Timestamp (IST)",
    "Client Name",
    "Mobile Number",
    "Email Address",
    "Residential Project Type",
    "Plot Location & Dimensions",
    "Bungalow / Home Requirements",
    "Source Page / URL"
  ];

  var commercialHeaders = [
    "Timestamp (IST)",
    "Client Name",
    "Mobile Number",
    "Email Address",
    "Commercial / Industrial Type",
    "Plot Location & Dimensions",
    "Project Scope & Requirements",
    "Source Page / URL"
  ];

  var structuralHeaders = [
    "Timestamp (IST)",
    "Client Name",
    "Mobile Number",
    "Email Address",
    "Service Required (BPMS / 3D / RC)",
    "Plot Location & Dimensions",
    "Approval / Structural Requirements",
    "Source Page / URL"
  ];

  var turnkeyHeaders = [
    "Timestamp (IST)",
    "Client Name",
    "Mobile Number",
    "Email Address",
    "Inquiry / Contract Type",
    "Plot Location & Dimensions",
    "Project Requirements / Scope",
    "Source Page / URL"
  ];

  getOrCreateSheet(ss, "Residential Projects", residentialHeaders, "#0f172a");
  getOrCreateSheet(ss, "Commercial & PEB Plants", commercialHeaders, "#b45309");
  getOrCreateSheet(ss, "Sanctions & Structural", structuralHeaders, "#047857");
  getOrCreateSheet(ss, "General & Turnkey Inquiries", turnkeyHeaders, "#334155");
}
