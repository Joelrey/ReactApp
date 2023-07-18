import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting
import { toast } from 'react-toastify';

const FormPage = () => {
  const [email_address, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState('');
  const [full_name, setFullName] = useState('');

  const navigate = useNavigate(); // For redirecting

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/roles'); // Replace with your API endpoint URL
        setRoles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API request with axios
      const response = await axios.post('/users', {
        email_address,
        role,
        full_name,
      });

    //   console.log('API response:', response.data);
      toast.success(response.data.message, { className: 'toast-success' });
      navigate('/');
    } catch (error) {
    //   console.error('Error:', error);
      let errors = error.response.data.errors
      errors.forEach((error) => {
        toast.error(error, { className: 'toast-error' });
      });
    }
  };

  if (loading) {
    return <div>Loading roles...</div>;
  }

  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-6">
                <h3 className="mt-5 mb-3">Form Page</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input required type="text" className="form-control mb-2" value={full_name} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input required type="email" className="form-control mb-2" value={email_address} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Roles:</label>
                        <select required className="form-control mb-2" onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default FormPage;
