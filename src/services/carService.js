// Car data service - ready for Supabase integration
// Currently uses local data file, will be replaced with Supabase queries

import {
  getYears as getYearsLocal,
  getMakesByYear as getMakesByYearLocal,
  getModelsByYearAndMake as getModelsByYearAndMakeLocal,
  getSubmodelsByYearMakeAndModel as getSubmodelsByYearMakeAndModelLocal,
  getTrimsByYearMakeModelAndSubmodel as getTrimsByYearMakeModelAndSubmodelLocal
} from '../data/cars';

// TODO: Replace with Supabase client when ready
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Get all available years
 * @returns {Promise<string[]>} Array of year strings
 */
export const getYears = async () => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('years')
  //   .select('year')
  //   .order('year', { ascending: false });
  // return data?.map(row => row.year) || [];
  
  // Return as promise for Supabase compatibility
  return Promise.resolve(getYearsLocal());
};

/**
 * Get makes available for a specific year
 * @param {string} year - The year to filter by
 * @returns {Promise<string[]>} Array of make strings
 */
export const getMakesByYear = async (year) => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('cars')
  //   .select('make')
  //   .eq('year', year)
  //   .order('make');
  // return [...new Set(data?.map(row => row.make) || [])];
  
  return Promise.resolve(getMakesByYearLocal(year));
};

/**
 * Get models available for a specific year and make
 * @param {string} year - The year to filter by
 * @param {string} make - The make to filter by
 * @returns {Promise<string[]>} Array of model strings
 */
export const getModelsByYearAndMake = async (year, make) => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('cars')
  //   .select('model')
  //   .eq('year', year)
  //   .eq('make', make)
  //   .order('model');
  // return [...new Set(data?.map(row => row.model) || [])];
  
  return Promise.resolve(getModelsByYearAndMakeLocal(year, make));
};

/**
 * Get submodels available for a specific year, make, and model
 * @param {string} year - The year to filter by
 * @param {string} make - The make to filter by
 * @param {string} model - The model to filter by
 * @returns {Promise<string[]>} Array of submodel strings
 */
export const getSubmodelsByYearMakeAndModel = async (year, make, model) => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('cars')
  //   .select('submodel')
  //   .eq('year', year)
  //   .eq('make', make)
  //   .eq('model', model)
  //   .order('submodel');
  // return [...new Set(data?.map(row => row.submodel) || [])];
  
  return Promise.resolve(getSubmodelsByYearMakeAndModelLocal(year, make, model));
};

/**
 * Get trims available for a specific year, make, model, and submodel
 * @param {string} year - The year to filter by
 * @param {string} make - The make to filter by
 * @param {string} model - The model to filter by
 * @param {string} submodel - The submodel to filter by
 * @returns {Promise<string[]>} Array of trim strings
 */
export const getTrimsByYearMakeModelAndSubmodel = async (year, make, model, submodel) => {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase
  //   .from('cars')
  //   .select('trim')
  //   .eq('year', year)
  //   .eq('make', make)
  //   .eq('model', model)
  //   .eq('submodel', submodel)
  //   .order('trim');
  // return data?.map(row => row.trim) || [];
  
  return Promise.resolve(getTrimsByYearMakeModelAndSubmodelLocal(year, make, model, submodel));
};

