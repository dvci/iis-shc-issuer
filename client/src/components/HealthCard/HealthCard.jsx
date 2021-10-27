import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import logo from "../../../images/mitre-logo.svg";
import QRCode from "qrcode";

const HealthCard = ({issuer = { title: "IIS SMART Health Card Issuer", logo: logo}, setFileDownload, pdfView = false, callbackPdfView}) => {
  const styles = useStyles();

  const [healthCard, setHealthCard] = useState({
    patient: {
      full_name: "",
      birth_date: "",
    },
    immunizations: [],
    qr_codes: [],
  });
  const [showDateOfBirth, setShowDateOfBirth] = useState(false);
  const [restoreShowDateOfBirth, setRestoreShowDateOfBirth] = useState(null);
  const [dateOfBirthDisplay, setDateOfBirthDisplay] = useState("**/**/****");
  const [qrCodesRendered, setQrCodesRendered] = useState([]);

  useEffect(() => {
    const generateQR = async (text, index) => {
      try {
        return await QRCode.toDataURL(text, {
          type: "svg",
          errorCorrectionLevel: "low",
          version: 22,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetch("health_card", {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      credentials: "include"
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setHealthCard(responseJson);
        setFileDownload(responseJson.shc);

        Promise.all(
          responseJson.qr_codes.map(async (item, i) => {
            return await generateQR(item, i);
          })
        ).then((qrs) => {
          setQrCodesRendered(qrs);
        });
      })
      .catch(console.log());
  }, []);


  useEffect(() => {
    if (pdfView && showDateOfBirth) {
      callbackPdfView();
    }
  }, [dateOfBirthDisplay]);

  useEffect(() => {
    if (pdfView) {
      setRestoreShowDateOfBirth(showDateOfBirth);
      if(showDateOfBirth){
        callbackPdfView();
      }
      setShowDateOfBirth(true);
    } else if (restoreShowDateOfBirth != null){
      setShowDateOfBirth(restoreShowDateOfBirth);
      setRestoreShowDateOfBirth(null);
    }
  }, [pdfView]);

  useEffect(() => {
    if (!showDateOfBirth) {
      setDateOfBirthDisplay("**/**/****");
    } else {
      setDateOfBirthDisplay(healthCard.patient.birth_date);
    }
  }, [showDateOfBirth]);

  const toggleShowDateOfBirth = () => {
    setShowDateOfBirth(!showDateOfBirth);
  };

  return (
    <Box display="flex" className={styles.healthCard}>
      <Card display="flex" className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Box display="flex" flexDirection="row" alignItems="center" className={styles.flexRow}>
            <Box display="flex" alignItems="flex-start" justifyContent="center" className={styles.group4}>
              <div className={styles.overlapGroup}>
                <Box
                  component="img"
                  className={styles.bitmap}
                  src={issuer.logo}
                  alt="Issuer logo"
                />
                <Typography className={styles.title} component="h1">
                  {issuer.title}
                </Typography>
              </div>
            </Box>
            <Box display="flex" alignItems="flex-end" className={styles.group9}>
              <Box display="flex" flexDirection="column" alignItems="flex-start"
                className={styles.flexCol}
              >
                <Typography className={styles.nameLabel}>NAME</Typography>
                <Typography className={styles.name}>
                  {healthCard.patient.full_name}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-start" className={styles.flexCol1}>
                <Typography className={styles.dateOfBirthLabel}>
                  DATE OF BIRTH
                </Typography>
                <Typography className={styles.dateOfBirth}>
                  {dateOfBirthDisplay}
                </Typography>
              </Box>
              <IconButton
                className={styles.eyeOutline}
                aria-label="toggle datofbirth visibility"
                onClick={toggleShowDateOfBirth}
              >
                <VisibilityIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider className={styles.line} variant="middle" />
          <Box display="flex" flexDirection="row" alignItems="flex-start" alignSelf="center"
              className={styles.flexRow1}>
            <Box
              display="flex"
              flexDirection="column"     
              alignItems="flex-start"
              className={styles.flexCol2}
            >
              <Box display="flex" alignItems="flex-start" className={styles.group12}>
                <Typography className={styles.covid19Vaccination}>
                  COVID-19 VACCINATION RECORD
                </Typography>
              </Box>
              <List>
                {healthCard.immunizations.map((item, index) => (
                  <div key={index}>
                    <ListItem>
                      <HealthCardVaccination index={index} {...item} />
                    </ListItem>
                  </div>
                ))}
              </List>
            </Box>
            <div>
              {qrCodesRendered.map((qrCode, index) => (
                <Box display="flex" alignItems="center" justifyContent="flex-end"
                    className={styles.group5} key={index}>
                  <img className={styles.qrCode} src={qrCode} />
                </Box>
              ))}
              <Typography className={styles.issSmartHealthCar} paragraph={true}>
                SMART&reg; Health Card
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

const HealthCardVaccination = ({ vaccine, lot_number, occurrence, vaccinator, index }) => {
  const styles = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" className={styles.group8}>
      <Box display="flex" alignItems="center" alignSelf="flex-end" className={styles.group7}>
        <Typography className={styles.dose}>DOSE {index + 1}</Typography>
        <Divider className={styles.line2} variant="middle" />
      </Box>
      <Grid container>
        <Grid container direction="row" alignItems="flex-start" className={styles.gridRow}>
          <Grid item className={styles.gridLabel}>
            <Typography>Vaccine</Typography>
          </Grid>
          <Grid item className={styles.gridItem}>
            <Typography>
              <Box component="span" fontWeight="700">
                {vaccine}
              </Box>
              {!!lot_number ? " Lot #" + lot_number : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" className={styles.gridRow}>
          <Grid item className={styles.gridLabel}>
            <Typography>Date</Typography>
          </Grid>
          <Grid item className={styles.gridItem}>
            <Typography className={styles.date}>{occurrence}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" className={styles.gridRow}>
          <Grid item className={styles.gridLabel}>
            <Typography>
              Vaccinator
            </Typography>
          </Grid>
          <Grid item className={styles.gridItem}>
            <Typography paragraph={true}>
              {vaccinator}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthCard;
