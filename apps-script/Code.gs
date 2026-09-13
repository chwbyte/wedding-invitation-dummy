/**
 * Google Apps Script backend — writes RSVP + wishes into YOUR Google Sheet
 * and returns the wishes so they can be shown on the website.
 *
 * The sheet this targets:
 *   https://docs.google.com/spreadsheets/d/1o3Fg8-vZ5iHm--CeRUQUFszaU-w_g5wDizYOsH1HQHU/edit
 *
 * SETUP (one time, ~3 minutes):
 *   1. Open that spreadsheet.
 *   2. Extensions -> Apps Script.
 *   3. Delete any placeholder code, paste this whole file.
 *   4. Save (Ctrl/Cmd+S), then Deploy -> New deployment:
 *        - Type: "Web app"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   5. Deploy, approve permissions, copy the "Web app URL".
 *   6. Paste that URL into js/config.js -> rsvp.endpoint AND wishes.endpoint.
 *
 * The script auto-creates two tabs in your sheet:
 *   "RSVP"    -> Timestamp, Nama, Kehadiran, Jumlah Tamu, Ucapan
 *   "Wishes"  -> Timestamp, Nama, Ucapan
 * Responses appear live there. Wishes are also returned to the website
 * so they display in the "Wedding Wishes" section.
 */

var SHEET_ID = "1o3Fg8-vZ5iHm--CeRUQUFszaU-w_g5wDizYOsH1HQHU";

var HEADERS = {
  rsvp: ["Timestamp", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan"],
  wishes: ["Timestamp", "Nama", "Ucapan"]
};

function getSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) { /* standalone script: fall through */ }
  return SpreadsheetApp.openById(SHEET_ID);
}

function getSheet(type) {
  var name = type === "wishes" ? "Wishes" : "RSVP";
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS[type]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function readSheet(type) {
  var sheet = getSheet(type);
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[i][j];
    }
    rows.push(obj);
  }
  return rows;
}

function doGet(e) {
  var type = (e && e.parameter && e.parameter.type) || "wishes";
  var callback = (e && e.parameter && e.parameter.callback) || null;
  var json = JSON.stringify(readSheet(type));
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + json + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "invalid" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var type = (body && body.type === "wishes") ? "wishes" : "rsvp";
  var sheet = getSheet(type);
  var headers = HEADERS[type];
  var row = headers.map(function (h) {
    if (h === "Timestamp") return new Date();
    return (body[h] !== undefined && body[h] !== null) ? body[h] : "";
  });
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
