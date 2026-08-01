"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

interface FacebookAuthResponse {
  code?: string;
  accessToken?: string;
  expiresIn?: number;
  signedRequest?: string;
  userID?: string;
}

interface FacebookLoginResponse {
  status?: string;
  authResponse?: FacebookAuthResponse | null;
}

interface FacebookLoginOptions {
  config_id: string;
  response_type: "code" | "token";
  override_default_response_type?: boolean;
  extras?: {
    version?: string;
    feature?: string;
    sessionInfoVersion?: number;
  };
}

interface FacebookSDK {
  init: (params: {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
  }) => void;
  login: (
    callback: (response: FacebookLoginResponse) => void,
    options: FacebookLoginOptions,
  ) => void;
}

declare global {
  interface Window {
    FB?: FacebookSDK;
    fbAsyncInit?: () => void;
  }
}

const FACEBOOK_APP_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
const WHATSAPP_CONFIG_ID =
  process.env.NEXT_PUBLIC_WHATSAPP_CONFIG_ID;
const FACEBOOK_SDK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_SDK_URL;
  "https://connect.facebook.net/en_US/sdk.js";
const FACEBOOK_SDK_SCRIPT_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_SDK_SCRIPT_ID ?? "facebook-jssdk";

type SdkStatus = "loading" | "ready" | "error";

export interface WhatsAppSignupProps {
  appId?: string;
  configId?: string;
  onCodeReceived?: (code: string) => void;
  /** Compact card UI for embedding in the create-agent wizard */
  embedded?: boolean;
  /** Show raw SDK/session dumps (dev only) */
  showDebug?: boolean;
  connectedCode?: string | null;
  className?: string;
}

function initFacebookSdk(appId: string) {
  if (!window.FB) return false;

  window.FB.init({
    appId,
    cookie: true,
    xfbml: false,
    version: "v25.0",
  });

  return true;
}

export default function WhatsAppSignup({
  appId = FACEBOOK_APP_ID,
  configId = WHATSAPP_CONFIG_ID,
  onCodeReceived,
  embedded = false,
  showDebug = false,
  connectedCode = null,
  className = "",
}: WhatsAppSignupProps) {
  const [sessionInfo, setSessionInfo] = useState<string | null>(
    connectedCode,
  );
  const [sdkResponse, setSdkResponse] =
    useState<FacebookLoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [sdkStatus, setSdkStatus] = useState<SdkStatus>("loading");

  useEffect(() => {
    setSessionInfo(connectedCode);
  }, [connectedCode]);

  useEffect(() => {
    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    const markReady = () => {
      if (cancelled) return;
      if (initFacebookSdk(appId || "")) {
        setSdkStatus("ready");
      }
    };

    const markError = () => {
      if (!cancelled) setSdkStatus("error");
    };

    // Already loaded from a previous mount
    if (window.FB) {
      markReady();
      return;
    }

    // Ensure fbAsyncInit is set before the script finishes loading
    const previousInit = window.fbAsyncInit;
    window.fbAsyncInit = () => {
      previousInit?.();
      markReady();
    };

    const existing = document.getElementById(FACEBOOK_SDK_SCRIPT_ID);

    if (existing) {
      // Script tag exists but FB may still be initializing — poll briefly
      pollId = setInterval(() => {
        if (window.FB) {
          markReady();
          if (pollId) clearInterval(pollId);
        }
      }, 200);

      const timeoutId = setTimeout(() => {
        if (pollId) clearInterval(pollId);
        if (!window.FB) markError();
      }, 10000);

      return () => {
        cancelled = true;
        if (pollId) clearInterval(pollId);
        clearTimeout(timeoutId);
      };
    }

    const script = document.createElement("script");
    script.id = FACEBOOK_SDK_SCRIPT_ID;
    script.src = FACEBOOK_SDK_URL || "";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onerror = markError;
    document.body.appendChild(script);

    // Fallback if fbAsyncInit never fires
    const timeoutId = setTimeout(() => {
      if (window.FB) {
        markReady();
      } else if (!cancelled) {
        markError();
      }
    }, 10000);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [appId]);

  const fbLoginCallback = (response: FacebookLoginResponse) => {
    setLoading(false);

    if (response.authResponse?.code) {
      const code = response.authResponse.code;
      setSessionInfo(code);
      onCodeReceived?.(code);
    }

    setSdkResponse(response);
  };

  const launchWhatsAppSignup = () => {
    if (!window.FB) {
      alert("Facebook SDK not loaded yet. Please try again in a moment.");
      return;
    }

    // Facebook Login requires HTTPS (except localhost)
    if (
      typeof window !== "undefined" &&
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      alert("Facebook Login requires HTTPS. Open this page over https://");
      return;
    }

    setLoading(true);
    window.FB.login(fbLoginCallback, {
      config_id: configId || "",
      response_type: "code",
      override_default_response_type: true,
      extras: { version: "v4" },
    });
  };

  const isConnected = Boolean(sessionInfo);
  const sdkReady = sdkStatus === "ready";

  const buttonLabel = loading
    ? "Connecting..."
    : sdkStatus === "loading"
      ? "Loading Facebook SDK..."
      : sdkStatus === "error"
        ? "Retry Facebook Connect"
        : "Continue with Facebook";

  if (embedded) {
    return (
      <div
        className={`rounded-xl border border-gray-100 bg-gray-50/80 p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">
              Connect WhatsApp Business
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              Finish setup with Meta&apos;s embedded signup to link your
              WhatsApp Business account to this agent.
            </p>

            {isConnected ? (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                WhatsApp Business connected successfully
              </div>
            ) : (
              <>
                <Button
                  type="button"
                  className="mt-3 bg-[#1877f2] shadow-[#1877f2]/20 hover:bg-[#166fe5]"
                  onClick={() => {
                    if (sdkStatus === "error") {
                      window.location.reload();
                      return;
                    }
                    launchWhatsAppSignup();
                  }}
                  disabled={loading || sdkStatus === "loading"}
                >
                  {buttonLabel}
                </Button>
                {sdkStatus === "error" ? (
                  <p className="mt-2 text-xs text-red-500">
                    Could not load the Facebook SDK. Check your network and that
                    NEXT_PUBLIC_FACEBOOK_* env vars are set, then retry.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>

        {showDebug ? (
          <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs">
            <pre className="overflow-x-auto rounded-lg bg-white p-2 text-gray-600">
              {sessionInfo
                ? JSON.stringify(sessionInfo, null, 2)
                : "No session yet"}
            </pre>
            <pre className="overflow-x-auto rounded-lg bg-white p-2 text-gray-600">
              {sdkResponse
                ? JSON.stringify(sdkResponse, null, 2)
                : "No SDK response yet"}
            </pre>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`p-5 font-sans ${className}`}>
      <button
        type="button"
        onClick={launchWhatsAppSignup}
        disabled={loading || !sdkReady}
        className="h-10 cursor-pointer rounded border-0 bg-[#1877f2] px-6 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Processing..." : "Login with Facebook"}
      </button>

      <h3 className="mt-4 text-sm font-semibold">Session Info Response:</h3>
      <pre className="text-xs">
        {sessionInfo ? JSON.stringify(sessionInfo, null, 2) : null}
      </pre>

      <h3 className="mt-4 text-sm font-semibold">SDK Response:</h3>
      <pre className="text-xs">
        {sdkResponse ? JSON.stringify(sdkResponse, null, 2) : null}
      </pre>
    </div>
  );
}
