'use strict';

/**
 * nu service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nu.nu');
