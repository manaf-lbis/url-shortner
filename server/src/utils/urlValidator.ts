import fetch from "node-fetch";

export async function validateUrl(url: string): Promise<{ valid: boolean; reason: string }> {
    const checkReachable = true;
    const timeout = 5000;

    if (typeof url !== "string" || url.trim() === "")
        return { valid: false, reason: "Empty or invalid input type" };

    let parsed;
    try {
        parsed = new URL(url);
    } catch {
        return { valid: false, reason: "Invalid URL format" };
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return { valid: false, reason: "Unsupported protocol" };
    }

    if (checkReachable) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            const res = await fetch(url, {
                method: "HEAD",
                signal: controller.signal,
            });
            clearTimeout(id);

            if (!res.ok) {
                return { valid: false, reason: `Invalid URL` };
            }

            return { valid: true, reason: "URL is not reachable" };
        } catch (err: any) {
            return { valid: false, reason: `URL is not reachable` };
        }
    }

    return { valid: true, reason: "Valid format and protocol" };
}
