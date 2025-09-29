import React, { useState, useEffect, useContext } from 'react';
import adminService from '../../services/adminService';
import AuthContext from '../../context/AuthContext';
import { 
    Typography, 
    Box, 
    CircularProgress, 
    Alert, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Select,
    MenuItem
} from '@mui/material';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: adminUser, token } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await adminService.getAllUsers(token);
      setUsers(response.data);
    } catch (err) {
      setError('ব্যবহারকারীদের লোড করা সম্ভব হয়নি।');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await adminService.updateUserRole(id, newRole, token);
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
    } catch (err) {
      setError('ভূমিকা আপডেট করা সম্ভব হয়নি।');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>ব্যবহারকারী ম্যানেজমেন্ট</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ইউজারনেম</TableCell>
              <TableCell>ইমেইল</TableCell>
              <TableCell>ভূমিকা</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    // Prevent admin from changing their own role to user
                    disabled={user._id === adminUser.id}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageUsers;