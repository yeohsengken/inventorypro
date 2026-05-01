import { ExpiryStatus, HazardClass, MovementType, SdsStatus } from '../models/inventory.models';

export type ChemicalUnit = 'L' | 'kg';

export interface MockChemical {
  id: number;
  name: string;
  code: string;
  casNo: string;
  hazardClass: HazardClass;
  location: string;
  stock: number;
  unit: ChemicalUnit;
  expiryStatus: ExpiryStatus;
  sdsStatus: SdsStatus;
  updatedAt: string;
  avatar: string;
  avatarClass: string;
}

export interface MockChemicalMovement {
  id: string;
  type: MovementType;
  quantity: string;
  date: string;
  handledBy: string;
}

export interface MockChemicalDetail extends MockChemical {
  formula: string;
  molecularWeight: string;
  minimumStock: number;
  batchNo: string;
  supplier: string;
  manufacturer: string;
  expiryDate: string;
  receivedDate: string;
  sdsVersion: string;
  sdsUpdatedAt: string;
  updatedBy: string;
  description: string;
  ppe: string[];
  storageNotes: string[];
  movements: MockChemicalMovement[];
}

export const MOCK_CHEMICALS: MockChemical[] = [
  {
    id: 1,
    name: 'Acetone',
    code: 'CHEM-001',
    casNo: '67-64-1',
    hazardClass: HazardClass.Flammable,
    location: 'Flammable Cabinet A',
    stock: 120,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 15, 2026 10:24 AM',
    avatar: 'AC',
    avatarClass: 'bg-amber-100 text-amber-700',
  },
  {
    id: 2,
    name: 'Hydrochloric Acid',
    code: 'CHEM-002',
    casNo: '7647-01-0',
    hazardClass: HazardClass.Corrosive,
    location: 'Acid Cabinet B',
    stock: 55,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 15, 2026 09:15 AM',
    avatar: 'HC',
    avatarClass: 'bg-sky-100 text-sky-700',
  },
  {
    id: 3,
    name: 'Sodium Hydroxide',
    code: 'CHEM-003',
    casNo: '1310-73-2',
    hazardClass: HazardClass.Corrosive,
    location: 'Alkali Storage',
    stock: 18,
    unit: 'kg',
    expiryStatus: ExpiryStatus.NearExpiry,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 14, 2026 04:45 PM',
    avatar: 'SH',
    avatarClass: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 4,
    name: 'Ethanol',
    code: 'CHEM-004',
    casNo: '64-17-5',
    hazardClass: HazardClass.Flammable,
    location: 'Flammable Cabinet A',
    stock: 8,
    unit: 'L',
    expiryStatus: ExpiryStatus.NearExpiry,
    sdsStatus: SdsStatus.Missing,
    updatedAt: 'May 14, 2026 11:30 AM',
    avatar: 'ET',
    avatarClass: 'bg-red-100 text-red-700',
  },
  {
    id: 5,
    name: 'Hydrogen Peroxide',
    code: 'CHEM-005',
    casNo: '7722-84-1',
    hazardClass: HazardClass.Oxidizer,
    location: 'Oxidizer Rack',
    stock: 0,
    unit: 'L',
    expiryStatus: ExpiryStatus.Expired,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 13, 2026 02:10 PM',
    avatar: 'HP',
    avatarClass: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 6,
    name: 'Isopropyl Alcohol',
    code: 'CHEM-006',
    casNo: '67-63-0',
    hazardClass: HazardClass.Flammable,
    location: 'Warehouse 1',
    stock: 32,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 13, 2026 09:05 AM',
    avatar: 'IA',
    avatarClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 7,
    name: 'Methanol',
    code: 'CHEM-007',
    casNo: '67-56-1',
    hazardClass: HazardClass.Flammable,
    location: 'Flammable Cabinet B',
    stock: 42,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 12, 2026 04:20 PM',
    avatar: 'ME',
    avatarClass: 'bg-pink-100 text-pink-700',
  },
  {
    id: 8,
    name: 'Sulfuric Acid',
    code: 'CHEM-008',
    casNo: '7664-93-9',
    hazardClass: HazardClass.Corrosive,
    location: 'Acid Cabinet A',
    stock: 14,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 12, 2026 11:45 AM',
    avatar: 'SA',
    avatarClass: 'bg-orange-100 text-orange-700',
  },
  {
    id: 9,
    name: 'Nitric Acid',
    code: 'CHEM-009',
    casNo: '7697-37-2',
    hazardClass: HazardClass.Oxidizer,
    location: 'Oxidizer Rack',
    stock: 9,
    unit: 'L',
    expiryStatus: ExpiryStatus.NearExpiry,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 11, 2026 03:18 PM',
    avatar: 'NA',
    avatarClass: 'bg-lime-100 text-lime-700',
  },
  {
    id: 10,
    name: 'Toluene',
    code: 'CHEM-010',
    casNo: '108-88-3',
    hazardClass: HazardClass.Flammable,
    location: 'Flammable Cabinet A',
    stock: 64,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 11, 2026 10:35 AM',
    avatar: 'TO',
    avatarClass: 'bg-violet-100 text-violet-700',
  },
  {
    id: 11,
    name: 'Xylene',
    code: 'CHEM-011',
    casNo: '1330-20-7',
    hazardClass: HazardClass.Flammable,
    location: 'Flammable Cabinet B',
    stock: 27,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Missing,
    updatedAt: 'May 10, 2026 05:10 PM',
    avatar: 'XY',
    avatarClass: 'bg-fuchsia-100 text-fuchsia-700',
  },
  {
    id: 12,
    name: 'Ammonium Hydroxide',
    code: 'CHEM-012',
    casNo: '1336-21-6',
    hazardClass: HazardClass.Corrosive,
    location: 'Alkali Storage',
    stock: 21,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 10, 2026 01:55 PM',
    avatar: 'AH',
    avatarClass: 'bg-cyan-100 text-cyan-700',
  },
  {
    id: 13,
    name: 'Potassium Permanganate',
    code: 'CHEM-013',
    casNo: '7722-64-7',
    hazardClass: HazardClass.Oxidizer,
    location: 'Oxidizer Rack',
    stock: 6,
    unit: 'kg',
    expiryStatus: ExpiryStatus.NearExpiry,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 09, 2026 04:05 PM',
    avatar: 'PP',
    avatarClass: 'bg-purple-100 text-purple-700',
  },
  {
    id: 14,
    name: 'Sodium Chloride',
    code: 'CHEM-014',
    casNo: '7647-14-5',
    hazardClass: HazardClass.Corrosive,
    location: 'Warehouse 1',
    stock: 88,
    unit: 'kg',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 09, 2026 09:30 AM',
    avatar: 'SC',
    avatarClass: 'bg-slate-100 text-slate-700',
  },
  {
    id: 15,
    name: 'Acetic Acid',
    code: 'CHEM-015',
    casNo: '64-19-7',
    hazardClass: HazardClass.Corrosive,
    location: 'Acid Cabinet B',
    stock: 19,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 08, 2026 02:25 PM',
    avatar: 'AA',
    avatarClass: 'bg-rose-100 text-rose-700',
  },
  {
    id: 16,
    name: 'Diethyl Ether',
    code: 'CHEM-016',
    casNo: '60-29-7',
    hazardClass: HazardClass.Flammable,
    location: 'Flammable Cabinet A',
    stock: 0,
    unit: 'L',
    expiryStatus: ExpiryStatus.Expired,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 08, 2026 10:12 AM',
    avatar: 'DE',
    avatarClass: 'bg-red-100 text-red-700',
  },
  {
    id: 17,
    name: 'Formaldehyde',
    code: 'CHEM-017',
    casNo: '50-00-0',
    hazardClass: HazardClass.Flammable,
    location: 'Toxic Storage',
    stock: 12,
    unit: 'L',
    expiryStatus: ExpiryStatus.NearExpiry,
    sdsStatus: SdsStatus.Missing,
    updatedAt: 'May 07, 2026 03:40 PM',
    avatar: 'FO',
    avatarClass: 'bg-stone-100 text-stone-700',
  },
  {
    id: 18,
    name: 'Chloroform',
    code: 'CHEM-018',
    casNo: '67-66-3',
    hazardClass: HazardClass.Flammable,
    location: 'Toxic Storage',
    stock: 24,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 07, 2026 11:18 AM',
    avatar: 'CH',
    avatarClass: 'bg-blue-100 text-blue-700',
  },
  {
    id: 19,
    name: 'Potassium Hydroxide',
    code: 'CHEM-019',
    casNo: '1310-58-3',
    hazardClass: HazardClass.Corrosive,
    location: 'Alkali Storage',
    stock: 33,
    unit: 'kg',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 06, 2026 04:42 PM',
    avatar: 'KH',
    avatarClass: 'bg-teal-100 text-teal-700',
  },
  {
    id: 20,
    name: 'Silver Nitrate',
    code: 'CHEM-020',
    casNo: '7761-88-8',
    hazardClass: HazardClass.Oxidizer,
    location: 'Oxidizer Rack',
    stock: 4,
    unit: 'kg',
    expiryStatus: ExpiryStatus.NearExpiry,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 06, 2026 01:08 PM',
    avatar: 'SN',
    avatarClass: 'bg-zinc-100 text-zinc-700',
  },
  {
    id: 21,
    name: 'Sodium Hypochlorite',
    code: 'CHEM-021',
    casNo: '7681-52-9',
    hazardClass: HazardClass.Corrosive,
    location: 'Corrosive Cabinet C',
    stock: 48,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 05, 2026 09:22 AM',
    avatar: 'SY',
    avatarClass: 'bg-green-100 text-green-700',
  },
  {
    id: 22,
    name: 'Benzene',
    code: 'CHEM-022',
    casNo: '71-43-2',
    hazardClass: HazardClass.Flammable,
    location: 'Toxic Storage',
    stock: 11,
    unit: 'L',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Missing,
    updatedAt: 'May 04, 2026 02:50 PM',
    avatar: 'BE',
    avatarClass: 'bg-neutral-100 text-neutral-700',
  },
  {
    id: 23,
    name: 'Calcium Chloride',
    code: 'CHEM-023',
    casNo: '10043-52-4',
    hazardClass: HazardClass.Corrosive,
    location: 'Warehouse 1',
    stock: 70,
    unit: 'kg',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 04, 2026 10:16 AM',
    avatar: 'CC',
    avatarClass: 'bg-gray-100 text-gray-700',
  },
  {
    id: 24,
    name: 'Magnesium Sulfate',
    code: 'CHEM-024',
    casNo: '7487-88-9',
    hazardClass: HazardClass.Corrosive,
    location: 'Warehouse 1',
    stock: 96,
    unit: 'kg',
    expiryStatus: ExpiryStatus.Valid,
    sdsStatus: SdsStatus.Uploaded,
    updatedAt: 'May 03, 2026 05:35 PM',
    avatar: 'MS',
    avatarClass: 'bg-blue-100 text-blue-700',
  },
];

const FORMULA_BY_CODE: Record<string, string> = {
  'CHEM-001': 'C3H6O',
  'CHEM-002': 'HCl',
  'CHEM-003': 'NaOH',
  'CHEM-004': 'C2H6O',
  'CHEM-005': 'H2O2',
  'CHEM-006': 'C3H8O',
  'CHEM-007': 'CH4O',
  'CHEM-008': 'H2SO4',
  'CHEM-009': 'HNO3',
  'CHEM-010': 'C7H8',
  'CHEM-011': 'C8H10',
  'CHEM-012': 'NH4OH',
  'CHEM-013': 'KMnO4',
  'CHEM-014': 'NaCl',
  'CHEM-015': 'C2H4O2',
  'CHEM-016': 'C4H10O',
  'CHEM-017': 'CH2O',
  'CHEM-018': 'CHCl3',
  'CHEM-019': 'KOH',
  'CHEM-020': 'AgNO3',
  'CHEM-021': 'NaOCl',
  'CHEM-022': 'C6H6',
  'CHEM-023': 'CaCl2',
  'CHEM-024': 'MgSO4',
};

export function getMockChemicalDetail(id: number): MockChemicalDetail {
  const chemical = MOCK_CHEMICALS.find((item) => item.id === id) ?? MOCK_CHEMICALS[0];
  const minimumStock = chemical.unit === 'kg' ? 10 : 20;
  const movementUnit = chemical.unit;

  return {
    ...chemical,
    formula: FORMULA_BY_CODE[chemical.code] ?? '-',
    molecularWeight: chemical.unit === 'kg' ? '40.00 g/mol' : '58.08 g/mol',
    minimumStock,
    batchNo: `${chemical.avatar}-2405${String(chemical.id).padStart(2, '0')}`,
    supplier: chemical.id % 2 === 0 ? 'Fisher Scientific' : 'Merck Malaysia',
    manufacturer: chemical.id % 2 === 0 ? 'Thermo Fisher' : 'Merck KGaA',
    expiryDate: chemical.expiryStatus === ExpiryStatus.Expired ? 'Apr 30, 2026' : chemical.expiryStatus === ExpiryStatus.NearExpiry ? 'Jun 15, 2026' : 'May 15, 2027',
    receivedDate: 'May 01, 2026',
    sdsVersion: chemical.sdsStatus === SdsStatus.Missing ? '-' : `v${2 + (chemical.id % 3)}.${chemical.id % 10}`,
    sdsUpdatedAt: chemical.sdsStatus === SdsStatus.Missing ? '-' : 'May 10, 2026',
    updatedBy: ['Admin', 'John Tan', 'Mei Ling', 'Daniel'][chemical.id % 4],
    description: `${chemical.name} is a hardcoded sample chemical record used for ChemTrack inventory preview screens.`,
    ppe: ppeForHazard(chemical.hazardClass),
    storageNotes: storageNotesForHazard(chemical.hazardClass, chemical.location),
    movements: [
      {
        id: `MV-2026-${String(chemical.id).padStart(3, '0')}`,
        type: chemical.stock > minimumStock ? MovementType.StockIn : MovementType.StockOut,
        quantity: `${Math.max(1, Math.min(chemical.stock, 12))} ${movementUnit}`,
        date: chemical.updatedAt,
        handledBy: ['Admin', 'John Tan', 'Mei Ling', 'Sarah'][chemical.id % 4],
      },
      {
        id: `MV-2026-${String(chemical.id + 30).padStart(3, '0')}`,
        type: chemical.location.includes('Warehouse') ? MovementType.Transfer : MovementType.Adjustment,
        quantity: `1 ${movementUnit}`,
        date: 'May 01, 2026 09:00 AM',
        handledBy: 'Admin',
      },
    ],
  };
}

function ppeForHazard(hazardClass: HazardClass): string[] {
  if (hazardClass === HazardClass.Flammable) return ['Safety goggles', 'Nitrile gloves', 'Lab coat', 'Fume hood'];
  if (hazardClass === HazardClass.Oxidizer) return ['Safety goggles', 'Chemical gloves', 'Lab coat', 'Face shield'];
  return ['Face shield', 'Chemical gloves', 'Apron', 'Fume hood'];
}

function storageNotesForHazard(hazardClass: HazardClass, location: string): string[] {
  if (hazardClass === HazardClass.Flammable) {
    return ['Keep away from heat and ignition sources.', `Store in ${location}.`, 'Use only in well-ventilated areas.'];
  }

  if (hazardClass === HazardClass.Oxidizer) {
    return ['Keep away from organic materials.', `Store in ${location}.`, 'Use clean, dry handling equipment.'];
  }

  return ['Use secondary containment.', `Store in ${location}.`, 'Keep away from incompatible chemicals.'];
}

