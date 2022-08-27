import KaleidoDOM, { FC } from "~/src/core/dom";
import { Dispatch, useContext, useState } from '~/src/core/hooks';
import { createContext } from '~/src/core/context'

interface CounterContextProps {
  count: number;
  setCount: Dispatch<number>;
}

export const CounterContext = createContext<CounterContextProps>({ count: 0, setCount: () => { } })

const ContextSamplePage: FC<{}> = () => {
  const [count, setCount] = useState(0)
  return CounterContext.Provider(
    { value: { count, setCount } },
    KaleidoDOM.createElement(
      "div",
      { style: 'border: 1px solid black; padding: 12px; margin: 10px;' },
      [
        KaleidoDOM.createElement(
          "h1",
          {},
          ["Parent"]
        ),
        KaleidoDOM.createElement(
          "div",
          {},
          [
            KaleidoDOM.createElement(
              "p",
              {},
              [`Count: ${count}`]
            ),
            KaleidoDOM.createElement(
              "button",
              {
                onClick: () => setCount(prev => prev + 1)
              },
              ["Increment"]
            )
          ]
        ),
        Child()
      ]
    )
  )
}

const Child: FC<{}> = () => {
  const { count, setCount } = useContext(CounterContext)

  return KaleidoDOM.createElement(
    "div",
    { style: 'border: 1px solid black; padding: 12px; margin: 10px;' },
    [
      KaleidoDOM.createElement(
        "h3",
        {},
        ["Child"]
      ),
      KaleidoDOM.createElement(
        "div",
        {},
        [
          KaleidoDOM.createElement(
            "p",
            {},
            [`Count: ${count}`]
          ),
          KaleidoDOM.createElement(
            "button",
            {
              onClick: () => setCount(prev => prev + 1)
            },
            ["Increment"]
          )
        ]
      ),
      GrandChild()
    ]
  )
}

const GrandChild: FC<{}> = () => {
  const { count, setCount } = useContext(CounterContext)

  return KaleidoDOM.createElement(
    "div",
    { style: 'border: 1px solid black; padding: 12px; margin: 10px;' },
    [
      KaleidoDOM.createElement(
        "h6",
        {},
        ["GrandChild"]
      ),
      KaleidoDOM.createElement(
        "div",
        {},
        [
          KaleidoDOM.createElement(
            "p",
            {},
            [`Count: ${count}`]
          ),
          KaleidoDOM.createElement(
            "button",
            {
              onClick: () => setCount(prev => prev + 1)
            },
            ["Increment"]
          )
        ]
      )
    ]
  )
}

export default ContextSamplePage;