import { gql } from "@apollo/client";
import client from "./apolloClient"; // Assuming you have configured Apollo Client

const GET_ALL_MENU = gql`
  query GetAllMenu {
    getAllMenus {
      _id
      name
      description
      price
      image
      category_name
    }
  }
`;

const GET_ALL_CATEGORY = gql`
  query GetAllCategory {
    getAllCategories {
      _id
      category_name
      description
      status
    }
  }
`;

const ADD_CATEGORY = gql`
  mutation AddCategory($category_name: String!, $description: String!) {
    addCategory(category_name: $category_name, description: $description) {
      _id
      category_name
      description
      status
    }
  }
`;

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      _id
      category_name
      description
      status
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $category_name: String!
    $description: String!
  ) {
    updateCategory(
      id: $id
      category_name: $category_name
      description: $description
    ) {
      _id
      category_name
      description
      status
    }
  }
`;

const UPDATE_CATEGORY_STATUS = gql`
  mutation UpdateCategory($id: ID!, $status: Boolean!) {
    updateCategory(id: $id, status: $status) {
      _id
      status
    }
  }
`;

const GET_MENU_ITEM = gql`
  query GetMenuItem($id: ID!) {
    getMenuItem(id: $id) {
      _id
      name
      description
      price
      image
      category_name
    }
  }
`;

const ADD_MENU_ITEM = gql`
  mutation AddMenuItem($menuData: MenuInput!) {
    addMenuItem(menuData: $menuData) {
      _id
      name
      description
      price
      image
      category_name
    }
  }
`;

const DELETE_MENU_ITEM = gql`
  mutation DeleteMenuItem($id: ID!) {
    deleteMenuItem(id: $id) {
      _id
      name
      description
      price
      image
      category_name
    }
  }
`;

const UPDATE_MENU_ITEM = gql`
  mutation UpdateMenuItem($id: ID!, $menuData: MenuInput!) {
    updateMenuItem(id: $id, menuData: $menuData) {
      _id
      name
      description
      price
      image
      category_name
    }
  }
`;

// Define other GraphQL queries and mutations similarly

async function getMenu() {
  try {
    const { data } = await client.query({ query: GET_ALL_MENU });
    return data.getAllMenus;
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    throw new Error("Failed to fetch menu");
  }
}

async function getAllCategory() {
  try {
    const { data } = await client.query({ query: GET_ALL_CATEGORY });
    return data.getAllCategories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

async function addCategory(categoryData) {
  try {
    const { data } = await client.mutate({
      mutation: ADD_CATEGORY,
      variables: categoryData,
    });
    return data.addCategory;
  } catch (error) {
    console.error("Failed to add category:", error);
    throw new Error("Failed to add category");
  }
}

async function getCategory(id) {
  try {
    const { data } = await client.query({
      query: GET_CATEGORY,
      variables: { id },
    });
    return data.getCategory;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    throw new Error("Failed to fetch category");
  }
}

async function updateCategory(id, categoryData) {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_CATEGORY,
      variables: { id, ...categoryData },
    });
    return data.updateCategory;
  } catch (error) {
    console.error("Failed to update category:", error);
    throw new Error("Failed to update category");
  }
}

async function updateCategoryStatus(id, status) {
  console.log(id);
  console.log(status);
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_CATEGORY_STATUS,
      variables: { id, status },
    });
    console.log(id);
    console.log(status);
    console.log(data.updateCategoryStatus);
    return data.updateCategoryStatus;
  } catch (error) {
    console.error("Failed to update category:", error);
    throw new Error("Failed to update category");
  }
}

async function getMenuItem(id) {
  try {
    const { data } = await client.query({
      query: GET_MENU_ITEM,
      variables: { id },
    });
    return data.getMenuItem;
  } catch (error) {
    console.error("Failed to fetch menu item:", error);
    throw new Error("Failed to fetch menu item");
  }
}

async function addMenuItem(menuData) {
  try {
    const { data } = await client.mutate({
      mutation: ADD_MENU_ITEM,
      variables: { menuData },
    });
    return data.addMenuItem;
  } catch (error) {
    console.error("Failed to add menu item:", error);
    throw new Error("Failed to add menu item");
  }
}

async function deleteMenuItem(id) {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_MENU_ITEM,
      variables: { id },
    });
    return data.deleteMenuItem;
  } catch (error) {
    console.error("Failed to delete menu item:", error);
    throw new Error("Failed to delete menu item");
  }
}

async function updateMenuItem(id, menuData) {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_MENU_ITEM,
      variables: { id, menuData },
    });
    return data.updateMenuItem;
  } catch (error) {
    console.error("Failed to update menu item:", error);
    throw new Error("Failed to update menu item");
  }
}

async function addMenu(menuData) {
  try {
    // Your implementation to add menu data
  } catch (error) {
    console.error("Failed to add menu:", error);
    throw new Error("Failed to add menu");
  }
}

// Define other API functions using similar patterns

export {
  getMenu,
  getAllCategory,
  addCategory,
  getCategory,
  updateCategory,
  updateCategoryStatus,
  getMenuItem,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  addMenu,
  // Export other API functions
};
