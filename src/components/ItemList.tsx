import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import styles from '../styles/itemList.module.scss';


async function getItems() {
  const client = new DynamoDBClient({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    }
  });
  
  const params = {
    TableName: 'book_status',
  };

  const data = await client.send(new ScanCommand(params));
  const items = data.Items ? data.Items.map(item => unmarshall(item)) : [];
  return items;
}

export default async function ItemList() {
  const bookData = getItems();
 
  // Wait for the promises to resolve
  const books = await bookData;

  if (!books) return <div>Error</div>;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {books.map(item => (
          <div key={item.name} className={styles.list__item}>
            <span>{item.name}</span>
            <span>{item.date_updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
