export default function Footer() {
  return (
    <footer className="bg-[#0a1120] border-t border-[#1e293b] mt-12">
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
        <span className="text-lg font-bold text-slate-100 tracking-wide">
          FUTBOL <span className="text-blue-500">360</span>
        </span>
        <div className="flex gap-2">
          <button className="bg-[#111827] border border-[#1e293b] rounded-md w-9 h-9 flex items-center justify-center text-sm text-slate-400 cursor-pointer hover:text-slate-100 hover:border-blue-500 transition-colors">𝕏</button>
          <button className="bg-[#111827] border border-[#1e293b] rounded-md w-9 h-9 flex items-center justify-center text-sm text-slate-400 cursor-pointer hover:text-slate-100 hover:border-blue-500 transition-colors">📸</button>
          <button className="bg-[#111827] border border-[#1e293b] rounded-md w-9 h-9 flex items-center justify-center text-sm text-slate-400 cursor-pointer hover:text-slate-100 hover:border-blue-500 transition-colors">👍</button>
        </div>
      </div>
    </footer>
  )
}