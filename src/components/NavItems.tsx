import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
]

const NavItems = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          to={href}
          key={label}
          className={cn(pathname === href ? "text-primary text-[18px]" : "text-gray-700")}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default NavItems
