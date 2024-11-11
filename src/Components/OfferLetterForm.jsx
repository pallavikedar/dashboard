import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const OfferLetter = ({ candidate,isDrawerOpen }) => {
    
  return (
    <div
    id="offerLetter"
    style={{ 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px', 
      lineHeight: '1.5', 
      boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)' ,// Adjust the values as needed
      marginLeft: isDrawerOpen ? '280px' : '0px', transition: 'margin-left 0.3s ease'
    }}
  >
      <p>Address: {candidate.address}</p>
      <p>Date: {candidate.date}</p>
      <p>Contact number: {candidate.contactNumber}</p>
      <p>Email id: {candidate.email}</p>

      <h2>OFFER LETTER</h2>
      <p>
        <strong>PERSONAL & CONFIDENTIAL</strong>
      </p>

      <p>Dear {candidate.name},</p>
      <p>
        We are pleased to inform you that you have been selected for a position in our company. 
        We are offering you the following role in <strong>ROYAALMEDE JAN DHAN MULTIURBAN NIDHI LIMITED</strong> 
        under the terms and conditions specified below:
      </p>

      <ul>
        <li><strong>Your designation/position will be:</strong> {candidate.designation}</li>
        <li><strong>Joining date:</strong> {candidate.joiningDate}</li>
        <li><strong>Compensation & Benefits:</strong> Your annual salary will be {candidate.salary}</li>
      </ul>

      <p>Please submit the following documents at the time of joining:</p>
      <ol>
        <li>Self-attested copy of PAN Card.</li>
        <li>Self-attested copy of Address Proof.</li>
        <li>Self-attested certificates in support of your educational and professional qualifications.</li>
        <li>2 copies of your recent passport-size photographs.</li>
        <li>Bank Details (Copy of Passbook/Cancelled Cheque).</li>
      </ol>

      <p>
        Your position is a whole-time employment with the Company, and you shall devote yourself 
        exclusively to the business and interests of the company. You are required to provide a 
        30-day notice prior to your resignation during your probation period. You will not take up 
        any other work for remuneration or be interested directly or indirectly in any other trade or 
        business during your employment without the written permission of the company.
      </p>

      <p>
        If any declaration given or information furnished by you proves to be false, or if you are found 
        to have willfully suppressed any material information, your offer will be deemed canceled/forfeited 
        and you will be liable for removal from services without any notice if discovered after joining. 
        This offer is subject to your being, and remaining, medically fit.
      </p>

      <p>
        We look forward to an exciting journey in the growth of the Company and a successful and rewarding association.
      </p>

      <p>Sincerely yours,</p>

      <h3>ACKNOWLEDGEMENT AND ACCEPTANCE</h3>
      <p>
        I have carefully read, considered, and understand the terms and conditions under which this position is being 
        offered to me, and I hereby signify my acceptance by signing below.
      </p>

      <p>Signature: _________________________</p>
      <p>Name: {candidate.name}</p>

      <footer style={{ marginTop: '40px' }}>
        <p><strong>ROYAALMEDE JAN DHAN MULTIURBAN NIDHI LIMITED</strong></p>
        <p>Plot No. 28, 1st Floor, Govind Prabhau Nagar, Hudkeshwar Road, Nagpur - 440034</p>
        <p>Email: royaalmede@gmail.com | Website: www.royaalmede.co.in</p>
        <p>Contact: 9028999253, 9373450092</p>
        <p>CIN: U65999MH2021PLN356405</p>
      </footer>
    </div>
  );
};

const OfferLetterForm = () => {
  const [candidate, setCandidate] = useState({
    address: '',
    date: '',
    contactNumber: '',
    email: '',
    name: '',
    designation: '',
    joiningDate: '',
    salary: ''
  });
  const [pdfBlob, setPdfBlob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [showOfferLetter, setShowOfferLetter] = useState(false);

  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCandidates([...candidates, candidate]);
    setShowOfferLetter(true);
  };

  const printOfferLetter = () => {
    const printContents = document.getElementById('offerLetter').innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
   // reload the page to restore
  };

 

  const downloadPDF = (cand) => {
    const offerLetterElement = document.getElementById('offerLetter');
    
    html2canvas(offerLetterElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the generated PDF
      pdf.save(`${cand.name}_Offer_Letter.pdf`);
    });
  };






  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Address"
          name="address"
          value={candidate.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          value={candidate.date}
          onChange={handleChange}
          type="date"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={candidate.contactNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={candidate.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Designation"
          name="designation"
          value={candidate.designation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Joining Date"
          name="joiningDate"
          value={candidate.joiningDate}
          onChange={handleChange}
          type="date"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Annual Salary"
          name="salary"
          value={candidate.salary}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit">
          Generate Offer Letter
        </Button>
      </form>

      {showOfferLetter && (
        <div>
          <OfferLetter candidate={candidate} />
          <div>
            <Button variant="contained" color="secondary" onClick={printOfferLetter}>
              Print Offer Letter
            </Button>
           
          </div>
        </div>
      )}

      <h2>Generated Offer Letters</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Annual Salary</TableCell>
              <TableCell>Date Of Joining</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((cand, index) => (
              <TableRow key={index}>
                <TableCell>{cand.name}</TableCell>
                <TableCell>{cand.email}</TableCell>
                <TableCell>{cand.address}</TableCell>
                <TableCell>{cand.designation}</TableCell>
                <TableCell>{cand.contactNumber}</TableCell>
                <TableCell>{cand.salary}</TableCell>
                <TableCell>{cand.joiningDate}</TableCell>
              
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => downloadPDF(cand)}>
                    Generate PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OfferLetterForm;
