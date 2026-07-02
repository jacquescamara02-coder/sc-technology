import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-6 text-center"
          style={{ background: "#16213f", color: "#f8fafc", fontFamily: "system-ui, sans-serif" }}
        >
          <div style={{ maxWidth: "28rem" }}>
            <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem", fontWeight: 800 }}>
              SC TECHNOLOGIE
            </h1>
            <p style={{ margin: "0 0 1rem", color: "#cbd5e1" }}>
              La boutique n'a pas pu s'afficher correctement.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{ border: 0, borderRadius: 999, background: "#0066ff", color: "white", padding: "0.75rem 1rem", fontWeight: 800, cursor: "pointer" }}
            >
              Recharger la boutique
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
