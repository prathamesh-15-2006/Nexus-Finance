import React, { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Banner from '../../asset/bgimgs/home.webp';
import BusinessIntroSection from './BusinessIntroSection';
import FinanceOptionsSection from './FinanceOptionSection';
import MortgageLoanSection from './MortgageLoanSection';
import FinanceOption from './FinanceOption';
import ProcessStepsSection from './ProcessStapsSection';
import { createDraftLead } from '../../services/api';
import { gradients } from '../../styles/gradients';

const cardGradient = "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)";

export default function Sammer() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", contact: "" });
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ausPhoneRegex = /^(?:\+?61|0)4(?:[ -]?[0-9]){8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!ausPhoneRegex.test(formData.contact)) {
      setPhoneError(true);
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError(true);
      return;
    }

    setPhoneError(false);
    setEmailError(false);

    localStorage.setItem('loanSelectionData', JSON.stringify({
      fullName: formData.fullName,
      contact: formData.contact,
      email: formData.email
    }));

    setShowForm(false);

    try {
      await createDraftLead({
        loan_type: 'property',
        full_name: formData.fullName,
        contact_number: formData.contact,
        email: formData.email,
        hidden_field: ""
      });
    } catch (error) {
      console.error('Failed to create draft lead:', error);
    }

    // Open ApplicationForm in new tab
    window.open('/apply?loanType=property', '_blank');
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "110vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: "20px",
              padding: "40px",
              display: "inline-block",
              maxWidth: "10000px",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "2.25rem", sm: "3rem" },
                fontWeight: 700,
                mb: 5,
                textAlign: "center",
                ...gradients.primaryText,
              }}
            >
              Reliable Commercial Property Finance -Wide
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
               onClick={() => setShowForm(true)}
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: "linear-gradient(135deg, #00005C 0%, #5252FF 40%, #7927A5 70%, #FB6FAE 100%)",
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Started Today
              </Button>
            </Box>
          </Box>
        </Container>

        <style>
          {`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInDown {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </Box>

      <BusinessIntroSection />
      <FinanceOptionsSection />
      <MortgageLoanSection />
      <FinanceOption />
      <ProcessStepsSection />

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-gray-900 rounded-[2rem] shadow-2xl w-full max-w-xl border flex flex-col max-h-[100vh]"
            >
              <div className="p-6 md:p-8 border-b border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold">Loan Inquiry</h3>
                <p className="text-sm opacity-70">Fill out the form below to continue.</p>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <form id="loan-form" onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Selected Loan</label>
                    <input
                      type="text"
                      value="Business Loan Against Property"
                      readOnly
                      className="w-full p-3 rounded-xl border bg-gray-50 border-gray-200 text-[#7b49ff] outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#7b49ff] outline-none text-black"
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Contact Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 0400 000 000"
                      className={`w-full p-3 rounded-xl border outline-none transition-all ${
                        phoneError
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#7b49ff]'
                      } bg-white text-black`}
                      onChange={(e) => {
                        setPhoneError(false);
                        setFormData({...formData, contact: e.target.value});
                      }}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-xs mt-1 font-semibold italic">
                        * Please enter a valid n phone number.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="name@example.com"
                      className={`w-full p-3 rounded-xl border outline-none transition-all bg-white text-black ${
                        emailError
                          ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-2 focus:ring-[#7b49ff]'
                      }`}
                      onChange={(e) => {
                        setEmailError(false);
                        setFormData({...formData, email: e.target.value});
                      }}
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1 font-semibold italic">
                        * Please enter a valid email address.
                      </p>
                    )}
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="loan-form"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#7b49ff] text-white font-bold hover:bg-[#6a47b8] shadow-lg shadow-purple-500/20 transition-all"
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
