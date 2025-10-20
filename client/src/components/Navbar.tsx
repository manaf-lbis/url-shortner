import { Link } from "react-router-dom"
import ShinyButton from "./ShinyButton"
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface NavbarProps {
  isLoginNeed?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ isLoginNeed = true }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-10">
      <div className="mx-auto max-w-screen-lg px-4 py-4 md:py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-semibold tracking-tight text-white">GreenLink</Link>
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white animate-pulse">
              Beta
            </span>
          </div>

          <nav className="flex items-center gap-3">
            {isLoginNeed && !isAuthenticated &&
              <Link to={'/login'}>
                <ShinyButton color="outline" size="sm" className="bg-emarald-100 text-white/90 hover:text-emerald-900 hover:bg-emarald-50 cursor-pointer">
                  Login
                </ShinyButton>
              </Link>
            }

            {isAuthenticated &&
              <Link to={'/dashboard'}>
                <ShinyButton color="outline" size="sm" className="bg-emarald-100 text-white/90 hover:text-emerald-900 hover:bg-emarald-50 cursor-pointer">
                  Home
                </ShinyButton>
              </Link>
            }

          </nav>
        </div>
      </div>
    </header>
  )
}