
export interface CompanionData {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}

export interface CompanionResponse {
    id: string;
    created_at: string;
    name: string;
    subject: string;
    topic: string;
    style: string;
    voice: string;
    duration: number;
    author: string;
  
}

export interface SessionHistoryQuery{
  user_id: string;
}

export interface SessionHistoryData {
  companion_id: string;
  user_id: string;
}

export interface SessionHistoryResponse {
  id: string;
  created_at: string;
  companion_id: string;
  user_id: string;
}

export const createCompanion = async (
    formData: CompanionData, 
    token: string): Promise<CompanionResponse> => {

    // console.log("Token", token)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/supabase/create-companion/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error("Failed to create companion");
    }

    return res.json();
};

export const getAllCompanions = async (
    // token: string,
    limit: number,
    page: number,
    subject?: string,
    topic?: string
): Promise<CompanionResponse[]> => {
    const params = new URLSearchParams();
  
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());
  
    if (subject) params.append("subject", subject);
    if (topic) params.append("topic", topic);
  
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/supabase/companions/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch companions");
    }
  
    return res.json();
};
  
export const getCompanionById = async (
  id: string,
  // token?: string
): Promise<CompanionResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/supabase/companions/${id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch companion");
  }

  return res.json();
};

export const addToSessionHistory = async (
  companionId: string,
  token: string
): Promise<SessionHistoryResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/supabase/sessions/add/${companionId}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ companion_id: companionId }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add to session history");
  }

  return res.json();
};

export const getRecentSessions = async (
  token: string,
  limit: number,
): Promise<CompanionResponse[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/supabase/sessions/recent/?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recent sessions");
  }

  return res.json();
};

export const getUserSessions = async (
  userId: string,
  // limit = 10
): Promise<SessionHistoryQuery[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/supabase/sessions/user/${userId}/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user sessions");
  }

  return res.json();
};

export const getUserCompanions = async (
  userId: string,
): Promise<CompanionResponse[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/supabase/user/companions/${userId}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user companions");
  }

  return res.json();
};

export const NewCompanionPermissions = async (token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/supabase/companion-permissions/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to check permissions");
  }

  return res.json();
};

