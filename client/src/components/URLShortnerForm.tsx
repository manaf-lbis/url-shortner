import { useState, useMemo } from "react";
import ShinyButton from "./ShinyButton";
import { ExternalLink } from "lucide-react";
import { useShortenUrlMutation } from "../api/appApi";
import { useNavigate } from "react-router-dom";

export default function UrlShortenerForm() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shortenUrl, { isLoading }] = useShortenUrlMutation();
  const navigate = useNavigate();

  const isValidUrl = useMemo(() => {
    if (!input) return true;
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  }, [input]);

  const invalid = !!input && !isValidUrl;

  async function pasteFromClipboard() {
    try {
      const txt = await navigator.clipboard.readText();
      if (txt) setInput(txt);
    } catch {
      setInput("");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCopied(false);
    setLoading(true);

    if (!input) {
      setError("Please paste a URL to shorten.");
      setLoading(false);
      return;
    }
    if (!isValidUrl) {
      setError("That doesn't look like a valid URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await shortenUrl({ url: input }).unwrap();
      setShortUrl(`${import.meta.env.VITE_BASE_APP_URL}/${response.data.shortcode}`);
    } catch (error: any) {
      setError(error?.data?.message || "Something went wrong. Please try again.");
      if(error?.status === 401){
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }

  async function onCopy() {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      await navigator.clipboard.writeText("");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
        <label htmlFor="url-input" className="sr-only">
          Paste URL
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
          <input
            id="url-input"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com/very/long/link"
            className={[
              "w-full rounded-md border bg-background px-3 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              invalid
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-input focus-visible:ring-emerald-600",
            ].join(" ")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-invalid={invalid}
            aria-describedby="url-help url-error"
          />
          <ShinyButton
            type="submit"
            size="lg"
            color="green"
            className="w-full sm:w-auto"
            disabled={loading || isLoading}
          >
            {loading || isLoading ? "Shortening…" : "Shorten URL"}
          </ShinyButton>
        </div>
        <div className="flex items-start justify-between gap-2">
          <p id="url-help" className="text-xs text-muted-foreground">
            Include http:// or https://
          </p>
          <button
            type="button"
            onClick={pasteFromClipboard}
            className="text-xs text-foreground/80 underline-offset-2 hover:underline"
          >
            Paste
          </button>
        </div>
      </form>

      {(invalid || error) && (
        <div className="mt-2 rounded-md bg-red-50 border border-red-300 p-2 text-sm text-red-700">
          <p>{invalid ? "That doesn’t look like a valid URL." : error}</p>
        </div>
      )}

      {shortUrl && (
        <div className="mt-4" aria-live="polite">
          <div className="flex flex-col gap-2 rounded-md border border-border bg-accent/50 p-3 sm:flex-row sm:items-center sm:gap-3 bg-green-50 border-green-300">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-accent-foreground">
                {shortUrl}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-input px-3 py-2 text-xs font-medium text-foreground hover:bg-muted border-green-300 bg-green-50"
              >
                Open
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
              <ShinyButton
                type="button"
                size="sm"
                color="green"
                onClick={onCopy}
                disabled={isLoading}
              >
                {copied ? "Copied!" : "Copy"}
              </ShinyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}