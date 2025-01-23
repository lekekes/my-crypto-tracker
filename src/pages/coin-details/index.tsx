import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/coin-details/bitcoin',
      permanent: false,
    },
  };
};

export default function CoinDetailsIndex() {
  return null;
}
