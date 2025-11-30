/**
 * Copart B2B InstaQuote API Service
 * Calls the backend proxy server to avoid CORS issues
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Submit InstaQuote request to Copart via backend proxy
 * @param {Object} formData - Form data from user
 * @returns {Promise<Object>} Copart API response
 */
export const getInstaQuote = async (formData) => {
  try {
    console.log('Sending InstaQuote request to backend:', formData);
    
    const response = await fetch(`${API_BASE_URL}/api/instaquote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('InstaQuote error response:', {
        status: response.status,
        statusText: response.statusText,
        body: responseData,
      });
      throw new Error(
        `Copart API error: ${response.status} ${JSON.stringify(responseData)}`
      );
    }

    console.log('InstaQuote success response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error getting InstaQuote:', error);
    throw error;
  }
};

