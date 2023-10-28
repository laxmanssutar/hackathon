import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/Header";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  CssBaseline,
  Drawer,
  FormControl,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  ListItemButton,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import { content } from "../Data";

const drawerWidth = 300;

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

// const baseURL = "https://dummyjson.com/users";

export default function ClippedDrawer() {
  // const [data, setData] = React.useState(null);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);
  const [selected, setSelected] = React.useState("");

  //   const fetchInfo = () => {
  //     return axios.get(baseURL).then((res) => setData(res?.data?.users));
  // };

  //   React.useEffect(() => {
  //     fetchInfo();
  //   }, []);

  const functionalArr = content.subfolders.filter(
    (item) => item.name === "Functional"
  );

  // console.log("functionalArr", functionalArr?.[0]?.subfolders);

  const nonFunctionalArr = content.subfolders.filter(
    (item) => item.name === "Non Functional"
  );

  // console.log({ nonFunctionalArr });

  const handleChange = (event) => {
    // if ((event.target.value === "Functional") === setSelected(functionalArr))
    setSelected(event.target.value);
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          //   width: 200,
          //   height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Box sx={{ display: "flex" }} alignItems={"flex-start"}>
      <CssBaseline />
      <Header />

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Select"
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={"Functional"}>Functional</MenuItem>
              <MenuItem value={"Non Functional"}>Non Functional</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          sx={{ my: 7 }}
          variant="contained"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
          aria-label="move selected right"
        >
          Add to list &gt;
        </Button>
        <Box>
          {selected === "Functional"
            ? functionalArr?.[0]?.subfolders?.map((item, index) => {
                return (
                  <List
                    key={index}
                    sx={{
                      width: "100%",
                      maxWidth: 400,
                      bgcolor: "background.paper",
                      boxShadow: "3",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton
                      sx={{ color: "#1976d2", fontWeight: "600" }}
                    >
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                    {item?.files?.length > 0 && (
                      <List component="div" disablePadding>
                        {item?.files?.map((i, index) => {
                          return (
                            <ListItemButton key={index} sx={{ pl: 4, py: 0 }}>
                              <ListItemText primary={i} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    )}
                  </List>
                );
              })
            : selected === "Non Functional"
            ? nonFunctionalArr?.[0]?.subfolders?.map((item, index) => {
                return (
                  <List
                    key={index}
                    sx={{
                      width: "100%",
                      maxWidth: 400,
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                    {item?.files?.length > 0 && (
                      <List component="div" disablePadding>
                        {item?.files?.map((i, index) => {
                          return (
                            <ListItemButton key={index} sx={{ pl: 4, py: 0 }}>
                              <ListItemText primary={i} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    )}
                  </List>
                );
              })
            : "Please select the Functional or Non Functional category"}

          {/* {customList("Choices", left)} */}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Button
          sx={{ my: 0.5 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
          aria-label="move selected left"
        >
          Remove &lt;
        </Button>
        {customList("Chosen", right)}
      </Box>
    </Box>
  );
}
