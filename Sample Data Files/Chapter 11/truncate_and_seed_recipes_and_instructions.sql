-- Delete all data from appinstructions and reset auto-increment value
DELETE FROM appinstructions;
ALTER TABLE appinstructions AUTO_INCREMENT = 1;


-- Delete all data from apprecipes and reset auto-increment value
DELETE FROM apprecipes;
ALTER TABLE apprecipes AUTO_INCREMENT = 1;


-- Insert 10 recipes
INSERT INTO apprecipes (Name, Description) VALUES
('Spaghetti Carbonara', 'Classic Italian pasta dish with eggs, cheese, pancetta, and pepper.'),
('Chicken Curry', 'Spicy and flavorful chicken curry with a rich sauce.'),
('Beef Stroganoff', 'Russian dish with sautéed beef in a creamy mushroom sauce.'),
('Vegetable Stir Fry', 'Quick and healthy stir fry with mixed vegetables.'),
('Fish Tacos', 'Delicious fish tacos with fresh toppings and a tangy sauce.'),
('Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil.'),
('Caesar Salad', 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.'),
('Lamb Kebabs', 'Grilled lamb skewers with a blend of spices.'),
('Pancakes', 'Fluffy pancakes served with syrup and butter.'),
('Chocolate Cake', 'Rich and moist chocolate cake with a creamy frosting.');

-- Insert instructions for each recipe
INSERT INTO appinstructions (RecipeId, `Order`, Text) VALUES
-- Spaghetti Carbonara
((SELECT Id FROM apprecipes WHERE Name = 'Spaghetti Carbonara'), 1, 'Boil pasta in salted water until al dente.'),
((SELECT Id FROM apprecipes WHERE Name = 'Spaghetti Carbonara'), 2, 'Cook pancetta in a pan until crispy.'),
((SELECT Id FROM apprecipes WHERE Name = 'Spaghetti Carbonara'), 3, 'Whisk eggs and cheese together in a bowl.'),
((SELECT Id FROM apprecipes WHERE Name = 'Spaghetti Carbonara'), 4, 'Combine pasta, pancetta, and egg mixture.'),
((SELECT Id FROM apprecipes WHERE Name = 'Spaghetti Carbonara'), 5, 'Season with pepper and serve immediately.'),

-- Chicken Curry
((SELECT Id FROM apprecipes WHERE Name = 'Chicken Curry'), 1, 'Marinate chicken with spices and yogurt.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chicken Curry'), 2, 'Cook onions, garlic, and ginger in a pan.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chicken Curry'), 3, 'Add marinated chicken and cook until browned.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chicken Curry'), 4, 'Pour in tomato sauce and simmer.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chicken Curry'), 5, 'Serve with rice and garnish with cilantro.'),

-- Beef Stroganoff
((SELECT Id FROM apprecipes WHERE Name = 'Beef Stroganoff'), 1, 'Sauté beef strips in a pan until browned.'),
((SELECT Id FROM apprecipes WHERE Name = 'Beef Stroganoff'), 2, 'Cook onions and mushrooms in the same pan.'),
((SELECT Id FROM apprecipes WHERE Name = 'Beef Stroganoff'), 3, 'Add beef broth and bring to a simmer.'),
((SELECT Id FROM apprecipes WHERE Name = 'Beef Stroganoff'), 4, 'Stir in sour cream and mustard.'),
((SELECT Id FROM apprecipes WHERE Name = 'Beef Stroganoff'), 5, 'Serve over egg noodles.'),

-- Vegetable Stir Fry
((SELECT Id FROM apprecipes WHERE Name = 'Vegetable Stir Fry'), 1, 'Heat oil in a wok or large pan.'),
((SELECT Id FROM apprecipes WHERE Name = 'Vegetable Stir Fry'), 2, 'Add garlic and ginger, cook until fragrant.'),
((SELECT Id FROM apprecipes WHERE Name = 'Vegetable Stir Fry'), 3, 'Add mixed vegetables and stir fry.'),
((SELECT Id FROM apprecipes WHERE Name = 'Vegetable Stir Fry'), 4, 'Pour in soy sauce and stir to coat.'),
((SELECT Id FROM apprecipes WHERE Name = 'Vegetable Stir Fry'), 5, 'Serve with rice or noodles.'),

-- Fish Tacos
((SELECT Id FROM apprecipes WHERE Name = 'Fish Tacos'), 1, 'Season fish fillets with spices.'),
((SELECT Id FROM apprecipes WHERE Name = 'Fish Tacos'), 2, 'Cook fish in a pan until done.'),
((SELECT Id FROM apprecipes WHERE Name = 'Fish Tacos'), 3, 'Warm tortillas in a pan.'),
((SELECT Id FROM apprecipes WHERE Name = 'Fish Tacos'), 4, 'Assemble tacos with fish and toppings.'),
((SELECT Id FROM apprecipes WHERE Name = 'Fish Tacos'), 5, 'Drizzle with sauce and serve.'),

-- Margherita Pizza
((SELECT Id FROM apprecipes WHERE Name = 'Margherita Pizza'), 1, 'Preheat oven to 475°F (245°C).'),
((SELECT Id FROM apprecipes WHERE Name = 'Margherita Pizza'), 2, 'Roll out pizza dough on a floured surface.'),
((SELECT Id FROM apprecipes WHERE Name = 'Margherita Pizza'), 3, 'Spread tomato sauce over the dough.'),
((SELECT Id FROM apprecipes WHERE Name = 'Margherita Pizza'), 4, 'Top with mozzarella and basil leaves.'),
((SELECT Id FROM apprecipes WHERE Name = 'Margherita Pizza'), 5, 'Bake until crust is golden and cheese is bubbly.'),

-- Caesar Salad
((SELECT Id FROM apprecipes WHERE Name = 'Caesar Salad'), 1, 'Chop romaine lettuce and place in a bowl.'),
((SELECT Id FROM apprecipes WHERE Name = 'Caesar Salad'), 2, 'Add croutons and grated Parmesan cheese.'),
((SELECT Id FROM apprecipes WHERE Name = 'Caesar Salad'), 3, 'Drizzle with Caesar dressing.'),
((SELECT Id FROM apprecipes WHERE Name = 'Caesar Salad'), 4, 'Toss to coat evenly.'),
((SELECT Id FROM apprecipes WHERE Name = 'Caesar Salad'), 5, 'Serve immediately.'),

-- Lamb Kebabs
((SELECT Id FROM apprecipes WHERE Name = 'Lamb Kebabs'), 1, 'Marinate lamb cubes with spices and yogurt.'),
((SELECT Id FROM apprecipes WHERE Name = 'Lamb Kebabs'), 2, 'Thread lamb onto skewers.'),
((SELECT Id FROM apprecipes WHERE Name = 'Lamb Kebabs'), 3, 'Grill skewers until lamb is cooked through.'),
((SELECT Id FROM apprecipes WHERE Name = 'Lamb Kebabs'), 4, 'Serve with pita bread and sauce.'),
((SELECT Id FROM apprecipes WHERE Name = 'Lamb Kebabs'), 5, 'Garnish with chopped herbs.'),

-- Pancakes
((SELECT Id FROM apprecipes WHERE Name = 'Pancakes'), 1, 'Mix flour, sugar, baking powder, and salt in a bowl.'),
((SELECT Id FROM apprecipes WHERE Name = 'Pancakes'), 2, 'Whisk milk, eggs, and melted butter in another bowl.'),
((SELECT Id FROM apprecipes WHERE Name = 'Pancakes'), 3, 'Combine wet and dry ingredients.'),
((SELECT Id FROM apprecipes WHERE Name = 'Pancakes'), 4, 'Cook batter on a hot griddle until bubbles form.'),
((SELECT Id FROM apprecipes WHERE Name = 'Pancakes'), 5, 'Flip and cook until golden brown.'),

-- Chocolate Cake
((SELECT Id FROM apprecipes WHERE Name = 'Chocolate Cake'), 1, 'Preheat oven to 350°F (175°C).'),
((SELECT Id FROM apprecipes WHERE Name = 'Chocolate Cake'), 2, 'Mix flour, sugar, cocoa powder, baking powder, and salt.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chocolate Cake'), 3, 'Add eggs, milk, oil, and vanilla extract.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chocolate Cake'), 4, 'Pour batter into a greased cake pan.'),
((SELECT Id FROM apprecipes WHERE Name = 'Chocolate Cake'), 5, 'Bake until a toothpick comes out clean.');