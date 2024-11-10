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
                isActive: true,
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
            }
        ],
      }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="bg-primaryColor">
                FinMan
            </SidebarHeader>
            <SidebarContent className='bg-primaryColor'>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                <SidebarGroup key={item.title}>
                    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                    <SidebarMenu>
                        {item.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.isActive}>
                            <a href={item.url}>{item.title}</a>
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
};