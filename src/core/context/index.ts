import { KaleidoElement } from "../dom/interface"
import { rootComponentInstance } from "../root"

export type Context<T> = { Provider: Provider<T>, Consumer: Consumer<T> }
type Provider<T> = ProviderExoticComponent<ProviderProps<T>>
type ProviderExoticComponent<P> = (propTypes: P, kaleidoElement: KaleidoElement) => KaleidoElement
type ProviderProps<T> = {
  value: T
}
type Consumer<T> = (cb: (st: T) => KaleidoElement | void) => KaleidoElement | void

export const createContext = <T>(defaultValue: T): Context<T> => {
  const i = rootComponentInstance.currentSetContextStateIndex;
  if (rootComponentInstance.contextStates[i] === undefined) {
    rootComponentInstance.contextStates[i] = defaultValue;
  }

  const context: Context<T> = {
    Provider: (props: ProviderProps<T>, kaleidoElement: KaleidoElement): KaleidoElement => {
      if (rootComponentInstance.contextStates[i] !== props.value) {
        rootComponentInstance.contextStates[i] = props.value
        // rootComponentInstance.render()
      }
      return kaleidoElement
    },
    Consumer: (cb: (st: T) => KaleidoElement | void) => cb(rootComponentInstance.contextStates[i] as T)
  }

  rootComponentInstance.currentSetContextStateIndex++;

  return context
}