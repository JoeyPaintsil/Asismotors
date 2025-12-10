import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getSubmissions, updateSubmissionStatus, initializeDemoData, deleteSubmission } from '../../services/submissionService';
import SubmissionDetailModal from './SubmissionDetailModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './AdminDashboard.scss';

const STATUS_OPTIONS = [
  'Not Started',
  'Email Sent',
  'Deal Ongoing',
  'Deal Finalized',
  'Deal Completed'
];

const COLORS = {
  'Not Started': '#9ca3af',
  'Email Sent': '#3b82f6',
  'Deal Ongoing': '#f59e0b',
  'Deal Finalized': '#8b5cf6',
  'Deal Completed': '#10b981'
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    loadSubmissions();
  }, [navigate]);

  const loadSubmissions = () => {
    try {
      // Initialize demo data if no submissions exist
      initializeDemoData();
      const data = getSubmissions();
      setSubmissions(data);
      setFilteredSubmissions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading submissions:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(submissions.filter(s => s.status === statusFilter));
    }
    // Clear selections when filter changes
    setSelectedIds([]);
  }, [statusFilter, submissions]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateSubmissionStatus(id, newStatus);
      loadSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredSubmissions.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDeleteClick = () => {
    if (selectedIds.length > 0) {
      setShowDeleteConfirm(true);
    }
  };

  const handleDeleteConfirm = () => {
    try {
      selectedIds.forEach(id => {
        try {
          deleteSubmission(id);
        } catch (err) {
          console.error(`Error deleting submission ${id}:`, err);
        }
      });
      setSelectedIds([]);
      setShowDeleteConfirm(false);
      loadSubmissions();
    } catch (error) {
      console.error('Error deleting submissions:', error);
      alert('Failed to delete submissions');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const isAllSelected = filteredSubmissions.length > 0 && selectedIds.length === filteredSubmissions.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < filteredSubmissions.length;

  // Calculate status distribution for pie chart
  const statusDistribution = STATUS_OPTIONS.map(status => ({
    name: status,
    value: submissions.filter(s => s.status === status).length
  })).filter(item => item.value > 0);

  // Calculate statistics
  const totalSubmissions = submissions.length;
  const completedDeals = submissions.filter(s => s.status === 'Deal Completed').length;
  const ongoingDeals = submissions.filter(s => s.status === 'Deal Ongoing').length;

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard__loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="admin-dashboard__logout">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-dashboard__main">
        <div className="container">
          {/* Statistics Cards */}
          <div className="admin-dashboard__stats">
            <div className="admin-dashboard__stat-card">
              <h3>Total Submissions</h3>
              <p className="admin-dashboard__stat-number">{totalSubmissions}</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h3>Completed Deals</h3>
              <p className="admin-dashboard__stat-number">{completedDeals}</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h3>Ongoing Deals</h3>
              <p className="admin-dashboard__stat-number">{ongoingDeals}</p>
            </div>
            <div className="admin-dashboard__stat-card">
              <h3>Completion Rate</h3>
              <p className="admin-dashboard__stat-number">
                {totalSubmissions > 0 
                  ? Math.round((completedDeals / totalSubmissions) * 100) 
                  : 0}%
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="admin-dashboard__filter">
            <div className="admin-dashboard__filter-left">
              <label htmlFor="status-filter">Filter by Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-dashboard__filter-select"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            {selectedIds.length > 0 && (
              <button 
                onClick={handleDeleteClick}
                className="admin-dashboard__delete-button"
              >
                Delete ({selectedIds.length})
              </button>
            )}
          </div>

          {/* Submissions Table */}
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={handleSelectAll}
                      className="admin-dashboard__checkbox"
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Zipcode</th>
                  <th>Instant Quote</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="admin-dashboard__no-data">
                      No submissions found
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr 
                      key={submission.id}
                      className="admin-dashboard__table-row"
                      onClick={(e) => {
                        // Don't open modal if clicking on checkbox, status column, or its dropdown
                        const target = e.target;
                        const isCheckbox = target.type === 'checkbox' || target.closest('input[type="checkbox"]');
                        const isStatusColumn = target.closest('td:nth-child(7)') || 
                                             target.closest('.admin-dashboard__status-select') ||
                                             target.tagName === 'SELECT' ||
                                             target.tagName === 'OPTION';
                        if (!isCheckbox && !isStatusColumn) {
                          setSelectedSubmission(submission);
                        }
                      }}
                    >
                      <td 
                        onClick={(e) => e.stopPropagation()}
                        className="admin-dashboard__checkbox-cell"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(submission.id)}
                          onChange={() => handleSelectOne(submission.id)}
                          className="admin-dashboard__checkbox"
                        />
                      </td>
                      <td>{submission.name || 'N/A'}</td>
                      <td>
                        <a 
                          href={`mailto:${submission.email}`}
                          className="admin-dashboard__email-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {submission.email || 'N/A'}
                        </a>
                      </td>
                      <td>{submission.phone || 'N/A'}</td>
                      <td>{submission.zipcode || 'N/A'}</td>
                      <td className="admin-dashboard__quote-cell">
                        {submission.quote?.amount 
                          ? new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(submission.quote.amount)
                          : 'N/A'}
                      </td>
                      <td 
                        className="admin-dashboard__status-cell"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={submission.status || 'Not Started'}
                          onChange={(e) => {
                            handleStatusChange(submission.id, e.target.value);
                          }}
                          className="admin-dashboard__status-select"
                          style={{
                            backgroundColor: COLORS[submission.status] || COLORS['Not Started'],
                            color: 'white',
                            border: 'none'
                          }}
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {submission.createdAt 
                          ? new Date(submission.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pie Chart */}
          {statusDistribution.length > 0 && (
            <div className="admin-dashboard__chart">
              <h2>Status Distribution</h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#9ca3af'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>

      {selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmationModal
          count={selectedIds.length}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

