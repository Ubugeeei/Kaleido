# Kaleido

Toy frontend library like React.  
Scratch implementation in TypeScript. Virtual DOM, Hooks, Router, StyleSheet

## Deps

bundler: [vite](https://vitejs.dev/config/shared-options.html#cachedir)

## Docs

### Component

functional component and createElement.

```ts
// playground/App.ts
import KaleidoDOM from "~/src/kaleido-dom";

const App = () => {
  return KaleidoDOM.createElement(
    "div",
    { id: "root" },
    [
      KaleidoDOM.createElement(
        "p"
	{},
	["Hello World"]
      )
    ]
   )
}

KaleidoDOM.render(App, document.getElementById("root-element"));
```

### Component State

use `useState` hooks.

```ts
// playground/App.ts
import KaleidoDOM from "~/src/kaleido-dom";
import { useState } from "~/src/hooks";

const App = () => {
  const [count, setCount] = useState(0)
  const increment = () => {
      setCount(prev => prev + 1)
  }
  const reset = () => {
    setCount(0)
  }

  return KaleidoDOM.createElement(
    "div",
    { id: "root" },
    [
      KaleidoDOM.createElement(
        "p"
	      {},
	      [`${count}`]
      ),
      KaleidoDOM.createElement(
        "button"
	      { type: "button", onClick: increment },
	      ["count up!"]
      ),
      KaleidoDOM.createElement(
        "button"
	      { type: "button", onClick: reset },
	      ["reset!"]
      ),
    ]
   )
}

KaleidoDOM.render(App, document.getElementById("root-element"));
```

### Other Hooks

can use: useEffect, useMemo, useCallback, useRef, useContext, useRouter

```ts
// state
const [count, setCount] = useState(0);
setCount(3);
setCount((prev) => prev + 1);
```

```ts
// memorization
const double = useMemo(() => count * 2, [count]);
const logDouble = useCallback(() => {
	console.log("double updated!", double);
}, [double]);
```

```ts
// effect
useEffect(() => {
	console.log("render");
});

useEffect(() => {
	console.log("initial render!");
}, []);

useEffect(() => {
	console.log("count is updated!", count);
}, [count]);
```

```ts
// ref
const inputEl = useRef<HTMLInputElement | null>(null);
// use with
// KaleidoDOM.createElement('input', { ref: inputEl }, [])
```

```ts
// context
interface CounterContextProps {
	count: number;
	setCount: Dispatch<number>;
}
export const CounterContext = createContext<CounterContextProps>({
	count: 0,
	setCount: () => {},
});
const Parent = () => {
	const [count, setCount] = useState(0);
	return CounterContext.Provider(
		{ value: { count, setCount } },
		Child()
	);
};
const Child = () => {
	const { count, setCount } = useContext(CounterContext);
	// ...
};
```

```ts
// router
const router = useRouter();
const toDetail = () => {
	router.push("/detail");
};
```

### Styles

```ts
import { KaleidoStyleSheet } from "~/src/style";
const styles = KaleidoStyleSheet.create({
  contentBox: {
    width: "700px"
    height: "400px",
    display: "flex"
  }
})

/*
 * KaleidoDOM.createElement(
 *   "div",
 *   { style: styles.contentBox },
 *   .
 *   .
 *   .
 */
```

# Usage

edit on playground App.ts or components!

```sh
$ pnpm i
$ pnpm start
```

https://user-images.githubusercontent.com/71201308/162628530-2d5c28bc-41cc-466a-b171-7c985192f214.mov
