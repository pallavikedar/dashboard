import React, { useState } from 'react';
import './Lead.css'; // Assuming a CSS file for custom styles
import { FaForward } from 'react-icons/fa';



const LeadDashboard = ({ isDrawerOpen }) => {
  const [leads, setLeads] = useState({
    newLeads: [],
    followUps: [],
    underReview: [],
    demo: [],
    negotiation: [],
    won: []
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    companyName: ""
  });

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [forwardStatus, setForwardStatus] = useState("");
  const [selectedLead, setSelectedLead] = useState(null); // State for the selected lead for modal
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      ...formData,
      id: Date.now(),
    };
    setLeads((prevLeads) => ({
      ...prevLeads,
      newLeads: [...prevLeads.newLeads, newLead],
    }));
    setFormData({ firstName: "", lastName: "", jobTitle: "", email: "", phone: "", companyName: "" });
    setShowLeadForm(false); // Close the form after submission
  };

  // Moving a lead to the next section
  const moveLeadToSection = (lead, currentSection, targetSection) => {
    setLeads((prevLeads) => {
      const updatedLeads = { ...prevLeads };
      updatedLeads[currentSection] = updatedLeads[currentSection].filter((item) => item.id !== lead.id);
      updatedLeads[targetSection] = [...updatedLeads[targetSection], lead];
      return updatedLeads;
    });
    setForwardStatus(""); // Reset forward status
  };

  // Function to open the modal with lead details
  const openModal = (lead) => {
    setSelectedLead(lead);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedLead(null);
    setModalVisible(false);
  };

  return (
    <div className="lead-dashboard" style={{ marginLeft: isDrawerOpen ? '280px' : '0px', transition: 'margin-left 0.3s ease' }}>
      <h1>Lead Management Dashboard</h1>

      {/* New Lead Button */}
      <div className="lead-actions">
        <button onClick={() => setShowLeadForm(true)} className="new-lead-btn">
          + Add New Lead
        </button>
      </div>

      {/* Lead Form (shows when New Lead button is clicked) */}
      {showLeadForm && (
        <div className="lead-form-container">
          <h2>Add New Lead</h2>
          <form onSubmit={handleFormSubmit} className="lead-form">
            <input 
              type="text" 
              placeholder="First Name" 
              value={formData.firstName} 
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={formData.lastName} 
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Job Title" 
              value={formData.jobTitle} 
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Phone" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Company Name" 
              value={formData.companyName} 
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} 
              required 
            />
            <button type="submit" className="submit-btn">Submit Lead</button>
          </form>
        </div>
      )}

      {/* Lead Sections in Rows */}
      <div className="lead-sections">
        {/* New Leads */}
        <div className="lead-section">
          <h2>New Leads</h2>
          {leads.newLeads.length > 0 ? leads.newLeads.map((lead) => (
            <div key={lead.id} className="lead-item" >
              <p onClick={() => openModal(lead)}>{lead.firstName} {lead.lastName} ({lead.companyName})</p>
              <button onClick={() => setForwardStatus(lead.id)} className="forward-btn">
                <FaForward />
              </button>
              {forwardStatus === lead.id && (
                <select onChange={(e) => moveLeadToSection(lead, 'newLeads', e.target.value)}>
                  <option value="">Select Stage</option>
                  <option value="followUps">Follow-up</option>
                  <option value="underReview">Under Review</option>
                  <option value="demo">Demo</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="won">Won</option>
                </select>
              )}
            </div>
          )) : ""}
        </div>

        {/* Follow-ups */}
        <div className="lead-section">
          <h2>Follow-ups</h2>
          {leads.followUps.length > 0 ? leads.followUps.map((lead) => (
            <div key={lead.id} className="lead-item">
              <p onClick={() => openModal(lead)}>{lead.firstName} {lead.lastName} ({lead.companyName})</p>
              <button onClick={() => setForwardStatus(lead.id)} className="forward-btn">
                <FaForward />
              </button>
              {forwardStatus === lead.id && (
                <select onChange={(e) => moveLeadToSection(lead, 'followUps', e.target.value)}>
                  <option value="">Select Stage</option>
                  <option value="underReview">Under Review</option>
                  <option value="demo">Demo</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="won">Won</option>
                </select>
              )}
            </div>
          )) :""}
        </div>

        {/* Under Review */}
        <div className="lead-section">
          <h2>Under Review</h2>
          {leads.underReview.length > 0 ? leads.underReview.map((lead) => (
            <div key={lead.id} className="lead-item" >
              <p onClick={() => openModal(lead)}>{lead.firstName} {lead.lastName} ({lead.companyName})</p>
              <button onClick={() => setForwardStatus(lead.id)} className="forward-btn">
                <FaForward />
              </button>
              {forwardStatus === lead.id && (
                <select onChange={(e) => moveLeadToSection(lead, 'underReview', e.target.value)}>
                  <option value="">Select Stage</option>
                  <option value="demo">Demo</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="won">Won</option>
                </select>
              )}
            </div>
          )) : ""}
        </div>

        {/* Demo */}
        <div className="lead-section">
          <h2>Demo</h2>
          {leads.demo.length > 0 ? leads.demo.map((lead) => (
            <div key={lead.id} className="lead-item" >
              <p onClick={() => openModal(lead)}>{lead.firstName} {lead.lastName} ({lead.companyName})</p>
              <button onClick={() => setForwardStatus(lead.id)} className="forward-btn">
                <FaForward />
              </button>
              {forwardStatus === lead.id && (
                <select onChange={(e) => moveLeadToSection(lead, 'demo', e.target.value)}>
                  <option value="">Select Stage</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="won">Won</option>
                </select>
              )}
            </div>
          )) : ""}
        </div>

        {/* Negotiation */}
        <div className="lead-section">
          <h2>Negotiation</h2>
          {leads.negotiation.length > 0 ? leads.negotiation.map((lead) => (
            <div key={lead.id} className="lead-item">
              <p onClick={() => openModal(lead)}>{lead.firstName} {lead.lastName} ({lead.companyName})</p>
              <button onClick={() => setForwardStatus(lead.id)} className="forward-btn">
                <FaForward />
              </button>
              {forwardStatus === lead.id && (
                <select onChange={(e) => moveLeadToSection(lead, 'negotiation', e.target.value)}>
                  <option value="">Select Stage</option>
                  <option value="won">Won</option>
                </select>
              )}
            </div>
          )) : ""}
        </div>

        {/* Won */}
        <div className="lead-section">
          <h2>Won</h2>
          {leads.won.length > 0 ? leads.won.map((lead) => (
            <div key={lead.id} className="lead-item">
              <p onClick={() => openModal(lead)}>{lead.firstName} {lead.lastName} ({lead.companyName})</p>
            </div>
          )) : ""}
        </div>
      </div>

      {/* Modal for Lead Details */}
      {modalVisible && selectedLead && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Lead Details</h2>
            <p><strong>First Name:</strong> {selectedLead.firstName}</p>
            <p><strong>Last Name:</strong> {selectedLead.lastName}</p>
            <p><strong>Job Title:</strong> {selectedLead.jobTitle}</p>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>Phone:</strong> {selectedLead.phone}</p>
            <p><strong>Company Name:</strong> {selectedLead.companyName}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDashboard;
