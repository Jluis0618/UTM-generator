"use client"

import { useState } from "react"
import DefaultUTMForm from "./components/DefaultUTMForm"
import CustomUTMForm from "./components/CustomUTMForm"

function App() {
  const [activeTab, setActiveTab] = useState("default")

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-900 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Creacion de UTM's
          </h1>
        </header>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 pt-6 border-b">
            <div className="grid w-full grid-cols-2 mb-2">
              <button
                onClick={() => setActiveTab("default")}
                className={`py-2.5 px-4 text-base font-medium rounded-md transition-colors ${
                  activeTab === "default" ? "bg-purple-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                UTMs predefinidos
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`py-2.5 px-4 text-base font-medium rounded-md transition-colors ${
                  activeTab === "custom" ? "bg-purple-100 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                UTM Personalizado
              </button>
            </div>
          </div>

          <div className="p-6">{activeTab === "default" ? <DefaultUTMForm /> : <CustomUTMForm />}</div>
        </div>
      </div>
    </div>
  )
}

export default App
