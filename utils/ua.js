/**
 * Parses a user-agent string to determine the browser and device type.
 * * @param {string} ua The user-agent string from the request headers.
 * @returns {{ browser: string, device: string }} An object containing the parsed browser and device.
 */
export function parseUserAgent(ua) {
  if (typeof ua !== "string") return { browser: "Unknown", device: "Desktop" };

  let browser = "Unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua) || /Opera\//i.test(ua)) browser = "Opera";
  else if (/SamsungBrowser\//i.test(ua)) browser = "Samsung";
  else if (/Firefox\/\d|FxiOS\/\d/i.test(ua)) browser = "Firefox";
  else if (/Chrome\/\d/i.test(ua) && !/Chromium\/\d/i.test(ua)) browser = "Chrome";
  else if (/Safari\/\d/i.test(ua) && !/Chrome\/\d/i.test(ua)) browser = "Safari";

  let device = "Desktop";
  if (/Mobi|Android.*Mobile|iPhone|iPod/i.test(ua)) device = "Mobile";
  else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) device = "Tablet";

  return { browser, device };
}