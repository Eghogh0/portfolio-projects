import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Customer } from '../types';

interface CustomerViewProps {
  customer: Customer;
  onBack: () => void;
  onEdit?: () => void;
  onRefresh?: () => void; // Optional refresh prop
}

const CustomerView: React.FC<CustomerViewProps> = ({ 
  customer, 
  onBack, 
  onEdit,
  onRefresh 
}) => {
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="customer-view">
      <div className="view-header">
        <h2>Customer Details</h2>
        <div className="view-actions">
          <button onClick={onBack}>Back to List</button>
          <button onClick={onEdit}>Edit Customer</button>
          {onRefresh && (
            <button onClick={onRefresh}>Refresh Data</button>
          )}
        </div>
      </div>

      <div className="customer-details">
        <div className="detail-row">
          <span className="detail-label">Full Name:</span>
          <span className="detail-value">
            {customer.first_name} {customer.middle_name ? customer.middle_name + ' ' : ''}
            {customer.surname}
          </span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Date of Birth:</span>
          <span className="detail-value">{formatDate(customer.date_of_birth)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Home Address:</span>
          <span className="detail-value">{customer.home_address || 'N/A'}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Registration Date:</span>
          <span className="detail-value">{formatDate(customer.date_of_registration)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Developer Honor:</span>
          <span className="detail-value">
            {customer.developer_honor ? '_24120111119' : 'No'}
          </span>
        </div>
      </div>

      <div className="order-history">
        <h3>Order History</h3>
        {customer.orders && customer.orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order Date</th>
                <th>Menu Item</th>
                <th>Special Instructions</th>
                <th>Payment Method</th>
                <th>Next Reservation</th>
              </tr>
            </thead>
            <tbody>
              {customer.orders.map((order) => (
                <tr key={order.id}>
                  <td>{formatDate(order.order_date)}</td>
                  <td>{order.menu_item}</td>
                  <td>{order.special_instructions || 'None'}</td>
                  <td>{order.payment_method}</td>
                  <td>{order.next_reservation_date ? formatDate(order.next_reservation_date) : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No order history found for this customer.</p>
        )}
      </div>

      <div className="action-buttons">
        <button 
          className="add-order-btn"
          onClick={() => navigate(`/customers/${customer.id}/orders/new`)}
        >
          Add New Order
        </button>
      </div>
    </div>
  );
};

export default CustomerView;