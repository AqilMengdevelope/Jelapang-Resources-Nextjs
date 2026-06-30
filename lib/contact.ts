import { getClientWordPressApiUrl } from "@/lib/config";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  sector?: string;
  message: string;
  website?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

const API_URL = getClientWordPressApiUrl();

export async function submitContactEnquiry(
  data: ContactPayload
): Promise<ContactResult> {
  try {
    const response = await fetch(`${API_URL}/jelapang/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = (await response.json()) as { message?: string; code?: string };

    if (!response.ok) {
      return {
        ok: false,
        error: payload.message ?? "Unable to send your enquiry. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Unable to reach our server. Please try again or email us directly.",
    };
  }
}
