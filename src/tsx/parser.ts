
class TSXTranspiler {
  private cursor: number
  private result: string

  constructor() {
    this.cursor = 0;
    this.result = '';
  }

  transpile(source: string): string {
    this.skipWhitespace(source);
    return this.result;
  }


  letter(source: string): string | ParseError {
    let result = '';
    const reg_at_first = /[a-zA-Z]/;
    const reg = /[a-zA-Z0-9_]/;
    if (reg_at_first.test(source[this.cursor])) {
      result += source[this.cursor];
      this.cursor++;
    } else {
      const err = new ParseError(`letter: ${source.slice(this.cursor)}`);
      console.error(err);
      return err;
    }

    while (!this.end(source) && reg.test(source[this.cursor])) {
      result += source[this.cursor];
      this.cursor++;
    }
    return result;
  }

  private skipWhitespace(source: string) {
    while (this.cursor < source.length && source[this.cursor] === ' ') {
      this.result += source[this.cursor];
      this.cursor++;
    }
  }

  private end(source: string) {
    return this.cursor >= source.length
  }
}

class ParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ParseError';
  }
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('transepile empty sourse', () => {
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.transpile('')).toBe('');
    }
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.transpile('  ')).toBe('  ');
    }
  })

  it('letter', () => {
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.letter('onClick')).toBe('onClick');
    }
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.letter('onClick={countUp}')).toBe('onClick');
    }
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.letter('onClick   ')).toBe('onClick');
    }
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.letter(' onClick')).instanceof(ParseError);
    }
    {
      const tsxt = new TSXTranspiler();
      expect(tsxt.letter('={onClick')).instanceof(ParseError);
    }
  })
}