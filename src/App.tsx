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
  | "All Cards"
  | "Memorabilia"
  | "Add Card"
  | "Card Detail"
  | "CardVault Scan"
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
  rookie: "",
  autograph: "",
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
    const savedCards = localStorage.getItem("cardvault-cards");

    if (!savedCards) {
      return initialCards;
    }

    try {
      const parsedCards = JSON.parse(savedCards);

      if (!Array.isArray(parsedCards)) {
        return initialCards;
      }

      return parsedCards.length > 0
        ? (parsedCards as CardRecord[])
        : initialCards;
    } catch {
      return initialCards;
    }
  });

  const [memorabilia] = useState<MemorabiliaRecord[]>(initialMemorabilia);

  const [selectedCardId, setSelectedCardId] = useState<number>(
    initialCards[0].id
  );

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

  function openCardDetail(cardId: number) {
    setSelectedCardId(cardId);
    setActiveScreen("Card Detail");
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
    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      )
    );

    setSelectedCardId(updatedCard.id);
    setActiveScreen("Card Detail");
  }

  function resetDemoData() {
    const confirmed = window.confirm(
      "Reset CardVault Pro demo data? This will replace your saved local cards with the original sample cards."
    );

    if (!confirmed) return;

    setCards(initialCards);
    setSelectedCardId(initialCards[0].id);
    setActiveScreen("Dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      <div className="flex min-h-screen">
        <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

        <main className="relative flex-1 overflow-hidden bg-[#0b0c10]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(95,24,18,0.14),transparent_40%)]" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <img
              src="/cardgemz-main-logo.png"
              alt="CARDGEMZ background watermark"
              className="max-h-[780px] max-w-[780px] object-contain"
            />
          </div>

          <TopBar activeScreen={activeScreen} />

          <section className="relative z-10 p-8">
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
              <SalesTracker cards={cards} setCards={setCards} sales={sales} setSales={setSales} />
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
    <aside className="w-72 shrink-0 border-r border-steelBorder bg-gradient-to-b from-black via-black to-graphite950 px-5 py-6">
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

      <div className="mt-12 rounded-2xl border border-vaultGold/40 bg-vaultGold/10 p-4">
        <p className="text-sm font-bold text-vaultGold">GOAT Phase 1</p>
        <p className="mt-2 text-xs leading-5 text-zinc-300">
          Frontend demo build: dashboard, collection, add card, card detail,
          reports, and settings.
        </p>
      </div>
    </aside>
  );
}

function TopBar({ activeScreen }: { activeScreen: Screen }) {
  return (
    <header className="relative z-10 flex items-center justify-between border-b border-steelBorder bg-black/70 px-8 py-4 backdrop-blur">
      {activeScreen === "Reports" ? (
  <div className="flex w-[520px] items-center">
    <div className="flex items-center gap-4">
      <img
        src="/vault-logo.png"
        alt="CardVault logo"
        className="h-14 w-14 object-contain"
      />

      <span className="font-vault-heading text-3xl font-black tracking-tight text-white">
        CardVault <span className="text-vaultGold">Pro</span>
      </span>
    </div>
  </div>
) : (
  <div className="flex w-[520px] items-center gap-3 rounded-2xl border border-steelBorder bg-graphite900 px-4 py-3">
    <Search size={18} className="text-zinc-500" />
    <input
      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      placeholder="Search cards, players, sets, or categories..."
    />
  </div>
)}

      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell size={22} className="text-zinc-300" />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-vaultGold text-xs font-black text-black">
            3
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-steelBorder bg-graphite900 px-4 py-2">
          <UserCircle className="text-vaultGold" size={28} />
          <div>
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
    <div className="mb-8 relative flex items-center justify-center gap-12 text-center">
      <div className="relative h-48 w-48 shrink-0">
        <img
          src={logoSrc}
          alt="CARDGEMZ logo"
          className="h-full w-full object-contain drop-shadow-[0_26px_44px_rgba(0,0,0,0.95)] [filter:drop-shadow(0_0_30px_rgba(245,196,81,0.26))]"
        />

        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_34px_rgba(245,196,81,0.18)]" />
      </div>

      <div>
        <div className="relative inline-block">
          <h1 className="font-vault-heading text-6xl font-black tracking-[-0.04em] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]">
            {title}
          </h1>

          <div className="mx-auto mt-4 h-px w-72 bg-gradient-to-r from-transparent via-vaultGold/70 to-transparent" />
        </div>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-zinc-400">
            {subtitle}
          </p>
        )}

        {actions && <div className="mt-8 flex justify-center gap-5">{actions}</div>}
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
  const topCards = [...cards].sort((a, b) => b.estimatedValue - a.estimatedValue).slice(0, 4);

  return (
    <>
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
        <KpiCard label="Collection Value" value={money(collectionValue)} sub="Estimated market value" color="text-vaultGold" />
        <KpiCard label="Money Invested" value={money(moneyInvested)} sub="Total cost basis" color="text-dataCyan" />
        <KpiCard label="Net Gain / Loss" value={money(netGain)} sub={`${roi.toFixed(1)}% ROI`} color="text-profitGreen" />
        <KpiCard label="Cards Owned" value={String(cards.length)} sub="Across all categories" color="text-white" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <Panel className="col-span-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black">Collection Value Trend</h2>
            <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">30D</span>
          </div>

          <div className="flex h-72 items-end gap-3 border-b border-l border-steelBorder px-4 pb-4">
            {[35, 42, 48, 45, 55, 58, 63, 60, 68, 72, 79, 88].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-vaultGold/30 to-vaultGold shadow-vault"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-zinc-500">{index + 1}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black">Top Cards</h2>
            <span className="text-sm font-bold text-vaultGold">View All</span>
          </div>

          <div className="space-y-4">
            {topCards.map((card, index) => (
              <div key={card.id} className="flex items-center justify-between rounded-xl border border-steelBorder bg-black/40 p-4">
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
                <p className="font-black text-profitGreen">{money(card.estimatedValue)}</p>
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
              <div key={item} className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-sm text-zinc-300">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-6 border-vaultGold/30 bg-vaultGold/10">
          <h2 className="mb-5 text-lg font-black text-vaultGold">Dashboard Snapshot</h2>
          <div className="grid grid-cols-3 gap-4">
            <MiniStat label="For Sale" value={String(cards.filter((card) => card.status === "For Sale").length)} />
            <MiniStat label="Grade Candidates" value={String(cards.filter((card) => card.status === "Grade Candidate").length)} />
            <MiniStat label="ROI" value={`+${roi.toFixed(1)}%`} />
          </div>
        </Panel>
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
  setActiveScreen: (screen: Screen) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editCard, setEditCard] = useState<CardRecord>(card);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setEditCard(card);
  }, [card]);

  function updateEditField<K extends keyof CardRecord>(
    field: K,
    value: CardRecord[K]
  ) {
    setEditCard((currentCard) => ({
      ...currentCard,
      [field]: value,
    }));
  }

  function saveEditedCard() {
    const recalculatedGainLoss =
      editCard.estimatedValue - editCard.totalCostBasis;

    const recalculatedRoi =
      editCard.totalCostBasis > 0
        ? (recalculatedGainLoss / editCard.totalCostBasis) * 100
        : 0;

    updateCard({
      ...editCard,
      gainLoss: recalculatedGainLoss,
      roi: recalculatedRoi,
    });

    setIsEditing(false);
    setSaveMessage("Card updated successfully.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  }

  const displayCard = isEditing ? editCard : card;

  const isRookieCard =
    displayCard.card.toLowerCase().includes("rookie") ||
    displayCard.year === "2023" ||
    displayCard.year === "2017";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-vaultGold/25 bg-black p-6 shadow-[0_0_60px_rgba(0,0,0,0.75)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,196,81,0.16),transparent_30%),radial-gradient(circle_at_70%_16%,rgba(245,196,81,0.08),transparent_28%),linear-gradient(135deg,rgba(0,0,0,0.25),rgba(0,0,0,0.95))]" />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="font-vault-heading text-5xl font-black tracking-[-0.04em] text-white">
            Card Detail
          </h1>

          <p className="mt-2 text-lg text-zinc-300">
            {displayCard.player} — {displayCard.card}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveScreen("My Collection")}
            className="inline-flex items-center gap-2 rounded-xl border border-vaultGold/40 bg-black/60 px-6 py-3 text-sm font-black text-white transition hover:border-vaultGold hover:text-vaultGold"
          >
            <ArrowLeft size={17} />
            Back to Collection
          </button>

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={saveEditedCard}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#fff3a0] via-vaultGold to-[#9b6a10] px-6 py-3 text-sm font-black text-black shadow-vault"
              >
                <BadgeCheck size={17} />
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditCard(card);
                  setIsEditing(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-steelBorder bg-black/60 px-6 py-3 text-sm font-black text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-[#fff3a0] via-vaultGold to-[#9b6a10] px-6 py-3 text-sm font-black text-black shadow-vault"
            >
              <Edit3 size={17} />
              Edit Card
            </button>
          )}

          <button
            type="button"
            onClick={() => deleteCard(card.id)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/60 bg-red-950/20 px-6 py-3 text-sm font-black text-red-400 hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={17} />
            Delete Card
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="relative mb-6 rounded-2xl border border-profitGreen/30 bg-profitGreen/10 px-5 py-4 text-sm font-bold text-profitGreen shadow-vault">
          {saveMessage}
        </div>
      )}

      <div className="relative grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="rounded-3xl border border-vaultGold/35 bg-black/55 p-6 shadow-[0_0_55px_rgba(245,196,81,0.16)]">
          <div className="grid gap-5 md:grid-cols-2">
            <CardVaultImagePanel
              label="Front"
              image={displayCard.frontImage}
              placeholder={`${displayCard.player} Front`}
            />

            <CardVaultImagePanel
              label="Back"
              image={displayCard.backImage}
              placeholder={`${displayCard.player} Back`}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-2xl border border-vaultGold/25 bg-black/65 md:grid-cols-3">
            <DetailBadge
              icon={
                <Gem className="h-12 w-12 text-vaultGold drop-shadow-[0_0_18px_rgba(245,196,81,0.55)]" />
              }
              title="Super Rare"
              subtitle="Condition"
            />

            <DetailBadge
              icon={<RookieCardEmblem />}
              title={isRookieCard ? "Rookie Card" : "Base Card"}
              subtitle="Rookie Indicator"
            />

            <button
              type="button"
              onClick={() => setActiveScreen("Sales Tracker")}
              className="flex items-center gap-4 border-t border-vaultGold/20 p-5 text-left transition hover:bg-vaultGold/10 md:border-l md:border-t-0"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-vaultGold bg-black text-vaultGold shadow-[0_0_25px_rgba(245,196,81,0.35)]">
                <DollarSign className="h-8 w-8" />
              </div>

              <div>
                <p className="text-lg font-black uppercase text-white">
                  Sell Card
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                  List this card
                </p>
              </div>
            </button>
          </div>
        </section>

        <aside className="space-y-4">
          <DetailPanel title="Card Profile" icon={<User size={20} />}>
            <DetailGrid
              items={[
                ["Player", displayCard.player],
                ["Brand", displayCard.brand],
                ["Card", displayCard.card],
                ["Serial Number", displayCard.serialNumber || "N/A"],
                ["Team", displayCard.team],
                ["SKU", displayCard.sku || "N/A"],
                ["Sport", displayCard.sport],
                ["Storage", displayCard.storageLocation || "N/A"],
                ["Year", displayCard.year],
              ]}
            />
          </DetailPanel>

          <DetailPanel title="Grading Strategy" icon={<BarChart3 size={20} />}>
            <DetailGrid
              items={[
                [
                  "Preferred Grade",
                  displayCard.grader === "PSA"
                    ? "PSA 10"
                    : `${displayCard.grader} Review`,
                ],
                [
                  "Grading Status",
                  displayCard.grade === "Raw" ? "Planning" : "Graded",
                ],
                [
                  "Expected Grade",
                  displayCard.grade === "Raw"
                    ? "Review Needed"
                    : displayCard.grade,
                ],
                ["Actual Grade", displayCard.grade],
              ]}
            />

            <button
              type="button"
              onClick={() => setActiveScreen("Grading Center")}
              className="mt-4 w-full rounded-xl border border-vaultGold/50 bg-black/50 px-4 py-3 text-sm font-black text-vaultGold hover:bg-vaultGold hover:text-black"
            >
              View Grading Tracker
            </button>
          </DetailPanel>

          <DetailPanel title="Sale Information" icon={<DollarSign size={20} />}>
            <DetailGrid
              items={[
                [
                  "Target Sale Price",
                  money(displayCard.highComp || displayCard.estimatedValue),
                ],
                ["Market Value", money(displayCard.estimatedValue)],
                [
                  "Platform / Show",
                  displayCard.status === "For Sale" ? displayCard.source : "TBD",
                ],
                ["Date Added", displayCard.purchaseDate || "TBD"],
              ]}
            />
          </DetailPanel>

          <DetailPanel
            title="Purchase Information"
            icon={<ShoppingCart size={20} />}
          >
            <DetailGrid
              items={[
                [
                  "Purchase Price",
                  money(displayCard.totalCostBasis || displayCard.purchasePrice),
                ],
                ["Source", displayCard.source || "TBD"],
                ["Purchase Date", displayCard.purchaseDate || "TBD"],
                ["Seller", displayCard.seller || "TBD"],
              ]}
            />
          </DetailPanel>

          <DetailPanel title="Storage Information" icon={<Box size={20} />}>
            <DetailGrid
              items={[
                ["Storage Location", displayCard.storageLocation || "Vault A-01"],
                ["Storage Type", "Magnetic Case"],
                ["Added To Storage", displayCard.purchaseDate || "TBD"],
                ["Condition", "Stored Securely"],
              ]}
            />
          </DetailPanel>

          <DetailPanel title="Notes" icon={<NotebookText size={20} />}>
            {isEditing ? (
              <textarea
                value={editCard.notes}
                onChange={(event) =>
                  updateEditField("notes", event.target.value)
                }
                className="min-h-[110px] w-full rounded-xl border border-steelBorder bg-black/60 p-3 text-sm text-white outline-none focus:border-vaultGold"
              />
            ) : (
              <p className="text-sm leading-6 text-zinc-300">
                {displayCard.notes || "No notes added yet."}
              </p>
            )}
          </DetailPanel>
        </aside>
      </div>
    </section>
  );
}

function CardVaultImagePanel({
  label,
  image,
  placeholder,
}: {
  label: string;
  image?: string;
  placeholder: string;
}) {
  return (
    <div>
      <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.22em] text-vaultGold">
        {label}
      </p>

      <div className="overflow-hidden rounded-xl border border-vaultGold/35 bg-black shadow-[0_0_32px_rgba(245,196,81,0.16)]">
        {image ? (
          <img
            src={image}
            alt={placeholder}
            className="aspect-[3/4] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-gradient-to-br from-graphite900 via-black to-graphite900">
            <div className="text-center">
              <Crown className="mx-auto h-16 w-16 text-vaultGold/70" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.22em] text-vaultGold">
                {placeholder}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailBadge({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 border-t border-vaultGold/20 p-5 first:border-t-0 md:border-l md:border-t-0 md:first:border-l-0">
      {icon}

      <div>
        <p className="text-lg font-black uppercase text-white">{title}</p>
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function RookieCardEmblem() {
  return (
    <div className="flex h-14 w-14 items-center justify-center text-vaultGold">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <Shield className="absolute h-12 w-12 fill-vaultGold/10 text-vaultGold drop-shadow-[0_0_18px_rgba(245,196,81,0.45)]" />
        <span className="relative text-sm font-black">RC</span>
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
    <section className="rounded-2xl border border-vaultGold/25 bg-black/60 p-5 shadow-[0_0_24px_rgba(0,0,0,0.6)]">
      <div className="mb-4 flex items-center gap-3 text-vaultGold">
        {icon}
        <h3 className="text-sm font-black uppercase tracking-wide">{title}</h3>
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
          <span className="text-right font-bold text-white">{value}</span>
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
            <div className="mb-5 grid grid-cols-3 gap-4">
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

        <Panel>
  <div className="flex items-center justify-between gap-6">
    <div>
      <p className="text-xs font-black uppercase tracking-[0.25em] text-vaultGold">
        Developer Utility
      </p>
      <h3 className="mt-2 text-2xl font-black text-white">Reset Demo Data</h3>
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