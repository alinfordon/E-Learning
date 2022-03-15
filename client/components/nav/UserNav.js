import { useState, useEffect } from "react";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopNav from "../TopNav";

export async function getStaticProps({locale}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["Login", "home"])),
    },
  };
}

const UserNav = ({dashboard}) => {
  const [current, setCurrent] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link href="/user">
        <a className={`nav-link ${current === "/user" && "active"}`}>
          {dashboard}
        </a>
      </Link>
    </div>
  );
};

export default UserNav;
