import React from 'react';
import { Container, Typography, Box, Paper, Divider, Grid, useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

const PrivacyPolicy: React.FC = (): JSX.Element => {
  const muiTheme = useTheme();
  const { isDarkMode } = useCustomTheme();

  const privacyData = {
    licenseeDetails: {
      name: "Nexusancial Services Pty Ltd T/As NeNeNexus",
      abn: "ABN: 73 685 074 631",
      acn: "ACN: 685 074 631",
      address: "133 Mileham St South Windsor NSW 2756",
      phone: "Phone: 0481 823 600"
    },
    authorisedRepresentative: {
      number: "Authorised Credit Representative #567862 of n Credit Licence #414426 (AFAS Group Pty Ltd, ABN 12 134 138 686)"
    },
    overview: {
      title: "Overview - Privacy",
      content: "Nexusancial Services Pty Ltd, ACN 685 074 631, ('we', 'us', 'our') collects information about you for the purpose you agree to in this Privacy Disclosure Statement and Consent. When you sign below, you agree we can, consistently with 's privacy and credit reporting laws, collect, use and exchange credit and personal information about you for those purposes."
    },
    collection: {
      title: "Your information – Collection and Credit Reporting Body ('CRB') Disclosures",
      content: "When we collect information from you in the credit application process, we use that information in a number of ways to assess your credit application and to source a suitable credit provider or lessor/or insurance provider."
    },
    actions: [
      "Disclose your identification information to a CRB if you wish us to obtain a report on your behalf.",
      "Use any information the CRB provides in that report to assist us to preliminary assess your consumer credit or guarantor application.",
      "Disclose your personal information to an insurer or insurers to source any insurances you wish to obtain.",
      "Disclose your credit information to a credit provider to apply for finance on your behalf."
    ],
    usage: "The information we obtain from you is used, subject to compliance with 's privacy and credit reporting laws, only for the purposes listed in this Consent and is not disclosed to any other person except with your permission or as permitted, or required, by law.",
    creditProviders: {
      title: "Credit Providers",
      content: "As part of providing our services to you, we may undertake tasks for a credit provider which is reasonably necessary to manage the application process. When doing so, we are acting as an intermediary for the credit provider, with the same privacy law requirements applying to both of us."
    },
    submission: "We may submit your application to one or more credit providers. Those credit providers and their website addresses are set out in the Schedule at the end of this document.",
    crbDisclosure: "A credit provider, to whom we submit an application, may disclose information about you to, and collect information about you from, from one or more CRBs.",
    websiteDetails: "The website of each credit provider contains details of each CRB with which it deals, and the information held about you and describes your key rights. This detail may be described on the credit providers' websites as 'notifiable matters', 'privacy policy', 'credit reporting policy' or privacy disclosure statement and consent', and includes –",
    rights: [
      "That the CRB may include information the credit provider discloses about you to other credit providers to assess your credit worthiness.",
      "That, if you become overdue in making consumer credit payments you commit a serious credit infringement, the credit provider may disclose that information to a CRB",
      "How you can obtain the credit providers and/or CRB's policies about managing your credit information",
      "Your right to access and/or correct information held about you and to complain about conduct that may breach the privacy and credit reporting laws",
      "Your right to request a CRB not to undertake pre-screening for purposes of direct marketing by a credit provider",
      "Your right to request a CRB not to release information about you if you believe you are a victim of fraud"
    ],
    privacyDocument: "This detail will also be included by the credit provider who approves your application in the privacy disclosure statement and consent document it will provide to you.",
    contact: "Each credit provider website includes information on how to contact the credit provider and how to obtain a copy of its privacy documents in a form that suits you (e.g. hardcopy or email).",
    yourRights: {
      title: "Your Rights",
      content: "You have the right to ask:",
      rights: [
        "Us to provide you with all the information we hold about you.",
        "Us to correct the information we hold if it is incorrect.",
        "Us for copies of our privacy policy and this document, in a form that suits you (e.g. hardcopy or email).",
        "The CRB to not use your information for direct marketing assessment purposes, including pre-screening.",
        "The CRB to provide you with a copy of the information it holds about you."
      ]
    },
    access: "You can gain access to the information we hold about you by contacting our Privacy Officer at 133 Mileham St South Windsor NSW 2756. Or by telephone on 0481 823 600 or email at Prathamesh@Nexusnce.com.au. In some cases an administration fee may be charges to cover the cost of providing the information.",
    policy: "Our privacy policy is available and we will provide you with a copy if you ask us.",
    disclosureConsent: {
      title: "Disclosure and Consent",
      content: "By Signing below, you agree we may:",
      agreements: [
        "Use your personal and credit information: To assess your consumer or commercial credit and/or guarantee application and/or to assess a credit application by a company of which you are a director. To source any finance you require. To source any insurance you require.",
        "As the law authorises or requires: Disclose to, and obtain from, any prospective credit provider or insurer, information about you that is reasonably necessary to obtain the finance and insurances required; Obtain from, and disclose to, any third-party information about you, the applicant(s) or guarantors(s) that is reasonably necessary to assist you obtain the finance and insurances required; Provide your information, including your credit report(s), to one or more of the credit providers specified in the Schedule of Credit Providers below so they can assess your application, or the application of a company of which you are a director, or your suitability as a guarantor; Provide credit information about you to a guarantor, or prospective guarantor; Provide you, or the company of which you are a director with offers or information of other goods or services we, or any of our associated entities, may be able to provide to you or the company, unless you tell us not to; Disclose your personal and credit information to the extent permitted by law to other organisations that provide us with services, such as contractors, agents, printers, mail houses, lawyers, document custodians, securitises and computer systems consultants or providers, so they can perform those services for us; and Disclose your personal information to any other organisation that may wish to acquire, or has acquired, an interest in our business or any rights under your contract with us, or the contract with us of a company of which you are a director."
      ]
    },
    consent: "You also agree and consent to, as appropriate:",
    consents: [
      "A CRB disclosing consumer credit information to one or more Credit Providers below for the purpose of assessing your application for consumer or commercial credit or your guarantor application, and/or assessing a credit application by a company of which you are a director.",
      "A credit provider using that information to assess your suitability as a guarantor when you are a prospective guarantor.",
      "A credit provider disclosing your credit information (including information obtained by it from a CRB) to a guarantor, or a prospective guarantor.",
      "A credit provider disclosing to another credit provider, for a particular purpose, information it holds about you."
    ],
    companyConsent: "Where the applicant, or guarantor, is a company of which you are a director, you consent to the use of your information, in addition to the company's information, in each of the ways listed above.",
    authorisation: {
      title: "Authorisation",
      content: "By signing below, you also authorise us to make a request on your behalf to obtain credit reporting information about your consumer and commercial credit worthiness from a CRB. That information will assist us in providing our services to you. This authorisation ceases when we undertake a task on behalf of a credit provider."
    },
    complaints: {
      title: "If you have a complaint",
      internal: "Internal Dispute Resolution Within our business we follow specific procedures to try to resolve any complaints that you may have. If you have a complaint, please contact our office via email at Prathamesh@Nexusnce.com.au. They will try to resolve all concerns quickly and fairly.",
      external: "External Dispute Resolution In the unlikely event we cannot resolve your complaint in a satisfactory manner, or you have not received a response from us after 45 days, you can escalate your complaint to the below Ombudsman, a free and independent dispute resolution service provider."
    },
    afca: {
      name: "n Financial Complaints Authority (AFCA)",
      call: "Free call number: 1800 931 678",
      policy: "A copy of AFCA's dispute resolution policy is available at https://www.afca.org.au.",
      membership: "Nexusance's membership number is 114068."
    },
    checkInfo: "You can check the information we hold about you at any time by contacting our Privacy Officer.",
    privacyOfficer: {
      title: "Privacy Officer",
      name: "Nexusance",
      address: "133 Mileham St South Windsor NSW 2756",
      email: "Email: Prathamesh@Nexusnce.com.au",
      phone: "Phone: 0481 823 600"
    },
    schedule: {
      title: "Schedule Of Credit Providers",
      providers: [
        "Latitude Group - www.latitudefinancial.com.au",
        "MoneyMe Financial Group Pty Ltd (autopay) – www.autopay.com.au",
        "WISR Finance Pty Ltd - www.wisr.com.au",
        "Branded Financial Services Pty Ltd - www.brandedfinancial.com.au",
        "Volkswagen Financial Services Pty Ltd - www.vwfs.com.au",
        "n Motorcycle and Marine Finance Pty Ltd - www.ammf.com.au",
        "Automotive Financial Services Pty Ltd - www.afs.com.au",
        "Westpac - www.westpac.com.au",
        "Commercial Equity Group Ltd - www.commercialequity.com.au",
        "Capital Finance  Limited - www.capitalfinance.com.au",
        "R.A.C.V. Finance Limited - www.racv.com.au",
        "Moula Money Pty Ltd - www.moula.com.au",
        "Secure Funding Pty Ltd (Liberty) – www.liberty.com.au and www.moneyplace.com.au",
        " and New Zealand Banking Group Limited – www.anz.com.au",
        "Pepper Asset Finance Pty Ltd - www.peppergroup.com.au",
        "SocietyOne  Pty Ltd - www.societyone.com.au",
        "Fin One Pty Ltd - www.finone.com.au",
        "Finance One Commercial Pty Ltd - financeone.com.au/business-loans",
        "Zwab Ventures Pty Ltd (Biz Cap) – www.bizcap.com.au",
        "Business Fuel (Cash Advance) Pty Ltd – www.businessfuel.com.au",
        "Money3 Loans Pty Ltd - www.money3.com.au",
        "Metro Finance Pty Ltd / Metro CF Pty Ltd - www.metrofin.com.au",
        "Plenti RE Limited - www.plenti.com.au",
        "Lumi Finance Pty Ltd – www.lumi.com.au",
        "Azora Finance (Services) Pty Ltd - www.azora.com.au",
        "Thornmoney Pty Ltd – www.thorn.money",
        "Morris Finance Ltd - www.morrisfinance.com.au",
        "Scottish Pacific Business Finance Pty Ltd – www.scotpac.com.au",
        "Firstmac Limited - www.firstmac.com.au",
        "Flexicommercial Pty Ltd – www.flexicommercial.com.au",
        "Ume Loans Pty Ltd – www.umeloans.com.au",
        "Multipli Pty Ltd – www.multipli.com.au",
        "Forward Finance Pty Ltd – forwardfinance.com.au",
        "EarlyPay Ltd – www.earlypay.com.au",
        "Medfin  Pty Ltd – www.medfin.com.au",
        "Judo Bank Pty Ltd – www.judo.bank",
        "National  Bank Limited – www.nab.com.au",
        "CBA Asset Finance – www.commbank.com.au",
        "Affordable Car Loans Pty Ltd – www.affordablecarloans.com.au",
        "Credit Corp Financial Services Pty Limited – www.carstart.com.au",
        "Now Finance Group Pty Ltd - www.nowfinance.com.au",
        "Selfco is a division of Auswide Bank Ltd - selfco.com.au",
        "Group & General Finance Pty Ltd - www.groupandgeneral.com",
        "Westpac Banking Corporation – www.westpac.com.au",
        "Angle Finance - www.anglefinance.com.au",
        "Dynamoney Limited – www.dynamoney.com.au",
        "Angle Auto Finance - www.angleauto.com.au",
        "Bank of Queensland Limited – www.boqfinance.com.au",
        "Resimac Asset Finance Pty Ltd - resimacassetfinance.com.au",
        "Gamma Duo Financial Services Pty Ltd - www.gammaduo.com.au",
        "Moneytech Group Ltd – www.moneytech.com.au",
        "Maple Asset Finance Pty Ltd - maplecommercial.com.au",
        "Rapid Loans - www.rapidloans.com.au",
        "Allied Retail Finance Pty Ltd - alliedcredit.com.au",
        "Alex Bank Pty Ltd - www.alex.bank",
        "Asset Rental Group (Holdings) Ltd - ARG- www.arg.ltd",
        "Capify - www.capify.com.au",
        "C1 Finance Pty Ltd - c1carloans.com.au",
        "Prospa - www.prospa.com",
        "Hejaz Capital Pty Ltd - www.hejazfs.com.au",
        "OurMoneyMarket - ourmoneymarket.com",
        "Shift - www.shift.com.au",
        "Grenke – www.grenke.com.au",
        "Jacaranda Finance – www.jacarandafinance.com.au"
      ]
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: muiTheme.palette.background.paper }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mt: 10, color: muiTheme.palette.primary.main, fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>

        {/* Licensee Details */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            Licensee Details - Contact Details
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{privacyData.licenseeDetails.name}</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.licenseeDetails.abn}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.licenseeDetails.acn}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.licenseeDetails.address}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.licenseeDetails.phone}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.authorisedRepresentative.number}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.overview.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.overview.content}
          </Typography>
          <Typography variant="body1" paragraph>
            We are collecting credit and personal information (information) about you, as applicable:
          </Typography>
          <Typography variant="body1" paragraph>
            To source for you, or a company of which you are a director:
          </Typography>
          <ul>
            <li>Consumer credit for personal, household, domestic or residential investment purposes;</li>
            <li>Commercial credit for business purposes; or</li>
            <li>Other services stated in this Privacy Disclosure Statement and Consent (Consent); or</li>
            <li>To support a guarantor application you will provide.</li>
          </ul>
          <Typography variant="body1" paragraph>
            As your broker, we require the information we collect from you to assess your credit, or guarantor, application or the credit application of a company of which you are a director, source a suitable credit provider and any required insurances and to manage the application process, where required. If you do not provide the information sought we may be unable to process your application, or the company's application, or we may be limited in the other services we can offer you or the company.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Collection and CRB Disclosures */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.collection.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.collection.content}
          </Typography>
          <Typography variant="body1" paragraph>
            We may:
          </Typography>
          <ul>
            {privacyData.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
          <Typography variant="body1" paragraph>
            {privacyData.usage}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Credit Providers */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.creditProviders.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.creditProviders.content}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.submission}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.crbDisclosure}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.websiteDetails}
          </Typography>
          <ul>
            {privacyData.rights.map((right, index) => (
              <li key={index}>{right}</li>
            ))}
          </ul>
          <Typography variant="body1" paragraph>
            {privacyData.privacyDocument}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.contact}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Your Rights */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.yourRights.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.yourRights.content}
          </Typography>
          <ul>
            {privacyData.yourRights.rights.map((right, index) => (
              <li key={index}>{right}</li>
            ))}
          </ul>
          <Typography variant="body1" paragraph>
            {privacyData.access}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.policy}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Disclosure and Consent */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.disclosureConsent.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.disclosureConsent.content}
          </Typography>
          <ul>
            {privacyData.disclosureConsent.agreements.map((agreement, index) => (
              <li key={index}>{agreement}</li>
            ))}
          </ul>
          <Typography variant="body1" paragraph>
            {privacyData.consent}
          </Typography>
          <ul>
            {privacyData.consents.map((consent, index) => (
              <li key={index}>{consent}</li>
            ))}
          </ul>
          <Typography variant="body1" paragraph>
            {privacyData.companyConsent}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Authorisation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.authorisation.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.authorisation.content}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Complaints */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.complaints.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Internal Dispute Resolution
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.complaints.internal}
          </Typography>
          <Typography variant="h6" gutterBottom>
            External Dispute Resolution
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.complaints.external}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{privacyData.afca.name}</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.afca.call}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.afca.policy}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.afca.membership}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.checkInfo}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Privacy Officer */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.privacyOfficer.title}
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>{privacyData.privacyOfficer.name}</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.privacyOfficer.address}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.privacyOfficer.email}
          </Typography>
          <Typography variant="body1" paragraph>
            {privacyData.privacyOfficer.phone}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Schedule of Credit Providers */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.secondary.main }}>
            {privacyData.schedule.title}
          </Typography>
          <Grid container spacing={2}>
            {privacyData.schedule.providers.map((provider, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>
                  {provider}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
