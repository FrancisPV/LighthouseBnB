INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (2, 1, '2018-09-11', '2018-09-26'),
(3, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO users (name, email, password)
VALUES ('Francis', 'francispellerinvenne@hotmail.fr', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Oliver', 'oliver@walerys.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Anna', 'anna@jolie.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Le chalet', 'description', 'https://www.chaletsalouer.com/images/site/facebook.jpg', 'https://www.chaletsalouer.com/images/site/facebook.jpg', 500, 2, 3, 8, 'Canada', 'Bois-perdu', 'Bois-briand', 'Québec', 'H5D 7G8'),
(1, "L'autre chalet", 'description', 'https://www.monsieurchalets.com/swserve/site_assets/site9954/properties/34563/images/themed/search-thumb-Chaletsalouer.com00001.jpg', 'https://www.monsieurchalets.com/swserve/site_assets/site9954/properties/34563/images/themed/search-thumb-Chaletsalouer.com00001.jpg', 600, 3, 2, 8, 'Canada', 'perdu perdu', 'La cité perdu', 'K9J 8G6'),
(1, 'Le troisième chalet', 'description', 'https://storage.googleapis.com/everest-static/fiddlerlakeresort/7/chalet-a-louer-laurentides-castor-as01.jpeg?1507751711465', 'https://storage.googleapis.com/everest-static/fiddlerlakeresort/7/chalet-a-louer-laurentides-castor-as01.jpeg?1507751711465', 350, 4, 1, 6, 'Canada', 'Encore plus loin', 'La cité perdu', 'K9J 8G7');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 1, 4, 'message'),
(3, 2, 2, 5, 'message'),
(3, 3, 3, 3, 'message');