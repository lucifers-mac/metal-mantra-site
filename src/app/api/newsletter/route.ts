import { NextRequest, NextResponse } from "next/server";

const KLAVIYO_PRIVATE_KEY = process.env.KLAVIYO_PRIVATE_KEY || "";
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID || "S6Bhmn";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!KLAVIYO_PRIVATE_KEY) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${KLAVIYO_PRIVATE_KEY}`,
        "Content-Type": "application/json",
        "revision": "2024-02-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: { consent: "SUBSCRIBED" },
                      },
                    },
                  },
                },
              ],
            },
            historical_import: false,
          },
          relationships: {
            list: {
              data: { type: "list", id: KLAVIYO_LIST_ID },
            },
          },
        },
      }),
    });

    if (!res.ok && res.status !== 202) {
      const err = await res.text();
      console.error("Klaviyo error:", err);
      return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Newsletter route error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
