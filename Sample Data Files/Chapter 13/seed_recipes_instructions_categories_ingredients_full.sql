-- ============================================
-- Wasfat FULL SEED: Recipes, Instructions, Categories (Many-to-Many)
-- + Ingredients & RecipeIngredients (Many-to-Many with junction-level properties)
-- ============================================

-- Delete all data from appinstructions and reset auto-increment value
DELETE FROM appinstructions;
ALTER TABLE appinstructions AUTO_INCREMENT = 1;

-- Delete all data from apprecipes and reset auto-increment value
DELETE FROM apprecipes;
ALTER TABLE apprecipes AUTO_INCREMENT = 1;

-- Clear existing category mappings and categories
DELETE FROM apprecipecategories;
DELETE FROM appcategories;
ALTER TABLE appcategories AUTO_INCREMENT = 1;

-- Clear existing recipe ingredient mappings and ingredients
DELETE FROM apprecipeingredients;
DELETE FROM appingredients;
ALTER TABLE appingredients AUTO_INCREMENT = 1;

-- =========================
-- Seed Recipes
-- =========================
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

-- =========================
-- Seed Instructions
-- =========================
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

-- =========================
-- Seed Categories
-- =========================
INSERT INTO appcategories (Name) VALUES
('Breakfast'),
('Lunch'),
('Dinner'),
('Dessert'),
('Vegetarian');

-- =========================
-- Map Recipes to Categories
-- =========================
-- Spaghetti Carbonara → Dinner
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Spaghetti Carbonara' AND c.Name = 'Dinner';

-- Chicken Curry → Dinner
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Chicken Curry' AND c.Name = 'Dinner';

-- Beef Stroganoff → Dinner
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Beef Stroganoff' AND c.Name = 'Dinner';

-- Vegetable Stir Fry → Lunch, Dinner, Vegetarian
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Vegetable Stir Fry' AND c.Name = 'Lunch';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Vegetable Stir Fry' AND c.Name = 'Dinner';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Vegetable Stir Fry' AND c.Name = 'Vegetarian';

-- Fish Tacos → Dinner
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Fish Tacos' AND c.Name = 'Dinner';

-- Margherita Pizza → Dinner, Vegetarian
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Margherita Pizza' AND c.Name = 'Dinner';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Margherita Pizza' AND c.Name = 'Vegetarian';

-- Caesar Salad → Lunch, Vegetarian
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Caesar Salad' AND c.Name = 'Lunch';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Caesar Salad' AND c.Name = 'Vegetarian';

-- Lamb Kebabs → Dinner
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Lamb Kebabs' AND c.Name = 'Dinner';

-- Pancakes → Breakfast, Dessert, Vegetarian
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Pancakes' AND c.Name = 'Breakfast';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Pancakes' AND c.Name = 'Dessert';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Pancakes' AND c.Name = 'Vegetarian';

-- Chocolate Cake → Dessert, Vegetarian
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Chocolate Cake' AND c.Name = 'Dessert';
INSERT INTO apprecipecategories (RecipesId, CategoriesId)
SELECT r.Id, c.Id FROM apprecipes r, appcategories c
WHERE r.Name = 'Chocolate Cake' AND c.Name = 'Vegetarian';

-- 'Test' recipe intentionally left without categories

-- ============================================
-- NEW SECTION: Ingredients & RecipeIngredients
-- ============================================

-- =========================
-- Seed Ingredients
-- =========================
INSERT INTO appingredients (Name) VALUES
('Spaghetti'),
('Eggs'),
('Parmesan Cheese'),
('Pancetta'),
('Black Pepper'),
('Chicken'),
('Curry Powder'),
('Onion'),
('Garlic'),
('Ginger'),
('Beef'),
('Mushrooms'),
('Sour Cream'),
('Soy Sauce'),
('Mixed Vegetables'),
('Fish Fillets'),
('Tortillas'),
('Mozzarella'),
('Basil'),
('Romaine Lettuce'),
('Croutons'),
('Lamb'),
('Yogurt'),
('Flour'),
('Milk'),
('Butter'),
('Chocolate'),
('Sugar'),
('Cocoa Powder');

-- =========================
-- Seed RecipeIngredients
-- =========================
-- MeasurementUnit enum assumed as:
--   0 = Gram
--   1 = Kilogram
--   2 = Milliliter
--   3 = Liter
--   4 = Teaspoon
--   5 = Tablespoon
--   6 = Cup
--   7 = Piece

-- Spaghetti Carbonara
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 200, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Spaghetti Carbonara' AND i.Name = 'Spaghetti';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 2, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Spaghetti Carbonara' AND i.Name = 'Eggs';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 50, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Spaghetti Carbonara' AND i.Name = 'Parmesan Cheese';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 100, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Spaghetti Carbonara' AND i.Name = 'Pancetta';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 1, 5 FROM apprecipes r, appingredients i WHERE r.Name = 'Spaghetti Carbonara' AND i.Name = 'Black Pepper';

-- Chicken Curry
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 500, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Chicken Curry' AND i.Name = 'Chicken';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 2, 5 FROM apprecipes r, appingredients i WHERE r.Name = 'Chicken Curry' AND i.Name = 'Curry Powder';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 1, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Chicken Curry' AND i.Name = 'Onion';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 2, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Chicken Curry' AND i.Name = 'Garlic';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 1, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Chicken Curry' AND i.Name = 'Ginger';

-- Beef Stroganoff
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 400, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Beef Stroganoff' AND i.Name = 'Beef';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 200, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Beef Stroganoff' AND i.Name = 'Mushrooms';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 100, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Beef Stroganoff' AND i.Name = 'Onion';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 100, 2 FROM apprecipes r, appingredients i WHERE r.Name = 'Beef Stroganoff' AND i.Name = 'Sour Cream';

-- Vegetable Stir Fry
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 300, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Vegetable Stir Fry' AND i.Name = 'Mixed Vegetables';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 2, 5 FROM apprecipes r, appingredients i WHERE r.Name = 'Vegetable Stir Fry' AND i.Name = 'Soy Sauce';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 1, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Vegetable Stir Fry' AND i.Name = 'Garlic';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 1, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Vegetable Stir Fry' AND i.Name = 'Ginger';

-- Fish Tacos
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 250, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Fish Tacos' AND i.Name = 'Fish Fillets';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 6, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Fish Tacos' AND i.Name = 'Tortillas';

-- Margherita Pizza
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 100, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Margherita Pizza' AND i.Name = 'Mozzarella';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 5, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Margherita Pizza' AND i.Name = 'Basil';

-- Caesar Salad
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 150, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Caesar Salad' AND i.Name = 'Romaine Lettuce';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 50, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Caesar Salad' AND i.Name = 'Croutons';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 30, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Caesar Salad' AND i.Name = 'Parmesan Cheese';

-- Lamb Kebabs
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 500, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Lamb Kebabs' AND i.Name = 'Lamb';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 100, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Lamb Kebabs' AND i.Name = 'Yogurt';

-- Pancakes
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 200, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Pancakes' AND i.Name = 'Flour';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 250, 2 FROM apprecipes r, appingredients i WHERE r.Name = 'Pancakes' AND i.Name = 'Milk';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 50, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Pancakes' AND i.Name = 'Butter';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 2, 7 FROM apprecipes r, appingredients i WHERE r.Name = 'Pancakes' AND i.Name = 'Eggs';

-- Chocolate Cake
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 200, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Chocolate Cake' AND i.Name = 'Flour';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 150, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Chocolate Cake' AND i.Name = 'Sugar';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 50, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Chocolate Cake' AND i.Name = 'Cocoa Powder';
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit)
SELECT r.Id, i.Id, 100, 0 FROM apprecipes r, appingredients i WHERE r.Name = 'Chocolate Cake' AND i.Name = 'Butter';
