export const toPng = jest
  .fn()
  .mockResolvedValue("data:image/png;base64,mockImageData")

export const toJpeg = jest
  .fn()
  .mockResolvedValue("data:image/jpeg;base64,mockImageData")

export const toBlob = jest
  .fn()
  .mockResolvedValue(new Blob(["mock"], { type: "image/png" }))

export const toPixelData = jest.fn().mockResolvedValue(new Uint8ClampedArray())

export const toSvg = jest
  .fn()
  .mockResolvedValue("data:image/svg+xml;base64,mockImageData")
