import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Slider,
  TextField,
  FormControl,
  FormLabel,
  Button,
  Chip,
  Divider,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
  MonetizationOn,
  Percent,
  CalendarMonth,
  TrendingUp,
  Calculate,
  Info,
  BarChart,
  PieChart,
  Timeline,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { submitPdfPreviewForm } from '../services/api';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import emailjs from "emailjs-com";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// email send 

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};


// Enhanced styled components with improved dark mode support
const GlassPaper = styled(Paper, { shouldForwardProp: (prop) => prop !== 'isDarkMode' })<{ isDarkMode: boolean }>(
  ({ theme, isDarkMode }) => ({
    background: isDarkMode
      ? 'rgba(15, 23, 42, 0.9)'
      : 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(25px) saturate(200%)',
    borderRadius: '24px',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    padding: theme.spacing(4),
    margin: theme.spacing(2, 0),
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isDarkMode
      ? '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)'
      : '0 25px 50px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.08)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: isDarkMode
        ? '0 35px 70px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.12)'
        : '0 35px 70px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.12)',
    },
  })
);

const StyledCard = styled(Card, { shouldForwardProp: (prop) => prop !== 'isDarkMode' })<{ isDarkMode: boolean }>(
  ({ theme, isDarkMode }) => ({
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.8))'
      : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9), rgba(226, 232, 240, 0.9))',
    color: isDarkMode ? '#ffffff' : '#1e293b',
    textAlign: 'center',
    border: `1px solid ${isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)'}`,
    borderRadius: '20px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isDarkMode
      ? '0 12px 40px rgba(0, 0, 0, 0.3)'
      : '0 12px 40px rgba(59, 130, 246, 0.12)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: isDarkMode
        ? '0 20px 60px rgba(96, 165, 250, 0.3)'
        : '0 20px 60px rgba(59, 130, 246, 0.25)',
    },
  })
);

const StyledSlider = styled(Slider, { shouldForwardProp: (prop) => prop !== 'isDarkMode' })<{ isDarkMode: boolean }>(
  ({ theme, isDarkMode }) => ({
    color: isDarkMode ? '#60a5fa' : '#2563eb',
    height: 6,
    borderRadius: 3,
    '& .MuiSlider-thumb': {
      backgroundColor: isDarkMode ? '#60a5fa' : '#2563eb',
      border: `3px solid ${isDarkMode ? '#ffffff' : '#ffffff'}`,
      width: 20,
      height: 20,
      boxShadow: isDarkMode
        ? '0 4px 12px rgba(96, 165, 250, 0.4)'
        : '0 4px 12px rgba(37, 99, 235, 0.3)',
      transition: 'all 0.3s ease',
    },
    '& .MuiSlider-track': {
      backgroundColor: isDarkMode ? '#60a5fa' : '#2563eb',
      height: 6,
      borderRadius: 3,
    },
    '& .MuiSlider-rail': {
      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      height: 6,
      borderRadius: 3,
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#1e293b',
      border: `2px solid ${isDarkMode ? '#60a5fa' : '#2563eb'}`,
      borderRadius: '8px',
      fontWeight: 600,
      padding: '6px 10px',
    },
  })
);

const StyledTextField = styled(TextField, { shouldForwardProp: (prop) => prop !== 'isDarkMode' })<{ isDarkMode: boolean }>(
  ({ theme, isDarkMode }) => ({
    '& .MuiOutlinedInput-root': {
      color: isDarkMode ? '#ffffff' : '#1e293b',
      backgroundColor: isDarkMode
        ? 'rgba(30, 41, 59, 0.7)'
        : 'rgba(255, 255, 255, 0.95)',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      '& fieldset': {
        borderColor: isDarkMode ? 'rgba(96, 165, 250, 0.4)' : 'rgba(37, 99, 235, 0.3)',
        borderWidth: 1,
      },
      '&:hover fieldset': {
        borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDarkMode ? '#ffffff' : '#374151',
      fontWeight: 600,
    },
    '& .MuiInputAdornment-root': {
      color: isDarkMode ? '#ffffff' : '#64748b',
      fontWeight: 600,
    },
  })
);

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Calculator: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [establishmentFee, setEstablishmentFee] = useState<number>(2);

  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);
  const [totalRepayment, setTotalRepayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [tabValue, setTabValue] = useState(0);

  // Chart data states
  const [amortizationData, setAmortizationData] = useState<any>(null);
  const [paymentBreakdownData, setPaymentBreakdownData] = useState<any>(null);
  const [balanceOverTimeData, setBalanceOverTimeData] = useState<any>(null);


  //send email pdf
  const [formAction, setFormAction] = useState<"download" | "email" | "preview">("download");


  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    description: ""
  });
  const [formErrors, setFormErrors] = useState({ name: false, contactNumber: false, email: false });
  const [successMsg, setSuccessMsg] = useState("");

// ✅ Reset form whenever popup opens
useEffect(() => {
  if (openForm) {
    setFormData({
      name: "",
      contactNumber: "",
      email: "",
      description: ""
    });
    setFormErrors({ name: false, contactNumber: false, email: false });
    setSuccessMsg("");
  }
}, [openForm]);

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = () => {
  const errors = {
    name: formData.name.trim() === "",
    contactNumber: formData.contactNumber.trim() === "",
    email: formData.email.trim() === "" || !validateEmail(formData.email.trim())
  };
  setFormErrors(errors);

  return !errors.name && !errors.contactNumber && !errors.email;
};

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setFormErrors({ ...formErrors, [e.target.name]: false });
};

  

const handleDownloadClick = async () => {
  setFormAction("download");
  setOpenForm(true);
  const pdf = await generateLoanDetails();
  setPdfBlob(pdf);
};



const handleCloseForm = () => {
  setOpenForm(false);
  setSuccessMsg("");
  setFormErrors({ name: false, contactNumber: false, email: false });
  // This handles the "cancel download" requirement
  setPdfBlob(null); 
};



// This function handles opening the form specifically for a download action.
const handleOpenDownloadForm = () => {
  setFormAction("download");
  setOpenForm(true);
};

// This function handles opening the form specifically for an email action.
const handleOpenEmailForm = () => {
  setFormAction("email");
  setOpenForm(true);
};

// Email Submiting 



// This is the core function that processes the form submission.
// It generates the PDF once and then performs the correct action based on the `formAction` state.
const handleBackendSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const payload = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      contactNumber: formData.contactNumber.trim(),
      message: formData.description.trim() || "N/A",
    };

    const result = await submitPdfPreviewForm(payload);

    // If backend sends a download link
    if (result.downloadUrl) {
      const link = document.createElement("a");
      link.href = result.downloadUrl;
      link.download = "report.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setSuccessMsg("✅ Your details have been submitted successfully!");
    setTimeout(() => {
      setOpenForm(false);
      setSuccessMsg("");
    }, 2000);

  } catch (error) {
    console.error("Error submitting form:", error);
    setSuccessMsg("❌ Failed to submit enquiry. Please try again.");
  }
};
// Handle download submit

// 🔹 Download PDF + send admin enquiry
// const handleDownloadSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   try {
//     const pdfBlob = await generateLoanDetails();

//     // Send enquiry email (no attachment here, only details)
//     await emailjs.send(
//       "service_qklzk9e", // your Service ID
//       "template_i32gf5j", // admin template
//       {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.contactNumber,
//         message: formData.description,
//       },
//       "jt6uCY0mO3Q7T1NQj" // your Public Key
//     );

//     setSuccessMsg("✅ Enquiry sent successfully! Your download will begin shortly.");

//     setTimeout(() => {
//       setOpenForm(false);

//       // Trigger file download
//       const url = URL.createObjectURL(pdfBlob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "loan-details.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);

//       setSuccessMsg("");
//     }, 1500);
//   } catch (err) {
//     console.error("Error sending email:", err);
//     setSuccessMsg("❌ Failed to process request. Please try again.");
//   }
// };

// Handle Preview Submit Function

const handlePreviewSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    // Open preview window early to avoid popup blockers
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) {
      setSuccessMsg("❌ Please disable popup blocker and try again.");
      return;
    }

    previewWindow.document.title = 'Loading PDF Preview...';
    previewWindow.document.body.style.margin = '0';
    previewWindow.document.body.innerHTML = `
      <style>
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          background: #f9fafb;
          font-family: Arial, sans-serif;
          flex-direction: column;
          gap: 16px;
        }
        .spinner {
          width: 48px;
          height: 48px;
          border: 5px solid #e5e7eb;
          border-top: 5px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .text {
          font-size: 16px;
          color: #374151;
          font-weight: 500;
        }
      </style>
      <div class="spinner"></div>
      <div class="text">Preparing your PDF preview...</div>
    `;

    // Generate PDF
    const pdfBlob = await generateLoanDetails();
    console.log('PDF generated for preview, size:', pdfBlob.size);

    // Send enquiry email with comprehensive form data (using same config as download)
    // await emailjs.send(
    //   "service_qklzk9e", // admin Service ID (same as download)
    //   "template_i32gf5j", // admin template (same as download)
    //   {
    //     name: formData.name,
    //     email: formData.email,
    //     phone: formData.contactNumber,
    //     message: formData.description,
    //     loan_amount: formatCurrency(loanAmount),
    //     total_repayment: formatCurrency(totalRepayment),
    //   },
    //   "jt6uCY0mO3Q7T1NQj" // admin Public Key (same as download)
    // );

    // console.log('Email sent successfully for preview');
    // setSuccessMsg("✅ Enquiry sent! Opening preview...");

    // Replace loader with PDF
    const url = URL.createObjectURL(pdfBlob);
    if (previewWindow && !previewWindow.closed) {
      previewWindow.document.body.innerHTML = '';
      const iframe = previewWindow.document.createElement('iframe');
      iframe.src = url;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      previewWindow.document.body.appendChild(iframe);
      console.log('PDF preview loaded in iframe');
    }

    setTimeout(() => {
      setOpenForm(false);
      setSuccessMsg('');
    }, 1200);

    // Extend blob URL lifetime for preview (60 seconds)
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (err) {
    console.error("Error in preview submit:", err);
    setSuccessMsg("❌ Failed to send enquiry or preview PDF. Please try again.");
  }
};



// 🔹 Send PDF to user's email
// const handleEmailSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   try {
//     const pdfBlob = await generateLoanDetails();
//     const base64PDF = await blobToBase64(pdfBlob);

//     await emailjs.send(
//       "service_3hou49s", // your Service ID
//       "template_0guyq97", // user template (with attachment field)
//       {
//         from_name: formData.name,
//         contact_number: formData.contactNumber,
//         email: formData.email, // user email
//         description: formData.description,
//         loan_amount: formatCurrency(loanAmount),
//         total_repayment: formatCurrency(totalRepayment),
//         pdf_attachment: base64PDF, // attach PDF
//       },
//       "MevEtWk04mSRq9Dpo"
//     );

//     setSuccessMsg("✅ PDF has been sent to your email!");
//     setTimeout(() => {
//       setOpenForm(false);
//       setSuccessMsg("");
//     }, 2000);
//   } catch (err) {
//     console.error("Error sending email:", err);
//     setSuccessMsg("❌ Failed to process request. Please try again.");
//   }
// };




const [isFormValid, setIsFormValid] = useState(false);

useEffect(() => {
  const { name, contactNumber, email } = formData;
  if (name.trim() && contactNumber.trim() && email.trim()) {
    setIsFormValid(true);
  } else {
    setIsFormValid(false);
  }
}, [formData]);


  // PDF preview states
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, establishmentFee]);

  const calculateLoan = () => {
    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const establishmentCost = (establishmentFee / 100) * loanAmount;

      const repayment =
        (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -loanTerm));

      const totalPay = repayment * loanTerm + establishmentCost;
      const totalInt = totalPay - loanAmount - establishmentCost;

      setMonthlyRepayment(Math.round(repayment * 100) / 100);
      setTotalRepayment(Math.round(totalPay * 100) / 100);
      setTotalInterest(Math.round(totalInt * 100) / 100);
      setTotalFees(Math.round(establishmentCost * 100) / 100);

      // Generate chart data
      generateChartData(repayment, monthlyRate, establishmentCost);
    }
  };

  const generateChartData = (monthlyPayment: number, monthlyRate: number, establishmentCost: number) => {
    // Amortization schedule data
    const schedule = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.max(0, Math.round(remainingBalance * 100) / 100),
      });
    }

    // Amortization chart data
    setAmortizationData({
      labels: schedule.map(item => `Month ${item.month}`),
      datasets: [
        {
          label: 'Principal',
          data: schedule.map(item => item.principal),
          backgroundColor: isDarkMode ? '#60a5fa' : '#2563eb',
          borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
          fill: false,
        },
        {
          label: 'Interest',
          data: schedule.map(item => item.interest),
          backgroundColor: isDarkMode ? '#fbbf24' : '#d97706',
          borderColor: isDarkMode ? '#fbbf24' : '#d97706',
          fill: false,
        },
      ],
    });

    // Payment breakdown pie chart
    setPaymentBreakdownData({
      labels: ['Principal', 'Interest', 'Fees'],
      datasets: [
        {
          data: [loanAmount, totalInterest, totalFees],
          backgroundColor: [
            isDarkMode ? '#60a5fa' : '#2563eb',
            isDarkMode ? '#fbbf24' : '#d97706',
            isDarkMode ? '#a78bfa' : '#7c3aed',
          ],
          borderWidth: 2,
          borderColor: isDarkMode ? '#1e293b' : '#ffffff',
        },
      ],
    });

    // Balance over time
    setBalanceOverTimeData({
      labels: schedule.map(item => `Month ${item.month}`),
      datasets: [
        {
          label: 'Remaining Balance',
          data: schedule.map(item => item.balance),
          backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.2)',
          borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setter(Math.max(min, Math.min(max, value)));
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const backgroundGradient = isDarkMode
    ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#374151',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#374151',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#ffffff' : '#374151',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const generateLoanDetails = async (): Promise<Blob> => {
    const doc = new jsPDF();

    // Load logo
    try {
      const response = await fetch('/logo.webp');
      if (response.ok) {
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        await new Promise((resolve) => {
          reader.onload = resolve;
        });
        const imgData = reader.result as string;
        doc.addImage(imgData, 'PNG', 10, 10, 40, 20);
      } else {
        console.warn('Logo not found, skipping logo in PDF');
      }
    } catch (error) {
      console.error('Error loading logo:', error);
    }

    // Set document properties
    doc.setProperties({
      title: 'Loan Details',
      subject: 'Loan Calculator Report',
      author: 'Nexus Finance',
    });

    // Title
    doc.setFontSize(20);
    doc.text('Loan Details', 60, 20);

    // Inputs table
    autoTable(doc, {
      startY: 40,
      head: [['Parameter', 'Value']],
      body: [
        ['Loan Amount', formatCurrency(loanAmount)],
        ['Interest Rate', `${interestRate}%`],
        ['Loan Term', `${loanTerm} months`],
        ['Establishment Fee', `${establishmentFee}%`],
      ],
      styles: { fontSize: 12, cellPadding: 5 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // Results table
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Result', 'Amount']],
      body: [
        ['Monthly Repayment', formatCurrency(monthlyRepayment)],
        ['Total Repayment', formatCurrency(totalRepayment)],
        ['Total Interest', formatCurrency(totalInterest)],
        ['Total Fees', formatCurrency(totalFees)],
      ],
      styles: { fontSize: 12, cellPadding: 5 },
      headStyles: { fillColor: [34, 197, 147], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    // Amortization table
    const schedule = [];
    let remainingBalance = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const establishmentCost = (establishmentFee / 100) * loanAmount;
    const repayment = monthlyRepayment;
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = repayment - interestPayment;
      remainingBalance -= principalPayment;
      schedule.push({
        month,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.max(0, Math.round(remainingBalance * 100) / 100),
      });
    }
    const body = schedule.map(item => [
      item.month,
      formatCurrency(item.principal),
      formatCurrency(item.interest),
      formatCurrency(item.balance),
    ]);
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 10,
      head: [['Month', 'Principal', 'Interest', 'Balance']],
      body,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [251, 191, 36], textColor: 0 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    return doc.output('blob');
  };

  const handlePreviewPDF = async () => {
    try {
      console.log('Starting PDF preview generation...');
      const blob = await generateLoanDetails();

      if (!blob || blob.size === 0) {
        console.error('Generated PDF blob is empty or invalid');
        alert('Error: Unable to generate PDF. Please try again.');
        return;
      }

      console.log('PDF blob generated successfully, size:', blob.size);
      const url = URL.createObjectURL(blob);

      if (!url) {
        console.error('Failed to create object URL from blob');
        alert('Error: Unable to create PDF preview. Please try again.');
        return;
      }

      // Instead of opening a new tab with the blob URL (which shows blob:http://...), open a new tab with a custom URL that triggers download with the desired filename
      const newWindow = window.open('', '_blank');
      if (!newWindow) {
        console.error('Failed to open new window - popup blocker may be active');
        alert('Error: Please disable popup blocker and try again.');
        URL.revokeObjectURL(url);
        return;
      }

      // Create an iframe in the new window to embed the PDF blob with a proper filename
      const iframe = newWindow.document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = url;
      newWindow.document.title = 'Loan Details';
      newWindow.document.body.style.margin = '0';
      newWindow.document.body.appendChild(iframe);

      // Clean up the URL after a longer delay to allow the new tab to load
      setTimeout(() => {
        console.log('Revoking object URL:', url);
        URL.revokeObjectURL(url);
      }, 10000); // Increased from 1000ms to 10000ms (10 seconds)
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      alert('Error generating PDF preview. Please check the console for details.');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = pdfBlob || await generateLoanDetails();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'loan-details.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    setPdfBlob(null);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{
      minHeight: '100vh',
      py: { xs: 3, sm: 4, md: 6 },
      px: { xs: 2, sm: 3, md: 4 },
      background: backgroundGradient,
      transition: 'all 0.5s ease',
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mt: { xs: 6, sm: 8, md: 10 },
            mb: 4,
            color: isDarkMode ? '#ffffff' : '#1e293b',
            backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.2)',
            },
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
        >
          Back
        </Button>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            textAlign="center"
            gutterBottom
            sx={{
              backgroundImage: cardGradient,
              backgroundSize: "200%",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
              mt: 10,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Smart Loan Calculator
          </Typography>
          <Typography variant="h6" sx={{
            color: isDarkMode ? '#e2e8f0' : '#64748b',
            mb: 3,
            maxWidth: 600,
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.125rem' },
            lineHeight: 1.6,
          }}>
            Calculate your loan repayments with real-time insights and personalized results
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: 4 }}>
          {/* Input Section */}
          <Grid item xs={12} lg={6}>
            <GlassPaper elevation={0} isDarkMode={isDarkMode} sx={{ height: '100%', minWidth: { xs: '100%', md: 600, lg: 1200  } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 3, sm: 4 } }}>
                <MonetizationOn sx={{
                  color: isDarkMode ? '#60a5fa' : '#2563eb',
                  fontSize: { xs: 24, sm: 28, md: 32 },
                  mr: 2
                }} />
                <Typography variant="h5" sx={{
                  fontWeight: 700,
                  color: isDarkMode ? '#ffffff' : '#1e293b',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}>
                  Loan Details
                </Typography>
              </Box>

              <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} sx={{
                '& > *': {
                  paddingRight: { md: 0 }
                }
              }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      htmlFor="loan-amount-input"
                      sx={{
                        color: isDarkMode ? '#ffffff' : '#374151',
                        mb: 1.5,
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      Loan Amount
                    </FormLabel>
                    <StyledTextField
                      id="loan-amount-input"
                      type="number"
                      value={loanAmount}
                      onChange={handleInputChange(setLoanAmount, 1000, 1000000)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>$</Typography>,
                      }}
                      isDarkMode={isDarkMode}
                      inputProps={{
                        'aria-describedby': 'loan-amount-description'
                      }}
                    />
                    <Typography id="loan-amount-description" variant="caption" sx={{ display: 'none' }}>
                      Enter the loan amount in n dollars
                    </Typography>
                    <StyledSlider
                      value={loanAmount}
                      onChange={(_, value) => setLoanAmount(value as number)}
                      min={1000}
                      max={1000000}
                      step={1000}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `$${(value / 1000).toFixed(0)}k`}
                      isDarkMode={isDarkMode}
                      aria-labelledby="loan-amount-input"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      htmlFor="interest-rate-input"
                      sx={{
                        color: isDarkMode ? '#ffffff' : '#374151',
                        mb: 1.5,
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      Interest Rate
                    </FormLabel>
                    <StyledTextField
                      id="interest-rate-input"
                      type="number"
                      value={interestRate}
                      onChange={handleInputChange(setInterestRate, 0.1, 20)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: <Typography variant="body2">%</Typography>,
                      }}
                      isDarkMode={isDarkMode}
                      inputProps={{
                        'aria-describedby': 'interest-rate-description'
                      }}
                    />
                    <Typography id="interest-rate-description" variant="caption" sx={{ display: 'none' }}>
                      Enter the annual interest rate as a percentage
                    </Typography>
                    <StyledSlider
                      value={interestRate}
                      onChange={(_, value) => setInterestRate(value as number)}
                      min={0.1}
                      max={20}
                      step={0.1}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      isDarkMode={isDarkMode}
                      aria-labelledby="interest-rate-input"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      htmlFor="loan-term-input"
                      sx={{
                        color: isDarkMode ? '#ffffff' : '#374151',
                        mb: 1.5,
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      Loan Term (Months)
                    </FormLabel>
                    <StyledTextField
                      id="loan-term-input"
                      type="number"
                      value={loanTerm}
                      onChange={handleInputChange(setLoanTerm, 12, 120)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: <Typography variant="body2">months</Typography>,
                      }}
                      isDarkMode={isDarkMode}
                      inputProps={{
                        'aria-describedby': 'loan-term-description'
                      }}
                    />
                    <Typography id="loan-term-description" variant="caption" sx={{ display: 'none' }}>
                      Enter the loan term in months (1-10 years)
                    </Typography>
                    <StyledSlider
                      value={loanTerm}
                      onChange={(_, value) => setLoanTerm(value as number)}
                      min={12}
                      max={120}
                      step={12}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value / 12} yr`}
                      isDarkMode={isDarkMode}
                      aria-labelledby="loan-term-input"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel
                      htmlFor="establishment-fee-input"
                      sx={{
                        color: isDarkMode ? '#ffffff' : '#374151',
                        mb: 1.5,
                        fontWeight: 600,
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      Establishment Fee
                    </FormLabel>
                    <StyledTextField
                      id="establishment-fee-input"
                      type="number"
                      value={establishmentFee}
                      onChange={handleInputChange(setEstablishmentFee, 0, 10)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: <Typography variant="body2">%</Typography>,
                      }}
                      isDarkMode={isDarkMode}
                      inputProps={{
                        'aria-describedby': 'establishment-fee-description'
                      }}
                    />
                    <Typography id="establishment-fee-description" variant="caption" sx={{ display: 'none' }}>
                      Enter the establishment fee as a percentage of the loan amount
                    </Typography>
                    <StyledSlider
                      value={establishmentFee}
                      onChange={(_, value) => setEstablishmentFee(value as number)}
                      min={0}
                      max={10}
                      step={0.1}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      isDarkMode={isDarkMode}
                      aria-labelledby="establishment-fee-input"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </GlassPaper>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} lg={6}>
            <GlassPaper elevation={0} isDarkMode={isDarkMode} sx={{ height: '100%', minWidth: { xs: '100%', md: 600 , lg: 1200 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 ,}}>
                <TrendingUp sx={{
                  color: isDarkMode ? '#34d399' : '#059669',
                  fontSize: 32,
                  mr: 2
                }} />
                <Typography variant="h5" sx={{
                  fontWeight: 700,
                  color: isDarkMode ? '#ffffff' : '#1e293b',
                }}>
                  Results
                </Typography>
              </Box>

              <Grid container spacing={5}>
                <Grid item xs={12} sm={6} sx={{minWidth: '248px'}}>
                  <StyledCard isDarkMode={isDarkMode}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>Monthly Repayment</Typography>
                      <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: isDarkMode ? '#60a5fa' : '#2563eb',
                      }}>
                        {formatCurrency(monthlyRepayment)}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} sx={{minWidth: '248px'}}>
                  <StyledCard isDarkMode={isDarkMode}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2 }}>Total Repayment</Typography>
                      <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: isDarkMode ? '#34d399' : '#059669',
                      }}>
                        {formatCurrency(totalRepayment)}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} sx={{minWidth: '248px'}}>
                  <StyledCard isDarkMode={isDarkMode}>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 2 }}>Total Interest</Typography>
                      <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: isDarkMode ? '#fbbf24' : '#d97706',
                      }}>
                        {formatCurrency(totalInterest)}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>

                <Grid item xs={12} sm={6} sx={{minWidth: '248px'}}>
                  <StyledCard isDarkMode={isDarkMode}>
                    <CardContent>
                      <Typography variant="h5" sx={{ mb: 2 }}>Total Fees</Typography>
                      <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: isDarkMode ? '#a78bfa' : '#7c3aed',
                      }}>
                        {formatCurrency(totalFees)}
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', gap: 2, justifyContent: 'center' }}>
                
                  {/* Preview Button */}
                  
                  
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFormAction("preview"); // 👈 new action
                    setOpenForm(true);
                  }}
                  sx={{
                    display: { xs: 'none', md: 'inline-flex' },
                    borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
                    color: isDarkMode ? '#60a5fa' : '#2563eb',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    '&:hover': {
                      borderColor: isDarkMode ? '#60a5fa' : '#2563eb',
                      backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    },
                  }}
                >
                  Preview PDF
                </Button>

                {/* Send Pdf On Mail Button */}

                {/* <Button
  variant="contained"
  onClick={handleOpenEmailForm}
  sx={{
    background: cardGradient,
    color: 'white',
    fontWeight: 600,
    px: 4,
    py: 1.5,
    borderRadius: '12px',
    '&:hover': {
      background: cardGradient,
      opacity: 0.9,
    },
  }}
>
  Get PDF on Mail
</Button> */}
  

  {/* Download pdf report button */}
                <Button
                                variant="contained"
                                onClick={handleOpenDownloadForm}
                                sx={{
                                  background: cardGradient,
                                  color: 'white',
                                  fontWeight: 600,
                                  px: 4,
                                  py: 1.5,
                                  borderRadius: '12px',
                                  '&:hover': {
                                    background: cardGradient,
                                    opacity: 0.9,
                                  },
                                }}
                            >
                                Download PDF Report
                            </Button>
                            <Dialog
  open={openForm}
  onClose={handleCloseForm}
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: '24px',
      background: isDarkMode
        ? 'rgba(30, 41, 59, 0.2)' // dark mode semi-transparent
        : 'rgba(255, 255, 255, 0.2)', // light mode semi-transparent
      backdropFilter: 'blur(10px)', // 🔥 blur effect
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  }}
>
  <DialogTitle
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: isDarkMode ? '#f1f5f9' : '#0f172a',
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '0.5px',
    }}
  >
    <Typography 
    sx={{
      ml:20
    }} variant="h5" fontWeight={700}>
      Download Report
    </Typography>
    <IconButton
      onClick={handleCloseForm}
      sx={{
        color: isDarkMode ? '#f1f5f9' : '#0f172a',
        transition: '0.3s',
        '&:hover': { transform: 'rotate(90deg)', color: '#ef4444' },
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

 <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
  <DialogContent
    dividers
    sx={{
      border: 'none',
      background: 'transparent',
      px: 3,
      py: 2,
    }}
  >
    <Typography
      variant="body1"
      sx={{
        ml: 6,
        mb: 2,
        color: isDarkMode ? '#cbd5e1' : '#475569',
        fontSize: '0.95rem',
      }}
    >
      Please provide your details to download the full report.
    </Typography>

    {/* Form submission now goes to backend */}
    <Box
      component="form"
      onSubmit={handleBackendSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Grid container spacing={2} ml={5}>
        <Grid item xs={12}>
          <StyledTextField
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleFormChange}
            fullWidth
            required
            isDarkMode={isDarkMode}
            error={formErrors.name}
            helperText={formErrors.name && "Name is required."}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledTextField
            name="contactNumber"
            label="Contact Number"
            value={formData.contactNumber}
            onChange={handleFormChange}
            fullWidth
            required
            isDarkMode={isDarkMode}
            error={formErrors.contactNumber}
            helperText={formErrors.contactNumber && "Contact Number is required."}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledTextField
            sx={{ width: '465px' }}
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            required
            isDarkMode={isDarkMode}
            error={formErrors.email}
            helperText={formErrors.email && "Valid email is required."}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledTextField
            sx={{ width: '465px' }}
            name="description"
            label="Type your message here"
            value={formData.description}
            onChange={handleFormChange}
            multiline
            rows={4}
            isDarkMode={isDarkMode}
          />
        </Grid>
      </Grid>

      {/* Success/Error Message */}
      {successMsg && (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: successMsg.startsWith('✅') ? 'success.main' : 'error.main',
            fontWeight: 500,
          }}
        >
          {successMsg}
        </Typography>
      )}

      {/* Form Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          onClick={handleCloseForm}
          sx={{
            mr: 1,
            color: isDarkMode ? '#e2e8f0' : '#64748b',
            fontWeight: 500,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isFormValid}
          sx={{
            background: cardGradient,
            color: 'white',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textTransform: 'none',
            transition: '0.3s',
            '&:hover': { opacity: 0.9, transform: 'translateY(-2px)' },
            '&.Mui-disabled': { background: 'gray', color: 'white', opacity: 0.7 },
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </DialogContent>
</Dialog>
     </Dialog>

              </Box>
            </GlassPaper>
          </Grid>
        </Grid>

        {/* Graphical Representation Section */}
        <Box sx={{ mt: 6 }}>
          <GlassPaper elevation={0} isDarkMode={isDarkMode} sx={{ minWidth: { xs: '100%', md: 600 } }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="chart tabs">
                <Tab
                  label="Amortization Schedule"
                  icon={<Timeline />}
                  sx={{
                    color: isDarkMode ? '#ffffff' : '#374151',
                    '&.Mui-selected': {
                      color: isDarkMode ? '#60a5fa' : '#2563eb',
                    }
                  }}
                />
                <Tab
                  label="Payment Breakdown"
                  icon={<PieChart />}
                  sx={{
                    color: isDarkMode ? '#ffffff' : '#374151',
                    '&.Mui-selected': {
                      color: isDarkMode ? '#60a5fa' : '#2563eb',
                    }
                  }}
                />
                <Tab
                  label="Balance Over Time"
                  icon={<BarChart />}
                  sx={{
                    color: isDarkMode ? '#ffffff' : '#374151',
                    '&.Mui-selected': {
                      color: isDarkMode ? '#60a5fa' : '#2563eb',
                    }
                  }}
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" sx={{ mb: 3, color: isDarkMode ? '#ffffff' : '#374151' }}>
                Monthly Amortization Schedule
              </Typography>
              <Box sx={{ height: 400 }}>
                {amortizationData && (
                  <Bar
                    data={amortizationData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: 'Principal vs Interest Payments Over Time',
                          color: isDarkMode ? '#ffffff' : '#374151',
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" sx={{ mb: 3, color: isDarkMode ? '#ffffff' : '#374151' }}>
                Payment Breakdown
              </Typography>
              <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {paymentBreakdownData && (
                  <Pie
                    data={paymentBreakdownData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: 'Total Payment Breakdown',
                          color: isDarkMode ? '#ffffff' : '#374151',
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" sx={{ mb: 3, color: isDarkMode ? '#ffffff' : '#374151' }}>
                Loan Balance Over Time
              </Typography>
              <Box sx={{ height: 400 }}>
                {balanceOverTimeData && (
                  <Line
                    data={balanceOverTimeData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          display: true,
                          text: 'Remaining Loan Balance',
                          color: isDarkMode ? '#ffffff' : '#374151',
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </TabPanel>
          </GlassPaper>
        </Box>
      </Box>

      {/* PDF Preview Dialog */}
      <Dialog
        open={showPreview}
        onClose={handleClosePreview}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#1e293b',
          },
        }}
      >
      <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
          color: isDarkMode ? '#ffffff' : '#1e293b',
        }}>
          Loan Details Preview
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClosePreview}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              style={{ border: 'none' }}
              title="PDF Preview"
            />
          )}
        </DialogContent>
        <DialogActions sx={{
          backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
          justifyContent: 'center',
        }}>
          <Button
            onClick={handleDownloadPDF}
            variant="contained"
            sx={{
              background: cardGradient,
              color: 'white',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              '&:hover': {
                background: cardGradient,
                opacity: 0.9,
              },
            }}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calculator;
