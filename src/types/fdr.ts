export type InstrumentType = 'JOINT_FDR' | 'RPGF_DD' | 'RTGS_ONLINE';

export type AuthenticityStatus = 
  | 'SELF_REPORTED' 
  | 'AI_OCR_VALIDATED' 
  | 'BANK_OTP_CONFIRMED' 
  | 'BANK_API_VERIFIED';

export type LifecycleStatus = 
  | 'SUBMITTED' 
  | 'UNDER_SCRUTINY' 
  | 'DISCREPANCY_FLAGGED' 
  | 'ACTIVE' 
  | 'EXPIRING_90D' 
  | 'EXPIRING_30D' 
  | 'MATURED' 
  | 'RENEWED' 
  | 'RELEASE_PENDING_NOC' 
  | 'RELEASED';

export type UserRole = 
  | 'INSTITUTION' 
  | 'SCRUTINY_OFFICER' 
  | 'BUREAU_HEAD' 
  | 'VIGILANCE_OFFICER' 
  | 'PGRC_OFFICER' 
  | 'BANK_MANAGER';

export type InstitutionCategory = 'GENERAL' | 'MINORITY' | 'WOMEN' | 'PWD';
export type LandTenure = 'OWNED' | 'LEASED';

export interface BoundingBox {
  field: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: 'MATCH' | 'MISMATCH' | 'WARNING';
  label: string;
}

export interface DiscrepancyItem {
  field: string;
  formValue: string;
  extractedValue: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  description: string;
}

export interface UrgencyBreakdown {
  deadlinePoints: number;      // 0-35
  discrepancyPoints: number;   // 0-30
  slaPoints: number;           // 0-20
  compliancePoints: number;    // 0-15
  totalScore: number;          // 0-100
  explanation: string;
}

export interface FinancialInstrument {
  id: string;
  aictePermanentId: string;    // e.g., "1-10492817"
  institutionName: string;
  trustName: string;
  state: string;
  district: string;
  programType: 'ENGINEERING' | 'MANAGEMENT' | 'PHARMACY' | 'MCA' | 'ARCHITECTURE';
  degreeLevel: 'DIPLOMA' | 'UG' | 'PG';
  category: InstitutionCategory;
  landTenure: LandTenure;
  statutoryRequiredDeposit: number; // In INR Lakhs

  // Instrument Details
  instrumentType: InstrumentType;
  fdrNumber: string;
  issuingBankName: string;
  ifscCode: string;
  branchName: string;
  branchOfficialEmail: string; // e.g. bm.04123@sbi.co.in
  principalAmount: number;     // e.g. 3500000 (35 Lakhs)
  principalAmountWords: string;
  maturityAmount: number;
  interestRate: number;        // e.g. 7.25%
  issueDate: string;           // YYYY-MM-DD
  maturityDate: string;        // YYYY-MM-DD
  lockInTenureYears: number;   // 8 or 10 years

  // Regulatory Flags
  jointHolderAICTE: boolean;   // Must have "Member Secretary, AICTE"
  noLienClauseValid: boolean;  // Exclusive lien marked to AICTE
  authenticityStatus: AuthenticityStatus;
  lifecycleStatus: LifecycleStatus;

  // Intelligence & Forensics
  urgencyScore: number;
  urgencyBreakdown: UrgencyBreakdown;
  fileHashSha256: string;
  imagePhash: string;
  forensicRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  discrepancies: DiscrepancyItem[];
  boundingBoxes: BoundingBox[];
  
  // Lineage (DAG)
  parentInstrumentId?: string;
  renewalCount: number;

  // Clause 6.46 Clearances
  pgrcClearance: 'PENDING' | 'CLEAR' | 'HELD';
  vigilanceClearance: 'PENDING' | 'CLEAR' | 'HELD';
  grantsClearance: 'PENDING' | 'CLEAR' | 'HELD';
  bankLiabilityClearance: 'PENDING' | 'CLEAR' | 'HELD';

  daysInCurrentQueue: number;
  submittedAt: string;
}

export interface AuditLedgerEntry {
  seqNo: number;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  instrumentId: string;
  fdrNumber: string;
  details: string;
  prevHash: string;
  currentHash: string;
}
