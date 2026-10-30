import { FinancialInstrument, AuditLedgerEntry } from '../types/fdr';

export const INITIAL_FDRS: FinancialInstrument[] = [
  {
    id: 'fdr-001',
    aictePermanentId: '1-10492817',
    institutionName: 'Bharatiya Institute of Technology & Science',
    trustName: 'Bharatiya Shiksha Prasar Trust',
    state: 'Maharashtra',
    district: 'Pune',
    programType: 'ENGINEERING',
    degreeLevel: 'UG',
    category: 'GENERAL',
    landTenure: 'LEASED', // Requires 2x deposit (₹70 Lakhs!)
    statutoryRequiredDeposit: 70, // 35 * 2
    instrumentType: 'JOINT_FDR',
    fdrNumber: 'SBIN/PUN/2024/98421',
    issuingBankName: 'State Bank of India',
    ifscCode: 'SBIN0001423',
    branchName: 'Shivaji Nagar, Pune',
    branchOfficialEmail: 'bm.01423@sbi.co.in',
    principalAmount: 3500000, // Shortage! Uploaded 35L instead of 70L
    principalAmountWords: 'Rupees Thirty Five Lakh Only',
    maturityAmount: 7125000,
    interestRate: 7.25,
    issueDate: '2024-02-15',
    maturityDate: '2034-02-15',
    lockInTenureYears: 10,
    jointHolderAICTE: false, // Omitted Member Secretary, AICTE!
    noLienClauseValid: true,
    authenticityStatus: 'AI_OCR_VALIDATED',
    lifecycleStatus: 'DISCREPANCY_FLAGGED',
    urgencyScore: 88,
    urgencyBreakdown: {
      deadlinePoints: 20,
      discrepancyPoints: 30,
      slaPoints: 20,
      compliancePoints: 18,
      totalScore: 88,
      explanation: 'Critical Shortage: Operates on leased land (requires 2x deposit = ₹70L vs ₹35L submitted) & "Member Secretary, AICTE" missing from joint holder line.'
    },
    fileHashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    imagePhash: '9f8a3c2b1e4d5a6b',
    forensicRiskLevel: 'HIGH',
    renewalCount: 0,
    discrepancies: [
      {
        field: 'Statutory Amount (APH Clause 1.4)',
        formValue: '₹35,00,000 (Standard UG)',
        extractedValue: '₹70,00,000 Required (Leased Land 2x Rule)',
        severity: 'CRITICAL',
        description: 'Under APH 2026-27 Addendum Table 1.4, institutions on private leased premises must deposit double (₹70 Lakhs).'
      },
      {
        field: 'Joint Account Holder',
        formValue: 'Trustee & Member Secretary AICTE',
        extractedValue: 'Trustee Only (AICTE Name Omitted)',
        severity: 'CRITICAL',
        description: 'Fixed Deposit Receipt does not contain the name of Member Secretary, AICTE as mandated.'
      }
    ],
    boundingBoxes: [
      { field: 'Amount', x: 260, y: 180, width: 210, height: 45, status: 'MISMATCH', label: '₹35,00,000 (< ₹70L Required)' },
      { field: 'Joint Holder', x: 80, y: 240, width: 340, height: 40, status: 'MISMATCH', label: 'Missing "Member Secretary, AICTE"' },
      { field: 'FDR Number', x: 380, y: 90, width: 220, height: 35, status: 'MATCH', label: 'SBIN/PUN/2024/98421' },
      { field: 'Bank / IFSC', x: 80, y: 90, width: 240, height: 35, status: 'MATCH', label: 'State Bank of India (SBIN0001423)' }
    ],
    pgrcClearance: 'CLEAR',
    vigilanceClearance: 'PENDING',
    grantsClearance: 'CLEAR',
    bankLiabilityClearance: 'PENDING',
    daysInCurrentQueue: 6,
    submittedAt: '2024-03-01'
  },
  {
    id: 'fdr-002',
    aictePermanentId: '1-28491023',
    institutionName: 'Vivekananda College of Engineering & Tech',
    trustName: 'Vivekananda Educational Foundation',
    state: 'Tamil Nadu',
    district: 'Chennai',
    programType: 'ENGINEERING',
    degreeLevel: 'UG',
    category: 'GENERAL',
    landTenure: 'OWNED',
    statutoryRequiredDeposit: 35,
    instrumentType: 'JOINT_FDR',
    fdrNumber: 'CBIN/CHE/2024/44102',
    issuingBankName: 'Canara Bank',
    ifscCode: 'CNRB0002104',
    branchName: 'T. Nagar, Chennai',
    branchOfficialEmail: 'bm.2104@canarabank.com',
    principalAmount: 3500000,
    principalAmountWords: 'Rupees Thirty Five Lakh Only',
    maturityAmount: 7350000,
    interestRate: 7.4,
    issueDate: '2024-01-10',
    maturityDate: '2034-01-10',
    lockInTenureYears: 10,
    jointHolderAICTE: true,
    noLienClauseValid: true,
    authenticityStatus: 'BANK_API_VERIFIED',
    lifecycleStatus: 'RENEWED',
    urgencyScore: 32,
    urgencyBreakdown: {
      deadlinePoints: 10,
      discrepancyPoints: 0,
      slaPoints: 12,
      compliancePoints: 10,
      totalScore: 32,
      explanation: 'Clean renewal instrument linked to historical parent FDR-2016-881. Bank API verified.'
    },
    fileHashSha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    imagePhash: '3a4b5c6d7e8f9012',
    forensicRiskLevel: 'LOW',
    parentInstrumentId: 'fdr-legacy-2016',
    renewalCount: 1,
    discrepancies: [],
    boundingBoxes: [
      { field: 'Amount', x: 260, y: 180, width: 210, height: 45, status: 'MATCH', label: '₹35,00,000 (Exact)' },
      { field: 'Joint Holder', x: 80, y: 240, width: 340, height: 40, status: 'MATCH', label: 'Joint: Member Secretary, AICTE' },
      { field: 'FDR Number', x: 380, y: 90, width: 220, height: 35, status: 'MATCH', label: 'CBIN/CHE/2024/44102' }
    ],
    pgrcClearance: 'CLEAR',
    vigilanceClearance: 'CLEAR',
    grantsClearance: 'CLEAR',
    bankLiabilityClearance: 'CLEAR',
    daysInCurrentQueue: 1,
    submittedAt: '2024-01-12'
  },
  {
    id: 'fdr-003',
    aictePermanentId: '1-49102847',
    institutionName: 'Kalam Institute of Management Studies',
    trustName: 'APJ Kalam Memorial Society',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    programType: 'MANAGEMENT',
    degreeLevel: 'PG',
    category: 'MINORITY', // 50% concession! Required 7.5L
    landTenure: 'OWNED',
    statutoryRequiredDeposit: 7.5, // 15L * 0.5
    instrumentType: 'JOINT_FDR',
    fdrNumber: 'PUNB/LKO/2016/55219',
    issuingBankName: 'Punjab National Bank',
    ifscCode: 'PUNB0024100',
    branchName: 'Hazratganj, Lucknow',
    branchOfficialEmail: 'bm.24100@pnb.co.in',
    principalAmount: 750000,
    principalAmountWords: 'Rupees Seven Lakh Fifty Thousand Only',
    maturityAmount: 1485000,
    interestRate: 7.1,
    issueDate: '2016-04-01',
    maturityDate: '2026-04-01', // Matures in a few days!
    lockInTenureYears: 10,
    jointHolderAICTE: true,
    noLienClauseValid: true,
    authenticityStatus: 'BANK_OTP_CONFIRMED',
    lifecycleStatus: 'EXPIRING_30D',
    urgencyScore: 94,
    urgencyBreakdown: {
      deadlinePoints: 35,
      discrepancyPoints: 15,
      slaPoints: 20,
      compliancePoints: 24,
      totalScore: 94,
      explanation: 'Critical Expiry: 10-year lock-in period completes in 3 days. Active student fee refund complaint in PGRC registry holding auto-release.'
    },
    fileHashSha256: '9876543210abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    imagePhash: '5e6f7a8b9c0d1e2f',
    forensicRiskLevel: 'MEDIUM',
    renewalCount: 0,
    discrepancies: [
      {
        field: 'PGRC Student Grievance',
        formValue: 'Institution Declares Zero Grievances',
        extractedValue: 'PGRC-2026-UP-041 Active (Fee Refund ₹1.2L Pending)',
        severity: 'WARNING',
        description: 'Unresolved grievance from MBA 2024 batch student regarding non-refund of caution money.'
      }
    ],
    boundingBoxes: [
      { field: 'Maturity Date', x: 380, y: 130, width: 220, height: 35, status: 'WARNING', label: '01-04-2026 (Expiring in 3 Days)' },
      { field: 'Amount', x: 260, y: 180, width: 210, height: 45, status: 'MATCH', label: '₹7,50,000 (50% Minority Concession)' }
    ],
    pgrcClearance: 'HELD', // Blocked by student grievance!
    vigilanceClearance: 'CLEAR',
    grantsClearance: 'CLEAR',
    bankLiabilityClearance: 'CLEAR',
    daysInCurrentQueue: 8,
    submittedAt: '2016-04-05'
  },
  {
    id: 'fdr-004',
    aictePermanentId: '1-88412950',
    institutionName: 'Aurobindo College of Engineering',
    trustName: 'Sri Aurobindo Charitable Foundation',
    state: 'West Bengal',
    district: 'Kolkata',
    programType: 'ENGINEERING',
    degreeLevel: 'UG',
    category: 'GENERAL',
    landTenure: 'OWNED',
    statutoryRequiredDeposit: 35,
    instrumentType: 'JOINT_FDR',
    fdrNumber: 'BOB/KOL/2023/11299',
    issuingBankName: 'Bank of Baroda',
    ifscCode: 'BARB0PARKST',
    branchName: 'Park Street, Kolkata',
    branchOfficialEmail: 'bm.parkst@bankofbaroda.co.in',
    principalAmount: 3500000,
    principalAmountWords: 'Rupees Thirty Five Lakh Only',
    maturityAmount: 7200000,
    interestRate: 7.2,
    issueDate: '2023-08-10',
    maturityDate: '2033-08-10',
    lockInTenureYears: 10,
    jointHolderAICTE: true,
    noLienClauseValid: true,
    authenticityStatus: 'AI_OCR_VALIDATED',
    lifecycleStatus: 'DISCREPANCY_FLAGGED',
    urgencyScore: 96,
    urgencyBreakdown: {
      deadlinePoints: 15,
      discrepancyPoints: 30,
      slaPoints: 20,
      compliancePoints: 31,
      totalScore: 96,
      explanation: 'FRAUD ALERT: Perceptual Hash match detected! Identical FDR certificate previously uploaded under "Aurobindo Polytechnic" (PID: 1-88412999).'
    },
    fileHashSha256: 'deadbeef1234567890abcdef1234567890abcdef1234567890abcdef12345678',
    imagePhash: 'e4d3c2b1a0f9e8d7', // Cloned from sibling institution!
    forensicRiskLevel: 'HIGH',
    renewalCount: 0,
    discrepancies: [
      {
        field: 'Perceptual Image Hash (pHash)',
        formValue: 'Unique New Instrument Uploaded',
        extractedValue: '100% Visual Collision with PID: 1-88412999',
        severity: 'CRITICAL',
        description: 'The physical FDR document scan was reused across two sibling colleges under the same trust.'
      }
    ],
    boundingBoxes: [
      { field: 'Duplicate Certificate', x: 50, y: 50, width: 550, height: 350, status: 'MISMATCH', label: 'DUPLICATE CERTIFICATE REUSED ACROSS 2 INSTITUTIONS' }
    ],
    pgrcClearance: 'CLEAR',
    vigilanceClearance: 'HELD', // Flagged to vigilance!
    grantsClearance: 'CLEAR',
    bankLiabilityClearance: 'PENDING',
    daysInCurrentQueue: 9,
    submittedAt: '2023-08-15'
  },
  {
    id: 'fdr-005',
    aictePermanentId: '1-30918234',
    institutionName: 'Marathwada Rural Polytechnic',
    trustName: 'Gramin Vikas Shikshan Sanstha',
    state: 'Maharashtra',
    district: 'Nanded',
    programType: 'ENGINEERING',
    degreeLevel: 'DIPLOMA',
    category: 'GENERAL',
    landTenure: 'OWNED',
    statutoryRequiredDeposit: 15,
    instrumentType: 'JOINT_FDR',
    fdrNumber: 'MAHB/NAN/2014/77210',
    issuingBankName: 'Bank of Maharashtra',
    ifscCode: 'MAHB0000412',
    branchName: 'Station Road, Nanded',
    branchOfficialEmail: 'bm.00412@mahabank.co.in',
    principalAmount: 1500000,
    principalAmountWords: 'Rupees Fifteen Lakh Only',
    maturityAmount: 2980000,
    interestRate: 7.0,
    issueDate: '2014-03-01',
    maturityDate: '2024-03-01', // Completed 10 years!
    lockInTenureYears: 10,
    jointHolderAICTE: true,
    noLienClauseValid: true,
    authenticityStatus: 'BANK_API_VERIFIED',
    lifecycleStatus: 'RELEASE_PENDING_NOC', // Ready for live QR NOC demo!
    urgencyScore: 82,
    urgencyBreakdown: {
      deadlinePoints: 35,
      discrepancyPoints: 0,
      slaPoints: 20,
      compliancePoints: 27,
      totalScore: 82,
      explanation: '10-Year Lock-In Complete. All clearances (PGRC, Vigilance, Grants) CLEAR. Ready for Digital Release NOC generation.'
    },
    fileHashSha256: '445566778899aabbccddeeff00112233445566778899aabbccddeeff00112233',
    imagePhash: '1122334455667788',
    forensicRiskLevel: 'LOW',
    renewalCount: 0,
    discrepancies: [],
    boundingBoxes: [
      { field: 'Maturity Status', x: 260, y: 130, width: 340, height: 40, status: 'MATCH', label: '10 Years Completed (Ready for Release)' },
      { field: 'Amount', x: 260, y: 180, width: 210, height: 45, status: 'MATCH', label: '₹15,00,000 (Principal Full)' }
    ],
    pgrcClearance: 'CLEAR',
    vigilanceClearance: 'CLEAR',
    grantsClearance: 'CLEAR',
    bankLiabilityClearance: 'CLEAR',
    daysInCurrentQueue: 2,
    submittedAt: '2014-03-05'
  },
  {
    id: 'fdr-006',
    aictePermanentId: '1-77192034',
    institutionName: 'Deccan Institute of Pharmacy',
    trustName: 'Deccan Healthcare Trust',
    state: 'Karnataka',
    district: 'Kalaburagi',
    programType: 'PHARMACY',
    degreeLevel: 'UG',
    category: 'GENERAL',
    landTenure: 'OWNED',
    statutoryRequiredDeposit: 15,
    instrumentType: 'JOINT_FDR',
    fdrNumber: 'COOP/KAL/2022/88219',
    issuingBankName: 'Aadarsh Urban Co-operative Bank Ltd',
    ifscCode: 'ADCB0000101',
    branchName: 'Main Road, Kalaburagi',
    branchOfficialEmail: 'manager@aadarshbank.com',
    principalAmount: 1500000,
    principalAmountWords: 'Rupees Fifteen Lakh Only',
    maturityAmount: 3100000,
    interestRate: 8.5,
    issueDate: '2022-06-15',
    maturityDate: '2032-06-15',
    lockInTenureYears: 10,
    jointHolderAICTE: true,
    noLienClauseValid: false,
    authenticityStatus: 'SELF_REPORTED',
    lifecycleStatus: 'UNDER_SCRUTINY',
    urgencyScore: 89,
    urgencyBreakdown: {
      deadlinePoints: 10,
      discrepancyPoints: 25,
      slaPoints: 20,
      compliancePoints: 34,
      totalScore: 89,
      explanation: 'BANK SOLVENCY WARNING: Issuing bank is an Urban Co-operative Bank under RBI Moratorium/PCA. Exceeds DICGC ₹5L insurance cap!'
    },
    fileHashSha256: 'ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433221100',
    imagePhash: '8877665544332211',
    forensicRiskLevel: 'HIGH',
    renewalCount: 0,
    discrepancies: [
      {
        field: 'Bank Solvency (RBI PCA Framework)',
        formValue: 'Scheduled Commercial Bank',
        extractedValue: 'Non-Scheduled Urban Co-operative Bank (Under PCA)',
        severity: 'CRITICAL',
        description: 'AICTE rules mandate deposits in Scheduled Commercial Banks. Non-scheduled co-op bank puts ₹15L capital at severe insolvency risk.'
      }
    ],
    boundingBoxes: [
      { field: 'Bank Name', x: 80, y: 90, width: 340, height: 40, status: 'MISMATCH', label: 'Non-Scheduled Co-op Bank (RBI PCA Warning)' }
    ],
    pgrcClearance: 'CLEAR',
    vigilanceClearance: 'PENDING',
    grantsClearance: 'CLEAR',
    bankLiabilityClearance: 'PENDING',
    daysInCurrentQueue: 5,
    submittedAt: '2022-06-20'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLedgerEntry[] = [
  {
    seqNo: 1041,
    timestamp: '2026-03-29 09:15:22 UTC',
    actor: 'Dr. R. K. Sharma',
    role: 'SCRUTINY_OFFICER',
    action: 'FLAG_DISCREPANCY',
    instrumentId: 'fdr-001',
    fdrNumber: 'SBIN/PUN/2024/98421',
    details: 'Flagged amount mismatch under APH Clause 1.4 leased land 2x rule (₹35L submitted vs ₹70L required).',
    prevHash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
    currentHash: 'b3f4e1987d6a5c2b0e9f8a7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b'
  },
  {
    seqNo: 1042,
    timestamp: '2026-03-29 10:22:45 UTC',
    actor: 'System AI Engine',
    role: 'SCRUTINY_OFFICER',
    action: 'CROSS_INSTITUTE_DUPLICATE_ALERT',
    instrumentId: 'fdr-004',
    fdrNumber: 'BOB/KOL/2023/11299',
    details: 'Visual perceptual hash match (pHash: e4d3c2b1a0f9e8d7) detected between PID: 1-88412950 and PID: 1-88412999.',
    prevHash: 'b3f4e1987d6a5c2b0e9f8a7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b',
    currentHash: 'c7d8e9f0a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12'
  },
  {
    seqNo: 1043,
    timestamp: '2026-03-29 11:40:10 UTC',
    actor: 'Sh. V. Narayanan',
    role: 'BUREAU_HEAD',
    action: 'MULTI_CELL_CLEARANCE_APPROVAL',
    instrumentId: 'fdr-005',
    fdrNumber: 'MAHB/NAN/2014/77210',
    details: 'Clause 6.46 parallel clearances confirmed (PGRC, Vigilance, Grants: CLEAR). Release order queued.',
    prevHash: 'c7d8e9f0a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12',
    currentHash: 'd8e9f0a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234'
  }
];
