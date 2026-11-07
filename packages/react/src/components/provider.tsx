import { FC, PropsWithChildren, createContext, createElement } from 'react'
import { MitoContextValueType } from '../types'

export const MitoContext = createContext<MitoContextValueType>({} as any)
MitoContext.displayName = 'MitoContext'

export const MitoProvider: FC<PropsWithChildren<MitoContextValueType>> = ({ MitoInstance, children }) => {
  return <MitoContext.Provider value={{ MitoInstance }}>{children}</MitoContext.Provider>
}
