import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDisplayPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make API request with axios
        const response = await axios.get('/users');

        setUsers(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="">
        <div className="row justify-content-center">
            <div className="col-8">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="my-3">
                        Users
                    </h1>
                    
                    <Link to="/form">
                        <button className="btn btn-primary">Add User</button>
                    </Link>
                    
                </div>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email Address</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.full_name}</td>
                                <td>{user.email_address}</td>
                                <td>{user.user_roles}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    </div>
  );
};

export default UserDisplayPage;
