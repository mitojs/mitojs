import { BrowserBreadcrumbTypes, ErrorTypes } from '@mitojs/shared'
import { ReportDataType } from '@mitojs/types'
import { extractErrorStack, getBreadcrumbCategoryInBrowser, Severity } from '@mitojs/utils'
import { BrowserClient } from '@mitojs/browser'
import { PureComponent, ReactNode, ErrorInfo, ComponentType, FC } from 'react'
import { MitoContext } from './provider'

export interface ErrorBoundaryProps {
  fallback?: ReactNode
  onError?: (error: Error, componentStack: string) => void
  MitoInstance?: BrowserClient
}

export interface ErrorBoundaryState {
  hasError?: boolean
}

export class ErrorBoundaryWrapped extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  readonly state: ErrorBoundaryState
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    const { onError, MitoInstance } = this.props
    const reactError = extractErrorStack(error, Severity.Normal) as ReportDataType
    reactError.type = ErrorTypes.REACT
    // mito handler
    const breadcrumbStack = MitoInstance.breadcrumb.push({
      type: BrowserBreadcrumbTypes.REACT,
      data: reactError,
      category: getBreadcrumbCategoryInBrowser(BrowserBreadcrumbTypes.REACT),
      level: Severity.Error
    })
    onError?.(error, componentStack)
    MitoInstance.transport.send(reactError, breadcrumbStack)
    this.setState({
      hasError: true
    })
  }
  render() {
    return (this.state.hasError ? this.props.fallback : this.props.children) ?? null
  }
}

export const ErrorBoundary: FC = (props: ErrorBoundaryProps & { children: ReactNode }) => (
  <MitoContext.Consumer>
    {({ MitoInstance }) => (
      <ErrorBoundaryWrapped {...props} MitoInstance={props.MitoInstance || MitoInstance}>
        {props.children}
      </ErrorBoundaryWrapped>
    )}
  </MitoContext.Consumer>
)

export const WithErrorBoundary = (errorBoundaryProps: ErrorBoundaryProps = {}) =>
  function <C extends ComponentType>(ToWrapComponent: C) {
    // ToWrapComponent may be class component or Function
    const componentDisplayName = ToWrapComponent.displayName || ToWrapComponent.name || 'unknown'
    const wrapped: FC = (props: any) => (
      <ErrorBoundary {...errorBoundaryProps}>
        <ToWrapComponent {...props} />
      </ErrorBoundary>
    )
    wrapped.displayName = `MitoErrorBoundary(${componentDisplayName})`
    return wrapped as C
  }
