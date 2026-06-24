import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { user } = useAuth()
  const [counts, setCounts] = useState({ projects: 0, skills: 0, contacts: 0 })

  useEffect(() => {
    Promise.all([
      supabase.from('projects').select('id'),
      supabase.from('skills').select('id'),
      supabase.from('contacts').select('id'),
    ]).then(([projects, skills, contacts]) => {
      setCounts({
        projects: projects.data?.length ?? 0,
        skills: skills.data?.length ?? 0,
        contacts: contacts.data?.length ?? 0,
      })
    })
  }, [])

  return (
    <div className="space-y-20">
      {/* Hero */}
      <header>
        <span className="text-orange-500 font-mono text-sm mb-4 block tracking-widest uppercase animate-pulse">
          &gt; Executing: profile_overview.sh
        </span>
        <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">
          Rafael Bisso<span className="text-orange-500">.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Desenvolvedor <span className="text-white font-medium">Fullstack & DevSecOps</span>.{' '}
          Especialista em <span className="text-orange-400 font-mono italic">TypeScript · Node.js · Docker</span>.
        </p>
        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href="https://github.com/RafaelBissoDias"
            target="_blank" rel="noreferrer"
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rafael-bisso-dias"
            target="_blank" rel="noreferrer"
            className="px-8 py-3 border border-gray-800 text-gray-300 font-bold rounded-full hover:bg-gray-900 hover:border-orange-500/50 transition-all"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* Stats */}
      <section>
        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em] mb-8 border-b border-gray-900 pb-4">
          01. Visão Geral
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Projetos', value: counts.projects, to: '/projects' },
            { label: 'Skills', value: counts.skills, to: '/skills' },
            { label: 'Mensagens', value: counts.contacts, to: '/contact' },
          ].map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="group p-6 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-orange-500/50 hover:bg-gray-800/40 transition-all duration-300"
            >
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{card.label}</p>
              <p className="text-5xl font-black text-white mt-2 group-hover:text-orange-400 transition-colors">
                {card.value}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info */}
      <footer className="pt-8 border-t border-gray-900 text-center text-gray-600 text-sm font-mono">
        <p>Logado como <span className="text-gray-500">{user?.email}</span></p>
      </footer>
    </div>
  )
}
