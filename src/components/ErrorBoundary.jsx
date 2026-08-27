import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error boundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const {
      title = "Oops, our little shop tripped!",
      message = "Something unexpected happened. We are dusting off the sparkles and trying again.",
      onRetry = this.handleRetry,
    } = this.props;

    return (
      <div className="error-boundary" role="alert">
        <span className="error-boundary-icon" aria-hidden="true">
          ✿
        </span>
        <h2>{title}</h2>
        <p>{message}</p>
        {onRetry && (
          <button type="button" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
