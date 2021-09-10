import { BrowserClient } from '@mitojs/browser'
import { FC, createContext } from 'react'
import { MitoContextValueType } from '../types'

export const MitoContext = createContext<MitoContextValueType>({} as any)
MitoContext.displayName = 'MitoContext'

export const MitoProvider: FC<MitoContextValueType> = ({ MitoInstance, children }: { MitoInstance: BrowserClient; children: any }) => {
  return <MitoContext.Provider value={{ MitoInstance }}>{children}</MitoContext.Provider>
}
