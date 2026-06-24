import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/projects', label: 'Projetos' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contato' },
]

export function Layout() {
  const { signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(circle at 50% 20%, rgba(17,24,39,0.7), rgba(0,0,0,1))' }} />

      <header className="border-b border-gray-900 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + desktop nav */}
          <div className="flex items-center gap-8">
            <span className="text-orange-500 font-mono text-sm font-bold tracking-widest">
              RBD<span className="text-white">.</span>
            </span>
            <nav className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive ? 'text-orange-400' : 'text-gray-500 hover:text-gray-300'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Desktop: sair */}
          <button
            onClick={signOut}
            className="hidden md:block px-4 py-1.5 border border-gray-800 text-gray-500 text-sm rounded-full hover:border-orange-500/50 hover:text-gray-300 transition-all duration-200"
          >
            Sair
          </button>

          {/* Mobile: hamburguer */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-400 transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-1 pb-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? 'text-orange-400 bg-orange-500/5' : 'text-gray-500 hover:text-gray-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={signOut}
              className="mt-2 px-3 py-2.5 text-left border border-gray-800 text-gray-500 text-sm rounded-lg hover:border-orange-500/50 hover:text-gray-300 transition-all duration-200"
            >
              Sair
            </button>
          </nav>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <Outlet />
      </main>
    </div>
  )
}
