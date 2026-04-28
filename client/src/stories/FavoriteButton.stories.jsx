import FavoriteButton from '../components/FavoriteButton';

export default {
  title: 'Components/FavoriteButton',
  component: FavoriteButton,
};

export const Default = () => <FavoriteButton isFavorite={false} onClick={() => {}} />;
export const Favorited = () => <FavoriteButton isFavorite={true} onClick={() => {}} />;
