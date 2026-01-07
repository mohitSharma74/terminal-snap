import type { BackgroundPreset } from "@/types"

export const backgrounds: BackgroundPreset[] = [
  {
    id: "gradient-purple",
    name: "Purple Gradient",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    previewColor: "#667eea",
  },
  {
    id: "gradient-blue",
    name: "Blue Gradient",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    previewColor: "#667eea",
  },
  {
    id: "gradient-pink",
    name: "Pink Gradient",
    css: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    previewColor: "#f093fb",
  },
  {
    id: "gradient-green",
    name: "Green Gradient",
    css: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    previewColor: "#4facfe",
  },
  {
    id: "gradient-orange",
    name: "Orange Gradient",
    css: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    previewColor: "#fa709a",
  },
  {
    id: "solid-white",
    name: "White",
    css: "#ffffff",
    previewColor: "#ffffff",
  },
  {
    id: "solid-gray",
    name: "Light Gray",
    css: "#f5f5f5",
    previewColor: "#f5f5f5",
  },
  {
    id: "solid-dark",
    name: "Dark Gray",
    css: "#1a1a1a",
    previewColor: "#1a1a1a",
  },
  {
    id: "gradient-dark",
    name: "Dark Gradient",
    css: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    previewColor: "#1e3c72",
  },
  {
    id: "gradient-rainbow",
    name: "Rainbow Gradient",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    previewColor: "#667eea",
  },
  {
    id: "macos-sonoma-purple",
    name: "Sonoma Purple",
    css: "radial-gradient(ellipse at 20% 30%, #8b5cf6 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, #ec4899 0%, transparent 50%), linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
    previewColor: "#8b5cf6",
  },
  {
    id: "macos-sequoia-blue",
    name: "Sequoia Blue",
    css: "radial-gradient(ellipse at 30% 20%, #3b82f6 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #06b6d4 0%, transparent 60%), linear-gradient(to bottom, #0c4a6e 0%, #020617 100%)",
    previewColor: "#3b82f6",
  },
  {
    id: "macos-green-aurora",
    name: "Green Aurora",
    css: "radial-gradient(ellipse at 50% 0%, #10b981 0%, transparent 70%), radial-gradient(ellipse at 0% 100%, #059669 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, #0d9488 0%, transparent 60%), linear-gradient(to bottom, #064e3b 0%, #0f172a 100%)",
    previewColor: "#10b981",
  },
  {
    id: "macos-sunset-orange",
    name: "Sunset Orange",
    css: "radial-gradient(ellipse at 50% 40%, #f97316 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #fb923c 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, #fbbf24 0%, transparent 50%), linear-gradient(135deg, #7c2d12 0%, #1c1917 100%)",
    previewColor: "#f97316",
  },
  {
    id: "macos-pink-flow",
    name: "Pink Flow",
    css: "radial-gradient(ellipse at 30% 50%, #ec4899 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, #a855f7 0%, transparent 60%), radial-gradient(ellipse at 50% 90%, #f472b6 0%, transparent 50%), linear-gradient(to bottom, #831843 0%, #0f172a 100%)",
    previewColor: "#ec4899",
  },
]

export const getBackgroundById = (id: string): BackgroundPreset => {
  return backgrounds.find((bg) => bg.id === id) || backgrounds[0]
}
