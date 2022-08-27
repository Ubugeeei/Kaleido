import { KaleidoElement } from "../dom/interface"

export type Context<T> = { Provider: Provider<T>, Consumer: Consumer<T> }
type Provider<T> = ProviderExoticComponent<ProviderProps<T>>
type ProviderExoticComponent<P> = (propTypes: P, kaleidoElement: KaleidoElement) => KaleidoElement
type ProviderProps<T> = {
  value: T
}
type Consumer<T> = (cb: (st: T) => KaleidoElement | void) => KaleidoElement | void

export const createContext = <T>(defaultValue: T): Context<T> => {
  let state = defaultValue
  const context: Context<T> = {
    Provider: (props: ProviderProps<T>, kaleidoElement: KaleidoElement): KaleidoElement => {
      state = props.value
      return kaleidoElement
    },
    Consumer: (cb: (st: T) => KaleidoElement | void) => cb(state)
  }
  return context
}