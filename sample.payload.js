 var payload = 
 "\{\"loanNumber\": \"" + los.GetField('FileData.FileName') + 
 "\",\"name\": \"" + los.GetField('Bor1.NickNameOrFirstName') + 
 "\",\"appraiser\": \"" + los.GetField('Appraiser.Company') + 
 "\",\"hazco\": \"" + hazco + 
 "\",\"hazconame\": \"" + hazconame + 
 "\",\"hazcophone\": \"" + hazcophone + 
 "\",\"hazcoemail\": \"" + hazcoemail + 
 "\",\"titleco\": \"" + titleco + 
 "\",\"titleconame\": \"" + titleconame + 
 "\",\"titlecophone\": \"" + titlecophone + 
 "\",\"titlecoemail\": \"" + titlecoemail + 
 "\",\"lonotes\": \"" + lonotes + 
 "\",\"propstreet\": \"" + propstreet + 
 "\",\"propcsz\": \"" + propcsz + 
 "\",\"propprice\": \"" + propprice + 
 "\",\"propclosing\": \"" + propclosing + 
 "\",\"propintrate\": \"" + propintrate + 
 "\",\"proplockexp\": \"" + proplockexp + 
 "\",\"loname\": \"" + loname + 
 "\",\"lonmls\": \"" + lonmls + 
 "\",\"lophone\": \"" + lophone + 
 "\",\"loemail\": \"" + loemail + 
 "\",\"rhpname\": \"" + rhpname + 
 "\",\"rhpnmls\": \"" + rhpnmls + 
 "\",\"rhpphone\": \"" + rhpphone + 
 "\",\"rhpemail\": \"" + rhpemail + 
 "\",\"selagentname\": \"" + selagentname + 
 "\",\"selagentco\": \"" + selagentco + 
 "\",\"selagentphone\": \"" + selagentphone + 
 "\",\"selagentemail\": \"" + selagentemail +
 "\",\"status\": \"" + los.GetField('Status.LoanStatus') + 
 "\",\"userinfoname\": \"" + userinfoname + 
 "\",\"userinfophone\": \"" + userinfophone + 
 "\",\"userinfonmls\": \"" + userinfonmls + 
 "\",\"propfull\": \"" + propfull + 

 "\",\"appraisalordered\": \"" + los.GetField('Status.AppraisalOrdered') + 
 "\",\"appraisalrecd\": \"" + los.GetField('Status.AppraisalReceived') + 
 "\",\"appraisalcleared\": \"" + los.GetField('ExtendedFields.AppraisalCleared') + 

 "\",\"hazordered\": \"" + los.GetField('Status.HazardOrdered') + 
 "\",\"hazrecd\": \"" + los.GetField('Status.HazardReceived') + 
 "\",\"hazcleared\": \"" + los.GetField('ExtendedFields.HazardCleared') + 

 "\",\"titleordered\": \"" + los.GetField('Status.TitleOrdered') + 
 "\",\"titlerecd\": \"" + los.GetField('Status.TitleReceived') + 
 "\",\"titlecleared\": \"" + los.GetField('ExtendedFields.TitleClearedDate1') + 
 
 "\",\"morttype\": \"" + morttype + "\"\}";