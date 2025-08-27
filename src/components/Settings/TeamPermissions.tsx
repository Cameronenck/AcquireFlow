import React, { useState } from 'react';
import { Users, User, UserPlus, Mail, Shield, AlertTriangle, Eye, EyeOff, Clock, BarChart2, CheckCircle, Search, Filter, ChevronDown, MoreHorizontal, X } from 'lucide-react';
export const TeamPermissions = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const teamMembers = [{
    id: 1,
    name: 'John Doe',
    email: 'john.doe@acquireflow.ai',
    role: 'Owner',
    status: 'active',
    lastActive: 'Now',
    avatar: null
  }, {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@acquireflow.ai',
    role: 'Admin',
    status: 'active',
    lastActive: '10 minutes ago',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }, {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@acquireflow.ai',
    role: 'Deal Manager',
    status: 'active',
    lastActive: '1 hour ago',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }, {
    id: 4,
    name: 'Jessica Williams',
    email: 'jessica.williams@acquireflow.ai',
    role: 'Marketing Specialist',
    status: 'active',
    lastActive: '3 hours ago',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
  }, {
    id: 5,
    name: 'Robert Taylor',
    email: 'robert.taylor@acquireflow.ai',
    role: 'Analyst',
    status: 'inactive',
    lastActive: '2 days ago',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
  }, {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@acquireflow.ai',
    role: 'Viewer',
    status: 'pending',
    lastActive: 'Never',
    avatar: null
  }];
  const roles = [{
    id: 'owner',
    name: 'Owner',
    description: 'Full access to all settings and billing',
    permissions: ['all'],
    editable: false
  }, {
    id: 'admin',
    name: 'Admin',
    description: 'Full access to all features except billing',
    permissions: ['manage_users', 'manage_deals', 'manage_contacts', 'manage_campaigns', 'view_reports', 'edit_settings'],
    editable: false
  }, {
    id: 'deal_manager',
    name: 'Deal Manager',
    description: 'Manage deals and contacts',
    permissions: ['manage_deals', 'manage_contacts', 'view_reports'],
    editable: true
  }, {
    id: 'marketing_specialist',
    name: 'Marketing Specialist',
    description: 'Manage marketing campaigns',
    permissions: ['manage_campaigns', 'view_contacts', 'view_reports'],
    editable: true
  }, {
    id: 'analyst',
    name: 'Analyst',
    description: 'View and analyze data',
    permissions: ['view_deals', 'view_contacts', 'view_campaigns', 'view_reports'],
    editable: true
  }, {
    id: 'viewer',
    name: 'Viewer',
    description: 'View-only access',
    permissions: ['view_deals', 'view_contacts', 'view_campaigns'],
    editable: true
  }];
  const permissionGroups = [{
    id: 'deals',
    name: 'Deals & Properties',
    permissions: [{
      id: 'view_deals',
      name: 'View Deals'
    }, {
      id: 'manage_deals',
      name: 'Manage Deals'
    }, {
      id: 'delete_deals',
      name: 'Delete Deals'
    }, {
      id: 'view_financial_data',
      name: 'View Financial Data'
    }, {
      id: 'edit_financial_data',
      name: 'Edit Financial Data'
    }]
  }, {
    id: 'contacts',
    name: 'Contacts & Communications',
    permissions: [{
      id: 'view_contacts',
      name: 'View Contacts'
    }, {
      id: 'manage_contacts',
      name: 'Manage Contacts'
    }, {
      id: 'delete_contacts',
      name: 'Delete Contacts'
    }, {
      id: 'send_communications',
      name: 'Send Communications'
    }, {
      id: 'view_communications',
      name: 'View Communication History'
    }]
  }, {
    id: 'campaigns',
    name: 'Marketing & Campaigns',
    permissions: [{
      id: 'view_campaigns',
      name: 'View Campaigns'
    }, {
      id: 'manage_campaigns',
      name: 'Manage Campaigns'
    }, {
      id: 'delete_campaigns',
      name: 'Delete Campaigns'
    }, {
      id: 'view_analytics',
      name: 'View Campaign Analytics'
    }, {
      id: 'manage_budget',
      name: 'Manage Campaign Budget'
    }]
  }, {
    id: 'reports',
    name: 'Reports & Analytics',
    permissions: [{
      id: 'view_reports',
      name: 'View Reports'
    }, {
      id: 'create_reports',
      name: 'Create Custom Reports'
    }, {
      id: 'export_data',
      name: 'Export Data'
    }, {
      id: 'view_dashboards',
      name: 'View Dashboards'
    }, {
      id: 'create_dashboards',
      name: 'Create Custom Dashboards'
    }]
  }, {
    id: 'settings',
    name: 'Settings & Administration',
    permissions: [{
      id: 'view_settings',
      name: 'View Settings'
    }, {
      id: 'edit_settings',
      name: 'Edit Settings'
    }, {
      id: 'manage_users',
      name: 'Manage Users'
    }, {
      id: 'manage_roles',
      name: 'Manage Roles'
    }, {
      id: 'manage_billing',
      name: 'Manage Billing & Subscription'
    }]
  }];
  const getStatusBadge = status => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Active
          </span>;
      case 'inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock size={12} className="mr-1" />
            Inactive
          </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Mail size={12} className="mr-1" />
            Pending Invitation
          </span>;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg">Team Members</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage users and their access to AcquireFlow
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center" onClick={() => setShowInviteModal(true)}>
            <UserPlus size={16} className="mr-2" />
            Invite User
          </button>
        </div>
        <div className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <div className="relative w-full md:w-auto">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search team members..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64" />
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm flex items-center">
                <Filter size={14} className="mr-1.5" />
                Filter
                <ChevronDown size={14} className="ml-1.5" />
              </button>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Roles</option>
                {roles.map(role => <option key={role.id} value={role.id}>
                    {role.name}
                  </option>)}
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map(member => <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {member.avatar ? <img src={member.avatar} alt={member.name} className="h-10 w-10 object-cover" /> : <User size={20} className="text-gray-500" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-primary-dark mr-3">
                        Edit
                      </button>
                      {member.role !== 'Owner' && <button className="text-red-600 hover:text-red-900">
                          Remove
                        </button>}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">6</span> of{' '}
              <span className="font-medium">6</span> team members
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Roles & Permissions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="font-medium text-lg">Roles & Permissions</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage access controls and permission levels
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center" onClick={() => setShowRoleModal(true)}>
            <Shield size={16} className="mr-2" />
            Create Role
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map(role => <div key={role.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">{role.name}</h3>
                  <div className="flex items-center">
                    {!role.editable && <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full mr-2">
                        Default
                      </span>}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    {role.description}
                  </p>
                  <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">
                    Key Permissions
                  </h4>
                  <ul className="space-y-1 mb-4">
                    {role.permissions.includes('all') ? <li className="text-sm flex items-center">
                        <CheckCircle size={14} className="text-green-500 mr-2" />
                        Full Access (All Permissions)
                      </li> : role.permissions.slice(0, 3).map(permission => <li key={permission} className="text-sm flex items-center">
                          <CheckCircle size={14} className="text-green-500 mr-2" />
                          {permission.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </li>)}
                    {role.permissions.length > 3 && role.permissions[0] !== 'all' && <li className="text-sm text-gray-500">
                          + {role.permissions.length - 3} more permissions
                        </li>}
                  </ul>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700">
                      View Details
                    </button>
                    {role.editable && <button className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700">
                        Edit Role
                      </button>}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      {/* Activity Monitoring */}
      
      {/* Collaboration Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">Collaboration Settings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Configure how your team works together
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Deal Collaboration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                    <span className="ml-2 text-sm">
                      <span className="font-medium block">
                        Allow Multiple Assignees
                      </span>
                      <span className="text-gray-500">
                        Enable multiple team members to be assigned to a deal
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                    <span className="ml-2 text-sm">
                      <span className="font-medium block">Deal Comments</span>
                      <span className="text-gray-500">
                        Allow team members to comment on deals
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                    <span className="ml-2 text-sm">
                      <span className="font-medium block">
                        Activity Notifications
                      </span>
                      <span className="text-gray-500">
                        Notify team members of updates to their assigned deals
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Deal Visibility
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>All team members can view all deals</option>
                    <option>
                      Team members can only view their assigned deals
                    </option>
                    <option>
                      Team members can view deals based on their role
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Contact Collaboration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                    <span className="ml-2 text-sm">
                      <span className="font-medium block">Contact Sharing</span>
                      <span className="text-gray-500">
                        Allow contacts to be shared across team members
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                    <span className="ml-2 text-sm">
                      <span className="font-medium block">
                        Communication Visibility
                      </span>
                      <span className="text-gray-500">
                        Allow team members to view all communications with
                        contacts
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" />
                    <span className="ml-2 text-sm">
                      <span className="font-medium block">
                        Contact Ownership Transfer
                      </span>
                      <span className="text-gray-500">
                        Allow team members to transfer contact ownership
                      </span>
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Contact Visibility
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>All team members can view all contacts</option>
                    <option>
                      Team members can only view their assigned contacts
                    </option>
                    <option>
                      Team members can view contacts based on their role
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              File Sharing & Access
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Access Control
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>All team members can access all documents</option>
                  <option>
                    Team members can only access documents related to their
                    deals
                  </option>
                  <option>Document access is based on role permissions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External Document Sharing
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>
                    All team members can share documents externally
                  </option>
                  <option>
                    Only Admins and Owners can share documents externally
                  </option>
                  <option>External document sharing is disabled</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-start">
                <input type="checkbox" className="mt-1 rounded text-primary focus:ring-primary" defaultChecked />
                <span className="ml-2 text-sm">
                  <span className="font-medium block">
                    Document Version History
                  </span>
                  <span className="text-gray-500">
                    Track changes to documents and maintain version history
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-sm text-yellow-800">
                Collaboration Security Notice
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Changing collaboration settings may affect how your team
                accesses and shares information. Make sure to review your
                security settings after making changes to ensure data remains
                protected.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Invite User Modal */}
      {showInviteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-dark">
                Invite Team Member
              </h2>
              <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setShowInviteModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="colleague@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="First name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Last name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    {roles.map(role => <option key={role.id} value={role.id}>
                        {role.name}
                      </option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Personal Message (Optional)
                  </label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows={3} placeholder="Add a personal message to the invitation email..."></textarea>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={() => setShowInviteModal(false)}>
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Create Role Modal */}
      {showRoleModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold text-dark">
                Create Custom Role
              </h2>
              <button className="p-1 rounded-full hover:bg-gray-100" onClick={() => setShowRoleModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Name
                  </label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Property Manager" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Description
                  </label>
                  <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows={2} placeholder="Describe the purpose and responsibilities of this role..."></textarea>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Permissions
                  </h3>
                  {permissionGroups.map(group => <div key={group.id} className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-600">
                          {group.name}
                        </h4>
                        <div className="flex items-center">
                          <button className="text-xs text-primary hover:underline mr-3">
                            Select All
                          </button>
                          <button className="text-xs text-gray-500 hover:underline">
                            Clear All
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {group.permissions.map(permission => <label key={permission.id} className="flex items-center">
                              <input type="checkbox" className="rounded text-primary focus:ring-primary mr-2" />
                              <span className="text-sm">{permission.name}</span>
                            </label>)}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg" onClick={() => setShowRoleModal(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary text-white font-medium rounded-lg" onClick={() => setShowRoleModal(false)}>
                Create Role
              </button>
            </div>
          </div>
        </div>}
    </div>;
};