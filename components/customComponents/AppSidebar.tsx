import * as React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation"; // Hook to get the current URL path

const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Admin Menu",
            url: "/dashboard/admin",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard/admin",
                },
                {
                    title: "Users",
                    url: "/dashboard/admin/users",
                },
                {
                    title: "Admins",
                    url: "/dashboard/admin/admins",
                },
                {
                    title: "Occupations",
                    url: "/dashboard/admin/occupations",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname(); // Get the current path

    return (
        <Sidebar {...props}>
            <SidebarHeader className="bg-primaryColor">FinMan</SidebarHeader>
            <SidebarContent className="bg-primaryColor">
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === subItem.url} // Check if the current path matches the item's URL
                                        >
                                            <a href={subItem.url}>{subItem.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
