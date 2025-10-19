import { useState } from "react"
import { Menu } from "lucide-react"
import DashboardSidebar from "../components/DashboardSidebar"
import DashboardStats from "../components/DashboardStats"
import LinksList from "../components/LinksLists"
import DashboardShortener from "../components/DashboardShortnerForm"

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <main className="min-h-dvh bg-white text-emerald-950 flex flex-col">


            <div className="flex flex-1 overflow-hidden">
                <div className="md:hidden fixed top-5 left-4 z-50">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className=""
                    >
                        {!sidebarOpen && <Menu className="h-8 w-8 p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg transition-all" />}
                    </button>
                </div>

                {sidebarOpen && (
                    <div className="md:hidden fixed inset-0 bg-black/50 z-30 top-20" onClick={() => setSidebarOpen(false)} />
                )}

                <div
                    className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 md:z-0 h-screen md:h-auto w-64`}
                >
                    <DashboardSidebar
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab)
                            setSidebarOpen(false)
                        }}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto bg-white w-full">
                    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8 md:px-8 pt-16 md:pt-8">
                        {activeTab === "dashboard" ? (
                            <div className="space-y-6 md:space-y-8">
                                <div className="order-2 md:order-1">
                                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Dashboard</h1>
                                    <p className="mt-2 text-sm md:text-base text-gray-600">
                                        Create shortened links and track their performance in real-time.
                                    </p>
                                </div>

                                <div className="order-1 md:order-2 rounded-2xl border border-emerald-200 bg-white p-4 md:p-6 shadow-sm">
                                    <h2 className="mb-2 text-xl md:text-2xl font-bold text-gray-900">Create New Link</h2>
                                    <p className="mb-4 text-xs md:text-sm text-gray-600">
                                        Paste your long URL and get a short, shareable link instantly.
                                    </p>
                                    <DashboardShortener />
                                </div>

                                <div className="order-3">
                                    <DashboardStats />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Your Links</h1>
                                    <p className="mt-2 text-sm md:text-base text-gray-600">
                                        Manage, edit, and track all your shortened links.
                                    </p>
                                </div>

                                <LinksList />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
