import HomeIcon from "@mui/icons-material/Home";
import { Event } from "@mui/icons-material";
import { BaseSubDrawerProps } from "../../BaseSubDrawer";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  route: string;
  BaseSubDrawer?: React.ComponentType<BaseSubDrawerProps>;
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    route: "/HomePage",
  },
  {
    label: "Event",
    icon: <Event />,
    route: "/EventPage",
  },
  {
    label: "Job",
    icon: <Event />,
    route: "/JobPage",
  },
  {
    label: "Study Material",
    icon: <Event />,
    route: "/StudyPage",
  },
  {
    label: "Chat",
    icon: <Event />,
    route: "/ChatPage",
  },
  {
    label: "Groups",
    icon: <Event />,
    route: "/GroupPage"
  },
  // Add more items as needed
];
