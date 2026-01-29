'use client';

import { Navbar } from '@augno/ui';
import NavbarContents from './NavbarContents';

export default function HomeNavbar({ hideThemeToggle = false }) {
    return (
        <Navbar className="bg-transparent z-20 relative">
            <NavbarContents hideThemeToggle={hideThemeToggle} />
        </Navbar>
    );
}
