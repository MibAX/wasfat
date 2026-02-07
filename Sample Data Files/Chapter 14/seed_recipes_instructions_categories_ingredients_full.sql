
-- =========================================================
-- WASFAT FULL DATABASE SEED (FINAL, EXPLICIT, NO SHORTCUTS)
-- Compatible with MariaDB / MySQL
-- =========================================================

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM appinstructions;
DELETE FROM apprecipecategories;
DELETE FROM apprecipeingredients;
DELETE FROM apprecipes;
DELETE FROM appcategories;
DELETE FROM appingredients;

ALTER TABLE appinstructions AUTO_INCREMENT = 1;
ALTER TABLE apprecipes AUTO_INCREMENT = 1;
ALTER TABLE appcategories AUTO_INCREMENT = 1;
ALTER TABLE appingredients AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
-- RECIPES
-- =========================================================
INSERT INTO apprecipes (Id, Name, Description, ImageUrl, IsFeatured, IsDisplayedInHero) VALUES
(1,'Spaghetti Carbonara','A classic Italian spaghetti carbonara made with crispy pancetta, eggs, and finely grated cheese, creating a rich and silky sauce without cream.','/images/recipes/spaghetti_carbonara.jpg',0,1),
(2,'Chicken Curry','A rich and comforting chicken curry simmered in a tomato-based sauce with warm spices and finished with butter.','/images/recipes/chicken_curry.jpg',1,0),
(3,'Beef Stroganoff','Tender beef strips cooked with mushrooms, onions, and bell peppers in a light creamy sauce.','/images/recipes/beef_stroganoff.jpg',0,0),
(4,'Vegetable Stir Fry','A colorful mix of vegetables stir fried with tofu and a fresh herb sauce for a light vegetarian meal.','/images/recipes/vegetable_stir_fry.jpg',0,0),
(5,'Fish Tacos','Grilled white fish served on corn tortillas with chili sauce, fresh onion, and cilantro.','/images/recipes/fish_tacos.jpg',0,0),
(6,'Margherita Pizza','Classic Italian pizza topped with tomato sauce, mozzarella, fresh basil, and olive oil.','/images/recipes/margherita_pizza.jpg',1,0),
(7,'Caesar Salad','Crisp romaine lettuce tossed with Caesar dressing, croutons, and shaved Parmesan cheese.','/images/recipes/caesar_salad.jpg',0,0),
(8,'Lamb Kebabs','Juicy grilled lamb skewers served with flatbread, salad, and yogurt sauce.','/images/recipes/lamb_kebabs.jpg',1,0),
(9,'Pancakes','Fluffy homemade pancakes served with butter and maple syrup.','/images/recipes/pancakes.jpg',0,1),
(10,'Chocolate Cake','Rich and moist chocolate layer cake frosted with smooth chocolate buttercream.','/images/recipes/chocolate_cake.jpg',1,1);

-- =========================================================
-- CATEGORIES
-- =========================================================
INSERT INTO appcategories (Id, Name) VALUES
(1,'Breakfast'),
(2,'Lunch'),
(3,'Dinner'),
(4,'Dessert'),
(5,'Vegetarian');

-- =========================================================
-- RECIPE CATEGORIES
-- =========================================================
INSERT INTO apprecipecategories (RecipesId, CategoriesId) VALUES
(1,3),
(2,3),
(3,3),
(4,2),(4,3),(4,5),
(5,3),
(6,3),(6,5),
(7,2),(7,5),
(8,3),
(9,1),(9,4),(9,5),
(10,4),(10,5);

-- =========================================================
-- INGREDIENTS
-- =========================================================
INSERT INTO appingredients (Id, Name) VALUES
(1,'Spaghetti'),
(2,'Eggs'),
(3,'Parmesan Cheese'),
(4,'Pancetta'),
(5,'Black Pepper'),
(6,'Chicken'),
(7,'Curry Powder'),
(8,'Onion'),
(9,'Garlic'),
(10,'Ginger'),
(11,'Tomato Puree'),
(12,'Butter'),
(13,'Chili Powder'),
(14,'Cilantro'),
(15,'Lime'),
(16,'Beef'),
(17,'Mushrooms'),
(18,'Bell Peppers'),
(19,'Sour Cream'),
(20,'Cooking Oil'),
(21,'Parsley'),
(22,'Zucchini'),
(23,'Broccoli'),
(24,'Red Onion'),
(25,'Tofu'),
(26,'Herb Sauce'),
(27,'White Fish Fillets'),
(28,'Corn Tortillas'),
(29,'Chili Sauce'),
(30,'Pizza Dough'),
(31,'Tomato Sauce'),
(32,'Mozzarella'),
(33,'Tomatoes'),
(34,'Basil'),
(35,'Olive Oil'),
(36,'Romaine Lettuce'),
(37,'Croutons'),
(38,'Caesar Dressing'),
(39,'Flatbread'),
(40,'Flour'),
(41,'Milk'),
(42,'Sugar'),
(43,'Baking Powder'),
(44,'Salt'),
(45,'Vegetable Oil'),
(46,'Vanilla Extract'),
(47,'Powdered Sugar'),
(48,'Chocolate'),
(49,'Maple Syrup'),
(50,'Yogurt');

-- =========================================================
-- RECIPE INGREDIENTS
-- =========================================================
INSERT INTO apprecipeingredients (RecipeId, IngredientId, Quantity, Unit) VALUES
(1,1,200,0),(1,2,2,7),(1,3,50,0),(1,4,100,0),(1,5,1,5),
(2,6,500,0),(2,7,2,5),(2,8,1,7),(2,9,2,7),(2,10,1,7),(2,11,200,2),(2,12,50,0),
(3,16,400,0),(3,17,200,0),(3,8,1,7),(3,18,1,7),(3,19,150,2),
(4,22,200,0),(4,23,200,0),(4,18,1,7),(4,24,1,7),(4,25,200,0),(4,26,2,5),
(5,27,300,0),(5,28,6,7),(5,29,2,5),(5,24,1,7),(5,14,1,7),(5,15,1,7),
(6,30,1,7),(6,31,150,2),(6,32,150,0),(6,33,2,7),(6,34,6,7),(6,35,2,5),
(7,36,200,0),(7,37,50,0),(7,3,30,0),(7,38,100,2),
(8,16,500,0),(8,50,150,2),(8,39,2,7),(8,21,1,7),
(9,40,200,0),(9,41,250,2),(9,2,2,7),(9,12,50,0),(9,49,50,2),
(10,40,250,0),(10,42,200,0),(10,48,150,0),(10,12,150,0),(10,47,100,0);

-- =========================================================
-- INSTRUCTIONS
-- =========================================================
INSERT INTO appinstructions (RecipeId, `Order`, Text) VALUES
(1,1,'Boil spaghetti in salted water until al dente.'),
(1,2,'Cook pancetta until crispy.'),
(1,3,'Whisk eggs and Parmesan together.'),
(1,4,'Combine pasta with pancetta and egg mixture off heat.'),
(1,5,'Season with black pepper and serve.'),
(2,1,'Season chicken with curry powder and chili.'),
(2,2,'Cook onion, garlic, and ginger.'),
(2,3,'Add chicken and brown lightly.'),
(2,4,'Add tomato puree and simmer.'),
(2,5,'Stir in butter and garnish with cilantro.'),
(3,1,'Sauté beef strips until browned.'),
(3,2,'Cook onions, mushrooms, and peppers.'),
(3,3,'Return beef to pan.'),
(3,4,'Stir in sour cream.'),
(3,5,'Garnish with parsley and serve.'),
(4,1,'Heat oil in pan.'),
(4,2,'Cook vegetables until tender.'),
(4,3,'Add tofu and brown.'),
(4,4,'Toss with herb sauce.'),
(4,5,'Serve warm.'),
(5,1,'Season and grill fish.'),
(5,2,'Warm tortillas.'),
(5,3,'Assemble fish in tortillas.'),
(5,4,'Add chili sauce, onion, and cilantro.'),
(5,5,'Serve with lime.'),
(6,1,'Preheat oven to 475°F (245°C).'),
(6,2,'Roll out pizza dough.'),
(6,3,'Spread tomato sauce.'),
(6,4,'Add mozzarella, tomatoes, and basil.'),
(6,5,'Drizzle oil and bake until golden.'),
(7,1,'Chop romaine lettuce.'),
(7,2,'Add croutons and Parmesan.'),
(7,3,'Add Caesar dressing.'),
(7,4,'Toss gently.'),
(7,5,'Serve immediately.'),
(8,1,'Marinate lamb with yogurt and spices.'),
(8,2,'Thread lamb onto skewers.'),
(8,3,'Grill until charred.'),
(8,4,'Serve with flatbread and salad.'),
(8,5,'Garnish with herbs.'),
(9,1,'Mix dry ingredients.'),
(9,2,'Whisk milk, eggs, and butter.'),
(9,3,'Combine wet and dry ingredients.'),
(9,4,'Cook batter on griddle.'),
(9,5,'Serve with maple syrup.'),
(10,1,'Preheat oven to 350°F (175°C).'),
(10,2,'Mix dry ingredients.'),
(10,3,'Add wet ingredients and mix.'),
(10,4,'Bake until set.'),
(10,5,'Prepare frosting.'),
(10,6,'Frost cake layers.'),
(10,7,'Slice and serve.');

-- =========================================================
-- END OF FILE
-- =========================================================
