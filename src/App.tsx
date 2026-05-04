import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  Bell,
  Boxes,
  Camera,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  Filter,
  Home,
  ImagePlus,
  PlusCircle,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Upload,
  UserCircle,
} from "lucide-react";

type Screen =
  | "Dashboard"
  | "My Collection"
  | "Add Card"
  | "CardVault Scan"
  | "Market Comps"
  | "Grading Center"
  | "Reports"
  | "Sales Tracker"
  | "Settings"
  | "Card Detail";

type AddCardStep =
  | "Card Info"
  | "Purchase"
  | "Grading"
  | "Market"
  | "Analysis"
  | "Decision"
  | "Sale Info"
  | "Notes";

type CardRecord = {
  id: number;
  sku: string;
  player: string;
  card: string;
  team: string;
  sport: string;
  year: string;
  brand: string;
  grade: string;
  status: string;
  purchasePrice: number;
  estimatedValue: number;
  gainLoss: number;
  location: string;
  serialNumber?: string;
  purchaseDate?: string;
  source?: string;
  condition?: string;
  grader?: string;
  certNumber?: string;
  notes?: string;
  frontImage?: string;
  backImage?: string;
  slabImage?: string;
  receiptImage?: string;
};

type AddCardFormData = {
  frontImage: string;
  backImage: string;
  slabImage: string;
  receiptImage: string;
  player: string;
  card: string;
  sport: string;
  team: string;
  year: string;
  brand: string;
  set: string;
  cardNumber: string;
  parallel: string;
  rookieCard: string;
  autograph: string;
  serialNumber: string;
  sku: string;
  status: string;
  location: string;
  purchaseDate: string;
  purchasePrice: string;
  taxesFees: string;
  shippingCost: string;
  totalCostBasis: string;
  source: string;
  sellerName: string;
  invoiceNumber: string;
  paymentMethod: string;
  purchaseNotes: string;
  grade: string;
  grader: string;
  gradingStatus: string;
  certNumber: string;
  corners: string;
  centering: string;
  edges: string;
  surface: string;
  lowComp: string;
  averageComp: string;
  highComp: string;
  compConfidence: string;
  lastSale: string;
  thirtyDayAverage: string;
  targetSalePrice: string;
  minimumSalePrice: string;
  estimatedValue: string;
  marketNotes: string;
  inspectionDate: string;
  cleaningNeeded: string;
  conditionRisk: string;
  inspectionNotes: string;
  collectionStory: string;
  pcCandidate: string;
  recommendation: string;
  priority: string;
  targetProfit: string;
  targetRoi: string;
  reviewDate: string;
  decisionNotes: string;
  saleStatus: string;
  listedDate: string;
  saleDate: string;
  platform: string;
  salePrice: string;
  platformFees: string;
  saleShippingCost: string;
  netProceeds: string;
  buyerInvoice: string;
  saleNotes: string;
  includePlayerReport: string;
  includeInsuranceReport: string;
  includeTaxReport: string;
  privateNotes: string;
  printableReportNotes: string;
};

const cardgemzLogo = "/cardgemz-logo.png";
const cardgemzReportLogo = "/cardgemz-report-logo.png";

const sidebarItems = [
  { label: "Dashboard", icon: Home },
  { label: "My Collection", icon: Boxes },
  { label: "Add Card", icon: PlusCircle },
  { label: "CardVault Scan", icon: Camera },
  { label: "Market Comps", icon: TrendingUp },
  { label: "Grading Center", icon: ShieldCheck },
  { label: "Reports", icon: FileText },
  { label: "Sales Tracker", icon: ShoppingCart },
  { label: "Settings", icon: Settings },
] as const;

const addCardSteps: AddCardStep[] = [
  "Card Info",
  "Purchase",
  "Grading",
  "Market",
  "Analysis",
  "Decision",
  "Sale Info",
  "Notes",
];

const mockCards: CardRecord[] = [
  {
    id: 1,
    sku: "CVP-WEMBY-PRIZM-BG-001",
    player: "Victor Wembanyama",
    card: "2023 Prizm Black Gold /10",
    team: "San Antonio Spurs",
    sport: "Basketball",
    year: "2023",
    brand: "Panini Prizm",
    grade: "PSA 10",
    status: "Personal Collection",
    purchasePrice: 1850,
    estimatedValue: 6200,
    gainLoss: 4350,
    location: "Vault A-01",
    serialNumber: "10/10",
    purchaseDate: "May 24, 2025",
    source: "Private Sale",
    condition: "Gem Mint",
    grader: "PSA",
    certNumber: "Preview-001",
    notes:
      "Top Wemby hold; premium parallel with strong long-term collection value.",
  },
  {
    id: 2,
    sku: "CVP-WEMBY-PRIZM-SILVER-002",
    player: "Victor Wembanyama",
    card: "2023 Prizm Silver",
    team: "San Antonio Spurs",
    sport: "Basketball",
    year: "2023",
    brand: "Panini Prizm",
    grade: "PSA 10",
    status: "Personal Collection",
    purchasePrice: 900,
    estimatedValue: 2350,
    gainLoss: 1450,
    location: "Vault A-02",
    serialNumber: "N/A",
    purchaseDate: "May 24, 2025",
    source: "eBay",
    condition: "Gem Mint",
    grader: "PSA",
    certNumber: "Preview-002",
    notes: "Core rookie-year Prizm position.",
  },
  {
    id: 3,
    sku: "CVP-JORDAN-FLEER-057",
    player: "Michael Jordan",
    card: "1986 Fleer #57",
    team: "Chicago Bulls",
    sport: "Basketball",
    year: "1986",
    brand: "Fleer",
    grade: "PSA 8",
    status: "Graded",
    purchasePrice: 12500,
    estimatedValue: 45200,
    gainLoss: 32700,
    location: "Vault Elite-01",
    serialNumber: "N/A",
    purchaseDate: "Jan 15, 2024",
    source: "Card Show",
    condition: "Excellent",
    grader: "PSA",
    certNumber: "Preview-057",
    notes: "High-value flagship card. Insurance report candidate.",
  },
  {
    id: 4,
    sku: "CVP-MAHOMES-PRIZM-269",
    player: "Patrick Mahomes II",
    card: "2017 Prizm #269",
    team: "Kansas City Chiefs",
    sport: "Football",
    year: "2017",
    brand: "Panini Prizm",
    grade: "PSA 10",
    status: "For Sale",
    purchasePrice: 325,
    estimatedValue: 525,
    gainLoss: 200,
    location: "Vault B-05",
    serialNumber: "N/A",
    purchaseDate: "Nov 5, 2023",
    source: "eBay",
    condition: "Gem Mint",
    grader: "PSA",
    certNumber: "Preview-269",
    notes: "Listed candidate with strong liquidity.",
  },
  {
    id: 5,
    sku: "CVP-OHTANI-TC-150",
    player: "Shohei Ohtani",
    card: "2023 Topps Chrome",
    team: "Los Angeles Dodgers",
    sport: "Baseball",
    year: "2023",
    brand: "Topps Chrome",
    grade: "Raw",
    status: "Watchlist",
    purchasePrice: 75,
    estimatedValue: 185,
    gainLoss: 110,
    location: "Raw Box C-02",
    serialNumber: "N/A",
    purchaseDate: "Apr 11, 2025",
    source: "LCS",
    condition: "Raw",
    grader: "Not submitted",
    certNumber: "N/A",
    notes: "Watch condition and market movement before grading.",
  },
  {
    id: 6,
    sku: "CVP-QUINYON-SIG-005",
    player: "Quinyon Mitchell",
    card: "2023-2024 Topps Signature Class Chrome Variation Auto 5/5",
    team: "Philadelphia Eagles",
    sport: "Football",
    year: "2023-24",
    brand: "Topps",
    grade: "Raw",
    status: "Grade Candidate",
    purchasePrice: 193.92,
    estimatedValue: 700,
    gainLoss: 506.08,
    location: "Sales Counter",
    serialNumber: "5/5",
    purchaseDate: "June 11, 2025",
    source: "Sales Counter",
    condition: "Raw",
    grader: "Beckett",
    certNumber: "Pending",
    notes:
      "Fingerprints cleaned. Looks very good with no obvious whitening. Estimated 9.5–10 potential with possible Black Label upside.",
  },
];

const emptyAddCardForm: AddCardFormData = {
  frontImage: "",
  backImage: "",
  slabImage: "",
  receiptImage: "",
  player: "",
  card: "",
  sport: "Basketball",
  team: "",
  year: "",
  brand: "",
  set: "",
  cardNumber: "",
  parallel: "",
  rookieCard: "Select",
  autograph: "Select",
  serialNumber: "",
  sku: "",
  status: "Personal Collection",
  location: "",
  purchaseDate: "",
  purchasePrice: "",
  taxesFees: "",
  shippingCost: "",
  totalCostBasis: "",
  source: "",
  sellerName: "",
  invoiceNumber: "",
  paymentMethod: "",
  purchaseNotes: "",
  grade: "Raw",
  grader: "PSA",
  gradingStatus: "Not Graded",
  certNumber: "",
  corners: "Select",
  centering: "Select",
  edges: "Select",
  surface: "Select",
  lowComp: "",
  averageComp: "",
  highComp: "",
  compConfidence: "Medium",
  lastSale: "",
  thirtyDayAverage: "",
  targetSalePrice: "",
  minimumSalePrice: "",
  estimatedValue: "",
  marketNotes: "",
  inspectionDate: "",
  cleaningNeeded: "No",
  conditionRisk: "Low",
  inspectionNotes: "",
  collectionStory: "",
  pcCandidate: "Maybe",
  recommendation: "Hold",
  priority: "Medium",
  targetProfit: "",
  targetRoi: "",
  reviewDate: "",
  decisionNotes: "",
  saleStatus: "Not Listed",
  listedDate: "",
  saleDate: "",
  platform: "",
  salePrice: "",
  platformFees: "",
  saleShippingCost: "",
  netProceeds: "",
  buyerInvoice: "",
  saleNotes: "",
  includePlayerReport: "Yes",
  includeInsuranceReport: "Yes",
  includeTaxReport: "No",
  privateNotes: "",
  printableReportNotes: "",
};

const recentActivity = [
  "Victor Wembanyama collection report generated",
  "Quinyon Mitchell card analysis updated",
  "New grading candidate added",
  "Market comps refreshed for 12 cards",
];

function money(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  });
}

function parseMoney(value: string) {
  const parsed = Number(value.replace(/[^0-9.-]+/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("Dashboard");
  const [cards, setCards] = useState<CardRecord[]>(mockCards);
  const [selectedCard, setSelectedCard] = useState<CardRecord | null>(null);

  const dashboardStats = useMemo(() => {
    const collectionValue = cards.reduce(
      (sum, card) => sum + card.estimatedValue,
      0
    );
    const moneyInvested = cards.reduce(
      (sum, card) => sum + card.purchasePrice,
      0
    );
    const gainLoss = collectionValue - moneyInvested;

    return {
      collectionValue,
      moneyInvested,
      gainLoss,
      cardCount: cards.length,
      cardsForSale: cards.filter((card) => card.status === "For Sale").length,
      gradeCandidates: cards.filter((card) => card.status === "Grade Candidate")
        .length,
    };
  }, [cards]);

  const kpis = [
    {
      label: "Collection Value",
      value: money(dashboardStats.collectionValue),
      sub: "Estimated market value",
      color: "text-vaultGold",
    },
    {
      label: "Money Invested",
      value: money(dashboardStats.moneyInvested),
      sub: "Total cost basis",
      color: "text-dataCyan",
    },
    {
      label: "Net Gain / Loss",
      value: money(dashboardStats.gainLoss),
      sub: "+ collection performance",
      color: "text-profitGreen",
    },
    {
      label: "Cards Owned",
      value: String(dashboardStats.cardCount),
      sub: "Across all categories",
      color: "text-white",
    },
  ];

  function openCardDetail(card: CardRecord) {
    setSelectedCard(card);
    setActiveScreen("Card Detail");
  }

  function goToScreen(screen: Screen) {
    setSelectedCard(null);
    setActiveScreen(screen);
  }

  function handleSaveCard(formData: AddCardFormData) {
    const purchasePrice = parseMoney(
      formData.totalCostBasis || formData.purchasePrice
    );
    const estimatedValue = parseMoney(
      formData.estimatedValue ||
        formData.averageComp ||
        formData.lastSale ||
        formData.highComp
    );
    const generatedId =
      cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;

    const generatedSku =
      formData.sku.trim() ||
      `CVP-${(formData.player || "CARD")
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 8)
        .toUpperCase()}-${generatedId.toString().padStart(3, "0")}`;

    const newCard: CardRecord = {
      id: generatedId,
      sku: generatedSku,
      player: formData.player.trim() || "Unknown Player",
      card: formData.card.trim() || "Untitled Card",
      team: formData.team.trim() || "N/A",
      sport: formData.sport || "N/A",
      year: formData.year.trim() || "N/A",
      brand: formData.brand.trim() || "N/A",
      grade: formData.grade || "Raw",
      status: formData.status || "Personal Collection",
      purchasePrice,
      estimatedValue,
      gainLoss: estimatedValue - purchasePrice,
      location: formData.location.trim() || "Unassigned",
      serialNumber: formData.serialNumber || "N/A",
      purchaseDate: formData.purchaseDate || "Pending",
      source: formData.source || "Manual Entry",
      condition: formData.grade || "Raw",
      grader: formData.grader || "N/A",
      certNumber: formData.certNumber || "Pending",
      notes:
        formData.printableReportNotes ||
        formData.decisionNotes ||
        formData.inspectionNotes ||
        formData.purchaseNotes ||
        "New card added through Add Card workflow.",
      frontImage: formData.frontImage,
      backImage: formData.backImage,
      slabImage: formData.slabImage,
      receiptImage: formData.receiptImage,
    };

    setCards((currentCards) => [...currentCards, newCard]);
    setSelectedCard(newCard);
    setActiveScreen("Card Detail");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        <Sidebar activeScreen={activeScreen} setActiveScreen={goToScreen} />

        <main className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,196,81,0.08),transparent_32%),#000]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.045]">
            <img
              src={cardgemzLogo}
              alt=""
              className="h-[720px] w-[720px] object-contain"
            />
          </div>

          <TopBar />

          <section className="cardvault-scrollbar relative z-10 max-h-[calc(100vh-76px)] overflow-y-auto p-8">
            {activeScreen === "Dashboard" && (
              <Dashboard kpis={kpis} stats={dashboardStats} cards={cards} />
            )}

            {activeScreen === "My Collection" && (
              <MyCollection
                cards={cards}
                openCardDetail={openCardDetail}
                goToAddCard={() => goToScreen("Add Card")}
              />
            )}

            {activeScreen === "Card Detail" && selectedCard && (
              <CardDetail
                card={selectedCard}
                backToCollection={() => goToScreen("My Collection")}
              />
            )}

            {activeScreen === "Add Card" && (
              <AddCard onSaveCard={handleSaveCard} />
            )}

            {activeScreen === "CardVault Scan" && (
              <ComingSoonScreen title="CardVault Scan" />
            )}

            {activeScreen === "Market Comps" && <MarketComps cards={cards} />}

            {activeScreen === "Grading Center" && <GradingCenter cards={cards} />}

            {activeScreen === "Reports" && <Reports cards={cards} />}

            {activeScreen === "Sales Tracker" && <SalesTracker cards={cards} />}

            {activeScreen === "Settings" && <SettingsScreen />}
          </section>
        </main>
      </div>
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
    <aside className="w-72 shrink-0 border-r border-steelBorder bg-gradient-to-b from-black via-graphite950 to-black px-5 py-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-vaultGold/50 bg-black shadow-vault">
          <img
            src={cardgemzLogo}
            alt="CARDGEMZ logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <p className="font-vault-heading text-lg font-bold tracking-wide">
            CARDGEMZ
          </p>
          <p className="-mt-1 text-xs font-bold uppercase tracking-[0.3em] text-vaultGold">
            Vault Pro
          </p>
        </div>
      </div>

      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = activeScreen === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActiveScreen(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                active
                  ? "border-vaultGold/60 bg-vaultGold/10 text-vaultGold shadow-vault"
                  : "border-transparent text-zinc-300 hover:border-steelBorder hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span className="text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-10 rounded-2xl border border-vaultGold/40 bg-vaultGold/10 p-4">
        <p className="text-sm font-bold text-vaultGold">GOAT Phase 1</p>
        <p className="mt-1 text-xs leading-5 text-zinc-300">
          Frontend demo build: dashboard, collection, add card, card detail,
          reports, and settings.
        </p>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="relative z-10 flex items-center justify-between border-b border-steelBorder bg-black/70 px-8 py-5 backdrop-blur">
      <div className="flex w-[520px] items-center gap-3 rounded-2xl border border-steelBorder bg-graphite900 px-4 py-3">
        <Search size={18} className="text-zinc-500" />
        <input
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          placeholder="Search cards, players, sets, or categories..."
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Bell size={22} className="text-zinc-300" />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-vaultGold text-xs font-extrabold text-black">
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

function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-vaultGold">
            {eyebrow}
          </p>
        )}
        <h1 className="font-vault-heading mt-2 text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-zinc-400">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Dashboard({
  kpis,
  stats,
  cards,
}: {
  kpis: { label: string; value: string; sub: string; color: string }[];
  stats: {
    collectionValue: number;
    moneyInvested: number;
    gainLoss: number;
    cardCount: number;
    cardsForSale: number;
    gradeCandidates: number;
  };
  cards: CardRecord[];
}) {
  return (
    <>
      <PageHeader
        eyebrow="CardVault Pro"
        title="Collection Dashboard"
        subtitle="Track your collection like an investment portfolio."
        action={
          <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault transition hover:brightness-110">
            Add New Card
          </button>
        }
      />

      <div className="grid grid-cols-4 gap-5">
        {kpis.map((kpi) => (
          <Panel key={kpi.label}>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {kpi.label}
            </p>
            <p className={`mt-3 text-3xl font-extrabold ${kpi.color}`}>
              {kpi.value}
            </p>
            <p className="mt-2 text-sm text-zinc-400">{kpi.sub}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <Panel className="col-span-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Collection Value Trend</h2>
            <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
              30D
            </span>
          </div>

          <div className="flex h-72 items-end gap-3 border-b border-l border-steelBorder px-4 pb-4">
            {[35, 42, 48, 45, 55, 58, 63, 60, 68, 72, 79, 88].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-vaultGold/30 to-vaultGold shadow-vault"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-[10px] text-zinc-500">
                    {index + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </Panel>

        <Panel className="col-span-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Top Cards</h2>
            <span className="text-sm font-bold text-vaultGold">View All</span>
          </div>

          <div className="space-y-4">
            {cards
              .slice()
              .sort((a, b) => b.estimatedValue - a.estimatedValue)
              .slice(0, 4)
              .map((card, index) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between rounded-xl border border-steelBorder bg-black/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-vaultGold/10 text-sm font-bold text-vaultGold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{card.card}</p>
                      <p className="text-xs text-zinc-400">
                        {card.player} • {card.grade}
                      </p>
                    </div>
                  </div>
                  <p className="font-extrabold text-profitGreen">
                    {money(card.estimatedValue)}
                  </p>
                </div>
              ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <Panel className="col-span-6">
          <h2 className="mb-5 text-lg font-bold">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <div className="col-span-6 rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-6 shadow-vault">
          <h2 className="text-lg font-bold text-vaultGold">
            Dashboard Snapshot
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <MiniStat label="For Sale" value={String(stats.cardsForSale)} />
            <MiniStat
              label="Grade Candidates"
              value={String(stats.gradeCandidates)}
            />
            <MiniStat label="ROI" value="+42.1%" />
          </div>
        </div>
      </div>
    </>
  );
}

function MyCollection({
  cards,
  openCardDetail,
  goToAddCard,
}: {
  cards: CardRecord[];
  openCardDetail: (card: CardRecord) => void;
  goToAddCard: () => void;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title="My Collection"
        subtitle="Search, filter, and manage every card in your personal vault."
        action={
          <button
            onClick={goToAddCard}
            className="flex items-center gap-2 rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault transition hover:brightness-110"
          >
            <PlusCircle size={18} />
            Add Card
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-5 gap-4">
        <MiniStat label="Total Cards" value={String(cards.length)} />
        <MiniStat
          label="Raw Cards"
          value={String(cards.filter((card) => card.grade === "Raw").length)}
        />
        <MiniStat
          label="Graded Cards"
          value={String(cards.filter((card) => card.grade !== "Raw").length)}
        />
        <MiniStat
          label="For Sale"
          value={String(
            cards.filter((card) => card.status === "For Sale").length
          )}
        />
        <MiniStat
          label="Grade Candidates"
          value={String(
            cards.filter((card) => card.status === "Grade Candidate").length
          )}
        />
      </div>

      <Panel>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-steelBorder bg-black/40 px-4 py-3">
            <Search size={17} className="text-zinc-500" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
              placeholder="Search inventory..."
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-steelBorder px-4 py-3 text-sm font-bold text-zinc-300">
            <Filter size={17} />
            Filters
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-steelBorder">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-black text-xs uppercase tracking-widest text-vaultGold">
              <tr>
                <th className="px-4 py-4">Card</th>
                <th className="px-4 py-4">Player</th>
                <th className="px-4 py-4">Year</th>
                <th className="px-4 py-4">Brand</th>
                <th className="px-4 py-4">Grade</th>
                <th className="px-4 py-4">Purchase</th>
                <th className="px-4 py-4">Est. Value</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr
                  key={card.id}
                  className="border-t border-steelBorder bg-graphite900/60"
                >
                  <td className="px-4 py-4 font-bold">{card.card}</td>
                  <td className="px-4 py-4 text-zinc-300">{card.player}</td>
                  <td className="px-4 py-4 text-zinc-400">{card.year}</td>
                  <td className="px-4 py-4 text-zinc-400">{card.brand}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-lg border border-steelBorder bg-black/40 px-2 py-1 text-xs font-bold">
                      {card.grade}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-300">
                    {money(card.purchasePrice)}
                  </td>
                  <td className="px-4 py-4 font-extrabold text-profitGreen">
                    {money(card.estimatedValue)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-lg border border-vaultGold/30 bg-vaultGold/10 px-2 py-1 text-xs font-bold text-vaultGold">
                      {card.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => openCardDetail(card)}
                      className="rounded-lg border border-steelBorder p-2 text-zinc-300 hover:border-vaultGold hover:text-vaultGold"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function CardDetail({
  card,
  backToCollection,
}: {
  card: CardRecord;
  backToCollection: () => void;
}) {
  const roi =
    card.purchasePrice > 0
      ? ((card.gainLoss / card.purchasePrice) * 100).toFixed(1)
      : "0.0";

  return (
    <>
      <div className="mb-6">
        <button
          onClick={backToCollection}
          className="mb-5 flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-vaultGold"
        >
          <ArrowLeft size={18} />
          Back to My Collection
        </button>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-vaultGold">
              Card Detail
            </p>
            <h1 className="font-vault-heading mt-2 max-w-5xl text-4xl font-bold">
              {card.card}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>{card.player}</Badge>
              <Badge>{card.status}</Badge>
              <Badge>{card.grade}</Badge>
              <Badge>{card.sport}</Badge>
              <Badge>{card.brand}</Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
              Edit Card
            </button>
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Generate Card Analysis Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Panel className="col-span-3">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Card Images
          </h2>

          <CardImagePreview image={card.frontImage} label="Front Image" large />

          <div className="mt-4">
            <CardImagePreview image={card.backImage} label="Back Image" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <CardImagePreview image={card.slabImage} label="Slab" />
            <CardImagePreview image={card.receiptImage} label="Receipt" />
          </div>

          <div className="mt-6 border-t border-steelBorder pt-5">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-vaultGold">
              Condition Review
            </h2>

           <div className="grid grid-cols-2 gap-3">
              <ScoreBox label="Corners" value="Review" />
              <ScoreBox label="Centering" value="Review" />
              <ScoreBox label="Edges" value="Review" />
              <ScoreBox label="Surface" value="Review" />
           </div>

               <div className="mt-4 rounded-xl border border-vaultGold/30 bg-vaultGold/10 p-3">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
        Overall Condition
      </p>
      <p className="mt-1 text-xl font-extrabold text-vaultGold">
        Pending Inspection
      </p>
    </div>
  </div>

  <div className="mt-6 border-t border-steelBorder pt-5">
    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-vaultGold">
      Card Analysis
    </h2>

    <div className="space-y-3 text-sm leading-6 text-zinc-300">
      <CheckItem text="Initial card record created." />
      <CheckItem text="Card analysis notes available for review." />
      <CheckItem text={card.notes ?? "Add personal analysis notes."} />
    </div>
  </div>
</Panel>

        <div className="col-span-9 grid grid-cols-12 gap-6">
          <MetricCard
            className="col-span-3"
            label="Estimated Value"
            value={money(card.estimatedValue)}
            sub="Market value"
            valueClass="text-profitGreen"
          />
          <MetricCard
            className="col-span-3"
            label="Purchase Price"
            value={money(card.purchasePrice)}
            sub={card.purchaseDate ?? "Purchase date pending"}
            valueClass="text-dataCyan"
          />
          <MetricCard
            className="col-span-3"
            label="Net Gain / Loss"
            value={money(card.gainLoss)}
            sub={`${roi}% ROI`}
            valueClass={card.gainLoss >= 0 ? "text-profitGreen" : "text-red-400"}
          />
          <MetricCard
            className="col-span-3"
            label="Market Trend"
            value="Manual Review"
            sub="Comp refresh pending"
            valueClass="text-vaultGold"
          />

          <DetailSection className="col-span-4" title="Card Profile">
            <DetailRow label="Player" value={card.player} />
            <DetailRow label="Team" value={card.team} />
            <DetailRow label="Sport" value={card.sport} />
            <DetailRow label="Year" value={card.year} />
            <DetailRow label="Brand" value={card.brand} />
            <DetailRow
              label="Serial Number"
              value={card.serialNumber ?? "N/A"}
            />
            <DetailRow label="SKU" value={card.sku} />
            <DetailRow label="Storage" value={card.location} />
          </DetailSection>

          <DetailSection className="col-span-4" title="Purchase Snapshot">
            <DetailRow
              label="Purchase Date"
              value={card.purchaseDate ?? "Pending"}
            />
            <DetailRow
              label="Purchase Price"
              value={money(card.purchasePrice)}
            />
            <DetailRow label="Source" value={card.source ?? "Manual Entry"} />
            <DetailRow label="Location" value={card.location} />
            <DetailRow
              label="Total Cost Basis"
              value={money(card.purchasePrice)}
            />
            <DetailRow
              label="Current Gain"
              value={money(card.gainLoss)}
              valueClass={card.gainLoss >= 0 ? "text-profitGreen" : "text-red-400"}
            />
          </DetailSection>

          <DetailSection className="col-span-4" title="Market Comp Information">
            <DetailRow
              label="Last Sale"
              value={money(card.estimatedValue * 0.92)}
            />
            <DetailRow
              label="30-Day Average"
              value={money(card.estimatedValue * 0.89)}
            />
            <DetailRow
              label="High Comp"
              value={money(card.estimatedValue * 1.18)}
            />
            <DetailRow
              label="Low Comp"
              value={money(card.estimatedValue * 0.62)}
            />
            <DetailRow
              label="Comp Confidence"
              value="Manual"
              valueClass="text-vaultGold"
            />
            <button className="mt-4 w-full rounded-xl border border-vaultGold/40 px-4 py-3 text-sm font-bold text-vaultGold">
              View Comp Details
            </button>
          </DetailSection>

          <DetailSection className="col-span-4" title="Grading Strategy">
            <DetailRow label="Preferred Grader" value={card.grader ?? "PSA"} />
            <DetailRow
              label="Grading Status"
              value={card.grade === "Raw" ? "Planning" : "Returned"}
            />
            <DetailRow
              label="Expected Grade"
              value={card.grade === "Raw" ? "Review Needed" : card.grade}
            />
            <DetailRow label="Actual Grade" value={card.grade} />
            <DetailRow
              label="Cert Number"
              value={card.certNumber ?? "Pending"}
            />
            <button className="mt-4 w-full rounded-xl border border-vaultGold/40 px-4 py-3 text-sm font-bold text-vaultGold">
              View Grading Tracker
            </button>
          </DetailSection>

          <DetailSection className="col-span-4" title="Market Prediction">
            <DetailRow
              label="Low Estimate"
              value={money(card.estimatedValue * 0.65)}
            />
            <DetailRow label="Mid Estimate" value={money(card.estimatedValue)} />
            <DetailRow
              label="High Estimate"
              value={money(card.estimatedValue * 1.25)}
            />
            <DetailRow
              label="Premium Grade Estimate"
              value={money(card.estimatedValue * 1.55)}
            />
            <DetailRow
              label="30-Day Trend"
              value="Pending"
              valueClass="text-vaultGold"
            />
          </DetailSection>

          <DetailSection
            className="col-span-4"
            title="Personal Collection Decision"
          >
            <DetailRow
              label="PC Candidate"
              value={card.status === "Personal Collection" ? "Yes" : "Review"}
              valueClass="text-profitGreen"
            />
            <DetailRow
              label="Recommendation"
              value={
                card.status === "For Sale"
                  ? "Listed / Monitor"
                  : "Hold / Review"
              }
            />
            <DetailRow
              label="Target Sale Price"
              value={money(card.estimatedValue * 1.15)}
            />
            <DetailRow
              label="Projected Profit"
              value={money(card.gainLoss)}
              valueClass={card.gainLoss >= 0 ? "text-profitGreen" : "text-red-400"}
            />
            <p className="mt-4 rounded-xl border border-steelBorder bg-black/40 p-3 text-sm leading-6 text-zinc-300">
              {card.notes}
            </p>
          </DetailSection>

          <DetailSection className="col-span-4" title="Sale Information">
            <DetailRow label="Sale Date" value="TBD" />
            <DetailRow label="Platform / Show" value="TBD" />
            <DetailRow label="Invoice Number" value="TBD" />
            <DetailRow label="Sale Price" value="TBD" />
            <DetailRow label="Net Proceeds" value="TBD" />
            <button className="mt-4 w-full rounded-xl border border-vaultGold/40 px-4 py-3 text-sm font-bold text-vaultGold">
              Record Sale
            </button>
          </DetailSection>
        </div>
      </div>
    </>
  );
}

function AddCard({
  onSaveCard,
}: {
  onSaveCard: (formData: AddCardFormData) => void;
}) {
  const [activeStep, setActiveStep] = useState<AddCardStep>("Card Info");
  const [formData, setFormData] = useState<AddCardFormData>(emptyAddCardForm);

  const activeIndex = addCardSteps.indexOf(activeStep);
  const progressPercent = ((activeIndex + 1) / addCardSteps.length) * 100;
  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === addCardSteps.length - 1;

  const updateField = (field: keyof AddCardFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const generateSku = () => {
    const playerPart =
      formData.player
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 8)
        .toUpperCase() || "CARD";
    const yearPart = formData.year.replace(/[^0-9]/g, "").slice(0, 4) || "0000";
    const brandPart =
      formData.brand
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 5)
        .toUpperCase() || "SET";

    updateField("sku", `CVP-${playerPart}-${yearPart}-${brandPart}`);
  };

  const goPrevious = () => {
    setActiveStep(addCardSteps[Math.max(0, activeIndex - 1)]);
  };

  const goNext = () => {
    setActiveStep(
      addCardSteps[Math.min(addCardSteps.length - 1, activeIndex + 1)]
    );
  };

  const saveCard = () => {
    onSaveCard(formData);
  };

  return (
    <>
      <PageHeader
        eyebrow="Inventory Input"
        title="Add Card"
        subtitle="Add a new card with images, purchase data, grading strategy, market comps, and personal analysis."
        action={
          <div className="flex gap-3">
            <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
              Save Draft
            </button>
            <button
              onClick={saveCard}
              className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault"
            >
              Save Card
            </button>
          </div>
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
    <HorizontalChecklistItem
      done={!!formData.frontImage}
      label="Front"
    />
    <HorizontalChecklistItem
      done={!!formData.backImage}
      label="Back"
    />
    <HorizontalChecklistItem
      done={!!formData.player}
      label="Player"
    />
    <HorizontalChecklistItem
      done={!!formData.card}
      label="Card"
    />
    <HorizontalChecklistItem
      done={!!formData.purchasePrice || !!formData.totalCostBasis}
      label="Purchase"
    />
    <HorizontalChecklistItem
      done={!!formData.grade}
      label="Grade"
    />
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
        <div className="col-span-4 space-y-6">
          <Panel>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-vaultGold">
                Card Images
              </h2>
              <button className="flex items-center gap-2 rounded-lg border border-vaultGold/40 px-3 py-2 text-xs font-bold text-vaultGold">
                <Camera size={15} />
                Scan
              </button>
            </div>

            <ImageUploadBox
              label="Front Image"
              image={formData.frontImage}
              onImageChange={(image) => updateField("frontImage", image)}
              large
            />

            <div className="mt-4 grid grid-cols-3 gap-3">
              <ImageUploadBox
                label="Back"
                image={formData.backImage}
                onImageChange={(image) => updateField("backImage", image)}
              />
              <ImageUploadBox
                label="Slab"
                image={formData.slabImage}
                onImageChange={(image) => updateField("slabImage", image)}
              />
              <ImageUploadBox
                label="Receipt"
                image={formData.receiptImage}
                onImageChange={(image) => updateField("receiptImage", image)}
              />
            </div>
          </Panel>

          <Panel>
            <h2 className="text-sm font-bold uppercase tracking-widest text-vaultGold">
              Quick Actions
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={generateSku}
                className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:border-vaultGold hover:text-vaultGold"
              >
                Generate SKU
              </button>
              <button className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:border-vaultGold hover:text-vaultGold">
                Pull eBay Comps
              </button>
              <button className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:border-vaultGold hover:text-vaultGold">
                Grade Estimate
              </button>
              <button className="rounded-xl border border-steelBorder bg-black/40 px-4 py-3 text-left text-sm font-bold text-zinc-300 hover:border-vaultGold hover:text-vaultGold">
                Create Report
              </button>
            </div>
          </Panel>

        </div>

        <div className="col-span-8">
          <Panel>
            <div className="mb-6 grid grid-cols-4 gap-3">
              {addCardSteps.map((step, index) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                    activeStep === step
                      ? "border-vaultGold bg-vaultGold/10 text-vaultGold shadow-vault"
                      : index < activeIndex
                      ? "border-profitGreen/40 bg-profitGreen/10 text-profitGreen"
                      : "border-steelBorder bg-black/30 text-zinc-400 hover:border-vaultGold/40 hover:text-white"
                  }`}
                >
                  <span className="mr-2 text-xs opacity-70">{index + 1}.</span>
                  {step}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/30 p-5">
              {activeStep === "Card Info" && (
                <AddCardInfoStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Purchase" && (
                <AddPurchaseStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Grading" && (
                <AddGradingStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Market" && (
                <AddMarketStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Analysis" && (
                <AddAnalysisStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Decision" && (
                <AddDecisionStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Sale Info" && (
                <AddSaleInfoStep formData={formData} updateField={updateField} />
              )}
              {activeStep === "Notes" && (
                <AddNotesStep formData={formData} updateField={updateField} />
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={goPrevious}
                disabled={isFirstStep}
                className={`rounded-xl border px-5 py-3 text-sm font-bold ${
                  isFirstStep
                    ? "cursor-not-allowed border-steelBorder text-zinc-600"
                    : "border-steelBorder text-zinc-300 hover:border-vaultGold hover:text-vaultGold"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-3">
                <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
                  Save Draft
                </button>

                {isLastStep ? (
                  <button
                    onClick={saveCard}
                    className="rounded-xl bg-profitGreen px-5 py-3 text-sm font-bold text-black shadow-vault"
                  >
                    Save & Review Card
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function AddCardInfoStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<Boxes size={22} />}
      title="Card Information"
      subtitle="Core identity fields used across inventory, search, reports, and card detail."
    >
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Player Name"
          value={formData.player}
          onChange={(value) => updateField("player", value)}
          placeholder="Enter player name"
        />
        <Input
          label="Card Name / Description"
          value={formData.card}
          onChange={(value) => updateField("card", value)}
          placeholder="Enter full card name"
        />
        <Select
          label="Sport / Category"
          value={formData.sport}
          onChange={(value) => updateField("sport", value)}
          options={[
            "Basketball",
            "Football",
            "Baseball",
            "Pokemon",
            "One Piece",
          ]}
        />
        <Input
          label="Team / Character"
          value={formData.team}
          onChange={(value) => updateField("team", value)}
          placeholder="Team, franchise, or character"
        />
        <Input
          label="Year"
          value={formData.year}
          onChange={(value) => updateField("year", value)}
          placeholder="e.g. 2023-24"
        />
        <Input
          label="Brand"
          value={formData.brand}
          onChange={(value) => updateField("brand", value)}
          placeholder="Panini, Topps, Pokemon..."
        />
        <Input
          label="Set"
          value={formData.set}
          onChange={(value) => updateField("set", value)}
          placeholder="Enter set name"
        />
        <Input
          label="Card Number"
          value={formData.cardNumber}
          onChange={(value) => updateField("cardNumber", value)}
          placeholder="Enter card number"
        />
        <Input
          label="Parallel / Variation"
          value={formData.parallel}
          onChange={(value) => updateField("parallel", value)}
          placeholder="Silver, Gold, Chrome..."
        />
        <Select
          label="Rookie Card"
          value={formData.rookieCard}
          onChange={(value) => updateField("rookieCard", value)}
          options={["Yes", "No", "N/A"]}
        />
        <Select
          label="Autograph"
          value={formData.autograph}
          onChange={(value) => updateField("autograph", value)}
          options={["Yes", "No"]}
        />
        <Input
          label="Serial Number"
          value={formData.serialNumber}
          onChange={(value) => updateField("serialNumber", value)}
          placeholder="e.g. 5/5, 12/25, 1/1"
        />
        <Input
          label="Personal SKU"
          value={formData.sku}
          onChange={(value) => updateField("sku", value)}
          placeholder="CVP-WEMBY-PRIZM-001"
        />
        <Select
          label="Collection Status"
          value={formData.status}
          onChange={(value) => updateField("status", value)}
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
          value={formData.location}
          onChange={(value) => updateField("location", value)}
          placeholder="Vault A-01"
        />
      </div>
    </AddStepShell>
  );
}

function AddPurchaseStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<ShoppingCart size={22} />}
      title="Purchase Information"
      subtitle="Track cost basis, source, fees, and acquisition notes."
    >
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Purchase Date"
          value={formData.purchaseDate}
          onChange={(value) => updateField("purchaseDate", value)}
          placeholder="Select date"
        />
        <Input
          label="Purchase Price"
          value={formData.purchasePrice}
          onChange={(value) => updateField("purchasePrice", value)}
          placeholder="$0.00"
        />
        <Input
          label="Taxes / Fees"
          value={formData.taxesFees}
          onChange={(value) => updateField("taxesFees", value)}
          placeholder="$0.00"
        />
        <Input
          label="Shipping Cost"
          value={formData.shippingCost}
          onChange={(value) => updateField("shippingCost", value)}
          placeholder="$0.00"
        />
        <Input
          label="Total Cost Basis"
          value={formData.totalCostBasis}
          onChange={(value) => updateField("totalCostBasis", value)}
          placeholder="$0.00"
        />
        <Input
          label="Source / Platform"
          value={formData.source}
          onChange={(value) => updateField("source", value)}
          placeholder="eBay, Show, LCS"
        />
        <Input
          label="Seller Name"
          value={formData.sellerName}
          onChange={(value) => updateField("sellerName", value)}
          placeholder="Seller or shop name"
        />
        <Input
          label="Invoice / Order #"
          value={formData.invoiceNumber}
          onChange={(value) => updateField("invoiceNumber", value)}
          placeholder="Optional"
        />
        <Input
          label="Payment Method"
          value={formData.paymentMethod}
          onChange={(value) => updateField("paymentMethod", value)}
          placeholder="Card, cash, PayPal..."
        />
      </div>

      <Textarea
        label="Purchase Notes"
        value={formData.purchaseNotes}
        onChange={(value) => updateField("purchaseNotes", value)}
        placeholder="Add purchase story, negotiation notes, shipping condition, or seller details..."
      />
    </AddStepShell>
  );
}

function AddGradingStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<ShieldCheck size={22} />}
      title="Grading Strategy"
      subtitle="Capture current grade, target grader, condition estimate, and submission plan."
    >
      <div className="grid grid-cols-4 gap-4">
        <Select
          label="Current Grade"
          value={formData.grade}
          onChange={(value) => updateField("grade", value)}
          options={["Raw", "PSA 10", "PSA 9", "BGS 9.5", "BGS 10", "SGC 10"]}
        />
        <Select
          label="Preferred Grader"
          value={formData.grader}
          onChange={(value) => updateField("grader", value)}
          options={["PSA", "BGS", "SGC", "CGC", "TAG"]}
        />
        <Select
          label="Grading Status"
          value={formData.gradingStatus}
          onChange={(value) => updateField("gradingStatus", value)}
          options={["Not Graded", "Planning", "Submitted", "Returned"]}
        />
        <Input
          label="Cert Number"
          value={formData.certNumber}
          onChange={(value) => updateField("certNumber", value)}
          placeholder="Enter cert number"
        />
        <Select
          label="Corners"
          value={formData.corners}
          onChange={(value) => updateField("corners", value)}
          options={["10", "9.5", "9", "8.5", "Review"]}
        />
        <Select
          label="Centering"
          value={formData.centering}
          onChange={(value) => updateField("centering", value)}
          options={["10", "9.5", "9", "8.5", "Review"]}
        />
        <Select
          label="Edges"
          value={formData.edges}
          onChange={(value) => updateField("edges", value)}
          options={["10", "9.5", "9", "8.5", "Review"]}
        />
        <Select
          label="Surface"
          value={formData.surface}
          onChange={(value) => updateField("surface", value)}
          options={["10", "9.5", "9", "8.5", "Review"]}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="text-vaultGold" />
          <div>
            <p className="font-bold text-vaultGold">Grade Estimator Preview</p>
            <p className="mt-1 text-sm text-zinc-300">
              Future scan mode will estimate condition from clean front/back
              photos. This will always be a personal estimate, not an official
              PSA/BGS/SGC grade.
            </p>
          </div>
        </div>
      </div>
    </AddStepShell>
  );
}

function AddMarketStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<TrendingUp size={22} />}
      title="Market Comps"
      subtitle="Track sold comps, active listings, value confidence, and target sale prices."
    >
      <div className="grid grid-cols-4 gap-4">
        <Input
          label="Low Comp"
          value={formData.lowComp}
          onChange={(value) => updateField("lowComp", value)}
          placeholder="$0.00"
        />
        <Input
          label="Average Comp"
          value={formData.averageComp}
          onChange={(value) => updateField("averageComp", value)}
          placeholder="$0.00"
        />
        <Input
          label="High Comp"
          value={formData.highComp}
          onChange={(value) => updateField("highComp", value)}
          placeholder="$0.00"
        />
        <Select
          label="Comp Confidence"
          value={formData.compConfidence}
          onChange={(value) => updateField("compConfidence", value)}
          options={["Low", "Medium", "High"]}
        />
        <Input
          label="Last Sale"
          value={formData.lastSale}
          onChange={(value) => updateField("lastSale", value)}
          placeholder="$0.00"
        />
        <Input
          label="30-Day Average"
          value={formData.thirtyDayAverage}
          onChange={(value) => updateField("thirtyDayAverage", value)}
          placeholder="$0.00"
        />
        <Input
          label="Estimated Value"
          value={formData.estimatedValue}
          onChange={(value) => updateField("estimatedValue", value)}
          placeholder="$0.00"
        />
        <Input
          label="Target Sale Price"
          value={formData.targetSalePrice}
          onChange={(value) => updateField("targetSalePrice", value)}
          placeholder="$0.00"
        />
      </div>

      <Textarea
        label="Market Notes"
        value={formData.marketNotes}
        onChange={(value) => updateField("marketNotes", value)}
        placeholder="Add notes about demand, player momentum, scarcity, market timing, and comp quality..."
      />
    </AddStepShell>
  );
}

function AddAnalysisStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<ClipboardList size={22} />}
      title="Card Analysis"
      subtitle="Personal inspection notes, card activity, condition risks, and ownership rationale."
    >
      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Inspection Date"
          value={formData.inspectionDate}
          onChange={(value) => updateField("inspectionDate", value)}
          placeholder="Select date"
        />
        <Select
          label="Cleaning Needed"
          value={formData.cleaningNeeded}
          onChange={(value) => updateField("cleaningNeeded", value)}
          options={["No", "Yes", "Review"]}
        />
        <Select
          label="Condition Risk"
          value={formData.conditionRisk}
          onChange={(value) => updateField("conditionRisk", value)}
          options={["Low", "Medium", "High"]}
        />
      </div>

      <Textarea
        label="Card Activity / Inspection Notes"
        value={formData.inspectionNotes}
        onChange={(value) => updateField("inspectionNotes", value)}
        placeholder="Add card condition notes, visible issues, surface review, corners, edges, centering, print lines, and personal observations..."
      />

      <Textarea
        label="Collection Story"
        value={formData.collectionStory}
        onChange={(value) => updateField("collectionStory", value)}
        placeholder="Why did you buy this card? Is it PC, investment, flip, grading candidate, or long-term hold?"
      />
    </AddStepShell>
  );
}

function AddDecisionStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<CheckCircle2 size={22} />}
      title="Personal Collection Decision"
      subtitle="Decide whether to hold, grade, sell, trade, or monitor."
    >
      <div className="grid grid-cols-3 gap-4">
        <Select
          label="PC Candidate"
          value={formData.pcCandidate}
          onChange={(value) => updateField("pcCandidate", value)}
          options={["Yes", "No", "Maybe"]}
        />
        <Select
          label="Recommendation"
          value={formData.recommendation}
          onChange={(value) => updateField("recommendation", value)}
          options={["Hold", "Sell", "Trade", "Grade First", "Monitor"]}
        />
        <Select
          label="Priority"
          value={formData.priority}
          onChange={(value) => updateField("priority", value)}
          options={["Low", "Medium", "High", "Vault Lock"]}
        />
        <Input
          label="Target Profit"
          value={formData.targetProfit}
          onChange={(value) => updateField("targetProfit", value)}
          placeholder="$0.00"
        />
        <Input
          label="Target ROI"
          value={formData.targetRoi}
          onChange={(value) => updateField("targetRoi", value)}
          placeholder="%"
        />
        <Input
          label="Review Date"
          value={formData.reviewDate}
          onChange={(value) => updateField("reviewDate", value)}
          placeholder="Select date"
        />
      </div>

      <Textarea
        label="Decision Notes"
        value={formData.decisionNotes}
        onChange={(value) => updateField("decisionNotes", value)}
        placeholder="Add your hold/sell logic, target price, grade plan, and exit strategy..."
      />
    </AddStepShell>
  );
}

function AddSaleInfoStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<ShoppingCart size={22} />}
      title="Sale Information"
      subtitle="Track sale details once the card is listed or sold."
    >
      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Sale Status"
          value={formData.saleStatus}
          onChange={(value) => updateField("saleStatus", value)}
          options={["Not Listed", "Listed", "Sold", "Traded", "Removed"]}
        />
        <Input
          label="Listed Date"
          value={formData.listedDate}
          onChange={(value) => updateField("listedDate", value)}
          placeholder="Select date"
        />
        <Input
          label="Sale Date"
          value={formData.saleDate}
          onChange={(value) => updateField("saleDate", value)}
          placeholder="Select date"
        />
        <Input
          label="Platform / Show"
          value={formData.platform}
          onChange={(value) => updateField("platform", value)}
          placeholder="eBay, Whatnot, Show..."
        />
        <Input
          label="Sale Price"
          value={formData.salePrice}
          onChange={(value) => updateField("salePrice", value)}
          placeholder="$0.00"
        />
        <Input
          label="Platform Fees"
          value={formData.platformFees}
          onChange={(value) => updateField("platformFees", value)}
          placeholder="$0.00"
        />
        <Input
          label="Shipping Cost"
          value={formData.saleShippingCost}
          onChange={(value) => updateField("saleShippingCost", value)}
          placeholder="$0.00"
        />
        <Input
          label="Net Proceeds"
          value={formData.netProceeds}
          onChange={(value) => updateField("netProceeds", value)}
          placeholder="$0.00"
        />
        <Input
          label="Buyer / Invoice #"
          value={formData.buyerInvoice}
          onChange={(value) => updateField("buyerInvoice", value)}
          placeholder="Optional"
        />
      </div>

      <Textarea
        label="Sale Notes"
        value={formData.saleNotes}
        onChange={(value) => updateField("saleNotes", value)}
        placeholder="Add sale notes, buyer comments, shipment status, trade details, or margin details..."
      />
    </AddStepShell>
  );
}

function AddNotesStep({
  formData,
  updateField,
}: {
  formData: AddCardFormData;
  updateField: (field: keyof AddCardFormData, value: string) => void;
}) {
  return (
    <AddStepShell
      icon={<FileText size={22} />}
      title="Notes & Report Flags"
      subtitle="Control what appears in printable reports and future card analysis forms."
    >
      <div className="grid grid-cols-3 gap-4">
        <Select
          label="Include In Player Report"
          value={formData.includePlayerReport}
          onChange={(value) => updateField("includePlayerReport", value)}
          options={["Yes", "No"]}
        />
        <Select
          label="Include In Insurance Report"
          value={formData.includeInsuranceReport}
          onChange={(value) => updateField("includeInsuranceReport", value)}
          options={["Yes", "No"]}
        />
        <Select
          label="Include In Tax / Profit Report"
          value={formData.includeTaxReport}
          onChange={(value) => updateField("includeTaxReport", value)}
          options={["Yes", "No"]}
        />
      </div>

      <Textarea
        label="Private Notes"
        value={formData.privateNotes}
        onChange={(value) => updateField("privateNotes", value)}
        placeholder="Internal/private notes that only you see..."
      />

      <Textarea
        label="Printable Report Notes"
        value={formData.printableReportNotes}
        onChange={(value) => updateField("printableReportNotes", value)}
        placeholder="Notes that can appear in player collection or card analysis reports..."
      />
    </AddStepShell>
  );
}

function AddStepShell({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-vaultGold/40 bg-vaultGold/10 text-vaultGold">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Reports({ cards }: { cards: CardRecord[] }) {
  const [activeReport, setActiveReport] = useState<
    "playerCollection" | "cardAnalysis"
  >("playerCollection");

  const playerOptions = Array.from(
    new Set(cards.map((card) => card.player))
  ).sort();

  const [selectedPlayer, setSelectedPlayer] = useState<string>(
    playerOptions[0] ?? "Victor Wembanyama"
  );

  const selectedPlayerCards = cards.filter(
    (card) => card.player === selectedPlayer
  );

  const [selectedCardId, setSelectedCardId] = useState<number>(
    cards[0]?.id ?? 1
  );

  const selectedAnalysisCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0];

  return (
    <>
      <PageHeader
        eyebrow="Reports"
        title="Report Center"
        subtitle="Generate printable Word/PDF-style collection reports using CARDGEMZ branding."
        action={
          <div className="flex gap-3">
            <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
              Export PDF
            </button>
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Print Report
            </button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveReport("playerCollection")}
          className={`rounded-2xl border p-5 text-left transition ${
            activeReport === "playerCollection"
              ? "border-vaultGold bg-vaultGold/10 text-vaultGold shadow-vault"
              : "border-steelBorder bg-graphite900/90 text-zinc-300 hover:border-vaultGold/40"
          }`}
        >
          <p className="text-lg font-bold">Player Collection Report</p>
          <p className="mt-2 text-sm text-zinc-400">
            Printable inventory list for a specific player collection.
          </p>
        </button>

        <button
          onClick={() => setActiveReport("cardAnalysis")}
          className={`rounded-2xl border p-5 text-left transition ${
            activeReport === "cardAnalysis"
              ? "border-vaultGold bg-vaultGold/10 text-vaultGold shadow-vault"
              : "border-steelBorder bg-graphite900/90 text-zinc-300 hover:border-vaultGold/40"
          }`}
        >
          <p className="text-lg font-bold">Card Analysis Report</p>
          <p className="mt-2 text-sm text-zinc-400">
            One-card inspection, grading, market, and sell/hold analysis.
          </p>
        </button>
      </div>

      <Panel className="mb-6">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
          Report Parameters
        </h2>

        {activeReport === "playerCollection" && (
          <div className="grid grid-cols-4 gap-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-zinc-300">
                Select Player
              </span>
              <select
                value={selectedPlayer}
                onChange={(event) => setSelectedPlayer(event.target.value)}
                className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-vaultGold"
              >
                {playerOptions.map((player) => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
              </select>
            </label>

            <Select
              label="Sport"
              value="All Sports"
              onChange={() => null}
              options={["All Sports", "Basketball", "Football", "Baseball"]}
            />

            <Select
              label="Grade"
              value="All Grades"
              onChange={() => null}
              options={["All Grades", "Raw", "PSA 10", "PSA 9", "BGS 9.5"]}
            />

            <Select
              label="Status"
              value="All Statuses"
              onChange={() => null}
              options={[
                "All Statuses",
                "Personal Collection",
                "For Sale",
                "Watchlist",
                "Grade Candidate",
              ]}
            />
          </div>
        )}

        {activeReport === "cardAnalysis" && selectedAnalysisCard && (
          <div className="grid grid-cols-3 gap-4">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-zinc-300">
                Select Card
              </span>
              <select
                value={selectedCardId}
                onChange={(event) =>
                  setSelectedCardId(Number(event.target.value))
                }
                className="w-full rounded-lg border border-steelBorder bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-vaultGold"
              >
                {cards.map((card) => (
                  <option key={card.id} value={card.id}>
                    {card.player} — {card.card}
                  </option>
                ))}
              </select>
            </label>

            <Select
              label="Report Purpose"
              value="Personal Collection Evaluation"
              onChange={() => null}
              options={[
                "Personal Collection Evaluation",
                "Pre-Grading Review",
                "Sale Decision",
                "Insurance Review",
              ]}
            />

            <Select
              label="Include Market Comps"
              value="Yes"
              onChange={() => null}
              options={["Yes", "No"]}
            />
          </div>
        )}
      </Panel>

      {activeReport === "playerCollection" && (
        <PlayerCollectionReportPreview
          playerName={selectedPlayer}
          cards={selectedPlayerCards}
        />
      )}

      {activeReport === "cardAnalysis" && selectedAnalysisCard && (
        <CardAnalysisReportPreview card={selectedAnalysisCard} />
      )}
    </>
  );
}

function PlayerCollectionReportPreview({
  playerName,
  cards,
}: {
  playerName: string;
  cards: CardRecord[];
}) {
  const totalValue = cards.reduce((sum, card) => sum + card.estimatedValue, 0);
  const totalPaid = cards.reduce((sum, card) => sum + card.purchasePrice, 0);
  const gain = totalValue - totalPaid;
  const averageValue = cards.length ? totalValue / cards.length : 0;

  const displayRows =
    cards.length > 0
      ? cards
      : [
          {
            id: 999,
            sku: "NO-CARDS",
            player: playerName,
            card: "No cards found for selected parameters",
            team: "N/A",
            sport: "N/A",
            year: "N/A",
            brand: "N/A",
            grade: "N/A",
            status: "N/A",
            purchasePrice: 0,
            estimatedValue: 0,
            gainLoss: 0,
            location: "N/A",
            notes: "Adjust report parameters or add cards for this player.",
          },
        ];

  return (
    <div className="rounded-2xl border border-steelBorder bg-white p-8 text-black shadow-panel">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.075]">
          <img
            src={cardgemzReportLogo}
            alt=""
            className="h-[720px] w-[720px] object-contain grayscale"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between bg-black px-6 py-5 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-vaultGold/60 bg-black">
                <img
                  src={cardgemzReportLogo}
                  alt="CARDGEMZ report logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-vault-heading text-2xl font-bold tracking-wide">
                  CARDGEMZ <span className="text-vaultGold">VAULT PRO</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">Collection Report</p>
            </div>
          </div>

          <div className="py-7 text-center">
            <h2 className="font-vault-heading text-4xl font-bold">
              {playerName} Collection
            </h2>
            <p className="mt-2 text-lg text-blue-950">
              Printable Inventory List | May 24, 2025
            </p>
          </div>

          <div className="grid grid-cols-5 border border-vaultGold">
            {[
              "Total Cards",
              "Collection Value",
              "Total Paid",
              "Unrealized Gain",
              "Average Value",
            ].map((label) => (
              <div
                key={label}
                className="bg-black px-3 py-3 text-center text-sm font-bold uppercase text-vaultGold"
              >
                {label}
              </div>
            ))}

            <div className="px-3 py-5 text-center text-2xl font-bold">
              {cards.length}
            </div>
            <div className="px-3 py-5 text-center text-2xl font-bold">
              {money(totalValue)}
            </div>
            <div className="px-3 py-5 text-center text-2xl font-bold">
              {money(totalPaid)}
            </div>
            <div className="px-3 py-5 text-center text-2xl font-bold text-green-700">
              +{money(gain)}
            </div>
            <div className="px-3 py-5 text-center text-2xl font-bold">
              {money(averageValue)}
            </div>
          </div>

          <h3 className="mt-8 text-2xl font-bold">Card Inventory List</h3>

          <div className="mt-4 overflow-hidden">
            <div className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr_1fr_2fr] bg-black px-3 py-3 text-sm font-bold uppercase text-vaultGold">
              <div>#</div>
              <div>Card / Variant</div>
              <div>Grade</div>
              <div>Purchase</div>
              <div>Est. Value</div>
              <div>Gain / Loss</div>
              <div>Location</div>
              <div>Notes</div>
            </div>

            {displayRows.map((card, index) => (
              <div
                key={card.id}
                className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr_1fr_2fr] items-start px-3 py-3 text-sm"
              >
                <div>{index + 1}</div>
                <div className="font-semibold">{card.card}</div>
                <div className="font-bold">{card.grade}</div>
                <div>{money(card.purchasePrice)}</div>
                <div className="font-bold text-green-700">
                  {money(card.estimatedValue)}
                </div>
                <div
                  className={`font-bold ${
                    card.gainLoss >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {card.gainLoss >= 0 ? "+" : ""}
                  {money(card.gainLoss)}
                </div>
                <div>{card.location}</div>
                <div>{card.notes ?? "Collection hold."}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold">Report Notes</h3>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>
                Market comps should be refreshed before sale, trade, insurance,
                or grading decisions.
              </li>
              <li>
                Cards marked RAW should be inspected before submitting for
                grading.
              </li>
              <li>
                This report uses the locked CARDGEMZ black, graphite, and gold
                report theme.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardAnalysisReportPreview({ card }: { card: CardRecord }) {
  return (
    <div className="rounded-2xl border border-steelBorder bg-white p-8 text-black shadow-panel">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.075]">
          <img
            src={cardgemzReportLogo}
            alt=""
            className="h-[720px] w-[720px] object-contain grayscale"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between bg-black px-6 py-5 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-vaultGold/60 bg-black">
                <img
                  src={cardgemzReportLogo}
                  alt="CARDGEMZ report logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-vault-heading text-2xl font-bold tracking-wide">
                  CARDGEMZ <span className="text-vaultGold">VAULT PRO</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">Card Analysis Report</p>
            </div>
          </div>

          <div className="py-7 text-center">
            <h2 className="font-vault-heading text-4xl font-bold">
              {card.player} Card Analysis
            </h2>
            <p className="mt-2 text-lg text-blue-950">
              Personal Collection Evaluation |{" "}
              {card.purchaseDate ?? "Preview Date"}
            </p>
          </div>

          <div className="grid grid-cols-5 border border-vaultGold">
            {[
              "Purchase Price",
              "Est. Value",
              "Target Sale",
              "Projected Profit",
              "Decision",
            ].map((label) => (
              <div
                key={label}
                className="bg-black px-3 py-3 text-center text-sm font-bold uppercase text-vaultGold"
              >
                {label}
              </div>
            ))}

            <div className="px-3 py-5 text-center text-2xl font-bold">
              {money(card.purchasePrice)}
            </div>
            <div className="px-3 py-5 text-center text-2xl font-bold">
              {money(card.estimatedValue)}
            </div>
            <div className="px-3 py-5 text-center text-2xl font-bold">
              {money(card.estimatedValue * 1.15)}
            </div>
            <div
              className={`px-3 py-5 text-center text-2xl font-bold ${
                card.gainLoss >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {card.gainLoss >= 0 ? "+" : ""}
              {money(card.gainLoss)}
            </div>
            <div className="px-3 py-5 text-center text-xl font-bold">
              Hold / Review
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            <ReportBlock title="Card Profile">
              <ReportLine label="Card" value={card.card} />
              <ReportLine label="Player" value={card.player} />
              <ReportLine label="Team" value={card.team} />
              <ReportLine label="Sport" value={card.sport} />
              <ReportLine label="SKU" value={card.sku} />
              <ReportLine
                label="Serial Number"
                value={card.serialNumber ?? "N/A"}
              />
              <ReportLine label="Location" value={card.location} />
              <ReportLine label="Status" value={card.status} />
            </ReportBlock>

            <ReportBlock title="Card Images">
              <div className="grid grid-cols-2 gap-4">
                <ReportImagePreview image={card.frontImage} label="Front Image" />
                <ReportImagePreview image={card.backImage} label="Back Image" />
              </div>
            </ReportBlock>

            <ReportBlock title="Card Activity & Inspection Notes">
              <ul className="list-disc space-y-2 pl-6 text-sm">
                <li>Initial inspection completed.</li>
                <li>Surface and corners require close review before grading.</li>
                <li>{card.notes ?? "Add card activity notes."}</li>
              </ul>
            </ReportBlock>

            <ReportBlock title="Grading Evaluation">
              <div className="grid grid-cols-4 gap-3 text-center">
                <GradeBox label="Corners" value="Review" />
                <GradeBox label="Centering" value="Review" />
                <GradeBox label="Edges" value="Review" />
                <GradeBox label="Surface" value="Review" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <ReportLine
                  label="Preferred Grader"
                  value={card.grader ?? "N/A"}
                />
                <ReportLine label="Expected Grade" value="Review Needed" />
                <ReportLine label="Actual Grade" value={card.grade} />
                <ReportLine
                  label="Cert Number"
                  value={card.certNumber ?? "Pending"}
                />
              </div>
            </ReportBlock>

            <ReportBlock title="Market Comp Analysis">
              <div className="grid grid-cols-5 gap-3 text-center">
                <GradeBox
                  label="Last Sale"
                  value={money(card.estimatedValue * 0.9)}
                />
                <GradeBox
                  label="30D Avg"
                  value={money(card.estimatedValue * 0.89)}
                />
                <GradeBox
                  label="High"
                  value={money(card.estimatedValue * 1.25)}
                />
                <GradeBox
                  label="Low"
                  value={money(card.estimatedValue * 0.6)}
                />
                <GradeBox label="Confidence" value="Manual" />
              </div>
            </ReportBlock>

            <ReportBlock title="Predicted Sale Price">
              <ReportLine
                label="Conservative"
                value={money(card.estimatedValue * 0.75)}
              />
              <ReportLine label="Market" value={money(card.estimatedValue)} />
              <ReportLine
                label="Premium Grade"
                value={money(card.estimatedValue * 1.4)}
              />
            </ReportBlock>

            <ReportBlock title="Personal Collection Decision">
              <p className="text-sm leading-6">
                This card is currently marked as {card.status}. Final decision
                should be based on grade outcome, market comps, and target
                profit.
              </p>
            </ReportBlock>

            <ReportBlock title="Sale Information">
              <ReportLine label="Sale Date" value="TBD" />
              <ReportLine label="Platform / Show" value="TBD" />
              <ReportLine label="Invoice Number" value="TBD" />
              <ReportLine label="Sale Price" value="TBD" />
              <ReportLine label="Margin" value="TBD" />
            </ReportBlock>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold">Report Notes</h3>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
              <li>
                Market comps should be refreshed before sale, trade, insurance,
                or grading decisions.
              </li>
              <li>
                Raw cards should be inspected for centering, corners, edges, and
                surface before submitting for grading.
              </li>
              <li>
                Grade estimates are for personal analysis only and are not
                official PSA, BGS, or SGC grades.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketComps({ cards }: { cards: CardRecord[] }) {
  const [selectedCardId, setSelectedCardId] = useState<number>(
    cards[0]?.id ?? 1
  );

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0];

  const mockSoldComps = [
    {
      id: 1,
      source: "eBay Sold",
      date: "Jun 08, 2025",
      title: selectedCard
        ? `${selectedCard.player} ${selectedCard.card}`
        : "Selected Card Comp",
      grade: selectedCard?.grade ?? "Raw",
      price: selectedCard ? selectedCard.estimatedValue * 0.92 : 0,
      confidence: "High",
      notes: "Closest recent sold comp by card name and grade.",
    },
    {
      id: 2,
      source: "Card Show",
      date: "Jun 02, 2025",
      title: selectedCard
        ? `${selectedCard.player} comparable sale`
        : "Comparable Sale",
      grade: selectedCard?.grade ?? "Raw",
      price: selectedCard ? selectedCard.estimatedValue * 0.85 : 0,
      confidence: "Medium",
      notes: "Useful comp but source requires manual verification.",
    },
    {
      id: 3,
      source: "Private Sale",
      date: "May 26, 2025",
      title: selectedCard
        ? `${selectedCard.brand} ${selectedCard.year} parallel comp`
        : "Parallel Comp",
      grade: selectedCard?.grade ?? "Raw",
      price: selectedCard ? selectedCard.estimatedValue * 1.08 : 0,
      confidence: "Medium",
      notes: "Higher value due to scarcity / condition premium.",
    },
    {
      id: 4,
      source: "Active Listing",
      date: "Current",
      title: selectedCard
        ? `${selectedCard.player} active listing reference`
        : "Active Listing Reference",
      grade: selectedCard?.grade ?? "Raw",
      price: selectedCard ? selectedCard.estimatedValue * 1.2 : 0,
      confidence: "Low",
      notes: "Active listing only. Do not treat as sold value.",
    },
  ];

  const soldOnlyComps = mockSoldComps.filter(
    (comp) => comp.source !== "Active Listing"
  );

  const lowComp = Math.min(...soldOnlyComps.map((comp) => comp.price));
  const highComp = Math.max(...soldOnlyComps.map((comp) => comp.price));
  const averageComp =
    soldOnlyComps.reduce((sum, comp) => sum + comp.price, 0) /
    soldOnlyComps.length;

  const recommendedValue = selectedCard
    ? selectedCard.grade === "Raw"
      ? averageComp * 0.9
      : averageComp
    : 0;

  const spreadPercent =
    averageComp > 0 ? ((highComp - lowComp) / averageComp) * 100 : 0;

  const confidence =
    spreadPercent <= 20
      ? "High"
      : spreadPercent <= 45
      ? "Medium"
      : "Low";

  return (
    <>
      <PageHeader
        eyebrow="Valuation"
        title="Market Comps"
        subtitle="Review comparable sales, estimate market value, and determine confidence before buying, grading, or selling."
        action={
          <div className="flex gap-3">
            <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
              Save Comps
            </button>
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Update Estimated Value
            </button>
          </div>
        }
      />

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
            <Input
              label="Comp Source"
              value=""
              onChange={() => null}
              placeholder="eBay Sold, Show, Private..."
            />
            <Input
              label="Comp Date"
              value=""
              onChange={() => null}
              placeholder="Select date"
            />
            <Input
              label="Comp Price"
              value=""
              onChange={() => null}
              placeholder="$0.00"
            />
            <Select
              label="Comp Confidence"
              value="Medium"
              onChange={() => null}
              options={["Low", "Medium", "High"]}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <Input
              label="Condition / Grade"
              value=""
              onChange={() => null}
              placeholder="Raw, PSA 10, BGS 9.5..."
            />
            <Input
              label="Serial / Parallel"
              value=""
              onChange={() => null}
              placeholder="/10, Silver, Auto..."
            />
            <Input
              label="Comp Link / Reference"
              value=""
              onChange={() => null}
              placeholder="Paste reference later"
            />
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
                  <tr
                    key={comp.id}
                    className="border-t border-steelBorder bg-graphite900/60"
                  >
                    <td className="px-4 py-4 font-bold">{comp.source}</td>
                    <td className="px-4 py-4 text-zinc-400">{comp.date}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-zinc-200">{comp.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {comp.notes}
                      </p>
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
                      <span
                        className={`rounded-lg border px-2 py-1 text-xs font-bold ${
                          comp.confidence === "High"
                            ? "border-profitGreen/30 bg-profitGreen/10 text-profitGreen"
                            : comp.confidence === "Medium"
                            ? "border-vaultGold/30 bg-vaultGold/10 text-vaultGold"
                            : "border-red-400/30 bg-red-400/10 text-red-300"
                        }`}
                      >
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
          <h2 className="text-lg font-bold text-vaultGold">
            Valuation Decision
          </h2>

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
                A tighter spread means stronger valuation confidence. A wider
                spread means the card needs more confirmed sold comps.
              </p>
            </div>

            <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
              <p className="text-sm font-bold text-vaultGold">
                CARDGEMZ Recommendation
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                {confidence === "High"
                  ? "Value can be used with stronger confidence for reports or sale planning."
                  : confidence === "Medium"
                  ? "Use this value for planning, but refresh comps before sale or grading decisions."
                  : "Do not rely on this value yet. Add more recent sold comps before making a decision."}
              </p>
            </div>

            <button className="w-full rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Apply Recommended Value
            </button>
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
      card.grade === "Raw"
        ? card.estimatedValue * 1.35
        : card.estimatedValue;

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
      <PageHeader
        eyebrow="Grading"
        title="Grading Center"
        subtitle="Plan submissions, compare grader strategy, and identify cards with the best grading upside."
        action={
          <div className="flex gap-3">
            <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
              Create Submission
            </button>
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Grade Estimate
            </button>
          </div>
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

              <div className="mt-4 rounded-xl border border-vaultGold/30 bg-vaultGold/10 p-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Suggested Action
                </p>
                <p className="mt-1 text-sm font-bold text-vaultGold">
                  {selectedCard.grade === "Raw"
                    ? "Inspect front/back images, verify centering, then consider PSA/BGS submission."
                    : "Already graded. Monitor value and consider sale/hold strategy."}
                </p>
              </div>
            </div>
          )}
        </Panel>

        <Panel className="col-span-8">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Grade Upside Estimate
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                PSA 10 Estimate
              </p>
              <p className="mt-2 text-2xl font-extrabold text-profitGreen">
                {money(estimatedPSA10Value)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Premium scenario</p>
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                BGS 9.5 Estimate
              </p>
              <p className="mt-2 text-2xl font-extrabold text-vaultGold">
                {money(estimatedBGS95Value)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Strong grade scenario</p>
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                SGC 10 Estimate
              </p>
              <p className="mt-2 text-2xl font-extrabold text-dataCyan">
                {money(estimatedSGC10Value)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Fast return scenario</p>
            </div>

            <div className="rounded-2xl border border-profitGreen/30 bg-profitGreen/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                PSA Profit Upside
              </p>
              <p className="mt-2 text-2xl font-extrabold text-profitGreen">
                {money(projectedProfitAfterPSA)}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                After est. grading cost
              </p>
            </div>
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
                  <td className="px-4 py-4">
                    <span className="rounded-lg border border-steelBorder bg-black/40 px-2 py-1 text-xs font-bold">
                      {card.grade}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-300">
                    {card.grader ?? "Review"}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-lg border border-vaultGold/30 bg-vaultGold/10 px-2 py-1 text-xs font-bold text-vaultGold">
                      {card.submissionStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-extrabold text-profitGreen">
                    {money(card.estimatedValue)}
                  </td>
                  <td className="px-4 py-4 font-extrabold text-dataCyan">
                    {money(card.estimatedAfterGrade)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-lg border px-2 py-1 text-xs font-bold ${
                        card.priority === "High"
                          ? "border-profitGreen/30 bg-profitGreen/10 text-profitGreen"
                          : card.priority === "Medium"
                          ? "border-vaultGold/30 bg-vaultGold/10 text-vaultGold"
                          : "border-steelBorder bg-black/40 text-zinc-400"
                      }`}
                    >
                      {card.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function SalesTracker({ cards }: { cards: CardRecord[] }) {
  const [selectedCardId, setSelectedCardId] = useState<number>(
    cards[0]?.id ?? 1
  );

  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0];

  const listedCards = cards.filter((card) => card.status === "For Sale");
  const soldCards = cards.filter((card) => card.status === "Sold");

  const salesRows = cards.map((card) => {
    const isForSale = card.status === "For Sale";
    const isSold = card.status === "Sold";

    const suggestedSalePrice = card.estimatedValue * 1.05;
    const platformFee = suggestedSalePrice * 0.1325;
    const shippingCost = 6.5;
    const netProceeds = suggestedSalePrice - platformFee - shippingCost;
    const netProfit = netProceeds - card.purchasePrice;
    const roi =
      card.purchasePrice > 0 ? (netProfit / card.purchasePrice) * 100 : 0;

    return {
      ...card,
      saleStatus: isSold ? "Sold" : isForSale ? "Listed" : "Not Listed",
      suggestedSalePrice,
      platformFee,
      shippingCost,
      netProceeds,
      netProfit,
      roi,
    };
  });

  const listedValue = listedCards.reduce(
    (sum, card) => sum + card.estimatedValue,
    0
  );

  const projectedGrossSales = salesRows.reduce(
    (sum, row) =>
      row.saleStatus === "Listed" || row.saleStatus === "Sold"
        ? sum + row.suggestedSalePrice
        : sum,
    0
  );

  const projectedNetProceeds = salesRows.reduce(
    (sum, row) =>
      row.saleStatus === "Listed" || row.saleStatus === "Sold"
        ? sum + row.netProceeds
        : sum,
    0
  );

  const projectedProfit = salesRows.reduce(
    (sum, row) =>
      row.saleStatus === "Listed" || row.saleStatus === "Sold"
        ? sum + row.netProfit
        : sum,
    0
  );

  const selectedSuggestedSalePrice = selectedCard
    ? selectedCard.estimatedValue * 1.05
    : 0;
  const selectedPlatformFees = selectedSuggestedSalePrice * 0.1325;
  const selectedShippingCost = 6.5;
  const selectedNetProceeds =
    selectedSuggestedSalePrice - selectedPlatformFees - selectedShippingCost;
  const selectedProfit = selectedCard
    ? selectedNetProceeds - selectedCard.purchasePrice
    : 0;
  const selectedRoi =
    selectedCard && selectedCard.purchasePrice > 0
      ? (selectedProfit / selectedCard.purchasePrice) * 100
      : 0;

  return (
    <>
      <PageHeader
        eyebrow="Sales"
        title="Sales Tracker"
        subtitle="Track cards for sale, sold cards, platform fees, net proceeds, profit, and ROI."
        action={
          <div className="flex gap-3">
            <button className="rounded-xl border border-vaultGold/40 px-5 py-3 text-sm font-bold text-vaultGold">
              Export Sales Report
            </button>
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Record Sale
            </button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-5 gap-5">
        <MiniStat label="Listed Cards" value={String(listedCards.length)} />
        <MiniStat label="Sold Cards" value={String(soldCards.length)} />
        <MiniStat label="Listed Value" value={money(listedValue)} />
        <MiniStat label="Projected Net" value={money(projectedNetProceeds)} />
        <MiniStat label="Projected Profit" value={money(projectedProfit)} />
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
                Selected Card
              </p>
              <h3 className="mt-2 text-lg font-bold">{selectedCard.card}</h3>
              <p className="mt-1 text-sm text-zinc-400">
                {selectedCard.player} • {selectedCard.grade} •{" "}
                {selectedCard.status}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Purchase
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-dataCyan">
                    {money(selectedCard.purchasePrice)}
                  </p>
                </div>

                <div className="rounded-xl border border-steelBorder bg-black/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    Est. Value
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-profitGreen">
                    {money(selectedCard.estimatedValue)}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-vaultGold/30 bg-vaultGold/10 p-3">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Suggested Action
                </p>
                <p className="mt-1 text-sm font-bold text-vaultGold">
                  {selectedCard.status === "For Sale"
                    ? "Listed card. Monitor sale price, fees, and net profit."
                    : selectedCard.status === "Sold"
                    ? "Sold card. Review final net proceeds and ROI."
                    : "Not listed. Use this panel to plan a future sale."}
                </p>
              </div>
            </div>
          )}
        </Panel>

        <Panel className="col-span-8">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
            Sale Planner
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <Select
              label="Sale Status"
              value={
                selectedCard?.status === "Sold"
                  ? "Sold"
                  : selectedCard?.status === "For Sale"
                  ? "Listed"
                  : "Not Listed"
              }
              onChange={() => null}
              options={["Not Listed", "Listed", "Sold", "Traded", "Removed"]}
            />
            <Input
              label="Platform / Show"
              value=""
              onChange={() => null}
              placeholder="eBay, Whatnot, Show..."
            />
            <Input
              label="Target Sale Price"
              value={money(selectedSuggestedSalePrice)}
              onChange={() => null}
              placeholder="$0.00"
            />
            <Input
              label="Sale Date"
              value=""
              onChange={() => null}
              placeholder="Select date"
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            <Input
              label="Platform Fees"
              value={money(selectedPlatformFees)}
              onChange={() => null}
              placeholder="$0.00"
            />
            <Input
              label="Shipping Cost"
              value={money(selectedShippingCost)}
              onChange={() => null}
              placeholder="$0.00"
            />
            <Input
              label="Net Proceeds"
              value={money(selectedNetProceeds)}
              onChange={() => null}
              placeholder="$0.00"
            />
            <Input
              label="Buyer / Invoice #"
              value=""
              onChange={() => null}
              placeholder="Optional"
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Projected Profit
              </p>
              <p
                className={`mt-2 text-2xl font-extrabold ${
                  selectedProfit >= 0 ? "text-profitGreen" : "text-red-400"
                }`}
              >
                {money(selectedProfit)}
              </p>
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                ROI
              </p>
              <p
                className={`mt-2 text-2xl font-extrabold ${
                  selectedRoi >= 0 ? "text-profitGreen" : "text-red-400"
                }`}
              >
                {selectedRoi.toFixed(1)}%
              </p>
            </div>

            <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Break-Even Sale
              </p>
              <p className="mt-2 text-2xl font-extrabold text-vaultGold">
                {selectedCard
                  ? money((selectedCard.purchasePrice + selectedShippingCost) / 0.8675)
                  : "$0"}
              </p>
            </div>
          </div>

          <Textarea
            label="Sale Notes"
            value=""
            onChange={() => null}
            placeholder="Add notes about buyer, platform, negotiation, fees, shipping, margin, or whether this card should remain in the personal collection..."
          />

          <div className="mt-4 flex justify-end">
            <button className="rounded-xl bg-vaultGold px-5 py-3 text-sm font-bold text-black shadow-vault">
              Save Sale Plan
            </button>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Panel className="col-span-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Sales Pipeline</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Track cards by sale status, projected proceeds, profit, and ROI.
              </p>
            </div>

            <span className="rounded-full border border-vaultGold/40 px-3 py-1 text-xs font-bold text-vaultGold">
              {salesRows.length} Cards
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-steelBorder">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-black text-xs uppercase tracking-widest text-vaultGold">
                <tr>
                  <th className="px-4 py-4">Card</th>
                  <th className="px-4 py-4">Player</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Purchase</th>
                  <th className="px-4 py-4">Est. Value</th>
                  <th className="px-4 py-4">Sale Target</th>
                  <th className="px-4 py-4">Net Profit</th>
                  <th className="px-4 py-4">ROI</th>
                </tr>
              </thead>

              <tbody>
                {salesRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-steelBorder bg-graphite900/60"
                  >
                    <td className="px-4 py-4 font-bold">{row.card}</td>
                    <td className="px-4 py-4 text-zinc-300">{row.player}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-lg border px-2 py-1 text-xs font-bold ${
                          row.saleStatus === "Sold"
                            ? "border-profitGreen/30 bg-profitGreen/10 text-profitGreen"
                            : row.saleStatus === "Listed"
                            ? "border-vaultGold/30 bg-vaultGold/10 text-vaultGold"
                            : "border-steelBorder bg-black/40 text-zinc-400"
                        }`}
                      >
                        {row.saleStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-zinc-300">
                      {money(row.purchasePrice)}
                    </td>
                    <td className="px-4 py-4 font-extrabold text-profitGreen">
                      {money(row.estimatedValue)}
                    </td>
                    <td className="px-4 py-4 font-extrabold text-vaultGold">
                      {money(row.suggestedSalePrice)}
                    </td>
                    <td
                      className={`px-4 py-4 font-extrabold ${
                        row.netProfit >= 0 ? "text-profitGreen" : "text-red-400"
                      }`}
                    >
                      {money(row.netProfit)}
                    </td>
                    <td
                      className={`px-4 py-4 font-extrabold ${
                        row.roi >= 0 ? "text-profitGreen" : "text-red-400"
                      }`}
                    >
                      {row.roi.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel className="col-span-4">
          <h2 className="text-lg font-bold text-vaultGold">Sales Decision</h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Projected Gross Sales
              </p>
              <p className="mt-2 text-3xl font-extrabold text-vaultGold">
                {money(projectedGrossSales)}
              </p>
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Projected Net Proceeds
              </p>
              <p className="mt-2 text-3xl font-extrabold text-profitGreen">
                {money(projectedNetProceeds)}
              </p>
            </div>

            <div className="rounded-2xl border border-steelBorder bg-black/40 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Projected Profit
              </p>
              <p
                className={`mt-2 text-3xl font-extrabold ${
                  projectedProfit >= 0 ? "text-profitGreen" : "text-red-400"
                }`}
              >
                {money(projectedProfit)}
              </p>
            </div>

            <div className="rounded-2xl border border-vaultGold/30 bg-vaultGold/10 p-4">
              <p className="text-sm font-bold text-vaultGold">
                CARDGEMZ Recommendation
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Use Sales Tracker to plan sale targets before listing. Final ROI
                should be based on actual sale price, platform fees, shipping,
                and total cost basis.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

function SettingsScreen() {
  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Settings"
        subtitle="Manage CARDGEMZ Vault Pro defaults, report branding, grading preferences, sales assumptions, and future beta features."
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
            <SettingInfoRow label="Report Logo" value="Silver phoenix report logo" />
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

          <div className="mt-5 rounded-2xl border border-steelBorder bg-black/40 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Efficiency Goal
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              These defaults reduce repeated typing when adding multiple cards
              from the same category, storage location, or collection workflow.
            </p>
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

          <div className="mt-5 rounded-2xl border border-steelBorder bg-black/40 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Used By
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Sales Tracker, Card Detail sale planning, break-even estimate, net
              proceeds, and ROI projections.
            </p>
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
              Beta Planned
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
  subtitle?: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow="CardVault Pro"
        title={title}
        subtitle={
          subtitle ??
          "This section is locked into the blueprint and will be implemented during GOAT Phase 1."
        }
      />

      <Panel>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-vaultGold/40 bg-vaultGold/10 text-vaultGold">
            <ClipboardList />
          </div>
          <div>
            <h2 className="text-xl font-bold">Coming next</h2>
            <p className="mt-1 text-zinc-400">
              We have the design direction locked. This screen will be built
              after My Collection, Add Card, Card Detail, and Reports are wired.
            </p>
          </div>
        </div>
      </Panel>
    </>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
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

function MetricCard({
  label,
  value,
  sub,
  valueClass,
  className = "",
}: {
  label: string;
  value: string;
  sub: string;
  valueClass: string;
  className?: string;
}) {
  return (
    <Panel className={className}>
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className={`mt-3 text-2xl font-extrabold ${valueClass}`}>{value}</p>
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
      <p className="mt-2 text-2xl font-extrabold text-vaultGold">{value}</p>
    </div>
  );
}

function DetailSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-steelBorder bg-graphite900/90 p-5 shadow-panel ${className}`}
    >
      <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-vaultGold">
        {title}
      </h2>
      {children}
    </div>
  );
}

function DetailRow({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-4 border-b border-steelBorder/60 pb-2 last:mb-0 last:border-b-0 last:pb-0">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <p className={`max-w-[60%] text-right text-sm font-bold ${valueClass}`}>
        {value}
      </p>
    </div>
  );
}

function ScoreBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-profitGreen/30 bg-profitGreen/10 p-3 text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold text-profitGreen">{value}</p>
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

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-vaultGold/30 bg-vaultGold/10 px-3 py-1 text-xs font-bold text-vaultGold">
      {children}
    </span>
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
        <option>Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
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
  onImageChange,
  large = false,
}: {
  label: string;
  image: string;
  onImageChange: (image: string) => void;
  large?: boolean;
}) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageChange(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

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
        onChange={handleFileChange}
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

function ReportImagePreview({
  image,
  label,
}: {
  image?: string;
  label: string;
}) {
  return (
    <div className="flex h-56 items-center justify-center overflow-hidden border border-zinc-300 bg-zinc-100">
      {image ? (
        <img
          src={image}
          alt={label}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <div className="text-center text-zinc-500">
          <ImagePlus className="mx-auto" />
          <p className="mt-2 text-sm font-bold">{label}</p>
        </div>
      )}
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
        <h3 className="text-xl font-extrabold text-vaultGold">{grader}</h3>
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
      <p className="mt-2 text-lg font-extrabold text-vaultGold">{value}</p>
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

function ReportBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-300 bg-white">
      <div className="bg-black px-4 py-3 text-sm font-bold uppercase tracking-widest text-vaultGold">
        {title}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ReportLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2 flex justify-between gap-4 text-sm last:mb-0">
      <span className="font-bold">{label}:</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function GradeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-3">
      <p className="text-xs font-bold uppercase text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-green-700">{value}</p>
    </div>
  );
}

export default App;