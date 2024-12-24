import {
  BarrierIcon,
  BuildingIcon,
  GivingATMCardIcon,
  PlanetIcon,
  SchoolBusIcon,
  StarterIcon,
  TargetIcon,
  TimeIcon,
  TimeWithBookIcon,
  UndercoverIcon,
} from "@/assests/svg";
import { Activity, ArrowRight, Gem, Link, Loader } from "lucide-react";

export interface HeaderOptionTypes {
  name: string;
  path: string;
}

export interface HeroAnnoucementBarTypes {
  text: string;
  icon: JSX.Element;
  iconSide: "left" | "right";
  showIcon: boolean;
}

export interface HeroPageValuesTypes {
  title: string;
  subTitle: string;
  description: string;
  button1: {
    text: string;
    path: string;
    icon: JSX.Element;
    variant: "brand" | "ghost";
    size: "xs" | "sm" | "lg";
  };
  button2: {
    text: string;
    path: string;
    icon: JSX.Element;
    variant: "brand" | "ghost";
    size: "xs" | "sm" | "lg";
  };
  points: string[];
}

export interface FeaturesValuesTypes {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface PricingPlansTypes {
  icon: JSX.Element;
  name: string;
  description: string;
  price: string;
  totalGB: string;
  isSpecial?: boolean;
  pricePer: string;
  features: string[];
  buttonValues: {
    text: string;
    path: string;
    icon: JSX.Element;
    variant: "brand" | "ghost";
    size: "xs" | "sm" | "lg";
  };
}

export interface PricingValuesTypes {
  mainTitle: string;
  subTitle: string;
  planType: string;
  plans: PricingPlansTypes[];
}

export interface ContactUSValuesTypes {
  title: string;
  icon: JSX.Element;
  name: string;
  description: string;
  buttonValues: {
    text: string;
    path: string;
    icon: JSX.Element;
    variant: "brand" | "ghost" | "default";
    size: "xs" | "sm" | "lg";
  };
}

export const HeaderOptions: HeaderOptionTypes[] = [
  {
    name: "Home",
    path: "/#home",
  },
  {
    name: "About",
    path: "/#features",
  },
  {
    name: "Pricing",
    path: "/#pricing",
  },
  {
    name: "Contact",
    path: "javascript:$crisp.push(['do', 'chat:open']);",
  },
];

export const HeroAnnoucementBar: HeroAnnoucementBarTypes = {
  text: "We are launching soon",
  icon: <Activity size={15} />,
  showIcon: true,
  iconSide: "right",
};

export const HeroPageValues: HeroPageValuesTypes = {
  title: "Introducing",
  subTitle: "Eclise Proxy",
  description: "Unlock the Web, Securely, Access Anywhere, Anytime.",
  button1: {
    text: "Get Started",
    path: "/login",
    icon: <ArrowRight size={15} />,
    variant: "brand",
    size: "sm",
  },
  button2: {
    text: "Our Pricing",
    path: "/#pricing",
    icon: <Gem size={15} />,
    variant: "ghost",
    size: "sm",
  },
  points: ["No Credit Card Required", "Pay As You Go", "7+ Million Proxy Pool"],
};

export const FeaturesValues: FeaturesValuesTypes[] = [
  {
    icon: <BarrierIcon />,
    title: "Highquality IPs",
    description:
      "Web scraping has never been more straightforward. Utilize EclipseProxy's residential proxies to effortlessly bypass captchas for good. Access millions of authentic residential IPs worldwide.",
  },
  {
    icon: <UndercoverIcon />,
    title: "Good Performance",
    description:
      "Clients choose EclipseProxy for its commitment to quality. Enjoy the highest success rate in the market at 99.8%, setting us apart as the top choice for reliable and effective solutions.",
  },
  {
    icon: <TimeIcon />,
    title: "Automatic Instant Delivery",
    description:
      "Register, buy proxies, and our system automatically adds them. Enjoy 24/7 premium support from our in-house scraping experts.",
  },
];

export const PricingValues: PricingValuesTypes = {
  mainTitle: "Our Catalog",
  subTitle: "Simple Pricing Made Easy",
  planType: "Starter Plan",
  plans: [
    {
      icon: <TargetIcon />,
      name: "Residential Proxies",
      description:
        "Scrape any data with real residential proxies to avoid getting blocked.",
      price: "5",
      totalGB: "1 GB",
      pricePer: "5$ per GB",
      features: [
        "Unlimited Threads",
        "Unique IP for each request",
        "Lighting fast speeds",
        "Geo IP Targeting",
        "Data does not expire",
        "Pay as you go",
      ],
      isSpecial: false,
      buttonValues: {
        text: "Get Started",
        path: "/dashboard",
        icon: <ArrowRight size={15} />,
        variant: "brand",
        size: "sm",
      },
    },
    {
      icon: <BuildingIcon />,
      name: "Residential Proxies",
      description:
        "Scrape any data with real residential proxies to avoid getting blocked.",
      price: "20",
      totalGB: "5 GB",
      pricePer: "4$ per GB",
      isSpecial: true,
      features: [
        "Unlimited Threads",
        "Unique IP for each request",
        "Lighting fast speeds",
        "Geo IP Targeting",
        "Data does not expire",
        "Pay as you go",
      ],
      buttonValues: {
        text: "Get Started",
        path: "/dashboard",
        icon: <ArrowRight size={15} />,
        variant: "brand",
        size: "sm",
      },
    },
    {
      icon: <SchoolBusIcon />,
      name: "Residential Proxies",
      description:
        "Scrape any data with real residential proxies to avoid getting blocked.",
      price: "72",
      totalGB: "20 GB",
      pricePer: "3.6$ per GB",
      features: [
        "Unlimited Threads",
        "Unique IP for each request",
        "Lighting fast speeds",
        "Geo IP Targeting",
        "Data does not expire",
        "Pay as you go",
      ],
      buttonValues: {
        text: "Get Started",
        path: "/dashboard",
        icon: <ArrowRight size={15} />,
        variant: "brand",
        size: "sm",
      },
    },
    {
      icon: <PlanetIcon />,
      name: "Residential Proxies",
      description:
        "Scrape any data with real residential proxies to avoid getting blocked.",
      price: "130",
      totalGB: "40 GB",
      pricePer: "3.2$ per GB",
      isSpecial: false,
      features: [
        "Unlimited Threads",
        "Unique IP for each request",
        "Lighting fast speeds",
        "Geo IP Targeting",
        "Data does not expire",
        "Pay as you go",
      ],
      buttonValues: {
        text: "Get Started",
        path: "/dashboard",
        icon: <ArrowRight size={15} />,
        variant: "brand",
        size: "sm",
      },
    },
  ],
};

export const DatacenterPricingValues: ContactUSValuesTypes = {
  title: "Datacenter Plans",
  icon: <TimeWithBookIcon />,
  name: "Intrested in Datacenter Proxies?",
  description: "Eclipse Proxy will bring this very soon!",
  buttonValues: {
    text: "Coming Soon",
    path: "javascript:$crisp.push(['do', 'chat:open']);",
    icon: <Loader size={15} />,
    variant: "default",
    size: "sm",
  },
};

export const ContactUSValues: ContactUSValuesTypes = {
  title: "Custom Plans",
  icon: <GivingATMCardIcon />,
  name: "Custom Made Plan",
  description:
    "EclipseProxy can cater to your specific needs! Terabytes of bandwidth, thousands of threads, or months long plans! We can offer bulk pricing and more, contact us at any time!",
  buttonValues: {
    text: "Contact Us",
    path: "javascript:$crisp.push(['do', 'chat:open']);",
    icon: <Link size={14} />,
    variant: "ghost",
    size: "sm",
  },
};
