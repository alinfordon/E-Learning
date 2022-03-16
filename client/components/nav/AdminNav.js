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

const AdminNav = () => {
  const [current, setCurrent] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills mt-4">
      <Link href="/admin">
        <a className={`nav-link ${current === "/admin" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link href="/admin/create-instructor">
        <a className={`nav-link ${current === "/admin/create-instructor" && "active"}`}>
          Create Instructor
        </a>
      </Link>
    </div>
  );
};

export default AdminNav;
