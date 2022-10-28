/* eslint-disable no-nested-ternary */
// ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Button,
  FormHelperText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";

import React from "react";
// import { Icon } from "@iconify/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";

interface Props {
  handleDoneFilter?: (rangeDate: any) => void;
  resetPicker?: () => void;
  applyButton?: boolean;
  errors?: {
    [x: string]: any;
  };
  rangeDefaultDate?: DateRange<Date>;
  setRangeDefaultDate?: any;
}
const DatePicker = (props: Props) => {
  const {
    handleDoneFilter,
    resetPicker,
    applyButton,
    errors,
    rangeDefaultDate,
    setRangeDefaultDate,
  } = props;
  const [checkDisable, setCheckDisable] = React.useState<any>(null);
  const [openPicker, setOpenPicker] = React.useState<boolean>(false);
  const [rangeDate, setRangeDate] = React.useState<DateRange<Date>>([
    null,
    null,
  ]);
  const now = new Date(Date.now());
  const [selectedDate, setSelectedDate] = React.useState<any>(
    new Date(now.getFullYear(), now.getMonth() - 1, now.getDay())
  );

  return (
    <>
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
          "& .label_period": {
            position: "absolute",
            fontSize: "12px!important",
            top: "-10px",
            left: "16px",
            padding: "0 3px",
            background: "#fff",
            zIndex: "1",
            transform: "none",
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            calendars={1}
            onClose={() => setOpenPicker(false)}
            open={openPicker}
            startText=""
            endText=""
            value={
              typeof rangeDefaultDate !== "undefined"
                ? rangeDefaultDate
                : rangeDate
            }
            defaultCalendarMonth={selectedDate}
            disableCloseOnSelect={false}
            onChange={(newValue) => {
              setSelectedDate(newValue[0]);
              if (newValue[1] && !newValue[0]) {
                setCheckDisable(newValue[1]);
                setRangeDate([newValue[1], null]);
                setRangeDefaultDate && setRangeDefaultDate([newValue[1], null]);
              } else {
                if (checkDisable) {
                  setRangeDate([checkDisable, newValue[0]]);
                  setRangeDefaultDate &&
                    setRangeDefaultDate([checkDisable, newValue[0]]);
                  !applyButton && handleDoneFilter([checkDisable, newValue[0]]);
                } else {
                  setRangeDate(newValue);
                  setRangeDefaultDate && setRangeDefaultDate(newValue);
                  !applyButton && handleDoneFilter(newValue);
                }
                setCheckDisable(null);
              }
            }}
            disableFuture
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <div className="date_range">
                  <Typography mr={2}>Thời gian</Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <TextField
                    className="startDate"
                    onFocus={() => setOpenPicker(true)}
                    placeholder="dd/mm/yyyy"
                    value={
                      rangeDefaultDate && rangeDefaultDate[0]
                        ? moment(rangeDefaultDate[0]).format("DD/MM/YYYY")
                        : rangeDate[0]
                        ? moment(rangeDate[0]).format("DD/MM/YYYY")
                        : ""
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
                    // {...endProps}
                    value={
                      rangeDefaultDate && rangeDefaultDate[1]
                        ? moment(rangeDefaultDate[1]).format("DD/MM/YYYY")
                        : rangeDate[1]
                        ? moment(rangeDate[1]).format("DD/MM/YYYY")
                        : ""
                    }
                    placeholder="dd/mm/yyyy"
                    onFocus={() => setOpenPicker(true)}
                  />
                </div>
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
      </Grid>
      {!!errors?.rangeDate && (
        <FormHelperText sx={{ color: "#A84600" }}>
          {errors?.rangeDate?.message}
        </FormHelperText>
      )}
    </>
  );
};
export default DatePicker;
