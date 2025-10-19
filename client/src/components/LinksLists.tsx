import { useState } from "react"
import { Copy, Edit2, Trash2, Eye, EyeOff, Link2, Check } from "lucide-react"
import { EditLinkModal } from "./EditLinkModal"
import {DeleteConfirmationModal} from "./DeleteConfirmationModal"

export default function LinksList() {
  const [links, setLinks] = useState([
    {
      id: '1',
      shortCode: "abc123",
      originalUrl: "https://example.com/very/long/url/that/needs/shortening",
      name: "My First Link",
      clicks: 234,
      visible: true,
      createdAt: "Jan 15, 2024",
    },
    {
      id: '2',
      shortCode: "def456",
      originalUrl: "https://another-example.com/another/long/url",
      name: "Project Link",
      clicks: 567,
      visible: true,
      createdAt: "Jan 14, 2024",
    },
    {
      id: '3',
      shortCode: "ghi789",
      originalUrl: "https://test.com/test/url",
      name: "",
      clicks: 89,
      visible: false,
      createdAt: "Jan 13, 2024",
    },
    
  ])

  const [editingLink, setEditingLink] = useState<{ id: string; name: string; shortCode: string }|null>(null)
  const [deletingLink, setDeletingLink] = useState<{ id: string; name: string; shortCode: string ,originalUrl: string}|null>(null)
  const [copied, setCopied] = useState<string|null>(null)

  const userStats = {
    totalLinks: links.length,
    totalClicks: links.reduce((sum, link) => sum + link.clicks, 0),
  }

  const handleCopy = (shortCode : string) => {
    const url = `${typeof window !== "undefined" ? window.location.origin : "https://example.com"}/${shortCode}`
    navigator.clipboard.writeText(url)
    setCopied(shortCode)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDelete = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
    setDeletingLink(null)
  }

  const handleToggleVisibility = (id: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, visible: !link.visible } : link)))
  }

  const handleSaveLink = (id: string, name: string, shortCode: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, name, shortCode } : link)))
    setEditingLink(null)
  }

  if (links.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-12 text-center">
        <Link2 className="mx-auto h-16 w-16 text-emerald-200 mb-4" />
        <h3 className="text-xl font-bold text-emerald-950">No links created yet</h3>
        <p className="mt-2 text-sm text-gray-600">
          Start by creating your first shortened link from the Dashboard tab to see it here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 p-4">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Total Links</p>
          <p className="mt-2 text-3xl font-bold text-emerald-950">{userStats.totalLinks}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 p-4">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Total Clicks</p>
          <p className="mt-2 text-3xl font-bold text-teal-950">{userStats.totalClicks}</p>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto rounded-2xl border border-emerald-200 bg-white p-4 space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="rounded-xl border border-gray-200 bg-gradient-to-r from-white to-emerald-50 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
          >
            {/* Header with name and status */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate text-base">{link.name || "Untitled Link"}</h3>
                <p className="text-xs text-gray-500 truncate mt-1">{link.originalUrl}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                  link.visible ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {link.visible ? "Active" : "Hidden"}
              </div>
            </div>

            {/* Short code, date, and clicks */}
            <div className="flex items-center gap-3 mb-4 flex-wrap text-xs">
              <code className="rounded-lg bg-gray-100 px-3 py-1 font-mono text-gray-700 font-medium">
                {link.shortCode}
              </code>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">Created {link.createdAt}</span>
              <span className="text-gray-500">•</span>
              <span className="font-semibold text-emerald-700">{link.clicks} clicks</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleCopy(link.shortCode)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  copied === link.shortCode
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {copied === link.shortCode ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={() => setEditingLink(link)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>

              <button
                onClick={() => handleToggleVisibility(link.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                {link.visible ? (
                  <>
                    <Eye className="h-4 w-4" />
                    Hide
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Show
                  </>
                )}
              </button>

              <button
                onClick={() => setDeletingLink(link)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* </CHANGE> */}

      {editingLink && <EditLinkModal link={editingLink} onSave={handleSaveLink} onClose={() => setEditingLink(null)} />}

      {deletingLink && (
        <DeleteConfirmationModal
          link={deletingLink}
          onConfirm={() => handleDelete(deletingLink.id)}
          onCancel={() => setDeletingLink(null)}
        />
      )}
    </div>
  )
}
