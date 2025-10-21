
export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  );
}