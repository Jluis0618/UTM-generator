"use client"

import { useState } from "react"
import { generateDefaultUTM } from "../services/utmService"
import EmailModal from "./EmailModal"

const types = [
  "notas_de_prensa_bpd",
  "notas_de_prensa_gp",
  "podcast",
  "podcast_inversiones_en_breve",
  "blog",
  "eflows",
  "casacordon",
  "newsletter_popular_al_dia",
]

// Format the type names for better display
const formatTypeName = (type) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function DefaultUTMForm() {
  const [url, setUrl] = useState("") // URL
  const [type, setType] = useState(types[0]) // TIPO
  const [results, setResults] = useState([]) // Resultados
  const [isLoading, setIsLoading] = useState(false) // ¿Está cargando?
  const [error, setError] = useState("")
  const [copiedAll, setCopiedAll] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)

  const copyAllToClipboard = (results) => {
    const formattedText = formatUtmsForCopy(results)
    navigator.clipboard.writeText(formattedText)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const formatUtmsForCopy = (results) => {
    let text = "Aqui los utms correspondientes: \n\n"

    results.forEach((r) => {
      const source = r.source ? formatTypeName(r.source) : "Link"
      const url = r.utm_url || r
      text += `${source} : ${url}\n`
    })

    return text
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!url.trim()) {
      setError("Por favor, ingresa una URL válida")
      return
    }

    // Validar formato de URL
    try {
      new URL(url) // Esto lanzará un error si la URL no es válida
    } catch (err) {
      setError("La URL ingresada no es válida. Asegúrate de incluir http:// o https://")
      return
    }

    try {
      setIsLoading(true)
      const res = await generateDefaultUTM(url, type)

      // Verificar si la respuesta contiene los datos esperados
      if (res.urls || res.utm_url) {
        setResults(res.urls || [res.utm_url])
      } else {
        console.error("Respuesta inesperada:", res)
        setError("La respuesta del servidor no tiene el formato esperado")
      }

      setIsLoading(false)
    } catch (err) {
      console.error("Error completo:", err)
      setError(`Error al generar los enlaces UTM: ${err.message || "Intenta nuevamente"}`)
      setIsLoading(false)
    }
  }


  const handleOpenEmailModal = () => {
    setShowEmailModal(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Predefined UTM Parameters</h2>
        <p className="text-slate-600 mb-6">
          Generate UTM links based on predefined templates for your marketing channels.
        </p>
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
              type="url"
              placeholder="https://example.com/your-page"
              className="pl-10 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-slate-700">
            Campaign Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {formatTypeName(t)}
              </option>
            ))}
          </select>
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
          {isLoading ? "Generating..." : "Generate UTM Links"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
            <h3 className="text-lg font-medium">Generated UTM Links</h3>
            <div className="flex gap-2">
              <button
                onClick={() => copyAllToClipboard(results)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                {copiedAll ? "¡Copiado!" : "Copiar Todos"}
              </button>
              <button
                onClick={handleOpenEmailModal}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                Enviar
              </button>
            </div>
          </div>
          {results.map((r, i) => (
            <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-purple-700">
                  {r.source ? formatTypeName(r.source) : "Generated Link"}
                </div>
              
              </div>
              <div className="text-sm text-slate-600 break-all">
                <a href={r.utm_url || r} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline">
                  {r.utm_url || r}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {showEmailModal && (
        <EmailModal message={formatUtmsForCopy(results)} onClose={() => setShowEmailModal(false)} subject="UTM Links" />
      )}
    </div>
  )
}
