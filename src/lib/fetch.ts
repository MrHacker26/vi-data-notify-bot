export async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => {
    controller.abort()
  }, timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    return response
  } finally {
    clearTimeout(id)
  }
}
