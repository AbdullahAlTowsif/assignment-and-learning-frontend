export type UserRole = "INSTRUCTOR" | "STUDENT";

export type RouteConfig = {
    exact: string[]
    patterns: RegExp[]
}

export const authRoutes = ["/login", "/register"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "settings", "/change-password"],
    patterns: [],
}

export const instructorProtectedRoutes: RouteConfig = {
    patterns: [/^\/instructor/],
    exact: [],
}

export const userProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [],
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname)
}

// const isAuthRoute = (pathname: string) => {
//   return authRoutes.some((route: string) => {
//     return route === pathname
//     // return route.startsWith(pathname)
//   })
// }

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "INSTRUCTOR" | "STUDENT" | "COMMON" | null => {
    if (isRouteMatches(pathname, instructorProtectedRoutes)) {
        return "INSTRUCTOR"
    }
    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "STUDENT"
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON"
    }
    return null
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "INSTRUCTOR") {
        return "/instructor/dashboard/create-assignment";
    }
    if (role === "STUDENT") {
        return "/";
    }
    return "/"
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }
    if (routeOwner === role) {
        return true;
    }
    return false;
}
