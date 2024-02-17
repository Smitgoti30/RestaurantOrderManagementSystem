import React from "react";

function MenuAdmin() {
  const categories = [
      {
        _id: "64d953abec566f2858d97ff7",
        CategoryName: "Fresh Garden Greens",
        Description: "Experience the crisp and vibrant world",
        __v: 0,
      },
      {
        _id: "64d953ceec566f2858d97ffc",
        CategoryName: "Plant-Based Classics",
        Description:
          "Indulge in timeless comfort with our selection of hearty and satisfying plant based dishes.",
        __v: 0,
      },
      {
        _id: "64d95404ec566f2858d98006",
        CategoryName: "Artisan Veggie Pizzas",
        Description: "",
        __v: 0,
      },
      {
        _id: "64d95413ec566f2858d9800b",
        CategoryName: "Wholesome Bowls",
        Description:
          "Nourish your body and soul with our Wholesome Bowls, carefully curated to offer a harmonious blend",
        __v: 0,
      },
      {
        _id: "64dbff8a76efd5195a1ccf61",
        CategoryName: "Drinks",
        Description: "Coco",
        __v: 0,
      },
      {
        _id: "64dbff9976efd5195a1ccf66",
        CategoryName: "ABC",
        Description: "ABC",
        __v: 0,
      },
      {
        _id: "64dc4280fdb84485b8809474",
        CategoryName: "Chinese",
        Description: "chinese",
        __v: 0,
      },
    ],
    menuItems = [
      {
        _id: "64d954c8ec566f2858d98011",
        Category: "64d953ceec566f2858d97ffc",
        ItemName: "Veggie Burger",
        Description:
          "A hearty and flavorful burger patty made from a blend of vegetables, beans, and spices, served with all the classic fixings.",
        Price: 14.5,
        __v: 0,
      },
      {
        _id: "64d95561ec566f2858d98025",
        Category: "64d953ceec566f2858d97ffc",
        ItemName: "Vegetarian Chili",
        Description:
          "A hearty blend of beans, vegetables, and spices simmered in a rich tomato base, topped with shredded cheese and sour cream.",
        Price: 12.9,
        __v: 0,
      },
      {
        _id: "64d9560cec566f2858d98045",
        Category: "64d953abec566f2858d97ff7",
        ItemName: "Greek Salad",
        Description:
          "Crisp lettuce, cucumbers, tomatoes, red onions, Kalamata olives, and feta cheese, dressed with olive oil and oregano.",
        Price: 10.9,
        __v: 0,
      },
      {
        _id: "64d956b1ec566f2858d98057",
        Category: "64d953abec566f2858d97ff7",
        ItemName: "Quinoa and Chickpea Salad",
        Description:
          "Nutrient-rich quinoa, chickpeas, diced vegetables, and fresh herbs, tossed with a lemon-tahini dressing.",
        Price: 11.7,
        __v: 0,
      },
      {
        _id: "64d956d5ec566f2858d9805f",
        Category: "64d953abec566f2858d97ff7",
        ItemName: "Caprese Salad",
        Description:
          "Slices of fresh mozzarella, tomatoes, and basil leaves drizzled with extra virgin olive oil and balsamic reduction.",
        Price: 12.2,
        __v: 0,
      },
      {
        _id: "64d957f4ec566f2858d98097",
        Category: "64d95404ec566f2858d98006",
        ItemName: "Margherita Pizza",
        Description:
          "A classic thin-crust pizza topped with fresh tomato sauce, mozzarella cheese, sliced tomatoes, and basil leaves.",
        Price: 12.9,
        __v: 0,
      },
      {
        _id: "64d95813ec566f2858d9809f",
        Category: "64d95404ec566f2858d98006",
        ItemName: "Mediterranean Veggie Pizza",
        Description:
          "Thin crust loaded with roasted red peppers, artichoke hearts, olives, feta cheese, and a drizzle of olive oil.",
        Price: 14.5,
        __v: 0,
      },
      {
        _id: "64d95855ec566f2858d980af",
        Category: "64d95404ec566f2858d98006",
        ItemName: "Spinach and Mushroom White Pizza",
        Description:
          "A creamy garlic and ricotta cheese base topped with sautéed spinach, mushrooms, and a sprinkle of Parmesan.",
        Price: 15.7,
        __v: 0,
      },
      {
        _id: "64d95893ec566f2858d980bf",
        Category: "64d95413ec566f2858d9800b",
        ItemName: "Buddha Bowl",
        Description:
          "A nourishing bowl featuring a mix of quinoa, roasted sweet potatoes, avocado, mixed greens, and a variety of colorful vegetables.",
        Price: 16.5,
        __v: 0,
      },
      {
        _id: "64d958efec566f2858d980cf",
        Category: "64d95413ec566f2858d9800b",
        ItemName: "Mexican Fiesta Bowl",
        Description:
          "Black beans, rice, roasted corn, pico de gallo, guacamole, and shredded lettuce, all topped with a dollop of sour cream.",
        Price: 14.9,
        __v: 0,
      },
      {
        _id: "64d9593cec566f2858d980df",
        Category: "64d95413ec566f2858d9800b",
        ItemName: "Roasted Veggie Quinoa Bowl",
        Description:
          "Roasted seasonal vegetables served with fluffy quinoa, toasted almonds, and a balsamic reduction for a satisfying meal.",
        Price: 16.5,
        __v: 0,
      },
    ];
  return (
    <>
      <div>
        <div className="container">
          <h1>Menu Category</h1>
          <div className="contact">
            <form className="form" action="/addcategory" method="POST">
              <fieldset>
                <div className="menu-item">
                  <div className="contactform">
                    <div className="left">
                      <div className="input-fields">
                        <label for="CategoryName">Category Name:</label>
                        <input
                          type="text"
                          name="CategoryName"
                          id="CategoryName"
                          required
                        />
                      </div>
                      <div className="input-fields">
                        <label for="categoryDescription">Description:</label>
                        <textarea
                          name="Description"
                          id="categoryDescription"
                          rows="5"
                          cols="120"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input-fields btns">
                  <input
                    className="submit button"
                    type="submit"
                    value="ADD CATEGORY"
                  />
                </div>
              </fieldset>
            </form>
          </div>

          <h1>Menu Item</h1>
          <div className="contact">
            <form className="form" action="/addmenuitem" method="POST">
              <fieldset>
                <div className="menu-item">
                  <div className="contactform">
                    <div className="left">
                      <div className="input-fields">
                        <label for="Category">Category:</label>
                        <select name="Category" id="itemCategory" required>
                          {categories.map((category) => (
                            <option value={category}>
                              {category.CategoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input-fields">
                        <label for="ItemName">Item Name:</label>
                        <input
                          type="text"
                          name="ItemName"
                          id="ItemName"
                          required
                        />
                      </div>
                      <div className="input-fields">
                        <label for="Price">Price:</label>
                        <input
                          type="number"
                          name="Price"
                          id="Price"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                    <div className="right">
                      <div className="input-fields">
                        <label for="itemDescription">Description:</label>
                        <textarea
                          name="Description"
                          id="itemDescription"
                          rows="8"
                          cols="60"
                          required
                        ></textarea>
                      </div>
                      <div className="input-fields">
                        <label for="AvailableQuantity">Item Quantity:</label>
                        <input
                          type="number"
                          name="AvailableQuantity"
                          id="AvailableQuantity"
                          step="0.1"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-fields btns">
                  <input
                    className="submit button"
                    type="submit"
                    value="ADD TO MENU"
                  />
                </div>
              </fieldset>
            </form>
          </div>

          <h1>Menu</h1>
          <div className="contact">
            <div className="form">
              <fieldset>
                {menuItems.map((menuItem) => (
                  <div className="product-card">
                    <div className="product-info">
                      <h3 className="product-title"> {menuItem.ItemName}</h3>
                      <p className="product-description">{menuItem.Description}</p>
                      <p className="product-price">$ {menuItem.Price.toFixed(2)}</p>
                    </div>
                    <div className="input-fields btns">
                      <form action="/removeitem" method="POST">
                        <input
                          type="hidden"
                          name="ItemId"
                          value=" ${menuItem._id}"
                        />
                        <button className="btn remove-button" type="submit">
                          REMOVE
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
                <br />
                <div className="input-fields btns">
                  <form action="/pdf" method="POST">
                    <input
                      className="submit button"
                      type="submit"
                      value="Print Menu"
                    />
                  </form>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuAdmin;
