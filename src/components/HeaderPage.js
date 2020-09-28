import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import faasos from "../Images/faasos.svg";
import { useHistory } from "react-router-dom";
//Images import
import food from "../Images/right.jpg";
import left from "../Images/left.jpg";

const useStyles = makeStyles({
  leftside: {
    backgroundImage: `url(${left})`,
    backgroundSize: "cover",
    margin: "0px",
  },
  rightside: {
    width: "500px",
    height: "560px",
  },
  box: {
    margin: "2rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "5rem",
  },
  button: {
    backgroundColor: "rgb(255, 211, 68)",
    padding: "1rem",
    flexBasis: "30%",
  },
  location: {
    backgroundColor: "white",
    flexBasis: "70%",
  },
  fieldbox: {
    display: "flex",
  },
  login: {
    padding: "0.5rem 2rem 0.5rem 2rem",
    color: "rgb(255, 211, 68)",
    borderColor: "rgb(255, 211, 68)",
    marginLeft: "10px",
  },
  signup: {
    padding: "0.5rem 2rem 0.5rem 2rem",
    backgroundColor: "rgb(255, 211, 68)",
  },
  firstbox: {
    display: "flex",
    flexBasis: "70%",
  },
  pageTitle: {
    color: "white",
    fontWeight: "700",
  },
});

const Header = ({ title }) => {
  let history = useHistory();
  const [name, setName] = useState({});
  const [search, setSearch] = useState("");
  const [match, setMatch] = useState(false);
  const [info, setInfo] = useState("");

  const getData = async () => {
    const res = await axios.get("http://localhost:8000/Collection");
    setName(res.data);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const matching = () => {
    for (const n in name) {
      if (n === search) {
        setMatch(true);
        setInfo(n);
        break;
      }
    }

    if (match === true) {
      history.push({
        pathname: "/collection",
        state: { info: info },
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const classess = useStyles();
  return (
    <Grid item container xs={12}>
      <Grid item xs={8} className={classess.leftside}>
        <Box className={classess.box}>
          <Box className={classess.fieldbox}>
            <Box className={classess.firstbox}>
              {" "}
              <img src={faasos} alt="svg" />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                className={classess.signup}
              >
                Signup
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classess.login}
              >
                Login
              </Button>
            </Box>
          </Box>
          <Typography variant="h2" className={classess.pageTitle}>
            {title}
          </Typography>
          <Box className={classess.fieldbox}>
            <TextField
              id="filled-basic"
              variant="filled"
              label="Enter Your Location"
              className={classess.location}
              value={search}
              onChange={updateSearch}
            />

            <Button
              variant="contained"
              color="secondary"
              className={classess.button}
              onClick={matching}
            >
              Find Food
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <img src={food} alt="foodimage" className={classess.rightside} />
      </Grid>
    </Grid>
  );
};

export default Header;
