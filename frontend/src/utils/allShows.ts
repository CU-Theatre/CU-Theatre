import { ShowType } from "../types/ShowType";
import someImg from '../Components/img/homePageAbout/about.png';


export const liveShow: ShowType = {
  showName: "Live performance",
  showTitle: 'Various plays written by Ukrainian authors interpreted and translated by our theater',
  showImg: someImg,
  showDate: '13.09-Monday',
  showPrice: '45$',
  link: 'live-performance',
};

export const improShow: ShowType = {
  showName: "Impro shows",
  showTitle: 'Fun, comedy live show where actors don’t have prepared scripts but want to make you laugh.',
  showImg: someImg,
  showDate: '13.09-Monday',
  showPrice: '45$',
  link: 'impro-shows',
};

export const playbackShow: ShowType = {
  showName: "Playback shows",
  showTitle: 'Live show with a healing effect. Audience shares theirs stories, director says a secret word and actors start playing the story focusing on audience’s feelings',
  showImg: someImg,
  showDate: '13.09-Monday',
  showPrice: '45$',
  link: 'playback-shows',
};

export const allShows = [liveShow, improShow, playbackShow];
