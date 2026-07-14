export function parseUserAgent(ua) {
  if (!ua) return { browser: "Unknown", device: "Desktop" };

  let browser = "Unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/i.test(ua)) browser = "Samsung";
  else if (/Chrome\/[\d.]+/i.test(ua) && !/Chromium/i.test(ua)) browser = "Chrome";
  else if (/Firefox\/[\d.]+/i.test(ua)) browser = "Firefox";
  else if (/Safari\/[\d.]+/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";

  let device = "Desktop";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) device = "Mobile";
  else if (/iPad|Tablet/i.test(ua)) device = "Tablet";

  return { browser, device };
}
