export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
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

export async function submitContact(contact: Contact): Promise<ContactResponse> {
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
    const errorMessage = error instanceof Error ? error.message : "Failed to submit contact";
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
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch contacts";
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
    const errorMessage = error instanceof Error ? error.message : "Failed to update contact status";
    console.error("Error updating contact status:", error);
    throw new Error(errorMessage);
  }
}
