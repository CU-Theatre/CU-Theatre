import {
  DESKTOP_MIN_WIDTH,
  GRID_GAP_DESK,
  GRID_GAP_MOB,
  TABLE_MIN_WIDTH,
} from "./globalVariables";

export const getSliderParams = () => {
  const viewportWidth = window.innerWidth;

  let slidesPerView = 1;
  let spaceBetween = GRID_GAP_MOB;

  if (viewportWidth >= TABLE_MIN_WIDTH) {
    slidesPerView = 2;
  }

  if (viewportWidth >= DESKTOP_MIN_WIDTH) {
    slidesPerView = 2.5;
    spaceBetween = GRID_GAP_DESK;
  }

  return [slidesPerView, spaceBetween];
};
