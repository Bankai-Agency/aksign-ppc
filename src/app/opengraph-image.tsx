import { ImageResponse } from "next/og";

export const alt = "AK Sign — Commercial Signs, Wraps & Installation in Arlington Heights, IL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic 1200×630 OG image rendered via Satori. Used by every route
 * in the app that references /opengraph-image. Satori only supports
 * display: flex / block / contents / none — no inline-flex.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            AK SIGN
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 20px",
              borderRadius: 999,
              background: "rgba(250,250,250,0.1)",
              fontSize: 20,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#BB0000",
                marginRight: 14,
                display: "flex",
              }}
            />
            Arlington Heights · IL
          </div>
        </div>

        {/* Middle: headline — plain block text with inline pill */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              maxWidth: 1000,
            }}
          >
            Commercial Signs,
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 80,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
              }}
            >
              Built by
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: 20,
                padding: "4px 22px 10px",
                background: "#BB0000",
                color: "#FAFAFA",
                fontStyle: "italic",
                borderRadius: 10,
                fontSize: 80,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
              }}
            >
              One Team.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              color: "rgba(250,250,250,0.72)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              maxWidth: 960,
            }}
          >
            Channel letters · Lightboxes · Vehicle wraps · Window graphics — design, UL-listed fabrication, and install by one in-house team. Permits via trusted partners. 3–7 day turnaround.
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 14,
            borderTop: "1px solid rgba(250,250,250,0.15)",
            fontSize: 20,
            letterSpacing: "0.06em",
            color: "rgba(250,250,250,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>10+ YEARS</div>
          <div style={{ display: "flex" }}>500+ SIGNS INSTALLED</div>
          <div style={{ display: "flex" }}>3–7 DAY TURNAROUND</div>
          <div style={{ display: "flex" }}>aksign-ppc.vercel.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
