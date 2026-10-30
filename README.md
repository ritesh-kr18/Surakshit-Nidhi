# 🏆 Surakshit Nidhi (सुरक्षित निधि)
## AICTE Security Deposit & FDR Lifecycle Governance Portal (SIH26265)

**Surakshit Nidhi (सुरक्षित निधि)** is a centralized, AI-augmented, tamper-evident regulatory platform engineered to govern the complete 10-year administrative lifecycle of security deposits and Fixed Deposit Receipts (FDRs) submitted by **~10,000+ technical institutions** under the AICTE Approval Process Handbook (APH 2024–27 & 2026–27 Addendum).

---

## 🚀 Quick Start (Running the Prototype)

The dev server is currently running:
- **Local URL:** `http://localhost:3000/`
- **Network URL:** `http://192.168.80.136:3000/`

To restart or run manually:
```bash
cd /Users/ritesh/Downloads/SIH26265/aicte-koshsetu
npm install
npm run dev
```

---

## 🎯 6 Mandatory SIH Live Jury Demo Scenarios

Use the sticky **"🏆 SIH Live Jury Demo Switcher"** bar at the top of the portal to trigger any scenario in 1 click:

### 1. Scenario 1: OCR Mismatch & Leased-Land 2x Rule
- **Institution:** Bharatiya Institute of Technology, Pune (PID: `1-10492817`)
- **What to show judges:** 
  - The **Split-Screen Visual Viewer** renders the certificate on the left with glowing **Red bounding boxes**.
  - Right panel highlights:
    - **Shortage Alert:** College is on private leased land $\rightarrow$ APH 2026–27 Addendum mandates **2.0x DOUBLE deposit** (₹70 Lakhs required vs ₹35 Lakhs submitted).
    - **Mandatory Omission:** Name of *"Member Secretary, AICTE"* omitted from joint account holder line.
  - Urgency Score automatically jumps to **88/100 (CRITICAL)**.

### 2. Scenario 2: Cross-Institute Duplicate Scan Forensics (pHash)
- **Institution:** Aurobindo College of Engineering (PID: `1-88412950`)
- **What to show judges:**
  - Sibling college under the same trust uploaded a slightly cropped copy of the same ₹35 Lakh FDR.
  - Perceptual image hashing (`pHash: e4d3c2b1a0f9e8d7`) detects **100% visual collision**.
  - Side-by-side comparison highlights identical certificate serial numbers and layout.
  - Dispatches an automated investigation referral to the **Chief Vigilance Officer (CVO)**.

### 3. Scenario 3: 4-Tier Bank Authenticity & RBI IFSC OTP Bridge
- **Institution:** Kalam Institute of Management, Lucknow (PID: `1-49102847`)
- **What to show judges:**
  - Shows why student claims of "we integrate with all bank APIs" is unrealistic.
  - System queries the **RBI Master Bank Directory** using IFSC `PUNB0024100` to fetch verified branch manager email (`bm.24100@pnb.co.in`, never the college's email).
  - 1-Click sends cryptographic verification link $\rightarrow$ Branch manager inputs OTP $\rightarrow$ State transitions to **`BANK_CONFIRMED`**.

### 4. Scenario 4: What-If 90-Day Workload & RTGS Liquidity Simulator
- **What to show judges:**
  - Interactive slider (+15 to +180 days).
  - Real-time forecast of:
    - Expected maturing instruments (e.g. 426 FDRs at +90 days)
    - Officer scrutiny man-hours required (128 hours at 18 min/file)
    - RTGS refund cash outflow (₹95.85 Cr) for Finance Bureau liquidity planning
    - Predictive regional office bottleneck alerts.

### 5. Scenario 5: Multi-Year Renewal & DAG Lineage History
- **Institution:** Vivekananda College of Engineering, Chennai (PID: `1-28491023`)
- **What to show judges:**
  - Renders an interactive **parent-child tree** showing 2016 original deposit (`CNRB/CHE/2016/88104`) linked seamlessly to 2024 renewed instrument (`CBIN/CHE/2024/44102`).
  - Preserves 8 years of historical interest calculations, course additions, and previous officer approvals without overwriting records.

### 6. Scenario 6: Clause 6.46 Multi-Cell Clearance & Live QR-Verifiable NOC
- **Institution:** Marathwada Rural Polytechnic (PID: `1-30918234`)
- **What to show judges:**
  - 10-year lock-in completed.
  - Parallel clearance dashboard shows simultaneous clearances across:
    - **PGRC Cell:** Zero student caution money disputes
    - **Vigilance Cell:** No active CBI inquiries
    - **Grants Bureau:** Zero unutilized AQIS/MODROBS grants
  - Generates the official **AICTE Release NOC PDF with a phone-scannable QR code**.
  - Invite the judges to scan the QR code with their mobile phone camera to verify authenticity live!

---

## 🛡️ Key Innovative Features in this Prototype

1. **Explainable Administrative Urgency Engine ($U_{\text{score}}$):**
   $$U_{\text{score}} = \min(100,\; 0.35 \cdot S_{\text{deadline}} + 0.30 \cdot S_{\text{discrepancy}} + 0.20 \cdot S_{\text{SLA}} + 0.15 \cdot S_{\text{compliance}})$$
   Hover over any score badge to view the breakdown.

2. **Bank Solvency Radar (RBI Prompt Corrective Action):**
   Monitors bank health against RBI PCA watchlists and quantifies capital at risk beyond the ₹5 Lakh DICGC cap.

3. **1-Click High Court Mandamus Defense Dossier:**
   Compiles a certified chronological legal counter-affidavit brief with audit hashes within 24 hours to defeat court petitions.

4. **Trapped Deposits Recovery Engine (Node 3297):**
   Proactive multi-channel outreach engine to recover hundreds of crores in unclaimed matured deposits.

5. **Tamper-Evident SHA-256 Hash-Chained Audit Ledger (WORM):**
   Features a live "Verify Ledger Integrity" check that validates mathematical immutability across historical rows.

6. **AICTE Compliance Copilot (RAG):**
   Read-only assistant grounded exclusively in the Approval Process Handbook (APH 2024-27).
