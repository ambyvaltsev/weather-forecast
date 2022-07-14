import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { allActions } from "../features/actions";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
