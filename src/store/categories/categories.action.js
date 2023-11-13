import CATEGORIES_ACTION_TYPES from "./categories.types";
import { createAction } from "../../utils/reducer.utils";

import { getCategoriesAndDocuments } from "../../utils/firebase.utils";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesMap);

export const fetchCategoriesFailure = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesMap = await getCategoriesAndDocuments("categories");
      dispatch(fetchCategoriesSuccess(categoriesMap));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};
