/**
 * Backend proxy server for Copart API
 * This server handles API calls to avoid CORS issues
 */

import express from 'express';
import cors from 'cors';

// Use native fetch (Node.js 18+) or require node-fetch for older versions
// If you get an error, install node-fetch: npm install node-fetch
const fetch = globalThis.fetch;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const COPART_BASE_URL = 'https://b2b.copart.com';
const CLIENT_ID = 'b2b-sark-auto';
const CLIENT_SECRET = '3572bc86e1ee40a6ba186aa0ab2ae210';

// Store token and expiration time
let accessToken = null;
let tokenExpiresAt = null;

/**
 * Get OAuth2 access token
 */
const getAccessToken = async () => {
  // Check if we have a valid token
  if (accessToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  try {
    // Create Basic Auth header
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    // Try URL-encoded format first (OAuth2 standard)
    // The curl example shows --form but OAuth2 typically uses URL-encoded
    const response = await fetch(
      `${COPART_BASE_URL}/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        body: 'grant_type=client_credentials',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Auth error:', response.status, errorText);
      throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    
    // Set expiration time (subtract 60 seconds for safety margin)
    const expiresIn = (data.expires_in || 3600) * 1000;
    tokenExpiresAt = Date.now() + expiresIn - 60000;

    console.log('Access token obtained, expires in:', data.expires_in, 'seconds');
    return accessToken;
  } catch (error) {
    console.error('Error getting Copart access token:', error);
    throw error;
  }
};

/**
 * Generate UUID v4
 */
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Test connectivity to Copart API
 * @returns {Promise<Object>} Test results
 */
const testCopartConnection = async () => {
  const results = {
    oauth: { success: false, status: null, message: '' },
    instaquote: { success: false, status: null, message: '', data: null }
  };
  
  console.log('\n🔍 Testing Copart API connection...\n');
  
  try {
    // Test 1: Check if we can reach the OAuth endpoint
    console.log('Test 1: Testing OAuth token endpoint connectivity...');
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    const authResponse = await fetch(
      `${COPART_BASE_URL}/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        body: 'grant_type=client_credentials',
      }
    );

    console.log(`   Status: ${authResponse.status} ${authResponse.statusText}`);
    results.oauth.status = authResponse.status;
    
    if (authResponse.ok) {
      const authData = await authResponse.json();
      console.log('   ✅ OAuth endpoint is reachable!');
      console.log(`   Token type: ${authData.token_type}`);
      console.log(`   Expires in: ${authData.expires_in} seconds`);
      results.oauth.success = true;
      results.oauth.message = `Token obtained. Expires in ${authData.expires_in} seconds.`;
      
      // Test 2: Make a full InstaQuote call with example data
      console.log('\nTest 2: Testing InstaQuote endpoint with example data...');
      
      const testPayload = {
        transactionId: generateUUID(),
        adminInfo: {
          sellerCompanyCode: 'NWI',
          officeCode: 'MO24',
        },
        vehicleLocationSite: {
          address: {
            contact: {
              postalCode: '98338',
            },
          },
        },
        claimNumber: '000608216063',
        lossInfo: {
          lossType: 'H',
          primaryPointOfImpact: 'RR',
        },
        vehicleInformation: {
          vin: '5TEWN72N23Z207542',
          year: '2010',
          makeCode: 'Audi',
          model: 'Accord',
          odometerInfo: {
            odometerReading: '105235',
            odometerBrand: 'Inaccessible',
          },
        },
        valuation: {
          acv: '200',
          repairCost: 1000.0,
        },
        vehicleCondition: {
          drivable: 'Y',
          drivabilityRating: 'S',
          titleCategory: 'Bill of Sale',
        },
      };

      const quoteResponse = await fetch(
        `${COPART_BASE_URL}/v1/instaquote?sellerCompanyCode=NA`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authData.access_token}`,
            'Content-Type': 'application/json',
            'countryCode': 'USA',
          },
          body: JSON.stringify(testPayload),
        }
      );

      console.log(`   Status: ${quoteResponse.status} ${quoteResponse.statusText}`);
      results.instaquote.status = quoteResponse.status;
      
      const quoteData = await quoteResponse.json();
      
      if (quoteResponse.ok) {
        console.log('   ✅ InstaQuote endpoint is working!');
        console.log('   Response:', JSON.stringify(quoteData, null, 2));
        results.instaquote.success = true;
        results.instaquote.message = 'InstaQuote request successful';
        results.instaquote.data = quoteData;
      } else {
        console.log('   ⚠️  InstaQuote endpoint returned an error:');
        console.log('   Response:', JSON.stringify(quoteData, null, 2));
        results.instaquote.message = `Error: ${JSON.stringify(quoteData)}`;
        results.instaquote.data = quoteData;
      }
      
    } else {
      const errorText = await authResponse.text();
      console.log('   ❌ OAuth endpoint returned an error:');
      console.log(`   Response: ${errorText}`);
      results.oauth.message = `Error: ${errorText}`;
    }
    
  } catch (error) {
    console.error('   ❌ Connection test failed:', error.message);
    console.error('   Error details:', error);
    if (!results.oauth.message) results.oauth.message = error.message;
    if (!results.instaquote.message) results.instaquote.message = error.message;
  }
  
  console.log('\n✅ Connection test completed.\n');
  return results;
};

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Copart API proxy server is running' });
});

/**
 * Test endpoint - manually trigger connection test
 */
app.get('/api/test', async (req, res) => {
  try {
    const results = await testCopartConnection();
    res.json({ 
      status: 'ok', 
      message: 'Connection test completed',
      results: results
    });
  } catch (error) {
    res.status(500).json({ error: 'Test failed', message: error.message });
  }
});

/**
 * InstaQuote endpoint
 */
app.post('/api/instaquote', async (req, res) => {
  try {
    // Get access token
    const token = await getAccessToken();

    // Get form data from request
    const formData = req.body;

    // Build payload according to Copart's exact schema
    // Using NWI and MO24 as shown in the example
    const payload = {
      transactionId: generateUUID(),
      adminInfo: {
        sellerCompanyCode: 'NWI',
        officeCode: 'MO24',
      },
      vehicleLocationSite: {
        address: {
          contact: {
            postalCode: formData.postalCode,
          },
        },
      },
      claimNumber: formData.claimNumber || '',
      lossInfo: {
        lossType: formData.lossType,
        primaryPointOfImpact: formData.primaryPointOfImpact,
      },
      vehicleInformation: {
        vin: formData.vin,
        year: formData.year,
        makeCode: formData.makeCode,
        model: formData.model,
        odometerInfo: {
          odometerReading: formData.odometerReading,
          odometerBrand: formData.odometerBrand,
        },
      },
      valuation: {
        acv: formData.acv,
        repairCost: formData.repairCost,
      },
      vehicleCondition: {
        drivable: formData.drivable,
        drivabilityRating: formData.drivabilityRating,
        titleCategory: formData.titleCategory,
      },
    };

    console.log('Sending InstaQuote request:', JSON.stringify(payload, null, 2));

    // Make InstaQuote request
    const response = await fetch(
      `${COPART_BASE_URL}/v1/instaquote?sellerCompanyCode=NA`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'countryCode': 'USA',
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error('InstaQuote error:', response.status, responseData);
      return res.status(response.status).json({
        error: 'Copart API error',
        status: response.status,
        data: responseData,
      });
    }

    console.log('InstaQuote success:', responseData);
    res.json(responseData);
  } catch (error) {
    console.error('Error in InstaQuote endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Copart API proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`📨 InstaQuote endpoint: http://localhost:${PORT}/api/instaquote`);
  
  // Run connection test after server starts
  await testCopartConnection();
});

