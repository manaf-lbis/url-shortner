import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useResolveUrlQuery } from "../api/appApi";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";

export default function LinkAccessPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useResolveUrlQuery(id);

  useEffect(() => {
    if (data?.data?.originalUrl) {
      window.location.replace(data.data.originalUrl);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="text-center space-y-6 px-4">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-emerald-200 rounded-full animate-ping opacity-20"></div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-emerald-950">Redirecting</h2>
            <p className="text-emerald-700 text-sm font-medium">
              Please wait while we take you to your destination...
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const errorMessage =
    (data && !data.success && data.message) ||
    (error && "data" in error && (error as any).data?.message) ||
    "The short link may be invalid or no longer active.";

  if (error || !data?.data?.originalUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h1 className="text-2xl font-bold text-emerald-950">
                Link Not Found
              </h1>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-900 font-medium">
                  {errorMessage}
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                Please verify the URL is correct or contact the link creator if this issue continues.
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-100">
              <a
                href="/"
                className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Go to Homepage
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Powered by your link Green Link.
          </p>
        </div>
      </div>
    );
  }

  return null;
}