import './LoaderButton.scss';

export const LoaderButton = () => (
  <button type='button' className="LoaderButton white-button" data-cy="Loader">
    <div className="Loader__content" />
  </button>
);
