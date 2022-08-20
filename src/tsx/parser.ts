class TSXTranspiler {
  private cursor: number
  private result: string
  constructor(private source: string) {
    this.cursor = 0;
    this.result = '';
  }

  transepile(): string {
    this.skipWhitespace();
    return this.result;
  }

  private skipWhitespace() {
    while (this.cursor < this.source.length && this.source[this.cursor] === ' ') {
      this.cursor++;
    }
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('transepile empty sourse', () => {
    const tsxt = new TSXTranspiler('');
    expect(tsxt.transepile()).toBe('');
  })
}