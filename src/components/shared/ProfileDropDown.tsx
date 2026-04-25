"use client";

import { useState } from "react";
import { User, LogOut, ChevronDown, GraduationCap, BookOpen } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { UserInfo } from "@/types/user.interface";

interface ProfileDropdownProps {
    userInfo: UserInfo;
    mobileView?: boolean;
}

export default function ProfileDropdown({ userInfo, mobileView = false }: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Helper function to get display name
    const getName = (): string => {
        if (userInfo.name) return userInfo.name;
        return userInfo.email?.split('@')[0] || "User";
    };

    // Get role-specific styling and icon
    const getRoleConfig = () => {
        switch (userInfo.role) {
            case "INSTRUCTOR":
                return {
                    icon: <GraduationCap className="h-4 w-4 text-blue-600" />,
                    badgeColor: "bg-blue-100 text-blue-700",
                    label: "Instructor"
                };
            case "STUDENT":
                return {
                    icon: <BookOpen className="h-4 w-4 text-green-600" />,
                    badgeColor: "bg-green-100 text-green-700",
                    label: "Student"
                };
            default:
                return {
                    icon: <User className="h-4 w-4 text-gray-600" />,
                    badgeColor: "bg-gray-100 text-gray-700",
                    label: userInfo.role || "User"
                };
        }
    };

    const name = getName();
    const roleConfig = getRoleConfig();

    if (mobileView) {
        return (
            <div className="flex items-center gap-3 p-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                    <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="font-medium text-sm">{name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                        {roleConfig.icon}
                        <span className="text-xs text-muted-foreground capitalize">
                            {roleConfig.label}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full p-1 hover:bg-accent transition-colors">
                    {/* Avatar */}
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border-2 border-transparent hover:border-primary transition-colors">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    {/* Name (optional, shows on larger screens) */}
                    <span className="hidden md:block text-sm font-medium max-w-25 truncate">
                        {name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {userInfo.email}
                        </p>
                        {/* Role Badge */}
                        <div className="flex items-center gap-1.5 mt-1">
                            {roleConfig.icon}
                            <span className={`text-xs px-2 py-0.5 rounded-full ${roleConfig.badgeColor}`}>
                                {roleConfig.label}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Profile Menu Item (optional) */}
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                        // Navigate to profile page
                        // router.push('/profile');
                    }}
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout Item */}
                <DropdownMenuItem
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
