export const codeToHtml = jest.fn().mockImplementation(async (code: string) => {
  return `<pre><code>${code}</code></pre>`
})

export const getHighlighter = jest.fn().mockResolvedValue({
  codeToHtml: codeToHtml,
})
