'use client';

import { Navbar } from '@openmrp/ui';
import NavbarContents from './NavbarContents';

export default function HomeNavbar({ hideThemeToggle = false }) {
    return (
        <Navbar className="bg-transparent z-20 relative">
            <NavbarContents hideThemeToggle={hideThemeToggle} />
        </Navbar>
    );
}
