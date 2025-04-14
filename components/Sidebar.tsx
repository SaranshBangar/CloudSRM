"use client";

import { sidebarNavItems } from "@/constants";
import { getAvatarUrl } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ConfettiButton } from "./ui/confetti-button";

const Sidebar = ({ netid }: { netid: string }) => {
  const pathname = usePathname();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const username = netid.split("@")[0];
        const url = await getAvatarUrl(username);
        setAvatarUrl(url);
      } catch (error) {
        console.error("Error fetching avatar URL:", error);
      }
    };

    fetchAvatarUrl();
  }, [netid]);

  return (
    <aside className="sidebar">
      <Link href="/">
        <div className="text-brand flex items-center gap-2">
          <ConfettiButton
            options={{
              get angle() {
                return Math.random() * 90 + 270;
              },
            }}
            className="shadow-none"
          >
            <Image
              src="/favicon.ico"
              alt="logo"
              width={55}
              height={55}
              className="hidden h-auto lg:block"
            />
            <h1 className="h1 hidden lg:block">CloudSRM</h1>
          </ConfettiButton>
        </div>
        <Image
          src="/favicon.ico"
          alt="logo"
          width={50}
          height={50}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {sidebarNavItems.map(({ url, name, icon }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="sidebar-user-info">
        <Image
          src={avatarUrl}
          alt="avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2">{netid}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
