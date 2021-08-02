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

var QRCode = require("qrcode");

function HealthCard(props) {
  const styles = useStyles();
  const {
    fhirBundle = {},
    issuer = {
      title: "IIS SMART Health Card Issuer",
      logo: logo,
    },
  } = props;

  const [healthCard, setHealthCard] = useState({
    patient: {
      full_name: "",
      birth_date: "",
    },
    immunizations: [],
    qr_codes: [],
  });
  const [showDateOfBirth, setShowDateOfBirth] = useState(false);
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
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/fhir+json",
      },
      body: JSON.stringify(sampleData),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setHealthCard(responseJson);

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

  const handleClickShowDateOfBirth = () => {
    setShowDateOfBirth(!showDateOfBirth);
    if (!showDateOfBirth) {
      setDateOfBirthDisplay("**/**/****");
    } else {
      setDateOfBirthDisplay(healthCard.patient.birth_date);
    }
  };

  return (
    <Box display="flex" className={styles.healthCard}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Box display="flex" flexDirection="row" className={styles.flexRow}>
            <div className={styles.group4}>
              <div className={styles.overlapGroup}>
                <img
                  className={styles.bitmap}
                  src={issuer.logo}
                  alt="Issuer logo"
                />
                <Typography className={styles.title} component="h1">
                  {issuer.title}
                </Typography>
              </div>
            </div>
            <div className={styles.group9}>
              <Box display="flex" flexDirection="column"
                className={styles.flexCol}
              >
                <Typography className={styles.nameLabel}>NAME</Typography>
                <Typography className={styles.name}>
                  {healthCard.patient.full_name}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" className={styles.flexCol1}>
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
                onClick={handleClickShowDateOfBirth}
              >
                <VisibilityIcon />
              </IconButton>
            </div>
          </Box>
          <Divider className={styles.line} variant="middle" />
          <Box display="flex" flexDirection="row" className={styles.flexRow1}>
            <Box
              display="flex"
              flexDirection="column"
              className={styles.flexCol2}
            >
              <div className={styles.group12}>
                <Typography className={styles.covid19Vaccination}>
                  COVID-19 VACCINATION RECORD
                </Typography>
              </div>
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
                <div className={styles.group5} key={index}>
                  <img className={styles.qrCode} src={qrCode} />
                </div>
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
}

function HealthCardVaccination(props) {
  const styles = useStyles();
  const { vaccine, lot_number, occurrence, vaccinator, index } = props;

  return (
    <Box flexDirection="column" className={styles.group8}>
      <Box display="flex" className={styles.group7}>
        <Typography className={styles.dose}>DOSE {index + 1}</Typography>
        <Divider className={styles.line2} variant="middle" />
      </Box>
      <Grid container>
        <Grid container direction="row" className={styles.gridRow}>
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
}

const sampleData = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    {
      fullUrl: "resource:0",
      resource: {
        resourceType: "Patient",
        name: [
          {
            family: "ANYPERSON",
            given: ["JOHN", "B."],
          },
        ],
        birthDate: "1951-01-20",
      },
    },
    {
      fullUrl: "resource:1",
      resource: {
        resourceType: "Immunization",
        meta: {
          security: [
            { system: "https://smarthealth.cards/ial", code: "IAL1.2" },
          ],
        },
        status: "completed",
        vaccineCode: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/cvx",
              code: "207",
            },
          ],
        },
        patient: {
          reference: "resource:0",
        },
        occurrenceDateTime: "2021-01-01",
        performer: [
          {
            actor: {
              display: "ABC General Hospital",
            },
          },
        ],
        lotNumber: "0000001",
      },
    },
    {
      fullUrl: "resource:2",
      resource: {
        resourceType: "Immunization",
        meta: {
          security: [
            { system: "https://smarthealth.cards/ial", code: "IAL1.2" },
          ],
        },
        status: "completed",
        vaccineCode: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/cvx",
              code: "207",
            },
          ],
        },
        patient: {
          reference: "resource:0",
        },
        occurrenceDateTime: "2021-01-29",
        performer: [
          {
            actor: {
              display: "ABC General Hospital",
            },
          },
        ],
        lotNumber: "0000007",
      },
    },
  ],
};

export { sampleData, HealthCard };
export default HealthCard;
