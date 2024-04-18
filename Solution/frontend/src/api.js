import { gql,useMutation } from "@apollo/client";
import client from "./apolloClient"; // Assuming you have configured Apollo Client
import { loadStripe } from '@stripe/stripe-js';

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
  mutation UpdateCategoryStatus(
    $updateCategoryStatusId: ID!
    $status: Boolean!
  ) {
    updateCategoryStatus(id: $updateCategoryStatusId, status: $status) {
      _id
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

const ADD_MENU = gql`
  mutation AddMenu($price: Float!, $image: String!, $categoryName: String!, $name: String!, $description: String!) {
    addMenu(price: $price, image: $image, category_name: $categoryName, name: $name, description: $description) {
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
mutation UpdateMenuItem($id: ID!, $name: String, $description: String, $price: Float, $image: String, $categoryName: String) {
  updateMenuItem(id: $id, name: $name, description: $description, price: $price, image: $image, category_name: $categoryName) {
    _id
    name
    description
    price
  }
}`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput, $items: [OrderItemInput]) {
    createOrder(order: $order, items: $items) {
      _id
      status
      type
      table_number
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

async function addOrder(orderData) {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_ORDER,
      variables: orderData,
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

async function updateCategoryStatus(updateCategoryStatusId, status) {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_CATEGORY_STATUS,
      variables: { updateCategoryStatusId, status: Boolean(status) },
    });
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

async function addMenu(menuData) {
  try {
    const { data } = await client.mutate({
      mutation: ADD_MENU,
        variables: {
          price: menuData.price,
          image: menuData.image, 
          categoryName: menuData.category_name,
          name: menuData.name,
          description: menuData.description
        },
    });
    return data.addMenu;
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

async function updateMenuItem(menuData) {
  console.log(menuData);
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_MENU_ITEM,
      variables: {
          id:menuData.id,
          name: menuData.name,
          description: menuData.description,
          price: menuData.price,
       },
    });
    return data.UpdateMenuItem;
  } catch (error) {
    console.error("Failed to update menu item:", error);
    throw new Error("Failed to update menu item");
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
  deleteMenuItem,
  updateMenuItem,
  addMenu,
  addOrder,
};
