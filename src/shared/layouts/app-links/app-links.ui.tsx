import { Avatar, Box, Typography, Grid2, Stack } from "@mui/material";
import { Link } from "react-router";
import * as dropdownData from "../data";

export function AppLinks() {
  return (
    <Grid2
      container
      spacing={3}
      mb={4}
    >
      {dropdownData.appsLink.map((links, index) => (
        <Grid2
          size={{ lg: 6 }}
          key={index}
        >
          <Link
            to={links.href}
            className="hover-text-primary"
          >
            <Stack
              direction="row"
              spacing={2}
            >
              <Box
                minWidth="45px"
                height="45px"
                bgcolor="grey.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={links.avatar}
                  alt={links.avatar}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 0,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="textPrimary"
                  noWrap
                  className="text-hover"
                  sx={{
                    width: "240px",
                  }}
                >
                  {links.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontSize="12px"
                  sx={{
                    width: "240px",
                  }}
                  noWrap
                >
                  {links.subtext}
                </Typography>
              </Box>
            </Stack>
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
