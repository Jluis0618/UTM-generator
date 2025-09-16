const API_BASE = "http://localhost:3000/api"

export const generateDefaultUTM = async (url, type) => {
  const res = await fetch(`${API_BASE}/generate-default`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, type }),
  })
  return await res.json()
}

export const generateCustomUTM = async (data) => {
  const res = await fetch(`${API_BASE}/generate-customUTM`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return await res.json()
}
