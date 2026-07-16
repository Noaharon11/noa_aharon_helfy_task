const API_URL = "http://localhost:4000/api/tasks";

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getTasks() {
  const response = await fetch(API_URL);
  return handleResponse(response);
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return handleResponse(response);
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

export async function toggleTask(id) {
  const response = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });

  return handleResponse(response);
}