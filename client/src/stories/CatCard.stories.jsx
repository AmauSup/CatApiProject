import CatCard from '../components/CatCard';

export default {
  title: 'Components/CatCard',
  component: CatCard,
};

const sampleCat = {
  id: 1,
  image_url: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
  breed_name: 'Abyssinian',
  temperament: 'Active, Energetic',
};

export const Default = () => <CatCard cat={sampleCat} />;
