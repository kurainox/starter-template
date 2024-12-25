"use client";
import { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Icon from "../Icon/Icon.component";
import IconButton from "../IconButton/IconButton.component";

export default function Navbar() {
  const navItems = [
    { icon: "package_2", name: "Products" },
    { icon: "store", name: "Stores" },
    { icon: "collections_bookmark", name: "Collections" },
    { icon: "group", name: "Guests" },
    { icon: "settings", name: "Settings" },
  ];
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className={`${styles["nav-container"]}`}>
      <nav className={styles.navbar}>
        <div className={`${styles["nav-list"]}`}>
          <IconButton
            name="add"
            variant="rounded"
            backgroundColor="var(--md-sys-color-primary)"
            iconColor="var(--md-sys-color-on-primary)"
            splashColor="var(--md-sys-color-on-primary)"
          />
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`${styles["nav-item-wrapper"]} ${
                searchParams.get("nav") === item.name.toLowerCase()
                  ? styles["active"]
                  : ""
              }`}
            >
              <Link
                href={`${pathname}?nav=${item.name.toLowerCase()}`}
                className={`${styles["nav-item"]}`}
              >
                {console.log(searchParams.get("nav"))}
                <Icon
                  name={`${item.icon}`}
                  className={`${styles["nav-icon"]} ${
                    searchParams.get("nav") !== item.name.toLowerCase()
                      ? "material-symbols-outlined"
                      : "material-symbols-rounded"
                  }`}
                />
                <div
                  style={{
                    display: "flex",
                    wordBreak: "break-all",
                    fontSize: "0.75rem",
                  }}
                >
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
