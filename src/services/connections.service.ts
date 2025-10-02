import { supabase } from '../lib/supabase';

class ConnectionsService {
  async getConnections(userId: string) {
    const { data, error } = await supabase
      .from('connections')
      .select(`
        id,
        user_id_1,
        user_id_2,
        connected_at,
        profile1:profiles!connections_user_id_1_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        ),
        profile2:profiles!connections_user_id_2_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        )
      `)
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`)
      .order('connected_at', { ascending: false });

    if (error) throw error;

    return data.map(conn => {
      const isUser1 = conn.user_id_1 === userId;
      return {
        id: conn.id,
        connected_at: conn.connected_at,
        profile: isUser1 ? conn.profile2 : conn.profile1,
      };
    });
  }

  async getConnectionRequests(userId: string) {
    const { data, error } = await supabase
      .from('connection_requests')
      .select(`
        *,
        requester:profiles!connection_requests_requester_id_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        )
      `)
      .eq('requestee_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getSentRequests(userId: string) {
    const { data, error } = await supabase
      .from('connection_requests')
      .select(`
        *,
        requestee:profiles!connection_requests_requestee_id_fkey(
          id,
          full_name,
          display_name,
          occupation,
          company,
          avatar_url
        )
      `)
      .eq('requester_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async sendConnectionRequest(requesterId: string, requesteeId: string, message?: string) {
    const { data, error } = await supabase
      .from('connection_requests')
      .insert({
        requester_id: requesterId,
        requestee_id: requesteeId,
        message,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async acceptConnectionRequest(requestId: string, userId: string) {
    const { data: request, error: fetchError } = await supabase
      .from('connection_requests')
      .select('*')
      .eq('id', requestId)
      .eq('requestee_id', userId)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!request) throw new Error('Request not found');

    const [id1, id2] = [request.requester_id, request.requestee_id].sort();

    const { error: connError } = await supabase
      .from('connections')
      .insert({
        user_id_1: id1,
        user_id_2: id2,
      });

    if (connError) throw connError;

    const { error: updateError } = await supabase
      .from('connection_requests')
      .update({
        status: 'accepted',
        responded_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    if (updateError) throw updateError;

    await this.incrementConnectionCount(request.requester_id);
    await this.incrementConnectionCount(request.requestee_id);
  }

  async rejectConnectionRequest(requestId: string, userId: string) {
    const { error } = await supabase
      .from('connection_requests')
      .update({
        status: 'rejected',
        responded_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .eq('requestee_id', userId);

    if (error) throw error;
  }

  async removeConnection(userId: string, otherUserId: string) {
    const [id1, id2] = [userId, otherUserId].sort();

    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('user_id_1', id1)
      .eq('user_id_2', id2);

    if (error) throw error;

    await this.decrementConnectionCount(userId);
    await this.decrementConnectionCount(otherUserId);
  }

  async isConnected(userId: string, otherUserId: string): Promise<boolean> {
    const [id1, id2] = [userId, otherUserId].sort();

    const { data, error } = await supabase
      .from('connections')
      .select('id')
      .eq('user_id_1', id1)
      .eq('user_id_2', id2)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }

  async getMutualConnections(userId: string, otherUserId: string) {
    const { data: userConnections } = await supabase
      .from('connections')
      .select('user_id_1, user_id_2')
      .or(`user_id_1.eq.${userId},user_id_2.eq.${userId}`);

    const { data: otherConnections } = await supabase
      .from('connections')
      .select('user_id_1, user_id_2')
      .or(`user_id_1.eq.${otherUserId},user_id_2.eq.${otherUserId}`);

    if (!userConnections || !otherConnections) return [];

    const userConnectionIds = new Set(
      userConnections.flatMap(c => [c.user_id_1, c.user_id_2]).filter(id => id !== userId)
    );

    const mutualIds = otherConnections
      .flatMap(c => [c.user_id_1, c.user_id_2])
      .filter(id => id !== otherUserId && userConnectionIds.has(id));

    return Array.from(new Set(mutualIds));
  }

  private async incrementConnectionCount(userId: string) {
    await supabase
      .from('profiles')
      .update({ connection_count: supabase.raw('connection_count + 1') as any })
      .eq('id', userId);
  }

  private async decrementConnectionCount(userId: string) {
    await supabase
      .from('profiles')
      .update({ connection_count: supabase.raw('GREATEST(connection_count - 1, 0)') as any })
      .eq('id', userId);
  }
}

export const connectionsService = new ConnectionsService();
