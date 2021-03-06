import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  healthCard: {
    color: theme.palette.primary.main,
  },
  card: {
    backgroundColor: theme.palette.common.blueGreenLight,
    border: "5px solid",
    borderColor: "white",
    borderRadius: "18px",
    boxShadow: "0px 4px 8px #00000080",
    minHeight: "480px",
    padding: "28px 34.5px;",
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  flexRow: {
    marginLeft: "5.5px",
    marginTop: "5px",
    minWidth: "752px",
  },
  group4: {
    minWidth: "191px",
  },
  overlapGroup: {
    height: "88px",
    position: "relative",
    width: "193px",
  },
  bitmap: {
    height: "41px",
    left: "2px",
    position: "absolute",
    top: "0",
    width: "191px",
  },
  title: {
    fontWeight: "300",
    left: "0",
    letterSpacing: "-0.93px",
    position: "relative",
    textAlign: "center",
    top: "33px",
  },
  //.group-9
  group9: {
    height: "55px",
    marginBottom: "9.0px",
    marginLeft: "96px",
    minWidth: "465px",
  },
  //.flex-col
  flexCol: {
    minHeight: "55px",
    width: "212px",
  },
  //.place
  nameLabel: {
    letterSpacing: "0",
    lineHeight: "16px",
    minHeight: "19px",
    whiteSpace: "nowrap",
  },
  //.anypersonjohn-b
  name: {
    fontWeight: "700",
    letterSpacing: "0",
    lineHeight: "24px",
    marginTop: "9px",
    minHeight: "27px",
    whiteSpace: "nowrap",
  },
  //.flex-col-1
  flexCol1: {
    marginLeft: "115px",
    minHeight: "55px",
    width: "106px",
  },
  //.date-of-birth
  dateOfBirthLabel: {
    letterSpacing: "0",
    lineHeight: "16px",
    minHeight: "19px",
    whiteSpace: "nowrap",
  },
  //.text-1
  dateOfBirth: {
    fontWeight: "700",
    letterSpacing: "0",
    lineHeight: "24px",
    marginTop: "9px",
    minHeight: "27px",
    whiteSpace: "nowrap",
  },
  //.eye-outline
  eyeOutline: {
    backgroundSize: "100% 100%",
    height: "15px",
    marginBottom: "9px",
    marginLeft: "10px",
    width: "22px",
  },
  //.line
  line: {
    height: "2px",
    marginTop: "5px",
    width: "767px",
  },
  //.flex-row-1
  flexRow1: {
    marginRight: "2.0px",
    marginTop: "23px",
    minWidth: "765px",
  },
  //.flex-col-2
  flexCol2: {
    marginTop: "10px",
    minHeight: "230px",
    position: "relative",
  },
  //.group-12
  group12: {
    backgroundColor: "white",
    borderRadius: "11.5px",
    height: "23px",
    minWidth: "428px",
    padding: "1px 101px",
  },
  //.covid-19-vaccination
  covid19Vaccination: {
    color: "var(--mako)",
    fontSize: "var(--font-size-l2)",
    fontWeight: "600",
    letterSpacing: "0",
    minHeight: "19px",
    whiteSpace: "nowrap",
  },
  //.group-5
  group5: {
    backgroundColor: "white",
    height: "275px",
    marginLeft: "56px",
    minWidth: "281px",
    padding: "0 18px",
  },
  //.screen-shot-202-20-at-103054-am
  qrCode: {
    height: "243px",
    width: "244px",
  },
  //.iss-smart-health-car
  issSmartHealthCar: {
    alignSelf: "flex-end",
    letterSpacing: "0",
    lineHeight: "16px",
    marginLeft: "56px",
    marginTop: "6px",
    minHeight: "19px",
    minWidth: "195px",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  //.group-8
  group8: {
    marginLeft: "3px",
    minHeight: "79px",
    width: "425px",
  },
  //.group-7
  group7: {
    height: "19px",
    minWidth: "411px",
  },
  //.dose
  dose: {
    color: theme.palette.common.blueGreenDark,
    fontWeight: "800",
    letterSpacing: "0",
    lineHeight: "16px",
    minHeight: "19px",
    minWidth: "52px",
    whiteSpace: "nowrap",
  },
  //.line-2
  line2: {
    backgroundColor: theme.palette.common.blueGreenDark,
    height: "2px",
    marginLeft: "7px",
    width: "352px",
  },
  gridRow: {
    alignItems: "flex-start",
    flexWrap: "nowrap",
    minHeight: "19px",
    marginTop: "1px",
    minWidth: "182px",
  },
  gridLabel: {
    fontStyle: "italic",
    fontWeight: "300",
    letterSpacing: "0",
    lineHeight: "16px",
    minHeight: "19px",
    minWidth: "80px",
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  gridItem: {
    letterSpacing: "0",
    lineHeight: "16px",
    marginLeft: "8px",
    minHeight: "19px",
  },
  date: {
    fontWeight: "700",
  },
}));
