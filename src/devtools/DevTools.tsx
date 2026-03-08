import { useEffect, useState } from 'react'
import './DevTools.css'

interface ConsoleEntry {
  id: number
  type: 'log' | 'warn' | 'error' | 'info' | 'verbose'
  message: string
  timestamp: number
}

export const DevTools = () => {
  const [entries, setEntries] = useState<ConsoleEntry[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [filters, setFilters] = useState({
    error: true,
    warn: true,
    info: true,
    log: true,
    verbose: true,
  })
  const [status, setStatus] = useState('Initializing...')
  const [lastClickedId, setLastClickedId] = useState<number | null>(null)
  const [searchText, setSearchText] = useState('')
  const [tagFilters, setTagFilters] = useState<Set<string>>(new Set())
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [showCopyPreview, setShowCopyPreview] = useState(false)
  const [copyPreviewText, setCopyPreviewText] = useState('')

  useEffect(() => {
    console.log('Console Cat: Setting up listener')
    setStatus('Setting up listener...')

    const typeMap: Record<string, ConsoleEntry['type']> = {
      log: 'log',
      warning: 'warn',
      error: 'error',
      info: 'info',
      debug: 'verbose',
      verbose: 'verbose',
    }

    // Poll for console messages using inspectedWindow.eval
    const pollInterval = setInterval(() => {
      chrome.devtools.inspectedWindow.eval(
        `(function() {
          if (!window.__consoleCatMessages) {
            window.__consoleCatMessages = [];
            const original = {
              log: console.log,
              error: console.error,
              warn: console.warn,
              info: console.info,
              debug: console.debug
            };
            
            ['log', 'error', 'warn', 'info', 'debug'].forEach(type => {
              console[type] = function(...args) {
                window.__consoleCatMessages.push({
                  type,
                  message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '),
                  timestamp: Date.now()
                });
                original[type].apply(console, args);
              };
            });
          }
          const messages = window.__consoleCatMessages || [];
          window.__consoleCatMessages = [];
          return messages;
        })()`,
        (result: any, exceptionInfo: any) => {
          if (!exceptionInfo && result && Array.isArray(result)) {
            result.forEach((msg: any) => {
              const entry: ConsoleEntry = {
                id: Date.now() + Math.random(),
                type: typeMap[msg.type] || 'log',
                message: msg.message,
                timestamp: msg.timestamp,
              }
              setEntries((prev) => [...prev, entry])
            })
          }
        },
      )
    }, 500)

    setStatus('Listening for console messages...')

    return () => {
      clearInterval(pollInterval)
    }
  }, [])

  const extractTag = (message: string): string | null => {
    const match = message.match(/^\[([^\]]+)\]/)
    return match ? match[1] : null
  }

  useEffect(() => {
    // Extract unique tags from all entries
    const tags = new Set<string>()
    entries.forEach((entry) => {
      const tag = extractTag(entry.message)
      if (tag) tags.add(tag)
    })
    setAvailableTags(Array.from(tags).sort())
  }, [entries])

  const toggleTagFilter = (tag: string) => {
    setTagFilters((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const formatMessage = (message: any): string => {
    if (message.parameters && message.parameters.length > 0) {
      return message.parameters
        .map((p: any) => {
          if (p.type === 'object') return p.description || '[Object]'
          return p.value !== undefined ? String(p.value) : p.description || ''
        })
        .join(' ')
    }
    return message.text || ''
  }

  const toggleSelect = (id: number, shiftKey: boolean = false) => {
    if (shiftKey && lastClickedId !== null) {
      // Range selection
      const lastIndex = filtered.findIndex((e) => e.id === lastClickedId)
      const currentIndex = filtered.findIndex((e) => e.id === id)

      if (lastIndex !== -1 && currentIndex !== -1) {
        const start = Math.min(lastIndex, currentIndex)
        const end = Math.max(lastIndex, currentIndex)
        const rangeIds = filtered.slice(start, end + 1).map((e) => e.id)

        // If the last clicked was selected, select the range; otherwise deselect
        const shouldSelect = selected.has(lastClickedId)

        setSelected((prev) => {
          const next = new Set(prev)
          rangeIds.forEach((rangeId) => {
            if (shouldSelect) {
              next.add(rangeId)
            } else {
              next.delete(rangeId)
            }
          })
          return next
        })
      }
    } else {
      // Single toggle
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    setLastClickedId(id)
  }

  const deduplicateLines = (lines: string[]): string[] => {
    const result: string[] = []
    let currentLine = ''
    let count = 0

    lines.forEach((line, index) => {
      if (line === currentLine) {
        count++
      } else {
        if (currentLine) {
          if (count > 1) {
            result.push(`[x${count}] ${currentLine}`)
          } else {
            result.push(currentLine)
          }
        }
        currentLine = line
        count = 1
      }

      // Handle last line
      if (index === lines.length - 1) {
        if (count > 1) {
          result.push(`[x${count}] ${currentLine}`)
        } else {
          result.push(currentLine)
        }
      }
    })

    return result
  }

  const copySelected = async () => {
    const selectedEntries = entries.filter((e) => selected.has(e.id))
    const lines = selectedEntries.map((e) => {
      const time = new Date(e.timestamp).toLocaleTimeString()
      return `[${time}] [${e.type.toUpperCase()}] ${e.message}`
    })

    const deduplicated = deduplicateLines(lines)
    const text = deduplicated.join('\n')

    await navigator.clipboard.writeText(text)
    setCopyPreviewText(text)
    setShowCopyPreview(true)
  }

  const selectAll = () => {
    const allIds = new Set(filtered.map((e) => e.id))
    setSelected(allIds)
  }

  const deselectAll = () => {
    setSelected(new Set())
  }

  const clearAll = () => {
    setEntries([])
    setSelected(new Set())
  }

  const toggleFilter = (type: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }))
  }

  const filtered = entries.filter((e) => {
    // Type filter
    if (!filters[e.type]) return false

    // Search text filter
    if (searchText && !e.message.toLowerCase().includes(searchText.toLowerCase())) {
      return false
    }

    // Tag filter (mutually inclusive - if any tag filters active, show entries with ANY of those tags)
    if (tagFilters.size > 0) {
      const tag = extractTag(e.message)
      if (!tag || !tagFilters.has(tag)) return false
    }

    return true
  })

  return (
    <div className="copy-console">
      {showCopyPreview ? (
        <>
          <div className="toolbar">
            <button onClick={() => setShowCopyPreview(false)}>← Back to Console</button>
            <div className="spacer" />
            <span style={{ fontSize: '11px', color: '#888' }}>
              Copied to clipboard ({copyPreviewText.split('\n').length} lines)
            </span>
          </div>
          <div className="copy-preview">
            <pre>{copyPreviewText}</pre>
          </div>
        </>
      ) : (
        <>
          <div className="toolbar">
            <div className="toolbar-logo">
              <img src="/img/logo-128.png" alt="Console Cat" />
            </div>
            <div className="toolbar-content">
              <div className="toolbar-row">
                <button onClick={copySelected} disabled={selected.size === 0}>
                  Copy Selected ({selected.size})
                </button>
                <button onClick={selectAll}>Select All</button>
                <button onClick={deselectAll}>Deselect All</button>
                <button onClick={clearAll}>Clear Console</button>
              </div>
              <div className="toolbar-row">
                <input
                  type="text"
                  placeholder="Filter..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="filter-input"
                />
                <div className="level-filters">
                  {Object.keys(filters).map((type) => (
                    <label key={type}>
                      <input
                        type="checkbox"
                        checked={filters[type as keyof typeof filters]}
                        onChange={() => toggleFilter(type as keyof typeof filters)}
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {availableTags.length > 0 && (
            <div className="tag-filters">
              <span style={{ fontSize: '11px', color: '#888', marginRight: '8px' }}>Tags:</span>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-pill ${tagFilters.has(tag) ? 'active' : ''}`}
                  onClick={() => toggleTagFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          <div className="entries">
            {filtered.length === 0 && (
              <div style={{ padding: '40px 20px', color: '#666', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', marginBottom: '12px', color: '#888' }}>
                  No console messages yet
                </div>
                <div style={{ fontSize: '11px', color: '#555' }}>Status: {status}</div>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '8px' }}>
                  Try running:{' '}
                  <code style={{ background: '#2a2a2a', padding: '2px 6px', borderRadius: '3px' }}>
                    console.log('test')
                  </code>
                </div>
              </div>
            )}
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className={`entry ${entry.type} ${selected.has(entry.id) ? 'selected' : ''}`}
                onClick={(e) => toggleSelect(entry.id, e.shiftKey)}
              >
                <input type="checkbox" checked={selected.has(entry.id)} readOnly />
                <span className="type">{entry.type}</span>
                <span className="time">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                <span className="message">{entry.message}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default DevTools
