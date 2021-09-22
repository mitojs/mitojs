import { BaseClient } from '@mitojs/core'
import { FC, createContext } from 'react'
import { MitoContextValueType } from '../types'

export const MitoContext = createContext<MitoContextValueType>({} as any)
MitoContext.displayName = 'MitoContext'

export const MitoProvider: FC<MitoContextValueType> = ({ MitoInstance, children }: { MitoInstance: BaseClient; children: any }) => {
  return <MitoContext.Provider value={{ MitoInstance }}>{children}</MitoContext.Provider>
}
