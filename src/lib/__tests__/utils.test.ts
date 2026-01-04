import { cn } from "../utils"

describe("utils", () => {
  describe("cn", () => {
    it("should merge single className", () => {
      expect(cn("class1")).toBe("class1")
    })

    it("should merge multiple classNames", () => {
      expect(cn("class1", "class2", "class3")).toBe("class1 class2 class3")
    })

    it("should handle conditional classNames", () => {
      expect(cn("class1", false && "class2", "class3")).toBe("class1 class3")
    })

    it("should handle undefined and null values", () => {
      expect(cn("class1", undefined, null, "class2")).toBe("class1 class2")
    })

    it("should merge Tailwind conflicting classes correctly", () => {
      // tailwind-merge should keep the last class when conflicts occur
      expect(cn("px-4", "px-8")).toBe("px-8")
    })

    it("should handle array of classes", () => {
      expect(cn(["class1", "class2"])).toBe("class1 class2")
    })

    it("should handle object with boolean values", () => {
      expect(
        cn({
          class1: true,
          class2: false,
          class3: true,
        })
      ).toBe("class1 class3")
    })

    it("should handle empty input", () => {
      expect(cn()).toBe("")
    })

    it("should merge complex Tailwind utilities", () => {
      expect(cn("text-sm", "text-lg")).toBe("text-lg")
      expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500")
    })

    it("should preserve non-conflicting classes", () => {
      expect(cn("px-4", "py-8", "text-sm")).toBe("px-4 py-8 text-sm")
    })

    it("should handle mixed input types", () => {
      expect(
        cn(
          "class1",
          ["class2", "class3"],
          { class4: true, class5: false },
          undefined,
          "class6"
        )
      ).toBe("class1 class2 class3 class4 class6")
    })
  })
})
