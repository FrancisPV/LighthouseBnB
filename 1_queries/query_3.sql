SELECT properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON property_reviews.id = property_id
WHERE city = 'Vancouver'
GROUP BY properties.id
/* HAVING avg(property_reviews.rating) >= 4 */ 
ORDER BY cost_per_night ASC;
