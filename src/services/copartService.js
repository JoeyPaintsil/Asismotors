/**
 * Copart B2B InstaQuote API Service
 * Calls the backend proxy server to avoid CORS issues
 */

// Use relative path for API calls - Vite proxy will handle routing
// This works for both localhost and ngrok
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Submit InstaQuote request to Copart via backend proxy
 * @param {Object} formData - Form data from user
 * @returns {Promise<Object>} Copart API response
 */
export const getInstaQuote = async (formData) => {
  try {
    console.log('Sending InstaQuote request to backend:', formData);
    console.log('API URL:', `${API_BASE_URL}/api/instaquote`);
    
    const response = await fetch(`${API_BASE_URL}/api/instaquote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: await response.text() || 'Unknown error' };
      }
      console.error('InstaQuote error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
      });
      throw new Error(
        `Copart API error: ${response.status} ${JSON.stringify(errorData)}`
      );
    }

    const responseData = await response.json();
    console.log('InstaQuote success response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error getting InstaQuote:', error);
    
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(
        `Cannot connect to server. Please make sure the backend server is running on ${API_BASE_URL}`
      );
    }
    
    throw error;
  }
};

