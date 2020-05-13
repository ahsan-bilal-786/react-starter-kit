import React from 'react';
/**
 * ErrorBoundary Component catches the error which produces in its child nodes.
 * For Dev it console the errors and for PROD it sends the error report to
 * sentry.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
