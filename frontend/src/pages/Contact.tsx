import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const { error } = await supabase.from('contacts').insert(form)
    if (error) { setStatus('error'); return }
    await supabase.functions.invoke('send-contact-email', { body: form })
    setStatus('success')
    setForm({ name: '', email: '', message: '' })
  }

  const inputClass = 'w-full bg-gray-900/40 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-orange-500/50 transition-all duration-200'

  return (
    <div className="space-y-12 max-w-lg">
      <div>
        <h2 className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em] border-b border-gray-900 pb-4 mb-8">
          04. Contato
        </h2>
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">Barueri, SP · rafaelbissodias@hotmail.com · (11) 93284-1185</p>
          <div className="flex gap-4">
            <a href="https://linkedin.com/in/rafael-bisso-dias" target="_blank" rel="noreferrer"
              className="text-xs text-gray-600 hover:text-orange-400 transition-colors font-mono">
              LinkedIn →
            </a>
            <a href="https://github.com/RafaelBissoDias" target="_blank" rel="noreferrer"
              className="text-xs text-gray-600 hover:text-orange-400 transition-colors font-mono">
              GitHub →
            </a>
          </div>
        </div>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-gray-900/40 border border-gray-800 rounded-2xl text-sm text-gray-400 font-mono">
          &gt; Mensagem enviada. Entrarei em contato em breve.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nome" value={form.name} onChange={set('name')} required className={inputClass} />
          <input type="email" placeholder="Email" value={form.email} onChange={set('email')} required className={inputClass} />
          <textarea placeholder="Mensagem" value={form.message} onChange={set('message')} required rows={5}
            className={inputClass + ' resize-none'} />
          {status === 'error' && (
            <p className="text-red-500 text-sm font-mono">&gt; Erro ao enviar. Tenta novamente.</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
      )}
    </div>
  )
}
