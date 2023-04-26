/**
 * Helper function to fetch channel data from public folder
 */
export default async function handler(req, res) {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000';
    const url = `${baseUrl}/static/channeldata.json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' });
    }
}
