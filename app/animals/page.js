import Image from 'next/image';
import Link from 'next/link';
import { getAnimals } from '../../database/animals';

export const metadata = {
  title: 'Animals',
  description: 'Generated by create next app',
};

export default function AnimalsPage() {
  const animals = getAnimals();
  return (
    <div>
      <h1>My Animals</h1>
      {animals.map((animal) => {
        return (
          <div key={`animals-${animal.id}`}>
            <Link href={`/animals/${animal.id}`}>
              <div>{animal.firstName}</div>
              <Image
                src={`/images/${animal.firstName.toLowerCase()}.webp`}
                alt={animal.firstName}
                width={200}
                height={200}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
