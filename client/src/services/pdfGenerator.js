import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateAgreementPDF = async (agreement, borrowerPhoto, signature) => {
  // Create a temporary div to render the agreement
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="padding: 40px; font-family: 'Times New Roman', Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1e3c72; padding-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
          <div style="font-size: 48px;">💰</div>
          <div>
            <h1 style="color: #1e3c72; margin: 0; font-size: 28px;">ANNY FINANCE</h1>
            <p style="color: #666; margin: 5px 0 0;">Smart Loans, Better Future</p>
          </div>
        </div>
        <h2 style="color: #2a5298; margin-top: 15px;">Loan Agreement Contract</h2>
        <p style="color: #888;">Date: ${new Date().toLocaleDateString()}</p>
        <p style="color: #888;">Agreement ID: ${agreement.agreement_id}</p>
      </div>
      
      <!-- Borrower Information -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1e3c72; border-left: 4px solid #1e3c72; padding-left: 12px;">Borrower Information</h3>
        <div style="display: flex; gap: 30px; margin-top: 15px;">
          <div style="flex: 2;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0;"><strong>Full Name:</strong></td>
                <td style="padding: 8px 0;">${agreement.borrower_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Email Address:</strong></td>
                <td style="padding: 8px 0;">${agreement.borrower_email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Phone Number:</strong></td>
                <td style="padding: 8px 0;">${agreement.borrower_phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Address:</strong></td>
                <td style="padding: 8px 0;">${agreement.borrower_address || 'Not provided'}</td>
              </tr>
            </table>
          </div>
          <div style="flex: 1; text-align: center;">
            ${borrowerPhoto ? `<img src="${borrowerPhoto}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; border: 2px solid #1e3c72;" />` : '<div style="width: 120px; height: 120px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px solid #ddd;">No Photo</div>'}
            <p style="margin-top: 8px; font-size: 12px; color: #888;">Borrower Photo</p>
          </div>
        </div>
      </div>
      
      <!-- Loan Details -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1e3c72; border-left: 4px solid #1e3c72; padding-left: 12px;">Loan Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; background: #f8f9fa; border-radius: 8px;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 12px;"><strong>Principal Amount:</strong></td>
            <td style="padding: 12px;">€ ${agreement.principal_amount.toLocaleString()}</td>
            <td style="padding: 12px;"><strong>Currency:</strong></td>
            <td style="padding: 12px;">EUR (€)</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 12px;"><strong>Repayment Amount:</strong></td>
            <td style="padding: 12px;">€ ${agreement.repayment_amount.toLocaleString()}</td>
            <td style="padding: 12px;"><strong>Interest Rate:</strong></td>
            <td style="padding: 12px;">${agreement.interest_rate || 0}%</td>
          </tr>
          <tr>
            <td style="padding: 12px;"><strong>Loan Term:</strong></td>
            <td style="padding: 12px;">${agreement.loan_term || agreement.loan_term_months + ' months'}</td>
            <td style="padding: 12px;"><strong>Created Date:</strong></td>
            <td style="padding: 12px;">${new Date(agreement.created_at).toLocaleDateString()}</td>
          </tr>
        </table>
      </div>
      
      <!-- Terms & Conditions -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1e3c72; border-left: 4px solid #1e3c72; padding-left: 12px;">Terms & Conditions</h3>
        <div style="margin-top: 15px; line-height: 1.6;">
          <ol style="padding-left: 20px;">
            <li>The borrower agrees to repay the full amount as specified above.</li>
            <li>Monthly installments shall be paid on or before the 5th of each month.</li>
            <li>Late payments will incur additional fees as per company policy.</li>
            <li>This agreement is legally binding once signed by both parties.</li>
            <li>Any disputes shall be resolved through arbitration.</li>
            <li>The lender reserves the right to take legal action for non-payment.</li>
          </ol>
        </div>
      </div>
      
      ${agreement.notes ? `
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1e3c72; border-left: 4px solid #1e3c72; padding-left: 12px;">Additional Notes</h3>
        <div style="margin-top: 15px; padding: 15px; background: #fff9e6; border-left: 3px solid #ffc107; border-radius: 4px;">
          ${agreement.notes}
        </div>
      </div>
      ` : ''}
      
      <!-- Signatures -->
      <div style="margin-top: 40px;">
        <h3 style="color: #1e3c72; border-left: 4px solid #1e3c72; padding-left: 12px;">Signatures</h3>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <div style="text-align: center; flex: 1;">
            <div style="margin-bottom: 10px;">
              ${signature ? `<img src="${signature}" style="width: 200px; height: 80px; border: 1px solid #ddd; background: white;" />` : '<div style="width: 200px; height: 80px; border: 1px solid #ddd; background: #fafafa;"></div>'}
            </div>
            <p><strong>Borrower Signature</strong></p>
            <p style="font-size: 12px; color: #888;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="width: 200px; height: 80px; border: 1px solid #ddd; margin: 0 auto; background: #fafafa; display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center;">
                <div style="font-size: 24px;">💰</div>
                <div style="font-size: 12px;">Anny Finance</div>
              </div>
            </div>
            <p><strong>Lender Signature (Anny Finance)</strong></p>
            <p style="font-size: 12px; color: #888;">Authorized Signatory</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 11px; color: #888;">
        <p>This is a legally binding document. Please keep a copy for your records.</p>
        <p>Anny Finance - Smart Loans, Better Future</p>
      </div>
    </div>
  `;

  document.body.appendChild(element);
  
  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    backgroundColor: '#ffffff'
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 297;
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
  
  document.body.removeChild(element);
  
  return pdf;
};