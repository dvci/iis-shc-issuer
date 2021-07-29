import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import logo from "../../../images/mitre-logo.svg";

var QRCode = require('qrcode')

function HealthCard(props) {
  const styles = useStyles();
  const { fhirBundle } = props;

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
        return await QRCode.toDataURL(text, {type: 'svg', errorCorrectionLevel: 'low', version: 22 });
      } catch (err) {
        console.error(err)
      }
    }

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
        ).then(qrs => {
          setQrCodesRendered(qrs);
        })        
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
    <div className={styles.healthCard}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <div className={styles.flexRow}>
            <div className={styles.group4}>
              <div className={styles.overlapGroup}>
                <img
                  className={styles.bitmap}
                  src={logo}
                  alt="Placeholder Mitre logo"
                />
                <Typography className={styles.title} component="h1">
                  HeathCard
                </Typography>
              </div>
            </div>
            <div className={styles.group9}>
              <div className={styles.flexCol}>
                <Typography className={styles.nameLabel}>NAME</Typography>
                <Typography className={styles.name}>
                  {healthCard.patient.full_name}
                </Typography>
              </div>
              <div className={styles.flexCol1}>
                <Typography className={styles.dateOfBirthLabel}>
                  DATE OF BIRTH
                </Typography>
                <Typography className={styles.dateOfBirth}>
                  {dateOfBirthDisplay}
                </Typography>
              </div>
              <IconButton
                className={styles.eyeOutline}
                aria-label="toggle datofbirth visibility"
                onClick={handleClickShowDateOfBirth}
              >
                <VisibilityIcon />
              </IconButton>
            </div>
          </div>
          <Divider className={styles.line} variant="middle" />
          <div className={styles.flexRow1}>
            <div className={styles.flexCol2}>
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
            </div>
            <div>
              {qrCodesRendered.map((qrCode, index) => (
                <div className={styles.group5} key={index}>
                <img className={styles.qrCode} src={qrCode} />
              </div>
              ))}
              <Typography className={styles.issSmartHealthCar} paragraph={true}>
              IIS SMART Health Card Issuer
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HealthCardVaccination(props) {
  const styles = useStyles();
  const { vaccine, lot_number, occurrence, vaccinator, index } = props;

  return (
    <div className={styles.group8}>
      <div className={styles.group7}>
        <Typography className={styles.dose}>DOSE {index + 1}</Typography>
        <Divider className={styles.line2} variant="middle" />
      </div>
      <div className={styles.flexRow2}>
        <Typography className={styles.vaccineLabel}>Vaccine</Typography>
        <Typography className={styles.vaccine}>
          {vaccine}{!!(lot_number) ? ' Lot #' + lot_number: ''}
        </Typography>
      </div>
      <div className={styles.flexRow3}>
        <Typography className={styles.dateLabel}>Date</Typography>
        <Typography className={styles.date}>{occurrence}</Typography>
      </div>
      <div className={styles.flexRow4}>
        <Typography className={styles.vaccinatorLabel}>Vaccinator</Typography>
        <Typography className={styles.vaccinator} paragraph={true}>
          {vaccinator}
        </Typography>
      </div>
    </div>
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
