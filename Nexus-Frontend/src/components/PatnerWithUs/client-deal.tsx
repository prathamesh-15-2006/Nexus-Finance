import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  MonetizationOn as MoneyIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Send as SendIcon,
} from '@mui/icons-material';

interface ClientDealFormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  loanAmount: number;
  clientRevenue: number;
  clientTimeInBusiness: string;
  clientIndustry: string;
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientContactNo: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function ClientDealForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState<ClientDealFormData>({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    loanAmount: 0,
    clientRevenue: 0,
    clientTimeInBusiness: '',
    clientIndustry: '',
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientContactNo: ''
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const updateField = (field: keyof ClientDealFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!validatePhone(formData.contactNo)) {
      newErrors.contactNo = 'Please enter a valid umber';
    }
    if (formData.loanAmount <= 0) newErrors.loanAmount = 'Loan amount must be greater than 0';
    if (formData.clientRevenue <= 0) newErrors.clientRevenue = 'Client monthly revenue must be greater than 0';
    if (!formData.clientTimeInBusiness.trim()) newErrors.clientTimeInBusiness = 'Client\'s time in business is required';
    if (!formData.clientIndustry.trim()) newErrors.clientIndustry = 'Client\'s industry type is required';
    if (!formData.clientFirstName.trim()) newErrors.clientFirstName = 'Client first name is required';
    if (!formData.clientLastName.trim()) newErrors.clientLastName = 'Client last name is required';
    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'Client email is required';
    } else if (!validateEmail(formData.clientEmail)) {
      newErrors.clientEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Replace emailjs with fetch to backend
      const response = await fetch('/api/deals/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting deal:', error);
      alert('Failed to submit deal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
            Submit A Deal
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Got a Scenario? Fill in all the details you have and we'll jump on it ASAP so you don't miss out on the best rates. We'll get your accreditation completed as a partner simultaneously so that you won't miss out.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Your Details Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Your Details
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please provide your contact information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    value={formData.contactNo}
                    onChange={(e) => updateField('contactNo', e.target.value)}
                    error={!!errors.contactNo}
                    helperText={errors.contactNo}
                    placeholder="+61 412 345 678"
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Scenario Details Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <MoneyIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Scenario Details
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Provide details about the loan scenario
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Loan Amount ($)"
                    type="number"
                    value={formData.loanAmount || ''}
                    onChange={(e) => updateField('loanAmount', Math.max(0, parseFloat(e.target.value) || 0))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Avg. Monthly Revenue ($)"
                    type="number"
                    value={formData.clientRevenue || ''}
                    onChange={(e) => updateField('clientRevenue', Math.max(0, parseFloat(e.target.value) || 0))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ width: 200 }} required>
                    <InputLabel id="client-time-in-business-label">Client's Time in Business</InputLabel>
                    <Select
                      label="client-time-in-business-label"
                      value={formData.clientTimeInBusiness}
                      onChange={(e) => updateField('clientTimeInBusiness', e.target.value)}
                    >
                      <MenuItem value="0-1-years">0-1 Years</MenuItem>
                      <MenuItem value="1-3-years">1-3 years</MenuItem>
                      <MenuItem value="3-5-years">3-5 years</MenuItem>
                      <MenuItem value="5-10-years">5-10 years</MenuItem>
                      <MenuItem value="10+-years">10+ years</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client's Industry Type"
                    value={formData.clientIndustry}
                    onChange={(e) => updateField('clientIndustry', e.target.value)}
                    placeholder="e.g., Retail, Hospitality, Construction"
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Client Details Section */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BusinessIcon color="primary" sx={{ mr: 2 }} />
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Client Details
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Information about your client
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client First Name"
                    value={formData.clientFirstName}
                    onChange={(e) => updateField('clientFirstName', e.target.value)}
                    error={!!errors.clientFirstName}
                    helperText={errors.clientFirstName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Last Name"
                    value={formData.clientLastName}
                    onChange={(e) => updateField('clientLastName', e.target.value)}
                    error={!!errors.clientLastName}
                    helperText={errors.clientLastName}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Email Address"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => updateField('clientEmail', e.target.value)}
                    error={!!errors.clientEmail}
                    helperText={errors.clientEmail}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Client Contact Number"
                    value={formData.clientContactNo}
                    onChange={(e) => updateField('clientContactNo', e.target.value)}
                    placeholder="+61 412 345 678"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting ? undefined : <SendIcon />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Now'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Success Dialog */}
      <Dialog open={isSubmitted} onClose={() => setIsSubmitted(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h4" color="success.main" fontWeight="bold">
            Deal Submitted Successfully!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reference #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6" gutterBottom>
            What Happens Next?
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Chip label="1" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary="Deal Review"
                secondary="Our team will review the deal details within 24 hours"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="2" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary="Partner Accreditation"
                secondary="We'll process your partner accreditation simultaneously"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="3" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary="Rate Matching"
                secondary="We'll find the best rates and get back to you ASAP"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chip label="4" color="primary" size="small" />
              </ListItemIcon>
              <ListItemText
                primary="Client Contact"
                secondary="We'll reach out to your client with the best offers"
              />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => window.location.reload()}
            variant="contained"
            size="large"
            sx={{ px: 4 }}
          >
            Submit Another Deal
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
