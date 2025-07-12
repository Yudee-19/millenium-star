import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    CheckCircle,
    Circle,
    HelpCircle,
    Timer,
    Bug,
    Lightbulb,
    Zap,
} from "lucide-react";

export const status_options = [
    {
        value: "backlog",
        label: "Backlog",
        icon: HelpCircle,
    },
    {
        value: "todo",
        label: "Todo",
        icon: Circle,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: Timer,
    },
    {
        value: "done",
        label: "Done",
        icon: CheckCircle,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: Circle,
    },
];

export const priority_options = [
    {
        label: "Low",
        value: "low",
        icon: ArrowDown,
    },
    {
        label: "Medium",
        value: "medium",
        icon: ArrowRight,
    },
    {
        label: "High",
        value: "high",
        icon: ArrowUp,
    },
];

export const label_options = [
    {
        value: "bug",
        label: "Bug",
        icon: Bug,
    },
    {
        value: "feature",
        label: "Feature",
        icon: Lightbulb,
    },
    {
        value: "enhancement",
        label: "Enhancement",
        icon: Zap,
    },
];
