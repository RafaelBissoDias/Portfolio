import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/projects', label: 'Projetos' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contato' },
]

export function Layout() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen" style={{ background: '#050505' }}>
      <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(circle at 50% 20%, rgba(17,24,39,0.7), rgba(0,0,0,1))' }} />
      <header className="border-b border-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-orange-500 font-mono text-sm font-bold tracking-widest">RBD<span className="text-white">.</span></span>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-orange-400'
                      : 'text-gray-500 hover:text-gray-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600 font-mono">{user?.email}</span>
          <button
            onClick={signOut}
            className="px-4 py-1.5 border border-gray-800 text-gray-500 text-sm rounded-full hover:border-orange-500/50 hover:text-gray-300 transition-all duration-200"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Outlet />
      </main>
    </div>
  )
}
