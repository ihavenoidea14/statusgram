'use strict';

var express = require('express');
var router = express.Router();
var PDFDocument = require('pdfkit');
var fs = require('fs');
var formatter = require('../services/currencyformat.js');

router.post('/', function(req, res) {

  var doc = new PDFDocument();

  var stream = doc.pipe(fs.createWriteStream('./output/StatusGram.pdf'));

  /*
  * StatusGram Watermark
  */

  doc.image('./img/statusgramrefi.png', 0, 0, { scale: 0.721 });


  /*
  * Loan Status Ribbon
  *
  * Closed: http://www.atlanticbay.com/wp-content/uploads/statusgram/Closed-LSM.jpg
  * Docs Sent: http://www.atlanticbay.com/wp-content/uploads/statusgram/Documents_Sent-LSM.jpg
  * CTC: http://www.atlanticbay.com/wp-content/uploads/statusgram/Clear_To_Close-LSM.jpg
  * Cond. Approved: http://www.atlanticbay.com/wp-content/uploads/statusgram/Conditionally_Approved-LSM.jpg
  * In Underwriting: http://www.atlanticbay.com/wp-content/uploads/statusgram/Submitted_To_Underwriting-LSM.jpg
  * App. Taken: http://www.atlanticbay.com/wp-content/uploads/statusgram/Application_Taken-LSM.jpg
  * 
  */

  var status = {
    14: './img/closed.jpg',
    15: './img/closed.jpg',
    16: './img/closed.jpg',
    60: './img/closed.jpg',
    61: './img/closed.jpg',
    51: './img/closed.jpg',
    17: './img/docs-sent.jpg',
    54: './img/ctc.jpg',
    5: './img/cond-approved.jpg',
    3: './img/in-underwriting.jpg'
  };

  var image = status[req.body.loanstatus] || './img/app-taken.jpg';

  doc.image(image, 16, 88, { scale: 0.24066 });


  /*
  * Loan Number
  *
  * Fields: FileData.FileName
  *
  */

  doc.fontSize(7).fillColor('#004990')
    .text(req.body.loanNumber, 557, 45, { lineBreak: false });


  /*
  * Salutaiton Section
  *
  * Fields: Bor1.NickNameOrFirstName, Bor2.NickNameOrFirstName, ExtendedFields.Status_Gram_Mortgage_Type, SubProp.FullAddress
  *
  */

  doc.fontSize(12).fillColor('#004990')
    .text(`Hi ${req.body.name}, it's our pleasure to finance your purchase with ${req.body.morttype}.`, 43, 142);


  /*
  * Checkboxes
  *
  * http://www.atlanticbay.com/wp-content/uploads/statusgram/checkbox-filled-LSM.jpg
  *
  */

  // Col 1
  if (req.body.appraisalcleared !== 'undefined') {
    doc.image('./img/checkbox.jpg', 25, 307, { scale: 0.33 });
  }
  
  if (req.body.appraisalrecd !== 'undefined') {
    doc.image('./img/checkbox.jpg', 25, 283, { scale: 0.33 });
  }
  
  if (req.body.appraisalordered !== 'undefined') {
    doc.image('./img/checkbox.jpg', 25, 260, { scale: 0.33 });
  }


  // Col 2
  if (req.body.hazcleared !== 'undefined') {
    doc.image('./img/checkbox.jpg', 222, 307, { scale: 0.33 });
  }
  
  if (req.body.hazrecd !== 'undefined') {
    doc.image('./img/checkbox.jpg', 222, 283, { scale: 0.33 });
  }
  
  if (req.body.hazordered !== 'undefined') {
    doc.image('./img/checkbox.jpg', 222, 260, { scale: 0.33 });
  }


  // Col 3
  if (req.body.titlecleared !== 'undefined') {
    doc.image('./img/checkbox.jpg', 420, 307, { scale: 0.33 });
  }
  
  if (req.body.titlerecd !== 'undefined') {
    doc.image('./img/checkbox.jpg', 420, 283, { scale: 0.33 });
  }
  
  if (req.body.titleordered !== 'undefined') {
    doc.image('./img/checkbox.jpg', 420, 260, { scale: 0.33 });
  }


  /*
  * Appraisal Notes
  *
  * Scenario 1: Not null --> Status.AppraisalOrdered, Status.AppraisalReceived, ExtendedFields.AppraisalCleared
  *   Text: Status: Great News! The appraisal is complete and has been validated. The appraised value is { appraised value }
  *
  * Scenario 2: Not null --> Status.AppraisalOrdered, Status.AppraisalReceived
  *   Text: Status: For your protection and ours, the u/w is now (or will be shortly) reviewing this report for accuracy and to validate the appraiser's opinion of value.
  *
  * Scenario 3: Not null --> Status.AppraisalOrdered
  *   Text: Status: The appraiser will be contacting the agent or seller to schedule the onsite review of this property.
  *
  * Scenario 4: null --> Status.AppraisalOrdered
  *   Text: Status: We will assign the appraiser to schedule the onsite review of this property as soon as you are ready to move forward.
  *
  * Other fields: Appraiser.Company
  * 
  */

  var appraisalText;

  if (req.body.appraisalcleared !== 'undefined') {
    appraisalText = `Great News! The appraisal is complete and has been validated. The appraised value is ${formatter.format(req.body.appraisedvalue)}`;
  } else if (req.body.appraisalrecd !== 'undefined') {
    appraisalText = `For your protection and ours, the u/w is now (or will be shortly) reviewing this report for accuracy and to validate the appraiser's opinion of value.`;
  } else if (req.body.appraisalordered !== 'undefined') {
    appraisalText = `The appraiser will be contacting the agent or seller to schedule the onsite review of this property.`;
  } else {
    appraisalText = `We will assign the appraiser to schedule the onsite review of this property as soon as you are ready to move forward.`;
  }

  doc.fontSize(8).fillColor('#004990')
    .text(appraisalText, 25, 215, { width: 174, align: 'left' });
  doc.text(req.body.appraiser, 23, 340, { width: 170, align: 'center' });


  /*
  * HOI Notes
  * 
  * Scenario 1: Not null --> Status.HazardOrdered, Status.HazardReceived, ExtendedFields.HazardCleared
  *   Text: Status: Great News! You're covered.
  *
  * Scenario 2: Not null --> Status.HazardOrdered, Status.HazardReceived
  *   Text: Status: To protect your investment and ours, we are making sure your coverage is sufficient.
  *
  * Scenario 3: Not null --> Status.HazardOrdered
  *   Text: Status: Thank you for providing your choice. We are working with your agent now.
  *
  * Scenario 4: null --> Status.HazardOrdered
  *   Text: Status: TIME SENSITIVE - It's your choice! Don't know? We can help.
  *
  * Other fields: HazCo.Company, HazCo.FirstAndLastName, HazCo.WorkPhoneFormatted, HazCo.EMail, 
  *
  */

  var hazText;

  if (req.body.hazcleared !== 'undefined') {
    hazText = `Great News! You're covered.`;
  } else if (req.body.hazrecd !== 'undefined') {
    hazText = `To protect your investment and ours, we are making sure your coverage is sufficient.`;
  } else if (req.body.hazordered) {
    hazText = `Thank you for providing your choice. We are working with your agent now.`;
  } else {
    hazText = `TIME SENSITIVE - It's your choice! Don't know? We can help.`;
  }


  doc.fontSize(8).fillColor('#004990')
    .text(hazText, 222, 215, { width: 174, align: 'left' });
  doc.text(req.body.hazco, 222, 340, { width: 170, align: 'center' });
  doc.text(req.body.hazconame, 265, 377);
  doc.text(req.body.hazcophone, 265, 387);
  doc.text(req.body.hazcoemail, 265, 397);


  /*
  * Title Notes
  * 
  * Scenario 1: Not null --> Status.TitleOrdered, Status.TitleReceived, ExtendedFields.TitleClearedDate1
  *   Text: Status: Great News! Your closing company and settlement docs are approved.
  *
  * Scenario 2: Not null --> Status.TitleOrdered, Status.TitleReceived
  *   Text: Status: We are currently dotting the I's and crossing the T's for your ownership docs.
  *
  * Scenario 3: Not null --> Status.TitleOrdered
  *   Text: Status: Thank you for making your choice. We are working with your closing company now.
  *
  * Scenario 4: null --> Status.TitleOrdered
  *   Text: Status: It's your choice! Not sure? We have excellent options.
  *
  * Other fields: SettlementCo.Company, SettlementCo.FirstAndLastName, SettlementCo.WorkPhoneFormatted, SettlementCo.EMail
  *
  */

  var titleText;

  if (req.body.titlecleared !== 'undefined') {
    titleText = `Great News! Your closing company and settlement docs are approved.`;
  } else if (req.body.titlerecd) {
    titleText = `We are currently dotting the I's and crossing the T's for your ownership docs.`;
  } else if (req.body.titleordered !== 'undefined') {
    titleText = `Thank you for making your choice. We are working with your closing company now.`;
  } else {
    titleText = `It's your choice! Not sure? We have excellent options.`;
  }

  doc.fontSize(8).fillColor('#004990')
    .text(titleText, 418, 215, { width: 174, align: 'left' });
  doc.text(req.body.titleco, 418, 340, { width: 170, align: 'center' });
  doc.text(req.body.titleconame, 460, 377, { lineBreak: false });
  doc.text(req.body.titlecophone, 460, 387, { lineBreak: false });
  doc.text(req.body.titlecoemail, 460, 397, { lineBreak: false });


  /*
  * LO Notes
  *
  * Field: ExtendedFields.Notes_to_Client_on_Statusgram
  *
  */

  doc.fontSize(8).fillColor('#004990')
    .text(req.body.lonotes, 25, 448, { width: 370, align: 'left'});


  /*
  * Property Notes
  *
  * Fields: SubProp.FullAddress, SubProp.Street, SubProp.CityStateZip, Loan.PurPrice, Purchase.ContractDate, Loan.IntRate, Loan.LockExpirationDate
  *
  */

  doc.fontSize(8).fillColor('#004990');

  if (req.body.propprice !== 'undefined') {
    doc.text(formatter.format(req.body.propprice), 420, 590);
  }
    
  if (req.body.propclosing !== 'undefined') {
    doc.text(new Date(req.body.propclosing).toLocaleDateString(), 500, 590, { lineBreak: false });
  }
    
  if (req.body.propintrate !== 'undefined') {
    doc.text(`${req.body.propintrate} %`, 420, 623);
  }

  if (req.body.proplockexp !== 'undefined') {
    doc.text(new Date(req.body.proplockexp).toLocaleDateString(), 500, 623, { lineBreak: false });
  }


  /*
  * LO Info
  *
  * Fields: LO.FirstName, LO.LastName, LO.ContactNMLSID, LO.WorkPhoneFormatted, LO.EMail, LO.MobilePhoneFormatted, ExtendedFields.Employee_NMLS_Name
  *
  */

  doc.fontSize(8).fillColor('#004990')
    .text(req.body.loname, 72, 595);
  doc.text(`NMLS: ${req.body.lonmls}`, 72, 605);
  doc.text(req.body.lophone, 72, 615);
  doc.text(req.body.loemail, 72, 625);


  /*
  * Right Hand Person
  *
  * Fields: LP.FirstName, LP.LastName, LP.EMail, LP.WorkPhoneFormatted, ExtendedFields.Status_Gram_RH_FullName, ExtendedFields.Status_Gram_RH_Phone,
  *         ExtendedFields.Status_Gram_RH_Email, ExtendedFields.Status_Gram_RH_NMLS
  *
  */

  doc.fontSize(8).fillColor('#004990')
    .text(req.body.rhpname, 265, 595);
  doc.text(`NMLS: ${req.body.rhpnmls}`, 265, 605);
  doc.text(req.body.rhpphone, 265, 615);
  doc.text(req.body.rhpemail, 265, 625);


  /*
  * Footer
  *
  * Fields: UserInfo.Name, UserInfo.PhoneFormatted, UserInfo.NMLSCompanyID
  *
  */

  doc.fontSize(10).fillColor('#004990')
    .text(req.body.userinfoname, 165, 725, { width: 300, height: 10, align: 'center', lineBreak: false });
  doc.text(`Phone: ${req.body.userinfophone}`, 165, 739, { width: 300, height: 10, align: 'center', lineBreak: false });
  doc.text(`NMLS# ${req.body.userinfonmls}`, 165, 753, { width: 300, height: 10, align: 'center', lineBreak: false });

  doc.save();
  doc.end();

  stream.on('finish', function() {
    res.end();
    stream.destroy();
    doc = null;
  });
});

module.exports = router;
