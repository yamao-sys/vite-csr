import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  const location = useLocation();
  const pathName = useMemo(() => location.pathname, [location]);

  return (
    <>
      {/* TODO: 認証状態により、ヘッダを分ける */}
      {pathName === "/sign_up" && <Link to="/">TOP</Link>}
      {children}
    </>
  );
};
