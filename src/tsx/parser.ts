if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('test', () => {
    expect(true).toBe(true)
  })
}