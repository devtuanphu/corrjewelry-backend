'use strict';

/**
 * nam service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nam.nam');
