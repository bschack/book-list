import BookFunctionBar from '@/components/BookFunctionsBar';
import dynamic from 'next/dynamic';

const ItemList = dynamic(() => import('../components/ItemList'), { ssr: false });

export default function Home() {
  return (
    <>
      <BookFunctionBar />
      <ItemList />
    </>
  );
}
