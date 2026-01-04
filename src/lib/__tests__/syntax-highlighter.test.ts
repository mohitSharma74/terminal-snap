import { detectShellType, highlightSyntax } from '../syntax-highlighter'

// Mock shiki module
jest.mock('shiki')

describe('syntax-highlighter', () => {
  describe('detectShellType', () => {
    it('should detect bash from $ prompt', () => {
      const text = '$ npm install'
      expect(detectShellType(text)).toBe('bash')
    })

    it('should detect bash from # prompt', () => {
      const text = '# root command'
      expect(detectShellType(text)).toBe('bash')
    })

    it('should detect powershell from > prompt', () => {
      const text = '> Get-Process'
      expect(detectShellType(text)).toBe('powershell')
    })

    it('should detect powershell from PS prefix', () => {
      const text = 'PS C:\\Users> Get-ChildItem'
      expect(detectShellType(text)).toBe('powershell')
    })

    it('should detect bash from multi-line input with $ on first line', () => {
      const text = '$ git add .\n$ git commit -m "message"\n$ git push'
      expect(detectShellType(text)).toBe('bash')
    })

    it('should detect bash from multi-line input with $ on second line', () => {
      const text = 'output line\n$ npm run build'
      expect(detectShellType(text)).toBe('bash')
    })

    it('should default to bash when no shell indicators found', () => {
      const text = 'just some random text\nno shell prompts here'
      expect(detectShellType(text)).toBe('bash')
    })

    it('should handle empty string', () => {
      expect(detectShellType('')).toBe('bash')
    })

    it('should only check first 10 lines', () => {
      const lines = Array(15).fill('normal line')
      lines[12] = '$ this should not be detected'
      const text = lines.join('\n')
      expect(detectShellType(text)).toBe('bash') // Default fallback
    })

    it('should handle whitespace before prompts', () => {
      const text = '  $ npm install'
      expect(detectShellType(text)).toBe('bash')
    })

    it('should handle tabs before prompts', () => {
      const text = '\t> Get-Date'
      expect(detectShellType(text)).toBe('powershell')
    })
  })

  describe('highlightSyntax', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call codeToHtml with bash language for bash shell type', async () => {
      const { codeToHtml } = require('shiki')
      const text = '$ npm install'
      await highlightSyntax(text, 'bash')

      expect(codeToHtml).toHaveBeenCalledWith(text, {
        lang: 'bash',
        theme: 'github-dark',
      })
    })

    it('should call codeToHtml with powershell language for powershell shell type', async () => {
      const { codeToHtml } = require('shiki')
      const text = '> Get-Process'
      await highlightSyntax(text, 'powershell')

      expect(codeToHtml).toHaveBeenCalledWith(text, {
        lang: 'powershell',
        theme: 'github-dark',
      })
    })

    it('should auto-detect shell type when shellType is "auto"', async () => {
      const { codeToHtml } = require('shiki')
      const text = '> Get-Date'
      await highlightSyntax(text, 'auto')

      expect(codeToHtml).toHaveBeenCalledWith(text, {
        lang: 'powershell',
        theme: 'github-dark',
      })
    })

    it('should map zsh to bash language', async () => {
      const { codeToHtml } = require('shiki')
      const text = '% zsh command'
      await highlightSyntax(text, 'zsh')

      expect(codeToHtml).toHaveBeenCalledWith(text, {
        lang: 'bash',
        theme: 'github-dark',
      })
    })

    it('should return original text on error', async () => {
      const { codeToHtml } = require('shiki')
      codeToHtml.mockRejectedValueOnce(new Error('Shiki error'))

      const text = '$ npm install'
      const result = await highlightSyntax(text, 'bash')

      expect(result).toBe(text)
    })

    it('should return highlighted HTML on success', async () => {
      const text = '$ npm install'
      const result = await highlightSyntax(text, 'bash')

      expect(result).toBe('<pre><code>$ npm install</code></pre>')
    })
  })
})
