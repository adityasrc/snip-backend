// order matters: edge, opera, and samsung contain "chrome" in user-agent, so they must be evaluated first
const BROWSER_RULES = [
  { name: "Edge", regex: /Edg\//i },
  { name: "Opera", regex: /OPR\/|Opera\//i },
  { name: "Samsung", regex: /SamsungBrowser\//i },
  { name: "Firefox", regex: /Firefox\/\d|FxiOS\/\d/i },
  { name: "Chrome", regex: /Chrome\/\d/i },
  { name: "Safari", regex: /Safari\/\d/i },
];

const DEVICE_RULES = [
  { name: "Mobile", regex: /Mobi|Android.*Mobile|iPhone|iPod/i },
  { name: "Tablet", regex: /iPad|Android(?!.*Mobile)|Tablet/i },
];

export function parseUserAgent(ua) {
  if (typeof ua !== "string") return { browser: "Unknown", device: "Desktop" };

  const browserMatch = BROWSER_RULES.find((rule) => rule.regex.test(ua));
  const deviceMatch = DEVICE_RULES.find((rule) => rule.regex.test(ua));

  return {
    browser: browserMatch ? browserMatch.name : "Unknown",
    device: deviceMatch ? deviceMatch.name : "Desktop",
  };
}