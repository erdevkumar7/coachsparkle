import { NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
});

export async function POST(request) {
    console.log('puser route Called')
  try {
     // Pusher sends data as form data, not JSON
    const formData = await request.formData();
    const socket_id = formData.get('socket_id');
    const channel_name = formData.get('channel_name');
    
    console.log('Form data received:', { socket_id, channel_name });

    // Get the authorization token from headers
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    console.log('Token received:', token ? 'YES' : 'NO'); 

    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication token required' },
        { status: 401 }
      );
    }
    
    // For private channels, we need to authorize the user
    if (channel_name.startsWith('private-')) {
      // Extract user ID from channel name (private-chat.123 -> user ID 123)
      const userId = channel_name.split('.')[1];

      console.log('userId', userId)
      
      const authResponse = pusher.authorizeChannel(socket_id, channel_name, {
        user_id: userId,
        user_info: {
          name: 'Chat User'
        }
      });
      
      return NextResponse.json(authResponse);
    }
    
    // For presence channels (if you use them in the future)
    if (channel_name.startsWith('presence-')) {
      // You would typically decode the JWT token here to get user info
      const userData = {
        user_id: `user-${Date.now()}`, // Replace with actual user ID from token
        user_info: {
          name: 'Chat User'
        }
      };
      
      const authResponse = pusher.authorizeChannel(socket_id, channel_name, userData);
      return NextResponse.json(authResponse);
    }
    
    return NextResponse.json(
      { error: 'Invalid channel type' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 403 }
    );
  }
}

// Add OPTIONS method for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}