import { JSX } from "react";
import {
  Grid2,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Theme,
} from "@mui/material";
import { IconCircle } from "@tabler/icons-react";
import { NavLink } from "react-router";
import breadcrumbImg from "@/assets/images/breadcrumb/ChatBc.png";

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title: string;
  children?: JSX.Element;
}

export function Breadcrumb({
  subtitle,
  items,
  title,
  children,
}: BreadCrumbType) {
  return (
    <Grid2
      container
      sx={{
        backgroundColor: "primary.light",
        borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
        p: "30px 25px 20px",
        margin: "0px 15px 30px 15px", // top, right, bottom, left
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid2
        size={{ xs: 12, sm: 6, lg: 8 }}
        mb={1}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography
          color="textSecondary"
          variant="h6"
          fontWeight={400}
          mt={0.8}
          mb={0}
        >
          {subtitle}
        </Typography>
        <Breadcrumbs
          separator={
            <IconCircle
              size="5"
              fill="textSecondary"
              fillOpacity="0.6"
              style={{ margin: "0 5px" }}
            />
          }
          sx={{ alignItems: "center", mt: items ? "10px" : "" }}
          aria-label="breadcrumb"
        >
          {items
            ? items.map((item) => (
                <div key={item.title}>
                  {item.to ? (
                    <Link
                      underline="none"
                      color="inherit"
                      component={NavLink}
                      to={item.to}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <Typography color="textPrimary">{item.title}</Typography>
                  )}
                </div>
              ))
            : ""}
        </Breadcrumbs>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 6, lg: 4 }}
        display="flex"
        alignItems="flex-end"
      >
        <Box
          sx={{
            display: { xs: "none", md: "block", lg: "flex" },
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {children ? (
            <Box sx={{ top: "0px", position: "absolute" }}>{children}</Box>
          ) : (
            <Box sx={{ top: "0px", position: "absolute" }}>
              <img
                src={breadcrumbImg}
                alt={breadcrumbImg}
                width="165px"
              />
            </Box>
          )}
        </Box>
      </Grid2>
    </Grid2>
  );
}
