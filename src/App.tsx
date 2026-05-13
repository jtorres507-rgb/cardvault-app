import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  Box,
  Boxes,
  Camera,
  CheckCircle2,
  Crown,
  DollarSign,
  Download,
  Edit3,
  Eye,
  FileText,
  Gem,
  Grid3X3,
  Home,
  ImagePlus,
  Layers,
  List,
  MoreHorizontal,
  NotebookText,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  User,
  UserCircle,
} from "lucide-react";

type Screen =
  | "Dashboard"
  | "My Collection"
  | "Collection"
  | "All Cards"
  | "Memorabilia"
  | "Add Card"
  | "Card Detail"
  | "CardVault Scan"
  | "Scan Review Queue"
  | "Temporary Card Detail"
  | "Market Comps"
  | "Grading Center"
  | "Reports"
  | "Sales Tracker"
  | "Settings";

type CardStatus =
  | "Personal Collection"
  | "For Sale"
  | "Watchlist"
  | "Grade Candidate"
  | "Sold";

type CardRecord = {
  id: number;
  player: string;
  card: string;
  team: string;
  sport: string;
  year: string;
  brand: string;
  set: string;
  cardNumber: string;
  parallel: string;
  rookie?: string;
  autograph?: string;
  patch?: string;
  league?: string;
  rookieCard?: string;
  feature?: string;
  grade: string;
  grader: string;
  serialNumber: string;
  sku: string;
  status: CardStatus;
  purchaseDate: string;
  purchasePrice: number;
  taxesFees: number;
  shippingCost: number;
  totalCostBasis: number;
  source: string;
  seller: string;
  paymentMethod: string;
  storageLocation: string;
  estimatedValue: number;
  lastSale: number;
  averageComp: number;
  highComp: number;
  lowComp: number;
  compConfidence: string;
  gainLoss: number;
  roi: number;
  notes: string;
  frontImage?: string;
  backImage?: string;
  slabImage?: string;
  receiptImage?: string;
};

type TemporaryScanRecord = {
  id: number;
  player: string;
  card: string;
  team: string;
  sport: string;
  year: string;
  brand: string;
  set: string;
  cardNumber: string;
  parallel: string;
  grade: string;
  grader: string;
  serialNumber: string;
  sku: string;
  status: CardStatus;
  purchaseDate: string;
  purchasePrice: number;
  taxesFees: number;
  shippingCost: number;
  totalCostBasis: number;
  source: string;
  seller: string;
  paymentMethod: string;
  storageLocation: string;
  estimatedValue: number;
  lastSale: number;
  averageComp: number;
  highComp: number;
  lowComp: number;
  compConfidence: string;
  gainLoss: number;
  roi: number;
  notes: string;
  frontImage?: string;
  backImage?: string;
  slabImage?: string;
  receiptImage?: string;
  scanStatus: "Needs Review" | "Ready to Keep" | "Ready to Sell";
  scanSource: "Camera Upload" | "Manual Upload" | "Demo Scan";

  // Phase 6 Dallas Card Show beta fields
  boothNumber: string;
  dealerName: string;
  askingPrice: number;
  recentComp: number;
  offerTarget: number;
  maxBuyPrice: number;
  negotiationNotes: string;
  betaDecision: "Buy" | "Watch" | "Pass" | "Keep" | "Sell";

  createdAt: string;

  // Phase 5.7 simulated AI review foundation
  aiReviewStatus?: "Not Started" | "Simulated Review Complete";
  aiConfidence?: string;
  aiSuggestedMatch?: string;
};

const MAX_TEMPORARY_SCANS = 30;
const TEMPORARY_SCAN_WARNING_LIMIT = 25;

type BetaFeedbackRecord = {
  id: number;
  category:
    | "Workflow"
    | "Quick Scan"
    | "Mobile Layout"
    | "Pricing"
    | "Dealer Tracking"
    | "Decision Flow"
    | "Bug"
    | "Feature Request";
  priority: "Low" | "Medium" | "High";
  note: string;
  createdAt: string;
};

type SaleRecord = {
  id: number;
  cardId: number;
  cardName: string;
  player: string;
  platform: string;
  saleDate: string;
  salePrice: number;
  fees: number;
  shippingCost: number;
  taxes: number;
  netProceeds: number;
  purchasePrice: number;
  profitLoss: number;
  roi: number;
  buyerSource: string;
  notes: string;
};

type AddCardForm = {
  player: string;
  card: string;
  team: string;
  sport: string;
  year: string;
  brand: string;
  set: string;
  cardNumber: string;
  parallel: string;
  rookie: string;
  autograph: string;
  patch: string;
  serialNumber: string;
  sku: string;
  status: CardStatus;
  purchaseDate: string;
  purchasePrice: string;
  taxesFees: string;
  shippingCost: string;
  totalCostBasis: string;
  source: string;
  seller: string;
  invoice: string;
  paymentMethod: string;
  grade: string;
  grader: string;
  gradingStatus: string;
  estimatedValue: string;
  averageComp: string;
  notes: string;
  privateNotes: string;
  printableReportNotes: string;
  storageLocation: string;
  frontImage?: string;
  backImage?: string;
  slabImage?: string;
  receiptImage?: string;
};

const cardgemzLogo = "/cardgemz-main-logo.png";

const sidebarItems: {
  label: Screen;
  icon: React.ElementType;
}[] = [
  { label: "Dashboard", icon: Home },
  { label: "My Collection", icon: Boxes },
  {label: "Memorabilia",icon: Award },
  { label: "Add Card", icon: PlusCircle },
  { label: "CardVault Scan", icon: Camera },
  { label: "Scan Review Queue", icon: Camera },
  { label: "Market Comps", icon: TrendingUp },
  { label: "Grading Center", icon: ShieldCheck },
  { label: "Reports", icon: FileText },
  { label: "Sales Tracker", icon: ShoppingCart },
  { label: "Settings", icon: Settings },
];

type MemorabiliaRecord = {
  id: number;
  itemName: string;
  athlete: string;
  category: string;
  itemType: string;
  authentication: string;
  coaNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  estimatedValue: number;
  storageLocation: string;
  condition: string;
  insuranceCandidate: boolean;
  saleStatus: "Hold" | "For Sale" | "Sold" | "Review";
  notes: string;
};

type CollectionReportColumn =
  | "card"
  | "player"
  | "year"
  | "brand"
  | "grade"
  | "purchase"
  | "estimatedValue"
  | "gainLoss"
  | "location"
  | "status"
  | "sku"
  | "serialNumber"
  | "notes";

const initialCards: CardRecord[] = [
  {
    id: 1,
    player: "Michael Jordan",
    card: "1986 Fleer #57",
    team: "Chicago Bulls",
    sport: "Basketball",
    year: "1986",
    brand: "Fleer",
    set: "Fleer Basketball",
    cardNumber: "57",
    parallel: "Base",
    grade: "PSA 8",
    grader: "PSA",
    serialNumber: "N/A",
    sku: "CVP-JORDAN-1986-FLEER-57",
    status: "Personal Collection",
    purchaseDate: "June 1, 2025",
    purchasePrice: 12500,
    taxesFees: 0,
    shippingCost: 0,
    totalCostBasis: 12500,
    source: "Private Sale",
    seller: "Private",
    paymentMethod: "Wire",
    storageLocation: "Vault Elite-01",
    estimatedValue: 45200,
    lastSale: 45200,
    averageComp: 45200,
    highComp: 48000,
    lowComp: 43000,
    compConfidence: "Manual",
    gainLoss: 32700,
    roi: 261.6,
    notes: "High-value flagship card. Insurance report candidate.",
  },
  {
    id: 2,
    player: "Victor Wembanyama",
    card: "2023 Prizm Black Gold /10",
    team: "San Antonio Spurs",
    sport: "Basketball",
    year: "2023",
    brand: "Panini Prizm",
    set: "Prizm",
    cardNumber: "BG-10",
    parallel: "Black Gold /10",
    grade: "PSA 10",
    grader: "PSA",
    serialNumber: "/10",
    sku: "CVP-WEMBY-PRIZM-BG-010",
    status: "Personal Collection",
    purchaseDate: "May 24, 2025",
    purchasePrice: 1850,
    taxesFees: 0,
    shippingCost: 0,
    totalCostBasis: 1850,
    source: "eBay",
    seller: "eBay Seller",
    paymentMethod: "Card",
    storageLocation: "Vault A-01",
    estimatedValue: 6200,
    lastSale: 6100,
    averageComp: 6200,
    highComp: 6800,
    lowComp: 5700,
    compConfidence: "Manual",
    gainLoss: 4350,
    roi: 235.1,
    notes: "Top Wemby hold; premium parallel with strong long-term collection value.",
  },
  {
    id: 3,
    player: "Victor Wembanyama",
    card: "2023 Prizm Silver",
    team: "San Antonio Spurs",
    sport: "Basketball",
    year: "2023",
    brand: "Panini Prizm",
    set: "Prizm",
    cardNumber: "Silver",
    parallel: "Silver",
    grade: "PSA 10",
    grader: "PSA",
    serialNumber: "N/A",
    sku: "VM01001",
    status: "Personal Collection",
    purchaseDate: "May 24, 2025",
    purchasePrice: 900,
    taxesFees: 0,
    shippingCost: 0,
    totalCostBasis: 900,
    source: "Card Show",
    seller: "Dealer",
    paymentMethod: "Cash",
    storageLocation: "Vault A-02",
    estimatedValue: 2350,
    lastSale: 2300,
    averageComp: 2350,
    highComp: 2500,
    lowComp: 2200,
    compConfidence: "Manual",
    gainLoss: 1450,
    roi: 161.1,
    notes: "Core rookie-year Prizm position.",
  },
  {
    id: 4,
    player: "Quinyon Mitchell",
    card: "2023-2024 Topps Signature Class Chrome Variation Auto 5/5",
    team: "Philadelphia Eagles",
    sport: "Football",
    year: "2023-24",
    brand: "Topps",
    set: "Signature Class Chrome",
    cardNumber: "SC-QM",
    parallel: "Auto 5/5",
    grade: "Raw",
    grader: "Beckett",
    serialNumber: "5/5",
    sku: "CVP-QUINYON-SIG-005",
    status: "Grade Candidate",
    purchaseDate: "June 11, 2025",
    purchasePrice: 193.92,
    taxesFees: 0,
    shippingCost: 0,
    totalCostBasis: 193.92,
    source: "Sales Counter",
    seller: "Sales Counter",
    paymentMethod: "Card",
    storageLocation: "Sales Counter",
    estimatedValue: 700,
    lastSale: 644,
    averageComp: 623,
    highComp: 826,
    lowComp: 434,
    compConfidence: "Manual",
    gainLoss: 506.08,
    roi: 261.0,
    notes:
      "Fingerprints cleaned. Looks very good with no obvious whitening. Estimated 9.5-10 potential with possible Black Label upside.",
  },
  {
    id: 5,
    player: "Patrick Mahomes II",
    card: "2017 Prizm #269",
    team: "Kansas City Chiefs",
    sport: "Football",
    year: "2017",
    brand: "Panini Prizm",
    set: "Prizm",
    cardNumber: "269",
    parallel: "Base",
    grade: "PSA 10",
    grader: "PSA",
    serialNumber: "N/A",
    sku: "CVP-MAHOMES-2017-PRIZM-269",
    status: "For Sale",
    purchaseDate: "April 20, 2025",
    purchasePrice: 325,
    taxesFees: 0,
    shippingCost: 0,
    totalCostBasis: 325,
    source: "Card Show",
    seller: "Dealer",
    paymentMethod: "Cash",
    storageLocation: "Vault B-01",
    estimatedValue: 525,
    lastSale: 520,
    averageComp: 525,
    highComp: 575,
    lowComp: 475,
    compConfidence: "Manual",
    gainLoss: 200,
    roi: 61.5,
    notes: "For sale candidate.",
  },
  {
    id: 6,
    player: "Shohei Ohtani",
    card: "2023 Topps Chrome",
    team: "Los Angeles Dodgers",
    sport: "Baseball",
    year: "2023",
    brand: "Topps Chrome",
    set: "Topps Chrome",
    cardNumber: "N/A",
    parallel: "Base",
    grade: "Raw",
    grader: "Review",
    serialNumber: "N/A",
    sku: "CVP-OHTANI-2023-TOPPS-CHROME",
    status: "Watchlist",
    purchaseDate: "May 1, 2025",
    purchasePrice: 75,
    taxesFees: 0,
    shippingCost: 0,
    totalCostBasis: 75,
    source: "LCS",
    seller: "Local Card Shop",
    paymentMethod: "Card",
    storageLocation: "Vault C-01",
    estimatedValue: 185,
    lastSale: 180,
    averageComp: 185,
    highComp: 210,
    lowComp: 160,
    compConfidence: "Manual",
    gainLoss: 110,
    roi: 146.6,
    notes: "Watchlist card.",
  },
];

const initialMemorabilia: MemorabiliaRecord[] = [
  {
    id: 1,
    itemName: "Autographed Cowboys Jersey",
    athlete: "Micah Parsons",
    category: "Football",
    itemType: "Jersey",
    authentication: "Beckett",
    coaNumber: "BAS-REVIEW-001",
    purchaseDate: "June 12, 2025",
    purchasePrice: 350,
    estimatedValue: 750,
    storageLocation: "Display Case A",
    condition: "Excellent",
    insuranceCandidate: true,
    saleStatus: "Hold",
    notes: "High-display item. Good candidate for insurance documentation.",
  },
  {
    id: 2,
    itemName: "Signed Game-Style Shoes",
    athlete: "Victor Wembanyama",
    category: "Basketball",
    itemType: "Shoes",
    authentication: "PSA/DNA",
    coaNumber: "PSA-REVIEW-002",
    purchaseDate: "July 4, 2025",
    purchasePrice: 900,
    estimatedValue: 1850,
    storageLocation: "Vault Memorabilia Shelf",
    condition: "Near Mint",
    insuranceCandidate: true,
    saleStatus: "Review",
    notes: "Premium upside item. Needs photo documentation and COA upload.",
  },
  {
    id: 3,
    itemName: "Autographed Display Helmet",
    athlete: "Patrick Mahomes",
    category: "Football",
    itemType: "Helmet",
    authentication: "JSA",
    coaNumber: "JSA-REVIEW-003",
    purchaseDate: "August 18, 2025",
    purchasePrice: 525,
    estimatedValue: 1100,
    storageLocation: "Vault B",
    condition: "Excellent",
    insuranceCandidate: true,
    saleStatus: "Hold",
    notes: "Strong long-term hold. Add detailed photos before final insurance report.",
  },
];

const emptyForm: AddCardForm = {
  player: "",
  card: "",
  team: "",
  sport: "Basketball",
  year: "",
  brand: "",
  set: "",
  cardNumber: "",
  parallel: "",
  rookie: "No",
  autograph: "No",
  patch: "No",
  serialNumber: "",
  sku: "CVP-WEMBY-PRIZM-001",
  status: "Personal Collection",
  purchaseDate: "",
  purchasePrice: "",
  taxesFees: "",
  shippingCost: "",
  totalCostBasis: "",
  source: "",
  seller: "",
  invoice: "",
  paymentMethod: "",
  grade: "Raw",
  grader: "PSA",
  gradingStatus: "Planning",
  estimatedValue: "",
  averageComp: "",
  notes: "",
  privateNotes: "",
  printableReportNotes: "",
  storageLocation: "Vault A-01",
};

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("Dashboard");

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    const savedSales = localStorage.getItem("cardvault-sales");

    if (!savedSales) {
      return [];
    }

    try {
      const parsedSales = JSON.parse(savedSales);

      if (!Array.isArray(parsedSales)) {
        return [];
      }

      return parsedSales as SaleRecord[];
    } catch {
      return [];
    }
  });

  const [cards, setCards] = useState<CardRecord[]>(() => {
    const normalizeCard = (card: CardRecord): CardRecord => ({
      ...card,
      rookie: card.rookie || "No",
      autograph: card.autograph || "No",
      patch: card.patch || "No",
    });

    const savedCards = localStorage.getItem("cardvault-cards");

    if (!savedCards) {
      return initialCards.map(normalizeCard);
    }

    try {
      const parsedCards = JSON.parse(savedCards);

      if (!Array.isArray(parsedCards)) {
        return initialCards.map(normalizeCard);
      }

      return parsedCards.length > 0
        ? (parsedCards as CardRecord[]).map(normalizeCard)
        : initialCards.map(normalizeCard);
    } catch {
      return initialCards.map(normalizeCard);
    }
  });

  const [memorabilia] = useState<MemorabiliaRecord[]>(initialMemorabilia);

  const [selectedCardId, setSelectedCardId] = useState<number>(
    initialCards[0].id
  );

  const [temporaryScans, setTemporaryScans] = useState<TemporaryScanRecord[]>(
    () => {
      const savedScans = localStorage.getItem("cardvault-temporary-scans");

      if (!savedScans) {
        return [];
      }

      try {
        const parsedScans = JSON.parse(savedScans);

        if (!Array.isArray(parsedScans)) {
          return [];
        }

        return parsedScans as TemporaryScanRecord[];
      } catch {
        return [];
      }
    }
  );

 const [selectedTemporaryScanId, setSelectedTemporaryScanId] = useState<
  number | null
>(null);

const [betaFeedback, setBetaFeedback] = useState<BetaFeedbackRecord[]>([]);

const [newBetaFeedback, setNewBetaFeedback] = useState<BetaFeedbackRecord>({
  id: Date.now(),
  category: "Workflow",
  priority: "Medium",
  note: "",
  createdAt: new Date().toISOString(),
});

const [pendingDeleteCardId, setPendingDeleteCardId] = useState<number | null>(
  null
);
  const [defaultReport, setDefaultReport] = useState<
    | "cardAnalysis"
    | "myCollection"
    | "gradingForms"
    | "memorabilia"
    | "sales"
  >("myCollection");

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0] ?? null;

  const selectedTemporaryScan =
    temporaryScans.find((scan) => scan.id === selectedTemporaryScanId) ?? null;

  const collectionValue = cards.reduce(
    (sum, card) => sum + card.estimatedValue,
    0
  );

  const moneyInvested = cards.reduce(
    (sum, card) => sum + card.purchasePrice,
    0
  );

  const netGain = collectionValue - moneyInvested;
  const roi = moneyInvested > 0 ? (netGain / moneyInvested) * 100 : 0;

  useEffect(() => {
    localStorage.setItem("cardvault-cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(
      "cardvault-temporary-scans",
      JSON.stringify(temporaryScans)
    );
  }, [temporaryScans]);
  useEffect(() => {
    try {
      localStorage.setItem(
        "cardvault-temporary-scans",
        JSON.stringify(temporaryScans)
      );
    } catch (error) {
      console.error("Unable to save temporary scans to localStorage:", error);
      window.alert(
      "CardVault could not save this scan because the image files are too large. Try using smaller or compressed images."
    );
  }
}, [temporaryScans]);

  function openCardDetail(cardId: number) {
    setSelectedCardId(cardId);
    setActiveScreen("Card Detail");
  }

  function openTemporaryScanDetail(scanId: number) {
    setSelectedTemporaryScanId(scanId);
    setActiveScreen("Temporary Card Detail");
  }

  function createDemoTemporaryScan() {
    const newTemporaryScan: TemporaryScanRecord = {
      id: Date.now(),
      player: "Pending Identification",
      card: "Temporary Scan Record",
      team: "Pending",
      sport: "Basketball",
      year: "Pending",
      brand: "Pending",
      set: "Pending",
      cardNumber: "Pending",
      parallel: "Pending",
      grade: "Raw",
      grader: "Review",
      serialNumber: "N/A",
      sku: `TEMP-${Date.now()}`,
      status: "Personal Collection",
      purchaseDate: "Pending",
      purchasePrice: 0,
      taxesFees: 0,
      shippingCost: 0,
      totalCostBasis: 0,
      source: "Camera Upload",
      seller: "Pending",
      paymentMethod: "Pending",
      storageLocation: "Temporary Scan Queue",
      estimatedValue: 0,
      lastSale: 0,
      averageComp: 0,
      highComp: 0,
      lowComp: 0,
      compConfidence: "Pending AI Review",
      gainLoss: 0,
      roi: 0,
      notes:
        "Temporary scan created for review. Confirm card details before adding to collection or moving to sell queue.",
      frontImage: "",
      backImage: "",
      slabImage: "",
      receiptImage: "",
      scanStatus: "Needs Review",
      scanSource: "Demo Scan",
      // Phase 6 Dallas Card Show beta fields
      boothNumber: "",
      dealerName: "",
      askingPrice: 0,
      recentComp: 0,
      offerTarget: 0,
      maxBuyPrice: 0,
      negotiationNotes: "",
      betaDecision: "Watch",
      createdAt: new Date().toISOString(),
    };

    setTemporaryScans((currentScans) => [newTemporaryScan, ...currentScans]);
    setSelectedTemporaryScanId(newTemporaryScan.id);
    setActiveScreen("Temporary Card Detail");
  }

 function createTemporaryScanFromImages(frontImage: string, backImage: string) {
  if (temporaryScans.length >= MAX_TEMPORARY_SCANS) {
    alert(
      "Temporary Scan Queue Full. You have reached the 30-card beta storage limit. " +
      "Export your beta backup or delete older scans before adding more."
    );
    return;
  }

  if (temporaryScans.length >= TEMPORARY_SCAN_WARNING_LIMIT) {
    alert(
      `Beta Storage Warning: You are at ${temporaryScans.length} of ${MAX_TEMPORARY_SCANS} temporary scans. ` +
       "Consider exporting your beta backup before continuing."
    );
  }

    const newTemporaryScan: TemporaryScanRecord = {
  id: Date.now(),
  player: "Pending Identification",
  card: "Uploaded Card Scan",
  team: "Pending",
  sport: "Pending",
  year: "Pending",
  brand: "Pending",
  set: "Pending",
  cardNumber: "Pending",
  parallel: "Pending",
  grade: "Raw",
  grader: "Review",
  serialNumber: "N/A",
  sku: `TEMP-${Date.now()}`,
  status: "Personal Collection",
  purchaseDate: "Pending",
  purchasePrice: 0,
  taxesFees: 0,
  shippingCost: 0,
  totalCostBasis: 0,
  source: "Camera Upload",
  seller: "Pending",
  paymentMethod: "Pending",
  storageLocation: "Temporary Scan Queue",
  estimatedValue: 0,
  lastSale: 0,
  averageComp: 0,
  highComp: 0,
  lowComp: 0,
  compConfidence: "Pending AI Review",
  gainLoss: 0,
  roi: 0,
  notes:
    "Temporary scan created from uploaded card images. Confirm card details before adding to collection or moving to sell queue.",
  frontImage,
  backImage,
  slabImage: "",
  receiptImage: "",
  scanStatus: "Needs Review",
  scanSource: "Manual Upload",

  // Phase 6 Dallas Card Show beta fields
  boothNumber: "",
  dealerName: "",
  askingPrice: 0,
  recentComp: 0,
  offerTarget: 0,
  maxBuyPrice: 0,
  negotiationNotes: "",
  betaDecision: "Watch",

  aiReviewStatus: "Not Started",
  aiConfidence: "Pending",
  aiSuggestedMatch: "Pending AI Review",
  createdAt: new Date().toISOString(),
};

    setTemporaryScans((currentScans) => [newTemporaryScan, ...currentScans]);
    setSelectedTemporaryScanId(newTemporaryScan.id);
    setActiveScreen("Temporary Card Detail");
  }

  function updateTemporaryScan(updatedScan: TemporaryScanRecord) {
    const marketValue = updatedScan.estimatedValue || 0;
    const costBasis =
      updatedScan.totalCostBasis || updatedScan.purchasePrice || 0;

    const recalculatedGainLoss = marketValue - costBasis;

    const recalculatedRoi =
      costBasis > 0 ? (recalculatedGainLoss / costBasis) * 100 : 0;

    const normalizedScan: TemporaryScanRecord = {
      ...updatedScan,
      gainLoss: recalculatedGainLoss,
      roi: recalculatedRoi,
      scanStatus: "Ready to Keep",
    };

    setTemporaryScans((currentScans) =>
      currentScans.map((scan) =>
        scan.id === normalizedScan.id ? normalizedScan : scan
      )
    );

    setSelectedTemporaryScanId(normalizedScan.id);
    setActiveScreen("Temporary Card Detail");
  }

function updateTemporaryScanBetaDecision(
  scanId: number,
  betaDecision: TemporaryScanRecord["betaDecision"]
) {
  setTemporaryScans((currentScans) =>
    currentScans.map((scan) =>
      scan.id === scanId
        ? {
            ...scan,
            betaDecision,
          }
        : scan
    )
  );
}

function addBetaFeedbackNote() {
  if (!newBetaFeedback.note.trim()) {
    window.alert("Add a feedback note before saving.");
    return;
  }

  setBetaFeedback((currentFeedback) => [
    {
      ...newBetaFeedback,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    },
    ...currentFeedback,
  ]);

  setNewBetaFeedback({
    id: Date.now(),
    category: "Workflow",
    priority: "Medium",
    note: "",
    createdAt: new Date().toISOString(),
  });
}

function exportDallasBetaBackup() {
  const backupData = {
    exportedAt: new Date().toISOString(),
    phase: "Phase 6 — Dallas Card Show Beta Prep",
    event: "Dallas Card Show Beta Test",
    maxTemporaryScans: MAX_TEMPORARY_SCANS,
    totalTemporaryScans: temporaryScans.length,
    temporaryScans,
    betaFeedback,
  };

  const backupBlob = new Blob([JSON.stringify(backupData, null, 2)], {
    type: "application/json",
  });

  const backupUrl = URL.createObjectURL(backupBlob);
  const backupLink = document.createElement("a");

  backupLink.href = backupUrl;
  backupLink.download = `cardvault-dallas-beta-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  document.body.appendChild(backupLink);
  backupLink.click();
  document.body.removeChild(backupLink);

  URL.revokeObjectURL(backupUrl);
}

  function deleteTemporaryScan(scanId: number) {
    setTemporaryScans((currentScans) =>
      currentScans.filter((scan) => scan.id !== scanId)
    );

    setSelectedTemporaryScanId(null);
    setActiveScreen("Scan Review Queue");
  }

  function addTemporaryScanToCollection(scan: TemporaryScanRecord) {
    const newCard: CardRecord = {
      id: Date.now(),
      player: scan.player,
      card: scan.card,
      team: scan.team,
      sport: scan.sport,
      year: scan.year,
      brand: scan.brand,
      set: scan.set,
      cardNumber: scan.cardNumber,
      parallel: scan.parallel,
      rookie: "No",
      autograph: "No",
      patch: "No",
      grade: scan.grade,
      grader: scan.grader,
      serialNumber: scan.serialNumber,
      sku: scan.sku.replace("TEMP", "CVP"),
      status: "Personal Collection",
      purchaseDate: scan.purchaseDate,
      purchasePrice: scan.purchasePrice,
      taxesFees: scan.taxesFees,
      shippingCost: scan.shippingCost,
      totalCostBasis: scan.totalCostBasis,
      source: scan.source,
      seller: scan.seller,
      paymentMethod: scan.paymentMethod,
      storageLocation: "Vault A-01",
      estimatedValue: scan.estimatedValue,
      lastSale: scan.lastSale,
      averageComp: scan.averageComp,
      highComp: scan.highComp,
      lowComp: scan.lowComp,
      compConfidence: scan.compConfidence,
      gainLoss: scan.gainLoss,
      roi: scan.roi,
      notes: scan.notes,
      frontImage: scan.frontImage,
      backImage: scan.backImage,
      slabImage: scan.slabImage,
      receiptImage: scan.receiptImage,
    };

    setCards((currentCards) => [newCard, ...currentCards]);

    setTemporaryScans((currentScans) =>
      currentScans.filter((temporaryScan) => temporaryScan.id !== scan.id)
    );

    setSelectedCardId(newCard.id);
    setSelectedTemporaryScanId(null);
    setActiveScreen("Card Detail");
  }

  function moveTemporaryScanToSellQueue(scan: TemporaryScanRecord) {
    const newCardForSale: CardRecord = {
      id: Date.now(),
      player: scan.player,
      card: scan.card,
      team: scan.team,
      sport: scan.sport,
      year: scan.year,
      brand: scan.brand,
      set: scan.set,
      cardNumber: scan.cardNumber,
      parallel: scan.parallel,
      rookie: "No",
      autograph: "No",
      patch: "No",
      grade: scan.grade,
      grader: scan.grader,
      serialNumber: scan.serialNumber,
      sku: scan.sku.replace("TEMP", "SALE"),
      status: "For Sale",
      purchaseDate: scan.purchaseDate,
      purchasePrice: scan.purchasePrice,
      taxesFees: scan.taxesFees,
      shippingCost: scan.shippingCost,
      totalCostBasis: scan.totalCostBasis,
      source: scan.source,
      seller: scan.seller,
      paymentMethod: scan.paymentMethod,
      storageLocation: "Sell Queue",
      estimatedValue: scan.estimatedValue,
      lastSale: scan.lastSale,
      averageComp: scan.averageComp,
      highComp: scan.highComp,
      lowComp: scan.lowComp,
      compConfidence: scan.compConfidence,
      gainLoss: scan.gainLoss,
      roi: scan.roi,
      notes: `${scan.notes} Moved from temporary scan review into Sell Queue.`,
      frontImage: scan.frontImage,
      backImage: scan.backImage,
      slabImage: scan.slabImage,
      receiptImage: scan.receiptImage,
    };

    setCards((currentCards) => [newCardForSale, ...currentCards]);

    setTemporaryScans((currentScans) =>
      currentScans.filter((temporaryScan) => temporaryScan.id !== scan.id)
    );

    setSelectedCardId(newCardForSale.id);
    setSelectedTemporaryScanId(null);
    setActiveScreen("Sales Tracker");
  }

  function requestDeleteCard(cardId: number) {
    setPendingDeleteCardId(cardId);
  }

  function confirmDeleteCard() {
    if (pendingDeleteCardId === null) return;

    setCards((currentCards) => {
      const updatedCards = currentCards.filter(
        (card) => card.id !== pendingDeleteCardId
      );

      if (selectedCardId === pendingDeleteCardId) {
        setSelectedCardId(updatedCards[0]?.id ?? initialCards[0].id);
      }

      return updatedCards;
    });

    setPendingDeleteCardId(null);
    setActiveScreen("My Collection");
  }

  function cancelDeleteCard() {
    setPendingDeleteCardId(null);
  }

  function saveCardFromForm(formData: AddCardForm) {
    const purchasePrice = numberFromCurrency(formData.purchasePrice);
    const taxesFees = numberFromCurrency(formData.taxesFees);
    const shippingCost = numberFromCurrency(formData.shippingCost);

    const totalCostBasis =
      numberFromCurrency(formData.totalCostBasis) ||
      purchasePrice + taxesFees + shippingCost;

    const estimatedValue =
      numberFromCurrency(formData.estimatedValue) ||
      numberFromCurrency(formData.averageComp);

    const newCard: CardRecord = {
      id: Date.now(),
      player: formData.player || "Unknown Player",
      card: formData.card || "Unnamed Card",
      team: formData.team || "N/A",
      sport: formData.sport || "Other",
      year: formData.year || "N/A",
      brand: formData.brand || "N/A",
      set: formData.set || "N/A",
      cardNumber: formData.cardNumber || "N/A",
      parallel: formData.parallel || "N/A",

      rookie: formData.rookie || "No",
      autograph: formData.autograph || "No",
      patch: formData.patch || "No",

      grade: formData.grade || "Raw",
      grader: formData.grader || "Review",
      serialNumber: formData.serialNumber || "N/A",
      sku: formData.sku || "CVP-CARD-001",
      status: formData.status || "Personal Collection",
      purchaseDate: formData.purchaseDate || "Pending",
      purchasePrice,
      taxesFees,
      shippingCost,
      totalCostBasis,
      source: formData.source || "Manual Entry",
      seller: formData.seller || "Pending",
      paymentMethod: formData.paymentMethod || "Pending",
      storageLocation: formData.storageLocation || "Vault A-01",
      estimatedValue,
      lastSale: estimatedValue,
      averageComp: estimatedValue,
      highComp: estimatedValue,
      lowComp: estimatedValue,
      compConfidence: "Manual",
      gainLoss: estimatedValue - totalCostBasis,
      roi:
        totalCostBasis > 0
          ? ((estimatedValue - totalCostBasis) / totalCostBasis) * 100
          : 0,
      notes:
        formData.printableReportNotes ||
        formData.notes ||
        "Initial card record created through Add Card workflow.",
      frontImage: formData.frontImage,
      backImage: formData.backImage,
      slabImage: formData.slabImage,
      receiptImage: formData.receiptImage,
    };

    setCards((prev) => [newCard, ...prev]);
    setSelectedCardId(newCard.id);
    setActiveScreen("Card Detail");
  }

  function updateCard(updatedCard: CardRecord) {
    const normalizedCard: CardRecord = {
      ...updatedCard,
      rookie: updatedCard.rookie || "No",
      autograph: updatedCard.autograph || "No",
      patch: updatedCard.patch || "No",
    };

    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === normalizedCard.id ? normalizedCard : card
      )
    );

    setSelectedCardId(normalizedCard.id);
    setActiveScreen("Card Detail");
  }

  function resetDemoData() {
    const confirmed = window.confirm(
      "Reset CardVault Pro demo data? This will replace your saved local cards with the original sample cards."
    );

    if (!confirmed) return;

    const normalizedInitialCards = initialCards.map((card) => ({
      ...card,
      rookie: card.rookie || "No",
      autograph: card.autograph || "No",
      patch: card.patch || "No",
    }));

    setCards(normalizedInitialCards);
    setSelectedCardId(normalizedInitialCards[0]?.id ?? initialCards[0].id);
    setActiveScreen("Dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      <div className="flex min-h-screen">
         <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
         <MobileBottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

        <main className="relative flex-1 overflow-hidden bg-[#0b0c10] pb-6 pl-20 sm:pb-24 sm:pl-0 xl:pb-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(95,24,18,0.14),transparent_40%)]" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <img
              src="/cardgemz-main-logo.png"
              alt="CARDGEMZ background watermark"
              className="max-h-[780px] max-w-[780px] object-contain"
            />
          </div>

          <TopBar activeScreen={activeScreen} />

          <section className="relative z-10 px-4 py-5 sm:px-6 lg:p-8">
            {activeScreen === "Dashboard" && (
              <Dashboard
                cards={cards}
                collectionValue={collectionValue}
                moneyInvested={moneyInvested}
                netGain={netGain}
                roi={roi}
                setActiveScreen={setActiveScreen}
              />
            )}

            {activeScreen === "My Collection" && (
              <MyCollection
                cards={cards}
                openCardDetail={openCardDetail}
                setActiveScreen={setActiveScreen}
                openCollectionReport={() => {
                  setDefaultReport("myCollection");
                  setActiveScreen("Reports");
                }}
              />
            )}

            {activeScreen === "All Cards" && (
              <AllCards
                cards={cards}
                openCardDetail={openCardDetail}
                setActiveScreen={setActiveScreen}
                openCollectionReport={() => {
                  setDefaultReport("myCollection");
                  setActiveScreen("Reports");
                }}
              />
            )}

            {activeScreen === "Memorabilia" && (
              <MemorabiliaPage memorabilia={memorabilia} />
            )}

            {activeScreen === "Add Card" && (
              <AddCard onSave={saveCardFromForm} />
            )}

            {activeScreen === "Card Detail" &&
              (selectedCard ? (
                <CardDetail
                  card={selectedCard}
                  deleteCard={requestDeleteCard}
                  updateCard={updateCard}
                  setActiveScreen={setActiveScreen}
                />
              ) : (
                <EmptyVaultState
                  title="No Card Selected"
                  message="There is no card available to display. Add a card or return to your collection."
                  actionLabel="Go to My Collection"
                  onAction={() => setActiveScreen("My Collection")}
                />
              ))}

            {activeScreen === "CardVault Scan" && (
              <ComingSoonScreen
                title="CardVault Scan"
                subtitle="Camera scanning, OCR-assisted card capture, and image-based grading support will connect here."
              />
            )}

            {activeScreen === "Scan Review Queue" && (
              <ScanReviewQueue
                temporaryScans={temporaryScans}
                openTemporaryScanDetail={openTemporaryScanDetail}
                createDemoTemporaryScan={createDemoTemporaryScan}
                createTemporaryScanFromImages={createTemporaryScanFromImages}
                updateTemporaryScanBetaDecision={updateTemporaryScanBetaDecision}
                exportDallasBetaBackup={exportDallasBetaBackup}
                betaFeedback={betaFeedback}
                newBetaFeedback={newBetaFeedback}
                setNewBetaFeedback={setNewBetaFeedback}
                addBetaFeedbackNote={addBetaFeedbackNote}
              />
            )}

            {activeScreen === "Temporary Card Detail" &&
              (selectedTemporaryScan ? (
                <TemporaryCardDetail
                  scan={selectedTemporaryScan}
                  updateTemporaryScan={updateTemporaryScan}
                  addTemporaryScanToCollection={addTemporaryScanToCollection}
                  moveTemporaryScanToSellQueue={moveTemporaryScanToSellQueue}
                  deleteTemporaryScan={deleteTemporaryScan}
                  setActiveScreen={setActiveScreen}
                />
              ) : (
                <EmptyVaultState
                  title="No Temporary Scan Selected"
                  message="There is no temporary scan selected. Return to the scan review queue or create a new temporary scan."
                  actionLabel="Go to Scan Review Queue"
                  onAction={() => setActiveScreen("Scan Review Queue")}
                />
              ))}

            {activeScreen === "Market Comps" && <MarketComps cards={cards} />}

            {activeScreen === "Grading Center" && (
              <GradingCenter cards={cards} />
            )}

            {activeScreen === "Reports" && (
              <Reports
                cards={cards}
                sales={sales}
                defaultReport={defaultReport}
              />
            )}

            {activeScreen === "Sales Tracker" && (
              <SalesTracker
                cards={cards}
                setCards={setCards}
                sales={sales}
                setSales={setSales}
              />
            )}

            {activeScreen === "Settings" && (
              <SettingsScreen resetDemoData={resetDemoData} />
            )}
          </section>
        </main>
      </div>

      {pendingDeleteCardId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-vaultGold/40 bg-graphite900 p-6 text-white shadow-[0_0_60px_rgba(245,196,81,0.18)]">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Confirm Delete
            </p>

            <h2 className="mt-3 text-3xl font-black">Delete this card?</h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              This will remove the card from your vault and update your saved
              collection data. This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelDeleteCard}
                className="rounded-xl border border-steelBorder bg-black/40 px-5 py-3 text-sm font-bold text-zinc-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteCard}
                className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-black text-black shadow-vault hover:brightness-110"
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}) {
  return (
    <aside className="hidden lg:flex lg:w-72 lg:shrink-0 lg:flex-col border-r border-steelBorder bg-gradient-to-b from-black via-black to-graphite">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-vaultGold/50 bg-black shadow-vault">
          <img src={cardgemzLogo} alt="CARDGEMZ" className="h-full w-full object-contain" />
        </div>

        <div>
          <p className="text-lg font-black tracking-wide">CARDGEMZ</p>
          <p className="-mt-1 text-xs font-bold uppercase tracking-[0.35em] text-vaultGold">
            Vault Pro
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => setActiveScreen(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                activeScreen === item.label
                  ? "border-vaultGold/60 bg-vaultGold/10 text-vaultGold shadow-vault"
                  : "border-transparent text-zinc-300 hover:border-steelBorder hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          );
        })}
      </nav>
  {/* Sidebar bottom Announcement */}
      <div className="mt-12 rounded-2xl border border-vaultGold/40 bg-vaultGold/10 p-4">
        <p className="text-sm font-bold text-vaultGold">GOAT Phase 5.4</p>
        <p className="mt-2 text-xs leading-5 text-zinc-300">
          Front/back image uploads, temporary scan queue, card review, 
          and Keep / Sell / Delete workflow.
        </p>
      </div>
    </aside>
  );
}

/* =========================================================
   PHONE MINI SIDEBAR
   Used only on phone screens.
   Collapsed icon rail + expandable full menu.
   Does not change the desktop sidebar design.
========================================================= */
function PhoneMiniSidebar({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const phoneSidebarItems = sidebarItems;

  return (
    <>
      {/* Phone overlay when expanded */}
      {isExpanded && (
        <button
          type="button"
          aria-label="Close phone navigation overlay"
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Phone sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-vaultGold/20 bg-gradient-to-b from-black via-[#050505] to-graphite shadow-[18px_0_40px_rgba(0,0,0,0.75)] transition-all duration-300 sm:hidden ${
          isExpanded ? "w-72" : "w-20"
        }`}
      >
        {/* Phone Sidebar Header */}
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-vaultGold/40 bg-black">
              <img
                src={cardgemzLogo}
                alt="CARDGEMZ"
                className="h-full w-full object-contain"
              />
            </div>

            {isExpanded && (
              <div>
                <p className="text-lg font-black tracking-wide text-white">
                  CARDGEMZ
                </p>
                <p className="-mt-1 text-xs font-bold uppercase tracking-[0.35em] text-vaultGold">
                  Vault Pro
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-vaultGold/30 bg-vaultGold/10 text-vaultGold transition hover:bg-vaultGold/20"
            aria-label={isExpanded ? "Collapse phone sidebar" : "Expand phone sidebar"}
          >
            <span className="text-lg font-black">
              {isExpanded ? "‹" : "›"}
            </span>
          </button>
        </div>

        {/* Phone Sidebar Primary Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-5">
          {phoneSidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setActiveScreen(item.label);
                  setIsExpanded(false);
                }}
                className={`group relative flex w-full items-center rounded-xl border text-left transition ${
                  isExpanded ? "gap-3 px-4 py-3" : "justify-center px-0 py-3"
                } ${
                  isActive
                    ? "border-vaultGold/60 bg-vaultGold/15 text-vaultGold shadow-vault"
                    : "border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={22} />

                {isExpanded && (
                  <span className="text-sm font-black tracking-wide">
                    {item.label}
                  </span>
                )}

                {!isExpanded && (
                  <span className="pointer-events-none absolute left-full ml-3 hidden rounded-lg border border-white/10 bg-white px-3 py-1 text-xs font-black text-black shadow-xl group-hover:block">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Phone Sidebar Footer Label */}
        <div className="border-t border-white/10 px-3 py-4">
          {isExpanded ? (
            <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-3">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
                Mobile Field Mode
              </p>
              <p className="mt-1 text-[11px] leading-5 text-zinc-400">
                Phone layout for scanning, reviewing, and card show decisions.
              </p>
            </div>
          ) : (
            <div className="mx-auto h-2 w-8 rounded-full bg-vaultGold/50" />
          )}
        </div>
      </aside>
    </>
  );
}

function MobileBottomNav({
  activeScreen,
  setActiveScreen,
}: {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}) {
  const mobileNavItems = sidebarItems.filter((item) =>
    ["Dashboard", "My Collection", "CardVault Scan", "Scan Review Queue", "Sales Tracker"].includes(
      item.label
    )
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-vaultGold/30 bg-black/95 px-2 py-2 shadow-[0_-12px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActiveScreen(item.label)}
              className={`flex flex-col items-center justify-center rounded-xl px-1 py-2 text-center transition ${
                isActive
                  ? "bg-vaultGold/15 text-vaultGold shadow-vault"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span className="mt-1 text-[10px] font-black leading-tight">
                {item.label === "My Collection"
                  ? "Collection"
                  : item.label === "CardVault Scan"
                  ? "Scan"
                  : item.label === "Scan Review Queue"
                  ? "Queue"
                  : item.label === "Sales Tracker"
                  ? "Sales"
                  : item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function TopBar({ activeScreen }: { activeScreen: Screen }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-steelBorder bg-black/85 px-4 py-3 backdrop-blur-xl sm:px-6 xl:px-8">
      {activeScreen === "Reports" ? (
    <div className="flex min-w-0 items-center">
    <div className="flex items-center gap-4">
      <img
        src="/vault-logo.png"
        alt="CardVault logo"
        className="h-10 w-10 object-contain sm:h-12 sm:w-12 xl:h-14 xl:w-14"
      />

      <span className="truncate font-vault-heading text-xl font-black tracking-tight text-white sm:text-2xl xl:text-3xl">
        CardVault <span className="text-vaultGold">Pro</span>
      </span>
    </div>
  </div>
) : (
  <div className="hidden h-11 max-w-[520px] flex-1 items-center gap-3 rounded-2xl border border-steelBorder bg-graphite900 px-4 sm:flex">
    <Search size={18} className="text-zinc-500" />
    <input
      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      placeholder="Search cards, players, sets, or categories..."
    />
  </div>
)}

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="relative">
          <Bell size={20} className="text-zinc-300 sm:size-[22px]" />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-vaultGold text-xs font-black text-black">
            3
          </span>
        </div>

        <div className="flex h-11 items-center gap-2 rounded-2xl border border-steelBorder bg-graphite900 px-3 py-2 sm:gap-3 sm:px-4">
          <UserCircle className="text-vaultGold" size={24} />
          <div className="hidden sm:block">
            <p className="text-sm font-bold">Collector</p>
            <p className="text-xs text-vaultGold">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageHero({
  title,
  subtitle,
  logoSrc = "/cardgemz-main-logo.png",
  actions,
}: {
  title: string;
  subtitle?: string;
  logoSrc?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="relative mb-6 w-full max-w-full overflow-hidden rounded-[2rem] border border-vaultGold/20 bg-gradient-to-br from-black via-[#100b0f] to-black px-4 py-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:px-6 sm:py-10 xl:mb-8 xl:px-10 xl:py-12">
      {/* Responsive Watermark Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="h-[300px] w-[300px] object-contain opacity-[0.035] blur-[0.2px] sm:h-[420px] sm:w-[420px] sm:opacity-[0.04] xl:h-[620px] xl:w-[620px] xl:opacity-[0.045]"
        />
      </div>

      {/* Soft Gold Glow Behind Watermark */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,196,81,0.13),transparent_42%)]" />

      {/* Dark Overlay To Keep Text Readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 xl:flex-row xl:gap-12">
        {/* Main Logo */}
        <div className="relative h-36 w-36 shrink-0 sm:h-44 sm:w-44 xl:h-48 xl:w-48">
          <img
            src={logoSrc}
            alt="CARDGEMZ logo"
            className="h-full w-full object-contain drop-shadow-[0_26px_44px_rgba(0,0,0,0.95)] [filter:drop-shadow(0_0_20px_rgba(245,196,81,0.14))]"
          />

          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_34px_rgba(245,196,81,0.18)]" />
        </div>

        {/* Text Content */}
        <div className="w-full max-w-3xl">
          <div className="relative inline-block">
            <h1 className="font-vault-heading text-4xl font-black tracking-[-0.04em] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.85)] sm:text-5xl xl:text-6xl">
              {title}
            </h1>
          </div>

          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-vaultGold/70 to-transparent sm:w-72" />

          {subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-zinc-400 sm:text-base">
              {subtitle}
            </p>
          )}

          {actions && (
            <div className="mx-auto mt-6 flex w-full max-w-sm flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-5">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroButton({
  children,
  variant = "black",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "black" | "gold";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        variant === "gold"
          ? "rounded-full border-2 border-vaultGold bg-gradient-to-b from-[#fff3a0] via-vaultGold to-[#9b6a10] px-10 py-3 text-base font-extrabold text-black shadow-[0_0_20px_rgba(245,196,81,0.45)] transition hover:scale-[1.02]"
          : "rounded-full border-2 border-vaultGold bg-gradient-to-b from-zinc-800 via-black to-zinc-950 px-10 py-3 text-base font-extrabold text-vaultGold shadow-[0_0_18px_rgba(245,196,81,0.35)] transition hover:scale-[1.02]"
      }
    >
      {children}
    </button>
  );
}

function PhoneDashboard({
  cards,
  collectionValue,
  moneyInvested,
  netGain,
  roi,
  setActiveScreen,
}: {
  cards: CardRecord[];
  collectionValue: number;
  moneyInvested: number;
  netGain: number;
  roi: number;
  setActiveScreen: (screen: Screen) => void;
}) {
  const totalCards = cards.length;
  const gradedCards = cards.filter((card) => card.grade && card.grade !== "Raw").length;
  const rawCards = cards.filter((card) => !card.grade || card.grade === "Raw").length;

  const topPhoneCards = [...cards]
    .sort((a, b) => b.estimatedValue - a.estimatedValue)
    .slice(0, 3);

  const phoneStats = [
    {
      label: "Collection Value",
      value: `$${collectionValue.toLocaleString()}`,
      sub: "Estimated market value",
      accent: "text-vaultGold",
      rail: "from-vaultGold via-vaultGold/40 to-transparent",
    },
    {
      label: "Money Invested",
      value: `$${moneyInvested.toLocaleString()}`,
      sub: "Total cost basis",
      accent: "text-sky-400",
      rail: "from-sky-400 via-sky-400/40 to-transparent",
    },
    {
      label: "Net Gain / Loss",
      value: `$${netGain.toLocaleString()}`,
      sub: `${roi.toFixed(1)}% ROI`,
      accent: netGain >= 0 ? "text-emerald-400" : "text-red-400",
      rail: netGain >= 0 ? "from-emerald-400 via-emerald-400/40 to-transparent" : "from-red-400 via-red-400/40 to-transparent",
    },
    {
      label: "Cards Owned",
      value: totalCards.toString(),
      sub: "Across collection",
      accent: "text-white",
      rail: "from-white via-white/30 to-transparent",
    },
    {
      label: "Graded",
      value: gradedCards.toString(),
      sub: "Protected assets",
      accent: "text-vaultGold",
      rail: "from-vaultGold via-vaultGold/40 to-transparent",
    },
    {
      label: "Raw",
      value: rawCards.toString(),
      sub: "Review candidates",
      accent: "text-zinc-100",
      rail: "from-zinc-300 via-zinc-300/30 to-transparent",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4 pb-6">
      {/* Phone-only compact header */}
      <div className="rounded-[1.7rem] border border-vaultGold/20 bg-gradient-to-br from-black via-[#100b0f] to-black p-4 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-vaultGold">
              CardVault Pro
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white">
              Dashboard
            </h1>
          </div>

          <button
            onClick={() => setActiveScreen("My Collection")}
            className="rounded-2xl border border-vaultGold/40 bg-vaultGold/10 px-3 py-2 text-xs font-black text-vaultGold shadow-vault"
          >
            Collection →
          </button>
        </div>

        <p className="mt-3 max-w-[280px] text-xs font-medium leading-5 text-zinc-400">
          Portfolio value, card count, gain/loss, ROI, and key collection movement.
        </p>
      </div>

      {/* Mini filter row like your example */}
      <div className="grid grid-cols-4 overflow-hidden rounded-2xl border border-steelBorder bg-white/5 text-center text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
        <button className="border-r border-steelBorder bg-vaultGold/15 px-2 py-2 text-vaultGold">
          Day
        </button>
        <button className="border-r border-steelBorder px-2 py-2">Month</button>
        <button className="border-r border-steelBorder px-2 py-2">Qtr</button>
        <button className="px-2 py-2">2026</button>
      </div>

      {/* Phone KPI cards */}
      <div className="grid w-full max-w-full grid-cols-2 gap-3">
        {phoneStats.map((stat) => (
          <div
            key={stat.label}
            className="relative min-w-0 min-h-[142px] overflow-hidden rounded-2xl border border-steelBorder bg-black/75 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.48)]"
          >
            <div className={`absolute right-3 top-3 h-20 w-1 rounded-full bg-gradient-to-b ${stat.rail}`} />

            <p className="max-w-[110px] text-[10px] font-black uppercase leading-5 tracking-[0.22em] text-zinc-400">
              {stat.label}
            </p>

            <p className={`mt-4 break-words text-[1.6rem] font-black leading-tight tracking-tight ${stat.accent}`}>
              {stat.value}
            </p>

            <p className="mt-2 max-w-[115px] text-[11px] font-medium leading-5 text-zinc-400">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Phone insight cards */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-steelBorder bg-black/75 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Collection Trend</h2>
            <span className="rounded-full border border-vaultGold/30 px-3 py-1 text-xs font-black text-vaultGold">
              30D
            </span>
          </div>

          <div className="mt-5 h-20 rounded-2xl border border-steelBorder bg-gradient-to-r from-vaultGold/10 via-emerald-400/10 to-transparent" />

          <p className="mt-3 text-xs font-medium leading-5 text-zinc-400">
            Track collection movement as comps, grades, and card values update.
          </p>
        </div>

        <div className="rounded-2xl border border-steelBorder bg-black/75 p-4 shadow-[0_16px_36px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white">Top Cards</h2>
            <button
              onClick={() => setActiveScreen("My Collection")}
              className="text-xs font-black text-vaultGold"
            >
              View All →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {topPhoneCards.map((card) => (
              <button
                key={card.id}
                onClick={() => setActiveScreen("My Collection")}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-steelBorder bg-white/5 px-3 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-white">{card.player}</p>
                  <p className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                    {card.card} • {card.grade}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-black text-emerald-400">
                  ${card.estimatedValue.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({
  cards,
  collectionValue,
  moneyInvested,
  netGain,
  roi,
  setActiveScreen,
}: {
  cards: CardRecord[];
  collectionValue: number;
  moneyInvested: number;
  netGain: number;
  roi: number;
  setActiveScreen: (screen: Screen) => void;
}) {
  const topCards = [...cards]
    .sort((a, b) => b.estimatedValue - a.estimatedValue)
    .slice(0, 4);

  return (
    <>
      {/* Phone-only Dashboard */}
<div className="block w-full max-w-full overflow-x-hidden sm:hidden">
      <PhoneDashboard
        cards={cards}
        collectionValue={collectionValue}
        moneyInvested={moneyInvested}
        netGain={netGain}
        roi={roi}
        setActiveScreen={setActiveScreen}
       />
    </div>

      {/* Tablet/Desktop Dashboard */}
      <div className="hidden sm:block">
        <PageHero
          title="Dashboard"
          subtitle="High-level portfolio performance, collection value, gain/loss, ROI, and key card insights."
          actions={
            <>
              <HeroButton variant="gold" onClick={() => setActiveScreen("Add Card")}>
                Add New Card
              </HeroButton>
            </>
          }
        />

        <div className="grid grid-cols-4 gap-5">
          <KpiCard
            label="Collection Value"
            value={money(collectionValue)}
            sub="Estimated market value"
            color="text-vaultGold"
          />
          <KpiCard
            label="Money Invested"
            value={money(moneyInvested)}
            sub="Total cost basis"
            color="text-dataCyan"
          />
          <KpiCard
            label="Net Gain / Loss"
            value={money(netGain)}
            sub={`${roi.toFixed(1)}% ROI`}
            color="text-profitGreen"
          />
          <KpiCard
            label="Cards Owned"
            value={String(cards.length)}
            sub="Across all categories"
            color="text-white"
          />
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <Panel className="col-span-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-black">Collection Value Trend</h2>
              <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
                30D
              </span>
            </div>

            <div className="flex h-72 items-end gap-3 border-b border-l border-steelBorder px-4 pb-4">
              {[35, 42, 48, 45, 55, 58, 63, 60, 68, 72, 79, 88].map(
                (height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-vaultGold/30 to-vaultGold shadow-vault"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-zinc-500">{index + 1}</span>
                  </div>
                )
              )}
            </div>
          </Panel>

          <Panel className="col-span-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-black">Top Cards</h2>
              <span className="text-sm font-bold text-vaultGold">View All</span>
            </div>

            <div className="space-y-4">
              {topCards.map((card, index) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between rounded-xl border border-steelBorder bg-black/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-vaultGold/10 text-sm font-black text-vaultGold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{card.card}</p>
                      <p className="text-xs text-zinc-400">
                        {card.player} • {card.grade}
                      </p>
                    </div>
                  </div>
                  <p className="font-black text-profitGreen">
                    {money(card.estimatedValue)}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <Panel className="col-span-6">
            <h2 className="mb-5 text-lg font-black">Recent Activity</h2>
            <div className="space-y-3">
              {[
                "Victor Wembanyama collection report generated",
                "Quinyon Mitchell card analysis updated",
                "New grading candidate added",
                "Market comps refreshed for 12 cards",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-sm text-zinc-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="col-span-6 border-vaultGold/30 bg-vaultGold/10">
            <h2 className="mb-5 text-lg font-black text-vaultGold">
              Dashboard Snapshot
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <MiniStat
                label="For Sale"
                value={String(cards.filter((card) => card.status === "For Sale").length)}
              />
              <MiniStat
                label="Grade Candidates"
                value={String(
                  cards.filter((card) => card.status === "Grade Candidate").length
                )}
              />
              <MiniStat label="ROI" value={`+${roi.toFixed(1)}%`} />
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function CollectionStatStrip({
  cards,
}: {
  cards: CardRecord[];
}) {
  const totalValue = cards.reduce((sum, card) => sum + card.estimatedValue, 0);
  const rawCards = cards.filter((card) => card.grade === "Raw").length;
  const gradedCards = cards.length - rawCards;
  const totalSets = new Set(cards.map((card) => card.set || card.brand)).size;

  return (
    <div className="grid w-full grid-cols-5 overflow-hidden rounded-2xl border border-vaultGold/30 bg-black/55 shadow-[0_0_35px_rgba(245,196,81,0.12)] backdrop-blur">
      <VaultStat icon={<Layers size={30} />} label="Total Cards" value={String(cards.length)} sub="+38 this month" />
      <VaultStat icon={<DollarSign size={30} />} label="Collection Value" value={money(totalValue)} sub="+9.21%" positive />
      <VaultStat icon={<Shield size={30} />} label="Graded" value={String(gradedCards)} sub="+49.2%" positive />
      <VaultStat icon={<Box size={30} />} label="Raw" value={String(rawCards)} sub="+50.8%" positive />
      <VaultStat icon={<Layers size={30} />} label="Sets" value={String(totalSets)} sub="Tracked sets" />
    </div>
  );
}

function VaultStat({
  icon,
  label,
  value,
  sub,
  positive = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 border-r border-vaultGold/20 px-6 py-5 last:border-r-0">
      <div className="text-vaultGold">{icon}</div>

      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">
          {label}
        </p>

        <p className="mt-1 text-2xl font-black text-white">{value}</p>

        {sub && (
          <p className={positive ? "mt-1 text-xs font-bold text-profitGreen" : "mt-1 text-xs font-bold text-zinc-500"}>
            {positive ? "↗ " : ""}
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function CollectionCardTile({
  card,
  openCardDetail,
  compact = false,
}: {
  card: CardRecord;
  openCardDetail: (cardId: number) => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => openCardDetail(card.id)}
      className="group overflow-hidden rounded-xl border border-vaultGold/35 bg-black/60 text-left shadow-[0_0_24px_rgba(0,0,0,0.6)] transition hover:-translate-y-1 hover:border-vaultGold hover:shadow-[0_0_28px_rgba(245,196,81,0.25)]"
    >
      <div className={`relative overflow-hidden bg-graphite900 ${compact ? "aspect-[4/3]" : "aspect-[3/3.6]"}`}>
        {card.frontImage ? (
          <img
            src={card.frontImage}
            alt={`${card.player} ${card.card}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-black via-graphite900 to-black">
            <div className="text-center">
              <Crown className="mx-auto h-12 w-12 text-vaultGold/70" />
              <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-vaultGold">
                CARDGEMZ
              </p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-lg bg-black/80 px-2 py-1 text-lg font-black text-white">
          {card.grade === "Raw" ? "RAW" : card.grade.replace("PSA ", "")}
        </div>

        <div className="absolute right-3 top-3 rounded-md border border-vaultGold/40 bg-black/75 px-2 py-1 text-[10px] font-black uppercase text-vaultGold">
          Lineup
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-3">
          <p className="text-[11px] font-bold uppercase text-zinc-400">
            {card.year} {card.brand}
          </p>

          <h3 className="mt-1 text-lg font-black uppercase tracking-wide text-white">
            {card.player}
          </h3>

          <p className="text-xs uppercase text-zinc-400">{card.card}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-3">
        <span className="rounded-lg border border-steelBorder bg-black/60 px-2 py-1 text-xs font-black text-white">
          {card.grade}
        </span>

        <span className="text-sm font-black text-profitGreen">
          {money(card.estimatedValue)}
        </span>
      </div>
    </button>
  );
}

function VaultCollectionHero({
  cards,
  title,
  subtitle,
  actions,
}: {
  cards: CardRecord[];
  title: string;
  subtitle: string;
  actions: React.ReactNode;
}) {
  return (
    <section className="relative mb-6 overflow-hidden rounded-3xl border border-vaultGold/25 bg-black px-8 py-8 shadow-[0_0_50px_rgba(0,0,0,0.75)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(245,196,81,0.24),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(245,196,81,0.12),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.2),rgba(0,0,0,0.95))]" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_40%,rgba(255,255,255,0.09),transparent_36%)]" />

      <div className="relative grid items-center gap-8 xl:grid-cols-[260px_1fr_340px]">
        <div className="flex justify-center xl:justify-start">
          <div className="relative h-48 w-48">
            <img
              src="/cardgemz-main-logo.png"
              alt="CARDGEMZ"
              className="h-full w-full object-contain drop-shadow-[0_0_34px_rgba(245,196,81,0.38)]"
            />
          </div>
        </div>

        <div>
          <h1 className="font-vault-heading text-6xl font-black tracking-[-0.04em] text-white">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-zinc-300">
            {subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">{actions}</div>
        </div>

        <div className="hidden xl:block" />
      </div>

      <div className="relative mx-auto mt-6 max-w-5xl">
        <CollectionStatStrip cards={cards} />
      </div>
    </section>
  );
}

function MyCollection({
  cards,
  openCardDetail,
  setActiveScreen,
  openCollectionReport,
}: {
  cards: CardRecord[];
  openCardDetail: (cardId: number) => void;
  setActiveScreen: (screen: Screen) => void;
  openCollectionReport: () => void;
}) {
  const topCards = [...cards]
    .sort((a, b) => b.estimatedValue - a.estimatedValue)
    .slice(0, 5);

  if (cards.length === 0) {
    return (
      <EmptyVaultState
        title="No Cards in Your Vault"
        message="Start building your collection by adding your first card to CardVault Pro."
        actionLabel="Add First Card"
        onAction={() => setActiveScreen("Add Card")}
      />
    );
  }

  return (
    <>
      <VaultCollectionHero
        cards={cards}
        title="My Collection"
        subtitle="Track your full card inventory, market value, grading status, storage, and collection decisions — all in one place."
        actions={
          <>
            <button
              type="button"
              onClick={() => setActiveScreen("Add Card")}
              className="inline-flex items-center gap-2 rounded-xl border border-vaultGold/70 bg-black/60 px-7 py-3 text-sm font-black text-vaultGold shadow-vault transition hover:bg-vaultGold hover:text-black"
            >
              <Plus size={18} />
              Add Card
            </button>

            <button
              type="button"
              onClick={openCollectionReport}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#fff3a0] via-vaultGold to-[#9b6a10] px-7 py-3 text-sm font-black text-black shadow-vault transition hover:scale-[1.02]"
            >
              <Download size={18} />
              Export Collection
            </button>
          </>
        }
      />

      <Panel className="border-vaultGold/25 bg-black/50">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-vaultGold" />
            <h2 className="text-2xl font-black">Top Cards</h2>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen("All Cards")}
            className="text-sm font-black text-vaultGold hover:text-white"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {topCards.map((card) => (
            <CollectionCardTile
              key={card.id}
              card={card}
              openCardDetail={openCardDetail}
              compact
            />
          ))}
        </div>
      </Panel>
    </>
  );
}

function AllCards({
  cards,
  openCardDetail,
  setActiveScreen,
  openCollectionReport,
}: {
  cards: CardRecord[];
  openCardDetail: (cardId: number) => void;
  setActiveScreen: (screen: Screen) => void;
  openCollectionReport: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState<
    "All" | "Raw" | "Graded" | "For Sale" | "Grade Candidate"
  >("All");

  const filteredCards = cards.filter((card) => {
    const query = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !query ||
      [
        card.card,
        card.player,
        card.year,
        card.brand,
        card.team,
        card.sport,
        card.grade,
        card.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesFilter =
      collectionFilter === "All" ||
      (collectionFilter === "Raw" && card.grade === "Raw") ||
      (collectionFilter === "Graded" && card.grade !== "Raw") ||
      card.status === collectionFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <section className="relative mb-6 overflow-hidden rounded-3xl border border-vaultGold/25 bg-black px-8 py-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(245,196,81,0.18),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.15),rgba(0,0,0,0.95))]" />

        <div className="relative flex items-start justify-between gap-6">
          <div>
            <button
              type="button"
              onClick={() => setActiveScreen("My Collection")}
              className="mb-4 inline-flex items-center gap-2 text-sm font-black text-vaultGold hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to My Collection
            </button>

            <h1 className="font-vault-heading text-5xl font-black tracking-[-0.04em] text-white">
              All Cards
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              My Collection › All Cards
            </p>

            <p className="mt-4 text-sm font-bold text-zinc-300">
              {cards.length.toLocaleString()} cards in your collection
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={openCollectionReport}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#fff3a0] via-vaultGold to-[#9b6a10] px-5 py-3 text-sm font-black text-black shadow-vault"
            >
              <Download size={17} />
              Export Collection
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-steelBorder bg-black/50 px-5 py-3 text-sm font-black text-zinc-200"
            >
              Print Report
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen("Add Card")}
              className="inline-flex items-center gap-2 rounded-xl border border-vaultGold/60 bg-black/50 px-5 py-3 text-sm font-black text-vaultGold hover:bg-vaultGold hover:text-black"
            >
              <Plus size={17} />
              Add Card
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-6 max-w-5xl">
          <CollectionStatStrip cards={cards} />
        </div>
      </section>

      <Panel className="border-vaultGold/20 bg-black/50">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-[320px] flex-1 items-center gap-3 rounded-xl border border-steelBorder bg-black/50 px-4 py-3">
            <Search size={18} className="text-zinc-500" />

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              placeholder="Search in collection..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", "Raw", "Graded", "For Sale", "Grade Candidate"] as const).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setCollectionFilter(filter)}
                  className={`rounded-xl border px-4 py-3 text-xs font-black transition ${
                    collectionFilter === filter
                      ? "border-vaultGold bg-vaultGold text-black shadow-vault"
                      : "border-steelBorder bg-black/40 text-zinc-300 hover:border-vaultGold/50 hover:text-vaultGold"
                  }`}
                >
                  {filter}
                </button>
              )
            )}

            <button className="rounded-xl border border-vaultGold/40 bg-black/50 p-3 text-vaultGold">
              <Grid3X3 size={16} />
            </button>

            <button className="rounded-xl border border-steelBorder bg-black/50 p-3 text-zinc-300">
              <List size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-8">
          {filteredCards.map((card) => (
            <CollectionCardTile
              key={card.id}
              card={card}
              openCardDetail={openCardDetail}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-steelBorder pt-4 text-sm text-zinc-400">
          <p>
            Showing 1–{Math.min(filteredCards.length, 24)} of{" "}
            {filteredCards.length.toLocaleString()} cards
          </p>

          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-steelBorder px-3 py-2 text-white">‹</button>
            <button className="rounded-lg border border-vaultGold bg-vaultGold px-3 py-2 font-black text-black">1</button>
            <button className="rounded-lg border border-steelBorder px-3 py-2 text-white">2</button>
            <button className="rounded-lg border border-steelBorder px-3 py-2 text-white">3</button>
            <button className="rounded-lg border border-steelBorder px-3 py-2 text-white">›</button>
          </div>
        </div>
      </Panel>
    </>
  );
}

function MetricCard({
  label,
  value,
  subtext,
  tone = "gold",
}: {
  label: string;
  value: string;
  subtext: string;
  tone?: "gold" | "green" | "blue";
}) {
  const toneClass =
    tone === "green"
      ? "text-profitGreen"
      : tone === "blue"
        ? "text-blue-400"
        : "text-vaultGold";

  return (
    <div className="rounded-2xl border border-steelBorder bg-graphite900/90 p-5 shadow-vault">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
        {label}
      </p>
      <p className={`mt-3 text-3xl font-black ${toneClass}`}>{value}</p>
      <p className="mt-2 text-sm text-zinc-400">{subtext}</p>
    </div>
  );
}

function MiniInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-steelBorder pb-2">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function ChecklistItem({ done, label }: { done?: boolean; label: string }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        done
          ? "border-profitGreen/30 bg-profitGreen/10": "border-steelBorder bg-black/30" }`}>
      <p className={done ? "font-bold text-profitGreen" : "font-bold text-zinc-300"}>
        {done ? "✓ " : ""}{label}</p></div>);}

function MemorabiliaPage({
  memorabilia,
}: {
  memorabilia: MemorabiliaRecord[];
}) {
  const totalItems = memorabilia.length;
  const totalPaid = memorabilia.reduce((sum, item) => sum + item.purchasePrice, 0);
  const estimatedValue = memorabilia.reduce((sum, item) => sum + item.estimatedValue, 0);
  const projectedGain = estimatedValue - totalPaid;
  const insuranceItems = memorabilia.filter((item) => item.insuranceCandidate).length;

  return (
    <>
      <PageHero
        title="Memorabilia"
        subtitle="Track autographed jerseys, shoes, helmets, game-used items, COAs, insurance value, storage, and sale decisions."
        actions={
          <>
            <HeroButton variant="black">Export Memorabilia</HeroButton>
            <HeroButton variant="gold">Add Item</HeroButton>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-5 gap-4">
        <MetricCard
          label="Memorabilia Items"
          value={String(totalItems)}
          subtext="Tracked collectibles"
        />

        <MetricCard
          label="Money Invested"
          value={money(totalPaid)}
          subtext="Total purchase basis"
          tone="blue"
        />

        <MetricCard
          label="Estimated Value"
          value={money(estimatedValue)}
          subtext="Current memorabilia value"
          tone="green"
        />

        <MetricCard
          label="Projected Gain"
          value={money(projectedGain)}
          subtext="Unrealized memorabilia gain"
          tone="green"
        />

        <MetricCard
          label="Insurance Candidates"
          value={String(insuranceItems)}
          subtext="Ready for reports"
          tone="gold"
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Panel className="col-span-2">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black">Memorabilia Vault</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Track high-value signed and game-used collectibles outside your card inventory.
              </p>
            </div>

            <span className="rounded-full border border-vaultGold/40 bg-vaultGold/10 px-3 py-1 text-xs font-bold text-vaultGold">
              {totalItems} Items
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-steelBorder">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/70 text-xs uppercase tracking-[0.18em] text-vaultGold">
                <tr>
                  <th className="px-4 py-4">Item</th>
                  <th className="px-4 py-4">Athlete</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Auth</th>
                  <th className="px-4 py-4">Purchase</th>
                  <th className="px-4 py-4">Value</th>
                  <th className="px-4 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {memorabilia.map((item) => {
                  const gain = item.estimatedValue - item.purchasePrice;

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-steelBorder bg-graphite900/60"
                    >
                      <td className="px-4 py-4">
                        <p className="font-black text-white">{item.itemName}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {item.category} • {item.condition}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-zinc-300">{item.athlete}</td>

                      <td className="px-4 py-4">
                        <span className="rounded-lg border border-steelBorder bg-black/40 px-2 py-1 text-xs font-bold text-zinc-300">
                          {item.itemType}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-bold text-white">{item.authentication}</p>
                        <p className="mt-1 text-xs text-zinc-500">{item.coaNumber}</p>
                      </td>

                      <td className="px-4 py-4 text-zinc-300">
                        {money(item.purchasePrice)}
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-black text-profitGreen">
                          {money(item.estimatedValue)}
                        </p>
                        <p
                          className={`mt-1 text-xs font-bold ${
                            gain >= 0 ? "text-profitGreen" : "text-red-400"
                          }`}
                        >
                          {gain >= 0 ? "+" : ""}
                          {money(gain)}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-lg border border-vaultGold/30 bg-vaultGold/10 px-2 py-1 text-xs font-bold text-vaultGold">
                          {item.saleStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <h3 className="text-xl font-black">Insurance Readiness</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Memorabilia should connect directly into Insurance Reports for documentation,
              storage proof, declared value, and COA tracking.
            </p>

            <div className="mt-5 space-y-3">
              <MiniInfoRow label="Insurance Candidates" value={String(insuranceItems)} />
              <MiniInfoRow label="Declared Value" value={money(estimatedValue)} />
              <MiniInfoRow label="Storage Review" value="Required" />
              <MiniInfoRow label="COA Tracking" value="Enabled" />
            </div>
          </Panel>

          <Panel>
            <h3 className="text-xl font-black">Report Center Link</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Memorabilia will be linked to Reports through Memorabilia Reports and Insurance Reports.
            </p>

            <div className="mt-5 rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-vaultGold">
                Recommended Reports
              </p>
              <p className="mt-2 text-sm font-bold text-white">
                Insurance Reports, Memorabilia Reports, Full Collection Reports
              </p>
            </div>
          </Panel>

          <Panel>
            <h3 className="text-xl font-black">Memorabilia Strategy</h3>
            <div className="mt-4 space-y-3 text-sm text-zinc-300">
              <div className="rounded-xl border border-steelBorder bg-black/30 p-3">
                Photograph item, signature, COA, storage, and display condition.
              </div>
              <div className="rounded-xl border border-steelBorder bg-black/30 p-3">
                Mark high-value items as insurance candidates.
              </div>
              <div className="rounded-xl border border-steelBorder bg-black/30 p-3">
                Keep purchase records and authentication numbers connected to reports.
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <Panel className="mt-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black">Memorabilia Documentation Checklist</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Use this checklist before adding an item to insurance or sale reports.
            </p>
          </div>

          <span className="rounded-full border border-vaultGold/40 bg-vaultGold/10 px-3 py-1 text-xs font-bold text-vaultGold">
            Phase 1 Ready
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <ChecklistItem done label="Front photo" />
          <ChecklistItem done label="Signature close-up" />
          <ChecklistItem done label="COA number" />
          <ChecklistItem done label="Storage location" />
          <ChecklistItem label="Purchase receipt" />
          <ChecklistItem label="Insurance value" />
          <ChecklistItem label="Display condition" />
          <ChecklistItem label="Report export" />
        </div>
      </Panel>
    </>
  );
}

function MemorabiliaReportPreview({ memorabiliaItems }: { memorabiliaItems: any[] }) {
  const reportLogo = "/cargemz-report-logo.png";

  const selectedItem =
    memorabiliaItems && memorabiliaItems.length > 0
      ? memorabiliaItems[0]
      : {
          id: "sample-memorabilia-report",
          itemTitle: "Tim Duncan Game-Used Signed Jersey",
          itemType: "Game-Used Jersey",
          athlete: "Tim Duncan",
          team: "San Antonio Spurs",
          sport: "Basketball",
          brand: "Nike",
          eraSeason: "1999-2000",
          sku: "MEM-TD-001",
          inventoryNumber: "TD-JSY-1999-00",
          purchaseDate: "TBD",
          purchasePrice: 1250,
          estimatedValue: 2800,
          condition: "GU 7.5",
          storageLocation: "Personal Collection Vault",
          status: "Authenticated / Insurance Ready",
          decision: "Hold / Insure",
          authenticationStatus: "Verified",
          authenticationCompany: "Vintage Authentics / JSA / PSA-DNA",
          authenticationType: "Letter of Authenticity",
          certificateNumber: "TBD",
          submissionNumber: "TBD",
          authenticationDate: "TBD",
          authenticatedSignature: "Tim Duncan",
          signatureLocation: "Jersey number / fabric panel",
          writingInstrument: "Black marker",
          verificationStatus: "Verified",
          authenticationComments:
            "Authentication documentation, signature characteristics, item identifiers, provenance notes, and supporting photos should be reviewed and stored with this report. This section is designed to summarize the signature verification and authentication basis for the memorabilia item.",
          overallCondition: "8.5/10",
          signatureQuality: "9/10",
          itemWear: "Game Used",
          displayQuality: "Excellent",
          authenticationConfidence: "High",
          provenanceStrength: "Strong",
          lastSale: 2100,
          thirtyDayAverage: 2400,
          highComp: 3100,
          lowComp: 1850,
          marketConfidence: "Medium / High",
          collectionDecision:
            "This authenticated memorabilia item is recommended for long-term hold and insurance documentation due to authentication strength, player significance, and collector value.",
          imageFront: "",
          imageBack: "",
          imageDetail: "",
        };

  const formatCurrency = (value: number | string | undefined | null) => {
    const numericValue =
      typeof value === "number"
        ? value
        : Number(String(value || "0").replace(/[^0-9.-]+/g, ""));

    if (Number.isNaN(numericValue)) return "$0";

    return numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const getItemValue = (field: string, fallback = "TBD") => {
    return selectedItem?.[field] || fallback;
  };

  const getImageSource = (field: string) => {
    return (
      selectedItem?.[field] ||
      selectedItem?.images?.[field] ||
      selectedItem?.photos?.[field] ||
      ""
    );
  };

  const frontImage = getImageSource("imageFront");
  const backImage = getImageSource("imageBack");
  const detailImage = getImageSource("imageDetail");

  return (
    <div className="memorabilia-report-page">
      <div className="memorabilia-report-watermark" aria-hidden="true">
        <img src={reportLogo} alt="" />
      </div>

      <div className="memorabilia-report-content">
        <header className="memorabilia-report-header">
          <div className="memorabilia-report-brand">
            <div className="memorabilia-report-logo-box">
              <img
                src="/cardgemz-main-logo.png"
                alt="CARDGEMZ"
                className="memorabilia-report-logo"
              />
            </div>

            <p className="memorabilia-report-brand-name">
              CARDVAULT <span>PRO</span>
            </p>
          </div>

          <div className="memorabilia-report-type">Memorabilia Report</div>
        </header>

        <section className="memorabilia-report-title-block">
          <h1>{getItemValue("itemTitle", "Memorabilia Evaluation Report")}</h1>
          <p>
            Personal Memorabilia Evaluation |{" "}
            {new Date().toLocaleDateString()}
          </p>
        </section>

        <section className="memorabilia-report-kpi-strip">
          <div className="memorabilia-report-kpi">
            <p>Purchase Price</p>
            <h2>{formatCurrency(selectedItem.purchasePrice)}</h2>
          </div>

          <div className="memorabilia-report-kpi">
            <p>Est. Value</p>
            <h2>{formatCurrency(selectedItem.estimatedValue)}</h2>
          </div>

          <div className="memorabilia-report-kpi">
            <p>Auth Status</p>
            <h2>{getItemValue("authenticationStatus", "Pending")}</h2>
          </div>

          <div className="memorabilia-report-kpi">
            <p>Condition</p>
            <h2>{getItemValue("condition", "Review")}</h2>
          </div>

          <div className="memorabilia-report-kpi">
            <p>Decision</p>
            <h2>{getItemValue("decision", "Review")}</h2>
          </div>
        </section>

        <section className="memorabilia-report-grid memorabilia-report-main-grid">
          <div className="memorabilia-report-card">
            <div className="memorabilia-report-card-title">
              Memorabilia Profile
            </div>

            <div className="memorabilia-report-field-grid">
              <div>
                <strong>Item Type:</strong>
                <span>{getItemValue("itemType")}</span>
              </div>

              <div>
                <strong>Athlete:</strong>
                <span>{getItemValue("athlete")}</span>
              </div>

              <div>
                <strong>Team:</strong>
                <span>{getItemValue("team")}</span>
              </div>

              <div>
                <strong>Sport:</strong>
                <span>{getItemValue("sport")}</span>
              </div>

              <div>
                <strong>Brand / Manufacturer:</strong>
                <span>{getItemValue("brand")}</span>
              </div>

              <div>
                <strong>Era / Season:</strong>
                <span>{getItemValue("eraSeason")}</span>
              </div>

              <div>
                <strong>SKU:</strong>
                <span>{getItemValue("sku")}</span>
              </div>

              <div>
                <strong>Inventory #:</strong>
                <span>{getItemValue("inventoryNumber")}</span>
              </div>

              <div>
                <strong>Purchase Date:</strong>
                <span>{getItemValue("purchaseDate")}</span>
              </div>

              <div>
                <strong>Purchase Price:</strong>
                <span>{formatCurrency(selectedItem.purchasePrice)}</span>
              </div>

              <div>
                <strong>Condition:</strong>
                <span>{getItemValue("condition")}</span>
              </div>

              <div>
                <strong>Storage Location:</strong>
                <span>{getItemValue("storageLocation")}</span>
              </div>

              <div>
                <strong>Status:</strong>
                <span>{getItemValue("status")}</span>
              </div>
            </div>
          </div>

          <div className="memorabilia-report-card">
            <div className="memorabilia-report-card-title">
              Memorabilia Images
            </div>

            <div className="memorabilia-report-image-grid">
              <div className="memorabilia-report-image-slot">
                <p>Front</p>
                {frontImage ? (
                  <img src={frontImage} alt="Memorabilia front" />
                ) : (
                  <span>Front Image Insert</span>
                )}
              </div>

              <div className="memorabilia-report-image-slot">
                <p>Back</p>
                {backImage ? (
                  <img src={backImage} alt="Memorabilia back" />
                ) : (
                  <span>Back Image Insert</span>
                )}
              </div>

              <div className="memorabilia-report-image-slot">
                <p>Signature / COA / Detail</p>
                {detailImage ? (
                  <img src={detailImage} alt="Signature, COA, or detail" />
                ) : (
                  <span>Signature / COA Insert</span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="memorabilia-report-card memorabilia-report-auth-card">
          <div className="memorabilia-report-card-title">
            Signature Authentication / Verification
          </div>

          <div className="memorabilia-report-auth-grid">
            <div>
              <strong>Authentication Company:</strong>
              <span>{getItemValue("authenticationCompany")}</span>
            </div>

            <div>
              <strong>Authentication Type:</strong>
              <span>{getItemValue("authenticationType")}</span>
            </div>

            <div>
              <strong>Certificate Number:</strong>
              <span>{getItemValue("certificateNumber")}</span>
            </div>

            <div>
              <strong>Submission Number:</strong>
              <span>{getItemValue("submissionNumber")}</span>
            </div>

            <div>
              <strong>Authentication Date:</strong>
              <span>{getItemValue("authenticationDate")}</span>
            </div>

            <div>
              <strong>Authenticated Signature:</strong>
              <span>{getItemValue("authenticatedSignature")}</span>
            </div>

            <div>
              <strong>Signature Location:</strong>
              <span>{getItemValue("signatureLocation")}</span>
            </div>

            <div>
              <strong>Writing Instrument:</strong>
              <span>{getItemValue("writingInstrument")}</span>
            </div>

            <div>
              <strong>Verification Status:</strong>
              <span>{getItemValue("verificationStatus")}</span>
            </div>
          </div>

          <div className="memorabilia-report-auth-comments">
            <strong>Authentication Comments / Verification Notes</strong>
            <p>{getItemValue("authenticationComments")}</p>
          </div>
        </section>

        <section className="memorabilia-report-grid memorabilia-report-secondary-grid">
          <div className="memorabilia-report-card">
            <div className="memorabilia-report-card-title">
              Condition / Evaluation
            </div>

            <div className="memorabilia-report-score-grid">
              <div>
                <p>Overall Condition</p>
                <strong>{getItemValue("overallCondition")}</strong>
              </div>

              <div>
                <p>Signature Quality</p>
                <strong>{getItemValue("signatureQuality")}</strong>
              </div>

              <div>
                <p>Wear / Use</p>
                <strong>{getItemValue("itemWear")}</strong>
              </div>

              <div>
                <p>Display Quality</p>
                <strong>{getItemValue("displayQuality")}</strong>
              </div>

              <div>
                <p>Auth Confidence</p>
                <strong>{getItemValue("authenticationConfidence")}</strong>
              </div>

              <div>
                <p>Provenance Strength</p>
                <strong>{getItemValue("provenanceStrength")}</strong>
              </div>
            </div>
          </div>

          <div className="memorabilia-report-card">
            <div className="memorabilia-report-card-title">
              Market Valuation
            </div>

            <div className="memorabilia-report-market-list">
              <div>
                <span>Last Sale</span>
                <strong>{formatCurrency(selectedItem.lastSale)}</strong>
              </div>

              <div>
                <span>30-Day Average</span>
                <strong>{formatCurrency(selectedItem.thirtyDayAverage)}</strong>
              </div>

              <div>
                <span>High Comp</span>
                <strong>{formatCurrency(selectedItem.highComp)}</strong>
              </div>

              <div>
                <span>Low Comp</span>
                <strong>{formatCurrency(selectedItem.lowComp)}</strong>
              </div>

              <div>
                <span>Market Confidence</span>
                <strong>{getItemValue("marketConfidence")}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="memorabilia-report-card memorabilia-report-decision-card">
          <div className="memorabilia-report-card-title">
            Collection / Insurance Decision
          </div>

          <p>{getItemValue("collectionDecision")}</p>
        </section>

        <footer className="memorabilia-report-footer">
          CARDVAULT PRO by CARDGEMZ · Memorabilia Report · Authentication,
          provenance, and insurance documentation support
        </footer>
      </div>
    </div>
  );
}

function GradingFormsReportPreview({
  cards,
  selectedCompany = "PSA",
}: {
  cards: CardRecord[];
  selectedCompany?: "PSA" | "BGS" | "SGC" | "CGC" | "TAG";
}) {
  const reportLogo = "/cargemz-report-logo.png";
  const headerLogo = "/cardgemz-main-logo.png";

  const gradingCompanyDetails: Record<
    "PSA" | "BGS" | "SGC" | "CGC" | "TAG",
    {
      displayName: string;
      formTitle: string;
      serviceFocus: string;
      submissionReminder: string;
      checklist: string[];
    }
  > = {
    PSA: {
      displayName: "PSA",
      formTitle: "PSA Grading Prep Sheet",
      serviceFocus: "Market-standard sports card grading submission prep.",
      submissionReminder:
        "Complete the official PSA online submission process before shipping.",
      checklist: [
        "Confirm card list matches the official PSA submission order.",
        "Place each card in a card saver or approved semi-rigid holder.",
        "Label package contents according to the official submission order.",
        "Include printed official submission paperwork if required.",
      ],
    },
    BGS: {
      displayName: "BGS / Beckett",
      formTitle: "BGS / Beckett Grading Prep Sheet",
      serviceFocus:
        "Premium grading prep for subgrades, autographs, and modern cards.",
      submissionReminder:
        "Complete the official Beckett submission process before shipping.",
      checklist: [
        "Confirm whether subgrades or autograph authentication are requested.",
        "Review declared value and service level before packaging.",
        "Place cards in submission order with protection between cards.",
        "Keep a copy of this prep sheet with your shipping records.",
      ],
    },
    SGC: {
      displayName: "SGC",
      formTitle: "SGC Grading Prep Sheet",
      serviceFocus:
        "Clean submission prep for vintage, modern, and quick-turn grading.",
      submissionReminder:
        "Complete the official SGC submission process before shipping.",
      checklist: [
        "Confirm card count and service level before sealing package.",
        "Use secure card savers or approved submission holders.",
        "Separate high-value cards and mark them clearly in your records.",
        "Retain photos of each card before shipment.",
      ],
    },
    CGC: {
      displayName: "CGC Cards",
      formTitle: "CGC Cards Grading Prep Sheet",
      serviceFocus:
        "Submission prep for sports cards, TCG, and non-sports cards.",
      submissionReminder:
        "Complete the official CGC Cards online submission process before shipping.",
      checklist: [
        "Confirm category, service tier, and declared value.",
        "Separate sports, TCG, and non-sports cards if needed.",
        "Place cards in the same order as the official submission.",
        "Keep tracking and insurance records with this prep sheet.",
      ],
    },
    TAG: {
      displayName: "TAG",
      formTitle: "TAG Grading Prep Sheet",
      serviceFocus:
        "Tech-forward grading prep with transparent reporting workflow.",
      submissionReminder:
        "Complete the official TAG submission process before shipping.",
      checklist: [
        "Confirm selected TAG service level before preparing shipment.",
        "Keep cards in the order listed on the official submission.",
        "Photograph front and back of each card before packing.",
        "Save this prep sheet with shipping and tracking records.",
      ],
    },
  };

  const company = gradingCompanyDetails[selectedCompany];

  const formatCurrency = (value: number | string | undefined | null) => {
    const numericValue =
      typeof value === "number"
        ? value
        : Number(String(value || "0").replace(/[^0-9.-]+/g, ""));

    if (Number.isNaN(numericValue)) return "$0";

    return numericValue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const getCardTitle = (card: CardRecord) => {
    const year = card.year ? `${card.year} ` : "";
    const brand = card.brand || card.set || "";
    const cardNumber = card.cardNumber ? ` #${card.cardNumber}` : "";

    return `${year}${brand}${cardNumber}`.trim() || "Card details pending";
  };

  const getDeclaredValue = (card: CardRecord) => {
    return (
      card.estimatedValue ||
      card.averageComp ||
      card.lastSale ||
      card.purchasePrice ||
      0
    );
  };

  const getRequestedService = (card: CardRecord) => {
    const declaredValue = Number(getDeclaredValue(card));

    if (declaredValue >= 2500) return "High Value / Premium";
    if (declaredValue >= 1000) return "Express / Review";
    if (declaredValue >= 250) return "Standard";
    return "Value / Bulk";
  };

  const submissionCards = [...cards]
    .slice(0, 18)
    .map((card, index) => ({
      ...card,
      submissionNumber: index + 1,
    }));

  const totalDeclaredValue = submissionCards.reduce((sum, card) => {
    const value = Number(getDeclaredValue(card));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const rawCards = submissionCards.filter((card) =>
    String(card.grade || "").toLowerCase().includes("raw")
  ).length;

  const autographs = submissionCards.filter((card) => {
    const notes = String(card.notes || "").toLowerCase();
    const parallel = String(card.parallel || "").toLowerCase();

    return (
      notes.includes("auto") ||
      notes.includes("autograph") ||
      parallel.includes("auto") ||
      parallel.includes("autograph")
    );
  }).length;

  return (
    <div className="grading-form-page">
      <div className="grading-form-watermark" aria-hidden="true">
        <img src={reportLogo} alt="" />
      </div>

      <div className="grading-form-content">
        <header className="grading-form-header">
          <div className="grading-form-brand">
            <img
              src={headerLogo}
              alt="CARDGEMZ"
              className="grading-form-logo"
            />

            <div>
              <p className="grading-form-brand-name">
                CARDVAULT <span>PRO</span>
              </p>
              <p className="grading-form-kicker">
                Grading Submission Prep Center
              </p>
            </div>
          </div>

          <div className="grading-form-company-badge">
            {company.displayName}
          </div>
        </header>

        <section className="grading-form-title-block">
          <h1>{company.formTitle}</h1>
          <p>
            Printable grading submission prep worksheet | Generated{" "}
            {new Date().toLocaleDateString()}
          </p>
        </section>

        <section className="grading-form-kpi-row">
          <div className="grading-form-kpi">
            <p>Selected Company</p>
            <h2>{company.displayName}</h2>
          </div>

          <div className="grading-form-kpi">
            <p>Cards Listed</p>
            <h2>{submissionCards.length}</h2>
          </div>

          <div className="grading-form-kpi">
            <p>Declared Value</p>
            <h2>{formatCurrency(totalDeclaredValue)}</h2>
          </div>

          <div className="grading-form-kpi">
            <p>Raw Cards</p>
            <h2>{rawCards}</h2>
          </div>

          <div className="grading-form-kpi">
            <p>Auto Review</p>
            <h2>{autographs}</h2>
          </div>
        </section>

        <section className="grading-form-info-grid">
          <div className="grading-form-card">
            <div className="grading-form-card-title">Submitter Information</div>

            <div className="grading-form-fields">
              <p>Name: ____________________________________________</p>
              <p>Email: ___________________________________________</p>
              <p>Phone: __________________________________________</p>
              <p>Account / Submission #: __________________________</p>
              <p>Return Address: _________________________________</p>
              <p>City / State / ZIP: ______________________________</p>
            </div>
          </div>

          <div className="grading-form-card">
            <div className="grading-form-card-title">Submission Details</div>

            <div className="grading-form-fields">
              <p>Grading Company: {company.displayName}</p>
              <p>Service Focus: {company.serviceFocus}</p>
              <p>Requested Service Level: _________________________</p>
              <p>Return Shipping Method: _________________________</p>
              <p>Package Insurance Amount: _______________________</p>
              <p>Payment / Order Reference: ______________________</p>
            </div>
          </div>
        </section>

        <section className="grading-form-table-card">
          <div className="grading-form-card-title">
            Card Submission Inventory
          </div>

          <table className="grading-form-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Card Details</th>
                <th>Current Grade</th>
                <th>Declared Value</th>
                <th>Service</th>
                <th>Auto?</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {submissionCards.length > 0 ? (
                submissionCards.map((card) => {
                  const notes = String(card.notes || "").toLowerCase();
                  const parallel = String(card.parallel || "").toLowerCase();

                  const hasAuto =
                    notes.includes("auto") ||
                    notes.includes("autograph") ||
                    parallel.includes("auto") ||
                    parallel.includes("autograph");

                  return (
                    <tr key={card.id || card.submissionNumber}>
                      <td>{card.submissionNumber}</td>

                      <td>
                        <strong>{card.player || "Unknown Player"}</strong>
                        <span>{card.team || card.sport || ""}</span>
                      </td>

                      <td>
                        <strong>{getCardTitle(card)}</strong>
                        <span>{card.parallel || card.set || ""}</span>
                      </td>

                      <td>{card.grade || "Raw"}</td>

                      <td>
                        <strong>{formatCurrency(getDeclaredValue(card))}</strong>
                      </td>

                      <td>{getRequestedService(card)}</td>

                      <td>{hasAuto ? "Yes" : "No"}</td>

                      <td>
                        {card.notes ||
                          "Inspect corners, surface, centering, and edges before packing."}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>________________</td>
                      <td>________________________________</td>
                      <td>Raw</td>
                      <td>$________</td>
                      <td>________</td>
                      <td>Yes / No</td>
                      <td>________________________</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </section>

        <section className="grading-form-bottom-grid">
          <div className="grading-form-card">
            <div className="grading-form-card-title">Packing Checklist</div>

            <ul className="grading-form-checklist">
              {company.checklist.map((item) => (
                <li key={item}>□ {item}</li>
              ))}
              <li>□ Photograph all cards before shipment.</li>
              <li>□ Save tracking number and shipping receipt.</li>
              <li>□ Confirm declared value matches shipment insurance.</li>
            </ul>
          </div>

          <div className="grading-form-card">
            <div className="grading-form-card-title">
              Official Submission Reminder
            </div>

            <p className="grading-form-reminder">{company.submissionReminder}</p>

            <div className="grading-form-signature-box">
              <p>Prepared By: _________________________________</p>
              <p>Date: ________________________________________</p>
              <p>Tracking #: __________________________________</p>
              <p>Package Count: _______________________________</p>
            </div>
          </div>
        </section>

        <footer className="grading-form-footer">
          CardVault Pro Grading Prep Sheet. This is not an official grading
          company submission form. Complete the official submission process
          directly with the selected grading company before shipping cards.
        </footer>
      </div>
    </div>
  );
}

function SalesReportPreview({
  cards,
  sales,
  selectedYear = "2026",
  selectedQuarter = "All Quarters",
  selectedMonth = "All Months",
}: {
  cards: CardRecord[];
  sales: SaleRecord[];
  selectedYear?: string;
  selectedQuarter?: string;
  selectedMonth?: string;
}) {
  const reportLogo = "/cargemz-report-logo.png";
  const headerLogo = "/cardgemz-main-logo.png";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const quarterMonthMap: Record<string, string[]> = {
    Q1: ["Jan", "Feb", "Mar"],
    Q2: ["Apr", "May", "Jun"],
    Q3: ["Jul", "Aug", "Sep"],
    Q4: ["Oct", "Nov", "Dec"],
  };

  const visibleMonths =
    selectedMonth !== "All Months"
      ? [selectedMonth]
      : selectedQuarter !== "All Quarters"
      ? quarterMonthMap[selectedQuarter] || months
      : months;

  const reportPeriod =
    selectedMonth !== "All Months"
      ? `${selectedMonth} ${selectedYear}`
      : selectedQuarter !== "All Quarters"
      ? `${selectedQuarter} ${selectedYear}`
      : `Full Year ${selectedYear}`;

  const monthIndexes = visibleMonths
    .map((month) => months.indexOf(month))
    .filter((index) => index >= 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  const getSaleDate = (saleDate: string) => {
    const date = new Date(`${saleDate}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const getSaleMonthIndex = (saleDate: string) => {
    const date = getSaleDate(saleDate);
    return date ? date.getMonth() : -1;
  };

  const getSaleYear = (saleDate: string) => {
    const date = getSaleDate(saleDate);
    return date ? String(date.getFullYear()) : "";
  };

  const normalizePlatformName = (platform: string) => {
    const cleanPlatform = platform.trim();

    if (!cleanPlatform) return "Other Sales";

    const lower = cleanPlatform.toLowerCase();

    if (lower.includes("ebay")) return "eBay Sales";
    if (lower.includes("whatnot")) return "Whatnot Sales";
    if (lower.includes("show")) return "Card Show Sales";
    if (lower.includes("direct")) return "Direct Sales";
    if (lower.includes("break")) return "Break Sales";

    return `${cleanPlatform} Sales`;
  };

  const getChannelIcon = (channelName: string) => {
    if (channelName.includes("eBay")) return "◼";
    if (channelName.includes("Card Show")) return "▣";
    if (channelName.includes("Whatnot")) return "●";
    if (channelName.includes("Direct")) return "◆";
    if (channelName.includes("Break")) return "▲";
    return "◇";
  };

  const salesForSelectedYear = sales.filter(
    (sale) => getSaleYear(sale.saleDate) === selectedYear
  );

  const filteredSales = salesForSelectedYear.filter((sale) => {
    const monthIndex = getSaleMonthIndex(sale.saleDate);
    return monthIndexes.includes(monthIndex);
  });

  const baseChannelNames = [
    "eBay Sales",
    "Card Show Sales",
    "Whatnot Sales",
    "Direct Sales",
    "Break Sales",
  ];

  const dynamicChannelNames = Array.from(
    new Set(
      salesForSelectedYear.map((sale) => normalizePlatformName(sale.platform))
    )
  );

  const channelNames = Array.from(
    new Set([...baseChannelNames, ...dynamicChannelNames])
  );

  const salesChannels = channelNames.map((channelName) => {
    const revenue = months.map((_, monthIndex) =>
      salesForSelectedYear
        .filter(
          (sale) =>
            normalizePlatformName(sale.platform) === channelName &&
            getSaleMonthIndex(sale.saleDate) === monthIndex
        )
        .reduce((sum, sale) => sum + sale.salePrice, 0)
    );

    const grossProfit = months.map((_, monthIndex) =>
      salesForSelectedYear
        .filter(
          (sale) =>
            normalizePlatformName(sale.platform) === channelName &&
            getSaleMonthIndex(sale.saleDate) === monthIndex
        )
        .reduce((sum, sale) => sum + sale.profitLoss, 0)
    );

    const margin = months.map((_, monthIndex) => {
      const monthlyRevenue = revenue[monthIndex] || 0;
      const monthlyProfit = grossProfit[monthIndex] || 0;

      return monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;
    });

    return {
      name: channelName,
      icon: getChannelIcon(channelName),
      revenue,
      grossProfit,
      margin,
    };
  });

  const sumByVisibleMonths = (values: number[]) =>
    monthIndexes.reduce((sum, index) => sum + (values[index] || 0), 0);

  const averageByVisibleMonths = (values: number[]) => {
    const activeValues = monthIndexes
      .map((index) => values[index] || 0)
      .filter((value) => value > 0);

    if (activeValues.length === 0) return 0;

    return (
      activeValues.reduce((sum, value) => sum + value, 0) / activeValues.length
    );
  };

  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.salePrice,
    0
  );

  const totalGrossProfit = filteredSales.reduce(
    (sum, sale) => sum + sale.profitLoss,
    0
  );

  const totalUnitsSold = filteredSales.length;

  const totalFees = filteredSales.reduce((sum, sale) => sum + sale.fees, 0);

  const totalShipping = filteredSales.reduce(
    (sum, sale) => sum + sale.shippingCost,
    0
  );

  const totalTaxes = filteredSales.reduce((sum, sale) => sum + sale.taxes, 0);

  const totalCosts = totalFees + totalShipping + totalTaxes;

  const netProceeds = filteredSales.reduce(
    (sum, sale) => sum + sale.netProceeds,
    0
  );

  const averageMargin =
    totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;

  const priorPeriodRevenue = 0;

  const revenueGrowth =
    priorPeriodRevenue > 0
      ? ((totalRevenue - priorPeriodRevenue) / priorPeriodRevenue) * 100
      : 0;

  const vaultCardsTracked = cards.length;

  const renderMonthHeaders = (finalColumnLabel: string) => (
    <>
      <th>Channel</th>
      {visibleMonths.map((month) => (
        <th key={month}>{month}</th>
      ))}
      <th>{finalColumnLabel}</th>
    </>
  );

  const renderRevenueTable = () => (
    <section className="sales-report-table-card">
      <div className="sales-report-section-title">
        <span>▮</span>
        Sales Summary
      </div>

      <table className="sales-report-table">
        <thead>
          <tr>{renderMonthHeaders("Total")}</tr>
        </thead>

        <tbody>
          {salesChannels.map((channel) => (
            <tr key={channel.name}>
              <td className="sales-report-row-label">
                <span>{channel.icon}</span>
                {channel.name}
              </td>

              {monthIndexes.map((monthIndex) => (
                <td key={monthIndex}>
                  {formatCurrency(channel.revenue[monthIndex])}
                </td>
              ))}

              <td className="sales-report-total-cell">
                {formatCurrency(sumByVisibleMonths(channel.revenue))}
              </td>
            </tr>
          ))}

          <tr className="sales-report-total-row">
            <td>Total Revenue</td>
            {monthIndexes.map((monthIndex) => {
              const monthlyTotal = salesChannels.reduce(
                (sum, channel) => sum + channel.revenue[monthIndex],
                0
              );

              return <td key={monthIndex}>{formatCurrency(monthlyTotal)}</td>;
            })}
            <td>{formatCurrency(totalRevenue)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );

  const renderMarginTable = () => (
    <section className="sales-report-table-card">
      <div className="sales-report-section-title">
        <span>%</span>
        Average Margin Per Sale
      </div>

      <table className="sales-report-table">
        <thead>
          <tr>{renderMonthHeaders("Avg")}</tr>
        </thead>

        <tbody>
          {salesChannels.map((channel) => (
            <tr key={channel.name}>
              <td className="sales-report-row-label">
                <span>{channel.icon}</span>
                {channel.name}
              </td>

              {monthIndexes.map((monthIndex) => (
                <td key={monthIndex}>
                  {formatPercent(channel.margin[monthIndex])}
                </td>
              ))}

              <td className="sales-report-total-cell">
                {formatPercent(averageByVisibleMonths(channel.margin))}
              </td>
            </tr>
          ))}

          <tr className="sales-report-total-row">
            <td>Overall Avg Margin</td>
            {monthIndexes.map((monthIndex) => {
              const monthlyRevenue = salesChannels.reduce(
                (sum, channel) => sum + channel.revenue[monthIndex],
                0
              );

              const monthlyProfit = salesChannels.reduce(
                (sum, channel) => sum + channel.grossProfit[monthIndex],
                0
              );

              const monthlyMargin =
                monthlyRevenue > 0 ? (monthlyProfit / monthlyRevenue) * 100 : 0;

              return <td key={monthIndex}>{formatPercent(monthlyMargin)}</td>;
            })}
            <td>{formatPercent(averageMargin)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );

  const renderProfitTable = () => (
    <section className="sales-report-table-card">
      <div className="sales-report-section-title">
        <span>$</span>
        Gross Profit
      </div>

      <table className="sales-report-table">
        <thead>
          <tr>{renderMonthHeaders("Total")}</tr>
        </thead>

        <tbody>
          {salesChannels.map((channel) => (
            <tr key={channel.name}>
              <td className="sales-report-row-label">
                <span>{channel.icon}</span>
                {channel.name}
              </td>

              {monthIndexes.map((monthIndex) => (
                <td key={monthIndex}>
                  {formatCurrency(channel.grossProfit[monthIndex])}
                </td>
              ))}

              <td className="sales-report-total-cell">
                {formatCurrency(sumByVisibleMonths(channel.grossProfit))}
              </td>
            </tr>
          ))}

          <tr className="sales-report-total-row">
            <td>Total Gross Profit</td>
            {monthIndexes.map((monthIndex) => {
              const monthlyProfit = salesChannels.reduce(
                (sum, channel) => sum + channel.grossProfit[monthIndex],
                0
              );

              return <td key={monthIndex}>{formatCurrency(monthlyProfit)}</td>;
            })}
            <td>{formatCurrency(totalGrossProfit)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );

  return (
    <div className="sales-report-page">
      <div className="sales-report-watermark" aria-hidden="true">
        <img src={reportLogo} alt="" />
      </div>

      <div className="sales-report-content">
        <header className="sales-report-header">
          <div className="sales-report-brand">
            <img
              src={headerLogo}
              alt="CARDGEMZ"
              className="sales-report-logo"
            />

            <p>
              CARDVAULT <span>PRO</span>
            </p>
          </div>

          <div className="sales-report-type">Sales Report</div>
        </header>

        <section className="sales-report-title-block">
          <h1>Sales Report</h1>
          <p>Sales Performance Summary | {reportPeriod}</p>
        </section>

        {filteredSales.length === 0 && (
          <section className="sales-report-table-card">
            <div className="sales-report-section-title">
              <span>◇</span>
              No Sales Recorded
            </div>
            <p>
              No closed sales are recorded for {reportPeriod}. Add sales through
              the Sales Tracker to populate this report.
            </p>
          </section>
        )}

        <section className="sales-report-kpi-row">
          <div className="sales-report-kpi">
            <p>Gross Profit</p>
            <span>●</span>
            <h2>{formatCurrency(totalGrossProfit)}</h2>
          </div>

          <div className="sales-report-kpi">
            <p>Revenue</p>
            <span>▰</span>
            <h2>{formatCurrency(totalRevenue)}</h2>
          </div>

          <div className="sales-report-kpi">
            <p>Units Sold</p>
            <span>◇</span>
            <h2>{totalUnitsSold.toLocaleString()}</h2>
          </div>

          <div className="sales-report-kpi">
            <p>Total Fees</p>
            <span>▤</span>
            <h2>{formatCurrency(totalFees)}</h2>
          </div>

          <div className="sales-report-kpi">
            <p>Net Proceeds</p>
            <span>▰</span>
            <h2>{formatCurrency(netProceeds)}</h2>
          </div>

          <div className="sales-report-chart-card">
            <p>Revenue vs Gross Profit</p>

            <div className="sales-report-bar-chart">
              <div className="sales-report-chart-axis">
                <span>$100K</span>
                <span>$75K</span>
                <span>$50K</span>
                <span>$25K</span>
                <span>$0</span>
              </div>

              <div className="sales-report-bars">
                <div className="sales-report-bar-group">
                  <strong>{formatCurrency(totalRevenue)}</strong>
                  <div
                    className="sales-report-bar sales-report-bar-revenue"
                    style={{
                      height: `${
                        totalRevenue > 0
                          ? Math.min(
                              100,
                              Math.max(18, (totalRevenue / 100000) * 100)
                            )
                          : 18
                      }%`,
                    }}
                  />
                  <span>Revenue</span>
                </div>

                <div className="sales-report-bar-group">
                  <strong>{formatCurrency(totalGrossProfit)}</strong>
                  <div
                    className="sales-report-bar sales-report-bar-profit"
                    style={{
                      height: `${
                        totalGrossProfit > 0
                          ? Math.min(
                              100,
                              Math.max(18, (totalGrossProfit / 100000) * 100)
                            )
                          : 18
                      }%`,
                    }}
                  />
                  <span>Gross Profit</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sales-report-body-grid">
          <aside className="sales-report-side-panel">
            <div>
              <span>↗</span>
              <p>Revenue Growth</p>
              <h2>{revenueGrowth >= 0 ? "+" : ""}{formatPercent(revenueGrowth)}</h2>
              <small>vs prior period</small>
            </div>

            <div>
              <span>%</span>
              <p>Avg Margin</p>
              <h2>{formatPercent(averageMargin)}</h2>
              <small>per sale</small>
            </div>

            <div>
              <span>$</span>
              <p>Total Costs</p>
              <h2>{formatCurrency(totalCosts)}</h2>
              <small>fees, shipping, taxes</small>
            </div>
          </aside>

          <div className="sales-report-tables">
            {renderRevenueTable()}
            {renderMarginTable()}
            {renderProfitTable()}
          </div>
        </section>

        <footer className="sales-report-footer">
          <div className="sales-report-footer-note">
            <span>🏆</span>
            <div>
              <h3>Report Notes</h3>
              <p>
                Figures are based on closed sales, platform fees, shipping
                costs, taxes, cost basis, and reconciled sales activity for{" "}
                {reportPeriod}. Vault cards referenced: {vaultCardsTracked}.
              </p>
            </div>
          </div>

          <div className="sales-report-footer-brand">
            <span>◇</span>
            <div>
              <h3>CardVault Pro Reports Center</h3>
              <p>Data you trust. Profits you collect.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Reports({
  cards,
  sales,
  defaultReport = "myCollection",
}: {
  cards: CardRecord[];
  sales: SaleRecord[];
  defaultReport?:
    | "cardAnalysis"
    | "myCollection"
    | "gradingForms"
    | "memorabilia"
    | "sales";
}) {
  const [activeReport, setActiveReport] = useState<
    | "cardAnalysis"
    | "myCollection"
    | "gradingForms"
    | "memorabilia"
    | "sales"
  >(defaultReport);

  const [selectedPlayer, setSelectedPlayer] = useState("All Players");
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const [selectedGradingCompany, setSelectedGradingCompany] = useState<
    "PSA" | "BGS" | "SGC" | "CGC" | "TAG"
  >("PSA");

  const [selectedSalesYear, setSelectedSalesYear] = useState("2026");
  const [selectedSalesQuarter, setSelectedSalesQuarter] =
    useState("All Quarters");
  const [selectedSalesMonth, setSelectedSalesMonth] = useState("All Months");

  const [selectedCollectionColumns, setSelectedCollectionColumns] = useState<
    CollectionReportColumn[]
  >([
    "card",
    "player",
    "grade",
    "purchase",
    "estimatedValue",
    "gainLoss",
    "location",
  ]);

  const collectionReportColumnOptions: {
    id: CollectionReportColumn;
    label: string;
  }[] = [
    { id: "card", label: "Card / Variant" },
    { id: "player", label: "Player" },
    { id: "year", label: "Year" },
    { id: "brand", label: "Brand" },
    { id: "grade", label: "Grade" },
    { id: "purchase", label: "Purchase" },
    { id: "estimatedValue", label: "Estimated Value" },
    { id: "gainLoss", label: "Gain/Loss" },
    { id: "location", label: "Location" },
    { id: "status", label: "Status" },
    { id: "sku", label: "SKU" },
    { id: "serialNumber", label: "Serial #" },
    { id: "notes", label: "Notes" },
  ];

  const gradingCompanies: {
    id: "PSA" | "BGS" | "SGC" | "CGC" | "TAG";
    label: string;
    description: string;
  }[] = [
    {
      id: "PSA",
      label: "PSA",
      description: "Market-standard sports card grading submission prep.",
    },
    {
      id: "BGS",
      label: "BGS / Beckett",
      description: "Premium grading prep for subgrades, autos, and modern cards.",
    },
    {
      id: "SGC",
      label: "SGC",
      description: "Clean submission prep for vintage, modern, and quick-turn cards.",
    },
    {
      id: "CGC",
      label: "CGC Cards",
      description: "Submission prep for sports cards, TCG, and non-sports cards.",
    },
    {
      id: "TAG",
      label: "TAG",
      description: "Tech-forward grading prep with transparent reporting workflow.",
    },
  ];

  const salesYears = ["2024", "2025", "2026"];
  const salesQuarters = ["All Quarters", "Q1", "Q2", "Q3", "Q4"];
  const salesMonths = [
    "All Months",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function toggleCollectionColumn(column: CollectionReportColumn) {
    setSelectedCollectionColumns((currentColumns) => {
      if (currentColumns.includes(column)) {
        if (currentColumns.length === 1) return currentColumns;

        return currentColumns.filter(
          (currentColumn) => currentColumn !== column
        );
      }

      return [...currentColumns, column];
    });
  }

  const players = Array.from(new Set(cards.map((card) => card.player))).filter(
    Boolean
  );

  const sports = Array.from(new Set(cards.map((card) => card.sport))).filter(
    Boolean
  );

  const grades = Array.from(new Set(cards.map((card) => card.grade))).filter(
    Boolean
  );

  const statuses = Array.from(new Set(cards.map((card) => card.status))).filter(
    Boolean
  );

  const filteredCards = cards.filter((card) => {
    const matchesPlayer =
      selectedPlayer === "All Players" || card.player === selectedPlayer;

    const matchesSport =
      selectedSport === "All Sports" || card.sport === selectedSport;

    const matchesGrade =
      selectedGrade === "All Grades" || card.grade === selectedGrade;

    const matchesStatus =
      selectedStatus === "All Statuses" || card.status === selectedStatus;

    return matchesPlayer && matchesSport && matchesGrade && matchesStatus;
  });

  const primaryCard = filteredCards[0] || cards[0] || null;

  const activeGradingCompany =
    gradingCompanies.find((company) => company.id === selectedGradingCompany) ||
    gradingCompanies[0];

  const reportTabs: {
    id:
      | "cardAnalysis"
      | "myCollection"
      | "gradingForms"
      | "memorabilia"
      | "sales";
    title: string;
    description: string;
  }[] = [
    {
      id: "cardAnalysis",
      title: "Card Analysis Reports",
      description:
        "One-card inspection, grading, market, and sell/hold analysis.",
    },
    {
      id: "myCollection",
      title: "My Collection Report",
      description:
        "Printable inventory list for your full personal collection.",
    },
    {
      id: "gradingForms",
      title: "Grading Forms",
      description:
        "Printable grading submission prep sheets for PSA, BGS, SGC, CGC, and TAG.",
    },
    {
      id: "memorabilia",
      title: "Memorabilia Reports",
      description:
        "Authentication, signature verification, provenance, and memorabilia documentation.",
    },
    {
      id: "sales",
      title: "Sales & Profit Reports",
      description:
        "Revenue, gross profit, net proceeds, margins, fees, units sold, and platform performance by year, quarter, or month.",
    },
  ];

  const renderActiveReport = () => {
    if (activeReport === "myCollection") {
      return (
        <PlayerCollectionReportPreview
          cards={filteredCards}
          playerName={selectedPlayer}
          selectedColumns={selectedCollectionColumns}
        />
      );
    }

    if (activeReport === "cardAnalysis" && primaryCard) {
      return <CardAnalysisReportPreview card={primaryCard} />;
    }

    if (activeReport === "gradingForms") {
      return (
        <GradingFormsReportPreview
          cards={filteredCards}
          selectedCompany={selectedGradingCompany}
        />
      );
    }

    if (activeReport === "memorabilia") {
      return <MemorabiliaReportPreview memorabiliaItems={[]} />;
    }

if (activeReport === "sales") {
  return (
    <SalesReportPreview
       cards={cards}
       sales={sales}
       selectedYear={selectedSalesYear}
       selectedQuarter={selectedSalesQuarter}
       selectedMonth={selectedSalesMonth}
      />
    );
  }

    return null;
  };

  return (
    <>
      <div className="reports-screen-controls">
        <PageHero
          title="Reports Center"
          subtitle="Generate polished collection, grading, sales, memorabilia, and card analysis reports for CardVault Pro."
          actions={
            <>
              <HeroButton variant="black" onClick={() => window.print()}>
                Export PDF
              </HeroButton>

              <HeroButton variant="gold" onClick={() => window.print()}>
                Print Report
              </HeroButton>
            </>
          }
        />

        <div className="grid grid-cols-5 gap-4">
          {reportTabs.map((tab) => {
            const isActive = activeReport === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveReport(tab.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  isActive
                    ? "border-vaultGold bg-vaultGold/10 text-vaultGold shadow-vault"
                    : "border-steelBorder bg-graphite900/60 text-white hover:border-vaultGold/50"
                }`}
              >
                <h3 className="text-lg font-black">{tab.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>

        <Panel className="mt-6 mb-6">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-vaultGold">
            Report Parameters
          </p>

          <div className="grid grid-cols-4 gap-4">
            <label>
              <span className="mb-2 block text-xs font-black text-zinc-300">
                Select Player
              </span>
              <select
                value={selectedPlayer}
                onChange={(event) => setSelectedPlayer(event.target.value)}
                className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
              >
                <option>All Players</option>
                {players.map((player) => (
                  <option key={player}>{player}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-black text-zinc-300">
                Sport
              </span>
              <select
                value={selectedSport}
                onChange={(event) => setSelectedSport(event.target.value)}
                className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
              >
                <option>All Sports</option>
                {sports.map((sport) => (
                  <option key={sport}>{sport}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-black text-zinc-300">
                Grade
              </span>
              <select
                value={selectedGrade}
                onChange={(event) => setSelectedGrade(event.target.value)}
                className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
              >
                <option>All Grades</option>
                {grades.map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="mb-2 block text-xs font-black text-zinc-300">
                Status
              </span>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
                className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
              >
                <option>All Statuses</option>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
        </Panel>

        {activeReport === "gradingForms" && (
          <Panel className="mb-6">
            <div className="mb-5 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-vaultGold">
                  Grading Submission Prep
                </p>

                <h3 className="mt-2 text-2xl font-black text-white">
                  Choose Grading Company
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Generate a CardVault Pro grading prep sheet for your selected
                  grading company before completing the official submission
                  process.
                </p>
              </div>

              <div className="rounded-2xl border border-vaultGold/40 bg-vaultGold/10 px-5 py-4 text-right">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
                  Selected Company
                </p>
                <p className="mt-2 text-lg font-black text-white">
                  {activeGradingCompany.label}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {gradingCompanies.map((company) => {
                const isSelected = selectedGradingCompany === company.id;

                return (
                  <button
                    key={company.id}
                    onClick={() => setSelectedGradingCompany(company.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-vaultGold bg-vaultGold text-black shadow-vault"
                        : "border-steelBorder bg-black/40 text-zinc-300 hover:border-vaultGold/50 hover:text-vaultGold"
                    }`}
                  >
                    <p className="text-lg font-black">{company.label}</p>
                    <p
                      className={`mt-2 text-xs leading-5 ${
                        isSelected ? "text-black/70" : "text-zinc-400"
                      }`}
                    >
                      {company.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </Panel>
        )}

        {activeReport === "sales" && (
          <Panel className="mb-6">
            <div className="mb-5 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-vaultGold">
                  Sales Report Period
                </p>

                <h3 className="mt-2 text-2xl font-black text-white">
                  Choose Year, Quarter, or Month
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Generate sales performance by full year, quarter, or a single
                  month.
                </p>
              </div>

              <div className="rounded-2xl border border-vaultGold/40 bg-vaultGold/10 px-5 py-4 text-right">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
                  Active Period
                </p>
                <p className="mt-2 text-lg font-black text-white">
                  {selectedSalesMonth !== "All Months"
                    ? `${selectedSalesMonth} ${selectedSalesYear}`
                    : selectedSalesQuarter !== "All Quarters"
                    ? `${selectedSalesQuarter} ${selectedSalesYear}`
                    : `Full Year ${selectedSalesYear}`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label>
                <span className="mb-2 block text-xs font-black text-zinc-300">
                  Sales Year
                </span>
                <select
                  value={selectedSalesYear}
                  onChange={(event) => setSelectedSalesYear(event.target.value)}
                  className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
                >
                  {salesYears.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-2 block text-xs font-black text-zinc-300">
                  Sales Quarter
                </span>
                <select
                  value={selectedSalesQuarter}
                  onChange={(event) => {
                    setSelectedSalesQuarter(event.target.value);
                    setSelectedSalesMonth("All Months");
                  }}
                  className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
                >
                  {salesQuarters.map((quarter) => (
                    <option key={quarter}>{quarter}</option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-2 block text-xs font-black text-zinc-300">
                  Sales Month
                </span>
                <select
                  value={selectedSalesMonth}
                  onChange={(event) => {
                    setSelectedSalesMonth(event.target.value);
                    if (event.target.value !== "All Months") {
                      setSelectedSalesQuarter("All Quarters");
                    }
                  }}
                  className="w-full rounded-xl border border-steelBorder bg-black/50 px-4 py-3 text-sm font-bold text-white outline-none"
                >
                  {salesMonths.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
              </label>
            </div>
          </Panel>
        )}

        {activeReport === "myCollection" && (
          <Panel className="mb-6">
            <div className="mb-5 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.35em] text-vaultGold">
                  Report Builder
                </p>

                <h3 className="mt-2 text-2xl font-black text-white">
                  Choose Report Columns
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Select the fields you want included in this printable
                  collection report.
                </p>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  onClick={() =>
                    setSelectedCollectionColumns([
                      "card",
                      "player",
                      "grade",
                      "estimatedValue",
                      "location",
                    ])
                  }
                  className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-xs font-black text-zinc-300 hover:border-vaultGold/50 hover:text-vaultGold"
                >
                  Inventory Summary
                </button>

                <button
                  onClick={() =>
                    setSelectedCollectionColumns([
                      "card",
                      "player",
                      "purchase",
                      "estimatedValue",
                      "gainLoss",
                    ])
                  }
                  className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-xs font-black text-zinc-300 hover:border-vaultGold/50 hover:text-vaultGold"
                >
                  Financial Summary
                </button>

                <button
                  onClick={() =>
                    setSelectedCollectionColumns([
                      "card",
                      "player",
                      "year",
                      "brand",
                      "grade",
                      "status",
                      "sku",
                      "serialNumber",
                      "location",
                    ])
                  }
                  className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-xs font-black text-zinc-300 hover:border-vaultGold/50 hover:text-vaultGold"
                >
                  Tracking Summary
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {collectionReportColumnOptions.map((column) => {
                const isSelected = selectedCollectionColumns.includes(
                  column.id
                );

                return (
                  <button
                    key={column.id}
                    onClick={() => toggleCollectionColumn(column.id)}
                    className={`rounded-xl border px-4 py-3 text-left text-xs font-black transition ${
                      isSelected
                        ? "border-vaultGold bg-vaultGold text-black shadow-vault"
                        : "border-steelBorder bg-black/40 text-zinc-300 hover:border-vaultGold/50 hover:text-vaultGold"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {column.label}
                  </button>
                );
              })}
            </div>
          </Panel>
        )}
      </div>

      {cards.length === 0 && (
        <EmptyVaultState
          title="No Report Data Available"
          message="Add cards to your vault before generating reports."
          actionLabel="Add Card"
          onAction={() => undefined}
        />
      )}

      {cards.length > 0 && (
        <>
          <div className="screen-only report-preview-output rounded-3xl border border-steelBorder bg-white p-8 text-black shadow-vault">
            {renderActiveReport()}
          </div>

          <div className="print-only clean-print-report-output">
            {renderActiveReport()}
          </div>
        </>
      )}
    </>
  );
}

function PlayerCollectionReportPreview({
  cards,
  playerName,
  selectedColumns = [
    "card",
    "player",
    "grade",
    "purchase",
    "estimatedValue",
    "gainLoss",
    "location",
  ],
}: {
  cards: CardRecord[];
  playerName: string;
  selectedColumns?: CollectionReportColumn[];
}) {
  const reportTitle =
    playerName && playerName !== "All Players"
      ? `${playerName} Collection`
      : "All Players Collection";

  const reportDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value || 0);

  const activeColumns: CollectionReportColumn[] =
    selectedColumns.length > 0
      ? selectedColumns
      : [
          "card",
          "player",
          "grade",
          "purchase",
          "estimatedValue",
          "gainLoss",
          "location",
        ];

  const totalCards = cards.length;
  const totalValue = cards.reduce(
    (sum, card) => sum + (card.estimatedValue || 0),
    0
  );
  const totalPaid = cards.reduce(
    (sum, card) => sum + (card.purchasePrice || 0),
    0
  );
  const unrealizedGain = totalValue - totalPaid;
  const averageValue = totalCards > 0 ? totalValue / totalCards : 0;

  const columnLabels: Record<CollectionReportColumn, string> = {
    card: "Card / Variant",
    player: "Player",
    year: "Year",
    brand: "Brand",
    grade: "Grade",
    purchase: "Purchase",
    estimatedValue: "Est. Value",
    gainLoss: "Gain / Loss",
    location: "Location",
    status: "Status",
    sku: "SKU",
    serialNumber: "Serial #",
    notes: "Notes",
  };

  const renderCell = (
    card: CardRecord,
    column: CollectionReportColumn
  ): React.ReactNode => {
    switch (column) {
      case "card":
        return (
          <div className="print-card-cell">
            <div className="print-card-title">{card.card || "Untitled Card"}</div>
            {card.year || card.brand ? (
              <div className="print-card-subtitle">
                {[card.year, card.brand].filter(Boolean).join(" ")}
              </div>
            ) : null}
          </div>
        );

      case "player":
        return card.player || "-";

      case "year":
        return card.year || "-";

      case "brand":
        return card.brand || "-";

      case "grade":
        return card.grade || "-";

      case "purchase":
        return formatCurrency(card.purchasePrice || 0);

      case "estimatedValue":
        return (
          <span className="print-value-positive">
            {formatCurrency(card.estimatedValue || 0)}
          </span>
        );

      case "gainLoss": {
        const gain = (card.estimatedValue || 0) - (card.purchasePrice || 0);
        return (
          <span className={gain >= 0 ? "print-value-positive" : "print-value-negative"}>
            {formatCurrency(gain)}
          </span>
        );
      }

      case "location":
        return card.storageLocation || "-";

      case "status":
        return card.status || "-";

      case "sku":
        return card.sku || "-";

      case "serialNumber":
        return card.serialNumber || "-";

      case "notes":
        return card.notes || "-";

      default:
        return "-";
    }
  };

  return (
    <div className="collection-print-report">
      {/* Repeating header on every printed page */}
      <div className="print-page-header">
        <div className="print-page-header-inner">
          <div className="print-brand-left">
            <img
              src="/cardgemz-main-logo.png"
              alt="CARDGEMZ Vault Pro Logo"
              className="print-brand-logo"
            />
            <div className="print-brand-text">
              <div className="print-brand-title">CARDGEMZ VAULT PRO</div>
            </div>
          </div>

          <div className="print-brand-right">Collection Report</div>
        </div>
      </div>

      {/* This block should appear only once */}
      <div className="print-report-first-page">
        <div className="print-report-title-block">
          <h1>{reportTitle}</h1>
          <p>Printable Inventory List | {reportDate}</p>
        </div>

        <div className="print-summary-grid">
          <div className="print-summary-card">
            <div className="print-summary-label">TOTAL CARDS</div>
            <div className="print-summary-value">{totalCards}</div>
          </div>

          <div className="print-summary-card">
            <div className="print-summary-label">COLLECTION VALUE</div>
            <div className="print-summary-value">{formatCurrency(totalValue)}</div>
          </div>

          <div className="print-summary-card">
            <div className="print-summary-label">TOTAL PAID</div>
            <div className="print-summary-value">{formatCurrency(totalPaid)}</div>
          </div>

          <div className="print-summary-card">
            <div className="print-summary-label">UNREALIZED GAIN</div>
            <div className="print-summary-value print-value-positive">
              {formatCurrency(unrealizedGain)}
            </div>
          </div>

          <div className="print-summary-card">
            <div className="print-summary-label">AVERAGE VALUE</div>
            <div className="print-summary-value">{formatCurrency(averageValue)}</div>
          </div>
        </div>
      </div>

      <table className="print-report-table">
        <thead>
          <tr>
            <th className="print-col-index">#</th>
            {activeColumns.map((column) => (
              <th key={column} className={`print-col-${column}`}>
                {columnLabels[column]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {cards.map((card, index) => (
            <tr key={card.id}>
              <td className="print-col-index">{index + 1}</td>
              {activeColumns.map((column) => (
                <td key={`${card.id}-${column}`} className={`print-col-${column}`}>
                  {renderCell(card, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="print-report-notes">
        <div className="print-report-notes-title">Report Notes</div>
        <p>
          This collection report is designed as a clean inventory summary.
          Detailed card notes, sale strategy notes, grading notes, and insurance
          notes can be reviewed inside the individual Card Analysis or Insurance
          report views.
        </p>
      </div>
    </div>
  );
}

function CardAnalysisReportPreview({ card }: { card: CardRecord }) {
  const reportCard = card as CardRecord & Record<string, any>;

  const purchasePrice = card.purchasePrice || 0;
  const estimatedValue = card.estimatedValue || 0;
  const targetSale = estimatedValue * 1.15;
  const projectedProfit = estimatedValue - purchasePrice;
  const roi = purchasePrice > 0 ? Math.round((projectedProfit / purchasePrice) * 100) : 0;

  const frontImage = reportCard.frontImage || reportCard.frontImageUrl || "";
  const backImage = reportCard.backImage || reportCard.backImageUrl || "";

return (
  <div className="card-analysis-print-report">
    <div className="analysis-print-header">
      <div className="analysis-print-brand">
        <img
          src="/cardgemz-report-logo.png"
          alt=""
          className="analysis-report-watermark"
        />
        <div className="analysis-print-brand-text">
          <span>CARDVAULT</span> <strong>PRO</strong>
        </div>
      </div>

      <div className="analysis-print-report-name">Card Analysis Report</div>
    </div>

    <div className="analysis-print-body">
      <img
        src="/cardgemz-report-logo.png"
        alt=""
        className="analysis-report-watermark"
      />

      <div className="analysis-print-content">
        {/* TITLE */}
        <div className="analysis-print-title-block">
          <h1>Michael Jordan Card Analysis</h1>
          <p>Personal Collection Evaluation | June 11, 2025</p>
        </div>

      <div className="analysis-print-metric-row">
        <div>
          <p>Purchase Price</p>
          <strong>{money(purchasePrice)}</strong>
        </div>

        <div>
          <p>Est. Value</p>
          <strong>{money(estimatedValue)}</strong>
        </div>

        <div>
          <p>Target Sale</p>
          <strong>{money(targetSale)}</strong>
        </div>

        <div>
          <p>Projected Profit</p>
          <strong className="analysis-profit">
            {projectedProfit >= 0 ? "+" : ""}
            {money(projectedProfit)}
          </strong>
        </div>

        <div>
          <p>Decision</p>
          <strong>Hold Pending Grade</strong>
        </div>
      </div>

        <div className="analysis-print-grid">
          <div className="analysis-print-panel">
            <h2>Card Profile</h2>

            <div className="analysis-detail-grid">
              <span>Card:</span>
              <strong>{card.card}</strong>

              <span>Player:</span>
              <strong>{card.player}</strong>

              <span>Team:</span>
              <strong>{card.team}</strong>

              <span>Sport:</span>
              <strong>{card.sport}</strong>

              <span>Year:</span>
              <strong>{card.year}</strong>

              <span>Brand:</span>
              <strong>{card.brand}</strong>

              <span>SKU:</span>
              <strong>{card.sku}</strong>

              <span>Serial Number:</span>
              <strong>{card.serialNumber}</strong>

              <span>Condition:</span>
              <strong>{reportCard.condition || "Review"}</strong>

              <span>Status:</span>
              <strong>{card.status}</strong>

              <span>Location:</span>
              <strong>{card.storageLocation}</strong>
            </div>
          </div>

          <div className="analysis-print-panel">
            <h2>Card Images</h2>

            <div className="analysis-image-grid">
              <div>
                <p>Front</p>
                {frontImage ? (
                  <img src={frontImage} alt="Card front" />
                ) : (
                  <div className="analysis-image-placeholder">No Front Image</div>
                )}
              </div>

              <div>
                <p>Back</p>
                {backImage ? (
                  <img src={backImage} alt="Card back" />
                ) : (
                  <div className="analysis-image-placeholder">No Back Image</div>
                )}
              </div>
            </div>
          </div>

          <div className="analysis-print-panel">
            <h2>Card Activity & Inspection Notes</h2>

            <ul className="analysis-notes-list">
              <li>{card.notes || "No inspection notes entered."}</li>
              <li>Card should be reviewed before grading, insurance update, or sale.</li>
              <li>Market comps should be refreshed before making a final decision.</li>
            </ul>
          </div>

          <div className="analysis-print-panel">
            <h2>Grading Evaluation</h2>

            <div className="analysis-grade-grid">
              <div>
                <span>Corners</span>
                <strong>Review</strong>
              </div>

              <div>
                <span>Centering</span>
                <strong>Review</strong>
              </div>

              <div>
                <span>Edges</span>
                <strong>Review</strong>
              </div>

              <div>
                <span>Surface</span>
                <strong>Review</strong>
              </div>

              <div>
                <span>Current Grade</span>
                <strong>{card.grade}</strong>
              </div>

              <div>
                <span>Grading Status</span>
                <strong>{card.status}</strong>
              </div>
            </div>
          </div>

          <div className="analysis-print-panel">
            <h2>Market Comp Analysis</h2>

            <div className="analysis-comp-grid">
              <div>
                <span>Low Comp</span>
                <strong>{money(card.lowComp || 0)}</strong>
              </div>

              <div>
                <span>Est. Value</span>
                <strong>{money(estimatedValue)}</strong>
              </div>

              <div>
                <span>High Comp</span>
                <strong>{money(card.highComp || 0)}</strong>
              </div>

              <div>
                <span>Confidence</span>
                <strong>Medium</strong>
              </div>
            </div>
          </div>

          <div className="analysis-print-panel">
            <h2>Predicted Sale Price</h2>

            <div className="analysis-sale-table">
              <div>
                <span>Current Grade</span>
                <strong>{money(estimatedValue)}</strong>
              </div>

              <div>
                <span>Premium Grade Target</span>
                <strong className="analysis-profit">{money(targetSale)}</strong>
              </div>

              <div>
                <span>Projected Profit</span>
                <strong className="analysis-profit">{money(projectedProfit)}</strong>
              </div>

              <div>
                <span>ROI</span>
                <strong>{roi}%</strong>
              </div>
            </div>
          </div>

          <div className="analysis-print-panel">
            <h2>Personal Collection Decision</h2>

            <p className="analysis-decision-text">
              Hold / Review. Final grading outcome, market comps, and collection
              priority should determine whether to hold long-term, grade, insure,
              or sell.
            </p>
          </div>

          <div className="analysis-print-panel">
            <h2>Sale Information</h2>

            <div className="analysis-detail-grid">
              <span>Sale Date:</span>
              <strong>TBD</strong>

              <span>Platform/Show:</span>
              <strong>TBD</strong>

              <span>Sale Price:</span>
              <strong>TBD</strong>

              <span>Net Proceeds:</span>
              <strong>TBD</strong>
            </div>
          </div>
        </div>

        <div className="analysis-print-panel analysis-report-notes">
          <h2>Report Notes</h2>

          <ul className="analysis-notes-list">
            <li>Market comps should be refreshed before any sale, trade, insurance update, or grading decision.</li>
            <li>Raw cards should be inspected for centering, corners, edges, and surface before grading.</li>
            <li>This report is generated from the card page and reflects the current data on file.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
}

function AddCard({ onSave }: { onSave: (formData: AddCardForm) => void }) {
  const addCardSteps = [
    "Card Info",
    "Purchase",
    "Grading",
    "Market",
    "Analysis",
    "Decision",
    "Sale Info",
    "Notes",
  ];

  const [activeStep, setActiveStep] = useState(addCardSteps[0]);
  const [formData, setFormData] = useState<AddCardForm>(emptyForm);

  const activeIndex = addCardSteps.indexOf(activeStep);

  const checklistComplete = [
    !!formData.frontImage,
    !!formData.backImage,
    !!formData.player,
    !!formData.card,
    !!formData.purchasePrice || !!formData.totalCostBasis,
    !!formData.grade,
    !!formData.estimatedValue || !!formData.averageComp,
    !!formData.printableReportNotes || !!formData.privateNotes,
  ];

  const progressPercent =
    (checklistComplete.filter(Boolean).length / checklistComplete.length) * 100;

  function updateForm(key: keyof AddCardForm, value: string) {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };

      if (
        key === "purchasePrice" ||
        key === "taxesFees" ||
        key === "shippingCost"
      ) {
        const purchase = numberFromCurrency(
          key === "purchasePrice" ? value : next.purchasePrice
        );
        const taxes = numberFromCurrency(key === "taxesFees" ? value : next.taxesFees);
        const shipping = numberFromCurrency(
          key === "shippingCost" ? value : next.shippingCost
        );

        next.totalCostBasis =
          purchase + taxes + shipping > 0
            ? String(purchase + taxes + shipping)
            : "";
      }

      return next;
    });
  }

  function handleImageUpload(key: keyof AddCardForm, file?: File) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateForm(key, String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function goNext() {
    const nextIndex = Math.min(activeIndex + 1, addCardSteps.length - 1);
    setActiveStep(addCardSteps[nextIndex]);
  }

  function goPrevious() {
    const previousIndex = Math.max(activeIndex - 1, 0);
    setActiveStep(addCardSteps[previousIndex]);
  }

  function generateSku() {
    const playerCode =
      formData.player
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase() || "CARD";

    const sku = `CVP-${playerCode}-${formData.year || "YEAR"}-${
      formData.brand || "BRAND"
    }-${formData.cardNumber || "001"}`.replace(/\s+/g, "-");

    updateForm("sku", sku);
  }

  return (
    <>
      <PageHero
        title="Add Card"
        subtitle="Add a new card with images, purchase data, grading strategy, market comps, and personal analysis."
        actions={
         <>
          <HeroButton variant="black">Save Draft</HeroButton>

          <HeroButton variant="gold" onClick={() => onSave(formData)}>
             Save Card
          </HeroButton>
        </>
       }
      />

      <div className="mb-6 rounded-2xl border border-steelBorder bg-graphite900/90 p-5 shadow-panel">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-vaultGold">
              Add Card Checklist
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Complete the essentials before saving this card to your vault.
            </p>
          </div>

          <p className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
            {Math.round(progressPercent)}% Complete
          </p>
        </div>

        <div className="grid grid-cols-8 gap-3">
          <HorizontalChecklistItem done={!!formData.frontImage} label="Front" />
          <HorizontalChecklistItem done={!!formData.backImage} label="Back" />
          <HorizontalChecklistItem done={!!formData.player} label="Player" />
          <HorizontalChecklistItem done={!!formData.card} label="Card" />
          <HorizontalChecklistItem
            done={!!formData.purchasePrice || !!formData.totalCostBasis}
            label="Purchase"
          />
          <HorizontalChecklistItem done={!!formData.grade} label="Grade" />
          <HorizontalChecklistItem
            done={!!formData.estimatedValue || !!formData.averageComp}
            label="Value"
          />
          <HorizontalChecklistItem
            done={!!formData.printableReportNotes || !!formData.privateNotes}
            label="Notes"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 space-y-5">
          <Panel>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-vaultGold">
                Card Images
              </h2>
              <button className="rounded-lg border border-vaultGold/40 px-3 py-2 text-xs font-bold text-vaultGold">
                Scan
              </button>
            </div>

            <ImageUploadBox
              label="Front Image"
              image={formData.frontImage}
              large
              onUpload={(file) => handleImageUpload("frontImage", file)}
            />

            <div className="mt-4 grid grid-cols-3 gap-3">
              <ImageUploadBox
                label="Back"
                image={formData.backImage}
                onUpload={(file) => handleImageUpload("backImage", file)}
              />
              <ImageUploadBox
                label="Slab"
                image={formData.slabImage}
                onUpload={(file) => handleImageUpload("slabImage", file)}
              />
              <ImageUploadBox
                label="Receipt"
                image={formData.receiptImage}
                onUpload={(file) => handleImageUpload("receiptImage", file)}
              />
            </div>
          </Panel>

          <Panel>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-vaultGold">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={generateSku}
                className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold hover:border-vaultGold/40"
              >
                Generate SKU
              </button>
              <button className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold hover:border-vaultGold/40">
                Pull eBay Comps
              </button>
              <button className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold hover:border-vaultGold/40">
                Grade Estimate
              </button>
              <button className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold hover:border-vaultGold/40">
                Create Report
              </button>
            </div>
          </Panel>
        </div>

        <Panel className="col-span-8">
          <div className="mb-5 grid grid-cols-4 gap-3">
            {addCardSteps.map((step, index) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-bold ${
                  activeStep === step
                    ? "border-vaultGold bg-vaultGold/10 text-vaultGold"
                    : index < activeIndex
                    ? "border-profitGreen/40 bg-profitGreen/10 text-profitGreen"
                    : "border-steelBorder bg-black/40 text-zinc-500"
                }`}
              >
                {index + 1}. {step}
              </button>
            ))}
          </div>

          <AddCardStepPanel
            activeStep={activeStep}
            formData={formData}
            updateForm={updateForm}
          />

          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={goPrevious}
              disabled={activeIndex === 0}
              className="rounded-xl border border-steelBorder px-5 py-3 text-sm font-bold text-zinc-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex gap-3">
              <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
                Save Draft
              </button>

              {activeIndex === addCardSteps.length - 1 ? (
                <button
                  onClick={() => onSave(formData)}
                  className="rounded-xl bg-profitGreen px-5 py-3 text-sm font-black text-black"
                >
                  Review Card
                </button>
              ) : (
                <button
                  onClick={goNext}
                  className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-black text-black shadow-vault"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function AddCardStepPanel({
  activeStep,
  formData,
  updateForm,
}: {
  activeStep: string;
  formData: AddCardForm;
  updateForm: (key: keyof AddCardForm, value: string) => void;
}) {
  if (activeStep === "Card Info") {
    return (
      <StepShell
        icon={<Boxes size={20} />}
        title="Card Information"
        subtitle="Core identity fields used across inventory, search, reports, and card detail."
      >
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Player Name"
            value={formData.player}
            onChange={(value) => updateForm("player", value)}
            placeholder="Enter player name"
          />
          <Input
            label="Card Name / Description"
            value={formData.card}
            onChange={(value) => updateForm("card", value)}
            placeholder="Enter full card name"
          />
          <Select
            label="Sport / Category"
            value={formData.sport}
            onChange={(value) => updateForm("sport", value)}
            options={[
              "Basketball",
              "Football",
              "Baseball",
              "Pokemon",
              "One Piece",
              "Other",
            ]}
          />
          <Input
            label="Team / Character"
            value={formData.team}
            onChange={(value) => updateForm("team", value)}
            placeholder="Team, franchise, or character"
          />
          <Input
            label="Year"
            value={formData.year}
            onChange={(value) => updateForm("year", value)}
            placeholder="e.g. 2023-24"
          />
          <Input
            label="Brand"
            value={formData.brand}
            onChange={(value) => updateForm("brand", value)}
            placeholder="Panini, Topps, Pokemon..."
          />
          <Input
            label="Set"
            value={formData.set}
            onChange={(value) => updateForm("set", value)}
            placeholder="Enter set name"
          />
          <Input
            label="Card Number"
            value={formData.cardNumber}
            onChange={(value) => updateForm("cardNumber", value)}
            placeholder="Enter card number"
          />
          <Input
            label="Parallel / Variation"
            value={formData.parallel}
            onChange={(value) => updateForm("parallel", value)}
            placeholder="Silver, Gold, Chrome..."
          />
          <Select
            label="Rookie Card"
            value={formData.rookie}
            onChange={(value) => updateForm("rookie", value)}
            options={["Select", "Yes", "No"]}
          />
          <Select
            label="Autograph"
            value={formData.autograph}
            onChange={(value) => updateForm("autograph", value)}
            options={["Select", "Yes", "No"]}
          />
          <Input
            label="Serial Number"
            value={formData.serialNumber}
            onChange={(value) => updateForm("serialNumber", value)}
            placeholder="e.g. 5/5, 12/25, 1/1"
          />
          <Input
            label="Personal SKU"
            value={formData.sku}
            onChange={(value) => updateForm("sku", value)}
            placeholder="CVP-WEMBY-PRIZM-001"
          />
          <Select
            label="Collection Status"
            value={formData.status}
            onChange={(value) => updateForm("status", value as CardStatus)}
            options={[
              "Personal Collection",
              "For Sale",
              "Watchlist",
              "Grade Candidate",
              "Sold",
            ]}
          />
          <Input
            label="Storage Location"
            value={formData.storageLocation}
            onChange={(value) => updateForm("storageLocation", value)}
            placeholder="Vault A-01"
          />
        </div>
      </StepShell>
    );
  }

  if (activeStep === "Purchase") {
    return (
      <StepShell
        icon={<ShoppingCart size={20} />}
        title="Purchase Information"
        subtitle="Track cost basis, source, fees, and acquisition notes."
      >
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Purchase Date"
            value={formData.purchaseDate}
            onChange={(value) => updateForm("purchaseDate", value)}
            placeholder="Select date"
          />
          <Input
            label="Purchase Price"
            value={formData.purchasePrice}
            onChange={(value) => updateForm("purchasePrice", value)}
            placeholder="$0.00"
          />
          <Input
            label="Taxes / Fees"
            value={formData.taxesFees}
            onChange={(value) => updateForm("taxesFees", value)}
            placeholder="$0.00"
          />
          <Input
            label="Shipping Cost"
            value={formData.shippingCost}
            onChange={(value) => updateForm("shippingCost", value)}
            placeholder="$0.00"
          />
          <Input
            label="Total Cost Basis"
            value={formData.totalCostBasis}
            onChange={(value) => updateForm("totalCostBasis", value)}
            placeholder="$0.00"
          />
          <Input
            label="Source / Platform"
            value={formData.source}
            onChange={(value) => updateForm("source", value)}
            placeholder="eBay, Show, LCS"
          />
          <Input
            label="Seller Name"
            value={formData.seller}
            onChange={(value) => updateForm("seller", value)}
            placeholder="Seller or shop name"
          />
          <Input
            label="Invoice / Order #"
            value={formData.invoice}
            onChange={(value) => updateForm("invoice", value)}
            placeholder="Optional"
          />
          <Input
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(value) => updateForm("paymentMethod", value)}
            placeholder="Card, cash, PayPal..."
          />
        </div>

        <Textarea
          label="Purchase Notes"
          value={formData.notes}
          onChange={(value) => updateForm("notes", value)}
          placeholder="Add purchase story, negotiation notes, shipping condition, or seller details..."
        />
      </StepShell>
    );
  }

  if (activeStep === "Grading") {
    return (
      <StepShell
        icon={<ShieldCheck size={20} />}
        title="Grading Strategy"
        subtitle="Set grading status, preferred grader, and expected outcome."
      >
        <div className="grid grid-cols-4 gap-4">
          <Select
            label="Current Grade"
            value={formData.grade}
            onChange={(value) => updateForm("grade", value)}
            options={["Raw", "PSA 10", "PSA 9", "PSA 8", "BGS 9.5", "SGC 10"]}
          />
          <Select
            label="Preferred Grader"
            value={formData.grader}
            onChange={(value) => updateForm("grader", value)}
            options={["PSA", "BGS", "SGC", "CGC", "TAG", "Review"]}
          />
          <Select
            label="Grading Status"
            value={formData.gradingStatus}
            onChange={(value) => updateForm("gradingStatus", value)}
            options={["Planning", "Submitted", "Returned", "Do Not Grade"]}
          />
          <Select
            label="Expected Grade"
            value="Review Needed"
            onChange={() => null}
            options={["Review Needed", "9", "9.5", "10", "Black Label Candidate"]}
          />
        </div>

        <Textarea
          label="Grading Notes"
          value={formData.notes}
          onChange={(value) => updateForm("notes", value)}
          placeholder="Corners, centering, edges, surface, whitening, print lines, scratches..."
        />
      </StepShell>
    );
  }

  if (activeStep === "Market") {
    return (
      <StepShell
        icon={<TrendingUp size={20} />}
        title="Market & Value"
        subtitle="Manual value entry for Phase 1. Market comp automation will connect during camera scan / beta phase."
      >
        <div className="grid grid-cols-4 gap-4">
          <Input
            label="Estimated Value"
            value={formData.estimatedValue}
            onChange={(value) => updateForm("estimatedValue", value)}
            placeholder="$0.00"
          />
          <Input
            label="Average Comp"
            value={formData.averageComp}
            onChange={(value) => updateForm("averageComp", value)}
            placeholder="$0.00"
          />
          <Input label="High Comp" value="" onChange={() => null} placeholder="$0.00" />
          <Input label="Low Comp" value="" onChange={() => null} placeholder="$0.00" />
        </div>

        <div className="mt-5 rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
          <p className="text-sm font-bold text-vaultGold">Automation Note</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            eBay-style market comps automation is planned for camera scanning /
            beta. For Phase 1, enter estimated value manually or from your own
            comp review.
          </p>
        </div>
      </StepShell>
    );
  }

  if (activeStep === "Analysis") {
    return (
      <StepShell
        icon={<FileText size={20} />}
        title="Card Analysis"
        subtitle="Personal analysis notes used in card detail and printable reports."
      >
        <Textarea
          label="Analysis Notes"
          value={formData.notes}
          onChange={(value) => updateForm("notes", value)}
          placeholder="Add inspection notes, market commentary, grading observations, and long-term outlook..."
        />
      </StepShell>
    );
  }

  if (activeStep === "Decision") {
    return (
      <StepShell
        icon={<CheckCircle2 size={20} />}
        title="Collection Decision"
        subtitle="Define whether this card is a hold, sale candidate, grading candidate, or watchlist item."
      >
        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Collection Decision"
            value={formData.status}
            onChange={(value) => updateForm("status", value as CardStatus)}
            options={[
              "Personal Collection",
              "For Sale",
              "Watchlist",
              "Grade Candidate",
              "Sold",
            ]}
          />
          <Input label="Target Sale Price" value="" onChange={() => null} placeholder="$0.00" />
          <Input label="Projected Profit" value="" onChange={() => null} placeholder="$0.00" />
        </div>

        <Textarea
          label="Decision Notes"
          value={formData.notes}
          onChange={(value) => updateForm("notes", value)}
          placeholder="Hold, grade, sell, or review strategy..."
        />
      </StepShell>
    );
  }

  if (activeStep === "Sale Info") {
    return (
      <StepShell
        icon={<ShoppingCart size={20} />}
        title="Sale Information"
        subtitle="Plan sale status, platform, invoice, fees, and final sale data."
      >
        <div className="grid grid-cols-3 gap-4">
          <Input label="Sale Date" value="" onChange={() => null} placeholder="TBD" />
          <Input label="Platform / Show" value="" onChange={() => null} placeholder="eBay, Whatnot, Show..." />
          <Input label="Invoice Number" value="" onChange={() => null} placeholder="TBD" />
          <Input label="Sale Price" value="" onChange={() => null} placeholder="$0.00" />
          <Input label="Net Proceeds" value="" onChange={() => null} placeholder="$0.00" />
          <Input label="Margin" value="" onChange={() => null} placeholder="%" />
        </div>
      </StepShell>
    );
  }

  return (
    <StepShell
      icon={<FileText size={20} />}
      title="Notes & Report Flags"
      subtitle="Control what appears in printable reports and future card analysis forms."
    >
      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Include In Player Report"
          value="Select"
          onChange={() => null}
          options={["Select", "Yes", "No"]}
        />
        <Select
          label="Include In Insurance Report"
          value="Select"
          onChange={() => null}
          options={["Select", "Yes", "No"]}
        />
        <Select
          label="Include In Tax / Profit Report"
          value="Select"
          onChange={() => null}
          options={["Select", "Yes", "No"]}
        />
      </div>

      <Textarea
        label="Private Notes"
        value={formData.privateNotes}
        onChange={(value) => updateForm("privateNotes", value)}
        placeholder="Internal/private notes that only you see..."
      />

      <Textarea
        label="Printable Report Notes"
        value={formData.printableReportNotes}
        onChange={(value) => updateForm("printableReportNotes", value)}
        placeholder="Notes that can appear in player collection or card analysis reports..."
      />
    </StepShell>
  );
}

function CardDetail({
  card,
  deleteCard,
  updateCard,
  setActiveScreen,
}: {
  card: CardRecord;
  deleteCard: (cardId: number) => void;
  updateCard: (updatedCard: CardRecord) => void;
  setActiveScreen: React.Dispatch<React.SetStateAction<Screen>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editCard, setEditCard] = useState<CardRecord>(card);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setEditCard(card);
  }, [card]);

  const displayCard = isEditing ? editCard : card;

  function updateEditField<K extends keyof CardRecord>(
    field: K,
    value: CardRecord[K]
  ) {
    setEditCard((currentCard) => ({
      ...currentCard,
      [field]: value,
    }));
  }

  function handleCardImageUpload(
    field: "frontImage" | "backImage",
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result;

      if (typeof imageDataUrl === "string") {
        updateEditField(field, imageDataUrl);
      }
    };

    reader.readAsDataURL(file);
  }

  function removeCardImage(field: "frontImage" | "backImage") {
    updateEditField(field, "");
  }

  function saveEditedCard() {
    const marketValue = editCard.estimatedValue || 0;
    const costBasis = editCard.totalCostBasis || editCard.purchasePrice || 0;
    const profitLoss = marketValue - costBasis;
    const recalculatedRoi =
      costBasis > 0 ? (profitLoss / costBasis) * 100 : 0;

    updateCard({
      ...editCard,
      gainLoss: profitLoss,
      roi: recalculatedRoi,
    });

    setIsEditing(false);
    setSaveMessage("Card images updated successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  }

  const onBack = () => setActiveScreen("My Collection");
  const onDelete = () => deleteCard(card.id);

  const marketValue = displayCard.estimatedValue || 0;
  const costBasis =
    displayCard.totalCostBasis || displayCard.purchasePrice || 0;
  const profitLoss = marketValue - costBasis;
  const roi = costBasis > 0 ? (profitLoss / costBasis) * 100 : 0;

  const rookieDisplay =
    displayCard.card.toLowerCase().includes("rookie") ||
    displayCard.year === "2023" ||
    displayCard.year === "2017"
      ? "Yes"
      : "No";

  return (
    <div className="relative isolate overflow-hidden">
      {/* Page watermark */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.045]">
        <img
          src="/safe-door-emblem.png"
          alt=""
          className="h-[760px] w-[760px] object-contain grayscale"
        />
      </div>

      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-black tracking-wide text-white">
              Card Detail
            </h1>
            <button
              type="button"
              className="text-2xl text-zinc-300 transition hover:text-vaultGold"
            >
              ☆
            </button>
            <button
              type="button"
              className="text-2xl text-zinc-300 transition hover:text-vaultGold"
            >
              ⤴
            </button>
          </div>

          <p className="mt-3 text-lg text-zinc-300">
            {displayCard.player} — {displayCard.year} {displayCard.brand}{" "}
            {displayCard.parallel}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-vaultGold/40 bg-black/40 px-6 py-3 text-sm font-bold text-white transition hover:border-vaultGold hover:text-vaultGold"
          >
            ← Back to Collection
          </button>

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={saveEditedCard}
                className="rounded-lg border border-vaultGold bg-vaultGold px-6 py-3 text-sm font-black text-black transition hover:bg-goldHover"
              >
                ✓ Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditCard(card);
                  setIsEditing(false);
                }}
                className="rounded-lg border border-steelBorder bg-black/40 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-vaultGold bg-vaultGold px-6 py-3 text-sm font-black text-black transition hover:bg-goldHover"
            >
              ✎ Edit Card
            </button>
          )}

          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-700 bg-red-950/40 px-6 py-3 text-sm font-black text-red-400 transition hover:bg-red-900/40"
          >
            🗑 Delete Card
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="mb-6 rounded-2xl border border-profitGreen/30 bg-profitGreen/10 px-5 py-4 text-sm font-bold text-profitGreen">
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-12 items-start gap-6">
        {/* Left image showcase */}
        <div className="col-span-5 space-y-5">
          <Panel className="bg-black/70 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-5">
              <CardImageFrame
                label="Front"
                image={displayCard.frontImage}
                isEditing={isEditing}
                inputId={`front-image-${displayCard.id}`}
                onUpload={(event) =>
                  handleCardImageUpload("frontImage", event)
                }
                onRemove={() => removeCardImage("frontImage")}
              />

              <CardImageFrame
                label="Back"
                image={displayCard.backImage}
                isEditing={isEditing}
                inputId={`back-image-${displayCard.id}`}
                onUpload={(event) => handleCardImageUpload("backImage", event)}
                onRemove={() => removeCardImage("backImage")}
              />
            </div>

            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-vaultGold/30">
            <CardBadge
               icon="◇"
               label={displayCard.parallel || "Base"}
               sublabel="Parallel / Variety"
               accent="text-cyan-300"
              />
              <CardBadge
                icon="RC"
                label={rookieDisplay}
                sublabel="Rookie Card"
                accent="text-vaultGold"
              />
              <CardBadge
                icon="$"
                label={displayCard.status || "Personal Collection"}
                sublabel="Collection"
                accent="text-vaultGold"
              />
            </div>
          </Panel>
        </div>

        {/* Middle market intelligence */}
        <div className="col-span-4 space-y-5">
          <MarketIntelligencePanel
            card={displayCard}
            marketValue={marketValue}
            costBasis={costBasis}
            profitLoss={profitLoss}
            roi={roi}
          />
        </div>

        {/* Right card info */}
        <div className="col-span-3 space-y-5">
          <CardInfoPanel card={displayCard} />
          <NotesPanel card={displayCard} />
          <PurchaseInformationCard card={displayCard} />
        </div>

        {/* Bottom row */}
        <VaultLocationCard card={displayCard} />
        <GradingStrategyCard card={displayCard} />
      </div>
    </div>
  );
}

function CardImageFrame({
  label,
  image,
  isEditing = false,
  inputId,
  onUpload,
  onRemove,
}: {
  label: string;
  image?: string;
  isEditing?: boolean;
  inputId?: string;
  onUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}) {
  return (
    <div>
      <p className="mb-4 text-center text-sm font-black uppercase tracking-[0.35em] text-vaultGold">
        {label}
      </p>

      <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-vaultGold/30 bg-black/50 p-4">
        {image ? (
          <img
            src={image}
            alt={`${label} card image`}
            className="max-h-[380px] w-full rounded-xl object-contain"
          />
        ) : (
          <div className="flex h-[380px] w-full items-center justify-center rounded-xl border border-dashed border-steelBorder bg-graphite900/70">
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">
              No {label} Image
            </p>
          </div>
        )}
      </div>

      {isEditing && inputId && onUpload && (
        <div className="mt-4 rounded-xl border border-vaultGold/20 bg-black/60 p-3">
          <label
            htmlFor={inputId}
            className="flex cursor-pointer items-center justify-center rounded-lg border border-vaultGold/50 bg-vaultGold/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-vaultGold transition hover:bg-vaultGold hover:text-black"
          >
            Upload {label} Image
          </label>

          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />

          {image && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="mt-3 w-full rounded-lg border border-red-500/50 bg-red-950/30 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Remove {label} Image
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function CardBadge({
  icon,
  label,
  sublabel,
  accent,
}: {
  icon: string;
  label: string;
  sublabel: string;
  accent: string;
}) {
  return (
    <div className="flex items-center justify-center gap-4 border-r border-vaultGold/20 bg-black/40 px-5 py-4 last:border-r-0">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-vaultGold/40 text-xl font-black ${accent}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
          {label}
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

function MarketIntelligencePanel({
  card,
  marketValue,
  costBasis,
  profitLoss,
  roi,
}: {
  card: CardRecord;
  marketValue: number;
  costBasis: number;
  profitLoss: number;
  roi: number;
}) {
  const positive = profitLoss >= 0;

  return (
    <Panel className="border-vaultGold/40 bg-black/75 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.32em] text-vaultGold">
            Market Intelligence
          </p>
        </div>

        <p className="text-xs text-zinc-500">Updated just now ↻</p>
      </div>

      <div className="rounded-xl border border-steelBorder bg-black/50 p-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Estimated Value
            </p>
            <p className="mt-2 text-4xl font-black text-white">
              {money(marketValue)}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Market Range: {money(card.lowComp || 0)} –{" "}
              {money(card.highComp || 0)}
            </p>
          </div>

          <div className="rounded-xl border border-vaultGold/40 bg-black/40 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Suggested Action
            </p>
            <p className="mt-3 text-3xl font-black uppercase tracking-[0.25em] text-vaultGold">
              Hold
            </p>
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Strong long-term hold with upside.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <MarketMiniCard
            label="Last 7 Days"
            value="+6.2%"
            subvalue={money(card.lastSale || 0)}
            positive
          />
          <MarketMiniCard
            label="Current ROI"
            value={`${roi.toFixed(1)}%`}
            subvalue={positive ? "Positive position" : "Negative position"}
            positive={positive}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-steelBorder bg-black/40 p-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-vaultGold">
            Comparable Sales
          </p>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-bold text-white">
                {money(card.highComp || 0)}
              </span>
              <span className="text-zinc-500">High Comp</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-white">
                {money(card.averageComp || 0)}
              </span>
              <span className="text-zinc-500">Avg Comp</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-white">
                {money(card.lowComp || 0)}
              </span>
              <span className="text-zinc-500">Low Comp</span>
            </div>
          </div>

          <button className="mt-4 w-full rounded-lg border border-vaultGold/40 py-2 text-sm font-black text-vaultGold transition hover:bg-vaultGold/10">
            View All Comps
          </button>
        </div>

        <div className="rounded-xl border border-steelBorder bg-black/40 p-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-vaultGold">
            Grading Upside
          </p>

          <div className="mt-4">
            <p className="text-sm text-zinc-400">PSA 10 Potential</p>
            <p className="mt-1 text-2xl font-black text-profitGreen">
              {money((card.highComp || marketValue) - marketValue)}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MiniDetail label="PSA 10 Pop" value="18" />
            <MiniDetail label="Pop Higher" value="2" />
          </div>

          <button className="mt-4 w-full rounded-lg border border-vaultGold/40 py-2 text-sm font-black text-vaultGold transition hover:bg-vaultGold/10">
            View Grading Analysis
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-steelBorder bg-black/40 p-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              Profit / Loss
            </p>
            <p
              className={`mt-2 text-2xl font-black ${
                positive ? "text-profitGreen" : "text-red-400"
              }`}
            >
              {money(profitLoss)}
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              Cost Basis
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {money(costBasis)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <button className="rounded-xl border border-profitGreen/50 bg-profitGreen/10 px-4 py-4 text-sm font-black text-profitGreen">
          Sell Now
          <span className="mt-1 block text-xs font-normal text-zinc-400">
            List on Market
          </span>
        </button>

        <button className="rounded-xl border border-vaultGold/50 bg-vaultGold/10 px-4 py-4 text-sm font-black text-vaultGold">
          Hold
          <span className="mt-1 block text-xs font-normal text-zinc-400">
            Keep in Collection
          </span>
        </button>

        <button className="rounded-xl border border-red-500/50 bg-red-950/30 px-4 py-4 text-sm font-black text-red-300">
          Grade Card
          <span className="mt-1 block text-xs font-normal text-zinc-400">
            Submit to PSA
          </span>
        </button>
      </div>
    </Panel>
  );
}

function MarketMiniCard({
  label,
  value,
  subvalue,
  positive,
}: {
  label: string;
  value: string;
  subvalue: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-xl border border-steelBorder bg-graphite900/70 p-4">
      <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-2 text-xl font-black ${
          positive ? "text-profitGreen" : "text-red-400"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-500">{subvalue}</p>
    </div>
  );
}

function CardInfoPanel({ card }: { card: CardRecord }) {
  return (
    <Panel className="bg-black/75 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-black uppercase tracking-[0.25em] text-vaultGold">
          Card Info
        </h2>

        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
          SKU: {card.sku}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <DetailInfo label="Player / Athlete" value={card.player} />
        <DetailInfo label="Team" value={card.team} />

        <DetailInfo label="Season" value={card.year} />
        <DetailInfo label="Brand" value={card.brand} />

        <DetailInfo label="Set" value={card.set} />
        <DetailInfo label="Card Number" value={card.cardNumber} />

        <DetailInfo label="Parallel / Variety" value={card.parallel} />
        <DetailInfo label="Serial Number" value={card.serialNumber} />

        <DetailInfo label="Autograph" value={card.autograph ?? "No"} />
        <DetailInfo label="Rookie Card" value={card.rookieCard ?? "No"} />

        <DetailInfo label="League" value={card.league ?? "NBA"} />
        <DetailInfo label="Sport" value={card.sport} />

        <DetailInfo label="Feature" value={card.feature ?? "—"} />
        <DetailInfo label="Collection Decision" value={card.status} />

      </div>
    </Panel>
  );
}

function DetailInfo({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string | number;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-black tracking-wide text-white">
        {value || "—"}
      </p>
    </div>
  );
}

function NotesPanel({ card }: { card: CardRecord }) {
  return (
    <Panel className="bg-black/70 px-5 py-4 backdrop-blur-sm">
      <h2 className="text-sm font-black uppercase tracking-[0.22em] text-vaultGold">
        ▣ Notes
      </h2>

      <p className="mt-3 text-xs leading-5 text-zinc-300">
        {card.notes ||
          "Acquired during rookie season. Monitor market and pop reports."}
      </p>

      <button className="mt-4 w-full rounded-lg border border-vaultGold/40 py-2 text-xs font-black text-vaultGold transition hover:bg-vaultGold/10">
        Edit Notes
      </button>
    </Panel>
  );
}

function VaultLocationCard({ card }: { card: CardRecord }) {
  return (
    <Panel className="col-span-2 h-[132px] bg-black/70 px-4 py-3 backdrop-blur-sm">
      <div className="flex h-full items-center gap-4">
        <img
          src="/safe-door-emblem.png"
          alt="vault location emblem"
          className="h-20 w-20 shrink-0 object-contain"
        />

        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-vaultGold">
            Location
          </p>
          <p className="mt-1 text-xs text-zinc-400">Card Location</p>
          <p className="mt-1 text-xl font-black tracking-[0.1em] text-white">
            {card.storageLocation || "Vault A-01"}
          </p>
        </div>
      </div>
    </Panel>
  );
}

function GradingStrategyCard({ card }: { card: CardRecord }) {
  return (
    <Panel className="col-span-4 h-[132px] bg-black/70 px-5 py-3 backdrop-blur-sm">
      <h2 className="text-sm font-black uppercase tracking-[0.22em] text-vaultGold">
        ▥ Grading Strategy
      </h2>

      <div className="mt-3 grid grid-cols-4 gap-3">
        <MiniDetail label="Preferred" value={card.grade || "PSA 10"} />
        <MiniDetail label="Expected" value={card.grade || "PSA 10"} />
        <MiniDetail
          label="Status"
          value={card.grader ? "Graded" : "Raw"}
        />
        <MiniDetail label="Actual" value={card.grade || "—"} />
      </div>

      <button className="mt-3 w-full rounded-lg border border-vaultGold/40 py-1.5 text-xs font-black text-vaultGold transition hover:bg-vaultGold/10">
        View Grading Tracker
      </button>
    </Panel>
  );
}

function MiniDetail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-[10px] text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value || "—"}</p>
    </div>
  );
}

function PurchaseInformationCard({ card }: { card: CardRecord }) {
  return (
    <Panel className="col-span-3 h-[132px] bg-black/70 px-5 py-3 backdrop-blur-sm">
      <h2 className="text-sm font-black uppercase tracking-[0.22em] text-vaultGold">
        🛒 Purchase Information
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <MiniDetail label="Price" value={money(card.purchasePrice)} />
        <MiniDetail label="Date" value={card.purchaseDate || "—"} />
        <MiniDetail label="Source" value={card.source || "—"} />
      </div>

      <button className="mt-3 w-full rounded-lg border border-vaultGold/40 py-1.5 text-xs font-black text-vaultGold transition hover:bg-vaultGold/10">
        View Receipt
      </button>
    </Panel>
  );
}

function getCardPrintRun(card: CardRecord) {
  const valuesToCheck = [
    card.serialNumber,
    card.parallel,
    card.card,
    card.cardNumber,
    card.notes,
  ]
    .filter(Boolean)
    .join(" ");

  const match = valuesToCheck.match(/\/\s*(\d+)/);

  if (!match) return null;

  return Number(match[1]);
}

function getCardDetailBadges(card: CardRecord) {
  const printRun = getCardPrintRun(card);

  const searchableText = [
    card.card,
    card.parallel,
    card.notes,
    card.set,
    card.brand,
    card.cardNumber,
    card.serialNumber,
  ]
    .join(" ")
    .toLowerCase();

  const badges: {
    key: string;
    title: string;
    icon: React.ReactNode;
  }[] = [];

  if (printRun === 1) {
    badges.push({
      key: "one-of-kind",
      title: "One of a Kind",
      icon: (
        <Gem className="h-14 w-14 text-vaultGold drop-shadow-[0_0_18px_rgba(245,196,81,0.75)]" />
      ),
    });
  } else if (printRun !== null && printRun <= 100) {
    badges.push({
      key: "super-rare",
      title: "Super Rare",
      icon: (
        <Gem className="h-14 w-14 text-sky-300 drop-shadow-[0_0_18px_rgba(125,211,252,0.75)]" />
      ),
    });
  } else if (printRun !== null && printRun <= 250) {
    badges.push({
      key: "rare",
      title: "Rare",
      icon: (
        <Gem className="h-14 w-14 text-zinc-300 drop-shadow-[0_0_18px_rgba(212,212,216,0.55)]" />
      ),
    });
  }

  if (
    searchableText.includes("auto") ||
    searchableText.includes("autograph") ||
    searchableText.includes("signature")
  ) {
    badges.push({
      key: "autograph",
      title: "Autograph",
      icon: (
        <BadgeCheck className="h-14 w-14 text-vaultGold drop-shadow-[0_0_18px_rgba(245,196,81,0.65)]" />
      ),
    });
  }

  if (
    searchableText.includes("patch") ||
    searchableText.includes("jersey") ||
    searchableText.includes("relic")
  ) {
    badges.push({
      key: "patch",
      title: "Patch Card",
      icon: (
        <Shield className="h-14 w-14 text-zinc-300 drop-shadow-[0_0_18px_rgba(212,212,216,0.55)]" />
      ),
    });
  }

  if (
    searchableText.includes("rookie") ||
    searchableText.includes("rc") ||
    card.year === "2023" ||
    card.year === "2017"
  ) {
    badges.push({
      key: "rookie-card",
      title: "Rookie Card",
      icon: <RookieCardEmblem />,
    });
  }

  return badges;
}

function DetailBadge({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-[104px] items-center gap-5 bg-black/95 p-6">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="whitespace-nowrap text-xl font-black uppercase tracking-[0.08em] text-white">
          {title}
        </p>
      </div>
    </div>
  );
}

function RookieCardEmblem() {
  return (
    <div className="flex h-16 w-16 items-center justify-center text-vaultGold">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <Shield className="absolute h-14 w-14 fill-vaultGold/10 text-vaultGold drop-shadow-[0_0_18px_rgba(245,196,81,0.55)]" />
        <span className="relative text-lg font-black">RC</span>
      </div>
    </div>
  );
}

function DetailPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-vaultGold/25 bg-black/55 p-5 shadow-[0_0_24px_rgba(0,0,0,0.7)] backdrop-blur">
      <div className="mb-4 flex items-center gap-3 text-vaultGold">
        {icon}
        <h3 className="text-base font-black uppercase tracking-[0.08em] text-vaultGold">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function DetailGrid({
  items,
}: {
  items: [string, string | number | React.ReactNode][];
}) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 border-b border-white/5 pb-2"
        >
          <span className="text-zinc-400">{label}</span>
          <span className="text-right font-black text-white">{value}</span>
        </div>
      ))}
    </div>
  );
}

function MarketComps({ cards }: { cards: CardRecord[] }) {
  const [selectedCardId, setSelectedCardId] = useState<number>(cards[0]?.id ?? 1);
  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? cards[0];

  const mockSoldComps = selectedCard
    ? [
        {
          id: 1,
          source: "eBay Sold",
          date: "Jun 08, 2025",
          title: `${selectedCard.player} ${selectedCard.card}`,
          grade: selectedCard.grade,
          price: selectedCard.estimatedValue * 0.92,
          confidence: "High",
          notes: "Closest recent sold comp by card name and grade.",
        },
        {
          id: 2,
          source: "Card Show",
          date: "Jun 02, 2025",
          title: `${selectedCard.player} comparable sale`,
          grade: selectedCard.grade,
          price: selectedCard.estimatedValue * 0.85,
          confidence: "Medium",
          notes: "Useful comp but source requires manual verification.",
        },
        {
          id: 3,
          source: "Private Sale",
          date: "May 26, 2025",
          title: `${selectedCard.brand} ${selectedCard.year} parallel comp`,
          grade: selectedCard.grade,
          price: selectedCard.estimatedValue * 1.08,
          confidence: "Medium",
          notes: "Higher value due to scarcity / condition premium.",
        },
        {
          id: 4,
          source: "Active Listing",
          date: "Current",
          title: `${selectedCard.player} active listing reference`,
          grade: selectedCard.grade,
          price: selectedCard.estimatedValue * 1.2,
          confidence: "Low",
          notes: "Active listing only. Do not treat as sold value.",
        },
      ]
    : [];

  const soldOnlyComps = mockSoldComps.filter(
    (comp) => comp.source !== "Active Listing"
  );

  const lowComp =
    soldOnlyComps.length > 0
      ? Math.min(...soldOnlyComps.map((comp) => comp.price))
      : 0;
  const highComp =
    soldOnlyComps.length > 0
      ? Math.max(...soldOnlyComps.map((comp) => comp.price))
      : 0;
  const averageComp =
    soldOnlyComps.length > 0
      ? soldOnlyComps.reduce((sum, comp) => sum + comp.price, 0) /
        soldOnlyComps.length
      : 0;
  const recommendedValue =
    selectedCard?.grade === "Raw" ? averageComp * 0.9 : averageComp;
  const spreadPercent =
    averageComp > 0 ? ((highComp - lowComp) / averageComp) * 100 : 0;

  const confidence =
    spreadPercent <= 20 ? "High" : spreadPercent <= 45 ? "Medium" : "Low";

  return (
    <>
      <PageHero
        title="Market Comps"
        subtitle="Review market value, recent sales, comparable cards, confidence level, and pricing direction."
        actions={
          <>
          <HeroButton variant="black">Refresh Comps</HeroButton>
          <HeroButton variant="gold">Add Comp</HeroButton>
        </>
      }
    />

      <div className="mb-6 grid grid-cols-12 gap-6">
        <Panel className="col-span-4">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Select Card
          </h2>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">Card</span>
            <select
              value={selectedCardId}
              onChange={(event) => setSelectedCardId(Number(event.target.value))}
              className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-vaultGold"
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.player} — {card.card}
                </option>
              ))}
            </select>
          </label>

          {selectedCard && (
            <div className="mt-5 rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Current Card
              </p>
              <h3 className="mt-2 text-lg font-bold">{selectedCard.card}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {selectedCard.player} • {selectedCard.year} • {selectedCard.brand}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Current Value
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-profitGreen">
                    {money(selectedCard.estimatedValue)}
                  </p>
                </div>

                <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Grade
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-vaultGold">
                    {selectedCard.grade}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Panel>

        <Panel className="col-span-8">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Manual Comp Input
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <Input label="Comp Source" value="" onChange={() => null} placeholder="eBay Sold, Show, Private..." />
            <Input label="Comp Date" value="" onChange={() => null} placeholder="Select date" />
            <Input label="Comp Price" value="" onChange={() => null} placeholder="$0.00" />
            <Select label="Comp Confidence" value="Medium" onChange={() => null} options={["Low", "Medium", "High"]} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <Input label="Condition / Grade" value="" onChange={() => null} placeholder="Raw, PSA 10, BGS 9.5..." />
            <Input label="Serial / Parallel" value="" onChange={() => null} placeholder="/10, Silver, Auto..." />
            <Input label="Comp Link / Reference" value="" onChange={() => null} placeholder="Paste reference later" />
          </div>

          <Textarea
            label="Comp Notes"
            value=""
            onChange={() => null}
            placeholder="Add notes about comp quality, seller credibility, card condition, timing, or outlier concerns..."
          />

          <div className="mt-4 flex justify-end">
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Add Manual Comp
            </button>
          </div>
        </Panel>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-5">
        <MiniStat label="Low Sold Comp" value={money(lowComp)} />
        <MiniStat label="Average Comp" value={money(averageComp)} />
        <MiniStat label="High Sold Comp" value={money(highComp)} />
        <MiniStat label="Recommended Value" value={money(recommendedValue)} />
        <MiniStat label="Confidence" value={confidence} />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Panel className="col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Recent Comparable Sales</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Manual comp review for valuation confidence. Active listings are
                separated from sold comps.
              </p>
            </div>

            <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
              {mockSoldComps.length} Comps
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-steelBorder">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-black text-xs uppercase tracking-widest text-vaultGold">
                <tr>
                  <th className="px-4 py-4">Source</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Comp Title</th>
                  <th className="px-4 py-4">Grade</th>
                  <th className="px-4 py-4">Price</th>
                  <th className="px-4 py-4">Confidence</th>
                </tr>
              </thead>

              <tbody>
                {mockSoldComps.map((comp) => (
                  <tr key={comp.id} className="border-t border-steelBorder bg-graphite900/60">
                    <td className="px-4 py-4 font-bold">{comp.source}</td>
                    <td className="px-4 py-4 text-zinc-400">{comp.date}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-zinc-200">{comp.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">{comp.notes}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-lg border border-steelBorder bg-black/40 px-2 py-1 text-xs font-bold">
                        {comp.grade}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-extrabold text-profitGreen">
                      {money(comp.price)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-lg border border-vaultGold/30 bg-vaultGold/10 px-2 py-1 text-xs font-bold text-vaultGold">
                        {comp.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="col-span-4">
          <h2 className="text-lg font-bold text-vaultGold">Valuation Decision</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Recommended Estimate
              </p>
              <p className="mt-2 text-3xl font-extrabold text-profitGreen">
                {money(recommendedValue)}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Based on recent sold comps, current grade, and comp spread.
              </p>
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Spread Risk
              </p>
              <p className="mt-2 text-2xl font-extrabold text-vaultGold">
                {spreadPercent.toFixed(1)}%
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                A tighter spread means stronger valuation confidence.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function GradingCenter({ cards }: { cards: CardRecord[] }) {
  const [selectedCardId, setSelectedCardId] = useState<number>(
    cards[0]?.id ?? 1
  );

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0];

  const rawCards = cards.filter((card) => card.grade === "Raw");
  const gradedCards = cards.filter((card) => card.grade !== "Raw");
  const gradeCandidates = cards.filter(
    (card) => card.status === "Grade Candidate" || card.grade === "Raw"
  );

  const selectedEstimatedValue = selectedCard?.estimatedValue ?? 0;
  const selectedPurchasePrice = selectedCard?.purchasePrice ?? 0;
  const estimatedPSA10Value = selectedEstimatedValue * 1.45;
  const estimatedBGS95Value = selectedEstimatedValue * 1.25;
  const estimatedSGC10Value = selectedEstimatedValue * 1.15;
  const gradingCostEstimate = 45;
  const projectedProfitAfterPSA =
    estimatedPSA10Value - selectedPurchasePrice - gradingCostEstimate;

  const gradingRows = cards.map((card) => {
    const estimatedAfterGrade =
      card.grade === "Raw" ? card.estimatedValue * 1.35 : card.estimatedValue;

    const priority =
      card.status === "Grade Candidate"
        ? "High"
        : card.grade === "Raw"
        ? "Medium"
        : "Complete";

    const submissionStatus =
      card.grade === "Raw"
        ? card.status === "Grade Candidate"
          ? "Ready to Review"
          : "Not Submitted"
        : "Returned";

    return {
      ...card,
      estimatedAfterGrade,
      priority,
      submissionStatus,
    };
  });

  return (
    <>
      <PageHero
        title="Grading Center"
        subtitle="Plan grading submissions, estimate grades, track cert status, and manage grading decisions."
        actions={
          <>
          <HeroButton variant="black">Grade Estimate</HeroButton>
         <HeroButton variant="gold">Create Submission</HeroButton>
        </>
      }
    />

      <div className="mb-6 grid grid-cols-5 gap-5">
        <MiniStat label="Raw Cards" value={String(rawCards.length)} />
        <MiniStat label="Graded Cards" value={String(gradedCards.length)} />
        <MiniStat
          label="Grade Candidates"
          value={String(gradeCandidates.length)}
        />
        <MiniStat label="Avg. Grading Cost" value="$45" />
        <MiniStat label="Active Submissions" value="0" />
      </div>

      <div className="mb-6 grid grid-cols-12 gap-6">
        <Panel className="col-span-4">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Select Card
          </h2>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">
              Card
            </span>
            <select
              value={selectedCardId}
              onChange={(event) => setSelectedCardId(Number(event.target.value))}
              className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-vaultGold"
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.player} — {card.card}
                </option>
              ))}
            </select>
          </label>

          {selectedCard && (
            <div className="mt-5 rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Current Card
              </p>
              <h3 className="mt-2 text-lg font-bold">{selectedCard.card}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {selectedCard.player} • {selectedCard.year} •{" "}
                {selectedCard.brand}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Current Grade
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-vaultGold">
                    {selectedCard.grade}
                  </p>
                </div>

                <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Current Value
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-profitGreen">
                    {money(selectedEstimatedValue)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Panel>

        <Panel className="col-span-8">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Grade Upside Estimate
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <MiniDarkStat label="PSA 10 Estimate" value={money(estimatedPSA10Value)} />
            <MiniDarkStat label="BGS 9.5 Estimate" value={money(estimatedBGS95Value)} />
            <MiniDarkStat label="SGC 10 Estimate" value={money(estimatedSGC10Value)} />
            <MiniDarkStat
              label="PSA Profit Upside"
              value={money(projectedProfitAfterPSA)}
              positive
            />
          </div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            <Select
              label="Preferred Grader"
              value="PSA"
              onChange={() => null}
              options={["PSA", "BGS", "SGC", "CGC", "TAG"]}
            />
            <Select
              label="Expected Grade"
              value="Review"
              onChange={() => null}
              options={["Review", "9", "9.5", "10", "Black Label Candidate"]}
            />
            <Input
              label="Estimated Grading Cost"
              value="$45"
              onChange={() => null}
              placeholder="$0.00"
            />
            <Select
              label="Submission Priority"
              value="Medium"
              onChange={() => null}
              options={["Low", "Medium", "High", "Vault Lock"]}
            />
          </div>

          <Textarea
            label="Grading Notes"
            value=""
            onChange={() => null}
            placeholder="Add notes about centering, corners, edges, surface, print lines, scratches, fingerprints, whitening, or grading strategy..."
          />

          <div className="mt-4 flex justify-end">
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Add To Grading Plan
            </button>
          </div>
        </Panel>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-5">
        <GraderStrategyCard
          grader="PSA"
          bestFor="Market premium, resale strength"
          speed="Medium"
          risk="Strict centering / surface"
          recommendation="Best for high-demand sports cards."
        />
        <GraderStrategyCard
          grader="BGS"
          bestFor="Subgrades, thick cards, premium chase"
          speed="Medium"
          risk="Harder gem standards"
          recommendation="Best if you want subgrade transparency."
        />
        <GraderStrategyCard
          grader="SGC"
          bestFor="Fast turnaround, vintage, clean slabs"
          speed="Fast"
          risk="Sometimes lower resale premium"
          recommendation="Best for speed and clean presentation."
        />
        <GraderStrategyCard
          grader="CGC"
          bestFor="TCG, Pokemon, modern collectibles"
          speed="Medium"
          risk="Market varies by category"
          recommendation="Best for Pokemon and broader collectibles."
        />
        <GraderStrategyCard
          grader="TAG"
          bestFor="Digital grading report, transparency"
          speed="Medium"
          risk="Still growing market adoption"
          recommendation="Best for condition transparency."
        />
      </div>

      <Panel>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Grading Pipeline</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Track raw cards, grade candidates, submitted cards, and returned
              graded cards.
            </p>
          </div>

          <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
            {gradingRows.length} Cards
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-steelBorder">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-black text-xs uppercase tracking-widest text-vaultGold">
              <tr>
                <th className="px-4 py-4">Card</th>
                <th className="px-4 py-4">Player</th>
                <th className="px-4 py-4">Current Grade</th>
                <th className="px-4 py-4">Preferred Grader</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Current Value</th>
                <th className="px-4 py-4">Est. After Grade</th>
                <th className="px-4 py-4">Priority</th>
              </tr>
            </thead>

            <tbody>
              {gradingRows.map((card) => (
                <tr
                  key={card.id}
                  className="border-t border-steelBorder bg-graphite900/60"
                >
                  <td className="px-4 py-4 font-bold">{card.card}</td>
                  <td className="px-4 py-4 text-zinc-300">{card.player}</td>
                  <td className="px-4 py-4">{card.grade}</td>
                  <td className="px-4 py-4">{card.grader}</td>
                  <td className="px-4 py-4 text-vaultGold">
                    {card.submissionStatus}
                  </td>
                  <td className="px-4 py-4 font-bold text-profitGreen">
                    {money(card.estimatedValue)}
                  </td>
                  <td className="px-4 py-4 font-bold text-dataCyan">
                    {money(card.estimatedAfterGrade)}
                  </td>
                  <td className="px-4 py-4 text-vaultGold">{card.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function SalesTracker({
  cards,
  setCards,
  sales,
  setSales,
}: {
  cards: CardRecord[];
  setCards: React.Dispatch<React.SetStateAction<CardRecord[]>>;
  sales: SaleRecord[];
  setSales: React.Dispatch<React.SetStateAction<SaleRecord[]>>;
}) {
  const [selectedCardId, setSelectedCardId] = useState<number>(
    cards[0]?.id ?? 1
  );

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0];

  const [editingSaleId, setEditingSaleId] = useState<number | null>(null);

  const [saleStatus, setSaleStatus] = useState("Sold");
  const [platform, setPlatform] = useState("eBay");
  const [saleDate, setSaleDate] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [fees, setFees] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [taxes, setTaxes] = useState("");
  const [buyerSource, setBuyerSource] = useState("");
  const [notes, setNotes] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All Platforms");

  const soldCards = sales.length;
  const listedCards = cards.filter((card) => card.status === "For Sale");

  const salePriceNumber = Number(salePrice) || 0;
  const feesNumber = Number(fees) || 0;
  const shippingCostNumber = Number(shippingCost) || 0;
  const taxesNumber = Number(taxes) || 0;
  const purchasePriceNumber = selectedCard?.purchasePrice ?? 0;

  const netProceeds =
    salePriceNumber - feesNumber - shippingCostNumber - taxesNumber;

  const profitLoss = netProceeds - purchasePriceNumber;

  const roi =
    purchasePriceNumber > 0 ? (profitLoss / purchasePriceNumber) * 100 : 0;

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.salePrice, 0);

  const totalNetProceeds = sales.reduce(
    (sum, sale) => sum + sale.netProceeds,
    0
  );

  const totalProfit = sales.reduce((sum, sale) => sum + sale.profitLoss, 0);

  const totalFees = sales.reduce((sum, sale) => sum + sale.fees, 0);

  const totalShippingCosts = sales.reduce(
    (sum, sale) => sum + sale.shippingCost,
    0
  );

  const totalTaxes = sales.reduce((sum, sale) => sum + sale.taxes, 0);

  const totalSellingCosts = totalFees + totalShippingCosts + totalTaxes;

  const sellingCostRate =
    totalRevenue > 0 ? (totalSellingCosts / totalRevenue) * 100 : 0;

  const averageRoi =
    sales.length > 0
      ? sales.reduce((sum, sale) => sum + sale.roi, 0) / sales.length
      : 0;

  const salesPerformanceScore =
    totalProfit > 0 && averageRoi >= 50 && sellingCostRate <= 20
      ? "A+"
      : totalProfit > 0 && averageRoi >= 25 && sellingCostRate <= 30
      ? "A"
      : totalProfit > 0 && averageRoi >= 10 && sellingCostRate <= 40
      ? "B"
      : totalProfit > 0
      ? "C"
      : sales.length > 0
      ? "Needs Review"
      : "Pending";

  const salesPerformanceMessage =
    salesPerformanceScore === "A+"
      ? "Excellent seller performance. Profit, ROI, and cost control are all strong."
      : salesPerformanceScore === "A"
      ? "Strong seller performance. Keep tracking platform fees and continue scaling your best channels."
      : salesPerformanceScore === "B"
      ? "Good performance, but there is room to improve ROI or reduce selling costs."
      : salesPerformanceScore === "C"
      ? "You are profitable, but platform fees, shipping, or low ROI may be limiting growth."
      : salesPerformanceScore === "Needs Review"
      ? "Sales are recorded, but profit is not strong yet. Review cost basis, fees, and platform selection."
      : "Record sales to unlock your seller performance score.";

  const averageProfit = sales.length > 0 ? totalProfit / sales.length : 0;

  const bestSale =
    sales.length > 0
      ? sales.reduce((best, sale) =>
          sale.profitLoss > best.profitLoss ? sale : best
        )
      : null;

  const highestRoiSale =
    sales.length > 0
      ? sales.reduce((best, sale) => (sale.roi > best.roi ? sale : best))
      : null;

  const platformBreakdown = sales.reduce(
    (platforms, sale) => {
      const existingPlatform = platforms[sale.platform] ?? {
        revenue: 0,
        profit: 0,
        count: 0,
      };

      return {
        ...platforms,
        [sale.platform]: {
          revenue: existingPlatform.revenue + sale.salePrice,
          profit: existingPlatform.profit + sale.profitLoss,
          count: existingPlatform.count + 1,
        },
      };
    },
    {} as Record<
      string,
      {
        revenue: number;
        profit: number;
        count: number;
      }
    >
  );

  const topPlatform =
    Object.entries(platformBreakdown).length > 0
      ? Object.entries(platformBreakdown).sort(
          ([, platformA], [, platformB]) => platformB.profit - platformA.profit
        )[0]
      : null;

  const activePlatformCount = Object.keys(platformBreakdown).length;

  const salesHubSummary =
    sales.length > 0
      ? `You have recorded ${sales.length} sale${
          sales.length === 1 ? "" : "s"
        } across ${activePlatformCount} platform${
          activePlatformCount === 1 ? "" : "s"
        }, generating ${money(totalRevenue)} in revenue and ${money(
          totalProfit
        )} in profit. ${
          topPlatform
            ? `${topPlatform[0]} is currently your strongest platform, with a selling cost rate of ${sellingCostRate.toFixed(
                1
              )}%.`
            : `Your current selling cost rate is ${sellingCostRate.toFixed(1)}%.`
        }`
      : "Record your first sale to unlock Sales Hub intelligence, platform analytics, fee impact tracking, and seller performance scoring.";

  const platformOptions = [
    "All Platforms",
    ...Array.from(new Set(sales.map((sale) => sale.platform))),
  ];

  const filteredSales =
    platformFilter === "All Platforms"
      ? sales
      : sales.filter((sale) => sale.platform === platformFilter);

  const filteredRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.salePrice,
    0
  );

  const filteredProfit = filteredSales.reduce(
    (sum, sale) => sum + sale.profitLoss,
    0
  );

  const filteredNetProceeds = filteredSales.reduce(
    (sum, sale) => sum + sale.netProceeds,
    0
  );

  const filteredSellingCosts = filteredSales.reduce(
    (sum, sale) => sum + sale.fees + sale.shippingCost + sale.taxes,
    0
  );

  const filteredSellingCostRate =
    filteredRevenue > 0 ? (filteredSellingCosts / filteredRevenue) * 100 : 0;

  const platformInsight =
    topPlatform && topPlatform[1].count > 0
      ? {
          platformName: topPlatform[0],
          totalRevenue: topPlatform[1].revenue,
          totalProfit: topPlatform[1].profit,
          saleCount: topPlatform[1].count,
          averageProfit: topPlatform[1].profit / topPlatform[1].count,
        }
      : null;

  const sellerRecommendation =
    platformInsight && platformInsight.totalProfit > 0
      ? `${platformInsight.platformName} is currently your strongest sales channel based on profit. Consider listing more similar cards there.`
      : sales.length > 0
      ? "Sales are being tracked, but profit is not strong yet. Review fees, shipping, and platform choice before scaling."
      : "Record sales across eBay, Whatnot, breaks, card shows, and direct buyers to unlock seller recommendations.";

  const listedValue = listedCards.reduce(
    (sum, card) => sum + card.estimatedValue,
    0
  );

  const resetSaleForm = () => {
    setEditingSaleId(null);
    setSaleStatus("Sold");
    setPlatform("eBay");
    setSaleDate("");
    setSalePrice("");
    setFees("");
    setShippingCost("");
    setTaxes("");
    setBuyerSource("");
    setNotes("");
  };

  const handleRecordSale = () => {
    if (!selectedCard) return;

    if (!saleDate || salePriceNumber <= 0) {
      alert("Please enter a sale date and sale price before saving.");
      return;
    }

    const updatedSale: SaleRecord = {
      id: editingSaleId ?? Date.now(),
      cardId: selectedCard.id,
      cardName: selectedCard.card,
      player: selectedCard.player,
      platform,
      saleDate,
      salePrice: salePriceNumber,
      fees: feesNumber,
      shippingCost: shippingCostNumber,
      taxes: taxesNumber,
      netProceeds,
      purchasePrice: purchasePriceNumber,
      profitLoss,
      roi,
      buyerSource,
      notes,
    };

    if (editingSaleId) {
      setSales((currentSales) =>
        currentSales.map((sale) =>
          sale.id === editingSaleId ? updatedSale : sale
        )
      );
    } else {
      setSales((currentSales) => [updatedSale, ...currentSales]);
    }

    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === selectedCard.id
          ? {
              ...card,
              status: "Sold",
            }
          : card
      )
    );

    resetSaleForm();
  };

  const handleEditSale = (sale: SaleRecord) => {
    setEditingSaleId(sale.id);
    setSelectedCardId(sale.cardId);
    setSaleStatus("Sold");
    setPlatform(sale.platform);
    setSaleDate(sale.saleDate);
    setSalePrice(String(sale.salePrice));
    setFees(String(sale.fees));
    setShippingCost(String(sale.shippingCost));
    setTaxes(String(sale.taxes));
    setBuyerSource(sale.buyerSource);
    setNotes(sale.notes);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDeleteSale = (saleId: number) => {
    const saleToDelete = sales.find((sale) => sale.id === saleId);

    setSales((currentSales) =>
      currentSales.filter((sale) => sale.id !== saleId)
    );

    if (saleToDelete) {
      const stillHasSale = sales.some(
        (sale) => sale.cardId === saleToDelete.cardId && sale.id !== saleId
      );

      if (!stillHasSale) {
        setCards((currentCards) =>
          currentCards.map((card) =>
            card.id === saleToDelete.cardId
              ? {
                  ...card,
                  status: "For Sale",
                }
              : card
          )
        );
      }
    }

    if (editingSaleId === saleId) {
      resetSaleForm();
    }
  };

  return (
    <>
      <PageHero
        title="Sales Tracker"
        subtitle="Track listed cards, sold cards, platform fees, net proceeds, real profit, and ROI."
        actions={
          <>
            <HeroButton variant="black">Export Sales Report</HeroButton>
            <HeroButton variant="gold">
              {editingSaleId ? "Updating Sale" : "Record Sale"}
            </HeroButton>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-5 gap-5">
        <MiniStat label="Listed Cards" value={String(listedCards.length)} />
        <MiniStat label="Recorded Sales" value={String(soldCards)} />
        <MiniStat label="Listed Value" value={money(listedValue)} />
        <MiniStat label="Net Proceeds" value={money(totalNetProceeds)} />
        <MiniStat label="Real Profit" value={money(totalProfit)} />
      </div>

      <Panel className="mb-6 border-vaultGold/30 bg-black/40">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-vaultGold">
              Sales Hub Executive Summary
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {sales.length > 0
                ? "Your selling data is active and ready for decision-making."
                : "Start recording sales to activate your seller command center."}
            </h2>
            <p className="mt-3 max-w-5xl text-sm leading-6 text-zinc-300">
              {salesHubSummary}
            </p>
          </div>

          <div className="min-w-[180px] rounded-2xl border border-steelBorder bg-graphite900/70 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Score
            </p>
            <p className="mt-2 text-4xl font-black text-vaultGold">
              {salesPerformanceScore}
            </p>
            <p className="mt-1 text-xs text-zinc-400">Seller Performance</p>
          </div>
        </div>
      </Panel>

      <Panel className="mb-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-vaultGold">
              Connected Selling Platforms
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Future-ready sales hub for tracking eBay, Whatnot, breaks, card
              shows, and direct buyer sales in one command center.
            </p>
          </div>

          <div className="rounded-full border border-vaultGold/40 bg-vaultGold/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-vaultGold">
            Sales Hub Beta
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">eBay</p>
              <span className="rounded-full border border-vaultGold/40 bg-vaultGold/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-vaultGold">
                OAuth
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Secure seller account connection planned. No password storage.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-steelBorder px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-400 transition hover:border-vaultGold hover:text-vaultGold"
            >
              Connect Soon
            </button>
          </div>

          <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">Whatnot</p>
              <span className="rounded-full border border-zinc-600 bg-zinc-900 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Import Beta
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Track live-selling performance and future sales imports.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-steelBorder px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-400 transition hover:border-vaultGold hover:text-vaultGold"
            >
              Upload Soon
            </button>
          </div>

          <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">Breaks</p>
              <span className="rounded-full border border-profitGreen/40 bg-profitGreen/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-profitGreen">
                Manual
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Track break session sales, lots, claims, and group sales.
            </p>
            <button
              type="button"
              onClick={() => setPlatform("Break Session")}
              className="mt-4 w-full rounded-lg border border-steelBorder px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-400 transition hover:border-vaultGold hover:text-vaultGold"
            >
              Use Platform
            </button>
          </div>

          <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">Card Show</p>
              <span className="rounded-full border border-profitGreen/40 bg-profitGreen/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-profitGreen">
                Manual
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Record in-person show sales, trades, and negotiation results.
            </p>
            <button
              type="button"
              onClick={() => setPlatform("Card Show")}
              className="mt-4 w-full rounded-lg border border-steelBorder px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-400 transition hover:border-vaultGold hover:text-vaultGold"
            >
              Use Platform
            </button>
          </div>

          <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-white">Direct Buyer</p>
              <span className="rounded-full border border-profitGreen/40 bg-profitGreen/10 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-profitGreen">
                Manual
              </span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Track private buyer, dealer, Instagram, and local sales.
            </p>
            <button
              type="button"
              onClick={() => setPlatform("Direct Buyer")}
              className="mt-4 w-full rounded-lg border border-steelBorder px-3 py-2 text-xs font-black uppercase tracking-widest text-zinc-400 transition hover:border-vaultGold hover:text-vaultGold"
            >
              Use Platform
            </button>
          </div>
        </div>
      </Panel>

      <Panel className="mb-6 border-vaultGold/30 bg-vaultGold/5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-vaultGold">
              Seller Intelligence
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {platformInsight
                ? `${platformInsight.platformName} is leading your sales performance`
                : "Start recording sales to unlock platform recommendations"}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-zinc-300">
              {sellerRecommendation}
            </p>
          </div>

          <div className="min-w-[260px] rounded-2xl border border-steelBorder bg-black/40 p-4">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Current Best Platform
            </p>

            <p className="mt-2 text-2xl font-black text-vaultGold">
              {platformInsight ? platformInsight.platformName : "Pending Data"}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <MiniDarkStat
                label="Sales"
                value={platformInsight ? String(platformInsight.saleCount) : "0"}
              />
              <MiniDarkStat
                label="Avg. Profit"
                value={
                  platformInsight
                    ? money(platformInsight.averageProfit)
                    : money(0)
                }
                positive={
                  platformInsight ? platformInsight.averageProfit >= 0 : true
                }
              />
            </div>
          </div>
        </div>
      </Panel>

      <div className="mb-6 grid grid-cols-12 gap-6">
        <Panel className="col-span-4">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Select Card
          </h2>

          {editingSaleId && (
            <div className="mb-5 rounded-xl border border-vaultGold bg-vaultGold/10 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-vaultGold">
                Edit Mode Active
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                You are updating an existing sale record. Save changes or cancel
                edit mode.
              </p>
            </div>
          )}

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-zinc-300">
              Card
            </span>
            <select
              value={selectedCardId}
              onChange={(event) => setSelectedCardId(Number(event.target.value))}
              className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-vaultGold"
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.player} — {card.card}
                </option>
              ))}
            </select>
          </label>

          {selectedCard && (
            <div className="mt-5 rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Selected Card
              </p>
              <h3 className="mt-2 text-lg font-bold">{selectedCard.card}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {selectedCard.player} • {selectedCard.grade} •{" "}
                <span
                  className={
                    selectedCard.status === "Sold"
                      ? "font-bold text-vaultGold"
                      : "text-zinc-400"
                  }
                >
                  {selectedCard.status}
                </span>
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniDarkStat
                  label="Purchase"
                  value={money(selectedCard.purchasePrice)}
                />
                <MiniDarkStat
                  label="Est. Value"
                  value={money(selectedCard.estimatedValue)}
                />
              </div>
            </div>
          )}
        </Panel>

        <Panel className="col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-vaultGold">
                {editingSaleId ? "Edit Sale Record" : "Record Sale"}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                {editingSaleId
                  ? "Update the sale details below and save your changes."
                  : "Add a closed sale and automatically move the card to sold status."}
              </p>
            </div>

            {editingSaleId && (
              <button
                type="button"
                onClick={resetSaleForm}
                className="rounded-lg border border-steelBorder px-4 py-2 text-xs font-black uppercase tracking-widest text-zinc-300 transition hover:border-vaultGold hover:text-vaultGold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Select
              label="Sale Status"
              value={saleStatus}
              onChange={setSaleStatus}
              options={["Sold", "Listed", "Pending", "Traded", "Removed"]}
            />

            <Input
              label="Platform / Show"
              value={platform}
              onChange={setPlatform}
              placeholder="eBay, Whatnot, Show..."
            />

            <Input
              label="Sale Date"
              value={saleDate}
              onChange={setSaleDate}
              placeholder="YYYY-MM-DD"
            />

            <Input
              label="Sale Price"
              value={salePrice}
              onChange={setSalePrice}
              placeholder="0.00"
            />
          </div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            <Input
              label="Fees"
              value={fees}
              onChange={setFees}
              placeholder="0.00"
            />

            <Input
              label="Shipping Cost"
              value={shippingCost}
              onChange={setShippingCost}
              placeholder="0.00"
            />

            <Input
              label="Taxes"
              value={taxes}
              onChange={setTaxes}
              placeholder="0.00"
            />

            <Input
              label="Buyer / Source"
              value={buyerSource}
              onChange={setBuyerSource}
              placeholder="Buyer, dealer, show..."
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <MiniDarkStat
              label="Net Proceeds"
              value={money(netProceeds)}
              positive={netProceeds >= 0}
            />
            <MiniDarkStat
              label="Profit / Loss"
              value={money(profitLoss)}
              positive={profitLoss >= 0}
            />
            <MiniDarkStat
              label="ROI"
              value={`${roi.toFixed(1)}%`}
              positive={roi >= 0}
            />
          </div>

          <Textarea
            label="Sale Notes"
            value={notes}
            onChange={setNotes}
            placeholder="Add notes about buyer, platform, negotiation, shipping, margin, or whether this card should remain in the personal collection..."
          />

          <button
            type="button"
            onClick={handleRecordSale}
            className="mt-5 rounded-xl border border-vaultGold bg-vaultGold px-5 py-3 text-sm font-black uppercase tracking-widest text-black shadow-lg shadow-vaultGold/20 transition hover:bg-goldHover"
          >
            {editingSaleId ? "Update Sale Record" : "Save Sale Record"}
          </button>
        </Panel>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Panel className="col-span-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Recorded Sales</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Real closed sales by platform, sale date, proceeds, profit, and
                ROI.
              </p>
            </div>

            <div className="min-w-[220px]">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500">
                  Filter Platform
                </span>
                <select
                  value={platformFilter}
                  onChange={(event) => setPlatformFilter(event.target.value)}
                  className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm font-bold text-white outline-none focus:border-vaultGold"
                >
                  {platformOptions.map((platformName) => (
                    <option key={platformName} value={platformName}>
                      {platformName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {sales.length > 0 && (
            <div className="mb-5 grid grid-cols-4 gap-4">
              <MiniDarkStat
                label={`${platformFilter} Revenue`}
                value={money(filteredRevenue)}
                positive={filteredRevenue >= 0}
              />
              <MiniDarkStat
                label={`${platformFilter} Net`}
                value={money(filteredNetProceeds)}
                positive={filteredNetProceeds >= 0}
              />
              <MiniDarkStat
                label={`${platformFilter} Profit`}
                value={money(filteredProfit)}
                positive={filteredProfit >= 0}
              />
              <MiniDarkStat
                label={`${platformFilter} Cost Rate`}
                value={`${filteredSellingCostRate.toFixed(1)}%`}
                positive={filteredSellingCostRate <= 20}
              />
            </div>
          )}

          {filteredSales.length === 0 ? (
            <div className="rounded-xl border border-dashed border-steelBorder bg-black/30 p-8 text-center">
              <p className="text-lg font-bold text-vaultGold">
                No sales recorded yet.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Use the Record Sale form above to add your first real sale.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-steelBorder">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-black text-xs uppercase tracking-widest text-vaultGold">
                  <tr>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Card</th>
                    <th className="px-4 py-4">Player</th>
                    <th className="px-4 py-4">Platform</th>
                    <th className="px-4 py-4">Sale Price</th>
                    <th className="px-4 py-4">Net</th>
                    <th className="px-4 py-4">Profit</th>
                    <th className="px-4 py-4">ROI</th>
                    <th className="px-4 py-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="border-t border-steelBorder bg-graphite900/60"
                    >
                      <td className="px-4 py-4 text-zinc-300">
                        {sale.saleDate}
                      </td>
                      <td className="px-4 py-4 font-bold">{sale.cardName}</td>
                      <td className="px-4 py-4 text-zinc-300">
                        {sale.player}
                      </td>
                      <td className="px-4 py-4 text-vaultGold">
                        {sale.platform}
                      </td>
                      <td className="px-4 py-4">{money(sale.salePrice)}</td>
                      <td className="px-4 py-4 text-profitGreen">
                        {money(sale.netProceeds)}
                      </td>
                      <td
                        className={`px-4 py-4 ${
                          sale.profitLoss >= 0
                            ? "text-profitGreen"
                            : "text-red-400"
                        }`}
                      >
                        {money(sale.profitLoss)}
                      </td>
                      <td className="px-4 py-4">{sale.roi.toFixed(1)}%</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditSale(sale)}
                            className="rounded-lg border border-vaultGold/70 px-3 py-2 text-xs font-bold uppercase tracking-widest text-vaultGold transition hover:bg-vaultGold/10"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteSale(sale.id)}
                            className="rounded-lg border border-red-500/50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-red-300 transition hover:bg-red-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel className="col-span-4">
          <h2 className="text-lg font-bold text-vaultGold">Sales Decision</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-vaultGold/40 bg-vaultGold/10 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-vaultGold">
                Seller Performance Score
              </p>

              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-4xl font-black text-white">
                  {salesPerformanceScore}
                </p>

                <div className="text-right">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                    Avg. ROI
                  </p>
                  <p className="text-lg font-black text-vaultGold">
                    {averageRoi.toFixed(1)}%
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-zinc-300">
                {salesPerformanceMessage}
              </p>
            </div>

            <MiniDarkStat
              label="Total Revenue"
              value={money(totalRevenue)}
              positive={totalRevenue >= 0}
            />
            <MiniDarkStat
              label="Total Net Proceeds"
              value={money(totalNetProceeds)}
              positive={totalNetProceeds >= 0}
            />
            <MiniDarkStat
              label="Total Profit"
              value={money(totalProfit)}
              positive={totalProfit >= 0}
            />
            <MiniDarkStat
              label="Average Profit"
              value={money(averageProfit)}
              positive={averageProfit >= 0}
            />

            <div className="rounded-xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Fee Impact
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <MiniDarkStat
                  label="Fees"
                  value={money(totalFees)}
                  positive={totalFees <= totalRevenue * 0.15}
                />
                <MiniDarkStat
                  label="Shipping"
                  value={money(totalShippingCosts)}
                  positive={totalShippingCosts <= totalRevenue * 0.1}
                />
                <MiniDarkStat
                  label="Taxes"
                  value={money(totalTaxes)}
                  positive={totalTaxes <= totalRevenue * 0.1}
                />
                <MiniDarkStat
                  label="Cost Rate"
                  value={`${sellingCostRate.toFixed(1)}%`}
                  positive={sellingCostRate <= 20}
                />
              </div>

              <p className="mt-4 text-xs leading-5 text-zinc-400">
                Selling costs include platform fees, shipping cost, and taxes.
                Lower cost rate usually means stronger platform efficiency.
              </p>
            </div>

            {bestSale && (
              <div className="rounded-xl border border-steelBorder bg-black/40 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Best Sale
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  {bestSale.player}
                </p>
                <p className="text-xs text-zinc-400">{bestSale.cardName}</p>
                <p className="mt-2 text-lg font-black text-profitGreen">
                  {money(bestSale.profitLoss)}
                </p>
              </div>
            )}

            {highestRoiSale && (
              <div className="rounded-xl border border-steelBorder bg-black/40 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Highest ROI
                </p>
                <p className="mt-2 text-sm font-bold text-white">
                  {highestRoiSale.player}
                </p>
                <p className="text-xs text-zinc-400">
                  {highestRoiSale.cardName}
                </p>
                <p className="mt-2 text-lg font-black text-vaultGold">
                  {highestRoiSale.roi.toFixed(1)}%
                </p>
              </div>
            )}

            {topPlatform && (
              <div className="rounded-xl border border-vaultGold/40 bg-vaultGold/10 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-vaultGold">
                  Best Platform
                </p>
                <p className="mt-2 text-lg font-black text-white">
                  {topPlatform[0]}
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  {topPlatform[1].count} sale
                  {topPlatform[1].count === 1 ? "" : "s"} •{" "}
                  {money(topPlatform[1].revenue)} revenue
                </p>
                <p
                  className={`mt-2 text-lg font-black ${
                    topPlatform[1].profit >= 0
                      ? "text-profitGreen"
                      : "text-red-400"
                  }`}
                >
                  {money(topPlatform[1].profit)} profit
                </p>
              </div>
            )}

            {Object.entries(platformBreakdown).length > 0 && (
              <div className="rounded-xl border border-steelBorder bg-black/40 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Platform Breakdown
                </p>

                <div className="mt-4 space-y-3">
                  {Object.entries(platformBreakdown)
                    .sort(
                      ([, platformA], [, platformB]) =>
                        platformB.profit - platformA.profit
                    )
                    .map(([platformName, platformStats]) => (
                      <div
                        key={platformName}
                        className="rounded-lg border border-steelBorder bg-graphite900/70 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-black text-white">
                            {platformName}
                          </p>
                          <p className="text-xs font-bold text-vaultGold">
                            {platformStats.count} sale
                            {platformStats.count === 1 ? "" : "s"}
                          </p>
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                              Revenue
                            </p>
                            <p className="text-sm font-bold text-zinc-200">
                              {money(platformStats.revenue)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                              Profit
                            </p>
                            <p
                              className={`text-sm font-bold ${
                                platformStats.profit >= 0
                                  ? "text-profitGreen"
                                  : "text-red-400"
                              }`}
                            >
                              {money(platformStats.profit)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}

function ComingSoonScreen({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <PageHeader eyebrow="CardVault Pro" title={title} subtitle={subtitle} />

      <Panel>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-vaultGold/40 bg-vaultGold/10 text-vaultGold">
            <BarChart3 />
          </div>
          <div>
            <h2 className="text-xl font-bold">Coming next</h2>
            <p className="mt-1 text-zinc-400">
              This screen is part of the product roadmap and will be expanded
              after the Phase 1 user-flow review.
            </p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function SettingsScreen({
  resetDemoData,
}: {
  resetDemoData: () => void;
}) {
  const betaFeatureCount = useMemo(() => 4, []);

  return (
    <>
      <PageHero
        title="Settings"
        subtitle="Manage branding, report defaults, inventory defaults, grading defaults, sales defaults, and data export."
      />

      <div className="grid grid-cols-12 gap-6">
        <Panel className="col-span-4">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-vaultGold/50 bg-black shadow-vault">
              <img
                src={cardgemzLogo}
                alt="CARDGEMZ logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-vaultGold">
                App Branding
              </p>
              <h2 className="text-xl font-bold">CARDGEMZ Vault Pro</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Current project logo locked for Phase 1.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <SettingInfoRow label="App Logo" value="CARDGEMZ logo active" />
            <SettingInfoRow label="Report Logo" value="Phoenix report logo" />
            <SettingInfoRow label="Theme" value="Black / Graphite / Gold" />
            <SettingInfoRow label="Font Style" value="Current app font locked" />
          </div>

          <div className="mt-5 rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
            <p className="text-sm font-bold text-vaultGold">Brand Note</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              CARDGEMZ branding stays inside the app for this build. CardVault
              Pro’s standalone marketing logo is saved for legal, trademark,
              advertising, and public launch stages.
            </p>
          </div>
        </Panel>

        <Panel className="col-span-8">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Report Branding
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <SettingCard
              title="Report Header"
              value="CARDGEMZ Vault Pro"
              description="Used on player collection and card analysis reports."
            />
            <SettingCard
              title="Watermark"
              value="Phoenix Logo"
              description="Large centered watermark behind report content."
            />
            <SettingCard
              title="Export Style"
              value="Word / PDF Preview"
              description="Printable black, white, graphite, and gold report style."
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <Select
              label="Default Report Type"
              value="Player Collection Report"
              onChange={() => null}
              options={[
                "Player Collection Report",
                "Card Analysis Report",
                "Insurance Report",
                "Tax / Profit Report",
              ]}
            />
            <Select
              label="Watermark Strength"
              value="Medium"
              onChange={() => null}
              options={["Light", "Medium", "Strong"]}
            />
            <Select
              label="Report Date Format"
              value="Month Day, Year"
              onChange={() => null}
              options={["Month Day, Year", "MM/DD/YYYY", "YYYY-MM-DD"]}
            />
          </div>
        </Panel>

        <Panel className="col-span-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Inventory Defaults
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Default Sport / Category"
              value="Basketball"
              onChange={() => null}
              options={[
                "Basketball",
                "Football",
                "Baseball",
                "Pokemon",
                "One Piece",
                "Other",
              ]}
            />
            <Select
              label="Default Collection Status"
              value="Personal Collection"
              onChange={() => null}
              options={[
                "Personal Collection",
                "For Sale",
                "Watchlist",
                "Grade Candidate",
              ]}
            />
            <Input
              label="Default Storage Prefix"
              value="Vault A"
              onChange={() => null}
              placeholder="Vault A"
            />
            <Input
              label="SKU Prefix"
              value="CVP"
              onChange={() => null}
              placeholder="CVP"
            />
          </div>
        </Panel>

        <Panel className="col-span-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Grading Defaults
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Preferred Grader"
              value="PSA"
              onChange={() => null}
              options={["PSA", "BGS", "SGC", "CGC", "TAG"]}
            />
            <Select
              label="Default Grading Status"
              value="Not Graded"
              onChange={() => null}
              options={["Not Graded", "Planning", "Submitted", "Returned"]}
            />
            <Input
              label="Default Grading Cost"
              value="$45"
              onChange={() => null}
              placeholder="$0.00"
            />
            <Select
              label="Grade Estimate Disclaimer"
              value="Enabled"
              onChange={() => null}
              options={["Enabled", "Disabled"]}
            />
          </div>

          <div className="mt-5 rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
            <p className="text-sm font-bold text-vaultGold">
              Grading Disclaimer
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Grade estimates are personal planning tools only. Official grades
              must come from PSA, BGS, SGC, CGC, TAG, or another grading
              authority.
            </p>
          </div>
        </Panel>

        <Panel className="col-span-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Sales Defaults
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Default Sales Platform"
              value="eBay"
              onChange={() => null}
              options={["eBay", "Whatnot", "Card Show", "Private Sale", "Other"]}
            />
            <Input
              label="Platform Fee Assumption"
              value="13.25%"
              onChange={() => null}
              placeholder="13.25%"
            />
            <Input
              label="Default Shipping Cost"
              value="$6.50"
              onChange={() => null}
              placeholder="$0.00"
            />
            <Select
              label="Default Sale Status"
              value="Not Listed"
              onChange={() => null}
              options={["Not Listed", "Listed", "Sold", "Traded", "Removed"]}
            />
          </div>
        </Panel>

        <Panel className="col-span-6">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Data Import / Export
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <SettingActionCard
              title="CSV Import"
              description="Bulk upload cards from a spreadsheet."
              status="Phase 2"
            />
            <SettingActionCard
              title="CSV Export"
              description="Download inventory and sales data."
              status="Phase 1 Ready"
            />
            <SettingActionCard
              title="Backup Vault"
              description="Export full collection backup."
              status="Phase 2"
            />
            <SettingActionCard
              title="Report Downloads"
              description="Export player and card analysis reports."
              status="Phase 1 Preview"
            />
          </div>
        </Panel>

        <Panel className="col-span-12">
          <div className="flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
                Developer Utility
              </p>
              <h3 className="mt-2 text-2xl font-black text-white">
                Reset Demo Data
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Restore the original sample cards and clear your current local test data.
              </p>
            </div>

            <button
              onClick={resetDemoData}
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3 text-sm font-black text-red-300 hover:bg-red-500/20"
            >
              Reset Data
            </button>
          </div>
        </Panel>

        <Panel className="col-span-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-vaultGold">
                Beta Features Roadmap
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                These features are intentionally visible for product planning but
                not connected in GOAT Phase 1.
              </p>
            </div>

            <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
              {betaFeatureCount} Beta Planned
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <BetaFeatureCard
              title="Camera Scan Mode"
              description="Capture card images and begin scan-assisted card entry."
              status="Camera / Beta Phase"
            />
            <BetaFeatureCard
              title="Market Comps Automation"
              description="Pull eBay-style market references after scan or card lookup."
              status="Camera / Beta Phase"
            />
            <BetaFeatureCard
              title="eBay Purchase Import"
              description="Upload receipt, screenshot, or order email to auto-fill purchase fields."
              status="Beta Phase"
            />
            <BetaFeatureCard
              title="AI Grade Estimate"
              description="Review front/back card image quality for personal grading estimate."
              status="Beta Phase"
            />
          </div>
        </Panel>
      </div>
    </>
  );
}

function compressImageFile(
  file: File,
  maxWidth = 900,
  quality = 0.72
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");

        const scale = Math.min(1, maxWidth / image.width);
        canvas.width = image.width * scale;
        canvas.height = image.height * scale;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Could not create image compression context."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

        resolve(compressedDataUrl);
      };

      image.onerror = () => {
        reject(new Error("Could not load image for compression."));
      };

      image.src = String(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Could not read image file."));
    };

    reader.readAsDataURL(file);
  });
}

function ScanReviewQueue({
  temporaryScans,
  openTemporaryScanDetail,
  createDemoTemporaryScan,
  createTemporaryScanFromImages,
  updateTemporaryScanBetaDecision,
  exportDallasBetaBackup,
  betaFeedback,
  newBetaFeedback,
  setNewBetaFeedback,
  addBetaFeedbackNote,
}: {
  temporaryScans: TemporaryScanRecord[];
  openTemporaryScanDetail: (scanId: number) => void;
  createDemoTemporaryScan: () => void;
  createTemporaryScanFromImages: (frontImage: string, backImage: string) => void;
  updateTemporaryScanBetaDecision: (
    scanId: number,
    betaDecision: TemporaryScanRecord["betaDecision"]
  ) => void;
  exportDallasBetaBackup: () => void;
  betaFeedback: BetaFeedbackRecord[];
  newBetaFeedback: BetaFeedbackRecord;
  setNewBetaFeedback: React.Dispatch<React.SetStateAction<BetaFeedbackRecord>>;
  addBetaFeedbackNote: () => void;
}) {
  const [frontUploadPreview, setFrontUploadPreview] = useState("");
  const [backUploadPreview, setBackUploadPreview] = useState("");

  const needsReviewScans = temporaryScans.filter(
    (scan) => scan.scanStatus === "Needs Review"
  );

  const readyToKeepScans = temporaryScans.filter(
    (scan) => scan.scanStatus === "Ready to Keep"
  );

  const readyToSellScans = temporaryScans.filter(
    (scan) => scan.scanStatus === "Ready to Sell"
  );

  const buyDecisionScans = temporaryScans.filter(
    (scan) => scan.betaDecision === "Buy"
  );

  const watchDecisionScans = temporaryScans.filter(
    (scan) => scan.betaDecision === "Watch"
  );

  const passDecisionScans = temporaryScans.filter(
    (scan) => scan.betaDecision === "Pass"
  );

  const betaStorageIsWarning =
    temporaryScans.length >= TEMPORARY_SCAN_WARNING_LIMIT;

  async function handleTemporaryImageUpload(
    side: "front" | "back",
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const compressedImage = await compressImageFile(file);

      if (side === "front") {
        setFrontUploadPreview(compressedImage);
      } else {
        setBackUploadPreview(compressedImage);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      window.alert(
        "CardVault could not process this image. Try a smaller image or screenshot."
      );
    }
  }

  function createUploadedScan() {
    if (!frontUploadPreview && !backUploadPreview) {
      window.alert(
        "No card images detected. Upload a front image, back image, or both before creating a temporary scan."
      );
      return;
    }

    createTemporaryScanFromImages(frontUploadPreview, backUploadPreview);

    setFrontUploadPreview("");
    setBackUploadPreview("");
  }

  function statusBadgeClass(scanStatus: TemporaryScanRecord["scanStatus"]) {
    if (scanStatus === "Ready to Keep") {
      return "border-profitGreen/40 bg-profitGreen/10 text-profitGreen";
    }

    if (scanStatus === "Ready to Sell") {
      return "border-vaultGold/50 bg-vaultGold/10 text-vaultGold";
    }

    return "border-zinc-600 bg-zinc-900/70 text-zinc-300";
  }

  return (
    <>
      <PageHeader
        eyebrow="Phase 6.7 Dallas Card Show Beta Prep"
        title="Scan Review Queue"
        subtitle="Temporary holding area for scanned or uploaded cards before they are added to your collection or moved to the sell queue."
      />

      <div className="mt-4 rounded-2xl border border-vaultGold/25 bg-black/60 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p
              className={`text-xs font-black uppercase tracking-[0.25em] ${
                betaStorageIsWarning ? "text-red-400" : "text-vaultGold"
              }`}
            >
              Beta Storage: {temporaryScans.length}/{MAX_TEMPORARY_SCANS}
            </p>

            <p className="mt-1 text-sm font-semibold text-zinc-400">
              Dallas Card Show temporary scan capacity. Warning begins at{" "}
              {TEMPORARY_SCAN_WARNING_LIMIT} scans.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`rounded-xl border px-4 py-2 text-xs font-black uppercase tracking-[0.2em] ${
                betaStorageIsWarning
                  ? "border-red-400/60 bg-red-950/40 text-red-300"
                  : "border-vaultGold/40 bg-vaultGold/10 text-vaultGold"
              }`}
            >
              {betaStorageIsWarning ? "Storage Warning" : "Beta Ready"}
            </div>

            <button
              type="button"
              onClick={exportDallasBetaBackup}
              className="min-h-[44px] rounded-xl border border-vaultGold bg-vaultGold px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-black shadow-vault transition hover:bg-goldHover active:scale-[0.98]"
            >
              Export Beta Backup
            </button>
          </div>
        </div>
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Temporary Scan Workflow
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              Upload Card Images
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Upload a front and back card image. CardVault Pro will create a
              temporary scan record first, then you can review it before sending
              it to your collection or sell queue.
            </p>
          </div>

          <button
            type="button"
            onClick={createDemoTemporaryScan}
            className="min-h-[46px] rounded-xl border border-vaultGold/50 bg-black/50 px-6 py-3 text-sm font-black text-vaultGold shadow-vault transition hover:bg-vaultGold hover:text-black active:scale-[0.98]"
          >
            + Create Demo Scan
          </button>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr_260px]">
          <div className="rounded-2xl border border-vaultGold/25 bg-black/60 p-4">
            <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Front Image
            </p>

            <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-steelBorder bg-graphite900/70 p-3">
              {frontUploadPreview ? (
                <img
                  src={frontUploadPreview}
                  alt="Front upload preview"
                  className="max-h-[240px] w-full rounded-lg object-contain"
                />
              ) : (
                <p className="text-center text-xs font-black uppercase tracking-widest text-zinc-500">
                  No Front Image Uploaded
                </p>
              )}
            </div>

            <label
              htmlFor="temporary-front-upload"
              className="mt-4 flex min-h-[46px] cursor-pointer items-center justify-center rounded-xl border border-vaultGold/50 bg-vaultGold/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-vaultGold transition hover:bg-vaultGold hover:text-black active:scale-[0.98]"
            >
              Upload Front
            </label>

            <input
              id="temporary-front-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleTemporaryImageUpload("front", event)}
            />
          </div>

          <div className="rounded-2xl border border-vaultGold/25 bg-black/60 p-4">
            <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Back Image
            </p>

            <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-steelBorder bg-graphite900/70 p-3">
              {backUploadPreview ? (
                <img
                  src={backUploadPreview}
                  alt="Back upload preview"
                  className="max-h-[240px] w-full rounded-lg object-contain"
                />
              ) : (
                <p className="text-center text-xs font-black uppercase tracking-widest text-zinc-500">
                  No Back Image Uploaded
                </p>
              )}
            </div>

            <label
              htmlFor="temporary-back-upload"
              className="mt-4 flex min-h-[46px] cursor-pointer items-center justify-center rounded-xl border border-vaultGold/50 bg-vaultGold/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-vaultGold transition hover:bg-vaultGold hover:text-black active:scale-[0.98]"
            >
              Upload Back
            </label>

            <input
              id="temporary-back-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleTemporaryImageUpload("back", event)}
            />
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-vaultGold/25 bg-black/60 p-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
                Next Step
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                Create Temporary Scan
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                This will send the uploaded images into the Scan Review Queue as
                a temporary card detail.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={createUploadedScan}
                className="min-h-[48px] w-full rounded-xl border border-vaultGold bg-vaultGold px-5 py-3 text-sm font-black text-black shadow-vault transition hover:bg-goldHover active:scale-[0.98]"
              >
                Create Scan From Images
              </button>

              <button
                type="button"
                onClick={() => {
                  setFrontUploadPreview("");
                  setBackUploadPreview("");
                }}
                className="min-h-[46px] w-full rounded-xl border border-steelBorder bg-black/50 px-5 py-3 text-sm font-bold text-zinc-300 transition hover:text-white active:scale-[0.98]"
              >
                Clear Uploads
              </button>
            </div>
          </div>
        </div>
      </Panel>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
            Beta Storage
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {temporaryScans.length}/{MAX_TEMPORARY_SCANS}
          </p>
        </div>

        <div className="rounded-2xl border border-profitGreen/30 bg-profitGreen/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-profitGreen">
            Buy
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {buyDecisionScans.length}
          </p>
        </div>

        <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
            Watch
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {watchDecisionScans.length}
          </p>
        </div>

        <div className="rounded-2xl border border-red-700/40 bg-red-950/30 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400">
            Pass
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {passDecisionScans.length}
          </p>
        </div>

        <div className="rounded-2xl border border-profitGreen/30 bg-profitGreen/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-profitGreen">
            Ready to Keep
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {readyToKeepScans.length}
          </p>
        </div>

        <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
            Ready to Sell
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {readyToSellScans.length}
          </p>
        </div>
      </div>

      {temporaryScans.length === 0 ? (
        <Panel className="mt-6">
          <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-vaultGold/40 bg-vaultGold/10 text-4xl text-vaultGold">
              📷
            </div>

            <h3 className="mt-5 text-2xl font-black text-white">
              No Temporary Scans Yet
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              Upload card images above or create a demo scan to test the review
              workflow.
            </p>
          </div>
        </Panel>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {temporaryScans.map((scan) => (
            <article
              key={scan.id}
              className="group rounded-3xl border border-vaultGold/25 bg-black/70 p-5 shadow-[0_0_35px_rgba(0,0,0,0.45)] transition hover:border-vaultGold hover:shadow-[0_0_45px_rgba(245,196,81,0.16)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] ${statusBadgeClass(
                    scan.scanStatus
                  )}`}
                >
                  {scan.scanStatus}
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
                  {scan.scanSource}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex h-48 items-center justify-center rounded-2xl border border-vaultGold/25 bg-graphite900/70">
                  {scan.frontImage ? (
                    <img
                      src={scan.frontImage}
                      alt="Temporary front scan"
                      className="h-full w-full rounded-2xl object-contain p-2"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                        Front
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                        Missing
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex h-48 items-center justify-center rounded-2xl border border-vaultGold/25 bg-graphite900/70">
                  {scan.backImage ? (
                    <img
                      src={scan.backImage}
                      alt="Temporary back scan"
                      className="h-full w-full rounded-2xl object-contain p-2"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                        Back
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                        Missing
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl font-black text-white">
                  {scan.player}
                </h3>

                <p className="mt-1 text-sm leading-5 text-zinc-400">
                  {scan.year} {scan.brand} {scan.card}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                    <p className="font-black uppercase text-zinc-500">
                      Images
                    </p>
                    <p className="mt-1 font-bold text-white">
                      {scan.frontImage ? "Front" : "No Front"} /{" "}
                      {scan.backImage ? "Back" : "No Back"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                    <p className="font-black uppercase text-zinc-500">Value</p>
                    <p className="mt-1 font-bold text-white">
                      ${scan.estimatedValue.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {(["Buy", "Watch", "Pass"] as TemporaryScanRecord["betaDecision"][]).map(
                    (decision) => (
                      <button
                        key={decision}
                        type="button"
                        onClick={() =>
                          updateTemporaryScanBetaDecision(scan.id, decision)
                        }
                        className={`min-h-[46px] rounded-xl border px-3 py-3 text-sm font-black uppercase tracking-widest transition active:scale-[0.98] ${
                          scan.betaDecision === decision
                            ? "border-vaultGold bg-vaultGold text-black"
                            : "border-steelBorder bg-black/50 text-zinc-400 hover:border-vaultGold hover:text-vaultGold"
                        }`}
                      >
                        {decision}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openTemporaryScanDetail(scan.id)}
                  className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-xl border border-vaultGold/50 bg-vaultGold/10 px-5 py-3 text-sm font-black text-vaultGold transition hover:bg-vaultGold hover:text-black active:scale-[0.98]"
                >
                  Open Review →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Panel className="mt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Phase 6.6 Beta Feedback Log
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              Dallas Card Show Field Notes
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Capture bugs, workflow issues, mobile layout problems, feature
              requests, and pricing/dealer tracking notes during live beta
              testing.
            </p>
          </div>

          <div className="rounded-xl border border-vaultGold/40 bg-vaultGold/10 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-vaultGold">
            {betaFeedback.length} Notes
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[220px_180px_1fr_180px]">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500">
              Category
            </label>

            <select
              value={newBetaFeedback.category}
              onChange={(event) =>
                setNewBetaFeedback((currentFeedback) => ({
                  ...currentFeedback,
                  category:
                    event.target.value as BetaFeedbackRecord["category"],
                }))
              }
              className="w-full rounded-xl border border-steelBorder bg-black/60 px-4 py-3 text-sm font-bold text-white outline-none focus:border-vaultGold"
            >
              <option value="Workflow">Workflow</option>
              <option value="Quick Scan">Quick Scan</option>
              <option value="Mobile Layout">Mobile Layout</option>
              <option value="Pricing">Pricing</option>
              <option value="Dealer Tracking">Dealer Tracking</option>
              <option value="Decision Flow">Decision Flow</option>
              <option value="Bug">Bug</option>
              <option value="Feature Request">Feature Request</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500">
              Priority
            </label>

            <select
              value={newBetaFeedback.priority}
              onChange={(event) =>
                setNewBetaFeedback((currentFeedback) => ({
                  ...currentFeedback,
                  priority:
                    event.target.value as BetaFeedbackRecord["priority"],
                }))
              }
              className="w-full rounded-xl border border-steelBorder bg-black/60 px-4 py-3 text-sm font-bold text-white outline-none focus:border-vaultGold"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-zinc-500">
              Feedback Note
            </label>

            <textarea
              value={newBetaFeedback.note}
              onChange={(event) =>
                setNewBetaFeedback((currentFeedback) => ({
                  ...currentFeedback,
                  note: event.target.value,
                }))
              }
              className="min-h-[100px] w-full rounded-xl border border-steelBorder bg-black/60 p-3 text-sm text-white outline-none focus:border-vaultGold"
              placeholder="Example: Buttons need to be bigger on mobile while walking the show floor."
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={addBetaFeedbackNote}
              className="min-h-[48px] w-full rounded-xl border border-vaultGold bg-vaultGold px-5 py-3 text-sm font-black text-black shadow-vault transition hover:bg-goldHover active:scale-[0.98]"
            >
              Save Note
            </button>
          </div>
        </div>

        {betaFeedback.length > 0 && (
          <div className="mt-6 space-y-3">
            {betaFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="rounded-2xl border border-steelBorder bg-black/50 p-4"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-vaultGold/40 bg-vaultGold/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-vaultGold">
                        {feedback.category}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                          feedback.priority === "High"
                            ? "border-red-500/50 bg-red-950/40 text-red-300"
                            : feedback.priority === "Medium"
                            ? "border-vaultGold/40 bg-vaultGold/10 text-vaultGold"
                            : "border-steelBorder bg-black/40 text-zinc-400"
                        }`}
                      >
                        {feedback.priority}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-300">
                      {feedback.note}
                    </p>
                  </div>

                  <p className="text-xs font-bold text-zinc-500">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </>
  );
}

function TemporaryCardDetail({
  scan,
  updateTemporaryScan,
  addTemporaryScanToCollection,
  moveTemporaryScanToSellQueue,
  deleteTemporaryScan,
  setActiveScreen,
}: {
  scan: TemporaryScanRecord;
  updateTemporaryScan: (updatedScan: TemporaryScanRecord) => void;
  addTemporaryScanToCollection: (scan: TemporaryScanRecord) => void;
  moveTemporaryScanToSellQueue: (scan: TemporaryScanRecord) => void;
  deleteTemporaryScan: (scanId: number) => void;
  setActiveScreen: React.Dispatch<React.SetStateAction<Screen>>;
}) {
  const [isEditing, setIsEditing] = useState(false);

function normalizeTemporaryScanBetaFields(
  currentScan: TemporaryScanRecord
): TemporaryScanRecord {
  return {
    ...currentScan,
    boothNumber: currentScan.boothNumber ?? "",
    dealerName: currentScan.dealerName ?? "",
    askingPrice: currentScan.askingPrice ?? 0,
    recentComp: currentScan.recentComp ?? 0,
    offerTarget: currentScan.offerTarget ?? 0,
    maxBuyPrice: currentScan.maxBuyPrice ?? 0,
    negotiationNotes: currentScan.negotiationNotes ?? "",
    betaDecision: currentScan.betaDecision ?? "Watch",
  };
}

const [editScan, setEditScan] = useState<TemporaryScanRecord>(() =>
  normalizeTemporaryScanBetaFields(scan)
);

const [saveMessage, setSaveMessage] = useState("");
  const [pendingDeleteScanId, setPendingDeleteScanId] = useState<number | null>(
    null
  );
  const [pendingScanAction, setPendingScanAction] = useState<
    "keep" | "sell" | null
  >(null);

 useEffect(() => {
  setEditScan(normalizeTemporaryScanBetaFields(scan));
}, [scan]);

const displayScan = isEditing
  ? normalizeTemporaryScanBetaFields(editScan)
  : normalizeTemporaryScanBetaFields(scan);

  const marketValue = displayScan.estimatedValue || 0;
  const costBasis =
    displayScan.totalCostBasis || displayScan.purchasePrice || 0;
  const profitLoss = marketValue - costBasis;
  const roi = costBasis > 0 ? (profitLoss / costBasis) * 100 : 0;

  function updateEditField<K extends keyof TemporaryScanRecord>(
    field: K,
    value: TemporaryScanRecord[K]
  ) {
    setEditScan((currentScan) => ({
      ...currentScan,
      [field]: value,
    }));
  }

  function updateEditNumberField<K extends keyof TemporaryScanRecord>(
    field: K,
    value: string
  ) {
    const numericValue = Number(value) || 0;

    setEditScan((currentScan) => ({
      ...currentScan,
      [field]: numericValue,
    }));
  }

  function saveTemporaryScanChanges() {
    const recalculatedCostBasis =
      editScan.totalCostBasis ||
      editScan.purchasePrice + editScan.taxesFees + editScan.shippingCost;

    const recalculatedGainLoss =
      editScan.estimatedValue - recalculatedCostBasis;

    const recalculatedRoi =
      recalculatedCostBasis > 0
        ? (recalculatedGainLoss / recalculatedCostBasis) * 100
        : 0;

    updateTemporaryScan({
      ...editScan,
      totalCostBasis: recalculatedCostBasis,
      gainLoss: recalculatedGainLoss,
      roi: recalculatedRoi,
      scanStatus: "Ready to Keep",
    });

    setIsEditing(false);
    setSaveMessage("Temporary scan updated successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  }

  function confirmDeleteTemporaryScan() {
    if (pendingDeleteScanId === null) return;

    deleteTemporaryScan(pendingDeleteScanId);
    setPendingDeleteScanId(null);
  }

  function cancelDeleteTemporaryScan() {
    setPendingDeleteScanId(null);
  }

  function confirmTemporaryScanAction() {
    if (pendingScanAction === "keep") {
      addTemporaryScanToCollection(displayScan);
    }

    if (pendingScanAction === "sell") {
      moveTemporaryScanToSellQueue(displayScan);
    }

    setPendingScanAction(null);
  }

  function cancelTemporaryScanAction() {
    setPendingScanAction(null);
  }

  function runSimulatedAiReview() {
    const simulatedAiScan: TemporaryScanRecord = {
      ...displayScan,
      player:
        displayScan.player === "Pending Identification"
          ? "Victor Wembanyama"
          : displayScan.player,
      card:
        displayScan.card === "Uploaded Card Scan" ||
        displayScan.card === "Temporary Scan Record"
          ? "Rookie Card"
          : displayScan.card,
      team:
        displayScan.team === "Pending"
          ? "San Antonio Spurs"
          : displayScan.team,
      sport:
        displayScan.sport === "Pending" ? "Basketball" : displayScan.sport,
      year: displayScan.year === "Pending" ? "2023-24" : displayScan.year,
      brand:
        displayScan.brand === "Pending" ? "Panini Prizm" : displayScan.brand,
      set:
        displayScan.set === "Pending"
          ? "2023-24 Panini Prizm"
          : displayScan.set,
      cardNumber:
        displayScan.cardNumber === "Pending" ? "136" : displayScan.cardNumber,
      parallel:
        displayScan.parallel === "Pending"
          ? "Base Rookie"
          : displayScan.parallel,
      estimatedValue: displayScan.estimatedValue || 125,
      lastSale: displayScan.lastSale || 118,
      averageComp: displayScan.averageComp || 125,
      highComp: displayScan.highComp || 155,
      lowComp: displayScan.lowComp || 95,
      compConfidence: "Simulated AI Match",
      scanStatus: "Ready to Keep",
      aiReviewStatus: "Simulated Review Complete",
      aiConfidence: "87%",
      aiSuggestedMatch:
        "2023-24 Panini Prizm Victor Wembanyama Rookie Card #136",
      notes: `${displayScan.notes}

Simulated AI Review:
CardVault Pro identified a likely match and filled in suggested card details. This is a Phase 5.7 front-end simulation only and will later connect to real camera AI, OCR, and market data.`,
    };

    updateTemporaryScan(simulatedAiScan);
    setEditScan(simulatedAiScan);
    setSaveMessage("Simulated AI review complete. Backend AI connection pending.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  }

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-[0.045]">
        <img
          src="/safe-door-emblem.png"
          alt=""
          className="h-[760px] w-[760px] object-contain grayscale"
        />
      </div>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-vaultGold">
            Temporary Card Detail
          </p>

          <h1 className="mt-2 text-5xl font-black tracking-wide text-white">
            Scan Review
          </h1>

          <p className="mt-3 text-lg text-zinc-300">
            {displayScan.player} — {displayScan.year} {displayScan.brand}{" "}
            {displayScan.parallel}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveScreen("Scan Review Queue")}
            className="rounded-lg border border-vaultGold/40 bg-black/40 px-6 py-3 text-sm font-bold text-white transition hover:border-vaultGold hover:text-vaultGold"
          >
            ← Back to Scan Queue
          </button>

          {!isEditing && (
            <button
              type="button"
              onClick={runSimulatedAiReview}
              className="rounded-lg border border-cyan-400/50 bg-cyan-400/10 px-6 py-3 text-sm font-black text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
            >
              Simulate AI Review
            </button>
          )}

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={saveTemporaryScanChanges}
                className="rounded-lg border border-profitGreen bg-profitGreen px-6 py-3 text-sm font-black text-black transition hover:brightness-110"
              >
                Save Temporary Scan
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditScan(scan);
                  setIsEditing(false);
                }}
                className="rounded-lg border border-steelBorder bg-black/40 px-6 py-3 text-sm font-bold text-zinc-300 transition hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-lg border border-vaultGold bg-vaultGold px-6 py-3 text-sm font-black text-black transition hover:bg-goldHover"
            >
              ✎ Edit Scan
            </button>
          )}

          {!isEditing && (
            <>
              <button
                type="button"
                onClick={() => setPendingScanAction("keep")}
                className="rounded-lg border border-profitGreen bg-profitGreen px-6 py-3 text-sm font-black text-black transition hover:brightness-110"
              >
                Keep / Add to Collection
              </button>

              <button
                type="button"
                onClick={() => setPendingScanAction("sell")}
                className="rounded-lg border border-vaultGold bg-vaultGold px-6 py-3 text-sm font-black text-black transition hover:bg-goldHover"
              >
                Move to Sell Queue
              </button>

              <button
                type="button"
                onClick={() => setPendingDeleteScanId(displayScan.id)}
                className="rounded-lg border border-red-700 bg-red-950/40 px-6 py-3 text-sm font-black text-red-400 transition hover:bg-red-900/40"
              >
                Delete Scan
              </button>
            </>
          )}
        </div>
      </div>

      {saveMessage && (
        <div className="mb-6 rounded-2xl border border-profitGreen/30 bg-profitGreen/10 px-5 py-4 text-sm font-bold text-profitGreen">
          {saveMessage}
        </div>
      )}

      <div className="grid grid-cols-12 items-start gap-6">
        <div className="col-span-5 space-y-5">
          <Panel className="bg-black/70 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-5">
              <CardImageFrame label="Front" image={displayScan.frontImage} />
              <CardImageFrame label="Back" image={displayScan.backImage} />
            </div>

            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-vaultGold/30">
              <CardBadge
                icon="📷"
                label={displayScan.scanStatus}
                sublabel="Scan Status"
                accent="text-vaultGold"
              />

              <CardBadge
                icon="AI"
                label={displayScan.aiConfidence || "Pending"}
                sublabel={
                  displayScan.aiReviewStatus === "Simulated Review Complete"
                    ? "Simulated Match"
                    : "AI Backend Pending"
                }
                accent="text-cyan-300"
              />

              <CardBadge
                icon="$"
                label={displayScan.status || "Review"}
                sublabel="Next Action"
                accent="text-vaultGold"
              />
            </div>
          </Panel>

          {displayScan.aiReviewStatus === "Simulated Review Complete" && (
            <Panel>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">
                Simulate AI Result
              </p>

              <h3 className="mt-2 text-2xl font-black text-white">
                Simulated Match Found
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {displayScan.aiSuggestedMatch || "No suggested match available."}
              </p>

              <div className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                  Confidence
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  {displayScan.aiConfidence || "Pending"}
                </p>
              </div>
            </Panel>
          )}

          {isEditing && (
            <Panel>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
                Scan Status
              </p>

              <div className="mt-4 grid gap-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">
                  Review Status
                </label>

                <select
                  value={editScan.scanStatus}
                  onChange={(event) =>
                    updateEditField(
                      "scanStatus",
                      event.target.value as TemporaryScanRecord["scanStatus"]
                    )
                  }
                  className="rounded-xl border border-steelBorder bg-black/60 px-4 py-3 text-sm font-bold text-white outline-none focus:border-vaultGold"
                >
                  <option value="Needs Review">Needs Review</option>
                  <option value="Ready to Keep">Ready to Keep</option>
                  <option value="Ready to Sell">Ready to Sell</option>
                </select>
              </div>
            </Panel>
          )}
        </div>

        <div className="col-span-4 space-y-5">
          <Panel>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Temporary Scan Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              {isEditing ? "Edit Scan Data" : "Backend AI Pending"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              This temporary card is not part of your main collection yet.
              Confirm the details, save the scan, then choose Keep, Sell, or
              Delete.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-steelBorder bg-black/50 p-4">
                <p className="text-xs font-black uppercase text-zinc-500">
                  Market Value
                </p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editScan.estimatedValue}
                    onChange={(event) =>
                      updateEditNumberField(
                        "estimatedValue",
                        event.target.value
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-steelBorder bg-black/70 px-3 py-2 text-lg font-black text-white outline-none focus:border-vaultGold"
                  />
                ) : (
                  <p className="mt-2 text-2xl font-black text-white">
                    ${marketValue.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-steelBorder bg-black/50 p-4">
                <p className="text-xs font-black uppercase text-zinc-500">
                  Cost Basis
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  ${costBasis.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-steelBorder bg-black/50 p-4">
                <p className="text-xs font-black uppercase text-zinc-500">
                  Gain / Loss
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  ${profitLoss.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border border-steelBorder bg-black/50 p-4">
                <p className="text-xs font-black uppercase text-zinc-500">
                  ROI
                </p>
                <p className="mt-2 text-2xl font-black text-white">
                  {roi.toFixed(1)}%
                </p>
              </div>
            </div>
          </Panel>

          <Panel>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Purchase / Market Data
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <TemporaryEditField
                label="Purchase Price"
                value={editScan.purchasePrice}
                displayValue={`$${displayScan.purchasePrice.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) =>
                  updateEditNumberField("purchasePrice", value)
                }
              />

              <TemporaryEditField
                label="Taxes / Fees"
                value={editScan.taxesFees}
                displayValue={`$${displayScan.taxesFees.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) => updateEditNumberField("taxesFees", value)}
              />

              <TemporaryEditField
                label="Shipping"
                value={editScan.shippingCost}
                displayValue={`$${displayScan.shippingCost.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) =>
                  updateEditNumberField("shippingCost", value)
                }
              />

              <TemporaryEditField
                label="Total Cost Basis"
                value={editScan.totalCostBasis}
                displayValue={`$${displayScan.totalCostBasis.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) =>
                  updateEditNumberField("totalCostBasis", value)
                }
              />

              <TemporaryEditField
                label="Source"
                value={editScan.source}
                displayValue={displayScan.source}
                isEditing={isEditing}
                onChange={(value) => updateEditField("source", value)}
              />

              <TemporaryEditField
                label="Seller"
                value={editScan.seller}
                displayValue={displayScan.seller}
                isEditing={isEditing}
                onChange={(value) => updateEditField("seller", value)}
              />
            </div>
          </Panel>

          <Panel>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Dallas Card Show Beta Notes
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              Booth-Side Decision Tracker
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Use this section during the Dallas Card Show to track the dealer,
              booth, asking price, recent comp, target offer, max buy price, and
              final decision.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <TemporaryEditField
                label="Booth / Table #"
                value={editScan.boothNumber}
                displayValue={displayScan.boothNumber || "Not entered"}
                isEditing={isEditing}
                onChange={(value) => updateEditField("boothNumber", value)}
              />

              <TemporaryEditField
                label="Dealer Name"
                value={editScan.dealerName}
                displayValue={displayScan.dealerName || "Not entered"}
                isEditing={isEditing}
                onChange={(value) => updateEditField("dealerName", value)}
              />

              <TemporaryEditField
                label="Asking Price"
                value={editScan.askingPrice}
                displayValue={`$${displayScan.askingPrice.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) => updateEditNumberField("askingPrice", value)}
              />

              <TemporaryEditField
                label="Recent Comp"
                value={editScan.recentComp}
                displayValue={`$${displayScan.recentComp.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) => updateEditNumberField("recentComp", value)}
              />

              <TemporaryEditField
                label="Offer Target"
                value={editScan.offerTarget}
                displayValue={`$${displayScan.offerTarget.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) => updateEditNumberField("offerTarget", value)}
              />

              <TemporaryEditField
                label="Max Buy Price"
                value={editScan.maxBuyPrice}
                displayValue={`$${displayScan.maxBuyPrice.toLocaleString()}`}
                isEditing={isEditing}
                type="number"
                onChange={(value) => updateEditNumberField("maxBuyPrice", value)}
              />
            </div>

            <div className="mt-5 rounded-xl border border-steelBorder bg-black/50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Beta Decision
              </p>

              {isEditing ? (
                <select
                  value={editScan.betaDecision}
                  onChange={(event) =>
                    updateEditField(
                      "betaDecision",
                      event.target.value as TemporaryScanRecord["betaDecision"]
                    )
                  }
                  className="mt-3 w-full rounded-xl border border-steelBorder bg-black/70 px-4 py-3 text-sm font-bold text-white outline-none focus:border-vaultGold"
                >
                  <option value="Buy">Buy</option>
                  <option value="Watch">Watch</option>
                  <option value="Pass">Pass</option>
                  <option value="Keep">Keep</option>
                  <option value="Sell">Sell</option>
                </select>
              ) : (
                <p className="mt-2 text-2xl font-black text-white">
                  {displayScan.betaDecision}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-steelBorder bg-black/50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Negotiation Notes
              </p>

              {isEditing ? (
                <textarea
                  value={editScan.negotiationNotes}
                  onChange={(event) =>
                    updateEditField("negotiationNotes", event.target.value)
                  }
                  className="mt-3 min-h-[120px] w-full rounded-xl border border-steelBorder bg-black/70 p-3 text-sm text-white outline-none focus:border-vaultGold"
                  placeholder="Example: Dealer asking $125. Recent comp around $105. Offer target $90. Max buy $100. Dealer may bundle with another card."
                />
              ) : (
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {displayScan.negotiationNotes ||
                    "No negotiation notes entered yet."}
                </p>
              )}
            </div>
          </Panel>
        </div>

        <div className="col-span-3 space-y-5">
          <Panel>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Card Info
            </p>

            <div className="mt-5 space-y-4">
              <TemporaryEditField
                label="Player"
                value={editScan.player}
                displayValue={displayScan.player}
                isEditing={isEditing}
                onChange={(value) => updateEditField("player", value)}
              />

              <TemporaryEditField
                label="Card"
                value={editScan.card}
                displayValue={displayScan.card}
                isEditing={isEditing}
                onChange={(value) => updateEditField("card", value)}
              />

              <TemporaryEditField
                label="Team"
                value={editScan.team}
                displayValue={displayScan.team}
                isEditing={isEditing}
                onChange={(value) => updateEditField("team", value)}
              />

              <TemporaryEditField
                label="Sport"
                value={editScan.sport}
                displayValue={displayScan.sport}
                isEditing={isEditing}
                onChange={(value) => updateEditField("sport", value)}
              />

              <TemporaryEditField
                label="Year"
                value={editScan.year}
                displayValue={displayScan.year}
                isEditing={isEditing}
                onChange={(value) => updateEditField("year", value)}
              />

              <TemporaryEditField
                label="Brand"
                value={editScan.brand}
                displayValue={displayScan.brand}
                isEditing={isEditing}
                onChange={(value) => updateEditField("brand", value)}
              />

              <TemporaryEditField
                label="Set"
                value={editScan.set}
                displayValue={displayScan.set}
                isEditing={isEditing}
                onChange={(value) => updateEditField("set", value)}
              />

              <TemporaryEditField
                label="Card Number"
                value={editScan.cardNumber}
                displayValue={displayScan.cardNumber}
                isEditing={isEditing}
                onChange={(value) => updateEditField("cardNumber", value)}
              />

              <TemporaryEditField
                label="Parallel"
                value={editScan.parallel}
                displayValue={displayScan.parallel}
                isEditing={isEditing}
                onChange={(value) => updateEditField("parallel", value)}
              />

              <TemporaryEditField
                label="Grade"
                value={editScan.grade}
                displayValue={displayScan.grade}
                isEditing={isEditing}
                onChange={(value) => updateEditField("grade", value)}
              />

              <TemporaryEditField
                label="Grader"
                value={editScan.grader}
                displayValue={displayScan.grader}
                isEditing={isEditing}
                onChange={(value) => updateEditField("grader", value)}
              />

              <TemporaryEditField
                label="Serial Number"
                value={editScan.serialNumber}
                displayValue={displayScan.serialNumber}
                isEditing={isEditing}
                onChange={(value) => updateEditField("serialNumber", value)}
              />

              <TemporaryEditField
                label="Storage"
                value={editScan.storageLocation}
                displayValue={displayScan.storageLocation}
                isEditing={isEditing}
                onChange={(value) => updateEditField("storageLocation", value)}
              />
            </div>
          </Panel>

          <Panel>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Notes
            </p>

            {isEditing ? (
              <textarea
                value={editScan.notes}
                onChange={(event) =>
                  updateEditField("notes", event.target.value)
                }
                className="mt-4 min-h-[130px] w-full rounded-xl border border-steelBorder bg-black/60 p-3 text-sm text-white outline-none focus:border-vaultGold"
              />
            ) : (
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {displayScan.notes}
              </p>
            )}
          </Panel>
        </div>
      </div>

      {pendingScanAction !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-vaultGold/40 bg-graphite900 p-6 text-white shadow-[0_0_60px_rgba(245,196,81,0.18)]">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              {pendingScanAction === "keep"
                ? "Confirm Keep"
                : "Confirm Sell Queue"}
            </p>

            <h2 className="mt-3 text-3xl font-black">
              {pendingScanAction === "keep"
                ? "Add to collection?"
                : "Move to sell queue?"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {pendingScanAction === "keep"
                ? "This will create a permanent card record in your main vault and remove the temporary scan from the review queue."
                : "This will create a For Sale card record and remove the temporary scan from the review queue."}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelTemporaryScanAction}
                className="rounded-xl border border-steelBorder bg-black/40 px-5 py-3 text-sm font-bold text-zinc-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmTemporaryScanAction}
                className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-black text-black shadow-vault hover:brightness-110"
              >
                {pendingScanAction === "keep"
                  ? "Add to Collection"
                  : "Move to Sell Queue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingDeleteScanId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-vaultGold/40 bg-graphite900 p-6 text-white shadow-[0_0_60px_rgba(245,196,81,0.18)]">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
              Confirm Delete
            </p>

            <h2 className="mt-3 text-3xl font-black">Delete this scan?</h2>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              This will remove the temporary scan from your review queue. This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelDeleteTemporaryScan}
                className="rounded-xl border border-steelBorder bg-black/40 px-5 py-3 text-sm font-bold text-zinc-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDeleteTemporaryScan}
                className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-black text-black shadow-vault hover:brightness-110"
              >
                Delete Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TemporaryEditField({
  label,
  value,
  displayValue,
  isEditing,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  displayValue: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: "text" | "number";
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-black uppercase tracking-widest text-zinc-500">
        {label}
      </p>

      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-steelBorder bg-black/70 px-3 py-2 text-sm font-bold text-white outline-none focus:border-vaultGold"
        />
      ) : (
        <p className="border-b border-steelBorder/60 pb-2 text-sm font-bold text-white">
          {displayValue || "N/A"}
        </p>
      )}
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-vaultGold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-black">{title}</h1>
        <p className="mt-2 text-zinc-400">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-steelBorder bg-graphite900/90 p-6 shadow-panel ${className}`}
    >
      {children}
    </div>
  );
}

function EmptyVaultState({
  title,
  message,
  actionLabel,
  onAction,
}: {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="rounded-3xl border border-vaultGold/30 bg-graphite900/80 p-10 text-center shadow-vault">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-vaultGold">
        Empty Vault
      </p>

      <h2 className="mt-3 text-4xl font-black text-white">{title}</h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
        {message}
      </p>

      <button
        onClick={onAction}
        className="mt-6 rounded-xl bg-vaultGold px-6 py-3 text-sm font-black text-black shadow-vault hover:brightness-110"
      >
        {actionLabel}
      </button>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <Panel>
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className={`mt-3 text-3xl font-black ${color}`}>{value}</p>
      <p className="mt-2 text-sm text-zinc-400">{sub}</p>
    </Panel>
  );
}



function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-graphite900/90 p-5 shadow-panel">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black text-vaultGold">{value}</p>
    </div>
  );
}

function MiniDarkStat({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-black ${
          positive ? "text-profitGreen" : "text-vaultGold"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StepShell({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-black/30 p-5">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-vaultGold/40 bg-vaultGold/10 text-vaultGold">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-black">{title}</h2>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-zinc-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-vaultGold"
        placeholder={placeholder}
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-zinc-300">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-vaultGold"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-xs font-bold text-zinc-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 w-full resize-none rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-vaultGold"
        placeholder={placeholder}
      />
    </label>
  );
}

function ImageUploadBox({
  label,
  image,
  onUpload,
  large = false,
}: {
  label: string;
  image?: string;
  onUpload: (file?: File) => void;
  large?: boolean;
}) {
  return (
    <label
      className={`group flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-steelBorder bg-black/50 text-center transition hover:border-vaultGold ${
        large ? "h-[420px]" : "h-28"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => onUpload(event.target.files?.[0])}
      />

      {image ? (
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={label}
            className="h-full w-full object-contain p-2"
          />
          <div className="absolute inset-x-0 bottom-0 bg-black/75 px-3 py-2 text-xs font-bold text-vaultGold opacity-0 transition group-hover:opacity-100">
            Replace {label}
          </div>
        </div>
      ) : (
        <div className="px-4">
          <ImagePlus
            className={`mx-auto ${large ? "text-vaultGold" : "text-zinc-500"}`}
            size={large ? 54 : 22}
          />
          <p className={`${large ? "mt-4 text-lg" : "mt-2 text-xs"} font-bold`}>
            {label}
          </p>

          {large && (
            <>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                Upload the front of the card. Later this will support mobile
                camera capture for scan mode.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-vaultGold px-4 py-3 text-sm font-bold text-black">
                <Upload size={17} />
                Upload Front
              </span>
            </>
          )}
        </div>
      )}
    </label>
  );
}

function CardImagePreview({
  image,
  label,
  large = false,
}: {
  image?: string;
  label: string;
  large?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-steelBorder bg-black/50 ${
        large ? "h-80" : "h-40"
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={label}
          className="h-full w-full object-contain p-3"
        />
      ) : (
        <div className="text-center">
          <ImagePlus
            className={`mx-auto ${large ? "text-vaultGold" : "text-zinc-500"}`}
            size={large ? 42 : 28}
          />
          <p className="mt-2 text-xs text-zinc-400">{label}</p>
        </div>
      )}
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-graphite900/90 p-5 shadow-panel">
      <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
        {title}
      </h2>
      {children}
    </div>
  );
}

function DetailLine({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="mb-3 flex justify-between gap-4 border-b border-steelBorder/60 pb-2 last:mb-0 last:border-b-0 last:pb-0">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className={`max-w-[60%] text-right text-sm font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function EditDetailField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block rounded-xl border border-steelBorder bg-black/30 p-3">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-steelBorder bg-black/50 px-3 py-2 text-sm font-bold text-white outline-none focus:border-vaultGold"
      />
    </label>
  );
}

function EditNumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-xl border border-steelBorder bg-black/30 p-3">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>

      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-lg border border-steelBorder bg-black/50 px-3 py-2 text-sm font-bold text-white outline-none focus:border-vaultGold"
      />
    </label>
  );
}

function ScoreBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-profitGreen/30 bg-profitGreen/10 p-3 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-xl font-black text-profitGreen">{value}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <CheckCircle2 size={18} className="mt-1 shrink-0 text-profitGreen" />
      <p>{text}</p>
    </div>
  );
}

function HorizontalChecklistItem({
  done,
  label,
}: {
  done: boolean;
  label: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-3 py-3 transition ${
        done
          ? "border-profitGreen/40 bg-profitGreen/10 text-profitGreen"
          : "border-steelBorder bg-black/40 text-zinc-500"
      }`}
    >
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          done
            ? "border-profitGreen bg-profitGreen/20 text-profitGreen"
            : "border-zinc-600 text-zinc-600"
        }`}
      >
        {done && <CheckCircle2 size={14} />}
      </div>

      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}

function GraderStrategyCard({
  grader,
  bestFor,
  speed,
  risk,
  recommendation,
}: {
  grader: string;
  bestFor: string;
  speed: string;
  risk: string;
  recommendation: string;
}) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-graphite900/90 p-5 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-black text-vaultGold">{grader}</h3>
        <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
          {speed}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Best For
          </p>
          <p className="mt-1 text-zinc-300">{bestFor}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Risk
          </p>
          <p className="mt-1 text-zinc-300">{risk}</p>
        </div>

        <div className="rounded-xl border border-vaultGold/30 bg-vaultGold/10 p-3">
          <p className="text-xs font-bold uppercase tracking-widest text-vaultGold">
            Recommendation
          </p>
          <p className="mt-1 text-xs leading-5 text-zinc-300">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-steelBorder pb-3 last:border-b-0 last:pb-0">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className="text-right text-sm font-bold text-zinc-200">{value}</p>
    </div>
  );
}

function SettingCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
        {title}
      </p>
      <p className="mt-2 text-lg font-black text-vaultGold">{value}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}

function SettingActionCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-bold">{title}</p>
        <span className="rounded-full border border-vaultGold/40 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-vaultGold">
          {status}
        </span>
      </div>
      <p className="text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}

function BetaFeatureCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
      <p className="font-bold text-vaultGold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-300">{description}</p>
      <p className="mt-4 rounded-full border border-vaultGold/40 px-3 py-1 text-center text-xs font-bold text-vaultGold">
        {status}
      </p>
    </div>
  );
}

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  });
}

function numberFromCurrency(value: string) {
  const cleaned = value.replace(/[^0-9.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default App;