export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
  internal_notes?: string;
  response_email?: string;
  response_sent_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: number;
  error?: string;
}

const API_BASE_URL = "/api/contacts";

export async function submitContact(
  contact: Contact,
): Promise<ContactResponse> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || null,
        subject: contact.subject,
        message: contact.message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to submit contact";
    console.error("Error submitting contact:", error);
    throw new Error(errorMessage);
  }
}

export async function getAllContacts(): Promise<Contact[]> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (!Array.isArray(data)) {
      console.warn("getAllContacts returned non-array response:", data);
      return [];
    }

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch contacts";
    console.error("Error fetching contacts:", error);
    throw new Error(errorMessage);
  }
}

export async function updateContactStatus(
  id: number,
  status: string,
): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to update contact status";
    console.error("Error updating contact status:", error);
    throw new Error(errorMessage);
  }
}

export async function addInternalNote(
  id: number,
  notes: string,
): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ internal_notes: notes }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to add notes";
    console.error("Error adding notes:", error);
    throw new Error(errorMessage);
  }
}

export async function sendResponseEmail(
  id: number,
  responseEmail: string,
): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/respond`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ response_email: responseEmail }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send response";
    console.error("Error sending response:", error);
    throw new Error(errorMessage);
  }
}

export async function deleteContact(id: number): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete contact";
    console.error("Error deleting contact:", error);
    throw new Error(errorMessage);
  }
}
