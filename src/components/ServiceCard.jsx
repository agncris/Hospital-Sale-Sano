import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, showDetails = true }) => {
  const { id, name, description, image, price } = service;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="card-img-top" 
            style={{ height: '200px', objectFit: 'cover' }} 
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-truncate">
            {description}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-primary fw-bold">${price.toFixed(2)}</span>
            {showDetails && (
              <Link to={`/services/${id}`} className="btn btn-sm btn-outline-primary">
                Ver detalles
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired
  }).isRequired,
  showDetails: PropTypes.bool
};

export default ServiceCard; 