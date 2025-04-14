"use client";

import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getAvatarUrl, signOutUser } from "@/lib/actions/user.actions";
import { Separator } from "./ui/separator";
import { sidebarNavItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";

const MobileNavigation = ({
  ownerId,
  accountId,
  netid,
}: {
  ownerId: string;
  accountId: string;
  netid: string;
}) => {
  const [open, setOpen] = useState(false);
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
    <header className="mobile-header">
      <Image
        src="/favicon.ico"
        alt="logo"
        width={60}
        height={60}
        className="h-auto"
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatarUrl}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2">{netid}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {sidebarNavItems.map(({ url, name, icon }) => (
                <Link href={url} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
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
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="L=logout"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
