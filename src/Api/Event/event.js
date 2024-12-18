import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/api/event/';

export const CreateEvent = async (eventData) => {
  const authToken = Cookies.get('authToken');
  try {
    const response = await axios.post(
      `${API_URL}eventdetails`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    throw error;
  }
};


export const getLiveEvent = async () => {
  try {
    console.log("CALLING LIVE EVENTS FETCH");
    const response = await axios.get(`${API_URL}getLiveEvents`, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`,
      }
    });

    const { liveEvents, upcomingEvents } = response.data;
    console.log('Live Events:', liveEvents);
    console.log('Upcoming Events:', upcomingEvents);

    return { liveEvents, upcomingEvents };

  } catch (error) {
    console.error('Error fetching live events:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


export const getEventCreatedByMe = async() =>{
  try {
    const response = await axios.get(`${API_URL}mineEvent`,{
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetching user event:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
}