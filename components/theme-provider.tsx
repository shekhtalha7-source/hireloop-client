"use client"

import * as React from "react"

type Theme = "dark" | "light"
const Ctx = React.createContext<{ resolvedTheme: Theme; setTheme: (t: Theme) => void }>({
  resolvedTheme: "dark",
  setTheme: () => {},
})

export const useTheme = () => React.useContext(Ctx)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
  if (typeof window === "undefined") return "dark"
  return (localStorage.getItem("theme") as Theme | null) ?? "dark"
})

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (typeof e.key !== "string" || e.key.toLowerCase() !== "d") return
      const t = e.target
      if (
        t instanceof HTMLElement &&
        (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))
      ) return
      setThemeState((p) => (p === "dark" ? "light" : "dark"))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <Ctx.Provider value={{ resolvedTheme: theme, setTheme: setThemeState }}>
      {children}
    </Ctx.Provider>
  )
}