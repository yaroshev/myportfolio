import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ResponsiveComponent } from '../../../responsive';

// Lazy load the components
const DesktopHeader = React.lazy(() => import('../../../responsive/desktop/layout/header/header'));
const MobileHeader = React.lazy(() => import('../../../responsive/mobile/layout/header/header'));

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  scrollY: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <ResponsiveComponent
      mobileComponent={MobileHeader}
      desktopComponent={DesktopHeader}
      {...props}
    />
  );
};

export default Header;