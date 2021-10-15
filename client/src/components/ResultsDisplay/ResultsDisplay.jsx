import React, { useState } from "react";
import { Box, Link, Typography } from "@material-ui/core";
import BackButton from '../BackButton/BackButton';
import DownloadButton from '../DownloadButton/DownloadButton';
import FactList from '../FactList/FactList';
import HealthCard from '../HealthCard/HealthCard';
import JsPdf from "jspdf";
import html2canvas from "html2canvas";

const ResultsDisplay = () => {
  const [fileDownload, setFileDownload] = useState(null);

  const ref = React.createRef();

  const handlePdfDownload = () => {
    const source = ref || this.ref;
    const targetComponent = source.current || source;
    html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: 1,
      scrollY: window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new JsPdf();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height / imgProps.width) * pdfWidth;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("healthcard.pdf");
    });
  };

  const handleFileDownload = () => {
    var byteNumbers = new Uint8Array(fileDownload.length);
    for (var i = 0; i < fileDownload.length; i++) {
      byteNumbers[i] = fileDownload.charCodeAt(i);
    }
    const blob = new Blob([byteNumbers], {
      type: "application/smart-health-card",
    });

    // Construct the uri
    const uri = URL.createObjectURL(blob);
    // Construct the <a> element
    const link = document.createElement("a");
    link.download = "healthcard.smart-health-card";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    // Cleanup the DOM
    document.body.removeChild(link);
  };

  return (
    <div ref={ref}>
      <BackButton />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        mt={20}
        mb={20}
      >
        <HealthCard setFileDownload={setFileDownload} />
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" data-html2canvas-ignore="true">
        <DownloadButton disabled={!fileDownload} onClick={handleFileDownload}>Download SMART&reg; Health Card</DownloadButton>
        <DownloadButton disabled={!fileDownload} onClick={handlePdfDownload}>Download Printable PDF</DownloadButton>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center" my={3}>
        <FactList />
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box display="flex" flexDirection="column" maxWidth="750px">
          <Typography variant="body2" component={"span"}>
            <p>
              This vaccination record is powered by SMART&reg; and works with
              any app or service where SMART&reg; Health Cards are accepted. For
              more information, please visit: &nbsp;
              <Link
                color="secondary"
                href="https://smarthealth.cards/"
                target="_blank"
                rel="noopener"
              >
                https://smarthealth.cards
              </Link>
              .
            </p>
            <p>
              The IAL number on this document describes the way that your
              identity information was collected at the clinic. You can find
              more information about IAL encoding here:{" "}
              <Link
                color="secondary"
                href="https://vci.org/ig/vaccination-and-testing"
                target="_blank"
                rel="noopener"
              >
                https://vci.org/ig/vaccination-and-testing
              </Link>
              .
            </p>
            <p>
              Your record can be verified or imported into the app of your
              choice by scanning the QR code at the top of the page.
            </p>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default ResultsDisplay;
