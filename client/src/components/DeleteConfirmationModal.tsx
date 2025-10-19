import { X, AlertTriangle } from "lucide-react"


interface DeleteConfirmationModalProps {
  link: {
    id: string
    name: string
    shortCode: string,
    originalUrl: string
  }
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteConfirmationModal:React.FC<DeleteConfirmationModalProps> = ({ link, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-red-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-emerald-950">Delete Link</h2>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-emerald-100 rounded-lg transition text-emerald-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-emerald-950 font-medium mb-2">Are you sure you want to delete this link?</p>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 space-y-2">
              <p className="text-xs text-emerald-600">
                <span className="font-medium">Name:</span> {link.name || "Untitled"}
              </p>
              <p className="text-xs text-emerald-600 truncate">
                <span className="font-medium">URL:</span> {link.originalUrl}
              </p>
              <p className="text-xs text-emerald-600">
                <span className="font-medium">Short Code:</span> {link.shortCode}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Warning:</span> This action cannot be undone. All analytics data for this
              link will be lost.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Delete Link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
