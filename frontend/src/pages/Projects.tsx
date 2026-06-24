import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  featured: boolean
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('projects').select('*').order('sort_order').then(({ data }) => {
      if (data) setProjects(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="text-gray-600 font-mono animate-pulse">&gt; Loading projects...</p>

  return (
    <div className="space-y-12">
      <h2 className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em] border-b border-gray-900 pb-4">
        02. Featured Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group p-6 bg-gray-900/40 border border-gray-800 rounded-2xl hover:border-orange-500/50 hover:bg-gray-800/40 transition-all duration-300 shadow-xl flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                {project.title}
              </h3>
              {project.featured && (
                <span className="shrink-0 ml-2 px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
                  destaque
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.github_url || project.live_url) && (
              <div className="flex gap-4">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer"
                    className="text-xs text-gray-500 hover:text-orange-400 transition-colors font-mono">
                    GitHub →
                  </a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer"
                    className="text-xs text-gray-500 hover:text-orange-400 transition-colors font-mono">
                    Live →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
