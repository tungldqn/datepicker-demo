/* eslint-disable no-nested-ternary */
// ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Grid, TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateRangePicker from "@mui/lab/DateRangePicker";

import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import { vi } from "date-fns/locale";

const DatePicker = () => {
  const [openPicker, setOpenPicker] = React.useState<boolean>(false);
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        "& .date_range": {
          display: "inline-flex",
          border: "1px solid #dce0e4",
          borderRadius: "8px",
          alignItems: "center",
          position: "relative",
          height: "48px",
          backgroundColor: "#fff",
          width: "100%",
          paddingLeft: "16px",
        },
        "& input": {
          width: "100px",
          paddingTop: "12px",
          paddingBottom: "12px",
          fontSize: "16px!important",
        },
        "& fieldset": {
          border: "none",
        },
        "& .startDate input": {
          paddingRight: "0",
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
        <DateRangePicker
          calendars={1}
          onClose={() => setOpenPicker(false)}
          open={openPicker}
          value={dateRange}
          // disableCloseOnSelect
          onChange={(newValue) => {
            setDateRange(newValue);
          }}
          showToolbar={false}
          cancelText=""
          okText=""
          disableFuture
          clearable
          renderInput={() => (
            <Box className="date_range" onClick={() => setOpenPicker(true)}>
              <TextField
                className="startDate"
                placeholder="dd/mm/yyyy"
                value={
                  dateRange[0] ? moment(dateRange[0]).format("DD/MM/YYYY") : ""
                }
              />
              <Box
                sx={{
                  color: "#bac3cb",
                  ml: {
                    xs: 0.5,
                    xl: 1,
                  },
                }}
              >
                -
              </Box>
              <TextField
                value={
                  dateRange[1] ? moment(dateRange[1]).format("DD/MM/YYYY") : ""
                }
                placeholder="dd/mm/yyyy"
              />
            </Box>
          )}
        />
      </LocalizationProvider>
    </Grid>
  );
};
export default DatePicker;
