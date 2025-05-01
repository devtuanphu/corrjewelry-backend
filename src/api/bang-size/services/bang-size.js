'use strict';

/**
 * bang-size service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bang-size.bang-size');
