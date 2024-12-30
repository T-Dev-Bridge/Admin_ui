import { styled, Typography } from "@mui/material";
import { Link } from "react-router";
// @ts-ignore
import { pathKeys } from "@/shared/lib/react-router";
import useCustomizerStore from "@/shared/store/useCustomizerStore";
// @ts-ignore
// import { ReactComponent as LogoDark } from "@/assets/images/logos/dark-logo.svg";
// @ts-ignore
import { ReactComponent as LogoDarkRTL } from "@/assets/images/logos/dark-rtl-logo.svg";
// @ts-ignore
import { ReactComponent as LogoLightRTL } from "@/assets/images/logos/light-logo-rtl.svg";
// @ts-ignore
// import { ReactComponent as LogoLight } from "@/assets/images/logos/light-logo.svg";

export function Logo() {
  const customizer = useCustomizerStore();
  const activeDir = useCustomizerStore((state) => state.activeDir);
  // const activeMode = useCustomizerStore((state) => state.activeMode);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    // width: customizer.isCollapse ? "40px" : "180px",
    width: customizer.isCollapse ? "40px" : "auto",
    overflow: "hidden",
    display: "block",
    textAlign: "center",
  }));

  if (activeDir === "ltr") {
    return (
      <LinkStyled
        to={pathKeys.root}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* {activeMode === "dark" ? <LogoLight /> : <LogoDark />} */}
        <div>
          <Typography
            variant="h4"
            textAlign="center"
            color="textSecondary"
            mb={1}
          >
            AI 민원 행정 관리자포털
          </Typography>
        </div>
      </LinkStyled>
    );
  }

  return (
    <LinkStyled
      to={pathKeys.root}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {customizer.activeMode === "dark" ? <LogoDarkRTL /> : <LogoLightRTL />}
    </LinkStyled>
  );
}

export default Logo;
