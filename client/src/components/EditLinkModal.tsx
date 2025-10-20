// import { useState } from "react";
// import { X } from "lucide-react";
// import ShinyButton from "./ShinyButton";

// interface EditLinkModalProps {
//   link: {
//     id: string;
//     title: string;
//     shortCode: string;
//   };
//   onSave: (id: string, title: string, shortCode: string) => void;
//   onClose: () => void;
// }

// export const EditLinkModal: React.FC<EditLinkModalProps> = ({ link, onSave, onClose }) => {
//   const [title, setTitle] = useState(link.title || "");
//   const [shortCode, setShortCode] = useState(link.shortCode || "");
//   const [error, setError] = useState("");

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (!title.trim()) {
//       setError("Please enter a title for this link.");
//       return;
//     }

//     if (title.length > 30) {
//       setError("Title must be less than 30 characters.");
//       return;
//     }

//     if (!shortCode.trim()) {
//       setError("Please enter a short code.");
//       return;
//     }

//     if (!/^[a-zA-Z0-9_-]+$/.test(shortCode)) {
//       setError("Short code can only contain letters, numbers, hyphens, and underscores.");
//       return;
//     }

//     if (shortCode.length > 20) {
//       setError("Short code must be less than 20 characters.");
//       return;
//     }

//     onSave(link.id, title.trim(), shortCode.trim());
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
//         <div className="flex items-center justify-between border-b border-emerald-200 px-6 py-4">
//           <h2 className="text-lg font-semibold text-emerald-950">Edit Link</h2>
//           <button onClick={onClose} className="p-1 hover:bg-emerald-100 rounded-lg transition text-emerald-600">
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <label htmlFor="short-code" className="block text-sm font-medium text-emerald-950 mb-2">
//               Short Code
//             </label>
//             <input
//               id="short-code"
//               type="text"
//               value={shortCode}
//               onChange={(e) => setShortCode(e.target.value)}
//               placeholder="e.g., my-link"
//               className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-950 placeholder:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
//             />
//             <p className="mt-1 text-xs text-emerald-600">{shortCode.length}/20 characters</p>
//           </div>
//           <div>
//             <label htmlFor="link-title" className="block text-sm font-medium text-emerald-950 mb-2">
//               Link Title
//             </label>
//             <input
//               id="link-title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="e.g., My Project Link"
//               className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-950 placeholder:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
//               autoFocus
//             />
//             <p className="mt-1 text-xs text-emerald-600">{title.length}/30 characters</p>
//           </div>
//           {error && (
//             <div className="rounded-lg bg-red-50 border border-red-200 p-3">
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           )}
//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-50 transition"
//             >
//               Cancel
//             </button>
//             <ShinyButton type="submit" size="md" color="green" className="flex-1">
//               Save Changes
//             </ShinyButton>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };






import { useState } from "react";
import { X } from "lucide-react";
import ShinyButton from "./ShinyButton";

interface EditLinkModalProps {
  link: {
    id: string;
    title: string;
    shortCode: string;
  };
  onSave: (id: string, title: string, shortCode: string) => Promise<string | null>;
  onClose: () => void;
}

export const EditLinkModal: React.FC<EditLinkModalProps> = ({ link, onSave, onClose }) => {
  const [title, setTitle] = useState(link.title || "");
  const [shortCode, setShortCode] = useState(link.shortCode || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a title for this link.");
      return;
    }

    if (title.length > 30) {
      setError("Title must be less than 30 characters.");
      return;
    }

    if (!shortCode.trim()) {
      setError("Please enter a short code.");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(shortCode)) {
      setError("Short code can only contain letters, numbers, hyphens, and underscores.");
      return;
    }

    if (shortCode.length > 20) {
      setError("Short code must be less than 20 characters.");
      return;
    }

    const serverError = await onSave(link.id, title.trim(), shortCode.trim());
    if (serverError) {
      setError(serverError);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-emerald-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-emerald-950">Edit Link</h2>
          <button onClick={onClose} className="p-1 hover:bg-emerald-100 rounded-lg transition text-emerald-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="short-code" className="block text-sm font-medium text-emerald-950 mb-2">
              Short Code
            </label>
            <input
              id="short-code"
              type="text"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              placeholder="e.g., my-link"
              className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-950 placeholder:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
            <p className="mt-1 text-xs text-emerald-600">{shortCode.length}/20 characters</p>
          </div>
          <div>
            <label htmlFor="link-title" className="block text-sm font-medium text-emerald-950 mb-2">
              Link Title
            </label>
            <input
              id="link-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My Project Link"
              className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-950 placeholder:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              autoFocus
            />
            <p className="mt-1 text-xs text-emerald-600">{title.length}/30 characters</p>
          </div>
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-50 transition"
            >
              Cancel
            </button>
            <ShinyButton type="submit" size="md" color="green" className="flex-1">
              Save Changes
            </ShinyButton>
          </div>
        </form>
      </div>
    </div>
  );
};