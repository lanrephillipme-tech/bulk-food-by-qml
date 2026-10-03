import {
  Bike,
  Boxes,
  ChartNoAxesCombined,
  ClipboardCheck,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Store,
  UsersRound
} from "lucide-react";

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
});

const summary = {
  users: 12840,
  activePlans: 3920,
  vendors: 186,
  financingOpen: 42100000,
  deliveriesAvailable: 74,
  pendingApprovals: 39
};

const approvals = [
  { name: "Northern Fresh Market", type: "Vendor", city: "Abuja", status: "KYC Review" },
  { name: "Ibrahim Sani", type: "Logistics", city: "Lagos", status: "Vehicle Check" },
  { name: "Greenbridge Capital", type: "Financier", city: "Lagos", status: "Risk Agreement" }
];

const opportunities = [
  { title: "Corporate Staff Food Distribution", risk: "Medium", amount: 1500000, return: 180000, funded: 62 },
  { title: "Monthly Family Food Pack", risk: "Low", amount: 68000, return: 8500, funded: 35 },
  { title: "Festive Bulk Celebration Pack", risk: "Medium", amount: 140000, return: 21500, funded: 48 }
];

const deliveries = [
  { route: "Mile 12 to Lekki Phase 1", vehicle: "Van", payout: 8500, status: "Available" },
  { route: "Mainland Grain Depot to Yaba", vehicle: "Bike", payout: 3200, status: "Accepted" },
  { route: "Abuja Market to Gwarinpa", vehicle: "Truck", payout: 18500, status: "Picked Up" }
];

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Users", icon: UsersRound },
  { label: "Vendors", icon: Store },
  { label: "Plans", icon: ClipboardCheck },
  { label: "Financing", icon: CreditCard },
  { label: "Logistics", icon: Bike }
];

export function App() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">Q</div>
          <div>
            <strong>Bulk Food</strong>
            <span>by QML</span>
          </div>
        </div>

        <nav>
          {nav.map((item, index) => {
            const Icon = item.icon;
            return (
              <button className={index === 0 ? "active" : ""} key={item.label}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <p>Super Admin Dashboard</p>
            <h1>Control all QML marketplace activity</h1>
          </div>
          <button className="reviewButton">
            <ShieldCheck size={18} />
            Review approvals
          </button>
        </header>

        <section className="metrics">
          <Metric title="Users" value={summary.users.toLocaleString()} icon={<UsersRound />} />
          <Metric title="Active Plans" value={summary.activePlans.toLocaleString()} icon={<ClipboardCheck />} />
          <Metric title="Vendors" value={summary.vendors.toLocaleString()} icon={<Store />} />
          <Metric title="Open Financing" value={money.format(summary.financingOpen)} icon={<ChartNoAxesCombined />} />
          <Metric title="Available Trips" value={summary.deliveriesAvailable.toLocaleString()} icon={<Bike />} />
          <Metric title="Pending Reviews" value={summary.pendingApprovals.toLocaleString()} icon={<ShieldCheck />} />
        </section>

        <section className="grid">
          <Panel title="Role Approvals" action="Open queue">
            {approvals.map((item) => (
              <div className="row" key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.type} · {item.city}</span>
                </div>
                <em>{item.status}</em>
              </div>
            ))}
          </Panel>

          <Panel title="Financing Opportunities" action="Manage risk">
            {opportunities.map((item) => (
              <div className="financeRow" key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{money.format(item.amount)} needed · {money.format(item.return)} return</span>
                </div>
                <div className="progress">
                  <span style={{ width: `${item.funded}%` }} />
                </div>
              </div>
            ))}
          </Panel>

          <Panel title="Delivery Dispatch" action="View map">
            {deliveries.map((item) => (
              <div className="row" key={item.route}>
                <div>
                  <strong>{item.route}</strong>
                  <span>{item.vehicle} · {money.format(item.payout)}</span>
                </div>
                <em>{item.status}</em>
              </div>
            ))}
          </Panel>

          <Panel title="Marketplace Controls" action="Add package">
            <div className="controlGrid">
              <button><Boxes size={18} /> Packages</button>
              <button><Store size={18} /> Vendor pricing</button>
              <button><CreditCard size={18} /> Credit rules</button>
              <button><Bike size={18} /> Delivery zones</button>
            </div>
          </Panel>
        </section>
      </main>
    </div>
  );
}

function Metric({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <article className="metric">
      <div>{icon}</div>
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  );
}

function Panel({ title, action, children }: { title: string; action: string; children: React.ReactNode }) {
  return (
    <article className="panel">
      <div className="panelHeader">
        <h2>{title}</h2>
        <button>{action}</button>
      </div>
      {children}
    </article>
  );
}
