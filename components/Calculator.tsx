"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  Check,
  ClipboardList,
  CreditCard,
  FileText,
  Layers,
  PackageCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const sgsBundles = {
  start: {
    name: "Start",
    tagline: "Run the day.",
    priceWithoutPay: 199,
    priceWithPay: 139,
    additionalProvider: 59,
    guidance:
      "Best for practices that need core EHR, scheduling, charting, patient portal, reminders, payments, and reporting.",
    highlights: ["Core EHR + scheduling", "Charting and reporting", "Patient portal and reminders"],
  },
  grow: {
    name: "Grow",
    tagline: "Build momentum.",
    priceWithoutPay: 349,
    priceWithPay: 329,
    additionalProvider: 69,
    guidance:
      "Best for practices ready for patient engagement, AI scribe, digital intake, multi-location support, and retention tools.",
    highlights: ["Patient engagement", "AI scribe", "Digital intake and multi-location support"],
    badge: "Most popular",
  },
  scale: {
    name: "Scale",
    tagline: "Automate growth.",
    priceWithoutPay: 549,
    priceWithPay: 529,
    additionalProvider: 99,
    guidance:
      "Best for practices ready for advanced AI, review responses, campaigns, AI translation, automation, and SmartFit.",
    highlights: ["Advanced AI", "AI campaigns and translation", "SmartFit included"],
  },
};

const termOptions = {
  "12month": {
    label: "12-month",
    months: 12,
  },
  "3month": {
    label: "3-month",
    months: 3,
  },
  monthly: {
    label: "Monthly",
    months: 1,
  },
};

const sgsTermOptions = {
  monthToMonth: {
    label: "Month to month",
    months: 1,
  },
  "3month": {
    label: "3-month plan",
    months: 3,
  },
  "12month": {
    label: "12-month agreement",
    months: 12,
  },
};

const usageRates = {
  engageIncludedTexts: 2000,
  engageOverageBlockSize: 1000,
  engageOverageRate: 9.95,

  remindIncludedTexts: 500,
  remindOverageBlockSize: 500,
  remindOverageRate: 9.95,

  verifyIncluded: 150,
  verifyOverage: 0.2,
};

const currentCatalog = {
  core: {
    label: "Core",
    alaCarte: {
      baseLabel: "CT Core software",
      basePrice: 159,
      providerTiers: [
        { from: 1, to: 1, price: 49 },
        { from: 2, to: 3, price: 39 },
        { from: 4, to: 5, price: 29 },
        { from: 6, to: Infinity, price: 19 },
      ],
      addOns: {
        engage: {
          label: "CT Engage",
          monthly: 159.95,
          note: "Includes 2,000 texts and 5,000 emails. Text overage is $9.95 per additional 1,000 texts.",
        },
        informs: {
          label: "CT InForms",
          monthly: 59.95,
          note: "Current Core à la carte pricing.",
        },
        remind: {
          label: "CT Remind",
          monthly: 39.95,
          note: "Includes 500 texts and 1,000 emails. Text overage is $9.95 per additional 500 texts.",
        },
      },
    },
    bundles: {
      "12month": [
        {
          id: "core-12-a-single",
          name: "Bundle A Single Provider",
          baseLabel: "Core",
          basePrice: 145,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            engage: { label: "CT Engage", monthly: 100, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 45, defaultSelected: true },
          },
        },
        {
          id: "core-12-a-multi",
          name: "Bundle A Multi Provider",
          baseLabel: "Core",
          basePrice: 145,
          providerTiers: [
            { from: 1, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            engage: { label: "CT Engage", monthly: 125, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
          },
        },
        {
          id: "core-12-b-single",
          name: "Bundle B Single Provider",
          baseLabel: "Core",
          basePrice: 145,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            informs: { label: "CT InForms", monthly: 35, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
          },
        },
        {
          id: "core-12-b-multi",
          name: "Bundle B Multi Provider",
          baseLabel: "Core",
          basePrice: 145,
          providerTiers: [
            { from: 1, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
          },
        },
      ],
      "3month": [
        {
          id: "core-3-intro",
          name: "Intro",
          baseLabel: "Core",
          basePrice: 159,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            informs: { label: "CT InForms", monthly: 59.95, defaultSelected: false },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
          },
        },
        {
          id: "core-3-a-single",
          name: "Bundle A Single Provider",
          baseLabel: "Core",
          basePrice: 150,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            engage: { label: "CT Engage", monthly: 150, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 55, defaultSelected: true },
          },
        },
        {
          id: "core-3-a-multi",
          name: "Bundle A Multi Provider",
          baseLabel: "Core",
          basePrice: 145,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            engage: { label: "CT Engage", monthly: 150, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
          },
        },
        {
          id: "core-3-b-single",
          name: "Bundle B Single Provider",
          baseLabel: "Core",
          basePrice: 150,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
          },
        },
        {
          id: "core-3-b-multi",
          name: "Bundle B Multi Provider",
          baseLabel: "Core",
          basePrice: 150,
          providerTiers: [
            { from: 1, to: 1, price: 49 },
            { from: 2, to: 3, price: 39 },
            { from: 4, to: 5, price: 29 },
            { from: 6, to: Infinity, price: 19 },
          ],
          addOns: {
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
          },
        },
      ],
      monthly: [],
    },
  },
  advanced: {
    label: "Advanced",
    alaCarte: {
      baseLabel: "CT Advanced software",
      basePrice: 299,
      providerTiers: [
        { from: 1, to: 1, price: 99 },
        { from: 2, to: 3, price: 79 },
        { from: 4, to: 5, price: 59 },
        { from: 6, to: 8, price: 39 },
        { from: 9, to: Infinity, price: 19 },
      ],
      addOns: {
        engage: {
          label: "CT Engage",
          monthly: 159.95,
          note: "Includes 2,000 texts and 5,000 emails. Text overage is $9.95 per additional 1,000 texts.",
        },
        informs: {
          label: "CT InForms",
          monthly: 59.95,
          note: "Current Advanced à la carte pricing.",
        },
        remind: {
          label: "CT Remind",
          monthly: 39.95,
          note: "Includes 500 texts and 1,000 emails. Text overage is $9.95 per additional 500 texts.",
        },
        verify: {
          label: "CT Verify",
          monthly: 29.95,
          note: "Includes 150 inquiries. Overage is $0.20 per inquiry after 150.",
        },
      },
    },
    bundles: {
      "12month": [
        {
          id: "advanced-12-a-single",
          name: "Bundle A Single Provider",
          baseLabel: "Advanced",
          basePrice: 260,
          providerTiers: [
            { from: 1, to: 1, price: 99 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 99.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 1,
            },
            engage: { label: "CT Engage", monthly: 100, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 45, defaultSelected: true },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-12-a-multi",
          name: "Bundle A Multi Provider",
          baseLabel: "Advanced",
          basePrice: 260,
          providerTiers: [
            { from: 1, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 99.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 2,
            },
            engage: { label: "CT Engage", monthly: 125, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-12-b-single",
          name: "Bundle B Single Provider",
          baseLabel: "Advanced",
          basePrice: 270,
          providerTiers: [
            { from: 1, to: 1, price: 99 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 99.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 1,
            },
            informs: { label: "CT InForms", monthly: 35, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-12-b-multi",
          name: "Bundle B Multi Provider",
          baseLabel: "Advanced",
          basePrice: 275,
          providerTiers: [
            { from: 1, to: 3, price: 69 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 99.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 2,
            },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
      ],
      "3month": [
        {
          id: "advanced-3-intro",
          name: "Intro",
          baseLabel: "Advanced",
          basePrice: 289,
          providerTiers: [
            { from: 1, to: 1, price: 99 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 119.95,
              defaultSelected: false,
              kind: "perProvider",
              minProviders: 1,
            },
            informs: { label: "CT InForms", monthly: 59.95, defaultSelected: false },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-3-a-single",
          name: "Bundle A Single Provider",
          baseLabel: "Advanced",
          basePrice: 280,
          providerTiers: [
            { from: 1, to: 1, price: 99 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 119.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 1,
            },
            engage: { label: "CT Engage", monthly: 150, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 55, defaultSelected: true },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-3-a-multi",
          name: "Bundle A Multi Provider",
          baseLabel: "Advanced",
          basePrice: 280,
          providerTiers: [
            { from: 1, to: 1, price: 90 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 119.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 2,
            },
            engage: { label: "CT Engage", monthly: 150, defaultSelected: true },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-3-b-single",
          name: "Bundle B Single Provider",
          baseLabel: "Advanced",
          basePrice: 280,
          providerTiers: [
            { from: 1, to: 1, price: 99 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 119.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 1,
            },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
        {
          id: "advanced-3-b-multi",
          name: "Bundle B Multi Provider",
          baseLabel: "Advanced",
          basePrice: 280,
          providerTiers: [
            { from: 1, to: 1, price: 90 },
            { from: 2, to: 3, price: 79 },
            { from: 4, to: 5, price: 59 },
            { from: 6, to: Infinity, price: 39 },
          ],
          addOns: {
            bundleClaim: {
              label: "ProClear Swift / MaxClear Unlimited",
              monthly: 119.95,
              defaultSelected: true,
              kind: "perProvider",
              minProviders: 2,
            },
            informs: { label: "CT InForms", monthly: 50, defaultSelected: true },
            engage: { label: "CT Engage", monthly: 159.95, defaultSelected: false },
            remind: { label: "CT Remind", monthly: 39.95, defaultSelected: false },
            verify: { label: "CT Verify", monthly: 29.95, defaultSelected: false },
          },
        },
      ],
      monthly: [],
    },
  },
};

currentCatalog.core.bundles.monthly = currentCatalog.core.bundles["3month"].map((bundle) => ({
  ...bundle,
  id: bundle.id.replace("core-3", "core-monthly"),
}));

currentCatalog.advanced.bundles.monthly = currentCatalog.advanced.bundles["3month"].map((bundle) => ({
  ...bundle,
  id: bundle.id.replace("advanced-3", "advanced-monthly"),
}));

const advancedClearinghouseOptions = {
  none: {
    label: "No clearinghouse",
    description: "No clearinghouse charge in current state.",
  },
  proclearUnlimited: {
    label: "ProClear Unlimited",
    description: "$119.95/provider/month.",
  },
  proclearPerClaim: {
    label: "ProClear Per Claim",
    description: "$39 for 100 claims, $25 for 200 ERAs, plus overages.",
  },
  maxClearUnlimited: {
    label: "MaxClear Unlimited",
    description: "$119/provider/month.",
  },
  maxClearDefault: {
    label: "MaxClear Default / Per Claim",
    description: "First 50 claims free per provider, then $39.95 per 100 claims.",
  },
};

function asNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatCurrency(value) {
  const safeValue = asNumber(value);
  const hasCents = Math.abs(safeValue % 1) > 0.001;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(safeValue);
}

function getTextOverage(totalTexts, includedTexts, blockSize, blockRate) {
  const safeTotalTexts = Math.max(0, Math.floor(asNumber(totalTexts)));
  const overageTexts = Math.max(0, safeTotalTexts - includedTexts);
  const overageBlocks = overageTexts === 0 ? 0 : Math.ceil(overageTexts / blockSize);

  return {
    totalTexts: safeTotalTexts,
    overageTexts,
    overageBlocks,
    overageCost: overageBlocks * blockRate,
  };
}

function getTierPrice(additionalProviderNumber, tiers) {
  const tier = tiers.find(
    (item) => additionalProviderNumber >= item.from && additionalProviderNumber <= item.to
  );

  return tier?.price || 0;
}

function getProviderTotal(providerCount, tiers) {
  const additionalProviders = Math.max(0, providerCount - 1);
  let total = 0;

  for (let i = 1; i <= additionalProviders; i += 1) {
    total += getTierPrice(i, tiers);
  }

  return total;
}

function getProviderNote(providerCount, tiers) {
  const additionalProviders = Math.max(0, providerCount - 1);
  if (additionalProviders === 0) return "Single provider included.";

  const rates = [];

  for (let i = 1; i <= additionalProviders; i += 1) {
    rates.push(formatCurrency(getTierPrice(i, tiers)));
  }

  return `${additionalProviders} additional provider${additionalProviders === 1 ? "" : "s"}: ${rates.join(
    " + "
  )}`;
}

function sumItems(items) {
  return items.reduce((sum, item) => sum + asNumber(item.amount), 0);
}

function getBundleAddOnAmount(addOn, providerCount) {
  if (addOn.kind === "perProvider") {
    const billableProviders = Math.max(providerCount, addOn.minProviders || 1);
    return billableProviders * addOn.monthly;
  }

  return addOn.monthly;
}

function getSgsPromotionalFreeMonths({ selectedBundle, hasInsuranceModule }) {
  if (hasInsuranceModule) {
    if (selectedBundle === "start") return 1;
    if (selectedBundle === "grow") return 2;
    if (selectedBundle === "scale") return 2;
  }

  if (selectedBundle === "grow") return 1;
  if (selectedBundle === "scale") return 2;

  return 0;
}

function Toggle({ enabled, onChange, label, description, disabled = false, badge }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
          : enabled
            ? "border-[#427CBF] bg-[#ECF8FB]"
            : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <span>
        <span className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
          {label}
          {badge && (
            <span className="rounded-full bg-[#C7E5D0] px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-[#073244]">
              {badge}
            </span>
          )}
        </span>
        {description && <span className="mt-1 block text-sm text-slate-500">{description}</span>}
      </span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled ? "bg-[#427CBF]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

function NumberField({ label, value, onChange, min = 0, step = 1, description, prefix }) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold text-slate-900">{label}</span>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full rounded-2xl border border-slate-200 py-3 text-lg font-semibold outline-none transition focus:border-[#427CBF] focus:ring-4 focus:ring-[#D0EDF5] ${
            prefix ? "pl-9 pr-4" : "px-4"
          }`}
        />
      </div>
      {description && <span className="mt-2 block text-sm text-slate-500">{description}</span>}
    </label>
  );
}

function SelectField({ label, value, onChange, options, description }) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold text-slate-900">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#427CBF] focus:ring-4 focus:ring-[#D0EDF5]"
      >
        {options.map((option) => (
          <option key={option.value || option.id} value={option.value || option.id}>
            {option.label || option.name}
          </option>
        ))}
      </select>
      {description && <span className="mt-2 block text-sm text-slate-500">{description}</span>}
    </label>
  );
}

function LineItem({ label, amount, note }) {
  const isCredit = amount < 0;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <div>
        <div className="font-medium text-slate-900">{label}</div>
        {note && <div className="mt-1 text-sm text-slate-500">{note}</div>}
      </div>
      <div
        className={`whitespace-nowrap font-semibold ${
          isCredit ? "text-emerald-700" : "text-slate-900"
        }`}
      >
        {formatCurrency(amount)}
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="rounded-2xl bg-[#ECF8FB] p-2 text-[#427CBF]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
}

export default function CTCloudSGSUpgradeCalculator() {
  const [currentFamily, setCurrentFamily] = useState("core");
  const [currentMode, setCurrentMode] = useState("bundle");
  const [currentTerm, setCurrentTerm] = useState("12month");
  const [currentBundleId, setCurrentBundleId] = useState("core-12-a-single");
  const [selectedBundleAddOns, setSelectedBundleAddOns] = useState<any>({});
  const [alaCarteSelections, setAlaCarteSelections] = useState<any>({});
  const [clearinghouse, setClearinghouse] = useState("none");
  const [providerCount, setProviderCount] = useState(1);
  const [otherCurrentMonthly, setOtherCurrentMonthly] = useState(0);

  const [usage, setUsage] = useState({
    engageTextsSent: 2000,
    remindTextsSent: 500,
    verifyInquiries: 150,
    claimVolume: 100,
    eraVolume: 200,
  });

  const [selectedSgsBundle, setSelectedSgsBundle] = useState("grow");
  const [ctPay, setCtPay] = useState(true);
  const [sgsTerm, setSgsTerm] = useState("12month");
  const [targetBillingSuite, setTargetBillingSuite] = useState(false);
  const [targetClaims, setTargetClaims] = useState("none");
  const [targetSmartFit, setTargetSmartFit] = useState(false);
  const [applyPromotions, setApplyPromotions] = useState(true);

  const providers = Math.max(1, asNumber(providerCount, 1));
  const familyCatalog = currentCatalog[currentFamily];
  const bundleOptions = familyCatalog.bundles[currentTerm];
  const selectedBundle =
    bundleOptions.find((bundle) => bundle.id === currentBundleId) || bundleOptions[0];

  const bundleAddOns = selectedBundle?.addOns || {};
  const selectedSgsPlan = sgsBundles[selectedSgsBundle];

  const handleFamilyChange = (family) => {
    const nextOptions = currentCatalog[family].bundles[currentTerm];

    setCurrentFamily(family);
    setCurrentBundleId(nextOptions[0].id);
    setSelectedBundleAddOns({});
    setAlaCarteSelections({});
    setClearinghouse("none");
  };

  const handleCurrentTermChange = (term) => {
    const nextOptions = familyCatalog.bundles[term];

    setCurrentTerm(term);
    setCurrentBundleId(nextOptions[0].id);
    setSelectedBundleAddOns({});
  };

  const handleBundleChange = (bundleId) => {
    setCurrentBundleId(bundleId);
    setSelectedBundleAddOns({});
  };

  const isBundleAddOnSelected = (key, addOn) => {
    return bundleAddOnSelections[key] ?? Boolean(addOn.defaultSelected);
  };

  const toggleBundleAddOn = (key, addOn) => {
    setSelectedBundleAddOns((previous) => ({
      ...previous,
      [key]: !(previous[key] ?? Boolean(addOn.defaultSelected)),
    }));
  };

  const toggleAlaCarte = (key) => {
    setAlaCarteSelections((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const currentHasEngage =
    currentMode === "bundle"
      ? Boolean(selectedBundleAddOns.engage && isBundleAddOnSelected("engage", selectedBundleAddOns.engage))
      : Boolean(alaCarteSelections.engage);

  const currentHasRemind =
    currentMode === "bundle"
      ? Boolean(selectedBundleAddOns.remind && isBundleAddOnSelected("remind", selectedBundleAddOns.remind))
      : Boolean(alaCarteSelections.remind);

  const currentHasVerify =
    currentMode === "bundle"
      ? Boolean(selectedBundleAddOns.verify && isBundleAddOnSelected("verify", selectedBundleAddOns.verify))
      : Boolean(alaCarteSelections.verify);

  const showPerClaimUsage =
    currentMode === "alaCarte" &&
    currentFamily === "advanced" &&
    (clearinghouse === "proclearPerClaim" || clearinghouse === "maxClearDefault");

  const showUsageSection =
    currentHasEngage || currentHasRemind || currentHasVerify || showPerClaimUsage;

  const currentBreakdown = useMemo(() => {
    const items = [];

    if (currentMode === "bundle" && selectedBundle) {
      const providerTotal = getProviderTotal(providers, selectedBundle.providerTiers);

      items.push({
        label: `${familyCatalog.label} ${termOptions[currentTerm].label} ${selectedBundle.name}`,
        amount: selectedBundle.basePrice,
        note: `${selectedBundle.baseLabel} base bundle rate.`,
      });

      if (providerTotal > 0) {
        items.push({
          label: "Additional providers",
          amount: providerTotal,
          note: getProviderNote(providers, selectedBundle.providerTiers),
        });
      }

      Object.entries(selectedBundleAddOns).forEach(([key, addOn]) => {
        if (!isBundleAddOnSelected(key, addOn)) return;

        items.push({
          label: addOn.label,
          amount: getBundleAddOnAmount(addOn, providers),
          note:
            addOn.kind === "perProvider"
              ? `${formatCurrency(addOn.monthly)}/provider/month. Multi-provider bundles may include a 2-provider minimum.`
              : addOn.defaultSelected
                ? "Selected as part of this current bundle setup."
                : "Optional add-on selected for this current bundle setup.",
        });
      });
    }

    if (currentMode === "alaCarte") {
      const providerTotal = getProviderTotal(providers, familyCatalog.alaCarte.providerTiers);

      items.push({
        label: familyCatalog.alaCarte.baseLabel,
        amount: familyCatalog.alaCarte.basePrice,
        note: "Current à la carte software price.",
      });

      if (providerTotal > 0) {
        items.push({
          label: "Additional providers",
          amount: providerTotal,
          note: getProviderNote(providers, familyCatalog.alaCarte.providerTiers),
        });
      }

      Object.entries(familyCatalog.alaCarte.addOns).forEach(([key, addOn]) => {
        if (!alaCarteSelections[key]) return;

        items.push({
          label: addOn.label,
          amount: addOn.monthly,
          note: addOn.note,
        });
      });

      if (currentFamily === "advanced" && clearinghouse !== "none") {
        if (clearinghouse === "proclearUnlimited") {
          items.push({
            label: "ProClear Unlimited",
            amount: providers * 119.95,
            note: "$119.95/provider/month.",
          });
        }

        if (clearinghouse === "maxClearUnlimited") {
          items.push({
            label: "MaxClear Unlimited",
            amount: providers * 119,
            note: "$119/provider/month.",
          });
        }

        if (clearinghouse === "proclearPerClaim") {
          const claims = Math.max(0, asNumber(usage.claimVolume, 100));
          const eras = Math.max(0, asNumber(usage.eraVolume, 200));
          const claimOverage = Math.max(0, claims - 100) * 0.39;
          const eraOverage = Math.max(0, eras - 200) * 0.12;

          items.push({
            label: "ProClear Per Claim",
            amount: 39 + 25 + claimOverage + eraOverage,
            note: "$39 for 100 claims, $25 for 200 ERAs, plus overages.",
          });
        }

        if (clearinghouse === "maxClearDefault") {
          const claims = Math.max(0, asNumber(usage.claimVolume, 100));
          const includedClaims = providers * 50;
          const billableClaims = Math.max(0, claims - includedClaims);
          const blocks = billableClaims === 0 ? 0 : Math.ceil(billableClaims / 100);

          items.push({
            label: "MaxClear Default / Per Claim",
            amount: blocks * 39.95,
            note:
              blocks === 0
                ? `${includedClaims} claims included across ${providers} provider${providers === 1 ? "" : "s"}.`
                : `${includedClaims} claims included. ${blocks} billable block${blocks === 1 ? "" : "s"} at $39.95.`,
          });
        }
      }
    }

    if (currentHasEngage) {
      const engageOverage = getTextOverage(
        usage.engageTextsSent,
        usageRates.engageIncludedTexts,
        usageRates.engageOverageBlockSize,
        usageRates.engageOverageRate
      );

      if (engageOverage.overageCost > 0) {
        items.push({
          label: "CT Engage text overage",
          amount: engageOverage.overageCost,
          note: `${engageOverage.totalTexts.toLocaleString()} texts sent - ${usageRates.engageIncludedTexts.toLocaleString()} included = ${engageOverage.overageTexts.toLocaleString()} overage texts. ${engageOverage.overageBlocks} overage block${
            engageOverage.overageBlocks === 1 ? "" : "s"
          } × ${formatCurrency(usageRates.engageOverageRate)}.`,
        });
      }
    }

    if (currentHasRemind) {
      const remindOverage = getTextOverage(
        usage.remindTextsSent,
        usageRates.remindIncludedTexts,
        usageRates.remindOverageBlockSize,
        usageRates.remindOverageRate
      );

      if (remindOverage.overageCost > 0) {
        items.push({
          label: "CT Remind text overage",
          amount: remindOverage.overageCost,
          note: `${remindOverage.totalTexts.toLocaleString()} texts sent - ${usageRates.remindIncludedTexts.toLocaleString()} included = ${remindOverage.overageTexts.toLocaleString()} overage texts. ${remindOverage.overageBlocks} overage block${
            remindOverage.overageBlocks === 1 ? "" : "s"
          } × ${formatCurrency(usageRates.remindOverageRate)}.`,
        });
      }
    }

    if (currentHasVerify) {
      const inquiries = Math.max(0, asNumber(usage.verifyInquiries, 150));
      const overage = Math.max(0, inquiries - usageRates.verifyIncluded) * usageRates.verifyOverage;

      if (overage > 0) {
        items.push({
          label: "CT Verify overage",
          amount: overage,
          note: `${inquiries - usageRates.verifyIncluded} inquiries over the included ${usageRates.verifyIncluded}.`,
        });
      }
    }

    if (asNumber(otherCurrentMonthly) > 0) {
      items.push({
        label: "Other current monthly charges",
        amount: asNumber(otherCurrentMonthly),
        note: "Use for legacy, negotiated, or account-specific recurring charges.",
      });
    }

    return items;
  }, [
    currentMode,
    selectedBundle,
    providers,
    familyCatalog,
    currentTerm,
    selectedBundleAddOns,
    bundleAddOnSelections,
    alaCarteSelections,
    currentFamily,
    clearinghouse,
    usage,
    currentHasEngage,
    currentHasRemind,
    currentHasVerify,
    otherCurrentMonthly,
  ]);

  const currentMonthlyTotal = sumItems(currentBreakdown);

  const targetEffectiveBillingSuite = targetBillingSuite || targetClaims !== "none";
  const smartFitIncluded = selectedSgsBundle === "scale";
  const smartFitEligible = selectedSgsBundle === "grow";
  const effectiveTargetSmartFit = smartFitEligible && targetSmartFit;

  const targetBreakdown = useMemo(() => {
    const items = [];
    const basePrice = ctPay ? selectedSgsPlan.priceWithPay : selectedSgsPlan.priceWithoutPay;
    const additionalProviders = Math.max(0, providers - 1);

    items.push({
      label: `SGS ${selectedSgsPlan.name}`,
      amount: basePrice,
      note: ctPay ? "With integrated payments / CT Pay." : "Without integrated payments / CT Pay.",
    });

    if (additionalProviders > 0) {
      items.push({
        label: "Additional providers",
        amount: additionalProviders * selectedSgsPlan.additionalProvider,
        note: `${formatCurrency(selectedSgsPlan.additionalProvider)}/month per additional provider.`,
      });
    }

    if (targetEffectiveBillingSuite) {
      items.push({
        label: "CT Billing Suite",
        amount: 145,
        note: targetClaims !== "none" ? "Required for claims." : "Added for billing visibility and workflows.",
      });
    }

    if (targetClaims === "standard") {
      items.push({
        label: "Standard Claims",
        amount: providers * 49,
        note: "$49/provider/month. Up to 100 claims/month.",
      });
    }

    if (targetClaims === "unlimited") {
      items.push({
        label: "Unlimited Claims",
        amount: providers * 99,
        note: "$99/provider/month. Unlimited claims.",
      });
    }

    if (effectiveTargetSmartFit) {
      items.push({
        label: "CT SmartFit",
        amount: 49 + Math.max(0, providers - 1) * 19,
        note: "$49/month first provider + $19/month each additional provider.",
      });
    }

    if (smartFitIncluded) {
      items.push({
        label: "CT SmartFit",
        amount: 0,
        note: "Included in SGS Scale.",
      });
    }

    return items;
  }, [
    ctPay,
    selectedSgsPlan,
    providers,
    targetEffectiveBillingSuite,
    targetClaims,
    effectiveTargetSmartFit,
    smartFitIncluded,
  ]);

  const targetMonthlyTotal = sumItems(targetBreakdown);
  const monthlyDifference = targetMonthlyTotal - currentMonthlyTotal;
  const annualizedDifference = monthlyDifference * 12;

  const hasInsuranceModule = targetEffectiveBillingSuite && targetClaims !== "none";
  const promoFreeMonths = getSgsPromotionalFreeMonths({
    selectedBundle: selectedSgsBundle,
    hasInsuranceModule,
  });

  const showPromotions = sgsTerm === "12month";
  const promotionalSavings = showPromotions && applyPromotions ? targetMonthlyTotal * promoFreeMonths : 0;
  const selectedSgsTerm = sgsTermOptions[sgsTerm];
  const termImpact =
    targetMonthlyTotal * selectedSgsTerm.months -
    currentMonthlyTotal * selectedSgsTerm.months -
    (selectedSgsTerm.months === 12 ? promotionalSavings : 0);

  const firstYearTargetTotal = targetMonthlyTotal * 12 - promotionalSavings;
  const firstYearCurrentTotal = currentMonthlyTotal * 12;
  const firstYearImpact = firstYearTargetTotal - firstYearCurrentTotal;

  const monthlyCtPaySavings = ctPay
    ? selectedSgsPlan.priceWithoutPay - selectedSgsPlan.priceWithPay
    : 0;

  const deltaLabel =
    monthlyDifference > 0
      ? "Monthly increase"
      : monthlyDifference < 0
        ? "Monthly decrease"
        : "No monthly change";

  const deltaTone =
    monthlyDifference > 0
      ? "bg-amber-50 text-amber-800 ring-amber-200"
      : monthlyDifference < 0
        ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
        : "bg-slate-50 text-slate-700 ring-slate-200";

  const engageExample = getTextOverage(
    4000,
    usageRates.engageIncludedTexts,
    usageRates.engageOverageBlockSize,
    usageRates.engageOverageRate
  );

  const handleSgsBundleSelect = (bundleKey) => {
    setSelectedSgsBundle(bundleKey);
    if (bundleKey !== "grow") setTargetSmartFit(false);
  };

  const handleTargetClaimsChange = (value) => {
    setTargetClaims(value);
    if (value !== "none") setTargetBillingSuite(true);
  };

  const handleSgsTermChange = (value) => {
    setSgsTerm(value);
    if (value !== "12month") setApplyPromotions(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#073244] to-[#427CBF] p-6 text-white shadow-xl sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-[#ECF8FB]">
                <Calculator className="h-4 w-4" /> SGS upgrade calculator
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Compare Core or Advanced to SGS
              </h1>
              <p className="mt-4 max-w-3xl text-base text-[#ECF8FB] sm:text-lg">
                Choose the customer’s current Core or Advanced pricing, then compare it to the SGS bundle they are
                upgrading to.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div className="text-sm text-[#ECF8FB]">{deltaLabel}</div>
              <div className="mt-1 text-4xl font-bold">{formatCurrency(monthlyDifference)}</div>
              <div className="mt-1 text-sm text-[#ECF8FB]">Target minus current monthly price</div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <SectionHeader
                icon={ClipboardList}
                title="Current customer setup"
                description="Select the customer’s current product family and whether they are priced à la carte or in a bundle."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="mb-2 block font-semibold text-slate-900">Current product family</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ["core", "Core"],
                      ["advanced", "Advanced"],
                    ].map(([value, label]) => {
                      const active = currentFamily === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleFamilyChange(value)}
                          className={`rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                            active
                              ? "border-[#427CBF] bg-[#ECF8FB] text-[#073244]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="mb-2 block font-semibold text-slate-900">Current pricing setup</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ["bundle", "Bundle"],
                      ["alaCarte", "À la carte"],
                    ].map(([value, label]) => {
                      const active = currentMode === value;

                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setCurrentMode(value)}
                          className={`rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                            active
                              ? "border-[#427CBF] bg-[#ECF8FB] text-[#073244]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <NumberField
                  label="Number of providers"
                  value={providerCount}
                  onChange={setProviderCount}
                  min={1}
                  step={1}
                  description="Used for both the current-state calculation and the target SGS quote."
                />

                <NumberField
                  label="Other current monthly charges"
                  value={otherCurrentMonthly}
                  onChange={setOtherCurrentMonthly}
                  min={0}
                  step={0.01}
                  prefix="$"
                  description="Use for negotiated, legacy, or account-specific recurring charges."
                />
              </div>
            </section>

            {currentMode === "bundle" && (
              <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <SectionHeader
                  icon={Layers}
                  title="Current bundle"
                  description="Choose the customer’s current term and bundle. Included bundle items are selected by default and can be adjusted."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <SelectField
                    label="Current bundle term"
                    value={currentTerm}
                    onChange={handleCurrentTermChange}
                    options={Object.entries(termOptions).map(([value, term]) => ({
                      value,
                      label: term.label,
                    }))}
                  />

                  <SelectField
                    label="Current bundle"
                    value={selectedBundle?.id}
                    onChange={handleBundleChange}
                    options={bundleOptions}
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="mb-3 flex items-center gap-2">
                    <PackageCheck className="h-5 w-5 text-[#427CBF]" />
                    <h3 className="font-bold text-slate-900">Products in current bundle pricing</h3>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {Object.entries(selectedBundleAddOns).map(([key, addOn]) => {
                      const selected = isBundleAddOnSelected(key, addOn);

                      return (
                        <Toggle
                          key={key}
                          enabled={selected}
                          onChange={() => toggleBundleAddOn(key, addOn)}
                          label={addOn.label}
                          badge={addOn.defaultSelected ? "Default" : undefined}
                          description={
                            addOn.kind === "perProvider"
                              ? `${formatCurrency(addOn.monthly)}/provider/month`
                              : `${formatCurrency(addOn.monthly)}/month`
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {currentMode === "alaCarte" && (
              <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <SectionHeader
                  icon={PackageCheck}
                  title="Current à la carte products"
                  description="Select the standalone products the customer currently has."
                />

                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries(familyCatalog.alaCarte.addOns).map(([key, addOn]) => (
                    <Toggle
                      key={key}
                      enabled={Boolean(alaCarteSelections[key])}
                      onChange={() => toggleAlaCarte(key)}
                      label={addOn.label}
                      description={`${formatCurrency(addOn.monthly)}/month`}
                    />
                  ))}
                </div>

                {currentFamily === "advanced" && (
                  <div className="mt-5">
                    <span className="mb-2 block font-semibold text-slate-900">
                      Current clearinghouse
                    </span>
                    <div className="grid gap-2">
                      {Object.entries(advancedClearinghouseOptions).map(([key, option]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setClearinghouse(key)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            clearinghouse === key
                              ? "border-[#427CBF] bg-[#ECF8FB] text-[#073244]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="font-semibold">{option.label}</div>
                          <div className="mt-1 text-sm opacity-80">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {showUsageSection && (
              <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <SectionHeader
                  icon={FileText}
                  title="Current usage and overages"
                  description="Enter total monthly usage. The calculator subtracts the included amount before calculating overage blocks."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  {currentHasEngage && (
                    <NumberField
                      label="Monthly CT Engage texts sent"
                      value={usage.engageTextsSent}
                      onChange={(value) =>
                        setUsage((previous) => ({ ...previous, engageTextsSent: value }))
                      }
                      min={0}
                      step={1}
                      description="2,000 texts included. $9.95 per additional 1,000 texts, rounded up by block."
                    />
                  )}

                  {currentHasRemind && (
                    <NumberField
                      label="Monthly CT Remind texts sent"
                      value={usage.remindTextsSent}
                      onChange={(value) =>
                        setUsage((previous) => ({ ...previous, remindTextsSent: value }))
                      }
                      min={0}
                      step={1}
                      description="500 texts included. $9.95 per additional 500 texts, rounded up by block."
                    />
                  )}

                  {currentHasVerify && (
                    <NumberField
                      label="Monthly CT Verify inquiries"
                      value={usage.verifyInquiries}
                      onChange={(value) =>
                        setUsage((previous) => ({ ...previous, verifyInquiries: value }))
                      }
                      min={0}
                      step={1}
                      description="150 inquiries included. $0.20 per inquiry after 150."
                    />
                  )}

                  {showPerClaimUsage && (
                    <NumberField
                      label="Monthly claim volume"
                      value={usage.claimVolume}
                      onChange={(value) => setUsage((previous) => ({ ...previous, claimVolume: value }))}
                      min={0}
                      step={1}
                    />
                  )}

                  {clearinghouse === "proclearPerClaim" && currentMode === "alaCarte" && currentFamily === "advanced" && (
                    <NumberField
                      label="Monthly ERA volume"
                      value={usage.eraVolume}
                      onChange={(value) => setUsage((previous) => ({ ...previous, eraVolume: value }))}
                      min={0}
                      step={1}
                      description="200 ERAs included. $0.12 per ERA after 200."
                    />
                  )}
                </div>

                {currentHasEngage && (
                  <div className="mt-5 rounded-2xl bg-[#ECF8FB] p-4 text-sm text-[#073244] ring-1 ring-[#D0EDF5]">
                    <div className="font-bold">CT Engage overage example</div>
                    <div className="mt-1">
                      4,000 texts sent - 2,000 included = 2,000 overage texts. That equals{" "}
                      {engageExample.overageBlocks} overage blocks × {formatCurrency(usageRates.engageOverageRate)} ={" "}
                      <span className="font-bold">{formatCurrency(engageExample.overageCost)}</span>.
                    </div>
                  </div>
                )}
              </section>
            )}

            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <SectionHeader
                icon={Sparkles}
                title="Target SGS bundle"
                description="Choose the SGS bundle the customer is upgrading to."
              />

              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(sgsBundles).map(([key, option]) => {
                  const active = selectedSgsBundle === key;
                  const displayPrice = ctPay ? option.priceWithPay : option.priceWithoutPay;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSgsBundleSelect(key)}
                      className={`relative rounded-3xl border p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md ${
                        active ? "border-[#427CBF] bg-[#ECF8FB] shadow-md" : "border-slate-200 bg-white"
                      }`}
                    >
                      {option.badge && (
                        <div className="absolute -top-3 left-5 rounded-full bg-[#427CBF] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          {option.badge}
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-bold">{option.name}</h3>
                          <p className="mt-1 font-semibold text-slate-600">{option.tagline}</p>
                        </div>
                        {active && (
                          <span className="rounded-full bg-[#427CBF] p-1 text-white">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div className="mt-5 text-3xl font-bold">
                        {formatCurrency(displayPrice)}
                        <span className="text-base font-medium text-slate-500">/mo</span>
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        +{formatCurrency(option.additionalProvider)}/mo per additional provider
                      </div>
                      <p className="mt-4 text-sm text-slate-600">{option.guidance}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <SectionHeader
                  icon={CreditCard}
                  title="SGS billing details"
                  description="Set CT Pay, term, billing, and claims assumptions for the target quote."
                />

                <div className="space-y-4">
                  <Toggle
                    enabled={ctPay}
                    onChange={setCtPay}
                    label="Integrated payments / CT Pay"
                    description="Toggle to compare SGS pricing with or without CT Pay."
                  />

                  <div>
                    <span className="mb-2 block font-semibold text-slate-900">SGS agreement term</span>
                    <div className="grid gap-2">
                      {Object.entries(sgsTermOptions).map(([value, term]) => {
                        const active = sgsTerm === value;

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => handleSgsTermChange(value)}
                            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
                              active
                                ? "border-[#427CBF] bg-[#ECF8FB] text-[#073244]"
                                : "border-slate-200 bg-slate-50 hover:border-slate-300"
                            }`}
                          >
                            <div className="font-semibold">{term.label}</div>
                            <div className="mt-1 text-sm opacity-80">
                              {term.months === 12
                                ? "Shows first-year impact and eligible promotional savings."
                                : `Shows ${term.months}-month price impact.`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Toggle
                    enabled={targetEffectiveBillingSuite}
                    onChange={setTargetBillingSuite}
                    label="CT Billing Suite"
                    description="+$145/month for billing visibility, AR follow-up, and workflows."
                  />
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <SectionHeader
                  icon={FileText}
                  title="SGS claims and SmartFit"
                  description="Add target claims or SmartFit options when they apply."
                />

                <div className="space-y-4">
                  <div>
                    <span className="mb-2 block font-semibold text-slate-900">Target claims option</span>
                    <div className="grid gap-2">
                      {[
                        ["none", "No claims"],
                        ["standard", "Standard Claims · +$49/provider/month"],
                        ["unlimited", "Unlimited Claims · +$99/provider/month"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleTargetClaimsChange(value)}
                          className={`rounded-2xl border px-4 py-3 text-left font-medium transition ${
                            targetClaims === value
                              ? "border-[#427CBF] bg-[#ECF8FB] text-[#073244]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    {targetClaims !== "none" && (
                      <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">
                        Claims require CT Billing Suite, so it has been added automatically.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <h3 className="font-bold text-slate-900">SmartFit</h3>
                    {selectedSgsBundle === "start" && (
                      <p className="mt-2 text-sm text-slate-600">
                        SmartFit is positioned for Grow and included in Scale.
                      </p>
                    )}
                    {selectedSgsBundle === "grow" && (
                      <div className="mt-3">
                        <Toggle
                          enabled={targetSmartFit}
                          onChange={setTargetSmartFit}
                          label="Add CT SmartFit"
                          description="+$49/month first provider + $19/month each additional provider."
                        />
                      </div>
                    )}
                    {selectedSgsBundle === "scale" && (
                      <p className="mt-2 rounded-2xl bg-[#ECF8FB] p-4 text-sm font-medium text-[#073244]">
                        CT SmartFit is included in SGS Scale at no additional cost.
                      </p>
                    )}
                  </div>

                  {showPromotions && promoFreeMonths > 0 && (
                    <Toggle
                      enabled={applyPromotions}
                      onChange={setApplyPromotions}
                      label="Apply SGS promotional savings"
                      description={`${promoFreeMonths} free month${
                        promoFreeMonths === 1 ? "" : "s"
                      } applied to first-year impact.`}
                    />
                  )}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="sticky top-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
              <div className={`mb-5 rounded-3xl p-5 ring-1 ${deltaTone}`}>
                <div className="text-sm font-semibold uppercase tracking-wide">{deltaLabel}</div>
                <div className="mt-1 text-5xl font-bold">{formatCurrency(monthlyDifference)}</div>
                <div className="mt-2 text-sm">
                  {formatCurrency(targetMonthlyTotal)} SGS monthly minus {formatCurrency(currentMonthlyTotal)} current
                  monthly.
                </div>
              </div>

              <div className="mb-5 grid gap-3">
                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  <div className="text-sm text-slate-300">Current monthly total</div>
                  <div className="mt-1 text-3xl font-bold">{formatCurrency(currentMonthlyTotal)}</div>
                </div>

                <div className="rounded-2xl bg-[#073244] p-4 text-white">
                  <div className="text-sm text-[#ECF8FB]">Target SGS monthly total</div>
                  <div className="mt-1 text-3xl font-bold">{formatCurrency(targetMonthlyTotal)}</div>
                </div>

                <div className="rounded-2xl bg-[#ECF8FB] p-4 ring-1 ring-[#D0EDF5]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-[#427CBF]">
                        {selectedSgsTerm.label} impact
                      </div>
                      <div className="mt-1 text-sm text-[#073244]">
                        Target total minus current total for the selected SGS term.
                      </div>
                    </div>
                    <div className="text-right text-3xl font-bold text-[#073244]">
                      {formatCurrency(termImpact)}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Annualized difference
                      </div>
                      <div className="mt-1 text-sm text-slate-500">Monthly difference × 12.</div>
                    </div>
                    <div className="text-right text-2xl font-bold text-slate-900">
                      {formatCurrency(annualizedDifference)}
                    </div>
                  </div>
                </div>

                {showPromotions && applyPromotions && promotionalSavings > 0 && (
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          Promotional savings
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {promoFreeMonths} free month{promoFreeMonths === 1 ? "" : "s"} applied.
                        </div>
                      </div>
                      <div className="text-right text-2xl font-bold text-emerald-700">
                        -{formatCurrency(promotionalSavings)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-2xl bg-[#C7E5D0] p-4 text-[#073244]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide">First-year impact</div>
                      <div className="mt-1 text-sm">Includes selected SGS promotional savings.</div>
                    </div>
                    <div className="text-right text-3xl font-bold">{formatCurrency(firstYearImpact)}</div>
                  </div>
                </div>

                {ctPay && monthlyCtPaySavings > 0 && (
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          CT Pay savings
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          Compared to SGS pricing without CT Pay.
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#427CBF]">
                          {formatCurrency(monthlyCtPaySavings)}
                        </div>
                        <div className="text-xs text-slate-500">per month</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#427CBF]" />
                  <h3 className="font-bold text-slate-900">Sales positioning notes</h3>
                </div>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>
                    Customer is moving from{" "}
                    <span className="font-semibold text-slate-900">
                      {familyCatalog.label} {currentMode === "bundle" ? selectedBundle?.name : "à la carte"}
                    </span>{" "}
                    to <span className="font-semibold text-slate-900">SGS {selectedSgsPlan.name}</span>.
                  </p>

                  {!ctPay && (
                    <p className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                      Adding CT Pay would lower the selected SGS {selectedSgsPlan.name} bundle by{" "}
                      {formatCurrency(selectedSgsPlan.priceWithoutPay - selectedSgsPlan.priceWithPay)}/month.
                    </p>
                  )}

                  {selectedSgsBundle === "scale" && (
                    <p className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                      SGS Scale includes SmartFit, which can help offset current standalone workflow or care-plan
                      add-ons.
                    </p>
                  )}

                  {targetClaims !== "none" && (
                    <p className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                      Claims require CT Billing Suite, so both are reflected in the target SGS quote.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold">Current breakdown</h2>
                <div className="mt-3 rounded-2xl bg-white">
                  {currentBreakdown.map((item, index) => (
                    <LineItem key={`${item.label}-${index}`} {...item} />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold">Target SGS breakdown</h2>
                <div className="mt-3 rounded-2xl bg-white">
                  {targetBreakdown.map((item, index) => (
                    <LineItem key={`${item.label}-${index}`} {...item} />
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#ECF8FB] p-4">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-[#427CBF]" />
                  <h3 className="font-bold text-[#073244]">Why SGS {selectedSgsPlan.name}</h3>
                </div>
                <p className="mt-2 text-sm text-[#073244]">{selectedSgsPlan.guidance}</p>
                <div className="mt-3 space-y-2">
                  {selectedSgsPlan.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-sm text-[#073244]">
                      <Check className="h-4 w-4" /> {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
                <div className="flex gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    Pricing shown is directional and subject to final approval, customer eligibility, package
                    validation, and executed order form.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
