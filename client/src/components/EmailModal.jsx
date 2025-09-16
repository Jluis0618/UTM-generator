"use client"

import { useState } from "react"

// Lista de destinatarios predefinidos
const PREDEFINED_RECIPIENTS = [
        "eguilamo@bpd.com.do", 
        "ivrodriguez@bpd.com.do", 
        "ldeleon@bpd.com.do", 
        "mfondeur@bpd.com.do", 
        "pacastillo@bpd.com.do", 
        "rasanchez@bpd.com.do", 
        "jmiguelpin@bpd.com.do",
        "palantigua@bpd.com.do",
        "ieve@bpd.com.do"];

export default function EmailModal({ message, onClose, subject }) {
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState("")

  // Usamos los destinatarios predefinidos directamente
  const recipients = PREDEFINED_RECIPIENTS.join(", ")

  const handleSendEmail = () => {
    setIsSending(true)

    // Crear URL para Gmail con parámetros
    const mailtoUrl = new URL("https://mail.google.com/mail/?view=cm&fs=1")
    mailtoUrl.searchParams.append("to", recipients)
    mailtoUrl.searchParams.append("su", subject)
    mailtoUrl.searchParams.append("body", message)

    // Abrir Gmail en una nueva pestaña
    window.open(mailtoUrl.toString(), "_blank")

    // Cerrar el modal después de un breve retraso
    setTimeout(() => {
      setIsSending(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-[900px] max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-800">Enviar UTMs por correo</h3>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Destinatarios</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-sm">
                {PREDEFINED_RECIPIENTS.map((email, index) => (
                  <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-500"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-slate-700">{email}</span>
                  </div>
                ))}
              </div>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vista previa del mensaje</label>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 whitespace-pre-wrap max-h-60 overflow-y-auto">
                {message}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className={`px-4 py-2 rounded-md text-white ${
                isSending ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSending ? "Enviando..." : "Enviar con Gmail"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
