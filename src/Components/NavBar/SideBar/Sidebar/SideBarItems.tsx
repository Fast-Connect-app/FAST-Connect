import HomeIcon from "@mui/icons-material/Home";
import EventSubDrawer from "./SubDrawer/EventSubDrawer";
import { Event } from "@mui/icons-material";
import JobSubDrawer from "./SubDrawer/JobSubDrawe";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  BaseSubDrawer?: React.ComponentType<{
    isOpen: boolean;
    onClose: () => void;
    sidebarWidth: number | string | object;
  }>;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    label: "Event",
    icon: <Event />,
    BaseSubDrawer: EventSubDrawer, // Ensure the component is passed correctly
  },
  {
    label: "Job",
    icon: <Event />,
    BaseSubDrawer: JobSubDrawer, // Ensure the component is passed correctly
  },
  {
    label: "Event",
    icon: <Event />,
    BaseSubDrawer: EventSubDrawer, // Ensure the component is passed correctly
  },
  // Add more items as needed
];
