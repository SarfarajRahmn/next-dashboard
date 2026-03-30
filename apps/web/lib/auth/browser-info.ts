export function parseUserAgent(userAgent?: string | null) {
  if (!userAgent) {
    return { browser: "Unknown browser", os: "Unknown OS", version: "" }
  }

  const normalized = userAgent.toLowerCase()

  const os = normalized.includes("windows nt")
    ? "Windows"
    : normalized.includes("mac os x")
      ? "macOS"
      : normalized.includes("android")
        ? "Android"
        : /(iphone|ipad|ipod)/.test(normalized)
          ? "iOS"
          : normalized.includes("linux")
            ? "Linux"
            : "Unknown OS"

  const browserMatches = [
    { name: "Edge", regex: /edg\/([0-9.]+)/i },
    { name: "Opera", regex: /opr\/([0-9.]+)/i },
    { name: "Chrome", regex: /chrome\/([0-9.]+)/i },
    { name: "Firefox", regex: /firefox\/([0-9.]+)/i },
    { name: "Safari", regex: /version\/([0-9.]+).*safari/i },
    { name: "IE", regex: /(msie |rv:)([0-9.]+)/i },
  ]

  let browser = "Unknown browser"
  let version = ""

  for (const candidate of browserMatches) {
    const match = userAgent.match(candidate.regex)
    if (match) {
      browser = candidate.name
      version = match[1] ?? ""
      break
    }
  }

  if (browser === "Chrome" && /edg\//i.test(userAgent)) {
    browser = "Edge"
  }
  if (browser === "Safari" && /chrome\//i.test(userAgent)) {
    browser = "Chrome"
  }

  return { browser, os, version }
}

export function formatBrowserInfo(userAgent?: string | null) {
  const { browser, os, version } = parseUserAgent(userAgent)
  const browserText = version ? `${browser} ${version}` : browser
  return `${browserText} on ${os}`
}
