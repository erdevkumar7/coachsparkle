import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  useTLS: true
});

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { socket_id, channel_name } = req.body;
    
    // Validate user authentication (you should implement proper auth check)
    const auth = pusher.authenticate(socket_id, channel_name);
    res.send(auth);
  } catch (error) {
    console.error('Pusher auth error:', error);
    res.status(403).send('Forbidden');
  }
}