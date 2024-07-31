export async  function POST(request) {
  const { card } = request.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract the JWT token

  if (!card || !token) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const response = await axios.post('https://grupo5.devcorezulia.lat/cardcraft-backend/public/save-card.php', { card }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error guardando la carta:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
