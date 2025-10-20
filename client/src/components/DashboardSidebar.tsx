import { LayoutDashboard, Link2, LogOut, SpaceIcon } from "lucide-react";
import { useLogoutMutation } from "../api/authApi"
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


interface DashboardSidebarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, setActiveTab }) => {
    const [appLogout, { isLoading }] = useLogoutMutation()
    const dispatch = useDispatch();

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "links", label: "Created Links", icon: Link2 },
    ]

    const handleLogout = async () => {
        try {
            await appLogout({}).unwrap()
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <aside className="w-64 bg-gradient-to-b from-emerald-950 to-emerald-900 text-white flex flex-col h-screen md:h-full shadow-lg">
            <div className="p-6 border-b border-emerald-700/50">
                <Link to="/">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                            <Link2 className="h-6 w-6 text-white" />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-lg font-bold text-white truncate">GreenLink</h2>
                            <p className="text-xs text-emerald-200">Link Manager</p>
                        </div>

                    </div>
                </Link>
            </div>

            <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={[
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                                isActive
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                    : "text-emerald-100 hover:bg-emerald-800/50 hover:text-white",
                            ].join(" ")}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="border-t border-emerald-700/50 p-4 mt-auto">
                <button disabled={isLoading} onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/20">
                    {isLoading ? <SpaceIcon className="animate-spin h-4 w-4" /> : <LogOut className="h-4 w-4" />}
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
