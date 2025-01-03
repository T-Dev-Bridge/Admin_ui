import { Typography, Stack } from "@mui/material";
import { Link } from "react-router";
import * as dropdownData from "../data";

export function QuickLinks() {
  return (
    <>
      <Typography variant="h5">Quick Links</Typography>
      <Stack
        spacing={2}
        mt={2}
      >
        {dropdownData.pageLinks.map((pagelink, index) => (
          <Link
            to={pagelink.href}
            key={index}
            className="hover-text-primary"
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
              className="text-hover"
              fontWeight={600}
            >
              {pagelink.title}
            </Typography>
          </Link>
        ))}
      </Stack>
    </>
  );
}
