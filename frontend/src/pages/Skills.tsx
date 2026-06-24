import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Skill {
  id: string
  name: string
  category: string
  level: number
}

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('skills').select('*').order('category').order('sort_order').then(({ data }) => {
      if (data) setSkills(data)
      setLoading(false)
    })
  }, [])

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ?? []
    acc[skill.category].push(skill)
    return acc
  }, {})

  if (loading) return <p className="text-gray-600 font-mono animate-pulse">&gt; Loading skills...</p>

  return (
    <div className="space-y-12">
      <h2 className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em] border-b border-gray-900 pb-4">
        03. Core Stack
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div
            key={category}
            className="p-6 bg-gray-900/20 border border-gray-800/50 rounded-2xl hover:border-orange-500/30 transition-all duration-300"
          >
            <h3 className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-4">
              {category}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {items.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-center p-3 bg-gray-900/40 border border-gray-800/50 rounded-xl text-sm font-medium text-gray-400 hover:border-orange-500/30 hover:text-white transition-all cursor-default"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
