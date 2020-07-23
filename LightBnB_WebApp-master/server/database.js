const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123',
  port: '5432'
});
(async () => {
  const client = await pool.connect();
  console.log('client connected');
  client.release();

  /* const res = await client.query("SELECT * \
  FROM pg_catalog.pg_tables \
  WHERE schemaname != 'pg_catalog' AND \
      schemaname != 'information_schema';");
  console.log('schema', res.rows); */
})();


const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users WHERE email = $1
  LIMIT 1
  `, [email.toLowerCase()]).then(res => {
    if (res && res.rows && res.rows[0]) return res.rows[0];
    else return null;
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users WHERE id = $1
  LIMIT 1
  `, [id]).then(res => {
    if (res && res.rows && res.rows[0]) return res.rows[0];
    else return null;
  });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  return pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
    [user.name, user.email, user.password]
  )
    .then(res => {
      return res.rows[0];
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(
    `SELECT *
    FROM reservations
    JOIN properties ON properties.id = property_id
    WHERE guest_id = $1
    LIMIT 10;
    `, [guest_id]
  ).then(res => {
    return res.rows;
  });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += queryString.includes(`WHERE`) ? ` AND ` : `WHERE `;
    queryString += `owner_id LIKE $${queryParams.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryParams.push(options.maximum_price_per_night);
    queryString += queryString.includes(`WHERE`) ? ` AND ` : `WHERE `;
    queryString += `cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
  }
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += queryString.includes(`WHERE`) ? ` AND ` : `WHERE `;
    queryString += `rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(options);
  console.log(queryString);
  console.log(queryParams);
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
