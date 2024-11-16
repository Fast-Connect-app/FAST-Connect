import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import EventSubDrawer from './SubDrawer/EventSubDrawer';

export const navItems = [
  {
    label: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    label: 'About',
    path: '/about',
    icon: <InfoIcon />,
    BaseSubDrawer: EventSubDrawer,
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: <PhoneIcon />,
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: <PhoneIcon />,
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: <PhoneIcon />,
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: <PhoneIcon />,
  },
  // Add more items as needed
];
