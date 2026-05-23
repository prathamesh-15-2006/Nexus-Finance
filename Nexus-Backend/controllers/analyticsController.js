const { BetaAnalyticsDataClient } = require('@google-analytics/data');

// Initialize the client with the service account key
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: './ga-service-account.json',
});

// Property ID for Google Analytics
const PROPERTY_ID = '481853194';

// Function to get total users
exports.getTotalVisitors = async (req, res) => {
  try {
    // Define the request for total users
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2020-01-01', // From the beginning
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    // Extract the total users value
    const totalUsers = response.rows[0].metricValues[0].value;

    res.status(200).json({
      success: true,
      totalVisitors: parseInt(totalUsers),
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    // Check if it's a permission error
    if (error.message.includes('PERMISSION_DENIED')) {
      res.status(500).json({
        success: false,
        message: 'Google Analytics API not enabled or service account lacks permissions. Please enable the Google Analytics Data API in your Google Cloud Console.',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch analytics data',
        error: error.message,
      });
    }
  }
};

// Function to get daily visitors
exports.getDailyVisitors = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: 'yesterday',
          endDate: 'yesterday',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const dailyVisitors = response.rows[0].metricValues[0].value;

    res.status(200).json({
      success: true,
      dailyVisitors: parseInt(dailyVisitors),
    });
  } catch (error) {
    console.error('Error fetching daily visitors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch daily visitors',
      error: error.message,
    });
  }
};

// Function to get weekly visitors
exports.getWeeklyVisitors = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'yesterday',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const weeklyVisitors = response.rows[0].metricValues[0].value;

    res.status(200).json({
      success: true,
      weeklyVisitors: parseInt(weeklyVisitors),
    });
  } catch (error) {
    console.error('Error fetching weekly visitors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weekly visitors',
      error: error.message,
    });
  }
};

// Function to get monthly visitors
exports.getMonthlyVisitors = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'yesterday',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const monthlyVisitors = response.rows[0].metricValues[0].value;

    res.status(200).json({
      success: true,
      monthlyVisitors: parseInt(monthlyVisitors),
    });
  } catch (error) {
    console.error('Error fetching monthly visitors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly visitors',
      error: error.message,
    });
  }
};

// Function to get yearly visitors
exports.getYearlyVisitors = async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '365daysAgo',
          endDate: 'yesterday',
        },
      ],
      metrics: [
        {
          name: 'totalUsers',
        },
      ],
    });

    const yearlyVisitors = response.rows[0].metricValues[0].value;

    res.status(200).json({
      success: true,
      yearlyVisitors: parseInt(yearlyVisitors),
    });
  } catch (error) {
    console.error('Error fetching yearly visitors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch yearly visitors',
      error: error.message,
    });
  }
};
