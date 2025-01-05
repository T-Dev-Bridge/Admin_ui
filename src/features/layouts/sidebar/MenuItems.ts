import { IconUserShield } from "@tabler/icons-react";
import { uniqueId } from "lodash";
import { pathKeys } from "@/shared/lib/react-router";

interface MenuItemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuItemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const MenuItems: MenuItemsType[] = [
  {
    navlabel: true,
    subheader: "운영",
  },
  {
    id: uniqueId(),
    title: "관리자 관리",
    icon: IconUserShield,
    href: pathKeys.admin.manager(),
  },
];

export default MenuItems;
