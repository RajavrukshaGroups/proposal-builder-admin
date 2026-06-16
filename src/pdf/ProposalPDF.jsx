import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 35,
    fontSize: 11,
    lineHeight: 1.4,
    backgroundColor: "#ffffff",
    position: "relative",
    fontFamily: "Helvetica",
  },
  heading: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subHeading: {
    fontSize: 15,
    marginBottom: 8,
    marginTop: 12,
    fontWeight: "bold",
    color: "#334155",
  },
  paragraph: {
    marginBottom: 8,
    color: "#1e293b",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  coverPage: {
    padding: 0,
    position: "relative",
  },
  //   orangeBar: {
  //     position: "absolute",
  //     top: 0,
  //     left: 0,
  //     right: 0,
  //     height: 10,
  //     backgroundColor: "#f97316",
  //   },
  orangeBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 15,
    height: 16,
    backgroundColor: "#f97316",
  },

  topRightCurve: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 18,
    height: 280,
    backgroundColor: "#f97316",
    borderBottomLeftRadius: 40,
  },

  bottomLeftCurve: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 18,
    height: 200,
    backgroundColor: "#3b82f6", // same as bottom bar
    borderTopRightRadius: 40,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 18,
    right: 0,
    height: 16,
    backgroundColor: "#3b82f6",
  },
  logo: {
    width: 100,
    height: 60,
    objectFit: "contain",
  },
  //   sectionTitle: {
  //     fontSize: 20,
  //     fontWeight: 700,
  //     color: "#0f172a",
  //     marginBottom: 12,
  //     borderLeftWidth: 4,
  //     borderLeftColor: "#f97316",
  //     paddingLeft: 10,
  //   },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f97316",
    color: "#ffffff",
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 8,
    justifyContent: "space-between",
  },
  cellService: {
    width: "70%",
    color: "#1e293b",
  },
  cellAmount: {
    width: "30%",
    textAlign: "right",
    color: "#1e293b",
  },
  //   footer: {
  //     position: "absolute",
  //     bottom: 20,
  //     left: 30,
  //     right: 30,
  //     textAlign: "center",
  //     fontSize: 9,
  //     color: "#64748b",
  //   },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: "#475569",
  },

  //   watermark: {
  //     position: "absolute",
  //     width: 200,
  //     opacity: 0.04,
  //     top: 250,
  //     left: 120,
  //   },
  watermark: {
    position: "absolute",
    width: 280,
    opacity: 0.03,
    top: 280,
    left: 150,
  },
  contentContainer: {
    // flex: 1,
    // marginBottom: 15,
    flexGrow: 1,
    marginTop: 20,
  },
  footerContact: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
  },
  addressText: {
    width: 280,
    lineHeight: 1.3,
  },
  contactBox: {
    alignItems: "flex-end",
  },
  headerContainer: {
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRight: {
    textAlign: "right",
    fontSize: 10,
    color: "#334155",
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginTop: 2,
  },
  //   topDivider: {
  //     position: "absolute",
  //     top: 140,
  //     left: 32,
  //     right: 32,
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#9ca3af",
  //   },
  compactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  label: {
    fontWeight: "bold",
    color: "#0f172a",
    width: "35%",
  },
  value: {
    color: "#334155",
    width: "65%",
    textAlign: "right",
  },
  objectiveItem: {
    marginLeft: 14,
    marginBottom: 3,
    color: "#1e293b",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 12,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000000",
    width: 150,
    marginBottom: 8,
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 700,
    color: "#0f172a",
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 18,
    color: "#f97316",
  },
  leftDecoration: {
    position: "absolute",
    left: 16,
    bottom: 250,
  },

  leftLine: {
    width: 1,
    height: 220,
    backgroundColor: "#000",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginLeft: -2,
  },
  rightDecoration: {
    position: "absolute",
    right: 16,
    top: 350,
  },

  rightLine: {
    width: 1,
    height: 350,
    backgroundColor: "#000",
  },

  dot1: {
    position: "absolute",
    top: 0,
    left: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
  },

  dot2: {
    position: "absolute",
    top: 120,
    left: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
  },
});

const ProposalPDF = ({
  formData,
  pricingData,
  subtotal,
  gst,
  finalAmount,
  discount,
  settings,
  selectedTemplate,
  proposalData,
}) => {
  // Header component
  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Image src={settings?.logo} style={styles.logo} />
        <View style={styles.headerRight}>
          <Text>{settings?.agencyName}</Text>
          <Text>{settings?.website}</Text>
          <Text>{settings?.contactEmail}</Text>
          <Text>{settings?.contactPhone}</Text>
        </View>
      </View>
      {/* <View style={styles.headerDivider} /> */}
    </View>
  );

  // Page number footer (fixed on every page)
  const PageNumberFooter = () => (
    <Text
      fixed
      style={styles.footer}
      render={({ pageNumber, totalPages }) =>
        `Page ${pageNumber} of ${totalPages}`
      }
    />
  );

  //   const PageNumberFooter = (
  //     <Text
  //       fixed
  //       style={styles.footer}
  //       render={({ pageNumber, totalPages }) =>
  //         `Page ${pageNumber} of ${totalPages}`
  //       }
  //     />
  //   );

  // Contact footer (fixed on every page)
  const ContactFooter = () => (
    <View fixed style={styles.footerContact}>
      <Text style={styles.addressText}>{settings?.address}</Text>
      <View style={styles.contactBox}>
        <Text>{settings?.contactPhone}</Text>
        <Text>{settings?.contactEmail}</Text>
        <Text>{settings?.website}</Text>
      </View>
    </View>
  );

  // Layout wrapper for inner pages
  const PageLayout = ({ children }) => (
    <Page size="A4" style={styles.page}>
      <View style={styles.orangeBar} />
      <View style={styles.topRightCurve} />
      <View style={styles.leftDecoration}>
        <View style={styles.leftLine} />
        <View style={styles.dot} />
      </View>
      <View style={styles.rightDecoration}>
        <View style={styles.rightLine} />
        <View style={styles.dot1} />
        <View style={styles.dot2} />
      </View>
      <Image src={settings?.logo} style={styles.watermark} />
      <Header />
      <View style={styles.headerDivider} />
      <View
        style={{
          marginTop: 20,
        }}
      >
        {children}
      </View>
      <View style={styles.bottomLeftCurve} />
      <View style={styles.bottomBar} />
      <ContactFooter />
      <PageNumberFooter />
    </Page>
  );

  return (
    <Document>
      {/* PAGE 1: COVER */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.orangeBar} />
        <View style={styles.topRightCurve} />
        <View style={styles.bottomLeftCurve} />
        <View style={styles.bottomBar} />
        <View style={{ padding: 40 }}>
          <Header />
          <View style={styles.headerDivider} />
          <Image
            src={settings?.logo}
            style={{
              position: "absolute",
              width: 250,
              opacity: 0.03,
              top: 200,
              left: 130,
            }}
          />
          <View
            style={{
              marginTop: 55,
              width: 520,
            }}
          >
            <Text style={styles.coverTitle}>
              {selectedTemplate?.coverTitle}
            </Text>
            <Text style={styles.coverSubtitle}>
              {selectedTemplate?.coverSubtitle}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Proposal No: {proposalData?.proposalNumber}</Text>
            <Text>
              Date:{" "}
              {proposalData?.createdAt
                ? new Date(proposalData.createdAt).toLocaleDateString()
                : ""}
            </Text>
          </View>
          <View style={{ marginTop: 80 }}>
            <Text>Prepared For</Text>
            <Text style={{ fontSize: 22, fontWeight: 700, marginTop: 5 }}>
              {formData.clientCompany || formData.clientName}
            </Text>
            <Text>{formData.clientEmail}</Text>
            <Text>{formData.clientPhone}</Text>
          </View>
        </View>
        <ContactFooter />
        <PageNumberFooter />
      </Page>

      {/* PAGE 2: Executive Summary + Client Requirements + Why Choose Us */}
      <PageLayout>
        <Text style={styles.heading}>Executive Summary</Text>
        <Text style={styles.paragraph}>
          Thank you for considering {settings?.agencyName} as your digital
          growth partner.
        </Text>
        <Text style={styles.paragraph}>
          This proposal has been prepared based on your business objectives and
          growth requirements.
        </Text>
        <Text style={[styles.paragraph, { fontWeight: "bold", marginTop: 8 }]}>
          Objectives:
        </Text>
        {formData.objectives?.map((item, idx) => (
          <Text key={idx} style={styles.objectiveItem}>
            • {item}
          </Text>
        ))}

        <View style={styles.divider} />

        <Text style={styles.heading}>Client Requirements</Text>
        <View style={{ marginBottom: 8 }}>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Business Stage:</Text>
            <Text style={styles.value}>{formData.businessStage}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Budget Level:</Text>
            <Text style={styles.value}>{formData.budgetLevel}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Proposal Type:</Text>
            <Text style={styles.value}>{formData.proposalType}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Industry:</Text>
            <Text style={styles.value}>{formData.industry}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{formData.notes || "-"}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>
          Why Choose {settings?.agencyName}
        </Text>
        <Text style={styles.objectiveItem}>• Dedicated Project Manager</Text>
        <Text style={styles.objectiveItem}>• Transparent Reporting</Text>
        <Text style={styles.objectiveItem}>• ROI Focused Strategy</Text>
        <Text style={styles.objectiveItem}>• Experienced Team</Text>
      </PageLayout>

      {/* PAGE 3: Payment Information */}
      <PageLayout>
        <Text style={styles.heading}>Payment Information</Text>
        <View style={{ marginTop: 10 }}>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Bank:</Text>
            <Text style={styles.value}>{settings?.bankName || "-"}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.value}>{settings?.accountNumber || "-"}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>IFSC:</Text>
            <Text style={styles.value}>{settings?.ifscCode || "-"}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Branch:</Text>
            <Text style={styles.value}>{settings?.branchName || "-"}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{settings?.contactEmail || "-"}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{settings?.contactPhone || "-"}</Text>
          </View>
          <View style={styles.compactRow}>
            <Text style={styles.label}>Website:</Text>
            <Text style={styles.value}>{settings?.website || "-"}</Text>
          </View>
        </View>
      </PageLayout>

      {/* PAGE 4: Selected Services */}
      <PageLayout>
        <Text style={styles.heading}>Selected Services</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.cellService, styles.tableHeaderText]}>
            Service
          </Text>
          <Text style={[styles.cellAmount, styles.tableHeaderText]}>
            Amount (Rs.)
          </Text>
        </View>
        {pricingData?.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.cellService}>{item.serviceName}</Text>
            <Text style={styles.cellAmount}>
              Rs. {Number(item.amount || 0).toLocaleString("en-IN")}
            </Text>
          </View>
        ))}
      </PageLayout>

      {/* PAGE 5: Pricing Summary */}
      <PageLayout>
        <Text style={styles.heading}>Pricing Summary</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.cellService, styles.tableHeaderText]}>
            Particulars
          </Text>
          <Text style={[styles.cellAmount, styles.tableHeaderText]}>
            Amount (Rs.)
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellService}>Subtotal</Text>
          <Text style={styles.cellAmount}>
            Rs. {Number(subtotal || 0).toLocaleString("en-IN")}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellService}>Discount</Text>
          <Text style={styles.cellAmount}>
            Rs. {Number(discount || 0).toLocaleString("en-IN")}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.cellService}>GST</Text>
          <Text style={styles.cellAmount}>
            Rs. {Number(gst || 0).toLocaleString("en-IN")}
          </Text>
        </View>
        <View
          style={[
            styles.tableRow,
            { backgroundColor: "#fef3c7", borderBottomWidth: 0 },
          ]}
        >
          <Text style={[styles.cellService, { fontWeight: "bold" }]}>
            Final Amount
          </Text>
          <Text style={[styles.cellAmount, { fontWeight: "bold" }]}>
            Rs. {Number(finalAmount || 0).toLocaleString("en-IN")}
          </Text>
        </View>
      </PageLayout>

      {/* PAGE 6: Project Timeline (if content exists) */}
      {selectedTemplate?.timelineContent && (
        <PageLayout>
          <Text style={styles.heading}>Project Timeline</Text>
          <View style={{ marginTop: 8 }}>
            <Text wrap>{selectedTemplate.timelineContent}</Text>
          </View>
        </PageLayout>
      )}

      {/* PAGE 7: Terms & Conditions (if any) */}
      {selectedTemplate?.selectedTerms?.length > 0 && (
        <PageLayout>
          <Text style={styles.heading}>Terms & Conditions</Text>
          {selectedTemplate.selectedTerms.map((term, idx) => (
            <View key={idx} style={{ marginBottom: 14 }}>
              <Text style={styles.subHeading}>{term.title}</Text>
              {term.content?.map((item, i) => (
                <Text
                  key={i}
                  style={{ marginBottom: 3, marginLeft: 10, color: "#334155" }}
                >
                  • {item}
                </Text>
              ))}
            </View>
          ))}
        </PageLayout>
      )}

      {/* PAGE 8: Acceptance */}
      <PageLayout>
        <Text style={styles.heading}>Acceptance</Text>
        <Text style={{ marginTop: 20, marginBottom: 30, color: "#1e293b" }}>
          By signing this proposal, both parties agree to the scope, pricing and
          terms mentioned.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 50,
          }}
        >
          <View>
            <View style={styles.signatureLine} />
            <Text>Authorized Signature</Text>
          </View>
          <View>
            <View style={styles.signatureLine} />
            <Text>Client Signature</Text>
          </View>
        </View>
      </PageLayout>
    </Document>
  );
};

export default ProposalPDF;
