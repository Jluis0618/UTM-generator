"use client"

import { useState } from "react"
import { generateCustomUTM } from "../services/utmService"
import EmailModal from "./EmailModal"

export default function CustomUTMForm() {
  const [form, setForm] = useState({
    url: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  })

  const [utmUrl, setUtmUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [showEmailModal, setShowEmailModal] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!form.url.trim()) {
      setError("Por favor, ingresa una URL válida")
      return
    }

    // Validar formato de URL
    try {
      new URL(form.url) // Esto lanzará un error si la URL no es válida
    } catch (err) {
      setError("La URL ingresada no es válida. Asegúrate de incluir http:// o https://")
      return
    }

    try {
      setIsLoading(true)
      const res = await generateCustomUTM(form)

      if (res.utm_url) {
        setUtmUrl(res.utm_url)
      } else {
        console.error("Respuesta inesperada:", res)
        setError("La respuesta del servidor no tiene el formato esperado")
      }

      setIsLoading(false)
    } catch (err) {
      console.error("Error completo:", err)
      setError(`Error al generar el enlace UTM: ${err.message || "Intenta nuevamente"}`)
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    const formattedText = `Aqui los utms correspondientes: \n\nCustom UTM : ${utmUrl}`
    navigator.clipboard.writeText(formattedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenEmailModal = () => {
    setShowEmailModal(true)
  }

  const formatEmailMessage = () => {
    return `Aqui los utms correspondientes: \n\nCustom UTM : ${utmUrl}`
  }

  const utmFields = [
    {
      name: "utm_source",
      label: "Source",
      placeholder: "e.g., google, facebook, newsletter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line x1="7" y1="7" x2="7.01" y2="7"></line>
        </svg>
      ),
    },
    {
      name: "utm_medium",
      label: "Medium",
      placeholder: "e.g., cpc, email, social",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ),
    },
    {
      name: "utm_campaign",
      label: "Campaign",
      placeholder: "e.g., summer_sale, product_launch",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      name: "utm_content",
      label: "Content (optional)",
      placeholder: "e.g., banner, text_link",
      icon: null,
    },
    {
      name: "utm_influencer",
      label: "Influencer",
      placeholder: "influencer",
      icon: null,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Custom UTM Parameters</h2>
        <p className="text-slate-600 mb-6">Create a custom UTM link by defining your own tracking parameters.</p>
      </div>

      {error && <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-slate-700">
            Website URL
          </label>
          <div className="flex items-center relative">
            <div className="absolute left-3 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com/your-page"
              className="pl-10 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={form.url}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {utmFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-medium text-slate-700">
                {field.label}
              </label>
              <div className="flex items-center relative">
                {field.icon && <div className="absolute left-3 text-slate-400">{field.icon}</div>}
                <input
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={`${field.icon ? "pl-10" : ""} w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  value={form[field.name]}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className={`w-full py-2.5 px-4 rounded-md text-white font-medium ${
            isLoading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate UTM Link"}
        </button>
      </form>

      {utmUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Generated UTM Link</h3>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium text-purple-700">Custom UTM Link</div>
              <div className="flex space-x-2">
               
                <button
                  className="h-8 px-2 text-slate-600 hover:text-slate-900 border border-slate-300 rounded-md hover:bg-slate-100 flex items-center gap-1"
                  onClick={handleOpenEmailModal}
                >
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
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-xs">Enviar</span>
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-600 break-all">
              <a href={utmUrl} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">
                {utmUrl}
              </a>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <EmailModal message={formatEmailMessage()} onClose={() => setShowEmailModal(false)} subject="UTM Link" />
      )}
    </div>
  )
}
