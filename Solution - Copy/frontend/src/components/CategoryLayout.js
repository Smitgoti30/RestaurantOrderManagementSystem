import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import "bootstrap/dist/css/bootstrap.css";

const menuItems = [
    {
        "category_id": "1",
        "category_name": "Appetizers",
        "description": "Start your meal with our delicious appetizers.",
        "status": "active",
        "items": [
            {
                "name": "Spinach Artichoke Dip",
                "description": "Creamy blend of spinach, artichokes, and cheese, served with tortilla chips.",
                "price": 15,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Buffalo Wings",
                "description": "Crispy chicken wings tossed in spicy buffalo sauce, served with celery sticks and blue cheese dressing.",
                "price": 10,
                "image": "Appetizers2.jpg"
            },
            {
                "name": "Mozzarella Sticks",
                "description": "Breaded mozzarella cheese sticks, fried until golden brown, served with marinara sauce.",
                "price": 22.5,
                "image": "Appetizers1.jpg"
            }
        ]
    },

    {
        "category_id": "2",
        "category_name": "Main Courses",
        "description": "Satisfy your hunger with our flavorful main courses.",
        "status": "active",
        "items": [
            {
                "name": "Grilled Salmon",
                "description": "Fresh Atlantic salmon fillet, grilled to perfection, served with seasonal vegetables and rice.",
                "price": 8,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Chicken Alfredo",
                "description": "Grilled chicken breast served on a bed of fettuccine pasta tossed in creamy Alfredo sauce.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Classic Burger",
                "description": "Juicy beef patty topped with lettuce, tomato, onion, and your choice of cheese, served with fries.",
                "price": 25,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "3",
        "category_name": "Desserts",
        "description": "Indulge your sweet tooth with our delightful desserts.",
        "status": "active",
        "items": [
            {
                "name": "New York Cheesecake",
                "description": "Rich and creamy cheesecake on a graham cracker crust, topped with strawberry compote.",
                "price": 8.55,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Chocolate Lava Cake",
                "description": "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
                "price": 14,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Tiramisu",
                "description": "Layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
                "price": 11.1,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "4",
        "category_name": "Beverages",
        "description": "Quench your thirst with our refreshing beverages.",
        "status": "active",
        "items": [
            {
                "name": "Iced Tea",
                "description": "Classic iced tea served with lemon wedges and sweetened to perfection.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Mojito",
                "description": "Refreshing cocktail made with white rum, fresh mint, lime juice, and soda water.",
                "price": 25.5,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Strawberry Smoothie",
                "description": "Blend of fresh strawberries, yogurt, and honey, served chilled.",
                "price": 14.2,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "5",
        "category_name": "Wraps",
        "description": "Delicious wraps for a quick and satisfying meal.",
        "status": "active",
        "items": [
            {
                "name": "Chicken Caesar Wrap",
                "description": "Grilled chicken, romaine lettuce, Parmesan cheese, and Caesar dressing wrapped in a flour tortilla.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Vegetable Hummus Wrap",
                "description": "Mixed vegetables, hummus, and feta cheese wrapped in a whole wheat tortilla.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Buffalo Chicken Wrap",
                "description": "Crispy chicken tenders tossed in buffalo sauce, lettuce, tomato, and ranch dressing wrapped in a tortilla.",
                "price": 90,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "6",
        "category_name": "Sandwiches",
        "description": "Satisfying sandwiches for any appetite.",
        "status": "active",
        "items": [
            {
                "name": "Turkey Club Sandwich",
                "description": "Sliced turkey breast, bacon, lettuce, tomato, and mayonnaise on toasted bread.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Grilled Vegetable Panini",
                "description": "Grilled zucchini, bell peppers, onions, and provolone cheese on ciabatta bread.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "BLT Sandwich",
                "description": "Crispy bacon, lettuce, tomato, and mayonnaise on toasted bread.",
                "price": 10,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "7",
        "category_name": "Noodles",
        "description": "Delicious noodle dishes for pasta lovers.",
        "status": "active",
        "items": [
            {
                "name": "Spaghetti Bolognese",
                "description": "Spaghetti pasta topped with homemade Bolognese sauce and grated Parmesan cheese.",
                "price": 50,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Pad Thai",
                "description": "Traditional Thai stir-fried rice noodles with shrimp, tofu, bean sprouts, and peanuts.",
                "price": 8.5,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Fettuccine Carbonara",
                "description": "Fettuccine pasta tossed in a creamy sauce with crispy bacon, Parmesan cheese, and black pepper.",
                "price": 9,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "8",
        "category_name": "Specials",
        "description": "Explore our chef's special creations.",
        "status": "active",
        "items": [
            {
                "name": "Seafood Paella",
                "description": "Traditional Spanish rice dish with a mix of seafood, saffron, and vegetables.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Prime Rib",
                "description": "Slow-roasted prime rib served with au jus, mashed potatoes, and seasonal vegetables.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Vegetable Curry",
                "description": "Spicy Indian curry made with mixed vegetables, coconut milk, and aromatic spices, served with basmati rice.",
                "price": 10,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "9",
        "category_name": "Salads",
        "description": "Fresh and healthy salads for a light meal.",
        "status": "active",
        "items": [
            {
                "name": "Greek Salad",
                "description": "Crisp lettuce, tomatoes, cucumbers, olives, onions, feta cheese, and Greek dressing.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Cobb Salad",
                "description": "Mixed greens topped with grilled chicken, avocado, bacon, hard-boiled eggs, tomatoes, and blue cheese dressing.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Caesar Salad",
                "description": "Romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.",
                "price": 10,
                "image": "Appetizers1.jpg"
            }
        ]
    },
    {
        "category_id": "10",
        "category_name": "Kids Menu",
        "description": "Kid-friendly meals for our youngest guests.",
        "status": "active",
        "items": [
            {
                "name": "Chicken Nuggets",
                "description": "Crispy chicken nuggets served with fries and ketchup.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Cheese Pizza",
                "description": "Classic cheese pizza topped with marinara sauce and melted mozzarella cheese.",
                "price": 10,
                "image": "Appetizers1.jpg"
            },
            {
                "name": "Peanut Butter & Jelly Sandwich",
                "description": "Creamy peanut butter and strawberry jelly sandwiched between slices of white bread.",
                "price": 10,
                "image": "Appetizers1.jpg"
            }
        ]
    }
];

const CategoryLayout = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleClick = (item) => {
        setSelectedCategory(item);
    }
    const [quantities, setQuantities] = useState(new Array(menuItems.length).fill(0));

    const handleButtonClick = (action, index) => {
        const newQuantities = [...quantities];
        if (action === 'add') {
            newQuantities[index]++;
        } else if (action === 'remove') {
            if (newQuantities[index] > 0) {
                newQuantities[index]--;
            }
        }
        setQuantities(newQuantities);
    };
    return (
        <div className='container'>
            <div className='row menu'>
                <div className='col-3 sidemenu'>
                    {/* menu bar */}
                    <div className='menusidebar text-center'>
                        <ul>
                            {menuItems.map(item => (
                                <li className='menu-list-items' key={item.category_id} onClick={() => handleClick(item)}>
                                    <a href={`#${item.category_name}`}>{item.category_name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* content */}
                <div className='col-9 content-menu'>
                    {menuItems.map((item, index) => (
                        item && (
                            <div key={index} id={item.category_name}>
                                <h1 className='text-red'>{item.category_name}</h1>
                                <p className='text-center'>{item.description}</p>
                                <div className='card-container'>
                                    {item.items.map((item, index) => (
                                        <>
                                            {/* card for food item */}
                                            <Card key={index} style={{ width: '18rem', margin: '10px' }}>
                                                <Card.Img variant='top' src={require(`../assets/images/${item.image}`)} style={{ height: "18rem" }} />
                                                <Card.Body>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>
                                                        {item.description}
                                                    </Card.Text>
                                                    <div className='item-container'>
                                                        <div className='text-red fs-4'>${item.price}</div>
                                                        <div className='btn-qty'>
                                                            <button className='btn' onClick={() => handleButtonClick('add', index)}>
                                                                <span>+</span>
                                                            </button>
                                                            <div className='bg-red p-2'>{quantities[index]}</div>
                                                            <button className='btn' onClick={() => { handleButtonClick('remove', index); }}>
                                                                <span>-</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryLayout