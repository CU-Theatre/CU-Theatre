import { ShowType } from "../types/ShowType";
import impro from '../Components/img/HomePageReviews/impro.png';
import playback from '../Components/img/HomePageReviews/playback.jpg';
import liveperf from '../Components/img/HomePageReviews/livePerf.png';

export const improShow: ShowType = {
  showName: "Impro shows",
  showTitle: 'Fun, comedy live show where actors don’t have prepared scripts but want to make you laugh.',
  showImg: impro,
  showDate: '01.10-Wednesday',
  showPrice: '45$',
  link: 'impro-shows',
};

export const playbackShow: ShowType = {
  showName: "Playback shows",
  showTitle: 'Live show with a healing effect. Audience shares theirs stories, director says a secret word and actors start playing the story focusing on audience’s feelings',
  showImg: playback,
  showDate: '18.09-Wednesday',
  showPrice: '45$',
  link: 'playback-shows',
};

export const liveShow: ShowType = {
  showName: "Live performance",
  showTitle: 'Various plays written by Ukrainian authors interpreted and translated by our theater',
  showImg: liveperf,
  showDate: '18.09-Wednesday',
  showPrice: '45$',
  link: 'live-performance',
};

export const allShows = [improShow, playbackShow, liveShow];
