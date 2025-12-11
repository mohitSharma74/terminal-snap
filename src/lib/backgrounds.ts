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
]

export const getBackgroundById = (id: string): BackgroundPreset => {
  return backgrounds.find((bg) => bg.id === id) || backgrounds[0]
}


