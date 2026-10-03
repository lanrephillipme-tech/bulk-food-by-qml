import cors from "cors";
import express from "express";
import { nanoid } from "nanoid";
import { z } from "zod";
import { deliveries, opportunities, packages, plans, Role, users, vendors } from "./data.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "Bulk Food by QML API" });
});

app.get("/api/summary", (_req, res) => {
  res.json({
    users: users.length,
    activePlans: plans.filter((plan) => plan.status === "active" || plan.status === "delivery_eligible").length,
    vendors: vendors.length,
    financingOpen: opportunities.reduce((sum, item) => sum + item.amountNeeded, 0),
    deliveriesAvailable: deliveries.filter((delivery) => delivery.status === "available").length,
    pendingApprovals: users.flatMap((user) => Object.values(user.roles)).filter((status) => status === "pending").length
  });
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({
    user,
    plans: plans.filter((plan) => plan.userId === user.id)
  });
});

app.get("/api/packages", (req, res) => {
  const country = String(req.query.country ?? "").toLowerCase();
  const city = String(req.query.city ?? "").toLowerCase();
  res.json(
    packages.filter((item) => {
      const countryMatch = country ? item.country.toLowerCase() === country : true;
      const cityMatch = city ? item.city.toLowerCase() === city : true;
      return countryMatch && cityMatch;
    })
  );
});

app.get("/api/plans", (_req, res) => {
  res.json(plans);
});

app.get("/api/vendors", (_req, res) => {
  res.json(vendors);
});

app.get("/api/financing-opportunities", (_req, res) => {
  res.json(opportunities);
});

app.get("/api/deliveries", (_req, res) => {
  res.json(deliveries);
});

const roleApplicationSchema = z.object({
  userId: z.string(),
  role: z.enum(["vendor", "financier", "logistics", "corporate"]),
  referralCode: z.string().optional()
});

app.post("/api/role-applications", (req, res) => {
  const parsed = roleApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const user = users.find((item) => item.id === parsed.data.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.roles[parsed.data.role as Role] = "pending";
  if (parsed.data.referralCode) user.referredBy = parsed.data.referralCode;

  res.status(201).json({
    id: `role_${nanoid(8)}`,
    status: "pending",
    message: `${parsed.data.role} application submitted`,
    user
  });
});

const planSchema = z.object({
  userId: z.string(),
  packageId: z.string(),
  interval: z.enum(["daily", "weekly", "monthly"]),
  deposit: z.number().nonnegative()
});

app.post("/api/plans", (req, res) => {
  const parsed = planSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const selectedPackage = packages.find((item) => item.id === parsed.data.packageId);
  if (!selectedPackage) return res.status(404).json({ error: "Package not found" });

  const paid = parsed.data.deposit;
  const status = paid >= selectedPackage.price * 0.5 ? "delivery_eligible" : "active";
  const plan = {
    id: `plan_${nanoid(8)}`,
    userId: parsed.data.userId,
    packageId: selectedPackage.id,
    title: selectedPackage.title,
    total: selectedPackage.price,
    paid,
    interval: parsed.data.interval,
    nextDueDate: "2026-08-22",
    status
  } as const;

  plans.push(plan);
  res.status(201).json(plan);
});

app.listen(port, () => {
  console.log(`Bulk Food by QML API running on http://localhost:${port}`);
});
