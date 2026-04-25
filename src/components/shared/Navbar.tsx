import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import NavbarClient from "./NavbarClient";


export interface NavItem {
    href: string;
    label: string;
    roles: string[];
}


const navItems: NavItem[] = [
    {
        href: "/instructor/dashboard/my-assignments",
        label: "Assignments",
        roles: ["INSTRUCTOR"],
    },
    {
        href: "/student/dashboard",
        label: "My Progress",
        roles: ["STUDENT"],
    },
    {
        href: "/instructor/dashboard/create-assignment",
        label: "Create Assignment",
        roles: ["INSTRUCTOR"],
    },
    {
        href: "/instructor/dashboard",
        label: "Dashboard",
        roles: ["INSTRUCTOR"],
    },
    {
        href: "/instructor/analytics",
        label: "Analytics",
        roles: ["INSTRUCTOR"],
    },
];


const Navbar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;
    const userRole = userInfo?.role || "GUEST";
    const accessToken = (await getCookie("accessToken")) ?? undefined;

    const getName = () => {
        if (!userInfo) return "";
        switch (userInfo.role) {
            case "STUDENT":
                return userInfo.name || userInfo.email?.split("@")[0];
            case "INSTRUCTOR":
                return userInfo.name || userInfo.email?.split("@")[0];
            default:
                return userInfo.email?.split("@")[0] || "";
        }
    };

    const filteredLinks = navItems.filter((item) =>
        item.roles.includes(userRole)
    );

    const userName = getName();

    return (
        <NavbarClient
            userInfo={userInfo}
            userRole={userRole}
            userName={userName}
            accessToken={accessToken}
            filteredLinks={filteredLinks}
        />
    );
};

export default Navbar;
