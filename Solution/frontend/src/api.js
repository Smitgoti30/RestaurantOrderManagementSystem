const BASE_URL = "http://localhost:4000";

async function getMenu() {
  const response = await fetch(`${BASE_URL}/getAllMenu`);
  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }
  return response.json();
}

async function getAllCategory() {
  const response = await fetch(`${BASE_URL}/getAllCategory`);
  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }
  return response.json();
}

async function addCategory(categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/addCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add category");
  }
}

async function uploadFile(data){
  try {
    console.log("data",data);
    const response = await fetch(`${BASE_URL}/addMenu/fileupload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: data,
    });
    if (!response.ok) {
      throw new Error("Failed to add image");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add image");
  }
}

async function getCategory(categoryId) {
  try {
    const response = await fetch(`${BASE_URL}/getCategory/${categoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch category");
  }
}

async function updateCategory(categoryId, categoryData) {
  try {
    const response = await fetch(`${BASE_URL}/updateCategory/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) {
      throw new Error("Failed to update category");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update category");
  }
}

async function addMenu( menuData) {
  try {
    console.log(menuData);
    const response = await fetch(`${BASE_URL}/addMenu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add category");
  }
}

async function getMenuItem(itemId) {
    try {
      const response = await fetch(`${BASE_URL}/getMenuItem/${itemId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch category");
    }
  }

async function updateMenuItem( itemId, itemData) {
  try {
    const response = await fetch(
      `${BASE_URL}/updateMenuItem/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add itemData");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add itemData");
  }
}

async function deleteMenuItem(itemId) {
    try {
      const response = await fetch(
        `${BASE_URL}/deleteMenuItem/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete item");
    }
  }
  

export {
  getMenu,
  getAllCategory,
  addCategory,
  getCategory,
  updateCategory,
  addMenu,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
  uploadFile
};
