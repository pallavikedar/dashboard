import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill's styles
// import { TableCell, TableRow, Table } from '@material-ui/core'; // Optional for Table Styling
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Import Quill Table module
import TableModule from 'quill-table';

Quill.register({
  'modules/table': TableModule,
});

const TextPad = () => {
  const [editorContent, setEditorContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }], // Font options
      ['bold', 'italic', 'underline', 'strike'], // Text formatting
      [{ 'color': [] }, { 'background': [] }], // Text color and background color
      [{ 'align': [] }], // Text alignment
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      ['blockquote', 'code-block'], // Blockquotes and code
      [{ 'table': 'insert-table' }, { 'table': 'delete-table' }], // Table insert
      ['clean'], // Remove formatting
    ],
    table: true, // Enable table module
  };

  const formats = [
    'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
    'align', 'list', 'bullet', 'blockquote', 'code-block', 'table',
  ];

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };
  const generatePDF = async () => {
    const editorContentDiv = document.querySelector('.ql-editor');
    const canvas = await html2canvas(editorContentDiv);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    pdf.save('document.pdf');
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Text Pad (MS Word-like)</h1>

      {/* ReactQuill editor with custom toolbar including table option */}
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing here..."
        style={{ height: '400px', marginBottom: '20px' }}
      />

      {/* Preview of editor content (optional) */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h3>Content Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
        <button onClick={generatePDF} style={{ marginTop: '20px' }}>Download as PDF</button>
      </div>
    </div>
  );
};

export default TextPad;
