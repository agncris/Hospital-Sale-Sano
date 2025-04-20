import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container my-5">
          <div className="error-container p-4 bg-white shadow-sm border-left border-danger rounded">
            <div className="d-flex align-items-center mb-4">
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#dc3545" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <h2 className="text-danger mb-0 font-weight-bold">Atención: Sistema no disponible</h2>
            </div>
            
            <div className="alert alert-light mb-4">
              <h5 className="text-secondary">Estimado usuario:</h5>
              <p>Se ha detectado un problema técnico en el sistema. Nuestro equipo ha sido notificado y está trabajando para resolverlo a la brevedad posible.</p>
              <p className="mb-0">Referencia del error: <code className="bg-light px-2 py-1 rounded">{this.state.error && this.state.error.toString()}</code></p>
            </div>
            
            <div className="card border-0 bg-light mb-4">
              <div className="card-header bg-light border-bottom-0">
                <button className="btn btn-link text-secondary p-0" type="button" data-toggle="collapse" data-target="#errorDetails">
                  Información técnica (para soporte técnico)
                </button>
              </div>
              <div className="collapse" id="errorDetails">
                <div className="card-body">
                  <pre className="bg-white p-3 border rounded text-secondary small" style={{maxHeight: '200px', overflowY: 'auto'}}>
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-center">
              <button 
                className="btn btn-primary px-4"
                onClick={() => window.location.reload()}
              >
                Reiniciar aplicación
              </button>
            </div>
            
            <div className="mt-4 text-center text-muted small">
              <p className="mb-0">Si el problema persiste, por favor contacte al departamento de soporte técnico al número <strong>(+56) 2 2345 6789</strong></p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;